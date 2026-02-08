"use client";

import Image from "next/image";

interface ProjectSectionImageProps {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export function ProjectSectionImage({
  src,
  alt,
  loading = "lazy",
}: ProjectSectionImageProps) {
  const isGif = src.toLowerCase().endsWith(".gif");

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-muted">
      <div className="relative aspect-video w-full">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={isGif}
          sizes="(max-width: 1024px) 100vw, 1200px"
          loading={loading}
          className="object-cover"
        />
      </div>
    </div>
  );
}
