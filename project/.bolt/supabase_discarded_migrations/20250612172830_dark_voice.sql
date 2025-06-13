/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `category` (text, optional)
      - `status` (text, optional, default 'active')
      - `img_url` (text, optional)
      - `year` (text, optional)
      - `created_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())

  2. Security
    - Enable RLS on `projects` table
    - Add policy for anyone to view projects
    - Add policy for admins to manage projects
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

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO public
  USING ((jwt() ->> 'role'::text) = 'admin'::text);