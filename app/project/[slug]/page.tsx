import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile-server";
import { CaseStudyPageClient } from "@/components/CaseStudyPageClient";
import type { Metadata } from "next";
import type { ProjectSection } from "@/types/database";
import type { Project } from "@/types/database";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, brief")
    .eq("slug", slug)
    .single();

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Michael's Portfolio`,
    description: project.brief ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) notFound();

  const [{ data: projects }, { data: settings }] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("site_settings").select("projects_per_tab").limit(1).single(),
  ]);

  const sections: ProjectSection[] = project.sections ?? [];
  const profile = await getProfile();

  const raw = settings?.projects_per_tab;
  const DEFAULT = { all: 4, brand_identity: 4, motion: 4, illustrations_decks_flyers: 4 } as const;
  const projectsPerTab =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? {
          all: Number((raw as Record<string, unknown>).all) || DEFAULT.all,
          brand_identity: Number((raw as Record<string, unknown>).brand_identity) || DEFAULT.brand_identity,
          motion: Number((raw as Record<string, unknown>).motion) || DEFAULT.motion,
          illustrations_decks_flyers: Number((raw as Record<string, unknown>).illustrations_decks_flyers) || DEFAULT.illustrations_decks_flyers,
        }
      : DEFAULT;

  return (
    <CaseStudyPageClient
      project={project as Project}
      sections={sections}
      projects={(projects ?? []) as Project[]}
      profile={profile}
      projectsPerTab={projectsPerTab}
    />
  );
}
