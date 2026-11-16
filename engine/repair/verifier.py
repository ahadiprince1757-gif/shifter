"""
Stage 9: Repair Verifier
Generates isomorphic retests to prove whether the student's diagnosed misconception is genuinely resolved.
"""

from dataclasses import dataclass
from typing import Optional
from fractions import Fraction
import re

from ..core.parser import ResponseParser


@dataclass
class VerificationEvaluation:
    is_repaired: bool
    persisting_misconception: Optional[str]
    confidence: float
    feedback: str


class RepairVerifier:
    """Verifies student responses on retest questions."""

    @classmethod
    def verify(
        cls,
        retest_answer: str,
        expected_answer: str,
        original_misconception_code: str,
    ) -> VerificationEvaluation:
        ans_raw = str(retest_answer or "").strip()
        exp_raw = str(expected_answer or "").strip()

        # Invariant 1: Blank submission is never repaired
        if not ans_raw:
            return VerificationEvaluation(
                is_repaired=False,
                persisting_misconception=original_misconception_code,
                confidence=1.0,
                feedback="No answer was submitted for the verification retest.",
            )

        ans_clean = ResponseParser.clean_text(ans_raw).lower()
        exp_clean = ResponseParser.clean_text(exp_raw).lower()

        # Invariant 2: Exact string match
        if ans_clean == exp_clean:
            return VerificationEvaluation(
                is_repaired=True,
                persisting_misconception=None,
                confidence=1.0,
                feedback="Cognitive repair confirmed: Your answer matches the target expected result exactly.",
            )

        # Invariant 3: Fraction equivalence (e.g. "1/2" vs "2/4" or "0.5")
        frac_ans = ResponseParser.extract_fraction(ans_clean)
        frac_exp = ResponseParser.extract_fraction(exp_clean)

        if frac_ans is not None and frac_exp is not None:
            if frac_ans == frac_exp:
                return VerificationEvaluation(
                    is_repaired=True,
                    persisting_misconception=None,
                    confidence=0.98,
                    feedback="Cognitive repair confirmed: Correct fraction equivalence demonstrated.",
                )

        # Invariant 4: Numerical value & unit comparison
        num_ans, unit_ans = ResponseParser.extract_number_and_unit(ans_clean)
        num_exp, unit_exp = ResponseParser.extract_number_and_unit(exp_clean)

        # Also support fraction to decimal comparison (e.g. 1/2 == 0.5)
        if frac_ans is not None and num_exp is not None:
            if abs(float(frac_ans) - num_exp) < 0.001:
                return VerificationEvaluation(
                    is_repaired=True,
                    persisting_misconception=None,
                    confidence=0.98,
                    feedback="Cognitive repair confirmed: Correct fractional-to-decimal value provided.",
                )

        if num_ans is not None and frac_exp is not None:
            if abs(num_ans - float(frac_exp)) < 0.001:
                return VerificationEvaluation(
                    is_repaired=True,
                    persisting_misconception=None,
                    confidence=0.98,
                    feedback="Cognitive repair confirmed: Correct decimal representation of fraction.",
                )

        if num_ans is not None and num_exp is not None:
            if abs(num_ans - num_exp) < 0.001:
                # Check units if expected has an explicit unit
                if unit_exp and unit_ans:
                    if unit_ans.normalized == unit_exp.normalized:
                        return VerificationEvaluation(
                            is_repaired=True,
                            persisting_misconception=None,
                            confidence=0.95,
                            feedback="Cognitive repair confirmed: You applied the correct operational relationship on the retest!",
                        )
                    else:
                        return VerificationEvaluation(
                            is_repaired=False,
                            persisting_misconception=f"{original_misconception_code}_UNIT_MISMATCH",
                            confidence=0.85,
                            feedback=f"The numerical value ({num_ans}) is correct, but unit '{unit_ans.raw}' does not match '{unit_exp.raw}'.",
                        )
                # If student omitted unit but value is exact
                return VerificationEvaluation(
                    is_repaired=True,
                    persisting_misconception=None,
                    confidence=0.90,
                    feedback="Cognitive repair confirmed: Correct numerical solution achieved.",
                )

        # If values diverge
        return VerificationEvaluation(
            is_repaired=False,
            persisting_misconception=original_misconception_code,
            confidence=0.85,
            feedback="The same operational divergence occurred on the retest. Let's revisit the core principle together.",
        )
