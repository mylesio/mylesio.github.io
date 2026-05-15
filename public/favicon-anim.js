/**
 * Animated favicon — gravity collapse of ">"
 *
 * Upper arm (9,8)→(23,16):
 *   Phase 1: left end pivots CCW -59.5° around right end (23,16) → (9,24)
 *   Phase 2: right end pivots CW +29.7° around (9,24) → (25,24)  [horizontal at y=24]
 *
 * Lower arm (9,24)→(23,16):
 *   Single phase: right end pivots CW +29.7° around left end (9,24) → (25,24)
 *   (lower arm delayed ~0.3s after upper starts)
 *
 * Both arms land at y=24 (= lower arm left end initial y), creating two
 * near-horizontal lines. Arms stay at full opacity, just lie flat.
 * After 10s rest, snap back to ">" with easeOutCubic.
 *
 * Total loop: ~14s
 */
(function () {
  const SIZE     = 32;
  const BG       = '#0f0f11';
  const COLOR    = '#7dd3fc';
  const CORNER   = 6;
  const FPS      = 16;
  const INTERVAL = 1000 / FPS;

  // Arm geometry
  const UA_L = { x: 9,  y: 8  };
  const UA_R = { x: 23, y: 16 };
  const LA_L = { x: 9,  y: 24 };
  const LA_R = { x: 23, y: 16 };

  // Rotation angles (radians) — both arms land at y=24 (LA_L initial y)
  const U_P1 = -1.03847;   // upper left  CCW -59.5° → (9,24)
  const U_P2 =  0.51917;   // upper right CW  +29.7° → (25,24) [horizontal]
  const L_P1 =  0.51836;   // lower right CW  +29.7° → (25,24)

  // Timeline fractions (total = 8000 ms)
  // 0.00–0.10  hold at rest
  // 0.10–0.28  upper P1 fall (upper left swings down)
  // 0.28–0.32  upper P1 settle
  // 0.32–0.53  upper P2 + lower P1 fall simultaneously (both arms lie flat together)
  // 0.53–0.57  both settle
  // 0.57–0.82  REST ON GROUND, full opacity
  // 0.82–1.00  (unused, anim stops at 0.82)

  const DURATION = 8000;

  function rotScreen(px, py, cx, cy, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    const dx = px - cx, dy = py - cy;
    return { x: cx + dx*cos - dy*sin, y: cy + dx*sin + dy*cos };
  }

  function easeIn(t)  { return t * t * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function getState(t) {
    let ua1 = 0, ua2 = 0, la1 = 0;

    if (t < 0.10) {
      // hold

    } else if (t < 0.28) {
      ua1 = U_P1 * easeIn((t - 0.10) / 0.18);

    } else if (t < 0.32) {
      // upper P1 settle (slight overshoot)
      const p = (t - 0.28) / 0.04;
      ua1 = U_P1 * (1 + Math.sin(p * Math.PI) * 0.05);

    } else if (t < 0.53) {
      // both arms fall simultaneously
      ua1 = U_P1;
      const p = easeIn((t - 0.32) / 0.21);
      ua2 = U_P2 * p;
      la1 = L_P1 * p;

    } else if (t < 0.57) {
      // both settle together
      ua1 = U_P1;
      const p = (t - 0.53) / 0.04;
      ua2 = U_P2 * (1 + Math.sin(p * Math.PI) * 0.05);
      la1 = L_P1 * (1 + Math.sin(p * Math.PI) * 0.05);

    } else if (t < 0.82) {
      // REST — full opacity, just lie flat
      ua1 = U_P1; ua2 = U_P2; la1 = L_P1;

    } else {
      // snap back
      const p = easeOut((t - 0.82) / 0.18);
      ua1 = U_P1 * (1 - p);
      ua2 = U_P2 * (1 - p);
      la1 = L_P1 * (1 - p);
    }

    return { ua1, ua2, la1 };
  }

  function computeArms({ ua1, ua2, la1 }) {
    const uLeft  = rotScreen(UA_L.x, UA_L.y, UA_R.x, UA_R.y, ua1);
    const uRight = rotScreen(UA_R.x, UA_R.y, uLeft.x, uLeft.y, ua2);
    const lRight = rotScreen(LA_R.x, LA_R.y, LA_L.x, LA_L.y, la1);
    return { uLeft, uRight, lLeft: LA_L, lRight };
  }

  // Canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  function drawFrame(t) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.roundRect(0, 0, SIZE, SIZE, CORNER);
    ctx.fill();

    const state = getState(t);
    const { uLeft, uRight, lLeft, lRight } = computeArms(state);

    ctx.strokeStyle = COLOR;
    ctx.lineWidth   = 3.5;
    ctx.lineCap     = 'round';

    ctx.beginPath();
    ctx.moveTo(uLeft.x,  uLeft.y);
    ctx.lineTo(uRight.x, uRight.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lLeft.x,  lLeft.y);
    ctx.lineTo(lRight.x, lRight.y);
    ctx.stroke();
  }

  function setFavicon(dataUrl) {
    document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = dataUrl;
    document.head.appendChild(link);
  }

  document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());

  let startTime = null;
  let lastTick  = null;
  let done      = false;

  function loop(ts) {
    if (done) return;
    if (!startTime) startTime = ts;
    if (!lastTick)  lastTick  = ts - INTERVAL;
    if (ts - lastTick >= INTERVAL) {
      lastTick = ts;
      const elapsed = ts - startTime;
      const t = Math.min(elapsed / DURATION, 0.82); // clamp at rest phase start
      drawFrame(t);
      setFavicon(canvas.toDataURL('image/png'));
      if (elapsed >= DURATION * 0.82) {
        done = true; // stop after arms are flat
        return;
      }
    }
    requestAnimationFrame(loop);
  }

  setTimeout(() => requestAnimationFrame(loop), 600);
})();
