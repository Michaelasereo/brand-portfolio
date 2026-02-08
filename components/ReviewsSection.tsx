"use client";

import { useState } from "react";
import type { ReviewItem } from "@/components/HomePageClient";
import type { Profile } from "@/lib/profile-server";

const ACCENT = "#F4F4E1";

const PLACEHOLDER_REVIEWS: ReviewItem[] = [
  {
    company_name: "Company One",
    logo_url: "/logos/company-one.svg",
    quote: "Outstanding work. Delivered exactly what we needed.",
    author: "Client Name",
    role: "CEO, Company",
  },
  {
    company_name: "Company Two",
    logo_url: "/logos/company-two.svg",
    quote: "Professional, creative, and easy to work with. Highly recommend.",
    author: "Client Name",
    role: "Marketing Lead",
  },
  {
    company_name: "Company Three",
    logo_url: "/logos/company-three.svg",
    quote: "Brought our brand vision to life with precision and flair.",
    author: "Client Name",
    role: "Founder",
  },
  {
    company_name: "Company Four",
    logo_url: "/logos/company-one.svg",
    quote: "Exceptional attention to detail. A true partner in creativity.",
    author: "Client Name",
    role: "Creative Director",
  },
  {
    company_name: "Company Five",
    logo_url: "/logos/company-two.svg",
    quote: "Transformed our brand identity. The results speak for themselves.",
    author: "Client Name",
    role: "Head of Brand",
  },
  {
    company_name: "Company Six",
    logo_url: "/logos/company-three.svg",
    quote: "Collaborative, innovative, and always delivers on time.",
    author: "Client Name",
    role: "Product Lead",
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div
      className="flex rounded-lg p-6"
      style={{
        backgroundColor: "#101010",
        border: "3px solid #131313",
        fontFamily: "var(--font-dm-mono), monospace",
      }}
    >
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm font-medium text-foreground">
          {review.company_name}
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </p>
        <p className="mt-4 text-sm font-medium text-foreground">
          {review.author}
        </p>
        <p className="text-xs text-muted-foreground">{review.role}</p>
      </div>
      <div className="ml-4 flex shrink-0 items-start">
        <div className="relative flex size-14 items-center justify-center overflow-hidden rounded bg-muted">
          {!logoError ? (
            <img
              src={review.logo_url || "/logos/company-one.svg"}
              alt={review.company_name}
              className="max-h-full max-w-full object-contain p-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xs text-muted-foreground">Logo</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  profile?: Profile;
}

export function ReviewsSection({ reviews, profile }: ReviewsSectionProps) {
  const list = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;
  const duplicated = [...list, ...list];

  return (
    <section
      className="relative border-t border-border py-8"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-foreground">
          What teams say about{" "}
          <span style={{ color: ACCENT }}>
            {profile?.name.split(" ").pop()?.split("-").pop() ?? profile?.name.split(" ")[0] ?? "me"}
          </span>
        </h2>
        <p className="mt-1 text-muted-foreground">
          What clients and collaborators say.
        </p>
      </div>
      <div className="mt-4 overflow-hidden">
        <div className="flex animate-marquee-slow gap-4">
          {duplicated.map((review, i) => (
            <div key={i} className="w-[340px] shrink-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
