"""
Tixar Intelligence & Diagnostic Engine
Deterministic Pedagogical Reasoning and Cognitive Repair
"""

from .orchestrator import TixarEngine
from .core.parser import ResponseParser, ParsedAnswer
from .core.evidence import EvidenceExtractor, ExtractedEvidence
from .core.skills import SkillResolver, SkillNode
from .core.reasoning import ReasoningEngine, ReasoningTrace
from .core.errors import ErrorCategory, ClassifiedError
from .knowledge.misconceptions import MisconceptionDetector, DetectedMisconception
from .repair.planner import RepairPlanner, RepairPackage
from .repair.verifier import RepairVerifier
from .response.synthesizer import ResponseSynthesizer

__all__ = [
    "TixarEngine",
    "ResponseParser",
    "ParsedAnswer",
    "EvidenceExtractor",
    "ExtractedEvidence",
    "SkillResolver",
    "SkillNode",
    "ReasoningEngine",
    "ReasoningTrace",
    "ErrorCategory",
    "ClassifiedError",
    "MisconceptionDetector",
    "DetectedMisconception",
    "RepairPlanner",
    "RepairPackage",
    "RepairVerifier",
    "ResponseSynthesizer",
]

__version__ = "1.0.0"
