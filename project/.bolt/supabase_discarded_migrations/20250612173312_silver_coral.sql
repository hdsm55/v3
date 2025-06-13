/*
  # Fix RLS Policies for All Tables
  
  1. Changes
    - Drop policies that use jwt() function
    - Create new policies using profile table lookups for admin access
    - Update all tables to use consistent policy approach
  
  2. Security
    - Maintain same access patterns but with correct implementation
    - Use EXISTS subqueries instead of jwt() function
*/

BEGIN;

-- Fix profiles table policies
ALTER TABLE public.profiles
  DROP POLICY IF EXISTS "Admins have full access";

CREATE POLICY "Profiles: admin full access"
  ON public.profiles
  FOR ALL TO authenticated
  USING (
    role = 'admin' OR id = auth.uid()
  );

-- Fix messages table policies
ALTER TABLE public.messages
  DROP POLICY IF EXISTS "Admins have full access to messages";

CREATE POLICY "Admins have full access to messages"
  ON public.messages
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );

-- Fix programs table policies
ALTER TABLE public.programs
  DROP POLICY IF EXISTS "Admins have full access to programs";

CREATE POLICY "Admins have full access to programs"
  ON public.programs
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );

-- Fix events table policies
ALTER TABLE public.events
  DROP POLICY IF EXISTS "Admins have full access to events";

CREATE POLICY "Admins have full access to events"
  ON public.events
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );

-- Fix event_registrations table policies
ALTER TABLE public.event_registrations
  DROP POLICY IF EXISTS "Admins have full access to registrations";

CREATE POLICY "Admins have full access to registrations"
  ON public.event_registrations
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );

-- Fix volunteers table policies
ALTER TABLE public.volunteers
  DROP POLICY IF EXISTS "Admins have full access to volunteer applications";

CREATE POLICY "Admins have full access to volunteer applications"
  ON public.volunteers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );

COMMIT;