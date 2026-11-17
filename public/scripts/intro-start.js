// Loaded from theme/components/Intro.astro as an external classic script so the CSP's
// script-src 'self' (written to dist/_headers by @cosense-site-kit/astro) lets it run.
(function () {
  try {
    if (sessionStorage.getItem("dclab-intro")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("dclab-intro", "1");
  } catch (e) {
    return;
  }
  document.documentElement.classList.add("is-intro");
})();
