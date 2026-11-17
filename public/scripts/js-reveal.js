// Loaded from theme/templates/home.astro and gallery.astro as an external classic script so the CSP's
// script-src 'self' (written to dist/_headers by @cosense-site-kit/astro) lets it run.
// Gates the scroll-reveal start state; without JS everything stays visible.
document.documentElement.classList.add("js-reveal");
