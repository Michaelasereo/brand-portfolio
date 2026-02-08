-- Profile (single row), Reviews (homepage), Substack Articles
-- Run after schema.sql and migration-tagline.sql

-- Profile (single row)
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  about TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  socials JSONB DEFAULT '[]',
  ctas JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Service role can manage profile" ON profile FOR ALL USING (auth.role() = 'service_role');

-- Reviews (homepage slider)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT '',
  logo_url TEXT DEFAULT '',
  quote TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Service role can manage reviews" ON reviews FOR ALL USING (auth.role() = 'service_role');

-- Substack articles
CREATE TABLE IF NOT EXISTS substack_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  date TEXT DEFAULT '',
  slug TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE substack_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read substack_articles" ON substack_articles FOR SELECT USING (true);
CREATE POLICY "Service role can manage substack_articles" ON substack_articles FOR ALL USING (auth.role() = 'service_role');
