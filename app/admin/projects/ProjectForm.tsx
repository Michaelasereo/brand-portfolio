"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project, ProjectCategory, ProjectSection, ProjectSectionType } from "@/types/database";

const SECTION_TYPES: { value: ProjectSectionType; label: string }[] = [
  { value: "problem", label: "The Problem" },
  { value: "strategy", label: "Strategy" },
  { value: "system", label: "System" },
  { value: "touchpoints", label: "Touchpoints" },
  { value: "impact", label: "Impact & Takeaway" },
];

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "brand_identity", label: "Brand Identity" },
  { value: "illustrations", label: "Design Engineering" },
  { value: "motion", label: "Product Design" },
  { value: "marketing_assets", label: "Marketing Assets" },
];

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultSections: ProjectSection[] = SECTION_TYPES.map((t) => {
    const existing = (project?.sections ?? []).find((s) => s.type === t.value);
    return {
      type: t.value,
      heading: existing?.heading ?? t.label,
      subtitle: existing?.subtitle ?? "",
      description: existing?.description ?? "",
      image: existing?.image ?? "",
      tag_color: existing?.tag_color ?? "",
      gallery_images: existing?.gallery_images ?? [],
      stacked_images: (existing?.stacked_images ?? []).slice(0, 3),
    };
  });

  const SECTION_GALLERY_IDS = [
    "intro",
    "problem",
    "process",
    "system",
    "gallery",
    "takeaways",
    "reviews",
  ] as const;
  const defaultSectionGalleries: Record<string, string[]> = SECTION_GALLERY_IDS.reduce(
    (acc, id) => {
      acc[id] = (project?.section_galleries ?? {})[id] ?? [];
      return acc;
    },
    {} as Record<string, string[]>
  );

  const defaultSectionSubheadingAfter: Record<string, string> = SECTION_GALLERY_IDS.reduce(
    (acc, id) => {
      acc[id] = (project?.section_subheading_after ?? {})[id] ?? "";
      return acc;
    },
    {} as Record<string, string>
  );
  const defaultSectionSubtitleAfter: Record<string, string> = SECTION_GALLERY_IDS.reduce(
    (acc, id) => {
      acc[id] = (project?.section_subtitle_after ?? {})[id] ?? "";
      return acc;
    },
    {} as Record<string, string>
  );

  const defaultReviews = (project?.reviews ?? []).map((r) => ({
    companyName: r.companyName ?? "",
    logo: r.logo ?? "",
    quote: r.quote ?? "",
    author: r.author ?? "",
    role: r.role ?? "",
  }));

  const [formData, setFormData] = useState({
    slug: project?.slug ?? "",
    title: project?.title ?? "",
    tagline: project?.tagline ?? "",
    company_name: project?.company_name ?? "",
    company_logo_url: project?.company_logo_url ?? "",
    callout_heading: project?.callout_heading ?? "",
    intro_heading: project?.intro_heading ?? "",
    intro_description: project?.intro_description ?? "",
    category: (project?.category ?? "brand_identity") as ProjectCategory,
    thumbnail_url: project?.thumbnail_url ?? "",
    hero_image_url: project?.hero_image_url ?? "",
    brief: project?.brief ?? "",
    industry: project?.industry ?? "",
    year: project?.year ?? "",
    case_study_locked: project?.case_study_locked ?? false,
    role_tools: project?.role_tools ?? "",
    tags: (project?.tags ?? []).join(", "),
    results: project?.results ?? "",
    markdown_content: project?.markdown_content ?? "",
    process_urls: (project?.process_gallery_urls ?? []).join("\n"),
    gallery_urls: (project?.gallery_urls ?? []).join("\n"),
    section_galleries: defaultSectionGalleries,
    section_subheading_after: defaultSectionSubheadingAfter,
    section_subtitle_after: defaultSectionSubtitleAfter,
    sort_order: project?.sort_order ?? 0,
    sections: defaultSections,
    reviews: defaultReviews,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [processFiles, setProcessFiles] = useState<File[]>([]);
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [sectionImageFiles, setSectionImageFiles] = useState<(File | null)[]>([]);
  const [sectionGalleryFiles, setSectionGalleryFiles] = useState<(File[] | null)[]>([]);
  const [sectionStackedFiles, setSectionStackedFiles] = useState<(File[] | null)[]>([]);
  const [sectionGalleryFilesById, setSectionGalleryFilesById] = useState<Record<string, File[]>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let thumbnailUrl = formData.thumbnail_url;
      let heroUrl = formData.hero_image_url;
      let processUrls = formData.process_urls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, `thumb-${Date.now()}`);
      }
      if (heroFile) {
        heroUrl = await uploadFile(heroFile, `hero-${Date.now()}`);
      }
      if (processFiles.length > 0) {
        const urls = await Promise.all(
          processFiles.map((f, i) =>
            uploadFile(f, `process-${Date.now()}-${i}`)
          )
        );
        processUrls = [...processUrls, ...urls];
      }

      let companyLogoUrl = formData.company_logo_url;
      if (companyLogoFile) {
        companyLogoUrl = await uploadFile(
          companyLogoFile,
          `company-logo-${Date.now()}`
        );
      }

      const galleryUrls = formData.gallery_urls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const sectionsRaw = formData.sections;
      const sections: typeof sectionsRaw = [];
      for (let i = 0; i < sectionsRaw.length; i++) {
        const s = sectionsRaw[i];
        let image = s.image || undefined;
        if (sectionImageFiles[i]) {
          image = await uploadFile(
            sectionImageFiles[i]!,
            `section-${i}-image-${Date.now()}`
          );
        }
        let gallery_images = s.gallery_images?.filter(Boolean) ?? [];
        const galleryFiles = sectionGalleryFiles[i];
        if (
          (s.type === "problem" || s.type === "strategy" || s.type === "system") &&
          galleryFiles?.length
        ) {
          const uploaded = await Promise.all(
            galleryFiles.map((f, j) =>
              uploadFile(f, `section-${i}-gallery-${Date.now()}-${j}`)
            )
          );
          gallery_images = [...gallery_images, ...uploaded].slice(0, 4);
        } else {
          gallery_images = gallery_images.slice(0, 4);
        }
        let stacked_images = (s.stacked_images ?? []).filter(Boolean).slice(0, 3);
        const stackedFiles = sectionStackedFiles[i];
        if (stackedFiles?.length) {
          const uploaded = await Promise.all(
            stackedFiles.map((f, j) =>
              uploadFile(f, `section-${i}-stacked-${Date.now()}-${j}`)
            )
          );
          stacked_images = [...stacked_images, ...uploaded].slice(0, 3);
        }
        sections.push({
          ...s,
          tag_color: s.tag_color || undefined,
          image,
          gallery_images,
          stacked_images: stacked_images.length ? stacked_images : undefined,
        });
      }
      const sectionsFiltered = sections.filter(
        (s) =>
          s.heading ||
          s.description ||
          s.image ||
          (s.gallery_images ?? []).length > 0 ||
          (s.stacked_images ?? []).length > 0
      );

      const sectionGalleries: Record<string, string[]> = {};
      for (const id of SECTION_GALLERY_IDS) {
        let urls = (formData.section_galleries[id] ?? []).filter(Boolean);
        const files = sectionGalleryFilesById[id];
        if (files?.length) {
          const uploaded = await Promise.all(
            files.map((f, j) =>
              uploadFile(f, `section-gallery-${id}-${Date.now()}-${j}`)
            )
          );
          urls = [...urls, ...uploaded];
        }
        if (urls.length > 0) sectionGalleries[id] = urls;
      }

      const sectionSubheadingAfter: Record<string, string> = {};
      const sectionSubtitleAfter: Record<string, string> = {};
      for (const id of SECTION_GALLERY_IDS) {
        const h = (formData.section_subheading_after ?? {})[id]?.trim();
        const s = (formData.section_subtitle_after ?? {})[id]?.trim();
        if (h) sectionSubheadingAfter[id] = h;
        if (s) sectionSubtitleAfter[id] = s;
      }

      const payload = {
        ...(project?.id && { id: project.id }),
        slug: formData.slug,
        title: formData.title,
        tagline: formData.tagline || null,
        company_name: formData.company_name || null,
        company_logo_url: companyLogoUrl || null,
        callout_heading: formData.callout_heading || null,
        intro_heading: formData.intro_heading || null,
        intro_description: formData.intro_description || null,
        category: formData.category,
        thumbnail_url: thumbnailUrl,
        hero_image_url: heroUrl || null,
        brief: formData.brief || null,
        industry: formData.industry || null,
        year: formData.year || null,
        case_study_locked: formData.case_study_locked,
        role_tools: formData.role_tools || null,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        sections: sectionsFiltered,
        results: formData.results || null,
        markdown_content: formData.markdown_content || null,
        process_gallery_urls: processUrls,
        gallery_urls: galleryUrls,
        section_galleries: sectionGalleries,
        section_subheading_after: sectionSubheadingAfter,
        section_subtitle_after: sectionSubtitleAfter,
        reviews: formData.reviews.filter((r) => r.quote || r.companyName),
        sort_order: formData.sort_order,
      };

      const res = await fetch("/api/admin/projects", {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save project");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  type ReviewEntry = {
    companyName: string;
    logo: string;
    quote: string;
    author: string;
    role: string;
  };

  function updateReview(i: number, field: keyof ReviewEntry, value: string) {
    setFormData((d) => ({
      ...d,
      reviews: d.reviews.map((r, j) =>
        j === i ? { ...r, [field]: value } : r
      ),
    }));
  }

  function addReview() {
    setFormData((d) => ({
      ...d,
      reviews: [
        ...d.reviews,
        {
          companyName: "",
          logo: "",
          quote: "",
          author: "",
          role: "",
        },
      ],
    }));
  }

  function removeReview(i: number) {
    setFormData((d) => ({
      ...d,
      reviews: d.reviews.filter((_, j) => j !== i),
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL path)</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) =>
            setFormData((d) => ({ ...d, slug: e.target.value }))
          }
          placeholder="my-project"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((d) => ({ ...d, title: e.target.value }))
          }
          required
        />
      </div>
      <details className="rounded-lg border p-4">
        <summary className="cursor-pointer font-medium">Header (Company, Callout)</summary>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              value={formData.tagline}
              onChange={(e) =>
                setFormData((d) => ({ ...d, tagline: e.target.value }))
              }
              placeholder="Optional tagline for case study header"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              value={formData.company_name}
              onChange={(e) =>
                setFormData((d) => ({ ...d, company_name: e.target.value }))
              }
              placeholder="Company or project name"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCompanyLogoFile(e.target.files?.[0] ?? null)
              }
            />
            <Input
              value={formData.company_logo_url}
              onChange={(e) =>
                setFormData((d) => ({ ...d, company_logo_url: e.target.value }))
              }
              placeholder="Or paste logo URL"
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <Label>Callout Heading</Label>
            <Textarea
              value={formData.callout_heading}
              onChange={(e) =>
                setFormData((d) => ({
                  ...d,
                  callout_heading: e.target.value,
                }))
              }
              rows={2}
              placeholder="Large heading in header right column"
            />
          </div>
          <div className="space-y-2">
            <Label>Intro Heading (01 INTRO section only)</Label>
            <Input
              value={formData.intro_heading}
              onChange={(e) =>
                setFormData((d) => ({ ...d, intro_heading: e.target.value }))
              }
              placeholder="Leave empty to use Callout Heading"
            />
          </div>
          <div className="space-y-2">
            <Label>Intro Description (01 INTRO section only)</Label>
            <Textarea
              value={formData.intro_description}
              onChange={(e) =>
                setFormData((d) => ({ ...d, intro_description: e.target.value }))
              }
              rows={3}
              placeholder="Leave empty to use Brief"
            />
          </div>
        </div>
      </details>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(v) =>
            setFormData((d) => ({ ...d, category: v as ProjectCategory }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Thumbnail</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
        />
        {!thumbnailFile && formData.thumbnail_url && (
          <p className="text-sm text-muted-foreground">
            Current: {formData.thumbnail_url}
          </p>
        )}
        <Input
          value={formData.thumbnail_url}
          onChange={(e) =>
            setFormData((d) => ({ ...d, thumbnail_url: e.target.value }))
          }
          placeholder="Or paste image URL"
          className="mt-2"
        />
      </div>
      <div className="space-y-2">
        <Label>Hero Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
        />
        {!heroFile && formData.hero_image_url && (
          <p className="text-sm text-muted-foreground">
            Current: {formData.hero_image_url}
          </p>
        )}
        <Input
          value={formData.hero_image_url}
          onChange={(e) =>
            setFormData((d) => ({ ...d, hero_image_url: e.target.value }))
          }
          placeholder="Or paste image URL"
          className="mt-2"
        />
      </div>
      <div className="space-y-2">
        <Label>Industry (e.g. Fintech)</Label>
        <Input
          value={formData.industry}
          onChange={(e) =>
            setFormData((d) => ({ ...d, industry: e.target.value }))
          }
          placeholder="Fintech"
        />
      </div>
      <div className="space-y-2">
        <Label>Year (e.g. 2025)</Label>
        <Input
          value={formData.year}
          onChange={(e) =>
            setFormData((d) => ({ ...d, year: e.target.value }))
          }
          placeholder="2025"
        />
      </div>
      <div className="space-y-2 flex items-center gap-2">
        <input
          type="checkbox"
          id="case_study_locked"
          checked={formData.case_study_locked}
          onChange={(e) =>
            setFormData((d) => ({ ...d, case_study_locked: e.target.checked }))
          }
          className="rounded border"
        />
        <Label htmlFor="case_study_locked">Lock case study (hide link & prevent navigation)</Label>
      </div>
      <div className="space-y-2">
        <Label>Tags (comma-separated)</Label>
        <Input
          value={formData.tags}
          onChange={(e) =>
            setFormData((d) => ({ ...d, tags: e.target.value }))
          }
          placeholder="Brand Identity, Motion Design"
        />
      </div>
      <div className="space-y-2">
        <Label>Brief / Description</Label>
        <Textarea
          value={formData.brief}
          onChange={(e) =>
            setFormData((d) => ({ ...d, brief: e.target.value }))
          }
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Role & Tools</Label>
        <Input
          value={formData.role_tools}
          onChange={(e) =>
            setFormData((d) => ({ ...d, role_tools: e.target.value }))
          }
          placeholder="Sr. Brand & Motion Designer (Figma, After Effects, Illustrator)"
        />
      </div>
      <div className="space-y-6">
        <Label className="text-base font-medium">Sections (The Problem, Strategy, System, Touchpoints, Impact)</Label>
        {formData.sections.map((section, i) => (
          <div
            key={section.type}
            className="rounded-lg border border-border p-4 space-y-4"
          >
            <h3 className="font-medium">{SECTION_TYPES[i].label}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  value={section.heading}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      sections: d.sections.map((s, j) =>
                        j === i ? { ...s, heading: e.target.value } : s
                      ),
                    }))
                  }
                  placeholder={SECTION_TYPES[i].label}
                />
              </div>
              <div className="space-y-2">
                <Label>Tag Color (hex)</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={section.tag_color || "#ff6b00"}
                    onChange={(e) =>
                      setFormData((d) => ({
                        ...d,
                        sections: d.sections.map((s, j) =>
                          j === i ? { ...s, tag_color: e.target.value } : s
                        ),
                      }))
                    }
                    className="h-10 w-12 cursor-pointer rounded border"
                  />
                  <Input
                    value={section.tag_color}
                    onChange={(e) =>
                      setFormData((d) => ({
                        ...d,
                        sections: d.sections.map((s, j) =>
                          j === i ? { ...s, tag_color: e.target.value } : s
                        ),
                      }))
                    }
                    placeholder="#ff6b00"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={section.subtitle}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    sections: d.sections.map((s, j) =>
                      j === i ? { ...s, subtitle: e.target.value } : s
                    ),
                  }))
                }
                placeholder="Optional subtitle"
              />
            </div>
            <div className="space-y-2">
              <Label>Description (markdown)</Label>
              <p className="text-xs text-muted-foreground">
                Lists: use <code className="rounded bg-muted px-1">-</code> or{" "}
                <code className="rounded bg-muted px-1">*</code> for bullets,{" "}
                <code className="rounded bg-muted px-1">1.</code> for numbered.
              </p>
              <Textarea
                value={section.description}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    sections: d.sections.map((s, j) =>
                      j === i ? { ...s, description: e.target.value } : s
                    ),
                  }))
                }
                rows={3}
                placeholder="Section content..."
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL (1920×1080 or taller, gifs supported)</Label>
              <Input
                value={section.image}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    sections: d.sections.map((s, j) =>
                      j === i ? { ...s, image: e.target.value } : s
                    ),
                  }))
                }
                placeholder="https://..."
              />
              <p className="text-sm text-muted-foreground">Or upload image</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSectionImageFiles((prev) => {
                    const next = [...prev];
                    next[i] = e.target.files?.[0] ?? null;
                    return next;
                  });
                }}
              />
              {!sectionImageFiles[i] && section.image && (
                <p className="text-sm text-muted-foreground">
                  Current: {section.image}
                </p>
              )}
            </div>
            {(section.type === "problem" || section.type === "strategy" || section.type === "system") && (
              <div className="space-y-2">
                <Label>Gallery Images (multiple = carousel)</Label>
                <p className="text-sm text-muted-foreground">Or upload images</p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setSectionGalleryFiles((prev) => {
                      const next = [...prev];
                      next[i] = Array.from(e.target.files ?? []).slice(0, 4);
                      return next;
                    });
                  }}
                />
                <Textarea
                  value={(section.gallery_images ?? []).join("\n")}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      sections: d.sections.map((s, j) =>
                        j === i
                          ? {
                              ...s,
                              gallery_images: e.target.value
                                .split("\n")
                                .map((u) => u.trim())
                                .filter(Boolean),
                            }
                          : s
                      ),
                    }))
                  }
                  rows={2}
                  placeholder="One URL per line"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Stacked images (optional, max 3; display vertically)</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setSectionStackedFiles((prev) => {
                    const next = [...prev];
                    next[i] = Array.from(e.target.files ?? []).slice(0, 3);
                    return next;
                  });
                }}
              />
              <Textarea
                value={(section.stacked_images ?? []).join("\n")}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    sections: d.sections.map((s, j) =>
                      j === i
                        ? {
                            ...s,
                            stacked_images: e.target.value
                              .split("\n")
                              .map((u) => u.trim())
                              .filter(Boolean)
                              .slice(0, 3),
                          }
                        : s
                    ),
                  }))
                }
                rows={2}
                placeholder="One URL per line (max 3)"
              />
            </div>
          </div>
        ))}
      </div>
      <details className="rounded-lg border p-4">
        <summary className="cursor-pointer font-medium">Galleries</summary>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Process Gallery (one URL per line, or upload files)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setProcessFiles(Array.from(e.target.files ?? []))
              }
            />
            <Textarea
              value={formData.process_urls}
              onChange={(e) =>
                setFormData((d) => ({ ...d, process_urls: e.target.value }))
              }
              placeholder="https://..."
              rows={3}
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <Label>Gallery URLs (section 4a, one per line)</Label>
            <Textarea
              value={formData.gallery_urls}
              onChange={(e) =>
                setFormData((d) => ({ ...d, gallery_urls: e.target.value }))
              }
              placeholder="https://..."
              rows={3}
            />
          </div>
          <div className="space-y-4">
            <Label>Section Galleries (intro, problem, process, system, gallery, takeaways, reviews)</Label>
            {SECTION_GALLERY_IDS.map((id) => (
              <div key={id} className="rounded border p-3 space-y-2">
                <Label className="text-xs font-medium">{id}</Label>
                <p className="text-xs text-muted-foreground">Upload images (multiple = carousel)</p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setSectionGalleryFilesById((prev) => ({
                      ...prev,
                      [id]: Array.from(e.target.files ?? []),
                    }));
                  }}
                />
                <Textarea
                  value={(formData.section_galleries[id] ?? []).join("\n")}
                  onChange={(e) =>
                    setFormData((d) => ({
                      ...d,
                      section_galleries: {
                        ...d.section_galleries,
                        [id]: e.target.value
                          .split("\n")
                          .map((u) => u.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                  rows={2}
                  placeholder="Or paste URLs, one per line"
                  className="mt-1"
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Sub-heading after images (optional)</Label>
                    <Input
                      value={(formData.section_subheading_after ?? {})[id] ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({
                          ...d,
                          section_subheading_after: {
                            ...(d.section_subheading_after ?? {}),
                            [id]: e.target.value,
                          },
                        }))
                      }
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Subtitle after images (optional)</Label>
                    <Input
                      value={(formData.section_subtitle_after ?? {})[id] ?? ""}
                      onChange={(e) =>
                        setFormData((d) => ({
                          ...d,
                          section_subtitle_after: {
                            ...(d.section_subtitle_after ?? {}),
                            [id]: e.target.value,
                          },
                        }))
                      }
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>
      <details className="rounded-lg border p-4">
        <summary className="cursor-pointer font-medium">Project Reviews</summary>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <Label>Reviews (section 05)</Label>
            <Button type="button" variant="outline" size="sm" onClick={addReview}>
              Add Review
            </Button>
          </div>
          {formData.reviews.map((r, i) => (
            <div key={i} className="flex gap-2 rounded-lg border p-4">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Company"
                  value={r.companyName}
                  onChange={(e) => updateReview(i, "companyName", e.target.value)}
                />
                <Input
                  placeholder="Logo URL"
                  value={r.logo}
                  onChange={(e) => updateReview(i, "logo", e.target.value)}
                />
                <Textarea
                  placeholder="Quote"
                  value={r.quote}
                  onChange={(e) => updateReview(i, "quote", e.target.value)}
                  rows={2}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input
                    placeholder="Author"
                    value={r.author}
                    onChange={(e) => updateReview(i, "author", e.target.value)}
                  />
                  <Input
                    placeholder="Role"
                    value={r.role}
                    onChange={(e) => updateReview(i, "role", e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeReview(i)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </details>
      <div className="space-y-2">
        <Label>Results (plain text)</Label>
        <Textarea
          value={formData.results}
          onChange={(e) =>
            setFormData((d) => ({ ...d, results: e.target.value }))
          }
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Markdown Content (optional, overrides Results if set)</Label>
        <p className="text-xs text-muted-foreground">
          Lists: use <code className="rounded bg-muted px-1">-</code> or{" "}
          <code className="rounded bg-muted px-1">*</code> for bullets,{" "}
          <code className="rounded bg-muted px-1">1.</code> for numbered.
        </p>
        <Textarea
          value={formData.markdown_content}
          onChange={(e) =>
            setFormData((d) => ({ ...d, markdown_content: e.target.value }))
          }
          rows={6}
          placeholder="# Heading&#10;&#10;Markdown content..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          type="number"
          value={formData.sort_order}
          onChange={(e) =>
            setFormData((d) => ({
              ...d,
              sort_order: parseInt(e.target.value, 10) || 0,
            }))
          }
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}

async function uploadFile(file: File, name: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Upload failed");
  }
  const { url } = await res.json();
  return url;
}
