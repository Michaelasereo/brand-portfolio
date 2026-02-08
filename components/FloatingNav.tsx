"use client";

import Link from "next/link";
import type { FilterValue } from "@/components/ProjectGrid";

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Featured" },
  { value: "brand_identity", label: "Brand Identity" },
  { value: "motion", label: "Product Design" },
  { value: "illustrations_decks_flyers", label: "Design Engineering" },
];

interface FloatingNavProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  counts?: Partial<Record<FilterValue, number>>;
  position?: "top" | "bottom";
  showHomeLink?: boolean;
}

export function FloatingNav({
  activeFilter,
  onFilterChange,
  counts = {},
  position = "top",
  showHomeLink = false,
}: FloatingNavProps) {
  return (
    <nav
      className={`fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 ${position === "bottom" ? "bottom-6" : "top-6"}`}
      role="tablist"
      aria-label="Project categories"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex min-w-0 flex-1 justify-start">
            {showHomeLink && (
              <Link
                href="/"
                className="text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                Home
              </Link>
            )}
          </div>
          <div className="flex w-full justify-center lg:w-[741px]">
            <div className="flex items-center gap-0.5 rounded-full bg-[#2a2a2a] px-1.5 py-1.5 shadow-xl ring-1 ring-black/20">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onFilterChange(filter.value)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#1a1a1a] shadow-sm"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                    style={isActive ? { backgroundColor: "#F4F4E1" } : undefined}
                  >
                    {filter.label}
                    {counts[filter.value] != null &&
                      (isActive ? (
                        <span
                          className="ml-2 inline-flex size-6 items-center justify-center rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: "#000",
                            color: "#F4F4E1",
                          }}
                        >
                          {counts[filter.value]}
                        </span>
                      ) : (
                        <span className="ml-1 text-xs opacity-60">
                          {counts[filter.value]}
                        </span>
                      ))}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
