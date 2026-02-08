-- Seed 3 sample projects
-- Run in Supabase SQL Editor (after schema.sql)

INSERT INTO projects (slug, title, category, thumbnail_url, hero_image_url, brief, sort_order) VALUES
(
  'corepay-fintech',
  'Corepay',
  'brand_identity',
  'https://picsum.photos/seed/corepay/600/600',
  'https://picsum.photos/seed/corepay-hero/1200/600',
  'Brand identity and motion design for Corepay, a fintech company focused on seamless payments across Africa. The project encompassed logo design, brand guidelines, and animated assets for marketing campaigns.',
  1
),
(
  'pookie-ecommerce',
  'Pookie',
  'illustrations',
  'https://picsum.photos/seed/pookie/600/600',
  'https://picsum.photos/seed/pookie-hero/1200/600',
  'Illustrations and motion design for Pookie, an e-commerce brand in the pet care space. Created a cohesive set of illustrations for product packaging, social media, and in-app experiences.',
  2
),
(
  'truedeck-ai-edtech',
  'Truedeck',
  'motion',
  'https://picsum.photos/seed/truedeck/600/600',
  'https://picsum.photos/seed/truedeck-hero/1200/600',
  'Brand identity and motion design for Truedeck, an AI-powered EdTech platform. Developed the visual identity, UI elements, and motion graphics for product launches and investor materials.',
  3
);
