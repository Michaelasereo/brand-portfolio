"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Profile } from "@/lib/profile-server";
import { TypewriterText } from "@/components/TypewriterText";
import { MarkdownContent } from "@/components/MarkdownContent";
import { useLoader } from "@/context/LoaderContext";

const ICON_CLASS = "size-5 shrink-0";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  behance: (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </svg>
  ),
  substack: (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  ),
};

const CTA_ICONS: Record<string, React.ReactNode> = {
  "Resume/CV": (
    <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  "Chat with me": (
    <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  "Book a call": (
    <svg className={ICON_CLASS} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "See me on Substack": (
    <svg className={ICON_CLASS} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  ),
};

interface PortfolioHeaderProps {
  profile: Profile;
}

const MOBILE_ABOUT_LINES = 3;

export function PortfolioHeader({ profile }: PortfolioHeaderProps) {
  const { loaderDone } = useLoader();
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
    <header className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start gap-4">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/profile-pic.png"
                  alt={profile.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                {profile.socials
                  .filter((s) => s.href?.trim())
                  .map((s) => (
                    <Link
                      key={s.label || s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={s.label}
                    >
                      {SOCIAL_ICONS[s.icon] ?? SOCIAL_ICONS.linkedin}
                    </Link>
                  ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h1 className="text-[28px] font-normal tracking-[-0.05em] text-foreground">
                {loaderDone ? (
                  <TypewriterText
                    text={profile.name}
                    speed={50}
                    accentPrefixLength={profile.name.split(" ")[0]?.length ?? 0}
                  />
                ) : (
                  <>
                    <span style={{ color: "#F4F4E1" }}>{profile.name.split(" ")[0]}</span>
                    {profile.name.includes(" ") && " " + profile.name.split(" ").slice(1).join(" ")}
                  </>
                )}
              </h1>
              <motion.p
                className="mt-1 text-sm tracking-[-0.05em] text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                {profile.title}
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            className="w-[741px] max-w-full rounded-lg p-6 sm:p-8"
            style={{
              backgroundColor: "#101010",
              border: "3px solid #131313",
              fontFamily: "var(--font-dm-mono), monospace",
            }}
            initial={{ opacity: 0, x: -80 }}
            animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div>
              <div
                className={`text-base text-muted-foreground leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-foreground/80 [&_a]:hover:text-foreground lg:block ${!aboutExpanded ? "line-clamp-3 lg:line-clamp-none" : ""}`}
              >
                <MarkdownContent content={profile.about} />
              </div>
              <button
                type="button"
                onClick={() => setAboutExpanded((e) => !e)}
                className="mt-2 text-sm font-medium text-[#F4F4E1] hover:underline lg:hidden"
              >
                {aboutExpanded ? "See less" : "See more"}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 sm:flex-nowrap">
              {profile.ctas
                .filter((c) => c.href?.trim())
                .map((cta) => (
                <Link
                  key={cta.label || cta.href}
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {CTA_ICONS[cta.label] ?? null}
                  {cta.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
