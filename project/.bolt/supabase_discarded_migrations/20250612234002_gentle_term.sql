/*
  # Initial Schema Setup

  1. New Tables
    - `profiles` - User profiles linked to auth.users
    - `messages` - Contact, donation, and volunteer messages
    - `programs` - Organization programs/initiatives
    - `projects` - Organization projects
    - `events` - Upcoming events
    - `event_registrations` - User registrations for events
    - `volunteers` - Volunteer applications
    - `analytics` - Site analytics data
  
  2. Security
    - Enable RLS on all tables
    - Create appropriate policies for each table
    - Set up admin access across all tables
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id),
    type TEXT NOT NULL CHECK (type IN ('contact', 'donation', 'volunteer')),
    subject TEXT,
    content TEXT NOT NULL,
    amount NUMERIC DEFAULT 0,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    goal_amount NUMERIC DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    status TEXT DEFAULT 'active',
    img_url TEXT,
    year TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    location TEXT,
    capacity INT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id),
    profile_id UUID REFERENCES profiles(id),
    registered_at TIMESTAMPTZ DEFAULT now()
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resume_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    applied_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    metric_type TEXT NOT NULL,
    metric_value INT NOT NULL DEFAULT 0,
    additional_data JSONB,
    source TEXT,
    country TEXT,
    device_type TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update own profile" ON profiles
    FOR ALL USING (auth.uid() = id);
    
CREATE POLICY "Admins have full access" ON profiles
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Messages policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to messages" ON messages
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Programs policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs" ON programs
    FOR SELECT USING (true);
    
CREATE POLICY "Admins have full access to programs" ON programs
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Projects policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view projects" ON projects
    FOR SELECT USING (true);
    
CREATE POLICY "Admins full access to projects" ON projects
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Events policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events" ON events
    FOR SELECT USING (true);
    
CREATE POLICY "Admins have full access to events" ON events
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Event registrations policies
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (auth.uid() = profile_id);
    
CREATE POLICY "Users can view own registrations" ON event_registrations
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to registrations" ON event_registrations
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Volunteers policies
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit volunteer applications" ON volunteers
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Users can view own volunteer applications" ON volunteers
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to volunteer applications" ON volunteers
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Analytics policies
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to analytics" ON analytics
    FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Insert sample data for testing

-- Insert admin user
INSERT INTO profiles (id, full_name, avatar_url, role, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Admin User', null, 'admin', now(), now());

-- Insert sample projects
INSERT INTO projects (title, description, category, status, img_url, year, created_at, updated_at)
VALUES 
  ('Youth Leadership Academy', 'A comprehensive program developing leadership skills in young people through workshops and mentorship.', 'education', 'active', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', '2023', now(), now()),
  ('Community Health Initiative', 'Empowering youth to lead health education and awareness campaigns in their communities.', 'health', 'active', 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg', '2023', now(), now()),
  ('Green Schools Project', 'Student-led environmental sustainability projects in schools across the region.', 'environment', 'completed', 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg', '2022', now(), now());

-- Insert sample programs
INSERT INTO programs (title, description, goal_amount, image_url, created_at, updated_at)
VALUES 
  ('Youth Leadership Academy', 'A comprehensive program developing leadership skills in young people through workshops and mentorship.', 50000, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', now(), now()),
  ('Community Health Initiative', 'Empowering youth to lead health education and awareness campaigns in their communities.', 75000, 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg', now(), now()),
  ('Green Schools Project', 'Student-led environmental sustainability projects in schools across the region.', 30000, 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg', now(), now());

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, location, capacity, created_at, updated_at)
VALUES 
  ('Youth Leadership Summit', 'Annual gathering of youth leaders from across the globe to share experiences and build networks.', '2024-06-15 09:00:00', '2024-06-17 17:00:00', 'Dubai, UAE', 500, now(), now()),
  ('Digital Skills Workshop', 'Hands-on workshop focusing on essential digital skills for the modern workplace.', '2024-07-10 14:00:00', '2024-07-10 18:00:00', 'Online', 100, now(), now()),
  ('Environmental Volunteer Day', 'Join us for a day of environmental conservation activities in your local community.', '2024-08-05 09:00:00', '2024-08-05 16:00:00', 'Multiple Locations', 200, now(), now());