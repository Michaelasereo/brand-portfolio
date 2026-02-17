-- Intro copy (separate from header) and optional captions after section images
ALTER TABLE projects ADD COLUMN IF NOT EXISTS intro_heading TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS intro_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS section_subheading_after JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS section_subtitle_after JSONB DEFAULT '{}';
