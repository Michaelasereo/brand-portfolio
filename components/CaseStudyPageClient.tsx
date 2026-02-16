"use client";

import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/FloatingNav";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { ProjectGrid, getFilterCount, type FilterValue } from "@/components/ProjectGrid";
import type { Profile } from "@/lib/profile-server";
import type { Project, ProjectCategory } from "@/types/database";
import type { ProjectSection } from "@/types/database";

function categoryToFilter(category: ProjectCategory): FilterValue {
  if (category === "illustrations" || category === "marketing_assets") {
    return "illustrations_decks_flyers";
  }
  return category as FilterValue;
}

const DEFAULT_PROJECTS_PER_TAB: Record<FilterValue, number> = {
  all: 4,
  brand_identity: 4,
  motion: 4,
  illustrations_decks_flyers: 4,
};

interface CaseStudyPageClientProps {
  project: Project;
  sections: ProjectSection[];
  projects: Project[];
  profile: Profile;
  projectsPerTab?: Record<FilterValue, number>;
}

export function CaseStudyPageClient({
  project,
  sections,
  projects,
  profile,
  projectsPerTab = DEFAULT_PROJECTS_PER_TAB,
}: CaseStudyPageClientProps) {
  const router = useRouter();
  const activeFilter = categoryToFilter(project.category);
  const counts = {
    all: Math.min(projectsPerTab.all, projects.length),
    brand_identity: Math.min(projectsPerTab.brand_identity, getFilterCount(projects, "brand_identity")),
    motion: Math.min(projectsPerTab.motion, getFilterCount(projects, "motion")),
    illustrations_decks_flyers: Math.min(projectsPerTab.illustrations_decks_flyers, getFilterCount(projects, "illustrations_decks_flyers")),
  };

  return (
    <main className="min-h-screen bg-background pt-16">
      <FloatingNav
        activeFilter={activeFilter}
        onFilterChange={() => router.push("/")}
        counts={counts}
        showHomeLink
      />
      <ProjectCaseStudy project={project} sections={sections} profile={profile} />
    </main>
  );
}
