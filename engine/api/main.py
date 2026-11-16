"""
FastAPI application for Tixar Diagnostic & Intelligence Engine.
"""

from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from ..orchestrator import TixarEngine
from ..repair.verifier import RepairVerifier

app = FastAPI(
    title="Tixar Pedagogical Intelligence Engine",
    description="Deterministic pedagogical diagnostic, cognitive repair, and natural response API.",
    version="1.0.0",
)

# CORS configuration for local development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DiagnoseRequest(BaseModel):
    studentAnswer: str = Field(..., description="Student's final submitted answer")
    questionText: str = Field(..., description="Text of the question being answered")
    expectedAnswer: str = Field(..., description="Canonical expected answer")
    userWork: Optional[str] = Field(None, description="Optional step-by-step working provided by student")
    subject: Optional[str] = Field(None, description="Subject domain, e.g. mathematics, physics, biology")
    topic: Optional[str] = Field(None, description="Topic or subtopic key")


class VerifyRetestRequest(BaseModel):
    retestAnswer: str = Field(..., description="Student's answer to the verification retest question")
    expectedAnswer: str = Field(..., description="Expected answer for the retest question")
    misconceptionCode: str = Field(..., description="Code of the diagnosed misconception being tested")


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Tixar Intelligence Engine",
        "version": "1.0.0",
    }


@app.post("/api/v1/diagnose")
def diagnose_submission(payload: DiagnoseRequest):
    try:
        result = TixarEngine.diagnose(
            student_answer=payload.studentAnswer,
            question_text=payload.questionText,
            expected_answer=payload.expectedAnswer,
            user_work=payload.userWork,
            subject=payload.subject,
            topic=payload.topic,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/v1/verify-retest")
def verify_retest(payload: VerifyRetestRequest):
    try:
        evaluation = RepairVerifier.verify(
            retest_answer=payload.retestAnswer,
            expected_answer=payload.expectedAnswer,
            original_misconception_code=payload.misconceptionCode,
        )
        return {
            "isRepaired": evaluation.is_repaired,
            "persistingMisconception": evaluation.persisting_misconception,
            "confidence": evaluation.confidence,
            "feedback": evaluation.feedback,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
