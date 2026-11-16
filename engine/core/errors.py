"""
Stage 5: Error Classifier
Strict taxonomy of pedagogical error categories to prevent conflating computational and conceptual errors.
"""

from enum import Enum
from dataclasses import dataclass, field
from typing import Optional, List


class ErrorCategory(str, Enum):
    CORRECT = "CORRECT"
    OPERATION_SELECTION_ERROR = "OPERATION_SELECTION_ERROR"
    ARITHMETIC_SLIP = "ARITHMETIC_SLIP"
    PRECEDENCE_ERROR = "PRECEDENCE_ERROR"
    SIGN_ERROR = "SIGN_ERROR"
    UNIT_MISMATCH = "UNIT_MISMATCH"
    DISTINCTION_CONFUSION = "DISTINCTION_CONFUSION"
    PROCESS_INVERSION = "PROCESS_INVERSION"
    PARTIAL_CONCEPT_COVERAGE = "PARTIAL_CONCEPT_COVERAGE"
    INCONCLUSIVE_DEVIATION = "INCONCLUSIVE_DEVIATION"
    UNRECOGNIZED_INPUT = "UNRECOGNIZED_INPUT"
    BLANK_SUBMISSION = "BLANK_SUBMISSION"


@dataclass
class ClassifiedError:
    category: ErrorCategory
    code: str
    description: str
    observed_action: str
    expected_action: str
    is_conceptual: bool
    intermediate_values: List[float] = field(default_factory=list)

    def __post_init__(self):
        pass
