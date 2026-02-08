"use client";

import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}

export function ProjectImage({
  src,
  alt,
  fill,
  className = "",
  sizes,
  priority,
  loading,
  width,
  height,
}: ProjectImageProps) {
  const isGif = src.toLowerCase().endsWith(".gif");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={loading}
      unoptimized={isGif}
      className={className}
    />
  );
}
