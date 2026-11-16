"""
Stage 2: Evidence Extractor
Strictly extracts verified evidence from student input without hallucinating unobserved work.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Set
import re

from .parser import ParsedAnswer, ParsedStep, ParsedUnit


@dataclass
class ExtractedEvidence:
    has_work: bool
    is_blank: bool
    is_gibberish: bool
    observed_numbers: List[float] = field(default_factory=list)
    observed_operations: List[str] = field(default_factory=list)
    observed_unit: Optional[str] = None
    observed_steps: List[ParsedStep] = field(default_factory=list)
    raw_answer: str = ""
    evidence_score: float = 0.0
    evidence_tags: Set[str] = field(default_factory=set)


class EvidenceExtractor:
    """Extracts factual, non-hallucinated evidence from parsed student answers."""

    GIBBERISH_PATTERNS = [
        r"^[asdfghjkl;']{5,}$",
        r"^[qwertyuiop]{5,}$",
        r"^[zxcvbnm]{5,}$",
        r"(.)\1{4,}",  # e.g. "aaaaa", "11111"
    ]

    @classmethod
    def is_gibberish(cls, text: str) -> bool:
        cleaned = text.strip().lower()
        if not cleaned:
            return False
        for pattern in cls.GIBBERISH_PATTERNS:
            if re.search(pattern, cleaned):
                return True
        return False

    @classmethod
    def extract(cls, parsed: ParsedAnswer, question_context: Optional[dict] = None) -> ExtractedEvidence:
        if parsed.is_blank:
            return ExtractedEvidence(
                has_work=False,
                is_blank=True,
                is_gibberish=False,
                raw_answer="",
                evidence_score=0.0,
                evidence_tags={"blank_submission"},
            )

        if cls.is_gibberish(parsed.raw):
            return ExtractedEvidence(
                has_work=False,
                is_blank=False,
                is_gibberish=True,
                raw_answer=parsed.raw,
                evidence_score=0.1,
                evidence_tags={"unrecognized_input", "gibberish"},
            )

        observed_numbers: List[float] = []
        if parsed.numeric_value is not None:
            observed_numbers.append(parsed.numeric_value)

        observed_ops: List[str] = []
        for step in parsed.steps:
            if step.operation:
                observed_ops.append(step.operation)
            for op_val in step.operands:
                if op_val not in observed_numbers:
                    observed_numbers.append(op_val)

        # Score calculation based on grounding
        score = 0.3  # Base score for valid text/number
        tags = set()

        if parsed.numeric_value is not None:
            score += 0.2
            tags.add("has_numeric_answer")

        if parsed.unit:
            score += 0.2
            tags.add("has_explicit_unit")

        if parsed.has_working and len(parsed.steps) > 0:
            score += 0.3
            tags.add("has_working_steps")

        evidence_score = min(1.0, score)

        return ExtractedEvidence(
            has_work=parsed.has_working,
            is_blank=False,
            is_gibberish=False,
            observed_numbers=observed_numbers,
            observed_operations=observed_ops,
            observed_unit=parsed.unit.normalized if parsed.unit else None,
            observed_steps=parsed.steps,
            raw_answer=parsed.raw,
            evidence_score=evidence_score,
            evidence_tags=tags,
        )
