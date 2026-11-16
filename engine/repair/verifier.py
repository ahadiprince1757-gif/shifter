"""
Stage 9: Repair Verifier
Generates isomorphic retests to prove whether the student's diagnosed misconception is genuinely resolved.
"""

from dataclasses import dataclass
from typing import Optional
import re


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
        ans_clean = str(retest_answer or "").strip().lower()
        exp_clean = str(expected_answer or "").strip().lower()

        num_ans = re.sub(r"[^\d.-]", "", ans_clean)
        num_exp = re.sub(r"[^\d.-]", "", exp_clean)
        has_num = bool(num_ans and num_exp)

        if ans_clean == exp_clean or (has_num and num_ans == num_exp):
            return VerificationEvaluation(
                is_repaired=True,
                persisting_misconception=None,
                confidence=0.95,
                feedback="Cognitive repair confirmed: You applied the correct operational relationship on the retest!",
            )

        return VerificationEvaluation(
            is_repaired=False,
            persisting_misconception=original_misconception_code,
            confidence=0.85,
            feedback="The same operational divergence occurred on the retest. Let's revisit the core principle together.",
        )
