export interface SiteSettings {
  id: string;
  primary_color: string;
  secondary_color: string;
  border_radius: string;
  font_family: string;
  updated_at: string;
}

export type ProjectCategory =
  | "brand_identity"
  | "illustrations"
  | "motion"
  | "marketing_assets";

export type ProjectSectionType =
  | "problem"
  | "strategy"
  | "system"
  | "touchpoints"
  | "impact";

export interface ProjectSection {
  type: ProjectSectionType;
  heading: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tag_color?: string;
  gallery_images?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  company_logo_url?: string | null;
  company_name?: string | null;
  callout_heading?: string | null;
  intro_heading?: string | null;
  intro_description?: string | null;
  category: ProjectCategory;
  thumbnail_url: string;
  hero_image_url: string | null;
  brief: string | null;
  industry?: string | null;
  role_tools?: string | null;
  year?: string | null;
  case_study_locked?: boolean | null;
  tags?: string[];
  sections?: ProjectSection[];
  process_gallery_urls: string[];
  gallery_urls?: string[] | null;
  section_galleries?: Record<string, string[]> | null;
  section_subheading_after?: Record<string, string> | null;
  section_subtitle_after?: Record<string, string> | null;
  results: string | null;
  markdown_content: string | null;
  reviews?: Array<{ companyName: string; logo?: string; quote: string; author: string; role: string }> | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
