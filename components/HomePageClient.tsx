"use client";

import { useState } from "react";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { ProjectGrid, getFilterCount, type FilterValue } from "@/components/ProjectGrid";
import { FloatingNav } from "@/components/FloatingNav";
import { QuoteSection } from "@/components/QuoteSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import type { Project } from "@/types/database";
import type { Profile } from "@/lib/profile-server";

export interface ReviewItem {
  id?: string;
  company_name: string;
  logo_url: string | null;
  quote: string;
  author: string;
  role: string | null;
}

export interface SubstackArticleItem {
  id?: string;
  title: string;
  date: string | null;
  slug: string | null;
}

const FILTERS: FilterValue[] = [
  "all",
  "brand_identity",
  "motion",
  "illustrations_decks_flyers",
];

const DEFAULT_PROJECTS_PER_TAB: Record<FilterValue, number> = {
  all: 4,
  brand_identity: 4,
  motion: 4,
  illustrations_decks_flyers: 4,
};

interface HomePageClientProps {
  projects: Project[];
  profile: Profile;
  reviews: ReviewItem[];
  articles?: SubstackArticleItem[];
  projectsPerTab?: Record<FilterValue, number>;
}

export function HomePageClient({
  projects,
  profile,
  reviews,
  projectsPerTab = DEFAULT_PROJECTS_PER_TAB,
}: HomePageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const counts = Object.fromEntries(
    FILTERS.map((f) => {
      const total = getFilterCount(projects, f);
      const limit = projectsPerTab[f] ?? 4;
      return [f, Math.min(limit, total)];
    })
  ) as Partial<Record<FilterValue, number>>;

  return (
    <main className="min-h-screen bg-background pt-16">
      <FloatingNav
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />
      <PortfolioHeader profile={profile} />
      <div className="border-t border-border" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ProjectGrid
          projects={projects}
          activeCategory={activeFilter}
          maxProjects={projectsPerTab[activeFilter] ?? 4}
        />
      </div>

      <QuoteSection />
      <ReviewsSection reviews={reviews} profile={profile} />
      <ContactSection />
      <Footer profile={profile} />
    </main>
  );
}
