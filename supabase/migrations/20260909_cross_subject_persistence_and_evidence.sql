-- ==============================================================================
-- TIXAR CROSS-SUBJECT PERSISTENCE & EVIDENCE LEDGER SCHEMA
-- Migration: 20260909_cross_subject_persistence_and_evidence.sql
-- Invariants:
--   1. Immutable append-only attempt and evidence ledger
--   2. Client idempotency keys prevent duplicate offline submissions
--   3. Foreign keys with CASCADE deletion prevent orphaned records
--   4. Row Level Security (RLS) ensures strict user data isolation
--   5. Full reproducibility: curriculum, question, and diagnostic engine versions recorded
--   6. learner_skill_state is a derived projection, not mutable ground truth
-- ==============================================================================

-- 1. Question Attempts (Immutable Ledger)
CREATE TABLE IF NOT EXISTS public.question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  question_id TEXT NOT NULL,
  submitted_answer TEXT NOT NULL,
  working_lines JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_correct BOOLEAN NOT NULL,
  question_version INT NOT NULL DEFAULT 1,
  curriculum_version TEXT NOT NULL DEFAULT '1.0.0',
  diagnostic_engine_version TEXT NOT NULL DEFAULT '2.1.0',
  client_timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_question_attempts_user_ts 
  ON public.question_attempts(user_id, client_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_question_attempts_question 
  ON public.question_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_idempotency 
  ON public.question_attempts(idempotency_key);

-- 2. Attempt Skill Evidence (Granular Diagnostic Findings)
CREATE TABLE IF NOT EXISTS public.attempt_skill_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.question_attempts(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('OBSERVED_ERROR', 'CORRECT_EXECUTION', 'AMBIGUOUS_EVIDENCE', 'INSUFFICIENT_DATA')),
  diagnostic_certainty TEXT NOT NULL CHECK (diagnostic_certainty IN ('OBSERVED_CALCULATION_ERROR', 'CONFIRMED_MISCONCEPTION', 'PROBABLE_EXPLANATION', 'INCONCLUSIVE')),
  diagnostic_status TEXT NOT NULL CHECK (diagnostic_status IN ('GAP_IDENTIFIED', 'DEMONSTRATED', 'INCONCLUSIVE')),
  error_spec_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attempt_skill_evidence_attempt 
  ON public.attempt_skill_evidence(attempt_id);
CREATE INDEX IF NOT EXISTS idx_attempt_skill_evidence_skill 
  ON public.attempt_skill_evidence(skill_id);

-- 3. Repair Events (Intervention & Verification Audit Trail)
CREATE TABLE IF NOT EXISTS public.repair_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  question_id TEXT NOT NULL,
  diagnosed_skill_id TEXT NOT NULL,
  delivered_resource_ids TEXT[] NOT NULL DEFAULT '{}',
  triggering_evidence_ids TEXT[] NOT NULL DEFAULT '{}',
  repair_version TEXT NOT NULL DEFAULT '1.0.0',
  retest_question_id TEXT,
  retest_submitted_answer TEXT,
  retest_outcome TEXT CHECK (retest_outcome IN ('ACQUISITION_CONFIRMED', 'ACQUISITION_FAILED', 'SKIPPED')),
  transfer_question_id TEXT,
  transfer_submitted_answer TEXT,
  transfer_outcome TEXT CHECK (transfer_outcome IN ('TRANSFER_CONFIRMED', 'TRANSFER_FAILED', 'SKIPPED')),
  completion_status TEXT NOT NULL CHECK (completion_status IN ('STARTED', 'RETEST_PASSED', 'TRANSFER_COMPLETED', 'ABANDONED')),
  time_spent_ms INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_repair_events_user_created 
  ON public.repair_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_repair_events_skill 
  ON public.repair_events(diagnosed_skill_id);
CREATE INDEX IF NOT EXISTS idx_repair_events_idempotency 
  ON public.repair_events(idempotency_key);

-- 4. Learner Skill State (Deterministic Materialized State Projection)
CREATE TABLE IF NOT EXISTS public.learner_skill_state (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  acquisition_status TEXT NOT NULL DEFAULT 'NOT_ASSESSED' CHECK (acquisition_status IN ('NOT_ASSESSED', 'GAP_DETECTED', 'DEMONSTRATED')),
  transfer_status TEXT NOT NULL DEFAULT 'NOT_ASSESSED' CHECK (transfer_status IN ('NOT_ASSESSED', 'FAILED_TRANSFER', 'DEMONSTRATED')),
  retention_status TEXT NOT NULL DEFAULT 'NOT_ASSESSED' CHECK (retention_status IN ('NOT_ASSESSED', 'ACTIVE', 'NEEDS_REFRESH')),
  last_verified_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_learner_skill_state_lookup 
  ON public.learner_skill_state(user_id, skill_id);

-- 5. Row Level Security (RLS)
ALTER TABLE public.question_attempts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_skill_evidence   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_skill_state     ENABLE ROW LEVEL SECURITY;

-- Question Attempts Policies
DROP POLICY IF EXISTS "Users isolated attempts all" ON public.question_attempts;
CREATE POLICY "Users isolated attempts all" ON public.question_attempts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Attempt Skill Evidence Policies (Isolated through parent attempt ownership)
DROP POLICY IF EXISTS "Users isolated evidence all" ON public.attempt_skill_evidence;
CREATE POLICY "Users isolated evidence all" ON public.attempt_skill_evidence
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.question_attempts 
      WHERE question_attempts.id = attempt_skill_evidence.attempt_id 
        AND question_attempts.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.question_attempts 
      WHERE question_attempts.id = attempt_skill_evidence.attempt_id 
        AND question_attempts.user_id = auth.uid()
    )
  );

-- Repair Events Policies
DROP POLICY IF EXISTS "Users isolated repairs all" ON public.repair_events;
CREATE POLICY "Users isolated repairs all" ON public.repair_events
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learner Skill State Policies
DROP POLICY IF EXISTS "Users isolated skill state all" ON public.learner_skill_state;
CREATE POLICY "Users isolated skill state all" ON public.learner_skill_state
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
