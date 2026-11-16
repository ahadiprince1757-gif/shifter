"""
Tixar Intelligence Engine Orchestrator
Connects all 9 stages into a single deterministic pedagogical reasoning pipeline.
"""

from typing import Dict, Any, Optional

from .core.parser import ResponseParser
from .core.evidence import EvidenceExtractor
from .core.skills import SkillResolver
from .core.reasoning import ReasoningEngine
from .knowledge.misconceptions import MisconceptionDetector
from .repair.planner import RepairPlanner
from .response.synthesizer import ResponseSynthesizer


class TixarEngine:
    """The central deterministic pedagogical reasoning engine for Tixar."""

    @classmethod
    def diagnose(
        cls,
        student_answer: str,
        question_text: str,
        expected_answer: str,
        user_work: Optional[str] = None,
        subject: Optional[str] = None,
        topic: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Runs the 9-stage diagnostic pipeline and returns a structured pedagogical result."""

        # Stage 1: Parse response
        parsed = ResponseParser.parse(student_answer, user_work)

        # Stage 2: Extract evidence
        evidence = EvidenceExtractor.extract(parsed)

        # Stage 3: Resolve skill
        skill = SkillResolver.resolve(question_text, subject, topic)

        # Stage 4 & 5: Reason and classify error
        trace = ReasoningEngine.evaluate(parsed, evidence, skill, question_text, expected_answer)

        # Stage 6: Detect misconception
        misconception = MisconceptionDetector.detect(trace.classified_error, skill)

        # Stage 7 & 9: Plan repair and retest
        repair = RepairPlanner.plan(trace.classified_error, misconception, skill, expected_answer, student_answer)

        # Stage 8: Synthesize natural response with structured evidence
        result = ResponseSynthesizer.synthesize(
            is_correct=trace.is_correct,
            error=trace.classified_error,
            misconception=misconception,
            skill=skill,
            repair=repair,
            question_text=question_text,
            student_answer=student_answer,
            expected_answer=expected_answer,
            evidence_score=evidence.evidence_score,
        )

        # Attach metadata
        result["metadata"] = {
            "skillId": skill.id,
            "skillName": skill.name,
            "confidence": trace.confidence_level,
            "hasWork": evidence.has_work,
            "evidenceScore": evidence.evidence_score,
            "isCorrect": trace.is_correct,
        }

        return result
