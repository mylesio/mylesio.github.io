/**
 * Animated favicon — gravity rotation
 *
 * Each arm of ">" pivots from its left endpoint and falls like a rod
 * released from rest. Physics: angle accelerates (ease-in), hits ground,
 * tiny bounce, rests, snaps back.
 *
 * Upper arm pivot: (9, 8)  — falls clockwise   (max ~70°)
 * Lower arm pivot: (9, 24) — falls counter-clockwise (max ~-65°)
 *
 * Timeline (6s loop):
 *   0.00–0.20  hold at rest
 *   0.20–0.52  fall (ease-in²  — gravity acceleration)
 *   0.52–0.58  bounce (overshoot + rebound)
 *   0.58–0.75  rest on ground
 *   0.75–0.90  snap back (ease-out)
 *   0.90–1.00  hold at rest
 */
(function () {
  const SIZE     = 32;
  const DURATION = 6000;
  const BG       = '#0f0f11';
  const COLOR    = '#7dd3fc';
  const CORNER   = 6;
  const FPS      = 16;
  const INTERVAL = 1000 / FPS;

  // Arm definitions: pivot + far endpoint (original positions)
  // upper: pivot=(9,8),  tip=(23,16)
  // lower: pivot=(9,24), tip=(23,16)
  const UPPER_PIVOT = { x: 9, y: 8  };
  const LOWER_PIVOT = { x: 9, y: 24 };
  const UPPER_TIP   = { x: 23, y: 16 };
  const LOWER_TIP   = { x: 23, y: 16 };

  // Max rotation angles (radians) — upper falls CW, lower falls CCW
  const UPPER_MAX_ANGLE =  1.22; //  ~70° clockwise
  const LOWER_MAX_ANGLE = -1.15; // ~66° counter-clockwise

  // ── Easing ──────────────────────────────────────────────────────────────────
  // easeInCubic: slow start, accelerates hard (gravity feel)
  function easeInCubic(t)  { return t * t * t; }
  // easeOutCubic: fast start, decelerates (snap-back feel)
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // ── State at normalised time t ∈ [0,1] ─────────────────────────────────────
  function getAngles(t) {
    let uAngle = 0, lAngle = 0, opacity = 1;

    if (t < 0.20) {
      // at rest
      uAngle = 0; lAngle = 0; opacity = 1;

    } else if (t < 0.52) {
      // free-fall — ease-in cubic (gravity acceleration)
      const p = easeInCubic((t - 0.20) / (0.52 - 0.20));
      uAngle  = UPPER_MAX_ANGLE * p;
      lAngle  = LOWER_MAX_ANGLE * p;
      opacity = 1 - p * 0.55;

    } else if (t < 0.58) {
      // bounce: overshoot slightly then rebound
      const p = (t - 0.52) / (0.58 - 0.52); // 0→1
      const bounce = Math.sin(p * Math.PI);   // 0→1→0
      uAngle  = UPPER_MAX_ANGLE * (1 + bounce * 0.12);
      lAngle  = LOWER_MAX_ANGLE * (1 + bounce * 0.10);
      opacity = 0.45;

    } else if (t < 0.75) {
      // rest on ground
      uAngle  = UPPER_MAX_ANGLE;
      lAngle  = LOWER_MAX_ANGLE;
      opacity = 0.40;

    } else if (t < 0.90) {
      // snap back — ease-out cubic
      const p = easeOutCubic((t - 0.75) / (0.90 - 0.75));
      uAngle  = UPPER_MAX_ANGLE * (1 - p);
      lAngle  = LOWER_MAX_ANGLE * (1 - p);
      opacity = 0.40 + 0.60 * p;

    } else {
      // hold at rest
      uAngle = 0; lAngle = 0; opacity = 1;
    }

    return { uAngle, lAngle, opacity };
  }

  // ── Rotate a point around a pivot ─────────────────────────────────────────
  function rotate(px, py, pivot, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx  = px - pivot.x;
    const dy  = py - pivot.y;
    return {
      x: pivot.x + dx * cos - dy * sin,
      y: pivot.y + dx * sin + dy * cos,
    };
  }

  // ── Canvas setup ────────────────────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  // ── Draw ────────────────────────────────────────────────────────────────────
  function drawArm(pivot, tip, angle, opacity) {
    const rotatedTip = rotate(tip.x, tip.y, pivot, angle);
    ctx.save();
    ctx.globalAlpha  = opacity;
    ctx.strokeStyle  = COLOR;
    ctx.lineWidth    = 3.5;
    ctx.lineCap      = 'round';
    ctx.beginPath();
    ctx.moveTo(pivot.x, pivot.y);
    ctx.lineTo(rotatedTip.x, rotatedTip.y);
    ctx.stroke();
    ctx.restore();
  }

  function drawFrame(t) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    // background
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.roundRect(0, 0, SIZE, SIZE, CORNER);
    ctx.fill();

    const { uAngle, lAngle, opacity } = getAngles(t);
    drawArm(UPPER_PIVOT, UPPER_TIP, uAngle, opacity);
    drawArm(LOWER_PIVOT, LOWER_TIP, lAngle, opacity);
  }

  // ── Favicon update (remove+reinsert forces Chrome to repaint tab) ───────────
  function setFavicon(dataUrl) {
    document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = dataUrl;
    document.head.appendChild(link);
  }

  // Remove static SVG favicon upfront
  document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());

  // ── RAF loop ────────────────────────────────────────────────────────────────
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
