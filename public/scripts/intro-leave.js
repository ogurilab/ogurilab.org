// Loaded from theme/components/Intro.astro as an external classic script so the CSP's
// script-src 'self' (written to dist/_headers by @cosense-site-kit/astro) lets it run.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("is-intro")) return;
  var MIN = 1500; // let the draw finish even on a fast load
  var MAX = 3200; // never hold the page longer than this
  var start = Date.now();
  var done = false;
  function leave() {
    if (done) return;
    done = true;
    root.classList.add("is-intro-out");
    setTimeout(function () {
      root.classList.remove("is-intro", "is-intro-out");
    }, 700);
  }
  function onReady() {
    setTimeout(leave, Math.max(0, MIN - (Date.now() - start)));
  }
  if (document.readyState === "complete") onReady();
  else window.addEventListener("load", onReady, { once: true });
  setTimeout(leave, MAX);
})();
