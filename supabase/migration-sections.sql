-- Add new columns for project template sections
-- Run in Supabase SQL Editor

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS role_tools TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]';

-- sections format: [{"type":"strategy","heading":"Strategy","subtitle":"","description":"...","image":"url","tag_color":"#ff6b00"}, ...]
-- types: strategy, system, touchpoints, impact
