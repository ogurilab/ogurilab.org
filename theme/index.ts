import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { optionsVirtualModule } from "@cosense-site-kit/theme-utils/integration";
import { pagefindIntegration } from "./integration/pagefind";

export interface ThemeLabNavItem {
  label: string;
  /** Cosense title to link to. */
  page?: string;
  /** Absolute URL or site-relative path (e.g. "/news"). */
  href?: string;
}

export interface ThemeLabLogo {
  /**
   * Site-relative path or absolute URL to the logo image. Put the file in
   * `public/` so Astro serves it at the site root — e.g. `public/logo.svg`
   * becomes `"/logo.svg"`.
   */
  src: string;
  /** Rendered height in px (width scales automatically). Default 28. */
  height?: number;
  /** Optional alternate image for the dark skin. */
  darkSrc?: string;
}

export interface ThemeLabOptions {
  /** Site title shown in the header. Falls back to cosense.config.ts site.title. */
  siteTitle?: string;
  /**
   * Logo image for the header, replacing the site-title text. A bare string is
   * shorthand for `{ src }`. The title text is used as the image's alt/label and
   * shown as a fallback if the image fails to load.
   */
  logo?: ThemeLabLogo | string;
  /**
   * Favicon: a site-relative path or URL (e.g. "/favicon.png"). Put the file in
   * `public/`. Overrides the framework's `.site` favicon resolution.
   */
  favicon?: string;
  /** Default meta description. Falls back to cosense.config.ts site.description. */
  siteDescription?: string;
  /** Header nav items. Falls back to .site `nav:` when empty. */
  nav?: ThemeLabNavItem[];
  /** Cosense title to embed at the top of the home route. */
  homePage?: string;
  /**
   * Tag that marks a Cosense page as a news / blog post. Pages with this
   * tag are listed on /news and rendered with the news-post template.
   * Default: "news".
   */
  newsTag?: string;
  /**
   * Tag that marks a Cosense page as an individual member profile, rendered
   * with the member template. Tag-driven, mirroring `newsTag`. Default: "member".
   */
  memberTag?: string;
  /**
   * How many posts the News index shows per page before paginating
   * (/news, /news/2, …). Default: 12. The home page's "recent news" preview
   * is controlled separately by `.site` `posts.limit`.
   */
  newsPageSize?: number;
  /** Affiliation line shown in the footer / header (e.g. "Aichi Institute of Technology"). */
  affiliation?: string;
  /** Copyright owner shown in the footer. Defaults to siteTitle. */
  copyrightHolder?: string;
  /** When set, the copyright holder is rendered as a link to this URL. */
  copyrightUrl?: string;
  /**
   * Visual skin. A preset recolors the theme by overriding the `:root` CSS
   * custom properties (and optionally fonts) — no new templates. Its `options`
   * act as defaults; options passed directly here win. See `presetDark`.
   */
  preset?: ThemeLabPreset;
  /**
   * Full-text search. When true (default), the theme generates a Pagefind
   * index at build time and shows a search box in the header. Set false to
   * skip index generation and hide the box (e.g. tiny sites). The index is
   * built from the static output, so search is available after `astro build`
   * (and `astro preview`), not in `astro dev` until you've built once.
   */
  search?: boolean;
}

/**
 * A skin for theme-lab: pure data, no new .astro. Recolors the theme by
 * overriding the design tokens declared in styles/global.css `:root`.
 */
export interface ThemeLabPreset {
  /** Identifier (e.g. "dark"). Informational; surfaced to a future catalog. */
  name?: string;
  /** CSS custom property overrides, e.g. `{ "--color-bg": "#14181f" }`. */
  tokens?: Record<string, string>;
  /** Sets `<html>` color-scheme so native UI (scrollbars, form fields) matches. */
  colorScheme?: "light" | "dark";
  /** Load a web-font stylesheet. Pair with `--font-*` token overrides. */
  fontHref?: string;
  /** Default theme options the preset ships with; explicit options override. */
  options?: Omit<ThemeLabOptions, "preset">;
}

/** Shape injected into templates via virtual:cosense-theme-lab/options. */
export interface ThemeLabRuntimeOptions {
  siteTitle?: string;
  logo?: ThemeLabLogo;
  favicon?: string;
  siteDescription?: string;
  nav: ThemeLabNavItem[];
  homePage?: string;
  newsTag: string;
  memberTag: string;
  newsPageSize: number;
  affiliation?: string;
  copyrightHolder?: string;
  copyrightUrl?: string;
  tokens: Record<string, string>;
  colorScheme?: "light" | "dark";
  fontHref?: string;
  /** Whether the header search box should render (mirrors index generation). */
  search: boolean;
}

const VIRTUAL_ID = "virtual:cosense-theme-lab/options";

// Merge user options with the chosen preset. Explicit options win; the preset's
// own options fill the gaps. tokens/colorScheme/fontHref come from the preset.
// Pure and exported so it can be unit-tested without spinning up Astro.
const normalizeLogo = (logo?: ThemeLabLogo | string): ThemeLabLogo | undefined =>
  logo == null ? undefined : typeof logo === "string" ? { src: logo } : logo;

export function resolveThemeOptions(opts: ThemeLabOptions = {}): ThemeLabRuntimeOptions {
  const base = opts.preset?.options ?? {};
  return {
    siteTitle: opts.siteTitle ?? base.siteTitle,
    logo: normalizeLogo(opts.logo ?? base.logo),
    favicon: opts.favicon ?? base.favicon,
    siteDescription: opts.siteDescription ?? base.siteDescription,
    nav: opts.nav ?? base.nav ?? [],
    homePage: opts.homePage ?? base.homePage,
    newsTag: opts.newsTag ?? base.newsTag ?? "news",
    memberTag: opts.memberTag ?? base.memberTag ?? "member",
    newsPageSize: opts.newsPageSize ?? base.newsPageSize ?? 12,
    affiliation: opts.affiliation ?? base.affiliation,
    copyrightHolder: opts.copyrightHolder ?? base.copyrightHolder,
    copyrightUrl: opts.copyrightUrl ?? base.copyrightUrl,
    tokens: opts.preset?.tokens ?? {},
    colorScheme: opts.preset?.colorScheme,
    fontHref: opts.preset?.fontHref,
    search: opts.search ?? base.search ?? true,
  };
}

export default function themeLab(opts: ThemeLabOptions = {}): AstroIntegration {
  const options = resolveThemeOptions(opts);

  return {
    name: "@cosense-site-kit/theme-lab",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig, config }) => {
        updateConfig({
          vite: { plugins: [optionsVirtualModule(VIRTUAL_ID, options)] },
        });

        // Full-text search: add the Pagefind integration so it indexes the
        // static output at build:done. Guard against double-adding (e.g. the
        // theme included twice) to avoid indexing the site more than once.
        if (
          options.search &&
          !config.integrations.some((i) => i.name === "cosense-theme-lab/pagefind")
        ) {
          updateConfig({ integrations: [pagefindIntegration()] });
        }

        // Vendored theme: .astro templates sit next to this file under theme/,
        // so resolve route entrypoints relative to this source file.
        const here = (p: string) => fileURLToPath(new URL(`./${p}`, import.meta.url));

        // Fixed-route templates: each owns a known URL.
        injectRoute({ pattern: "/", entrypoint: here("templates/home.astro") });
        // Auto gallery: every image used across the site, one adaptive grid.
        injectRoute({ pattern: "/gallery", entrypoint: here("templates/gallery.astro") });
        // Paginated News index: page 1 is /news, later pages are /news/2, …
        injectRoute({
          pattern: "/news/[...page]",
          entrypoint: here("templates/news-index.astro"),
        });
        injectRoute({
          pattern: "/tags/[tag]",
          entrypoint: here("templates/tag.astro"),
        });
        // SEO / discovery endpoints (XML/text/JSON, not pages).
        injectRoute({ pattern: "/sitemap.xml", entrypoint: here("templates/sitemap.xml.ts") });
        injectRoute({ pattern: "/robots.txt", entrypoint: here("templates/robots.txt.ts") });
        injectRoute({ pattern: "/feed.xml", entrypoint: here("templates/feed.xml.ts") });
        // Data for hover/focus link-preview cards (fetched lazily by the client).
        injectRoute({
          pattern: "/link-previews.json",
          entrypoint: here("templates/link-previews.json.ts"),
        });
        // Custom 404. Astro special-cases the `/404` route and emits a
        // top-level dist/404.html (not dist/404/index.html), which Cloudflare
        // Pages/Workers Static Assets serve for unknown paths.
        injectRoute({ pattern: "/404", entrypoint: here("templates/404.astro") });
        // Dispatcher: serves /<slug> and picks the right per-page template.
        injectRoute({
          pattern: "/[...slug]",
          entrypoint: here("templates/_dispatcher.astro"),
        });
      },
    },
  };
}

export { type ActiveSkin, PRESETS, resolveActiveSkin } from "./presets";
export { presetDark } from "./presets/dark";
