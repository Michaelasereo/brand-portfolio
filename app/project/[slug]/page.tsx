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
    title: `${project.title} | ti3cket.com`,
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

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const sections: ProjectSection[] = project.sections ?? [];
  const profile = await getProfile();

  return (
    <CaseStudyPageClient
      project={project as Project}
      sections={sections}
      projects={(projects ?? []) as Project[]}
      profile={profile}
    />
  );
}
