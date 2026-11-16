"""
Automated unit tests for Tixar Pedagogical Intelligence Engine.
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

    assert result["status"] == "diagnosed"
    assert result["errorType"] == "OPERATION_SELECTION_ERROR"
    assert "Your arithmetic is correct" in result["whyThisIsWrong"][0]
    assert "Speed = Distance ÷ Time" in result["remember"]
    assert "operation is the problem" in result["conversational_feedback"]
    assert result["probe"] is not None
    assert result["probe"]["correctAnswer"] == "20 km/h"
    assert result["repair"] is not None
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
    assert result["errorType"] is None
    assert "Spot on" in result["conversational_feedback"]


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
    assert result["errorType"] == "BODMAS_ADDITION_BEFORE_MULTIPLICATION"
    assert "Multiplication and Division always take priority" in result["remember"]


def test_blank_submission():
    """Validates graceful handling of blank input."""
    result = TixarEngine.diagnose(
        student_answer="",
        question_text="What is 5 + 5?",
        expected_answer="10",
    )

    assert result["status"] == "blank"
    assert result["errorType"] == "BLANK_SUBMISSION"


def test_retest_verifier_confirmed():
    """Validates confirmation of cognitive repair on retest."""
    eval_result = RepairVerifier.verify(
        retest_answer="60 km/h",
        expected_answer="60 km/h",
        original_misconception_code="RATE_OPERATION_INVERSION",
    )

    assert eval_result.is_repaired is True
    assert eval_result.persisting_misconception is None


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
    test_retest_verifier_confirmed()
    print("✓ Retest Verifier Confirmation test passed.")
    print("\nAll 5 Tixar Intelligence Engine tests passed harmoniously!")
