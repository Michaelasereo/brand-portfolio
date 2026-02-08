-- Brand Designer Portfolio - Supabase Schema
-- Run this in your Supabase project's SQL Editor

-- Site-wide styling (single row)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT NOT NULL DEFAULT '#000000',
  secondary_color TEXT NOT NULL DEFAULT '#ffffff',
  border_radius TEXT NOT NULL DEFAULT '0.5rem',
  font_family TEXT NOT NULL DEFAULT '"Helvetica Neue", Helvetica, Arial, sans-serif',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default row
INSERT INTO site_settings (primary_color, secondary_color, border_radius, font_family)
VALUES ('#000000', '#ffffff', '0.5rem', '"Helvetica Neue", Helvetica, Arial, sans-serif');

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('brand_identity', 'illustrations', 'motion', 'marketing_assets')),
  thumbnail_url TEXT NOT NULL,
  hero_image_url TEXT,
  brief TEXT,
  industry TEXT,
  role_tools TEXT,
  tags TEXT[] DEFAULT '{}',
  sections JSONB DEFAULT '[]',
  process_gallery_urls TEXT[] DEFAULT '{}',
  results TEXT,
  markdown_content TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- site_settings: public read, service role can update
CREATE POLICY "Anyone can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Service role can update site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service role can insert site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- projects: public read
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
-- Allow insert/update/delete for authenticated users (update YOUR_ADMIN_EMAIL or use service_role)
CREATE POLICY "Authenticated users can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for project assets (run in Supabase Dashboard > Storage > New bucket)
-- Bucket name: project-assets
-- Public: Yes (so images are publicly readable)
