/*
  # Fix Projects Table and RLS Policies
  
  1. Changes
    - Create projects table if it doesn't exist
    - Enable Row Level Security
    - Replace JWT function with profile lookup for admin access
    - Set appropriate policies for public viewing and admin management
  
  2. Security
    - Public can view all projects
    - Only admins (based on profiles table) can manage projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  status text DEFAULT 'active',
  img_url text,
  year text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON projects;

-- Public can view all projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated admins can manage projects
CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
  );