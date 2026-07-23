import type { CosenseBlock } from "@cosense-site-kit/core";

/**
 * Photo handling for the home page.
 *
 * Cosense pages carry their images as `[https://gyazo.com/<id>]` lines, which
 * core turns into `image` blocks whose url is `https://gyazo.com/<id>/thumb/1000`.
 * Gyazo serves any width off the same id, so we can build a real `srcset`
 * instead of shipping one fixed size to every viewport.
 */

/** Matches both the page URL (gyazo.com/<id>/…) and the CDN one (i.gyazo.com/<id>.png). */
const GYAZO_RE = /^https?:\/\/(?:i\.)?gyazo\.com\/([0-9a-f]{32})/i;

/** Widths we ask Gyazo for. Covers a phone thumb up to a 2x hero on desktop. */
const DEFAULT_WIDTHS = [480, 960, 1600] as const;

export interface ResponsiveImage {
  src: string;
  /** Absent for non-Gyazo URLs — we can't resize those. */
  srcset?: string;
}

/**
 * Build `src`/`srcset` for an image URL. Non-Gyazo URLs pass through untouched
 * so an externally hosted image still renders.
 */
export function responsiveImage(
  url: string,
  widths: readonly number[] = DEFAULT_WIDTHS,
): ResponsiveImage {
  const id = GYAZO_RE.exec(url)?.[1];
  if (!id) return { src: url };
  const at = (w: number) => `https://gyazo.com/${id}/thumb/${w}`;
  return {
    src: at(widths[widths.length - 1]),
    srcset: widths.map((w) => `${at(w)} ${w}w`).join(", "),
  };
}

export interface Photo extends ResponsiveImage {
  alt: string;
  /** Set when the Cosense image carried a link (`[<image url> <link url>]`). */
  href?: string;
}

/** Pull every image block out of a page body, in author order. */
export function photosFrom(blocks: CosenseBlock[], alt = ""): Photo[] {
  const out: Photo[] = [];
  for (const b of blocks) {
    if (b.type !== "image") continue;
    out.push({ ...responsiveImage(b.url), alt: b.alt ?? alt, href: b.href });
  }
  return out;
}

/**
 * The page body minus its images. The home template lifts the images into the
 * hero collage, so leaving them inline as well would show each photo twice.
 */
export function withoutImages(blocks: CosenseBlock[]): CosenseBlock[] {
  return blocks.filter((b) => b.type !== "image");
}

/** Drop photos that repeat an already-used image (same Gyazo id / same URL). */
export function dedupePhotos(photos: Photo[]): Photo[] {
  const seen = new Set<string>();
  return photos.filter((p) => {
    const key = GYAZO_RE.exec(p.src)?.[1] ?? p.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
