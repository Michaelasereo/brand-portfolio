"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  function handleFilterClick(value: FilterValue) {
    onFilterChange(value);
    setMenuOpen(false);
  }

  return (
    <nav
      className={`fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 ${position === "bottom" ? "bottom-6" : "top-6"}`}
      role="tablist"
      aria-label="Project categories"
    >
      <div className="mx-auto max-w-6xl" ref={menuRef}>
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

          {/* Mobile: floating hamburger */}
          <div className="relative flex w-full justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex size-12 items-center justify-center rounded-full bg-[#2a2a2a] shadow-xl ring-1 ring-black/20 transition-colors hover:bg-[#333]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="size-6 text-white" strokeWidth={2} />
              ) : (
                <Menu className="size-6 text-white" strokeWidth={2} />
              )}
            </button>
            {menuOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 min-w-[14rem] rounded-xl bg-[#2a2a2a] py-2 shadow-xl ring-1 ring-black/20 ${
                  position === "bottom" ? "bottom-full mb-2" : "top-full"
                }`}
              >
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleFilterClick(filter.value)}
                      className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[#1a1a1a]"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                      style={isActive ? { backgroundColor: "#F4F4E1" } : undefined}
                    >
                      {filter.label}
                      {counts[filter.value] != null && (
                        <span
                          className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                            isActive ? "bg-[#000] text-[#F4F4E1]" : "opacity-60"
                          }`}
                        >
                          {counts[filter.value]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop: pill tabs */}
          <div className="hidden w-full justify-center lg:flex lg:w-[741px]">
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
