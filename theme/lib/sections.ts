import type { CosenseBlock, InlineNode } from "@cosense-site-kit/core";
import { inlineText } from "./content";

/**
 * Section splitting for the `sections` template.
 *
 * A page written for this template is plain Cosense: headings, paragraphs,
 * lists and images. No YAML, no code blocks. Each top-level heading opens a
 * section, and what the section *contains* decides how it is laid out:
 *
 *   - images, no list                → hero    (figure beside the text)
 *   - list of `[Page]` links         → cards   (thumbnail + summary pulled
 *                                               from the linked page)
 *   - list items that carry a description → numbered (01, 02, …)
 *   - one comma-separated line       → chips
 *   - anything else                  → prose   (rendered as ordinary content)
 *
 * Detection only fires on signals that mean one thing: a link is a card, a
 * description is a numbered entry, a comma-separated line is a set of terms.
 * A plain list of short bullets is left as prose — guessing "chips" from
 * length alone turns ordinary sentences into tag pills. An author who wants a
 * different shape drops a bare tag line under the heading (`#cards`,
 * `#numbered`, `#chips`, `#hero`, `#plain`), which wins outright.
 */

export type SectionLayout = "hero" | "cards" | "numbered" | "chips" | "prose";

/** Tag names an author can use to force a layout. Singular forms allowed. */
const LAYOUT_TAGS: Record<string, SectionLayout> = {
  hero: "hero",
  card: "cards",
  cards: "cards",
  number: "numbered",
  numbered: "numbered",
  chip: "chips",
  chips: "chips",
  plain: "prose",
  prose: "prose",
};

/** Layouts that draw `items` themselves, rather than leaving them as prose. */
const DRAWS_ITEMS = new Set<SectionLayout>(["cards", "numbered", "chips"]);

export interface SectionItem {
  title: string;
  body?: string;
  /** Set when the item leads with a `[Cosense page]` link. */
  page?: string;
  /** Set when the item leads with an external link. */
  href?: string;
}

export interface SectionImage {
  url: string;
  alt?: string;
  href?: string;
}

export interface Section {
  /** Heading text. Empty for the lead-in before the first heading. */
  title: string;
  /** One-line introduction shown under the heading. */
  lead?: string;
  layout: SectionLayout;
  items: SectionItem[];
  images: SectionImage[];
  /** Blocks the layout didn't consume; rendered as ordinary page content. */
  blocks: CosenseBlock[];
}

type ListBlock = Extract<CosenseBlock, { type: "list" }>;

/** Split a page body into sections. */
export function splitSections(blocks: CosenseBlock[]): Section[] {
  const boundary = sectionDepth(blocks);
  const raw: { title: string; blocks: CosenseBlock[] }[] = [];
  let current: { title: string; blocks: CosenseBlock[] } = { title: "", blocks: [] };

  for (const block of blocks) {
    const title = boundaryTitle(block, boundary);
    if (title !== null) {
      if (current.title || current.blocks.length > 0) raw.push(current);
      current = { title, blocks: [] };
      continue;
    }
    current.blocks.push(block);
  }
  if (current.title || current.blocks.length > 0) raw.push(current);

  return raw.map(buildSection).filter((s) => !isEmpty(s));
}

/**
 * The shallowest heading level the page uses is its section boundary. Authors
 * reach for different decoration levels (`[**** x]` vs `[** x]`) and both read
 * as "top level" within their own page, so anchoring on the actual minimum
 * beats hard-coding one depth. `null` when the page has no headings at all.
 */
function sectionDepth(blocks: CosenseBlock[]): number | null {
  let min = Number.POSITIVE_INFINITY;
  for (const b of blocks) if (b.type === "heading") min = Math.min(min, b.depth);
  return Number.isFinite(min) ? min : null;
}

/**
 * The heading text a block opens a section with, or `null` if it doesn't.
 *
 * Cosense only promotes `[** x]` and deeper to real headings — a `[* x]` line
 * is bold text. Plenty of existing pages (Members, for one) use that single
 * asterisk as their section marker, so on a page with no headings at all a
 * standalone bold line stands in. Once the page has real headings, only those
 * count, and bold lines stay bold.
 */
function boundaryTitle(block: CosenseBlock, boundary: number | null): string | null {
  if (boundary !== null) {
    if (block.type === "heading" && block.depth === boundary) {
      return inlineText(block.children).trim();
    }
    return null;
  }
  if (block.type !== "paragraph") return null;
  const meaningful = block.children.filter(
    (n) => n.type !== "text" || n.value.trim().length > 0,
  );
  if (meaningful.length !== 1 || meaningful[0].type !== "strong") return null;
  return inlineText(meaningful[0].children).trim();
}

function buildSection(raw: { title: string; blocks: CosenseBlock[] }): Section {
  const rest: CosenseBlock[] = [];
  const images: SectionImage[] = [];
  const lists: ListBlock[] = [];
  let forced: SectionLayout | undefined;

  for (const block of raw.blocks) {
    if (block.type === "image") {
      images.push({ url: block.url, alt: block.alt, href: block.href });
      continue;
    }
    if (block.type === "paragraph") {
      const layout = layoutTagOf(block.children);
      if (layout) {
        forced = layout;
        continue;
      }
    }
    if (block.type === "list") lists.push(block);
    rest.push(block);
  }

  const { items, fromCommaLine } = splitCommaList(buildItems(lists));
  const layout = forced ?? detectLayout(items, images, fromCommaLine);

  // Only a layout that draws the items may swallow the list blocks. `prose`
  // keeps them because it has nowhere else to show them, and so does `hero` —
  // otherwise forcing `#hero` on a section that happens to hold a list would
  // silently delete it.
  const blocks = DRAWS_ITEMS.has(layout) ? rest.filter((b) => b.type !== "list") : rest;

  return { title: raw.title, lead: takeLead(blocks, items), layout, items, images, blocks };
}

/**
 * The paragraph under the heading becomes the section's lead — but only when
 * the section has items for it to introduce. A section that is nothing but
 * prose keeps every paragraph as prose. Mutates `blocks` to remove the one it
 * lifts out.
 */
function takeLead(blocks: CosenseBlock[], items: SectionItem[]): string | undefined {
  if (items.length === 0) return undefined;
  const first = blocks[0];
  if (first?.type !== "paragraph") return undefined;
  // keepTags: a tag-only line was already consumed as the layout override, so
  // anything left here is a `#tag` written mid-sentence — dropping it would
  // leave a hole in the lead.
  const text = inlineText(first.children, { keepTags: true }).trim();
  if (!text) return undefined;
  blocks.shift();
  return text;
}

/**
 * A line holding nothing but tags, one of which names a layout. `#publish
 * #no-date` has no layout name, so it falls through and renders as usual.
 */
function layoutTagOf(nodes: InlineNode[]): SectionLayout | undefined {
  let found: SectionLayout | undefined;
  for (const node of nodes) {
    if (node.type === "text") {
      // Any real text means this is a sentence, not a bare tag line.
      if (node.value.trim()) return undefined;
      continue;
    }
    if (node.type !== "tag") return undefined;
    const layout = LAYOUT_TAGS[node.name.toLowerCase()];
    if (layout) found = layout;
  }
  return found;
}

function buildItems(lists: ListBlock[]): SectionItem[] {
  const items: SectionItem[] = [];
  let baseDepth: number | undefined;

  for (const block of lists) {
    if (baseDepth === undefined) baseDepth = block.depth;
    const item = parseItem(block.children);
    // An indented line continues the item above it — the natural Cosense way
    // to write "title on one line, description on the next".
    if (block.depth > baseDepth && items.length > 0) {
      const previous = items[items.length - 1];
      const extra = [item.title, item.body].filter(Boolean).join(" ");
      if (extra) previous.body = previous.body ? `${previous.body} ${extra}` : extra;
      continue;
    }
    if (item.title || item.body) items.push(item);
  }
  return items;
}

/** Read one list line as `<head> <description>`, keyed on what the head is. */
function parseItem(children: InlineNode[]): SectionItem {
  const nodes = children.slice();
  while (nodes.length > 0 && nodes[0].type === "text" && !nodes[0].value.trim()) nodes.shift();

  const head = nodes[0];
  const description = () => {
    const text = inlineText(nodes.slice(1), { keepTags: true })
      .trim()
      .replace(/^[-–—:：]\s*/, "");
    return text || undefined;
  };

  if (head?.type === "strong") {
    return { title: inlineText(head.children).trim(), body: description() };
  }
  if (head?.type === "pageLink") {
    return { title: head.title, page: head.title, body: description() };
  }
  if (head?.type === "link") {
    const label = inlineText(head.children).trim();
    return { title: label || head.href, href: head.href, body: description() };
  }
  return { title: inlineText(nodes, { keepTags: true }).trim() };
}

/**
 * One comma-separated line is a set of terms, not a single long item — the
 * shortest way to write "3Dプリンタ, レーザーカッター, VRデバイス". Unlike a
 * plain bullet list, the commas say so unambiguously, so this is the one shape
 * that turns into chips without an explicit tag.
 */
function splitCommaList(items: SectionItem[]): {
  items: SectionItem[];
  fromCommaLine: boolean;
} {
  if (items.length !== 1) return { items, fromCommaLine: false };
  const only = items[0];
  if (only.body || only.page || only.href) return { items, fromCommaLine: false };
  const parts = only.title
    .split(/\s*[,、]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return { items, fromCommaLine: false };
  return { items: parts.map((title) => ({ title })), fromCommaLine: true };
}

function detectLayout(
  items: SectionItem[],
  images: SectionImage[],
  fromCommaLine: boolean,
): SectionLayout {
  if (items.length === 0) return images.length > 0 ? "hero" : "prose";
  if (fromCommaLine) return "chips";
  if (items.some((i) => i.page || i.href)) return "cards";
  if (items.some((i) => i.body)) return "numbered";
  return "prose";
}

function isEmpty(section: Section): boolean {
  return (
    !section.title &&
    !section.lead &&
    section.items.length === 0 &&
    section.images.length === 0 &&
    section.blocks.length === 0
  );
}

/** Two-digit ordinal for the numbered layout (01, 02, … 10). */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
