import type { CosenseBlock } from "@cosense-site-kit/core";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// ---- Schema ----

const memberLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().optional(),
  links: z.array(memberLinkSchema).optional(),
});

const memberGroupSchema = z.object({
  name: z.string().min(1),
  members: z.array(memberSchema),
});

export const membersSchema = z
  .object({
    // Optional display title. Lets the page show a different heading than the
    // Cosense page title (e.g. page named "Members Data", shown as "Members").
    title: z.string().optional(),
    // Either a flat list (when groups aren't needed) or grouped.
    members: z.array(memberSchema).optional(),
    groups: z.array(memberGroupSchema).optional(),
  })
  .refine(
    (d) => Boolean(d.members?.length || d.groups?.length),
    "members.yaml must define at least one of `members` or `groups`",
  );

export type Member = z.infer<typeof memberSchema>;
export type MemberGroup = z.infer<typeof memberGroupSchema>;
export type MembersData = z.infer<typeof membersSchema>;

// ---- Extraction ----

// Pulls a `code:members.yaml` block out of the page body and parses it.
// Structured data lives in a named code block on the page itself.
export function extractMembers(blocks: CosenseBlock[]): MembersData | null {
  const block = blocks.find(
    (b): b is Extract<CosenseBlock, { type: "code" }> =>
      b.type === "code" && b.filename === "members.yaml",
  );
  if (!block) return null;
  try {
    const raw = parseYaml(block.value);
    // An empty YAML value parses to null (`bio:` with nothing after it →
    // `bio: null`). Zod's `.optional()` only tolerates `undefined`, so a single
    // blank optional field (e.g. an empty `bio:`) would fail validation and —
    // because the whole block is parsed at once — discard every member. Strip
    // empties first so blank fields fall back to "absent". Mirrors the
    // framework's own `dropEmptyValues` handling for .site site.yaml.
    return membersSchema.parse(dropEmptyValues(raw));
  } catch (err) {
    console.warn(
      `[theme-lab] failed to parse code:members.yaml — ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
}

// Recursively strip "empty" values (null/undefined) an author leaves in YAML
// so optional fields fall back to absent instead of failing validation:
//   - object keys whose value is null/undefined are dropped (`bio:` → absent);
//   - null/undefined entries inside arrays are removed.
// Empty strings and empty arrays are left intact — they're real values the
// schema can accept (or reject) on their own merits.
function dropEmptyValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.filter((v) => v !== null && v !== undefined).map(dropEmptyValues);
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null || v === undefined) continue;
      out[key] = dropEmptyValues(v);
    }
    return out;
  }
  return value;
}

// Returns groups as-is, or wraps a flat `members:` list in a single
// untitled group so the renderer has a single iteration shape.
export function asGroups(data: MembersData): MemberGroup[] {
  if (data.groups && data.groups.length > 0) return data.groups;
  if (data.members && data.members.length > 0) {
    return [{ name: "", members: data.members }];
  }
  return [];
}

// Build a two-letter initial for the photo placeholder (no photo case).
// Strips ASCII spaces; takes the first two visible chars.
export function initialsOf(name: string): string {
  const clean = name.replace(/\s+/g, "");
  return clean.slice(0, 2);
}
