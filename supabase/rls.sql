-- ─────────────────────────────────────────────────────────────
-- rls.sql — Supplemental RLS policies for learning feature tables
--
-- NOTE: Core table RLS (subjects, chapters, topics, lessons, progress,
--       enrollments, achievements, audit_logs) is already defined in
--       schema.sql. This file ONLY covers the learning feature tables
--       added via migration_learning_features.pgsql:
--         - user_mistakes
--         - spaced_reviews
--         - user_notes
-- ─────────────────────────────────────────────────────────────

-- 1. Enable RLS
ALTER TABLE public.user_mistakes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_reviews  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes      ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────
-- 2. user_mistakes
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can manage own mistakes" ON public.user_mistakes;
CREATE POLICY "Users can manage own mistakes"
  ON public.user_mistakes
  FOR ALL
  TO authenticated
  USING      (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 3. spaced_reviews
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can manage own spaced reviews" ON public.spaced_reviews;
CREATE POLICY "Users can manage own spaced reviews"
  ON public.spaced_reviews
  FOR ALL
  TO authenticated
  USING      (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- 4. user_notes
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can manage own notes" ON public.user_notes;
CREATE POLICY "Users can manage own notes"
  ON public.user_notes
  FOR ALL
  TO authenticated
  USING      (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
