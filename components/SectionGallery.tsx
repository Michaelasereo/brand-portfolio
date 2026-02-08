"use client";

import { ProjectImage } from "@/components/ProjectImage";

interface SectionGalleryProps {
  images: string[];
  altPrefix?: string;
}

export function SectionGallery({ images, altPrefix = "Gallery" }: SectionGalleryProps) {
  if (!images?.length || images.length > 4) return null;

  // 1 image = full-width banner
  if (images.length === 1) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="relative aspect-[21/9] w-full">
          <ProjectImage
            src={images[0]}
            alt={`${altPrefix} 1`}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  // 2–4 images = continuously moving marquee
  const duplicated = [...images, ...images];
  return (
    <div className="overflow-hidden py-4">
      <div className="flex animate-marquee gap-6">
        {duplicated.map((url, i) => (
          <div
            key={`${i}-${url}`}
            className="relative h-48 w-72 shrink-0 overflow-hidden rounded-md bg-muted"
          >
            <ProjectImage
              src={url}
              alt={`${altPrefix} ${(i % images.length) + 1}`}
              fill
              sizes="288px"
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
