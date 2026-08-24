-- ═══════════════════════════════════════════════════════════════════════
-- SHIFTER SUPABASE SQL SCRIPT: COLUMN EXTENSIONS & RLS POLICIES
-- Copy and paste this script directly into Supabase Dashboard -> SQL Editor
-- This script is 100% idempotent (safe to run multiple times)
-- ═══════════════════════════════════════════════════════════════════════

-- 1. Extend Tables with Missing Columns
ALTER TABLE public.progress
  ADD COLUMN IF NOT EXISTS topic_title TEXT,
  ADD COLUMN IF NOT EXISTS subject_id TEXT,
  ADD COLUMN IF NOT EXISTS chapter_id TEXT,
  ADD COLUMN IF NOT EXISTS confidence_level TEXT CHECK (confidence_level IN ('low','medium','high')),
  ADD COLUMN IF NOT EXISTS mastered BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS mastered_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.user_mistakes
  ADD COLUMN IF NOT EXISTS topic_title TEXT,
  ADD COLUMN IF NOT EXISTS chapter_id TEXT,
  ADD COLUMN IF NOT EXISTS chapter_key TEXT;

ALTER TABLE public.spaced_reviews
  ADD COLUMN IF NOT EXISTS topic_title TEXT,
  ADD COLUMN IF NOT EXISTS subject_id TEXT,
  ADD COLUMN IF NOT EXISTS chapter_id TEXT;

ALTER TABLE public.user_notes
  ADD COLUMN IF NOT EXISTS topic_title TEXT,
  ADD COLUMN IF NOT EXISTS subject_id TEXT,
  ADD COLUMN IF NOT EXISTS chapter_id TEXT;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.progress         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mistakes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaced_reviews   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_events  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments      ENABLE ROW LEVEL SECURITY;

-- 3. Apply Clean RLS Policies for Authenticated Users

-- Progress Policies
DROP POLICY IF EXISTS "Users isolated progress all" ON public.progress;
CREATE POLICY "Users isolated progress all" ON public.progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Mistakes Policies
DROP POLICY IF EXISTS "Users isolated mistakes all" ON public.user_mistakes;
CREATE POLICY "Users isolated mistakes all" ON public.user_mistakes
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Spaced Reviews Policies
DROP POLICY IF EXISTS "Users isolated spaced_reviews all" ON public.spaced_reviews;
CREATE POLICY "Users isolated spaced_reviews all" ON public.spaced_reviews
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Notes Policies
DROP POLICY IF EXISTS "Users isolated user_notes all" ON public.user_notes;
CREATE POLICY "Users isolated user_notes all" ON public.user_notes
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learning Events Policies
DROP POLICY IF EXISTS "Users isolated learning_events all" ON public.learning_events;
CREATE POLICY "Users isolated learning_events all" ON public.learning_events
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Achievements Policies
DROP POLICY IF EXISTS "Users isolated achievements all" ON public.achievements;
CREATE POLICY "Users isolated achievements all" ON public.achievements
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Enrollments Policies
DROP POLICY IF EXISTS "Users isolated enrollments all" ON public.enrollments;
CREATE POLICY "Users isolated enrollments all" ON public.enrollments
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verify policies generated
SELECT table_name, policyname, roles, cmd 
FROM information_schema.policies 
WHERE table_schema = 'public';
