/*
  # Add messages table for contact form

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `content` (text, not null)
      - `created_at` (timestamptz)
      - `read` (boolean)
  2. Security
    - Enable RLS on `messages` table
    - Add policy for anonymous users to insert messages
    - Add policy for authenticated users to read and update messages
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert messages (for contact form)
CREATE POLICY "Allow anonymous message submission" 
ON messages
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to read messages
CREATE POLICY "Allow authenticated users to read messages" 
ON messages
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to update messages (mark as read)
CREATE POLICY "Allow authenticated users to update messages" 
ON messages
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS messages_read_idx ON messages (read);