/**
 * Animated favicon — gravity scatter
 *
 * The ">" chevron splits into two arms.
 * Each arm free-falls with slight drift, bounces once, rests,
 * then snaps back and loops.
 *
 * Timeline (total: 5s)
 *   0.0 – 1.0s   hold at rest  (">")
 *   1.0 – 2.4s   free-fall     (arms drift apart)
 *   2.4 – 2.7s   bounce        (small rebound)
 *   2.7 – 3.6s   rest on ground (faded)
 *   3.6 – 4.4s   reassemble    (snap back, fade in)
 *   4.4 – 5.0s   hold at rest
 */

(function () {
  const SIZE     = 32;
  const DURATION = 5000; // ms per loop
  const BG       = '#0f0f11';
  const STROKE   = '#7dd3fc';
  const RADIUS   = 6;

  // Chevron geometry (matches SVG)
  // upper arm: (9,8)  → (23,16)
  // lower arm: (9,24) → (23,16)
  const UPPER = { x1: 9, y1: 8,  x2: 23, y2: 16 };
  const LOWER = { x1: 9, y1: 24, x2: 23, y2: 16 };

  // Canvas (off-screen, never appended to DOM)
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  // Remove any existing favicon links — we'll manage it entirely
  document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());

  // Chrome won't update the tab favicon by mutating link.href in place.
  // The only reliable way is to remove the old link and insert a fresh one
  // each frame. We keep a reference and swap it out every tick.
  function setFavicon(dataUrl) {
    const old = document.querySelector("link[rel='icon']");
    if (old) old.remove();
    const next = document.createElement('link');
    next.rel  = 'icon';
    next.type = 'image/png';
    next.href = dataUrl;
    document.head.appendChild(next);
  }

  // ── Easing helpers ──────────────────────────────────────────────────────────
  function easeInQuad(t)  { return t * t; }
  function easeOutQuad(t) { return t * (2 - t); }
  function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  // ── Animation keyframes ─────────────────────────────────────────────────────
  // Returns { upper: {dx,dy,opacity}, lower: {dx,dy,opacity} } for t in [0,1]
  function getState(t) {
    // Phase boundaries (normalised)
    const P = {
      holdStart:    0,
      fallStart:    0.20,
      landStart:    0.48,
      bounceEnd:    0.54,
      restEnd:      0.72,
      returnEnd:    0.88,
      holdEnd:      1.00,
    };

    let u = { dx: 0, dy: 0, opacity: 1 };
    let l = { dx: 0, dy: 0, opacity: 1 };

    if (t < P.fallStart) {
      // at rest — nothing to do

    } else if (t < P.landStart) {
      // free-fall: ease-in (gravity acceleration)
      const p = easeInQuad((t - P.fallStart) / (P.landStart - P.fallStart));
      u.dx = p * 3;
      u.dy = p * 14;
      u.opacity = 1 - p * 0.65;
      l.dx = -p * 2;
      l.dy = p * 5;
      l.opacity = 1 - p * 0.50;

    } else if (t < P.bounceEnd) {
      // bounce: tiny rebound upward
      const p = (t - P.landStart) / (P.bounceEnd - P.landStart);
      const bounce = Math.sin(p * Math.PI); // 0→1→0
      u.dx = 3   - bounce * 1.5;
      u.dy = 14  - bounce * 3;
      u.opacity = 0.35;
      l.dx = -2  + bounce * 1;
      l.dy = 5   - bounce * 1.5;
      l.opacity = 0.50;

    } else if (t < P.restEnd) {
      // rest on ground
      u.dx = 3;  u.dy = 14; u.opacity = 0.35;
      l.dx = -2; l.dy = 5;  l.opacity = 0.50;

    } else if (t < P.returnEnd) {
      // snap back — ease-out
      const p = easeOutQuad((t - P.restEnd) / (P.returnEnd - P.restEnd));
      u.dx = 3   * (1 - p);
      u.dy = 14  * (1 - p);
      u.opacity = 0.35 + 0.65 * p;
      l.dx = -2  * (1 - p);
      l.dy = 5   * (1 - p);
      l.opacity = 0.50 + 0.50 * p;

    }
    // holdEnd: back to rest, defaults (0,0,1) already set

    return { u, l };
  }

  // ── Draw one frame ───────────────────────────────────────────────────────────
  function drawLine(seg, dx, dy, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = STROKE;
    ctx.lineWidth   = 3.5;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(seg.x1 + dx, seg.y1 + dy);
    ctx.lineTo(seg.x2 + dx, seg.y2 + dy);
    ctx.stroke();
    ctx.restore();
  }

  function drawFrame(t) {
    // Background with rounded rect
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.roundRect(0, 0, SIZE, SIZE, RADIUS);
    ctx.fill();

    const { u, l } = getState(t);
    drawLine(UPPER, u.dx, u.dy, u.opacity);
    drawLine(LOWER, l.dx, l.dy, l.opacity);
  }

  // ── RAF loop ─────────────────────────────────────────────────────────────────
  // 12 fps is plenty for a favicon — and Chrome is more likely to honour
  // DOM updates at this rate than at full 60fps (where it batches/skips them).
  const FPS      = 12;
  const INTERVAL = 1000 / FPS;

  let startTime = null;
  let lastTick  = null;

  function loop(ts) {
    if (!startTime) startTime = ts;
    if (!lastTick)  lastTick  = ts;

    if (ts - lastTick >= INTERVAL) {
      lastTick = ts;
      const elapsed = (ts - startTime) % DURATION;
      const t = elapsed / DURATION;
      drawFrame(t);
      setFavicon(canvas.toDataURL('image/png'));
    }

    requestAnimationFrame(loop);
  }

  // Kick off after a short idle so first pageload feels calm
  setTimeout(() => requestAnimationFrame(loop), 800);
})();
