import type { CosenseBlock } from "@cosense-site-kit/core";
import { hasTag } from "@cosense-site-kit/theme-utils";
import { allPhotosFrom, dedupePhotos, photosFrom, type Photo } from "./photos";

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
 * Photos for the gallery: the home page's own images first (a place to feature a
 * few by hand), then every image used across the news posts — newest first,
 * deduped, each linked to its source post. Shared by the home preview and the
 * /gallery page so both draw from the same set.
 */
export function galleryPhotos(
  entries: PageEntry[],
  newsTag: string,
  toPath: (slug: string) => string,
  home?: PageEntry,
): Photo[] {
  const lead: Photo[] = home
    ? allPhotosFrom(home.data.blocks).map((p) => ({ ...p, alt: p.alt || home.data.title }))
    : [];

  const dateOf = (e: PageEntry) => e.data.publishedAt ?? e.data.modifiedAt ?? "";
  const fromPosts: Photo[] = entries
    .filter((e) => hasTag(e.data.tags, newsTag))
    .sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
    .flatMap((e) =>
      photosFrom(e.data.blocks).map((p) => ({
        ...p,
        alt: p.alt || e.data.title,
        href: p.href ?? toPath(e.data.slug),
      })),
    );

  return dedupePhotos([...lead, ...fromPosts]);
}
