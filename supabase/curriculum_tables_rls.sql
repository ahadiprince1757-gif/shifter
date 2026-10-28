-- ═══════════════════════════════════════════════════════════════════════
-- CURRICULUM REFERENCE TABLES ROW LEVEL SECURITY (RLS)
-- Enables universal read access for students (anon & authenticated)
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE public.curriculum_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_topics   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read curriculum_subjects" ON public.curriculum_subjects;
CREATE POLICY "Public read curriculum_subjects" ON public.curriculum_subjects
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "Public read curriculum_chapters" ON public.curriculum_chapters;
CREATE POLICY "Public read curriculum_chapters" ON public.curriculum_chapters
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "Public read curriculum_topics" ON public.curriculum_topics;
CREATE POLICY "Public read curriculum_topics" ON public.curriculum_topics
    FOR SELECT TO public
    USING (true);
