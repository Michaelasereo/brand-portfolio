"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Project, ProjectCategory } from "@/types/database";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  brand_identity: "Brand Identity",
  illustrations: "Design Engineering",
  motion: "Product Design",
  marketing_assets: "Marketing Assets",
};

interface ProjectCardProps {
  project: Project;
  layoutId?: string;
}

export function ProjectCard({ project, layoutId }: ProjectCardProps) {
  return (
    <motion.article
      layout
      layoutId={layoutId ?? project.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted"
    >
      <Link href={`/project/${project.slug}`} className="block size-full">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-4",
            "bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          )}
        >
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            {CATEGORY_LABELS[project.category]}
          </span>
          <Button
            variant="secondary"
            size="lg"
            className="pointer-events-none"
          >
            View Case Study
          </Button>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {CATEGORY_LABELS[project.category]}
        </span>
      </Link>
    </motion.article>
  );
}
