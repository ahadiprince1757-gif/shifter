-- ═══════════════════════════════════════════════════════════════════════
-- TIXAR ANALYTICS SAFE BACKUP, AUDIT & CLEANUP SCRIPT
-- Copy and execute in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

-- 1. SAFE BACKUP: Create backup of current learning_events table
CREATE TABLE IF NOT EXISTS public.learning_events_backup AS
SELECT * FROM public.learning_events;

-- 2. CORRUPTION AUDIT: Check for missing user_id, null event_types, or test data
SELECT 
    COUNT(*) AS total_events,
    COUNT(*) FILTER (WHERE user_id IS NULL) AS null_user_events,
    COUNT(*) FILTER (WHERE event_type IS NULL OR event_type = '') AS missing_type_events,
    COUNT(DISTINCT user_id) AS unique_users
FROM public.learning_events;

-- 3. AUDIT DUPLICATE EVENTS (Inserted within 1 second interval)
SELECT user_id, event_type, created_at, COUNT(*)
FROM public.learning_events
GROUP BY user_id, event_type, created_at
HAVING COUNT(*) > 1
ORDER BY created_at DESC;

-- 4. CLEANUP OPTION A: Delete unauthenticated/test/null events only
DELETE FROM public.learning_events
WHERE user_id IS NULL 
   OR event_type IS NULL 
   OR event_type = '';

-- 5. CLEANUP OPTION B (CONTROLLED RESET): Truncate events for clean controlled testing
-- Uncomment line below if full reset is desired after verifying backup above:
-- TRUNCATE TABLE public.learning_events RESTART IDENTITY;

-- 6. VERIFY CLEANED DATA
SELECT COUNT(*) AS remaining_valid_events FROM public.learning_events;
