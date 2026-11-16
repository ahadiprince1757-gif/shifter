"""
Stage 1: Response & Expression Parser
Parses student inputs, steps, numbers, units, and expressions deterministically.
"""

from dataclasses import dataclass, field
from fractions import Fraction
import re
from typing import List, Optional, Tuple, Union

UNIT_ALIASES = {
    "kilometre": "km",
    "kilometres": "km",
    "kilometer": "km",
    "kilometers": "km",
    "metre": "m",
    "metres": "m",
    "meter": "m",
    "meters": "m",
    "centimetre": "cm",
    "centimetres": "cm",
    "centimeter": "cm",
    "centimeters": "cm",
    "hour": "h",
    "hours": "h",
    "hr": "h",
    "hrs": "h",
    "second": "s",
    "seconds": "s",
    "sec": "s",
    "minute": "min",
    "minutes": "min",
    "mins": "min",
    "kmph": "km/h",
    "kph": "km/h",
    "mph": "miles/h",
    "mps": "m/s",
    "newton": "N",
    "newtons": "N",
    "kilogram": "kg",
    "kilograms": "kg",
}

@dataclass
class ParsedUnit:
    raw: str
    normalized: str

@dataclass
class ParsedStep:
    step_number: int
    raw: str
    cleaned: str
    declared_result: Optional[Union[int, float, str]] = None
    operation: Optional[str] = None
    operands: List[Union[int, float]] = field(default_factory=list)

@dataclass
class ParsedAnswer:
    raw: str
    cleaned: str
    numeric_value: Optional[float] = None
    fraction_value: Optional[Fraction] = None
    unit: Optional[ParsedUnit] = None
    steps: List[ParsedStep] = field(default_factory=list)
    has_working: bool = False
    is_blank: bool = False


class ResponseParser:
    """Deterministic parser for free-text student submissions and multi-line working."""

    @staticmethod
    def clean_text(text: Optional[str]) -> str:
        if not text:
            return ""
        # Normalize typographic math symbols
        t = str(text).strip()
        t = re.sub(r"[−–—]", "-", t)
        t = re.sub(r"[×·]", "*", t)
        t = re.sub(r"÷", "/", t)
        t = re.sub(r"\s+", " ", t)
        return t

    @classmethod
    def normalize_unit(cls, unit_str: Optional[str]) -> Optional[ParsedUnit]:
        if not unit_str:
            return None
        raw = unit_str.strip()
        cleaned = raw.lower().replace(" ", "").replace("²", "^2")
        normalized = UNIT_ALIASES.get(cleaned, cleaned)
        return ParsedUnit(raw=raw, normalized=normalized)

    @classmethod
    def extract_number_and_unit(cls, text: str) -> Tuple[Optional[float], Optional[ParsedUnit]]:
        cleaned = cls.clean_text(text)
        # Match number with optional unit, e.g. "40 km/h", "360km", "2.5 m/s", "-5"
        match = re.search(r"(-?\d+(?:\.\d+)?)\s*([a-zA-Z/°^2]+)?", cleaned)
        if match:
            num = float(match.group(1))
            unit = cls.normalize_unit(match.group(2)) if match.group(2) else None
            return num, unit
        return None, None

    @classmethod
    def extract_fraction(cls, text: str) -> Optional[Fraction]:
        cleaned = cls.clean_text(text)
        match = re.search(r"(-?\d+)\s*/\s*(\d+)", cleaned)
        if match:
            numerator = int(match.group(1))
            denominator = int(match.group(2))
            if denominator != 0:
                return Fraction(numerator, denominator)
        return None

    @classmethod
    def parse_step_line(cls, line: str, index: int = 1) -> ParsedStep:
        cleaned = cls.clean_text(line)
        # Strip leading "Step 1:", "1.", "1)", etc.
        body = re.sub(r"^(?:step\s*\d+\s*[:.-]?|\d+[\.)])\s*", "", cleaned, flags=re.IGNORECASE).strip()

        # Check for simple binary calculation: e.g. "120 * 3 = 360" or "120 / 3"
        calc_match = re.search(r"(\d+(?:\.\d+)?)\s*([\+\-\*/])\s*(\d+(?:\.\d+)?)(?:\s*=\s*(\d+(?:\.\d+)?))?", body)
        operands = []
        op = None
        declared_result = None

        if calc_match:
            operands = [float(calc_match.group(1)), float(calc_match.group(3))]
            op = calc_match.group(2)
            if calc_match.group(4):
                declared_result = float(calc_match.group(4))

        return ParsedStep(
            step_number=index,
            raw=line.strip(),
            cleaned=body,
            declared_result=declared_result,
            operation=op,
            operands=operands,
        )

    @classmethod
    def parse(cls, student_answer: Optional[str], user_work: Optional[str] = None) -> ParsedAnswer:
        ans_raw = str(student_answer or "").strip()
        work_raw = str(user_work or "").strip()

        if not ans_raw and not work_raw:
            return ParsedAnswer(raw="", cleaned="", is_blank=True)

        combined_text = f"{work_raw}\n{ans_raw}".strip() if work_raw else ans_raw
        cleaned_ans = cls.clean_text(ans_raw)

        # Parse numeric & fraction values
        num_val, unit = cls.extract_number_and_unit(cleaned_ans)
        frac_val = cls.extract_fraction(cleaned_ans)

        # Parse steps if working is provided
        steps: List[ParsedStep] = []
        lines = [line.strip() for line in (work_raw or ans_raw).splitlines() if line.strip()]
        if len(lines) > 1 or work_raw:
            for idx, line in enumerate(lines, start=1):
                steps.append(cls.parse_step_line(line, idx))

        return ParsedAnswer(
            raw=ans_raw,
            cleaned=cleaned_ans,
            numeric_value=num_val,
            fraction_value=frac_val,
            unit=unit,
            steps=steps,
            has_working=bool(steps or work_raw),
            is_blank=False,
        )
