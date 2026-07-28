-- ═══════════════════════════════════════════════════════════════════════
-- SEED: Learning Features + Enrollments
-- Shifter App — Run AFTER schema.sql and migration_learning_features.pgsql
--
-- NOTE: Helper functions are created outside DO blocks (required in PG),
--       then dropped at the end.
-- ═══════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
-- SECTION 1: ENROLLMENTS
-- Enroll every existing profile in ALL subjects so students
-- immediately see all subjects in their account.
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  r_profile  RECORD;
  r_subject  RECORD;
BEGIN
  FOR r_profile IN SELECT id FROM public.profiles LOOP
    FOR r_subject IN SELECT id FROM public.subjects LOOP
      INSERT INTO public.enrollments (user_id, subject_id)
      VALUES (r_profile.id, r_subject.id)
      ON CONFLICT (user_id, subject_id) DO NOTHING;
    END LOOP;
  END LOOP;
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- HELPER: topic_id lookup function (created outside DO block)
-- PostgreSQL does NOT allow CREATE FUNCTION inside DO blocks.
-- We create it here and drop it at the end of the script.
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION _seed_topic_id(
  p_subject TEXT,
  p_chapter TEXT,
  p_title   TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql AS $$
DECLARE
  v_id BIGINT;
BEGIN
  SELECT t.id INTO v_id
  FROM public.topics t
  JOIN public.chapters c ON c.id = t.chapter_id
  JOIN public.subjects s ON s.id = c.subject_id
  WHERE s.id = p_subject
    AND c.chapter_key = p_chapter
    AND lower(t.title) = lower(p_title)
  LIMIT 1;
  RETURN v_id;
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- HELPER: insert_events procedure (created outside DO block)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE PROCEDURE _seed_insert_events(
  p_topic_id BIGINT,
  p_visits   INT,
  p_passes   INT,
  p_fails    INT
)
LANGUAGE plpgsql AS $$
DECLARE
  i INT;
BEGIN
  FOR i IN 1..p_visits LOOP
    INSERT INTO public.learning_events (topic_id, event_type)
    VALUES (p_topic_id, 'visit');
  END LOOP;
  FOR i IN 1..p_passes LOOP
    INSERT INTO public.learning_events (topic_id, event_type)
    VALUES (p_topic_id, 'pass');
  END LOOP;
  FOR i IN 1..p_fails LOOP
    INSERT INTO public.learning_events (topic_id, event_type)
    VALUES (p_topic_id, 'fail');
  END LOOP;
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 2: DEMO PROGRESS
-- Mark several topics as completed across subjects so the
-- Analytics Dashboard has real data to show.
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_user     UUID;
  v_topic_id BIGINT;
BEGIN
  -- Get first user (safe for demo seeding)
  SELECT id INTO v_user FROM public.profiles LIMIT 1;
  IF v_user IS NULL THEN RETURN; END IF;

  -- Math: Numbers chapter
  v_topic_id := _seed_topic_id('math', 'numbers', 'Number Systems & Basic Operations');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.progress (user_id, topic_id, completed, score, mastered, confidence_level)
    VALUES (v_user, v_topic_id, TRUE, 90, TRUE, 'high')
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET completed = TRUE, score = 90, mastered = TRUE, confidence_level = 'high';
  END IF;

  -- Math: Algebra chapter
  v_topic_id := _seed_topic_id('math', 'algebra', 'Linear equations');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.progress (user_id, topic_id, completed, score, mastered, confidence_level)
    VALUES (v_user, v_topic_id, TRUE, 75, TRUE, 'medium')
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET completed = TRUE, score = 75, mastered = TRUE, confidence_level = 'medium';
  END IF;

  v_topic_id := _seed_topic_id('math', 'algebra', 'Algebraic expressions');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.progress (user_id, topic_id, completed, score, mastered, confidence_level)
    VALUES (v_user, v_topic_id, TRUE, 60, FALSE, 'low')
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET completed = TRUE, score = 60, mastered = FALSE, confidence_level = 'low';
  END IF;

  -- Math: Geometry
  v_topic_id := _seed_topic_id('math', 'geometry', 'Types of angles');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.progress (user_id, topic_id, completed, score, mastered, confidence_level)
    VALUES (v_user, v_topic_id, TRUE, 85, TRUE, 'high')
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET completed = TRUE, score = 85, mastered = TRUE, confidence_level = 'high';
  END IF;

  -- Math: Fractions
  v_topic_id := _seed_topic_id('math', 'fractions', 'Fraction basics');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.progress (user_id, topic_id, completed, score, mastered, confidence_level)
    VALUES (v_user, v_topic_id, TRUE, 95, TRUE, 'high')
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET completed = TRUE, score = 95, mastered = TRUE, confidence_level = 'high';
  END IF;

END;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 3: DEMO LEARNING EVENTS (Analytics)
-- Insert sample visit/pass/fail events so the Analytics
-- dashboard shows meaningful charts out of the box.
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_topic_id BIGINT;
BEGIN
  v_topic_id := _seed_topic_id('math', 'algebra', 'Linear equations');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 8, 5, 3); END IF;

  v_topic_id := _seed_topic_id('math', 'algebra', 'Algebraic expressions');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 6, 2, 4); END IF;

  v_topic_id := _seed_topic_id('math', 'geometry', 'Types of angles');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 5, 4, 1); END IF;

  v_topic_id := _seed_topic_id('math', 'fractions', 'Fraction basics');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 10, 9, 1); END IF;

  v_topic_id := _seed_topic_id('math', 'numbers', 'Number Systems & Basic Operations');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 7, 6, 1); END IF;

  v_topic_id := _seed_topic_id('math', 'probability', 'Basic probability');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 4, 1, 3); END IF;

  v_topic_id := _seed_topic_id('math', 'statistics', 'Mean');
  IF v_topic_id IS NOT NULL THEN CALL _seed_insert_events(v_topic_id, 3, 2, 1); END IF;
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 4: DEMO USER MISTAKES
-- Pre-seed realistic missed-question records for the first user
-- so the Mistake Journal has demo content.
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_user     UUID;
  v_topic_id BIGINT;
  v_subject  TEXT := 'math';
BEGIN
  SELECT id INTO v_user FROM public.profiles LIMIT 1;
  IF v_user IS NULL THEN RETURN; END IF;

  -- Mistake 1: Linear equations Q0
  v_topic_id := _seed_topic_id(v_subject, 'algebra', 'Linear equations');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.user_mistakes
      (user_id, topic_id, subject_id, chapter_key, question_index,
       question_text, correct_answer, solution, resolved, attempt_count)
    VALUES
      (v_user, v_topic_id, v_subject, 'algebra', 0,
       'Solve for x: 2x + 3 = 11',
       'x = 4',
       'Subtract 3 from both sides: 2x = 8. Then divide by 2: x = 4.',
       FALSE, 2)
    ON CONFLICT (user_id, topic_id, question_index) DO NOTHING;
  END IF;

  -- Mistake 2: Probability Q0
  v_topic_id := _seed_topic_id(v_subject, 'probability', 'Basic probability');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.user_mistakes
      (user_id, topic_id, subject_id, chapter_key, question_index,
       question_text, correct_answer, solution, resolved, attempt_count)
    VALUES
      (v_user, v_topic_id, v_subject, 'probability', 0,
       'A bag has 3 red and 5 blue marbles. What is the probability of picking red?',
       '3/8',
       'P(red) = favourable outcomes / total outcomes = 3 / (3+5) = 3/8.',
       FALSE, 1)
    ON CONFLICT (user_id, topic_id, question_index) DO NOTHING;
  END IF;

  -- Mistake 3: Algebraic expressions Q1 (resolved)
  v_topic_id := _seed_topic_id(v_subject, 'algebra', 'Algebraic expressions');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.user_mistakes
      (user_id, topic_id, subject_id, chapter_key, question_index,
       question_text, correct_answer, solution, resolved, attempt_count, resolved_at)
    VALUES
      (v_user, v_topic_id, v_subject, 'algebra', 1,
       'Simplify: 3a + 2b - a + 4b',
       '2a + 6b',
       'Collect like terms: (3a - a) + (2b + 4b) = 2a + 6b.',
       TRUE, 3, now())
    ON CONFLICT (user_id, topic_id, question_index) DO NOTHING;
  END IF;

END;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 5: DEMO SPACED REVIEWS
-- Pre-seed SM-2 review schedules: some due today, some future.
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_user     UUID;
  v_topic_id BIGINT;
BEGIN
  SELECT id INTO v_user FROM public.profiles LIMIT 1;
  IF v_user IS NULL THEN RETURN; END IF;

  -- Due TODAY (overdue) — should appear in review queue
  v_topic_id := _seed_topic_id('math', 'algebra', 'Linear equations');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.spaced_reviews
      (user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions)
    VALUES
      (v_user, v_topic_id, now() - INTERVAL '2 days', 1, 2.50, 1)
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

  -- Due TODAY (exactly now)
  v_topic_id := _seed_topic_id('math', 'probability', 'Basic probability');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.spaced_reviews
      (user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions)
    VALUES
      (v_user, v_topic_id, now() - INTERVAL '1 hour', 1, 2.50, 1)
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

  -- Due in 4 days (not yet due)
  v_topic_id := _seed_topic_id('math', 'fractions', 'Fraction basics');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.spaced_reviews
      (user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions)
    VALUES
      (v_user, v_topic_id, now() + INTERVAL '4 days', 6, 2.60, 2)
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

  -- Well-mastered — due in 14 days
  v_topic_id := _seed_topic_id('math', 'geometry', 'Types of angles');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.spaced_reviews
      (user_id, topic_id, next_review_at, interval_days, ease_factor, repetitions)
    VALUES
      (v_user, v_topic_id, now() + INTERVAL '14 days', 14, 2.80, 3)
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

END;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 6: DEMO USER NOTES (Personal Synthesis Scratchpad)
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_user     UUID;
  v_topic_id BIGINT;
BEGIN
  SELECT id INTO v_user FROM public.profiles LIMIT 1;
  IF v_user IS NULL THEN RETURN; END IF;

  v_topic_id := _seed_topic_id('math', 'algebra', 'Linear equations');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.user_notes (user_id, topic_id, note_text)
    VALUES (
      v_user, v_topic_id,
      'A linear equation has the form ax + b = c. Key idea: whatever you do to one side, do to the other. Inverse operations undo each other — add/subtract, multiply/divide.'
    )
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

  v_topic_id := _seed_topic_id('math', 'fractions', 'Fraction basics');
  IF v_topic_id IS NOT NULL THEN
    INSERT INTO public.user_notes (user_id, topic_id, note_text)
    VALUES (
      v_user, v_topic_id,
      'Numerator = top, denominator = bottom. Equivalent fractions: multiply or divide both parts by the same number. Simplify always by finding the GCD.'
    )
    ON CONFLICT (user_id, topic_id) DO NOTHING;
  END IF;

END;
$$;

-- ─────────────────────────────────────────────────────────────
-- CLEANUP: Drop temporary seed helper functions
-- ─────────────────────────────────────────────────────────────
DROP FUNCTION IF EXISTS _seed_topic_id(TEXT, TEXT, TEXT);
DROP PROCEDURE IF EXISTS _seed_insert_events(BIGINT, INT, INT, INT);

-- ─────────────────────────────────────────────────────────────
-- VERIFY: Quick row-count check
-- ─────────────────────────────────────────────────────────────
SELECT 'enrollments'    AS tbl, COUNT(*) FROM public.enrollments
UNION ALL
SELECT 'progress'       AS tbl, COUNT(*) FROM public.progress
UNION ALL
SELECT 'user_mistakes'  AS tbl, COUNT(*) FROM public.user_mistakes
UNION ALL
SELECT 'spaced_reviews' AS tbl, COUNT(*) FROM public.spaced_reviews
UNION ALL
SELECT 'user_notes'     AS tbl, COUNT(*) FROM public.user_notes
UNION ALL
SELECT 'learning_events'AS tbl, COUNT(*) FROM public.learning_events;
