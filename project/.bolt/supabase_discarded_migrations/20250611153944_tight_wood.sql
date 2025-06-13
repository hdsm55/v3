/*
  # Create members table and security policies

  1. New Tables
    - `members` - Stores member information with fields for name, email, phone, motivation, and status
  
  2. Security
    - Enable RLS on members table
    - Add policy for anonymous users to insert new members
    - Add policy for admins to view and manage members
    - Add unique constraint on email
*/

-- Create members table
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anon insert members" ON public.members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage members" ON public.members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Add email uniqueness constraint
ALTER TABLE public.members 
  ADD CONSTRAINT members_email_unique UNIQUE (email);