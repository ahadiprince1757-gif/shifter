"""
Stage 7: Repair Engine
Builds the minimal effective pedagogical intervention to correct the student's cognitive model.
"""

from dataclasses import dataclass, field
from typing import Optional, List

from ..core.errors import ClassifiedError, ErrorCategory
from ..core.skills import SkillNode
from ..knowledge.misconceptions import DetectedMisconception


@dataclass
class RepairPackage:
    strategy_name: str
    affirmation: str
    pivot_explanation: str
    canonical_steps: List[str]
    rule_to_remember: str
    counter_example: Optional[str] = None
    probe_question: Optional[dict] = None
    retest_question: Optional[dict] = None


class RepairPlanner:
    """Constructs the targeted, minimal cognitive intervention."""

    @classmethod
    def plan(
        cls,
        error: Optional[ClassifiedError],
        misconception: Optional[DetectedMisconception],
        skill: SkillNode,
        expected_answer: str,
        student_answer: str,
    ) -> RepairPackage:
        if not error or error.category == ErrorCategory.CORRECT:
            return RepairPackage(
                strategy_name="affirmation_and_extension",
                affirmation=f"Great job! Your answer of {student_answer} is mathematically sound.",
                pivot_explanation="You demonstrated accurate conceptual understanding and calculation.",
                canonical_steps=[f"Target answer: {expected_answer}"],
                rule_to_remember="Keep applying these clean mathematical transitions.",
            )

        if error.category == ErrorCategory.BLANK_SUBMISSION:
            return RepairPackage(
                strategy_name="scaffold_starting_step",
                affirmation="Let's start from the beginning together.",
                pivot_explanation=f"First, identify what the problem is asking for. The question targets {skill.name}.",
                canonical_steps=[f"Target formula: {skill.canonical_formula or 'Step 1'}", f"Expected result: {expected_answer}"],
                rule_to_remember="Always write down what values are given before calculating.",
            )

        if error.category == ErrorCategory.UNRECOGNIZED_INPUT:
            return RepairPackage(
                strategy_name="format_clarification",
                affirmation="I noticed you submitted an answer, but the format could not be verified.",
                pivot_explanation="Write your calculation as a clear number, fraction, or standard expression.",
                canonical_steps=[f"Expected answer format: {expected_answer}"],
                rule_to_remember="Use standard numbers, decimals, or fractions without unexpected symbols.",
            )

        # Misconception-Driven Repair
        if misconception:
            probe_dict = None
            if misconception.probe:
                probe_dict = {
                    "question": misconception.probe.question,
                    "options": misconception.probe.options,
                    "correctAnswer": misconception.probe.correct_answer,
                    "purpose": misconception.probe.purpose,
                }

            retest_dict = None
            if misconception.retest_question and misconception.retest_expected_answer:
                retest_dict = {
                    "question": misconception.retest_question,
                    "expectedAnswer": misconception.retest_expected_answer,
                }

            counter_ex = misconception.repair_plan.counter_example if misconception.repair_plan else None

            return RepairPackage(
                strategy_name=misconception.code,
                affirmation="You worked actively on the problem, but a specific concept caused a divergence.",
                pivot_explanation=misconception.mental_model_breakdown,
                canonical_steps=[
                    f"Formula: {skill.canonical_formula or 'Apply rate definition'}",
                    f"Target Result: {expected_answer}",
                ],
                rule_to_remember=misconception.rule_to_remember,
                counter_example=counter_ex,
                probe_question=probe_dict,
                retest_question=retest_dict,
            )

        # Unit Mismatch Repair
        if error.category == ErrorCategory.UNIT_MISMATCH:
            return RepairPackage(
                strategy_name="unit_alignment",
                affirmation="Your numerical computation is completely correct!",
                pivot_explanation=error.description,
                canonical_steps=[f"Expected answer with unit: {expected_answer}"],
                rule_to_remember="Always check the required compound units before finalizing your answer.",
            )

        # General Fallback
        return RepairPackage(
            strategy_name="step_by_step_scaffolding",
            affirmation=f'You submitted "{student_answer}".',
            pivot_explanation=error.description,
            canonical_steps=[f"Expected answer: {expected_answer}"],
            rule_to_remember=skill.core_concept or "Check each transformation carefully.",
        )
