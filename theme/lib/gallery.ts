import type { CosenseBlock } from "@cosense-site-kit/core";
import { dedupePhotos, photosFrom, type Photo } from "./photos";

// Minimal shape of a page entry we read here (kept structural so this lib does
// not depend on astro:content types).
interface PageEntry {
  data: {
    title: string;
    slug: string;
    tags: string[];
    blocks: CosenseBlock[];
    publishedAt?: string;
    modifiedAt?: string;
  };
}

/**
 * Every image used across the lab's news posts — newest first, deduped, each
 * linked to its source post. The gallery is fully automatic: authors just paste
 * images into their posts. Shared by the home preview and the /gallery page.
 */
export function newsImages(
  entries: PageEntry[],
  newsTag: string,
  toPath: (slug: string) => string,
): Photo[] {
  const dateOf = (e: PageEntry) => e.data.publishedAt ?? e.data.modifiedAt ?? "";
  return dedupePhotos(
    entries
      .filter((e) => e.data.tags.includes(newsTag))
      .sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
      .flatMap((e) =>
        photosFrom(e.data.blocks).map((p) => ({
          ...p,
          alt: p.alt || e.data.title,
          href: p.href ?? toPath(e.data.slug),
        })),
      ),
  );
}
