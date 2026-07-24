import { defineCosenseSite } from "@cosense-site-kit/core";

export default defineCosenseSite({
  site: {
    title: "デジタルカルチャー研究室",
    description: "Digital Culture Lab. Aichi Institute of Technology. Oguri Lab.",
    // Served at the root of the custom domain (Cloudflare Pages).
    baseUrl: "https://ogurilab.org",
    base: "/",
    lang: "ja",
  },

  source: {
    type: "cosense",
    // TODO: set this to the public Cosense project that backs ogurilab.org
    // (the `xxxx` in scrapbox.io/xxxx). Placeholder until confirmed.
    project: "dclab",
  },

  publish: {
    default: "none",
    includeTags: ["publish"],
    excludeTags: ["draft", "private", "internal"],
  },

  routing: {
    slug: "metadata-or-encoded-title",
  },

  // NOTE: deployment is Cloudflare Pages (existing project `ogurilab-org` +
  // custom domain), handled by the hand-written .github/workflows/deploy.yml.
  // The framework's `deploy init` only generates Cloudflare *Workers* or
  // GitHub Pages workflows, so we don't use a `deploy` block here. The build
  // schedule lives in that workflow's `on.schedule` cron.
});
