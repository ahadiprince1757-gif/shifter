-- ==============================================================================
-- TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-A MIGRATION
-- Migration: 20260907_decision_fingerprint_and_cutoff.sql
-- Invariants: Decision Fingerprint Deduplication & Cutoff Provenance
-- ==============================================================================

ALTER TABLE public.intelligence_decisions 
ADD COLUMN IF NOT EXISTS decision_fingerprint TEXT,
ADD COLUMN IF NOT EXISTS evidence_snapshot_hash TEXT,
ADD COLUMN IF NOT EXISTS evidence_cutoff_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS ontology_version TEXT DEFAULT '1.0.0';

CREATE INDEX IF NOT EXISTS idx_intelligence_decisions_user_fingerprint 
ON public.intelligence_decisions(user_id, decision_fingerprint);

CREATE INDEX IF NOT EXISTS idx_intelligence_decisions_evidence_cutoff 
ON public.intelligence_decisions(evidence_cutoff_at DESC);
