/**
 * Animated favicon — two-phase gravity collapse
 *
 * Each arm of ">" falls in two phases:
 *   Phase 1: left end pivots around right end (23,16), swings DOWN
 *   Phase 2: right end pivots around landed left end, falls DOWN
 *
 * Upper arm goes first, lower arm follows with a slight delay.
 *
 * Timeline (7s loop):
 *   0.00–0.15  hold at rest
 *   0.15–0.38  upper phase 1 fall  (easeInCubic)
 *   0.38–0.43  upper phase 1 bounce
 *   0.43–0.52  upper phase 2 fall  (easeInCubic)
 *   0.52–0.56  upper phase 2 bounce
 *   0.56–0.62  lower phase 1 fall  (easeInCubic)  [delayed]
 *   0.62–0.65  lower phase 1 bounce
 *   0.65–0.74  lower phase 2 fall  (easeInCubic)
 *   0.74–0.77  lower phase 2 bounce
 *   0.77–0.88  rest on ground
 *   0.88–1.00  snap back (easeOutCubic)
 */
(function () {
  const SIZE     = 32;
  const DURATION = 7000;
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

  // Rotation angles (radians)
  const U_P1 = -Math.PI * 80 / 180;  // upper left  swings CCW (down)
  const U_P2 =  Math.PI * 60 / 180;  // upper right swings CW  (down)
  const L_P1 = -Math.PI * 55 / 180;  // lower left  swings CCW (down)
  const L_P2 = -Math.PI * 80 / 180;  // lower right swings CCW (down)

  function rotScreen(px, py, cx, cy, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    const dx = px - cx, dy = py - cy;
    return { x: cx + dx*cos - dy*sin, y: cy + dx*sin + dy*cos };
  }

  function easeInCubic(t)  { return t * t * t; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function bounce(t, amount) {
    return 1 + Math.sin(t * Math.PI) * amount;
  }

  function getState(t) {
    let ua1 = 0, ua2 = 0, la1 = 0, la2 = 0, opacity = 1;

    if (t < 0.15) {
      // rest

    } else if (t < 0.38) {
      const p = easeInCubic((t - 0.15) / 0.23);
      ua1 = U_P1 * p;

    } else if (t < 0.43) {
      const p = (t - 0.38) / 0.05;
      ua1 = U_P1 * bounce(p, 0.07);

    } else if (t < 0.52) {
      ua1 = U_P1;
      const p = easeInCubic((t - 0.43) / 0.09);
      ua2 = U_P2 * p;

    } else if (t < 0.56) {
      ua1 = U_P1;
      const p = (t - 0.52) / 0.04;
      ua2 = U_P2 * bounce(p, 0.06);

    } else if (t < 0.65) {
      ua1 = U_P1; ua2 = U_P2;
      const p = easeInCubic((t - 0.56) / 0.09);
      la1 = L_P1 * p;

    } else if (t < 0.68) {
      ua1 = U_P1; ua2 = U_P2;
      const p = (t - 0.65) / 0.03;
      la1 = L_P1 * bounce(p, 0.07);

    } else if (t < 0.77) {
      ua1 = U_P1; ua2 = U_P2; la1 = L_P1;
      const p = easeInCubic((t - 0.68) / 0.09);
      la2 = L_P2 * p;

    } else if (t < 0.80) {
      ua1 = U_P1; ua2 = U_P2; la1 = L_P1;
      const p = (t - 0.77) / 0.03;
      la2 = L_P2 * bounce(p, 0.06);

    } else if (t < 0.88) {
      ua1 = U_P1; ua2 = U_P2; la1 = L_P1; la2 = L_P2;
      opacity = 0.38;

    } else {
      const p = easeOutCubic((t - 0.88) / 0.12);
      ua1 = U_P1 * (1 - p); ua2 = U_P2 * (1 - p);
      la1 = L_P1 * (1 - p); la2 = L_P2 * (1 - p);
      opacity = 0.38 + 0.62 * p;
    }

    return { ua1, ua2, la1, la2, opacity };
  }

  function computeArm(origLeft, pivot, a1, a2) {
    const left  = rotScreen(origLeft.x, origLeft.y, pivot.x, pivot.y, a1);
    const right = rotScreen(pivot.x, pivot.y, left.x, left.y, a2);
    return { left, right };
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

    const { ua1, ua2, la1, la2, opacity } = getState(t);
    const u = computeArm(UA_L, UA_R, ua1, ua2);
    const l = computeArm(LA_L, LA_R, la1, la2);

    ctx.strokeStyle = COLOR;
    ctx.lineWidth   = 3.5;
    ctx.lineCap     = 'round';

    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.moveTo(u.left.x, u.left.y);
    ctx.lineTo(u.right.x, u.right.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(l.left.x, l.left.y);
    ctx.lineTo(l.right.x, l.right.y);
    ctx.stroke();

    ctx.globalAlpha = 1;
  }

  // Favicon update — remove+reinsert forces Chrome to repaint tab
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
