"""
Stage 3: Skill & Competency Resolver
Maps question context, subjects, and topics into canonical skill ontology nodes.
"""

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class SkillNode:
    id: str
    subject: str
    domain: str
    name: str
    canonical_formula: Optional[str] = None
    core_concept: str = ""


CANONICAL_SKILLS = {
    "math.rate.average_speed": SkillNode(
        id="math.rate.average_speed",
        subject="mathematics",
        domain="kinematics_rates",
        name="Average Speed Calculation",
        canonical_formula="Speed = Total Distance / Total Time",
        core_concept="Rate as distribution of total distance across total time interval",
    ),
    "math.bodmas.order_of_operations": SkillNode(
        id="math.bodmas.order_of_operations",
        subject="mathematics",
        domain="arithmetic_precedence",
        name="Order of Operations (BODMAS / PEMDAS)",
        canonical_formula="Brackets -> Orders -> Div/Mul -> Add/Sub",
        core_concept="Multiplication and division precede addition and subtraction",
    ),
    "math.fractions.addition": SkillNode(
        id="math.fractions.addition",
        subject="mathematics",
        domain="fractions",
        name="Fraction Addition",
        canonical_formula="a/b + c/d = (ad + bc) / bd",
        core_concept="Denominators indicate partition size and must be common before adding",
    ),
    "physics.force.mass_vs_weight": SkillNode(
        id="physics.force.mass_vs_weight",
        subject="physics",
        domain="mechanics",
        name="Mass vs Weight Distinction",
        canonical_formula="Weight = Mass * Gravitational Acceleration (W = mg)",
        core_concept="Mass is invariant matter quantity; Weight is downward gravitational force",
    ),
    "physics.kinematics.speed_vs_velocity": SkillNode(
        id="physics.kinematics.speed_vs_velocity",
        subject="physics",
        domain="kinematics",
        name="Speed vs Velocity (Scalar vs Vector)",
        canonical_formula="Velocity = Displacement / Time with direction",
        core_concept="Speed is scalar magnitude; Velocity includes direction of motion",
    ),
    "biology.energetics.photosynthesis_vs_respiration": SkillNode(
        id="biology.energetics.photosynthesis_vs_respiration",
        subject="biology",
        domain="cell_energetics",
        name="Photosynthesis vs Cellular Respiration",
        canonical_formula="Respiration: Glucose + O2 -> CO2 + H2O + ATP (Continuous)",
        core_concept="Plant cells perform cellular respiration continuously day and night",
    ),
    "chemistry.acids_bases.ph_scale": SkillNode(
        id="chemistry.acids_bases.ph_scale",
        subject="chemistry",
        domain="acids_and_bases",
        name="pH Scale Interpretation",
        canonical_formula="pH = -log[H+]",
        core_concept="Inverse logarithmic scale: Lower pH indicates higher acidity",
    ),
}


class SkillResolver:
    """Resolves questions, subjects, and topics into canonical skill nodes."""

    @classmethod
    def resolve(cls, question_text: str, subject: Optional[str] = None, topic: Optional[str] = None) -> SkillNode:
        q = (question_text or "").lower()
        sub = (subject or "").lower()
        top = (topic or "").lower()

        # Average Speed / Rate
        if ("average speed" in q or "speed" in q or "rate" in top) and ("distance" in q or "travel" in q or "km" in q or "journey" in q):
            return CANONICAL_SKILLS["math.rate.average_speed"]

        # BODMAS
        if "bodmas" in top or "order of operations" in top or any(op in q for op in ["+", "-", "*", "/", "×", "÷"]):
            if any(term in q for term in ["calculate", "evaluate", "simplify"]):
                return CANONICAL_SKILLS["math.bodmas.order_of_operations"]

        # Fractions
        if "/" in q and ("+" in q or "add" in q or "sum" in q):
            return CANONICAL_SKILLS["math.fractions.addition"]

        # Mass vs Weight
        if "mass" in q and "weight" in q:
            return CANONICAL_SKILLS["physics.force.mass_vs_weight"]

        # Speed vs Velocity
        if "speed" in q and "velocity" in q:
            return CANONICAL_SKILLS["physics.kinematics.speed_vs_velocity"]

        # Respiration / Photosynthesis
        if "respir" in q or "photosynth" in q:
            return CANONICAL_SKILLS["biology.energetics.photosynthesis_vs_respiration"]

        # pH
        if "ph" in q and ("acid" in q or "base" in q or "alkal" in q):
            return CANONICAL_SKILLS["chemistry.acids_bases.ph_scale"]

        # Fallback default node
        return SkillNode(
            id=f"{sub or 'general'}.{top or 'general'}",
            subject=sub or "general",
            domain="general",
            name=topic or "General Problem Solving",
            core_concept="Core conceptual understanding and method execution",
        )
