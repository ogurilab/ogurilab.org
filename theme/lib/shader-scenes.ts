// Generative background scenes for the home hero (components/ShaderHero.astro).
//
// ─────────────────────────────────────────────────────────────────────────────
// Adding a scene
// ─────────────────────────────────────────────────────────────────────────────
// Append an entry to SCENES. Each scene is a GLSL snippet that defines exactly
// one function:
//
//   vec2 field(vec2 p, float t, vec2 pt)
//
//   p   position. y spans 0..1 over the hero; x is aspect-corrected (so a
//       circle stays a circle). Origin is bottom-left.
//   t   seconds since the scene started.
//   pt  smoothed pointer position in the same space as `p`.
//
//   returns .x = tone     0..1, the broad light/dark mass  → bg → accent-soft
//           .y = lineMask 0..1, crisp linework             → accent / ink
//
// The host supplies the palette, dithering, reveal and crossfade, so a scene
// only describes its geometry. Keeping tone and linework as separate channels
// is what makes the set feel like one family instead of four unrelated toys:
// every scene is drawn with the same palette ramp.
//
// Helpers available from the prelude: hash, noise, fbm, ign, rot, lineAA.
// `lineAA(d, sc)` resolution-aware line falloff: pass the distance to the line
// and the scene's own scale factor.
//
// House style: slow. These sit behind text on a first screen, so drift, don't
// animate. Keep `tone` mostly in the lower half of its range — the palette ramp
// treats high tone as ink, and a scene that pins tone high goes muddy.

export interface ShaderScene {
  /** Stable id. Used for the ?bg= override and for logging. */
  id: string;
  /** Human label — what a visitor would call it. */
  label: string;
  /** GLSL defining `vec2 field(vec2 p, float t, vec2 pt)`. */
  glsl: string;
}

// ── 墨流し ────────────────────────────────────────────────────────────────────
// Ink floated on water: two levels of domain warp, then quantised into bands so
// the flow reads as contour rather than a smooth blur. The pointer drags the
// field, which is the one place the background answers back.
const suminagashi: ShaderScene = {
  id: "suminagashi",
  label: "墨流し",
  glsl: /* glsl */ `
    vec2 field(vec2 p, float t, vec2 pt) {
      vec2 q = p * 2.6;
      float tt = t * 0.05;

      vec2 w1 = vec2(fbm(q + tt), fbm(q + vec2(5.2, 1.3) - tt));
      vec2 w2 = vec2(
        fbm(q + 2.0 * w1 + vec2(1.7, 9.2) + 0.10 * tt),
        fbm(q + 2.0 * w1 + vec2(8.3, 2.8) - 0.08 * tt)
      );
      float f = fbm(q + 2.6 * w2);

      // Pointer pulls the ink toward it.
      float pd = distance(p, pt);
      f += 0.16 * smoothstep(0.55, 0.0, pd) * sin(t * 0.6 - pd * 9.0);
      f = clamp(f * 0.5 + 0.5, 0.0, 1.0);

      // fBm clusters around its mean, which leaves the bands crowded into the
      // middle of the range and the whole scene washed out. Spread it first.
      f = clamp((f - 0.5) * 1.5 + 0.5, 0.0, 1.0);

      // Quantise, and keep the band boundaries as linework.
      float L = 7.0;
      float g = f * L;
      float edge = min(fract(g), 1.0 - fract(g));
      float line = lineAA(edge / L, 1.0) * 0.9;

      return vec2(floor(g) / L * 0.95, line);
    }
  `,
};

// ── 組子 ──────────────────────────────────────────────────────────────────────
// The triangular lattice behind kumiko joinery and the asanoha (hemp-leaf)
// pattern — three families of parallel lines at 60°, plus the half-offset
// family that closes each triangle into the leaf. Breathes very slightly so it
// is not a static texture; the lattice itself never distorts, because a
// wobbling lattice reads as broken rather than alive.
const kumiko: ShaderScene = {
  id: "kumiko",
  label: "組子",
  glsl: /* glsl */ `
    vec2 field(vec2 p, float t, vec2 pt) {
      float sc = 7.0;
      vec2 q = rot(0.06 * sin(t * 0.02)) * p * sc;

      float m = 1e9;
      for (int i = 0; i < 3; i++) {
        float a = 3.14159265 * float(i) / 3.0;
        float v = dot(q, vec2(cos(a), sin(a)));
        m = min(m, abs(fract(v) - 0.5));
      }
      float lattice = lineAA(m, sc) * 0.9;

      // Asanoha spokes: the same families, offset, at half spacing.
      float s = 1e9;
      for (int i = 0; i < 3; i++) {
        float a = 3.14159265 * (float(i) / 3.0 + 0.5);
        float v = dot(q, vec2(cos(a), sin(a))) * 2.0;
        s = min(s, abs(fract(v) - 0.5));
      }
      float spokes = lineAA(s, sc * 2.0) * 0.35;

      // Light pools where the pointer is, so the joinery catches the eye there.
      float glow = smoothstep(0.7, 0.0, distance(p, pt));
      float tone = 0.20 + 0.30 * fbm(p * 1.6 + t * 0.02) + 0.10 * glow;

      return vec2(tone, max(lattice, spokes) * (0.55 + 0.45 * glow));
    }
  `,
};

// ── 青海波 ────────────────────────────────────────────────────────────────────
// Interlocking fans of concentric arcs. Rows sit closer together than the circle
// radius, so every circle is partly covered by the row in front of it and only
// its crown survives — that occlusion is the whole pattern. Resolved per pixel
// with a painter's pass: walk candidate rows front-to-back and keep the first
// circle that contains the pixel. (A nearest-centre test instead gives Voronoi
// cells — separate discs, not scales.) Drifts like a slow swell.
const seigaiha: ShaderScene = {
  id: "seigaiha",
  label: "青海波",
  glsl: /* glsl */ `
    vec2 field(vec2 p, float t, vec2 pt) {
      float sc = 4.2;
      vec2 q = p * sc;
      q.y += t * 0.045;

      const float R = 0.66;     // radius, larger than the row pitch → overlap
      const float ROW = 0.42;   // vertical pitch between rows of scales
      float base = floor(q.y / ROW);

      // Front-most first: in this pattern the nearer row is the lower one.
      float hit = -1.0;
      for (int k = 0; k < 4; k++) {
        float rowI = base - float(k) + 1.0;
        float rowY = rowI * ROW;
        float offs = mod(rowI, 2.0) * 0.5;
        float cx = floor(q.x - offs) + offs;
        for (int m = 0; m <= 1; m++) {
          float d = distance(q, vec2(cx + float(m), rowY));
          if (hit < 0.0 && d < R) hit = d;
        }
      }
      if (hit < 0.0) hit = R;

      // Concentric arcs within the visible crown.
      float rings = 3.0;
      float u = hit / R;
      float g = u * rings;
      float edge = min(fract(g), 1.0 - fract(g));
      float line = lineAA(edge * R / rings, sc) * 0.9;
      // The scale's own rim, drawn a touch heavier than the inner arcs.
      line = max(line, lineAA(abs(u - 1.0) * R, sc) * 0.7);

      // Each scale is lighter at its crown, giving the field some volume.
      float tone = 0.14 + 0.32 * (1.0 - u);
      float glow = smoothstep(0.8, 0.0, distance(p, pt));

      return vec2(tone + 0.08 * glow, line * (0.62 + 0.38 * glow));
    }
  `,
};

// ── 等高線 ────────────────────────────────────────────────────────────────────
// Iso-lines over a slowly evolving height field — the lab's regional-data and
// GIS side. Index contours (every 5th line) are drawn heavier, the way a real
// topographic sheet is, which is what keeps it from looking like stripes.
const contour: ShaderScene = {
  id: "contour",
  label: "等高線",
  glsl: /* glsl */ `
    vec2 field(vec2 p, float t, vec2 pt) {
      vec2 q = p * 2.1;
      float h = fbm(q + vec2(0.0, t * 0.015));

      // Terrain rises toward the pointer.
      h += 0.10 * smoothstep(0.7, 0.0, distance(p, pt));

      float L = 13.0;
      float g = h * L;
      float edge = min(fract(g), 1.0 - fract(g));
      float thin = lineAA(edge / L, 2.1) * 0.6;

      // Every 5th contour is an index line: heavier, like a survey map.
      float gi = h * L / 5.0;
      float ei = min(fract(gi), 1.0 - fract(gi));
      float index = lineAA(ei / (L / 5.0), 1.2) * 0.95;

      return vec2(clamp(h, 0.0, 1.0) * 0.55, max(thin, index));
    }
  `,
};

/**
 * Registry, in no particular order — the host picks at random per visit, so
 * position here carries no meaning.
 */
export const SCENES: ShaderScene[] = [suminagashi, kumiko, seigaiha, contour];

/** How long one scene holds before crossfading to the next. */
export const SCENE_HOLD_MS = 18_000;
/** Crossfade duration between two scenes. */
export const SCENE_FADE_MS = 2_400;
