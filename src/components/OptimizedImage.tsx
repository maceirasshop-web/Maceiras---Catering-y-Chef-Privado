import React from 'react';

export function imageBase(src: string): string {
  return src
    .replace(/-\d+\.(webp|avif|jpe?g|png)$/i, '')
    .replace(/\.(webp|avif|jpe?g|png)$/i, '');
}

export function displaySrc(src: string, width: 480 | 800 | 1200 = 800): string {
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  return `${imageBase(src)}-${width}.webp`;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
}) => {
  const base = imageBase(src);

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-480.avif 480w, ${base}-800.avif 800w, ${base}-1200.avif 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`${base}-800.webp`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'async' : 'async'}
      />
    </picture>
  );
};
