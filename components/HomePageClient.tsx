"use client";

import { useState } from "react";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { ProjectGrid, getFilterCount, type FilterValue } from "@/components/ProjectGrid";

const HOMEPAGE_MAX_PROJECTS = 4;
import { FloatingNav } from "@/components/FloatingNav";
import { QuoteSection } from "@/components/QuoteSection";
import { ReviewsSection } from "@/components/ReviewsSection";
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

interface HomePageClientProps {
  projects: Project[];
  profile: Profile;
  reviews: ReviewItem[];
  articles?: SubstackArticleItem[];
}

export function HomePageClient({
  projects,
  profile,
  reviews,
}: HomePageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const counts = Object.fromEntries(
    FILTERS.map((f) => [f, getFilterCount(projects, f)])
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
          maxProjects={HOMEPAGE_MAX_PROJECTS}
        />
      </div>

      <QuoteSection />
      <ReviewsSection reviews={reviews} profile={profile} />
      <Footer profile={profile} />
    </main>
  );
}
