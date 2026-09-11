import imageSize from 'image-size';
import path from 'path';

export type ImageSize = { width: number; height: number };

const cache = new Map<string, ImageSize | null>();

/**
 * Intrinsic dimensions of a file under `public/`, read at build time.
 *
 * Post covers range from roughly 1.3:1 to 3:1, so any fixed box either crops
 * them or pads them. Giving `next/image` the real dimensions lets each one set
 * its own aspect ratio instead.
 *
 * Build-time only — never call this from the browser.
 */
export function getImageSize(src?: string | null): ImageSize | null {
  if (!src || !src.startsWith('/')) return null;

  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  let size: ImageSize | null = null;
  try {
    const { width, height } = imageSize(
      path.join(process.cwd(), 'public', src)
    );
    if (width && height) size = { width, height };
  } catch {
    // A missing or unreadable cover just falls back to no dimensions.
    size = null;
  }

  cache.set(src, size);
  return size;
}
