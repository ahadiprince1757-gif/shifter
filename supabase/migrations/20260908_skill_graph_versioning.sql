-- ==============================================================================
-- TIXAR LEARNING INTELLIGENCE SYSTEM — PHASE P1-B MIGRATION
-- Migration: 20260908_skill_graph_versioning.sql
-- Invariants: Graph Version & Snapshot Hash Ledger Reproducibility
-- ==============================================================================

ALTER TABLE public.intelligence_decisions 
ADD COLUMN IF NOT EXISTS graph_version TEXT DEFAULT '1.0.0',
ADD COLUMN IF NOT EXISTS graph_snapshot_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_intelligence_decisions_graph_snapshot 
ON public.intelligence_decisions(graph_version, graph_snapshot_hash);
