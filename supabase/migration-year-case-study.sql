-- Add year and case_study_locked for project cards
-- Run in Supabase SQL Editor

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS case_study_locked BOOLEAN DEFAULT false;
