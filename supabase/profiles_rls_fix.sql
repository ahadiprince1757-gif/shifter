-- ═══════════════════════════════════════════════════════════════════════
-- profiles_rls_fix.sql
--
-- PROBLEM: The existing "Allow public read" policy on public.profiles
-- exposes ALL fields (email, full_name, avatar_url, role_name) to
-- unauthenticated/anonymous requests.
--
-- FIX: Drop the open policy. Replace with:
--   1. Authenticated users can read their OWN full profile.
--   2. Public (anonymous) can only read non-sensitive fields via a VIEW.
-- ═══════════════════════════════════════════════════════════════════════

-- Step 1: Drop the existing open "public read" policy on profiles
DROP POLICY IF EXISTS "Allow public read" ON public.profiles;

-- Step 2: Authenticated users can read ONLY their own profile
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Step 3: Authenticated users can update ONLY their own profile
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Step 4: On sign-up, allow insert of own profile row
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Step 5: Create a safe public view exposing ONLY non-sensitive fields
-- (username + id only, no email, full_name, avatar_url)
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles AS
  SELECT id, username
  FROM public.profiles;

-- Verify
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'profiles';
