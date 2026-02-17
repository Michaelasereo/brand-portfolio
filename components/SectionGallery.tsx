"use client";

import { useState } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionGalleryProps {
  images: string[];
  altPrefix?: string;
}

export function SectionGallery({ images, altPrefix = "Gallery" }: SectionGalleryProps) {
  if (!images?.length) return null;

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

  // 2+ images = carousel with prev/next and dots
  return (
    <SectionCarousel images={images} altPrefix={altPrefix} />
  );
}

function SectionCarousel({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/9] w-full">
        <ProjectImage
          src={images[index]}
          alt={`${altPrefix} ${index + 1}`}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        aria-label="Previous image"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        aria-label="Next image"
      >
        <ChevronRight className="size-5" />
      </button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
