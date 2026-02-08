"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project, ProjectCategory } from "@/types/database";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  brand_identity: "Brand Identity",
  illustrations: "Design Engineering",
  motion: "Product Design",
  marketing_assets: "Marketing Assets",
};

interface ProjectRowCardProps {
  project: Project;
  layoutId?: string;
}

export function ProjectRowCard({ project, layoutId }: ProjectRowCardProps) {
  const previewUrl = project.hero_image_url ?? project.thumbnail_url;
  const locked = project.case_study_locked ?? false;
  const projectHref = `/project/${project.slug}`;

  const leftContent = (
    <>
      {/* 1080×1080 ratio (1:1), 232×232px */}
      <div className="relative aspect-square w-full max-w-[232px] overflow-hidden rounded-md bg-muted sm:size-[232px]">
        <Image
          src={project.thumbnail_url}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 232px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h2 className="font-semibold text-foreground group-hover:underline" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '28px', letterSpacing: '-0.05em' }}>
          {project.title}
          {project.industry && (
            <span className="ml-1 font-normal text-muted-foreground" style={{ fontSize: '18px' }}>
              / {project.industry}
            </span>
          )}
        </h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-muted/80 px-2.5 py-0.5 font-normal text-muted-foreground" style={{ fontSize: '14px' }}>
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        {project.year && (
          <p className="mt-1.5 text-muted-foreground" style={{ fontSize: '14px' }}>
            {project.year}
          </p>
        )}
      </div>
    </>
  );

  const rightImage = (
    <div className="relative overflow-hidden rounded-md bg-muted">
      <div className="relative aspect-video w-full">
        <Image
          src={previewUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );

  return (
    <motion.article
      layout
      layoutId={layoutId ?? project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        {locked ? (
          <div className="flex flex-col gap-3 sm:w-[232px] sm:shrink-0">{leftContent}</div>
        ) : (
          <Link href={projectHref} className="flex flex-col gap-3 sm:w-[232px] sm:shrink-0">{leftContent}</Link>
        )}
        <div className="relative flex-1 space-y-2">
          {locked ? rightImage : <Link href={projectHref} className="block">{rightImage}</Link>}
          {project.brief && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {project.brief}
            </p>
          )}
          {locked ? (
            <span
              className="inline-flex items-center gap-2 text-muted-foreground"
              style={{ fontSize: '14px' }}
            >
              Read Case Study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 shrink-0"
                aria-label="Locked"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <Link
              href={projectHref}
              className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
              style={{ fontSize: '14px' }}
            >
              Read Case Study →
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
