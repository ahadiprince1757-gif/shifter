-- ─────────────────────────────────────────────────────────────
-- reset_user_data.sql
--
-- Run this ONCE in the Supabase SQL Editor to wipe ALL existing
-- progress/learning/analytics data across all tables.
-- After this, every user starts completely from scratch.
--
-- Tables cleared:
--   1. learning_events (telemetry visits, passes, fails - PRIMARY for /api/analytics)
--   2. progress        (backend-written quiz/lesson progress rows)
--   3. user_mistakes   (mistake journal entries)
--   4. spaced_reviews  (spaced repetition schedule)
--   5. user_notes      (lesson notes)
--   6. achievements    (earned user badges & achievements)
--   7. enrollments     (user subject enrollments)
-- ─────────────────────────────────────────────────────────────

-- Disable RLS temporarily so we can delete across all users
SET LOCAL row_security = off;

TRUNCATE TABLE public.learning_events RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.progress        RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.user_mistakes   RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.spaced_reviews  RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.user_notes      RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.achievements    RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.enrollments     RESTART IDENTITY CASCADE;

-- Re-enable RLS
SET LOCAL row_security = on;

-- Verification query: confirm all tables are at 0 rows
SELECT 'learning_events' AS tbl, COUNT(*) AS remaining FROM public.learning_events
UNION ALL
SELECT 'progress',        COUNT(*) FROM public.progress
UNION ALL
SELECT 'user_mistakes',   COUNT(*) FROM public.user_mistakes
UNION ALL
SELECT 'spaced_reviews',  COUNT(*) FROM public.spaced_reviews
UNION ALL
SELECT 'user_notes',      COUNT(*) FROM public.user_notes
UNION ALL
SELECT 'achievements',    COUNT(*) FROM public.achievements
UNION ALL
SELECT 'enrollments',     COUNT(*) FROM public.enrollments;
