"""
Stage 8: Response Synthesizer
Generates empathetic, human-like pedagogical dialogue from structured deterministic diagnoses.
"""

from typing import Dict, Any, Optional
from ..core.errors import ClassifiedError, ErrorCategory
from ..core.skills import SkillNode
from ..knowledge.misconceptions import DetectedMisconception
from ..repair.planner import RepairPackage


class ResponseSynthesizer:
    """Turns verified diagnostic structures into warm, supportive teacher guidance."""

    @classmethod
    def synthesize(
        cls,
        is_correct: bool,
        error: Optional[ClassifiedError],
        misconception: Optional[DetectedMisconception],
        skill: SkillNode,
        repair: RepairPackage,
        question_text: str,
        student_answer: str,
        expected_answer: str,
    ) -> Dict[str, Any]:
        """Produces a structured UI response matching Tixar's TeacherFeedbackView contract."""

        if is_correct:
            return {
                "status": "correct",
                "errorType": None,
                "whatYouDid": f"You correctly answered: {student_answer}",
                "whyThisIsWrong": [],
                "theRightWay": [f"Expected: {expected_answer}"],
                "remember": "Great job! Your mathematical reasoning is solid.",
                "conversational_feedback": (
                    f"Spot on! You arrived at {student_answer}, which is completely correct. "
                    f"You demonstrated a clear grasp of {skill.name}."
                ),
                "probe": None,
                "repair": None,
                "retest": None,
            }

        if error and error.category == ErrorCategory.BLANK_SUBMISSION:
            return {
                "status": "blank",
                "errorType": "BLANK_SUBMISSION",
                "whatYouDid": "No answer was submitted.",
                "whyThisIsWrong": ["The answer box was left blank."],
                "theRightWay": [f"Expected answer: {expected_answer}"],
                "remember": repair.rule_to_remember,
                "conversational_feedback": (
                    f"Let's tackle this together! The question is asking for {skill.name}. "
                    "Start by writing down what numbers are given, then isolate what we need to find."
                ),
                "probe": None,
                "repair": None,
                "retest": None,
            }

        # Specific Teacher Voice for Rate Operation Inversion (The 120km in 3h -> 360 example)
        if error and error.code == "RATE_OPERATION_INVERSION":
            d, t, mult = error.intermediate_values if len(error.intermediate_values) >= 3 else (120, 3, 360)
            conversational = (
                f"Your arithmetic calculation of {d} × {t} = {mult} is correct, but the operation is the problem.\n\n"
                f'You multiplied {d} × {t} because you treated "{t} hours" as something to combine with the distance. '
                f"But average speed asks:\n\n"
                f"How much distance was covered in each single hour?\n\n"
                f"So we divide the total distance across the total time:\n"
                f"{d} ÷ {t} = {expected_answer}.\n\n"
                "The important fix isn't just memorizing speed = distance ÷ time. "
                "It's recognizing that you're distributing the total distance evenly across the hours."
            )

            return {
                "status": "diagnosed",
                "errorType": "OPERATION_SELECTION_ERROR",
                "whatYouDid": f"You multiplied {d} × {t} = {mult}.",
                "whyThisIsWrong": [
                    f"Your arithmetic is correct, but multiplication is the wrong operation here.",
                    f"Average speed asks: 'How much distance was covered in each single hour?'",
                    f"When we want to know the rate per hour, we divide the total distance by the total time, not multiply.",
                ],
                "theRightWay": [
                    "Average Speed = Total Distance ÷ Total Time",
                    f"{d} km ÷ {t} hours = {expected_answer}",
                ],
                "remember": repair.rule_to_remember,
                "conversational_feedback": conversational,
                "probe": repair.probe_question,
                "repair": {
                    "principle": "Average speed is a rate: it measures quantity per one unit of time.",
                    "counterExample": repair.counter_example,
                },
                "retest": repair.retest_question,
            }

        # Specific Teacher Voice for BODMAS Precedence
        if error and error.code == "BODMAS_ADDITION_BEFORE_MULTIPLICATION":
            a, b, c, wrong = error.intermediate_values if len(error.intermediate_values) >= 4 else (7, 5, 3, 36)
            conversational = (
                f"You added {a} + {b} first to get {a + b}, then multiplied by {c} to get {wrong}.\n\n"
                f"It's very natural to read expressions from left to right like words in a sentence, "
                f"but in mathematics, multiplication binds numbers together into groups first.\n\n"
                f"Think of {b} × {c} as a single combined pack ({b * c}). "
                f"We must evaluate the multiplication first:\n"
                f"{b} × {c} = {b * c}, and then add: {a} + {b * c} = {a + b * c}."
            )

            return {
                "status": "diagnosed",
                "errorType": "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                "whatYouDid": f"You evaluated addition ({a} + {b}) before multiplication (× {c}).",
                "whyThisIsWrong": [
                    "According to mathematical precedence (BODMAS / PEMDAS), multiplication must be calculated before addition.",
                    f"In {a} + {b} × {c}, the {b} is attached to {c} by multiplication.",
                ],
                "theRightWay": [
                    f"Step 1 (Multiply first): {b} × {c} = {b * c}",
                    f"Step 2 (Add next): {a} + {b * c} = {expected_answer}",
                ],
                "remember": repair.rule_to_remember,
                "conversational_feedback": conversational,
                "probe": repair.probe_question,
                "repair": {
                    "principle": "Multiplication groups numbers together before addition combines them.",
                    "counterExample": "If you have 3 coins and 2 bags of 5 coins, you have 3 + 10 = 13 coins, not (3+2)*5 = 25.",
                },
                "retest": repair.retest_question,
            }

        # Standard Didactic Fallback
        return {
            "status": "diagnosed" if (error and error.is_conceptual) else "inconclusive",
            "errorType": error.code if error else "UNCLASSIFIED_DEVIATION",
            "whatYouDid": repair.affirmation,
            "whyThisIsWrong": [repair.pivot_explanation] if repair.pivot_explanation else [],
            "theRightWay": repair.canonical_steps,
            "remember": repair.rule_to_remember,
            "conversational_feedback": repair.pivot_explanation,
            "probe": repair.probe_question,
            "repair": {"principle": repair.rule_to_remember, "counterExample": repair.counter_example} if repair.counter_example else None,
            "retest": repair.retest_question,
        }
