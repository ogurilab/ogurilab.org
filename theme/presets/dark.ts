import type { ThemeLabPreset } from "../index";

// Dark skin for theme-lab. Pure token overrides — no extra .astro — keeping the
// logo-derived charcoal + cyan character on a dark canvas. The light skin's
// deep cyan is too dark to read here, so it shifts to a brighter cyan. Keeps the
// system font stack (no fontHref). Usage:
//
//   import themeLab, { presetDark } from "./theme";
//   themeLab({ preset: presetDark })
//
// Every key here overrides a token declared in styles/global.css `:root`.
export const presetDark: ThemeLabPreset = {
  name: "dark",
  colorScheme: "dark",
  tokens: {
    "--color-bg": "#14181f",
    "--color-bg-soft": "#1b212b",
    "--color-bg-hover": "#232b37",
    "--color-text": "#e5e7eb",
    "--color-text-soft": "#b6bcc6",
    "--color-text-muted": "#8b93a1",
    "--color-text-faint": "#565e6b",
    "--color-border": "#2c3442",
    "--color-border-soft": "#222934",
    "--color-divider": "rgb(255 255 255 / 0.08)",
    "--color-accent": "#22d3ee",
    "--color-accent-hover": "#67e8f9",
    "--color-accent-soft": "rgb(34 211 238 / 0.16)",
    "--color-accent-bright": "#22d3ee",
    "--color-code-bg": "rgb(255 255 255 / 0.08)",
    "--color-code-text": "#67e8f9",
    "--color-callout-bg": "#1b212b",
    "--color-callout-border": "#2c3442",
    "--color-tag-bg": "rgb(255 255 255 / 0.08)",
    "--color-tag-text": "#b6bcc6",
    "--color-header-bg": "rgb(20 24 31 / 0.8)",
    "--color-ground": "#0e1116",
    "--color-ground-dot": "rgb(255 255 255 / 0.07)",
  },
};
