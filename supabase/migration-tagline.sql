-- Optional tagline for case study header (distinct from title)
-- Example: title = "Partyverse", tagline = "Designing a new way to host events for people who never thought they could."
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tagline TEXT;

-- Company logo and name for header (left column)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS company_logo_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS company_name TEXT;

-- Callout heading for header right column (~24px)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS callout_heading TEXT;

-- Gallery images (section 4a) - separate from process_gallery_urls
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}';

-- Project-specific reviews (section 5)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS reviews JSONB DEFAULT '[]';

-- Section galleries: { intro?: string[], process?: string[], system?: string[], gallery?: string[], takeaways?: string[], reviews?: string[] }
-- 1 image = full-width banner, 2-4 images = marquee. Empty = hidden.
ALTER TABLE projects ADD COLUMN IF NOT EXISTS section_galleries JSONB DEFAULT '{}';
