"""
Stage 6: Misconception Detector
Catalogs and identifies cognitive misconceptions from classified reasoning traces.
"""

from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any

from ..core.errors import ClassifiedError, ErrorCategory
from ..core.skills import SkillNode


@dataclass
class DiagnosticProbe:
    question: str
    options: List[str]
    correct_answer: str
    purpose: str


@dataclass
class CognitiveRepairPlan:
    principle: str
    counter_example: str


@dataclass
class DetectedMisconception:
    code: str
    name: str
    mental_model_breakdown: str
    rule_to_remember: str
    probe: Optional[DiagnosticProbe] = None
    repair_plan: Optional[CognitiveRepairPlan] = None
    retest_question: Optional[str] = None
    retest_expected_answer: Optional[str] = None


class MisconceptionDetector:
    """Diagnoses the underlying cognitive misconception from classified reasoning errors."""

    @classmethod
    def detect(cls, error: Optional[ClassifiedError], skill: SkillNode) -> Optional[DetectedMisconception]:
        if not error or error.category == ErrorCategory.CORRECT:
            return None

        # Speed / Rate Operation Inversion
        if error.code == "RATE_OPERATION_INVERSION":
            d, t, mult = error.intermediate_values if len(error.intermediate_values) >= 3 else (120, 3, 360)
            return DetectedMisconception(
                code="RATE_OPERATION_INVERSION",
                name="Multiplying Rate Quantities Instead of Partitioning",
                mental_model_breakdown=(
                    f"You treated the time interval ({t} hours) as a quantity to combine or multiply with distance ({d} km), "
                    f"yielding {mult} km/h. In reality, average speed is a rate: it measures how much distance corresponds to ONE single hour."
                ),
                rule_to_remember="Speed = Distance ÷ Time. You must divide total distance across the time taken.",
                probe=DiagnosticProbe(
                    question="If an athlete runs 40 km in 2 hours, what is their average speed?",
                    options=["20 km/h", "80 km/h", "42 km/h", "38 km/h"],
                    correct_answer="20 km/h",
                    purpose="Verifies whether the learner distributes distance across hours instead of multiplying.",
                ),
                repair_plan=CognitiveRepairPlan(
                    principle="A rate distributes a total quantity across units of time.",
                    counter_example=f"If you travel {d} km in {t} hours, you cannot be traveling {mult} km in each hour — the entire trip was only {d} km!",
                ),
                retest_question="A delivery van travels 180 km in 3 hours. Calculate its average speed.",
                retest_expected_answer="60 km/h",
            )

        # BODMAS Order of Operations
        if error.code == "BODMAS_ADDITION_BEFORE_MULTIPLICATION":
            return DetectedMisconception(
                code="BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                name="Evaluating Operations Sequentially Left-to-Right",
                mental_model_breakdown=(
                    "You evaluated addition before multiplication simply because addition appeared first reading from left to right. "
                    "However, multiplication represents grouped quantities and must always be combined before adding independent terms."
                ),
                rule_to_remember="Multiplication and Division always take priority over Addition and Subtraction.",
                probe=DiagnosticProbe(
                    question="Evaluate: 10 + 2 * 4",
                    options=["18", "48", "24", "16"],
                    correct_answer="18",
                    purpose="Verifies whether learner multiplies 2 * 4 first (8) before adding 10.",
                ),
                repair_plan=CognitiveRepairPlan(
                    principle="Order of operations reflects algebraic structure, not reading order.",
                    counter_example="In 3 + 2 * 5, you have 3 loose items and 2 bags of 5 items. You have 3 + 10 = 13 items, not (3+2)*5 = 25.",
                ),
                retest_question="Calculate: 6 + 4 * 3",
                retest_expected_answer="18",
            )

        # Generic Conceptual Fallback
        if error.is_conceptual:
            return DetectedMisconception(
                code=error.code,
                name=error.description,
                mental_model_breakdown=f"A divergence occurred: {error.observed_action}. Expected transition: {error.expected_action}.",
                rule_to_remember=skill.core_concept or "Check each operational transformation carefully before proceeding.",
            )

        return None
