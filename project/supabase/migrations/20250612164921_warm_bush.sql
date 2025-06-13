/*
  # Initial Schema Setup

  1. New Tables
    - `profiles` - User profiles linked to auth.users
    - `messages` - Contact, donation, and volunteer messages
    - `programs` - Organization programs/initiatives
    - `events` - Upcoming events
    - `event_registrations` - User registrations for events
    - `volunteers` - Volunteer applications
  
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

-- RLS Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update own profile" ON profiles
    FOR ALL USING (auth.uid() = id);
    
CREATE POLICY "Admins have full access" ON profiles
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Messages policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to messages" ON messages
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Programs policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs" ON programs
    FOR SELECT USING (true);
    
CREATE POLICY "Admins have full access to programs" ON programs
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Events policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events" ON events
    FOR SELECT USING (true);
    
CREATE POLICY "Admins have full access to events" ON events
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Event registrations policies
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (auth.uid() = profile_id);
    
CREATE POLICY "Users can view own registrations" ON event_registrations
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to registrations" ON event_registrations
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Volunteers policies
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit volunteer applications" ON volunteers
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Users can view own volunteer applications" ON volunteers
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Admins have full access to volunteer applications" ON volunteers
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');