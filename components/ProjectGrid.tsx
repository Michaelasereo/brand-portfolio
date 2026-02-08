"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProjectRowCard } from "@/components/ProjectRowCard";
import type { Project, ProjectCategory } from "@/types/database";

export type FilterValue =
  | "all"
  | "brand_identity"
  | "motion"
  | "illustrations_decks_flyers";

function filterProjects(
  projects: Project[],
  filter: FilterValue
): Project[] {
  if (filter === "all") return projects;
  if (filter === "illustrations_decks_flyers") {
    return projects.filter(
      (p) => p.category === "illustrations" || p.category === "marketing_assets"
    );
  }
  return projects.filter((p) => p.category === filter);
}

function getFilterCount(
  projects: Project[],
  filter: FilterValue
): number {
  return filterProjects(projects, filter).length;
}

interface ProjectGridProps {
  projects: Project[];
  activeCategory: FilterValue;
  /** Optional limit on displayed projects (e.g. 4 for homepage featured work) */
  maxProjects?: number;
}

export function ProjectGrid({ projects, activeCategory, maxProjects }: ProjectGridProps) {
  const filtered = filterProjects(projects, activeCategory);
  const filteredProjects = maxProjects ? filtered.slice(0, maxProjects) : filtered;

  return (
    <motion.div layout className="divide-y divide-border">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project) => (
          <div key={project.id} className="py-12 first:pt-0">
            <ProjectRowCard
              project={project}
              layoutId={`card-${project.slug}`}
            />
          </div>
        ))}
      </AnimatePresence>
      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-muted-foreground"
        >
          No projects in this category yet.
        </motion.p>
      )}
    </motion.div>
  );
}

export { getFilterCount };
