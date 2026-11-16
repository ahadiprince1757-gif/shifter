"""
Automated unit tests for Tixar Pedagogical Intelligence Engine.
Includes exhaustive edge-case test suite for RepairVerifier and epistemic parity checks.
"""

from ..orchestrator import TixarEngine
from ..repair.verifier import RepairVerifier


def test_speed_rate_operation_inversion():
    """Validates diagnosis of the classic 120km in 3h -> 360 operation inversion."""
    result = TixarEngine.diagnose(
        student_answer="360 km/h",
        question_text="A car travels 120 km in 3 hours. What is its average speed?",
        expected_answer="40 km/h",
        user_work="120 * 3 = 360",
        subject="mathematics",
        topic="average speed",
    )

    # Epistemic agreement contract checks
    assert result["status"] == "diagnosed"
    assert result["answer"]["correct"] is False
    assert result["error"]["detected"] is True
    assert result["error"]["code"] == "OPERATION_SELECTION_ERROR"
    assert result["cause"]["identified"] is True
    assert result["cause"]["misconceptionCode"] == "RATE_OPERATION_INVERSION"
    assert result["repair"]["identified"] is True

    # UI backward compatibility checks
    assert "Your arithmetic is correct" in result["whyThisIsWrong"][0]
    assert "Speed = Distance ÷ Time" in result["remember"]
    assert "operation is the problem" in result["naturalExplanation"]
    assert result["probe"] is not None
    assert result["probe"]["correctAnswer"] == "20 km/h"
    assert result["retest"] is not None
    assert result["retest"]["expectedAnswer"] == "60 km/h"


def test_speed_correct_answer():
    """Validates correct answer evaluation."""
    result = TixarEngine.diagnose(
        student_answer="40 km/h",
        question_text="A car travels 120 km in 3 hours. What is its average speed?",
        expected_answer="40 km/h",
        subject="mathematics",
        topic="average speed",
    )

    assert result["status"] == "correct"
    assert result["answer"]["correct"] is True
    assert result["error"]["detected"] is False
    assert result["error"]["code"] is None
    assert "Spot on" in result["naturalExplanation"]


def test_bodmas_precedence_inversion():
    """Validates diagnosis of addition before multiplication."""
    result = TixarEngine.diagnose(
        student_answer="36",
        question_text="Evaluate: 7 + 5 * 3",
        expected_answer="22",
        subject="mathematics",
        topic="bodmas",
    )

    assert result["status"] == "diagnosed"
    assert result["answer"]["correct"] is False
    assert result["error"]["detected"] is True
    assert result["error"]["code"] == "BODMAS_ADDITION_BEFORE_MULTIPLICATION"
    assert result["cause"]["identified"] is True
    assert result["repair"]["identified"] is True
    assert "Multiplication and Division always take priority" in result["remember"]


def test_blank_submission():
    """Validates graceful handling of blank input."""
    result = TixarEngine.diagnose(
        student_answer="",
        question_text="What is 5 + 5?",
        expected_answer="10",
    )

    assert result["status"] == "blank"
    assert result["answer"]["correct"] is False
    assert result["error"]["detected"] is True
    assert result["error"]["code"] == "BLANK_SUBMISSION"
    assert result["cause"]["identified"] is False


def test_verifier_edge_cases():
    """
    Exhaustive edge-case verification testing:
    "", "abc", "12", "-12", "12.5", "1/2", "  20 km/h "
    """
    # 1. Blank inputs are NEVER repaired
    assert RepairVerifier.verify("", "60 km/h", "CODE").is_repaired is False
    assert RepairVerifier.verify("", "", "CODE").is_repaired is False
    assert RepairVerifier.verify("   ", "10", "CODE").is_repaired is False

    # 2. Text comparisons
    assert RepairVerifier.verify("abc", "xyz", "CODE").is_repaired is False
    assert RepairVerifier.verify("abc", "abc", "CODE").is_repaired is True
    assert RepairVerifier.verify("ABC", "abc", "CODE").is_repaired is True

    # 3. Integers & Negative Integers
    assert RepairVerifier.verify("12", "12", "CODE").is_repaired is True
    assert RepairVerifier.verify("12", "15", "CODE").is_repaired is False
    assert RepairVerifier.verify("-12", "-12", "CODE").is_repaired is True
    assert RepairVerifier.verify("-12", "12", "CODE").is_repaired is False

    # 4. Decimals
    assert RepairVerifier.verify("12.5", "12.5", "CODE").is_repaired is True
    assert RepairVerifier.verify("12.50", "12.5", "CODE").is_repaired is True
    assert RepairVerifier.verify("12.5", "12.6", "CODE").is_repaired is False

    # 5. Fractions & Cross-Representation
    assert RepairVerifier.verify("1/2", "1/2", "CODE").is_repaired is True
    assert RepairVerifier.verify("1/2", "2/4", "CODE").is_repaired is True
    assert RepairVerifier.verify("1/2", "0.5", "CODE").is_repaired is True
    assert RepairVerifier.verify("0.5", "1/2", "CODE").is_repaired is True
    # Crucial regression: "1/2" must NEVER match "12"!
    assert RepairVerifier.verify("1/2", "12", "CODE").is_repaired is False
    assert RepairVerifier.verify("12", "1/2", "CODE").is_repaired is False

    # 6. Units and Whitespace
    assert RepairVerifier.verify("  20 km/h ", "20 km/h", "CODE").is_repaired is True
    assert RepairVerifier.verify("20", "20 km/h", "CODE").is_repaired is True
    assert RepairVerifier.verify("20 km/h", "20 mph", "CODE").is_repaired is False


if __name__ == "__main__":
    print("Running Tixar Diagnostic Engine unit tests...")
    test_speed_rate_operation_inversion()
    print("✓ Speed Rate Operation Inversion test passed.")
    test_speed_correct_answer()
    print("✓ Speed Correct Answer test passed.")
    test_bodmas_precedence_inversion()
    print("✓ BODMAS Precedence Inversion test passed.")
    test_blank_submission()
    print("✓ Blank Submission test passed.")
    test_verifier_edge_cases()
    print("✓ Exhaustive Verifier Edge Cases test passed (blank, abc, 12, -12, 12.5, 1/2, 20 km/h).")
    print("\nAll Tixar Intelligence Engine tests passed harmoniously!")
