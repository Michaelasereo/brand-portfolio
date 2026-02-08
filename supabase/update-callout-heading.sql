-- Set callout_heading for projects
-- Run this in Supabase SQL Editor after migration-tagline.sql

-- Corepay: example callout heading
UPDATE projects
SET callout_heading = 'Designing a new way to host events for people who never thought they could.'
WHERE slug = 'corepay-fintech';

-- Optional: add callout headings for other projects
-- UPDATE projects
-- SET callout_heading = 'Your callout text here.'
-- WHERE slug = 'pookie-ecommerce';

-- UPDATE projects
-- SET callout_heading = 'Your callout text here.'
-- WHERE slug = 'truedeck-ai-edtech';
