"""
Stage 4: Reasoning Engine
Traces student cognitive transformations, mathematical operations, and line-by-line working against canonical solution paths.
"""

from dataclasses import dataclass
from typing import Optional, List
import re

from .parser import ParsedAnswer
from .evidence import ExtractedEvidence
from .skills import SkillNode
from .errors import ClassifiedError, ErrorCategory


@dataclass
class ReasoningTrace:
    is_correct: bool
    classified_error: Optional[ClassifiedError]
    divergence_step: Optional[int] = None
    observed_operation: Optional[str] = None
    required_operation: Optional[str] = None
    confidence_level: str = "high"


class ReasoningEngine:
    """Performs deterministic comparative reasoning on student answers."""

    @classmethod
    def evaluate(
        cls,
        parsed: ParsedAnswer,
        evidence: ExtractedEvidence,
        skill: SkillNode,
        question_text: str,
        expected_answer: str,
    ) -> ReasoningTrace:
        # Check Blank
        if evidence.is_blank:
            return ReasoningTrace(
                is_correct=False,
                classified_error=ClassifiedError(
                    category=ErrorCategory.BLANK_SUBMISSION,
                    code="BLANK_SUBMISSION",
                    description="No answer was submitted.",
                    observed_action="Blank submission",
                    expected_action=f"Submit an answer matching: {expected_answer}",
                    is_conceptual=False,
                ),
                confidence_level="high",
            )

        # Check Gibberish
        if evidence.is_gibberish:
            return ReasoningTrace(
                is_correct=False,
                classified_error=ClassifiedError(
                    category=ErrorCategory.UNRECOGNIZED_INPUT,
                    code="UNRECOGNIZED_INPUT",
                    description="The entered text could not be parsed as a valid answer or mathematical step.",
                    observed_action=f'Entered "{parsed.raw}"',
                    expected_action="Enter a valid numerical value or step-by-step reasoning",
                    is_conceptual=False,
                ),
                confidence_level="high",
            )

        exp_cleaned = expected_answer.strip()
        ans_cleaned = parsed.cleaned

        # Exact String / Numerical Match
        exp_num = None
        match_exp_num = re.search(r"(-?\d+(?:\.\d+)?)", exp_cleaned)
        if match_exp_num:
            exp_num = float(match_exp_num.group(1))

        if parsed.numeric_value is not None and exp_num is not None:
            if abs(parsed.numeric_value - exp_num) < 0.001:
                # Check Unit if expected answer has a unit
                exp_unit = re.search(r"[a-zA-Z/°^2]+", exp_cleaned)
                if exp_unit and parsed.unit:
                    norm_exp = exp_unit.group(0).lower().replace(" ", "")
                    if parsed.unit.normalized != norm_exp:
                        return ReasoningTrace(
                            is_correct=False,
                            classified_error=ClassifiedError(
                                category=ErrorCategory.UNIT_MISMATCH,
                                code="UNIT_MISMATCH",
                                description=f"Numerical answer is correct, but unit '{parsed.unit.raw}' was given instead of '{exp_unit.group(0)}'.",
                                observed_action=f"Used unit {parsed.unit.raw}",
                                expected_action=f"Use unit {exp_unit.group(0)}",
                                is_conceptual=False,
                            ),
                            confidence_level="high",
                        )

                return ReasoningTrace(
                    is_correct=True,
                    classified_error=None,
                    confidence_level="high",
                )

        # Domain: Speed / Rate Operation Inversion (e.g. 120 km in 3 hours -> 360)
        if skill.id == "math.rate.average_speed":
            dist_match = re.search(r"(\d+(?:\.\d+)?)\s*(?:km|kilometres?|kilometers?|m\b|metres?|meters?|miles?)", question_text, re.I)
            time_match = re.search(r"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h\b|seconds?|secs?|s\b|minutes?|mins?|min\b)", question_text, re.I)

            if dist_match and time_match:
                d = float(dist_match.group(1))
                t = float(time_match.group(1))
                if d > 0 and t > 0:
                    multiplied = d * t
                    divided = d / t

                    if parsed.numeric_value is not None:
                        if abs(parsed.numeric_value - multiplied) < 0.01:
                            return ReasoningTrace(
                                is_correct=False,
                                classified_error=ClassifiedError(
                                    category=ErrorCategory.OPERATION_SELECTION_ERROR,
                                    code="RATE_OPERATION_INVERSION",
                                    description="Multiplied distance and time instead of dividing distance by time.",
                                    observed_action=f"{d} * {t} = {multiplied}",
                                    expected_action=f"{d} / {t} = {divided}",
                                    is_conceptual=True,
                                    intermediate_values=[d, t, multiplied],
                                ),
                                observed_operation="*",
                                required_operation="/",
                                confidence_level="high",
                            )

        # Domain: BODMAS Operation Precedence (e.g. 7 + 5 * 3 -> 36 instead of 22)
        if skill.id == "math.bodmas.order_of_operations":
            bodmas_match = re.search(r"(\d+)\s*\+\s*(\d+)\s*[*×]\s*(\d+)", question_text)
            if bodmas_match:
                a, b, c = int(bodmas_match.group(1)), int(bodmas_match.group(2)), int(bodmas_match.group(3))
                wrong_left_to_right = (a + b) * c
                if parsed.numeric_value is not None and abs(parsed.numeric_value - wrong_left_to_right) < 0.001:
                    return ReasoningTrace(
                        is_correct=False,
                        classified_error=ClassifiedError(
                            category=ErrorCategory.PRECEDENCE_ERROR,
                            code="BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                            description=f"Evaluated addition ({a} + {b}) before multiplication (* {c}).",
                            observed_action=f"({a} + {b}) * {c} = {wrong_left_to_right}",
                            expected_action=f"{a} + ({b} * {c}) = {a + b * c}",
                            is_conceptual=True,
                            intermediate_values=[a, b, c, wrong_left_to_right],
                        ),
                        observed_operation="+",
                        required_operation="*",
                        confidence_level="high",
                    )

        # Fallback Inconclusive Deviation
        return ReasoningTrace(
            is_correct=False,
            classified_error=ClassifiedError(
                category=ErrorCategory.INCONCLUSIVE_DEVIATION,
                code="UNCLASSIFIED_DEVIATION",
                description="Submitted answer does not match the expected result, and available evidence is insufficient to verify an exact operational cause.",
                observed_action=f"Submitted {parsed.raw}",
                expected_action=f"Expected {expected_answer}",
                is_conceptual=False,
            ),
            confidence_level="low",
        )
