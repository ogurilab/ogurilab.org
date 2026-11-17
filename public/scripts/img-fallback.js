// Loaded from theme/components/Layout.astro as an external classic script so the CSP's
// script-src 'self' (written to dist/_headers by @cosense-site-kit/astro) lets it run.
// Broken images → the lab's logo mark. Registered in <head> (capture
// phase, since image errors don't bubble) so it catches every failure,
// even ones that happen before the page finishes parsing. The failed
// <img> is swapped for a placeholder that keeps its classes (so sized
// slots — avatars, thumbnails, gallery tiles — keep their shape) and
// shows the mark from <template id="img-fallback-tpl"> at the end of
// <body>. Skipped: the header logo (own fallback), inline icons, and
// /gallery photos (that page drops a broken photo and recounts).
(function () {
  var SKIP = ".site-logo, .icon, .inline-image, .pin__cell img";
  function swap(img) {
    if (!img.isConnected || img.dataset.fallback) return;
    img.dataset.fallback = "1";
    var tpl = document.getElementById("img-fallback-tpl");
    if (!tpl) return; // not parsed yet: picked up at DOMContentLoaded
    var ph = document.createElement("span");
    ph.className = (img.className ? img.className + " " : "") + "img-fallback";
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", img.alt || "");
    var w = img.getAttribute("width"), h = img.getAttribute("height");
    if (w && h) ph.style.aspectRatio = w + " / " + h;
    ph.appendChild(tpl.content.cloneNode(true));
    img.replaceWith(ph);
  }
  function check(img) {
    if (img.matches(SKIP)) return;
    if (!img.getAttribute("src") && !img.getAttribute("srcset")) return;
    swap(img);
  }
  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG") {
        t.removeAttribute("data-fallback");
        check(t);
      }
    },
    true,
  );
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(function (img) {
      if (img.dataset.fallback === "1" && img.isConnected) {
        img.removeAttribute("data-fallback");
        check(img);
      } else if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
        check(img);
      }
    });
  });
})();
