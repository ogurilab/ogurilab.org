// Build-time image dimensions for Gyazo images, via Gyazo's public oEmbed
// endpoint (no auth). Knowing each image's aspect ratio lets the gallery reserve
// the right height per tile up front, so a masonry layout stays stable and
// native lazy-loading only fetches images as they scroll into view.

const GYAZO_RE = /gyazo\.com\/([0-9a-f]{32})/i;

export function gyazoId(url: string): string | null {
  return GYAZO_RE.exec(url)?.[1] ?? null;
}

// Persist across requests in the dev server process (and within a build) so the
// same id is fetched at most once — and on disk (node_modules/.cache), so a
// restarted dev server or a fresh build doesn't ask Gyazo for every image
// again (an image's size never changes).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const CACHE = new Map<string, number | null>();
const CACHE_FILE = join(process.cwd(), "node_modules", ".cache", "gyazo-ratios.json");
let diskLoaded: Promise<void> | null = null;
const loadDisk = () =>
  (diskLoaded ??= readFile(CACHE_FILE, "utf8")
    .then((txt) => {
      for (const [id, r] of Object.entries(JSON.parse(txt) as Record<string, number>)) CACHE.set(id, r);
    })
    .catch(() => {}));
const saveDisk = async () => {
  const known: Record<string, number> = {};
  for (const [id, r] of CACHE) if (typeof r === "number") known[id] = r;
  try {
    await mkdir(dirname(CACHE_FILE), { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(known));
  } catch {
    /* read-only checkout: the in-memory cache still works */
  }
};

async function fetchRatio(id: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.gyazo.com/api/oembed?url=https://gyazo.com/${id}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { width?: number; height?: number };
    if (data.width && data.height) return data.width / data.height;
  } catch {
    // Network hiccup / blocked — caller falls back to a default ratio.
  }
  return null;
}

/**
 * Aspect ratios (width / height) for a list of image URLs, in the same order.
 * Non-Gyazo URLs and failed lookups come back as null. Runs with bounded
 * concurrency to stay friendly to the oEmbed endpoint.
 */
export async function aspectRatios(
  urls: string[],
  concurrency = 16,
): Promise<(number | null)[]> {
  await loadDisk();
  const ids = urls.map(gyazoId);
  const out: (number | null)[] = new Array(urls.length).fill(null);
  let fetched = 0;
  let next = 0;
  async function worker(): Promise<void> {
    while (next < ids.length) {
      const i = next++;
      const id = ids[i];
      if (!id) continue;
      if (!CACHE.has(id)) {
        CACHE.set(id, await fetchRatio(id));
        fetched++;
      }
      out[i] = CACHE.get(id) ?? null;
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, ids.length) }, worker));
  if (fetched > 0) await saveDisk();
  return out;
}
