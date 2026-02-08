import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile-server";
import { HomePageClient } from "@/components/HomePageClient";

export default async function Home() {
  const supabase = await createClient();

  const [projectsRes, profile, reviewsRes, articlesRes] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    getProfile(),
    supabase.from("reviews").select("*").order("sort_order", { ascending: true }).then((r) => r.data ?? []),
    supabase.from("substack_articles").select("*").order("sort_order", { ascending: true }).then((r) => r.data ?? []),
  ]);

  const projects = (projectsRes.data ?? []) as import("@/types/database").Project[];
  const reviews = Array.isArray(reviewsRes) ? reviewsRes : [];
  const articles = Array.isArray(articlesRes) ? articlesRes : [];

  return (
    <HomePageClient
      projects={projects}
      profile={profile}
      reviews={reviews}
      articles={articles}
    />
  );
}
