"""
Stage 8: Response Synthesizer
Generates structured diagnostic evidence contracts paired with empathetic teacher explanations.
"""

from typing import Dict, Any, Optional, List
from ..core.errors import ClassifiedError, ErrorCategory
from ..core.skills import SkillNode
from ..knowledge.misconceptions import DetectedMisconception
from ..repair.planner import RepairPackage


class ResponseSynthesizer:
    """Turns verified diagnostic structures into structured evidence plus human teacher guidance."""

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
        evidence_score: float = 1.0,
    ) -> Dict[str, Any]:
        """Produces a structured diagnostic evidence contract for Tixar."""

        # Case 1: Verified Correct Answer
        if is_correct:
            return {
                "status": "correct",
                "answer": {
                    "correct": True,
                    "confidence": 1.0,
                    "submitted": student_answer,
                    "expected": expected_answer,
                },
                "error": {
                    "detected": False,
                    "code": None,
                    "category": None,
                    "confidence": 1.0,
                    "description": "Submitted answer is correct.",
                },
                "cause": {
                    "identified": False,
                    "misconceptionCode": None,
                    "mentalModel": "Accurate conceptual grasp and calculation.",
                    "confidence": 1.0,
                },
                "repair": {
                    "identified": False,
                    "strategy": "affirmation",
                    "principle": "Reinforce correct understanding.",
                    "ruleToRemember": "Well done! Your mathematical reasoning is solid.",
                    "counterExample": None,
                    "canonicalSteps": [f"Expected: {expected_answer}"],
                    "confidence": 1.0,
                },
                "evidence": [
                    {"type": "exact_match", "observed": student_answer}
                ],
                "probe": None,
                "retest": None,
                # UI compatibility fields for TeacherFeedbackView.jsx
                "whatYouDid": f"You correctly answered: {student_answer}",
                "whyThisIsWrong": [],
                "theRightWay": [f"Expected: {expected_answer}"],
                "remember": "Great job! Your mathematical reasoning is solid.",
                "naturalExplanation": f"Spot on! You arrived at {student_answer}, which is completely correct.",
            }

        # Case 2: Blank Submission
        if error and error.category == ErrorCategory.BLANK_SUBMISSION:
            return {
                "status": "blank",
                "answer": {
                    "correct": False,
                    "confidence": 1.0,
                    "submitted": "",
                    "expected": expected_answer,
                },
                "error": {
                    "detected": True,
                    "code": "BLANK_SUBMISSION",
                    "category": "BLANK_SUBMISSION",
                    "confidence": 1.0,
                    "description": "No answer was submitted.",
                },
                "cause": {
                    "identified": False,
                    "misconceptionCode": None,
                    "mentalModel": "Unattempted question.",
                    "confidence": 0.0,
                },
                "repair": {
                    "identified": True,
                    "strategy": "scaffold_start",
                    "principle": "Identify given quantities first.",
                    "ruleToRemember": repair.rule_to_remember,
                    "counterExample": None,
                    "canonicalSteps": [f"Expected answer: {expected_answer}"],
                    "confidence": 0.9,
                },
                "evidence": [{"type": "blank_submission", "observed": "empty_string"}],
                "probe": None,
                "retest": None,
                "whatYouDid": "No answer was submitted.",
                "whyThisIsWrong": ["The answer box was left blank."],
                "theRightWay": [f"Expected answer: {expected_answer}"],
                "remember": repair.rule_to_remember,
                "naturalExplanation": f"Let's tackle this together! The question is asking for {skill.name}.",
            }

        # Case 3: Rate Operation Inversion (e.g. 120km in 3h -> 360)
        if error and error.code == "RATE_OPERATION_INVERSION":
            d, t, mult = error.intermediate_values if len(error.intermediate_values) >= 3 else (120, 3, 360)
            natural_text = (
                f"Your arithmetic calculation of {d} × {t} = {mult} is correct, but the operation is the problem.\n\n"
                f'You multiplied {d} × {t} because you treated "{t} hours" as something to combine with the distance. '
                f"But average speed asks: How much distance was covered in each single hour?\n\n"
                f"So we divide the total distance across the total time: {d} ÷ {t} = {expected_answer}.\n\n"
                "The important fix isn't just memorizing speed = distance ÷ time. "
                "It's recognizing that you're distributing the total distance evenly across the hours."
            )

            return {
                "status": "diagnosed",
                "answer": {
                    "correct": False,
                    "confidence": 1.0,
                    "submitted": student_answer,
                    "expected": expected_answer,
                },
                "error": {
                    "detected": True,
                    "code": "OPERATION_SELECTION_ERROR",
                    "category": "OPERATION_SELECTION_ERROR",
                    "confidence": 0.98,
                    "description": f"Multiplied distance ({d}) by time ({t}) instead of dividing.",
                },
                "cause": {
                    "identified": True,
                    "misconceptionCode": "RATE_OPERATION_INVERSION",
                    "mentalModel": "Treated time interval as a scaling multiplier rather than distributing distance across time.",
                    "confidence": 0.95,
                },
                "repair": {
                    "identified": True,
                    "strategy": "RATE_OPERATION_INVERSION",
                    "principle": "Average speed is a rate: it measures quantity per one unit of time.",
                    "ruleToRemember": repair.rule_to_remember,
                    "counterExample": repair.counter_example,
                    "canonicalSteps": [
                        "Average Speed = Total Distance ÷ Total Time",
                        f"{d} km ÷ {t} hours = {expected_answer}",
                    ],
                    "confidence": 0.95,
                },
                "evidence": [
                    {"type": "observed_calculation", "observed": f"{d} * {t} = {mult}"},
                    {"type": "observed_answer", "observed": student_answer},
                    {"type": "expected_canonical", "observed": expected_answer},
                ],
                "probe": repair.probe_question,
                "retest": repair.retest_question,
                "whatYouDid": f"You multiplied {d} × {t} = {mult}.",
                "whyThisIsWrong": [
                    "Your arithmetic is correct, but multiplication is the wrong operation here.",
                    "Average speed asks: 'How much distance was covered in each single hour?'",
                    "When we want to know the rate per hour, we divide the total distance by the total time, not multiply.",
                ],
                "theRightWay": [
                    "Average Speed = Total Distance ÷ Total Time",
                    f"{d} km ÷ {t} hours = {expected_answer}",
                ],
                "remember": repair.rule_to_remember,
                "naturalExplanation": natural_text,
            }

        # Case 4: BODMAS Precedence Inversion
        if error and error.code == "BODMAS_ADDITION_BEFORE_MULTIPLICATION":
            a, b, c, wrong = error.intermediate_values if len(error.intermediate_values) >= 4 else (7, 5, 3, 36)
            natural_text = (
                f"You added {a} + {b} first to get {a + b}, then multiplied by {c} to get {wrong}.\n\n"
                f"In mathematics, multiplication groups numbers together before addition combines them.\n\n"
                f"We must evaluate the multiplication first: {b} × {c} = {b * c}, and then add: {a} + {b * c} = {expected_answer}."
            )

            return {
                "status": "diagnosed",
                "answer": {
                    "correct": False,
                    "confidence": 1.0,
                    "submitted": student_answer,
                    "expected": expected_answer,
                },
                "error": {
                    "detected": True,
                    "code": "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                    "category": "PRECEDENCE_ERROR",
                    "confidence": 0.98,
                    "description": f"Evaluated addition ({a} + {b}) before multiplication (× {c}).",
                },
                "cause": {
                    "identified": True,
                    "misconceptionCode": "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                    "mentalModel": "Evaluated operations sequentially left-to-right ignoring operator precedence.",
                    "confidence": 0.95,
                },
                "repair": {
                    "identified": True,
                    "strategy": "BODMAS_ADDITION_BEFORE_MULTIPLICATION",
                    "principle": "Multiplication groups numbers together before addition combines them.",
                    "ruleToRemember": repair.rule_to_remember,
                    "counterExample": "In 3 + 2 * 5, you have 3 loose items and 2 bags of 5 items: 3 + 10 = 13, not (3+2)*5 = 25.",
                    "canonicalSteps": [
                        f"Step 1 (Multiply first): {b} × {c} = {b * c}",
                        f"Step 2 (Add next): {a} + {b * c} = {expected_answer}",
                    ],
                    "confidence": 0.95,
                },
                "evidence": [
                    {"type": "observed_answer", "observed": student_answer},
                    {"type": "computed_left_to_right", "observed": str(wrong)},
                ],
                "probe": repair.probe_question,
                "retest": repair.retest_question,
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
                "naturalExplanation": natural_text,
            }

        # Case 5: Inconclusive / General Deviation
        has_misconception = bool(misconception)
        return {
            "status": "diagnosed" if has_misconception else "inconclusive",
            "answer": {
                "correct": False,
                "confidence": 1.0,
                "submitted": student_answer,
                "expected": expected_answer,
            },
            "error": {
                "detected": True,
                "code": error.code if error else "UNCLASSIFIED_DEVIATION",
                "category": error.category.value if error else "INCONCLUSIVE_DEVIATION",
                "confidence": 0.70 if has_misconception else 0.35,
                "description": error.description if error else "Divergence from expected answer.",
            },
            "cause": {
                "identified": has_misconception,
                "misconceptionCode": misconception.code if misconception else None,
                "mentalModel": misconception.mental_model_breakdown if misconception else "Reasoning cause unverified from available input.",
                "confidence": 0.75 if has_misconception else 0.20,
            },
            "repair": {
                "identified": has_misconception,
                "strategy": repair.strategy_name,
                "principle": skill.core_concept or "Check each transformation carefully.",
                "ruleToRemember": repair.rule_to_remember,
                "counterExample": repair.counter_example,
                "canonicalSteps": repair.canonical_steps,
                "confidence": 0.70 if has_misconception else 0.30,
            },
            "evidence": [
                {"type": "submitted_value", "observed": student_answer},
                {"type": "expected_value", "observed": expected_answer},
            ],
            "probe": repair.probe_question,
            "retest": repair.retest_question,
            "whatYouDid": repair.affirmation,
            "whyThisIsWrong": [repair.pivot_explanation] if repair.pivot_explanation else [],
            "theRightWay": repair.canonical_steps,
            "remember": repair.rule_to_remember,
            "naturalExplanation": repair.pivot_explanation,
        }
