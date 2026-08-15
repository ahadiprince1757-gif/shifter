-- SQL script to purge unauthenticated/orphaned user telemetry data
-- Run this in Supabase SQL Editor to clean legacy data with NULL user_id

-- 1. Delete orphaned learning events
DELETE FROM public.learning_events
WHERE user_id IS NULL;

-- 2. Delete orphaned user mistakes
DELETE FROM public.user_mistakes
WHERE user_id IS NULL;

-- 3. Delete orphaned spaced reviews
DELETE FROM public.spaced_reviews
WHERE user_id IS NULL;
