"use client";

const DEFAULT_QUOTE = "Stay Hungry, Stay Foolish";
const DEFAULT_AUTHOR = "Steve Jobs";

interface QuoteSectionProps {
  quote?: string | null;
  author?: string | null;
}

export function QuoteSection({ quote, author }: QuoteSectionProps) {
  const text = quote || DEFAULT_QUOTE;
  const byline = author || DEFAULT_AUTHOR;

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <blockquote
          className="text-center"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            &ldquo;{text}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            — {byline}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
