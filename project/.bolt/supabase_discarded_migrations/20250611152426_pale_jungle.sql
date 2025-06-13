/*
  # Create initial schema for Shababna platform
  
  1. New Tables
    - `users` - User accounts with authentication information
    - `projects` - Youth projects with multilingual support
    - `analytics` - Platform usage statistics
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    
  3. Initial Data
    - Admin user
    - Sample projects
    - Sample analytics data
*/

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'moderator', 'admin')) DEFAULT 'user',
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'active', 'suspended')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    img_url TEXT,
    year VARCHAR(10),
    status VARCHAR(20) NOT NULL CHECK (status IN ('planning', 'active', 'completed')) DEFAULT 'active',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value INT DEFAULT 0,
    country VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
-- Users table policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);
    
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Projects table policies
CREATE POLICY "Anyone can view projects" ON projects
    FOR SELECT USING (true);
    
CREATE POLICY "Admins can manage projects" ON projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Analytics table policies
CREATE POLICY "Admins can view analytics" ON analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Messages table policies
CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Admins can view messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Insert initial data
-- Admin user (password: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active')
ON CONFLICT (username) DO NOTHING;

-- Sample projects
INSERT INTO projects (title, description, status, target_participants, current_participants)
VALUES 
    ('Young Leaders Project 2024', 'Leadership development program for youth', 'active', 100, 67),
    ('Community Health Initiative', 'Initiative to promote community health', 'active', 150, 89),
    ('Green Reforestation Project', 'Tree planting project', 'planning', 200, 45)
ON CONFLICT DO NOTHING;

-- Sample analytics data
DO $$
BEGIN
    INSERT INTO analytics (date, metric_type, metric_value, country)
    VALUES 
        (CURRENT_DATE, 'page_views', 1250, 'SA'),
        (CURRENT_DATE, 'unique_visitors', 890, 'SA'),
        (CURRENT_DATE, 'user_signups', 15, 'SA'),
        (CURRENT_DATE - INTERVAL '1 day', 'page_views', 1180, 'SA'),
        (CURRENT_DATE - INTERVAL '1 day', 'unique_visitors', 820, 'SA'),
        (CURRENT_DATE - INTERVAL '1 day', 'user_signups', 12, 'SA');
EXCEPTION
    WHEN OTHERS THEN
        NULL; -- Ignore errors
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();