import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile-server";
import { HomePageClient } from "@/components/HomePageClient";

const DEFAULT_PROJECTS_PER_TAB = {
  all: 4,
  brand_identity: 4,
  motion: 4,
  illustrations_decks_flyers: 4,
} as const;

export default async function Home() {
  const supabase = await createClient();

  const [projectsRes, profile, reviewsRes, articlesRes, settingsRes] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    getProfile(),
    supabase.from("reviews").select("*").order("sort_order", { ascending: true }).then((r) => r.data ?? []),
    supabase.from("substack_articles").select("*").order("sort_order", { ascending: true }).then((r) => r.data ?? []),
    supabase.from("site_settings").select("projects_per_tab").limit(1).single(),
  ]);

  const projects = (projectsRes.data ?? []) as import("@/types/database").Project[];
  const reviews = Array.isArray(reviewsRes) ? reviewsRes : [];
  const articles = Array.isArray(articlesRes) ? articlesRes : [];
  const raw = settingsRes.data?.projects_per_tab;
  const projectsPerTab =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? {
          all: Number((raw as Record<string, unknown>).all) || DEFAULT_PROJECTS_PER_TAB.all,
          brand_identity: Number((raw as Record<string, unknown>).brand_identity) || DEFAULT_PROJECTS_PER_TAB.brand_identity,
          motion: Number((raw as Record<string, unknown>).motion) || DEFAULT_PROJECTS_PER_TAB.motion,
          illustrations_decks_flyers: Number((raw as Record<string, unknown>).illustrations_decks_flyers) || DEFAULT_PROJECTS_PER_TAB.illustrations_decks_flyers,
        }
      : DEFAULT_PROJECTS_PER_TAB;

  return (
    <HomePageClient
      projects={projects}
      profile={profile}
      reviews={reviews}
      articles={articles}
      projectsPerTab={projectsPerTab}
    />
  );
}
