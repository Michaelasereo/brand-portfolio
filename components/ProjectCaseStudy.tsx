import Link from "next/link";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectSectionImage } from "@/components/ProjectSectionImage";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Footer } from "@/components/Footer";
import { SectionGallery } from "@/components/SectionGallery";
import type { Profile } from "@/lib/profile-server";
import type { ProjectSection } from "@/types/database";
import type { Project } from "@/types/database";

const ACCENT = "#F4F4E1";

// Fixed section structure
const SECTIONS = [
  { id: "intro", num: "01", title: "INTRO" },
  { id: "problem", num: "02", title: "THE PROBLEM" },
  { id: "process", num: "03", title: "PROCESS" },
  { id: "system", num: "04", title: "SYSTEM" },
  { id: "gallery", num: "4a", title: "GALLERY" },
  { id: "takeaways", num: "4b", title: "KEY TAKEAWAYS & NEXT STEPS" },
  { id: "reviews", num: "05", title: "REVIEWS" },
] as const;

interface ProjectCaseStudyProps {
  project: Project;
  sections: ProjectSection[];
  profile: Profile;
}

export function ProjectCaseStudy({ project, sections, profile }: ProjectCaseStudyProps) {
  const industry = project.industry ?? "";
  const roleTools = project.role_tools ?? "";
  const tags = project.tags ?? [];
  const heroImage = project.hero_image_url ?? project.thumbnail_url;

  const companyName = project.company_name ?? project.title;
  const year = project.year ?? new Date().getFullYear().toString();
  const calloutHeading = project.callout_heading ?? project.tagline ?? project.title;
  const introHeading = project.intro_heading ?? calloutHeading;
  const introDescription = project.intro_description ?? project.brief;
  const dmMono = "var(--font-dm-mono), monospace";

  return (
    <article className="min-h-screen">
      {/* Header: Left = company name + tags | Right = callout heading + subtitle (DM Mono) */}
      <header className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Left: Company name, tags, role & tools */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <div className="space-y-3">
              <div
                className="flex items-baseline justify-between gap-4"
                style={{ fontFamily: dmMono }}
              >
                <p className="text-lg font-medium text-foreground">
                  {companyName}
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {year}
                </span>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      style={{ fontFamily: dmMono }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {roleTools && (
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: dmMono }}
                >
                  {roleTools}
                </p>
              )}
            </div>
          </Link>

          {/* Right: Callout heading + subtitle - DM Mono */}
          <div className="flex-1 lg:max-w-2xl lg:pl-8">
            <h1
              className="text-2xl font-medium leading-[1.3] text-foreground"
              style={{ fontFamily: dmMono, fontSize: "24px" }}
            >
              {calloutHeading}
            </h1>
            {project.brief && (
              <p
                className="mt-4 text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: dmMono }}
              >
                {project.brief}
              </p>
            )}
          </div>
        </div>

        {/* Gap before hero */}
        <div className="mt-16" />
      </header>

      {/* Hero image - full content width */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <ProjectImage
            src={heroImage}
            alt={project.title}
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            loading="eager"
            className="object-cover"
          />
        </div>
      </div>

      {/* Fixed sections: 01 INTRO, 02 PROCESS, 03 SYSTEM, 4a GALLERY, 4b KEY TAKEAWAYS, 05 REVIEWS */}
      {SECTIONS.map((sec) => {
        const dmMono = "var(--font-dm-mono), monospace";
        const problemSection = sections.find((s) => s.type === "problem");
        const systemSection = sections.find((s) => s.type === "system");
        const strategySection = sections.find((s) => s.type === "strategy");
        const galleryImages = project.gallery_urls ?? [];
        const reviews = project.reviews ?? [];
        const sectionGalleries = project.section_galleries ?? {};
        const sectionSubheadingAfter = project.section_subheading_after ?? {};
        const sectionSubtitleAfter = project.section_subtitle_after ?? {};

        const getSectionGallery = (id: string): string[] => {
          let arr: string[] | undefined;
          if (id === "problem") arr = problemSection?.gallery_images;
          else if (id === "process") arr = strategySection?.gallery_images;
          else if (id === "system") arr = systemSection?.gallery_images;
          arr = arr ?? sectionGalleries[id];
          return Array.isArray(arr) ? arr : [];
        };

        const SectionCaptionsAfter = ({ sectionId }: { sectionId: string }) => {
          const subheading = sectionSubheadingAfter[sectionId];
          const subtitle = sectionSubtitleAfter[sectionId];
          if (!subheading && !subtitle) return null;
          return (
            <div className="mt-6 space-y-2">
              {subheading && (
                <p
                  className="font-medium text-foreground"
                  style={{ fontFamily: dmMono, fontSize: "18px" }}
                >
                  {subheading}
                </p>
              )}
              {subtitle && (
                <p
                  className="text-base text-muted-foreground"
                  style={{ fontFamily: dmMono }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          );
        };

        const SectionBlock = ({
          children,
          show = true,
        }: {
          children: React.ReactNode;
          show?: boolean;
        }) =>
          show ? (
            <section className="border-b border-border py-20">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
                  <div className="shrink-0 lg:w-48">
                    <p
                      className="text-xs font-medium tracking-widest"
                      style={{ color: ACCENT }}
                    >
                      {sec.num}
                    </p>
                    <h2
                      className="mt-1 text-lg font-semibold uppercase tracking-tight text-white"
                      style={{ fontFamily: dmMono }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col gap-6">{children}</div>
                </div>
              </div>
            </section>
          ) : null;

        switch (sec.id) {
          case "intro": {
            const introGallery = getSectionGallery("intro");
            return (
              <div key={sec.id}>
                <SectionBlock>
                  {introHeading && (
                    <p
                      className="font-medium leading-[1.3] text-foreground"
                      style={{ fontFamily: dmMono, fontSize: "24px" }}
                    >
                      {introHeading}
                    </p>
                  )}
                  {introDescription && (
                    <div
                      className="text-base leading-relaxed text-muted-foreground"
                      style={{ fontFamily: dmMono }}
                    >
                      <p>{introDescription}</p>
                    </div>
                  )}
                </SectionBlock>
                {introGallery.length >= 1 && (
                  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionGallery images={introGallery} altPrefix="Intro" />
                    <SectionCaptionsAfter sectionId="intro" />
                  </div>
                )}
              </div>
            );
          }
          case "problem": {
            const problemGallery = getSectionGallery("problem");
            return (
              <div key={sec.id}>
                <SectionBlock show={!!problemSection}>
                  {problemSection?.subtitle && (
                    <p
                      className="font-medium leading-[1.3] text-foreground"
                      style={{ fontFamily: dmMono, fontSize: "24px" }}
                    >
                      {problemSection.subtitle}
                    </p>
                  )}
                  {problemSection?.description && (
                    <div
                      className="text-base leading-relaxed text-muted-foreground"
                      style={{ fontFamily: dmMono }}
                    >
                      <MarkdownContent content={problemSection.description} />
                    </div>
                  )}
                  {problemSection?.image && (
                    <div className="overflow-hidden rounded-md">
                      <ProjectSectionImage
                        src={problemSection.image}
                        alt={problemSection.heading}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {(problemSection?.stacked_images?.length ?? 0) > 0 && (
                    <div className="flex flex-col gap-4">
                      {(problemSection?.stacked_images ?? []).slice(0, 3).map((url, idx) => (
                        <div key={idx} className="overflow-hidden rounded-md">
                          <ProjectSectionImage
                            src={url}
                            alt={`${problemSection?.heading ?? "Problem"} ${idx + 1}`}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </SectionBlock>
                {problemGallery.length >= 1 && (
                  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <SectionGallery images={problemGallery} altPrefix="Problem" />
                    <SectionCaptionsAfter sectionId="problem" />
                  </div>
                )}
              </div>
            );
          }
          case "process": {
            const processGallery = getSectionGallery("process");
            const showProcess =
              !!strategySection ||
              (project.process_gallery_urls?.length ?? 0) > 0 ||
              processGallery.length >= 1;
            return (
              <div key={sec.id}>
              <SectionBlock show={showProcess}>
                {strategySection?.subtitle && (
                  <p
                    className="font-medium leading-[1.3] text-foreground"
                    style={{ fontFamily: dmMono, fontSize: "24px" }}
                  >
                    {strategySection.subtitle}
                  </p>
                )}
                {strategySection?.description && (
                  <div
                    className="text-base leading-relaxed text-muted-foreground"
                    style={{ fontFamily: dmMono }}
                  >
                    <MarkdownContent content={strategySection.description} />
                  </div>
                )}
                {(project.process_gallery_urls?.length ?? 0) > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.process_gallery_urls.map((url: string, i: number) => (
                      <div
                        key={i}
                        className="relative aspect-video overflow-hidden rounded-md bg-muted"
                      >
                        <ProjectImage
                          src={url}
                          alt={`Process ${i + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {(strategySection?.stacked_images?.length ?? 0) > 0 && (
                  <div className="flex flex-col gap-4">
                    {(strategySection?.stacked_images ?? []).slice(0, 3).map((url, idx) => (
                      <div key={idx} className="overflow-hidden rounded-md">
                        <ProjectSectionImage
                          src={url}
                          alt={`${strategySection?.heading ?? "Process"} ${idx + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </SectionBlock>
              {processGallery.length >= 1 && (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <SectionGallery images={processGallery} altPrefix="Process" />
                  <SectionCaptionsAfter sectionId="process" />
                </div>
              )}
            </div>
            );
          }
          case "system": {
            const systemGallery = getSectionGallery("system");
            return (
              <div key={sec.id}>
              <SectionBlock show={!!systemSection}>
                {systemSection?.subtitle && (
                  <p
                    className="font-medium leading-[1.3] text-foreground"
                    style={{ fontFamily: dmMono, fontSize: "24px" }}
                  >
                    {systemSection.subtitle}
                  </p>
                )}
                {systemSection?.description && (
                  <div
                    className="text-base leading-relaxed text-muted-foreground"
                    style={{ fontFamily: dmMono }}
                  >
                    <MarkdownContent content={systemSection.description} />
                  </div>
                )}
                {systemSection?.image && (
                  <div className="overflow-hidden rounded-md">
                    <ProjectSectionImage
                      src={systemSection.image}
                      alt={systemSection.heading}
                      loading="lazy"
                    />
                  </div>
                )}
                {(systemSection?.stacked_images?.length ?? 0) > 0 && (
                  <div className="flex flex-col gap-4">
                    {(systemSection?.stacked_images ?? []).slice(0, 3).map((url, idx) => (
                      <div key={idx} className="overflow-hidden rounded-md">
                        <ProjectSectionImage
                          src={url}
                          alt={`${systemSection?.heading ?? "System"} ${idx + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </SectionBlock>
              {systemGallery.length >= 1 && (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <SectionGallery images={systemGallery} altPrefix="System" />
                  <SectionCaptionsAfter sectionId="system" />
                </div>
              )}
            </div>
            );
          }
          case "gallery": {
            const gallerySectionGallery = getSectionGallery("gallery");
            return (
              <div key={sec.id}>
              <SectionBlock show={galleryImages.length > 0}>
                <div className="py-8">
                  <div className="overflow-hidden">
                    <div className="flex w-max animate-marquee gap-4">
                      {[...galleryImages, ...galleryImages].map((url: string, i: number) => (
                        <div
                          key={i}
                          className="relative h-48 w-72 shrink-0 overflow-hidden rounded-md bg-muted sm:h-56 sm:w-80"
                        >
                          <ProjectImage
                            src={url}
                            alt={`Gallery ${(i % galleryImages.length) + 1}`}
                            fill
                            sizes="320px"
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionBlock>
              {gallerySectionGallery.length >= 1 && (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <SectionGallery images={gallerySectionGallery} altPrefix="Gallery" />
                  <SectionCaptionsAfter sectionId="gallery" />
                </div>
              )}
            </div>
            );
          }
          case "takeaways": {
            const takeawaysGallery = getSectionGallery("takeaways");
            return (
              <div key={sec.id}>
              <SectionBlock
                show={!!(project.results || project.markdown_content)}
              >
                <div
                  className="text-base leading-relaxed text-muted-foreground"
                  style={{ fontFamily: dmMono }}
                >
                  {project.markdown_content ? (
                    <MarkdownContent content={project.markdown_content} />
                  ) : (
                    <p className="whitespace-pre-wrap">{project.results}</p>
                  )}
                </div>
              </SectionBlock>
              {takeawaysGallery.length >= 1 && (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <SectionGallery images={takeawaysGallery} altPrefix="Takeaways" />
                  <SectionCaptionsAfter sectionId="takeaways" />
                </div>
              )}
            </div>
            );
          }
          case "reviews": {
            const reviewsGallery = getSectionGallery("reviews");
            return (
              <div key={sec.id}>
              <SectionBlock show={reviews.length > 0}>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {reviews.map((r, i) => (
                    <div
                      key={i}
                      className="flex rounded-lg border border-border bg-muted/30 p-6"
                    >
                      <div className="min-w-0 flex-1 text-left">
                        <p
                          className="text-sm font-medium text-foreground"
                          style={{ fontFamily: dmMono }}
                        >
                          {r.companyName}
                        </p>
                        <p
                          className="mt-3 leading-relaxed text-muted-foreground"
                          style={{ fontFamily: dmMono }}
                        >
                          &ldquo;{r.quote}&rdquo;
                        </p>
                        <p
                          className="mt-4 text-sm font-medium text-foreground"
                          style={{ fontFamily: dmMono }}
                        >
                          {r.author}
                        </p>
                        <p
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: dmMono }}
                        >
                          {r.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>
              {reviewsGallery.length >= 1 && (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <SectionGallery images={reviewsGallery} altPrefix="Reviews" />
                  <SectionCaptionsAfter sectionId="reviews" />
                </div>
              )}
            </div>
            );
          }
          default:
            return null;
        }
      })}

      {/* CTA + Footer */}
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-[#F4F4E1]"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
      <Footer profile={profile} />
    </article>
  );
}
