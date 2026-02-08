"use client";

import Link from "next/link";
import type { Profile } from "@/lib/profile-server";

const SUBSTACK_URL = "https://substack.com";

const PLACEHOLDER_ARTICLES = [
  { title: "Article title one", date: "Jan 2026", slug: "" },
  { title: "Article title two", date: "Dec 2025", slug: "" },
  { title: "Article title three", date: "Nov 2025", slug: "" },
];

export interface SubstackArticleItem {
  id?: string;
  title: string;
  date: string | null;
  slug: string | null;
}

interface SubstackSectionProps {
  profile: Profile;
  articles: SubstackArticleItem[];
}

export function SubstackSection({ profile, articles }: SubstackSectionProps) {
  const substackCta = profile.ctas.find((c) => c.label === "See me on Substack");
  const substackHref = substackCta?.href || SUBSTACK_URL;
  const list = articles.length > 0 ? articles : PLACEHOLDER_ARTICLES;

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Hi, it&apos;s{" "}
          <span style={{ color: "#F4F4E1" }}>
            {profile.name.split(" ").pop()?.split("-").pop() ?? profile.name.split(" ")[0]}
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Essays on design, branding, and creative process.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((article, i) => (
            <Link
              key={"id" in article && article.id ? article.id : i}
              href={article.slug ? `${substackHref}/${article.slug}` : substackHref}
              className="group rounded-lg border border-border p-6 transition-colors hover:border-foreground/30 hover:bg-muted/30"
            >
              <h3 className="font-medium text-foreground group-hover:underline">
                {article.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {article.date ?? ""}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href={substackHref}
          className="mt-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          View all on Substack →
        </Link>
      </div>
    </section>
  );
}
