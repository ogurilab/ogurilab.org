import type { CosenseBlock, InlineNode } from "@cosense-site-kit/core";

export interface InlineTextOptions {
  /**
   * Keep `#tag` nodes as `#name` instead of dropping them. Off by default so
   * the home page's mission line doesn't pick up a page's trailing `#publish`
   * line. Turn it on where a tag sits mid-sentence and dropping it would leave
   * a hole in the text (section leads, list items).
   */
  keepTags?: boolean;
}

/** Flatten an inline node tree to plain text. */
export function inlineText(nodes: InlineNode[], opts: InlineTextOptions = {}): string {
  let out = "";
  for (const n of nodes) {
    switch (n.type) {
      case "text":
        out += n.value;
        break;
      case "strong":
      case "emphasis":
      case "strikethrough":
      case "link":
        out += inlineText(n.children, opts);
        break;
      case "code":
      case "formula":
        out += n.value;
        break;
      case "pageLink":
        out += n.title;
        break;
      case "tag":
        if (opts.keepTags) out += `#${n.name}`;
        break;
      default:
        break;
    }
  }
  return out;
}

/** First non-empty paragraph of a page body, as plain text. */
export function firstParagraph(blocks: CosenseBlock[]): string {
  for (const b of blocks) {
    if (b.type === "paragraph") {
      const t = inlineText(b.children).trim();
      if (t) return t;
    }
  }
  return "";
}

export interface Pillar {
  title: string;
  body: string;
}

/**
 * Research pillars for the home page. Cosense turns `[*** heading]` decorations
 * into heading blocks, so the "Vision" section of the About page — a run of
 * sub-headings each followed by a paragraph — already encodes the pillars. We
 * anchor on the heading whose text mentions "vision" and pair every following
 * heading with the paragraph beneath it, until a new top-level section.
 *
 * A `research:` list in the .site YAML (array of `{title, body}`) overrides this
 * entirely, for labs that would rather curate it by hand.
 */
export function researchPillars(
  aboutBlocks: CosenseBlock[] | undefined,
  override?: unknown,
): Pillar[] {
  if (Array.isArray(override)) {
    return override
      .map((r) => ({
        title: String((r as Pillar)?.title ?? "").trim(),
        body: String((r as Pillar)?.body ?? "").trim(),
      }))
      .filter((p) => p.title);
  }
  if (!aboutBlocks) return [];

  const SECTION = /vision|mission|contact|access|member/i;
  const pillars: Pillar[] = [];
  let collecting = false;
  for (let i = 0; i < aboutBlocks.length; i++) {
    const b = aboutBlocks[i];
    if (b.type !== "heading") continue;
    const text = inlineText(b.children).trim();
    if (/vision/i.test(text)) {
      collecting = true;
      continue;
    }
    if (SECTION.test(text)) {
      // A different top-level section (Mission, etc.) — stop collecting.
      collecting = false;
      continue;
    }
    if (!collecting || !text) continue;
    const next = aboutBlocks[i + 1];
    const body = next && next.type === "paragraph" ? inlineText(next.children).trim() : "";
    pillars.push({ title: text, body });
  }
  return pillars;
}

/**
 * A readable title for a work surfaced from a news page. News titles read like
 * "…にて発表しました「Real Title」（2026-05-28）"; prefer the quoted part, else
 * drop a trailing date. Curated pages keep their own title.
 */
export function cleanTitle(title: string): string {
  const quoted = title.match(/「([^」]+)」/);
  if (quoted) return quoted[1].trim();
  return title.replace(/（\d{4}-\d{2}-\d{2}）\s*$/, "").trim();
}
