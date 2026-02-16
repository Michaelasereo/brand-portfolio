-- Per-tab project display limits (admin-configurable)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS projects_per_tab JSONB DEFAULT '{"all":4,"brand_identity":4,"motion":4,"illustrations_decks_flyers":4}';
