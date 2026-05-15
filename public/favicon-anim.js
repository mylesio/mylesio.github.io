/**
 * Animated favicon — gravity collapse of ">"
 *
 * Upper arm (9,8)→(23,16):
 *   Phase 1: left end pivots CCW -90° around right end (23,16) → (15,30)
 *   Phase 2: right end pivots CW ~60° around (15,30) → (31,30)  [horizontal]
 *
 * Lower arm (9,24)→(23,16):
 *   Single phase: right end pivots CW ~52° around left end (9,24) → (24,30) [y-aligned]
 *   (lower arm delayed ~0.3s after upper starts)
 *
 * Both arms land at y≈30, creating two near-horizontal lines at the bottom.
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

  // Rotation angles (radians) — computed to land both arms at y≈30
  const U_P1 = -Math.PI / 2;          // upper left  swings CCW -90° → (15,30)
  const U_P2 =  1.05165;              // upper right swings CW  ~60° → (31,30) [horizontal]
  const L_P1 =  0.90059;              // lower right swings CW  ~52° → (24,30)

  // Timeline fractions (total loop = 14 000 ms)
  // 0.00–0.10  hold at rest
  // 0.10–0.28  upper P1 fall
  // 0.28–0.32  upper P1 bounce
  // 0.32–0.46  upper P2 fall        (lower starts here simultaneously, delayed 0.05)
  // 0.46–0.49  upper P2 bounce
  // 0.37–0.50  lower P1 fall
  // 0.50–0.53  lower P1 bounce
  // 0.53–0.82  REST ON GROUND (~4s of 14s total)
  // 0.82–1.00  snap back

  const DURATION = 14000;

  function rotScreen(px, py, cx, cy, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    const dx = px - cx, dy = py - cy;
    return { x: cx + dx*cos - dy*sin, y: cy + dx*sin + dy*cos };
  }

  function easeIn(t)  { return t * t * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function getState(t) {
    let ua1 = 0, ua2 = 0, la1 = 0, opacity = 1;

    if (t < 0.10) {
      // hold

    } else if (t < 0.28) {
      ua1 = U_P1 * easeIn((t - 0.10) / 0.18);

    } else if (t < 0.32) {
      // upper P1 bounce
      const p = (t - 0.28) / 0.04;
      ua1 = U_P1 * (1 + Math.sin(p * Math.PI) * 0.07);

    } else if (t < 0.46) {
      ua1 = U_P1;
      ua2 = U_P2 * easeIn((t - 0.32) / 0.14);
      // lower starts 0.05 after upper P2 begins
      if (t > 0.37) {
        la1 = L_P1 * easeIn((t - 0.37) / 0.13);
      }

    } else if (t < 0.50) {
      ua1 = U_P1;
      // upper P2 bounce
      const p = (t - 0.46) / 0.04;
      ua2 = U_P2 * (1 + Math.sin(p * Math.PI) * 0.06);
      la1 = L_P1 * easeIn(Math.min((t - 0.37) / 0.13, 1));

    } else if (t < 0.53) {
      ua1 = U_P1; ua2 = U_P2;
      const p = (t - 0.50) / 0.03;
      la1 = L_P1 * (1 + Math.sin(p * Math.PI) * 0.07);

    } else if (t < 0.82) {
      // REST ~4s
      ua1 = U_P1; ua2 = U_P2; la1 = L_P1;
      opacity = 0.35;

    } else {
      // snap back
      const p = easeOut((t - 0.82) / 0.18);
      ua1 = U_P1 * (1 - p);
      ua2 = U_P2 * (1 - p);
      la1 = L_P1 * (1 - p);
      opacity = 0.35 + 0.65 * p;
    }

    return { ua1, ua2, la1, opacity };
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
    ctx.globalAlpha = state.opacity;

    ctx.beginPath();
    ctx.moveTo(uLeft.x,  uLeft.y);
    ctx.lineTo(uRight.x, uRight.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lLeft.x,  lLeft.y);
    ctx.lineTo(lRight.x, lRight.y);
    ctx.stroke();

    ctx.globalAlpha = 1;
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

  function loop(ts) {
    if (!startTime) startTime = ts;
    if (!lastTick)  lastTick  = ts - INTERVAL;
    if (ts - lastTick >= INTERVAL) {
      lastTick = ts;
      const t = ((ts - startTime) % DURATION) / DURATION;
      drawFrame(t);
      setFavicon(canvas.toDataURL('image/png'));
    }
    requestAnimationFrame(loop);
  }

  setTimeout(() => requestAnimationFrame(loop), 600);
})();
