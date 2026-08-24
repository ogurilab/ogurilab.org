import { defineConfig } from "astro/config";
import cosense from "@cosense-site-kit/astro";
// The theme is vendored in this repo (theme/) — edit it freely. Only the
// framework (@cosense-site-kit/*) comes from npm.
import themeLab from "./theme-does-not-exist";

export default defineConfig({
  integrations: [
    cosense({ configFile: "./cosense.config.ts" }),
    // Dark skin available: `import themeLab, { presetDark } from "./theme"`
    // then `themeLab({ preset: presetDark })`. Or switch at runtime from
    // Cosense via the `.site` code:site.yaml `theme: { skin: dark }`.
    //
    // Header logo: place the image in `public/` and point `logo` at its
    // site-root path. Until the file exists the header falls back to the site
    // title text. For a PNG, change this to "/logo.png" (or `{ src, height }`).
    themeLab({ logo: { src: "/logo.svg", height: 56 }, favicon: "/favicon.png" }),
  ],
});
