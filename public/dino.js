/**
 * Dino Runner — verified sprite coords (measured from actual pixel data)
 *
 * Sprite: offline-sprite-1x.png (1204x68, grey-on-white, dark bg after recolor)
 * Verified frames:
 *   run0: x=848 y=2 w=49 h=58  (two-leg strides, left leg back)
 *   run1: x=899 y=2 w=40 h=58  (right leg back)
 *   cloud: x=86 y=2 w=64 h=18
 *   cactS: x=228 y=2 w=17 h=35
 *   cactL: x=332 y=2 w=25 h=50
 *   ground strip: y=54
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Load & recolor sprite ────────────────────────────────────────
  // Original: white bg + grey content. Remap: white→transparent, grey→sky-blue
  const rawImg = new Image();
  rawImg.src = '/dino-sprite.png';
  let spr = null;

  rawImg.onload = () => {
    const oc = document.createElement('canvas');
    oc.width = rawImg.naturalWidth;
    oc.height = rawImg.naturalHeight;
    const oc2 = oc.getContext('2d');
    oc2.drawImage(rawImg, 0, 0);
    const id = oc2.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      if (r > 220 && g > 220 && b > 220) {
        d[i+3] = 0;               // near-white → transparent
      } else if (r < 150) {
        d[i] = 125; d[i+1] = 211; d[i+2] = 252; d[i+3] = 215; // grey → sky blue
      }
    }
    oc2.putImageData(id, 0, 0);
    spr = oc;
  };

  // ── Sprite frame rects [x, y, w, h] — verified from pixel data ──
  const F = {
    run0:  [848, 2, 49, 58],
    run1:  [899, 2, 40, 58],
    cloud: [ 86, 2, 64, 18],
    cactS: [228, 2, 17, 35],
    cactL: [332, 2, 25, 50],
  };

  // Dino display size (scale run0 to 44px tall for banner)
  const DINO_H = 44;
  const DINO_SCALE = DINO_H / F.run0[3];
  // run0 and run1 both display at same height; width scaled proportionally
  const RUN0_W = Math.round(F.run0[2] * DINO_SCALE); // ~37px
  const RUN1_W = Math.round(F.run1[2] * DINO_SCALE); // ~30px

  // ── Canvas layout ────────────────────────────────────────────────
  let W, H, GY; // canvas width, height, ground y

  function resize() {
    W = canvas.width = canvas.parentElement.clientWidth || 800;
    H = canvas.height = 100;  // tall enough for jump arc
    GY = H - 16;
    dino.y = GY - DINO_H;
  }

  // ── Game state ───────────────────────────────────────────────────
  let mode = 'auto';
  let score = 0, hiScore = 0, speed = 5, gFrame = 0;
  let dead = false, flashT = 0;
  let animF = 0, animT = 0;
  let groundOff = 0;

  const dino = { x: 60, y: 0, vy: 0, jumping: false };
  let obstacles = [];
  let nextObs = 160;
  let clouds = [{ x: 200, y: 14 }, { x: 500, y: 20 }, { x: 750, y: 10 }];

  // ── Game logic ───────────────────────────────────────────────────
  function jump() {
    if (dino.jumping || dead) return;
    dino.vy = -12;
    dino.jumping = true;
  }

  function reset() {
    score = 0; gFrame = 0; speed = 5;
    obstacles = []; nextObs = 160;
    dead = false; flashT = 0;
    dino.y = GY - DINO_H; dino.vy = 0; dino.jumping = false;
    groundOff = 0;
  }

  function toggleMode() {
    mode = mode === 'auto' ? 'play' : 'auto';
    reset();
  }

  // ── Draw sprite helper ───────────────────────────────────────────
  function drawSpr([sx, sy, sw, sh], dx, dy, dw, dh) {
    if (!spr) return;
    ctx.drawImage(spr, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  // ── AI: look-ahead jump ──────────────────────────────────────────
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const dinoRight = dino.x + RUN0_W - 6;
      const obsLeft   = o.x + 2;
      const dx = obsLeft - dinoRight;
      if (dx < 0) continue;
      if (dx < 24 + speed * 2.8) { jump(); break; }
    }
  }

  // ── Collision ────────────────────────────────────────────────────
  function checkHit() {
    const pad = 8;
    const dl = dino.x + pad, dr = dino.x + RUN0_W - pad;
    const dt = dino.y + pad, db = dino.y + DINO_H - 4;
    for (const o of obstacles) {
      const sp = o.large ? F.cactL : F.cactS;
      const scale = o.large ? 1.1 : 1.0;
      const ow = Math.round(sp[2] * scale);
      const oh = Math.round(sp[3] * scale);
      if (dl < o.x + ow - 2 && dr > o.x + 2 && dt < o.y + oh && db > o.y + 4) return true;
    }
    return false;
  }

  // ── Ground ───────────────────────────────────────────────────────
  function drawGround() {
    ctx.strokeStyle = 'rgba(125,211,252,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GY); ctx.lineTo(W, GY); ctx.stroke();
    ctx.fillStyle = 'rgba(125,211,252,0.18)';
    for (let x = (-(groundOff % 22) + W) % 22 - 22; x < W; x += 22) {
      ctx.fillRect(x, GY + 2, 4, 1);
      ctx.fillRect(x + 11, GY + 4, 3, 1);
    }
  }

  // ── Main loop ────────────────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    gFrame++;
    if (!dead) {
      score += 0.05;
      speed = Math.min(5 + Math.floor(score / 80) * 0.5, 13);
    }
    if (score > hiScore) hiScore = score;

    // Physics
    if (!dead) {
      dino.vy += 0.68;
      dino.y += dino.vy;
      const floor = GY - DINO_H;
      if (dino.y >= floor) { dino.y = floor; dino.vy = 0; dino.jumping = false; }
    }

    // Walk anim
    if (++animT > 6) { animF = 1 - animF; animT = 0; }

    // Spawn obstacles
    if (!dead && --nextObs <= 0) {
      const large = Math.random() > 0.55;
      const sp = large ? F.cactL : F.cactS;
      const scale = large ? 1.1 : 1.0;
      const oh = Math.round(sp[3] * scale);
      obstacles.push({ x: W + 20, y: GY - oh, large });
      nextObs = Math.max(60, 120 - Math.floor(speed * 4) + Math.floor(Math.random() * 60));
    }

    // Move
    if (!dead) {
      obstacles.forEach(o => o.x -= speed);
      groundOff += speed;
    }
    obstacles = obstacles.filter(o => o.x > -80);
    clouds.forEach(cl => { cl.x -= 0.45; if (cl.x + 70 < 0) cl.x = W + 40; });

    if (mode === 'auto') autoJump();

    if (!dead && checkHit()) {
      dead = true; flashT = 10;
      if (mode === 'auto') setTimeout(reset, 700);
    }
    if (flashT > 0) flashT--;

    // ── Draw ──────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    if (flashT > 0) {
      ctx.fillStyle = 'rgba(125,211,252,0.1)';
      ctx.fillRect(0, 0, W, H);
    }

    // Clouds
    clouds.forEach(cl => {
      const cw = Math.round(F.cloud[2] * 0.7);
      const ch = Math.round(F.cloud[3] * 0.7);
      drawSpr(F.cloud, cl.x, cl.y, cw, ch);
    });

    drawGround();

    // Obstacles
    obstacles.forEach(o => {
      const sp = o.large ? F.cactL : F.cactS;
      const scale = o.large ? 1.1 : 1.0;
      const dw = Math.round(sp[2] * scale);
      const dh = Math.round(sp[3] * scale);
      drawSpr(sp, o.x, o.y, dw, dh);
    });

    // Dino — use same display width for both frames to avoid jitter
    if (!dead) {
      const fr = animF === 0 ? F.run0 : F.run1;
      drawSpr(fr, dino.x, dino.y, RUN0_W, DINO_H);
    } else {
      // dead: use run0 frozen
      drawSpr(F.run0, dino.x, dino.y, RUN0_W, DINO_H);
    }

    // HUD
    if (mode === 'play') {
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      if (hiScore > 0) {
        ctx.fillStyle = 'rgba(125,211,252,0.4)';
        ctx.fillText('HI ' + String(Math.floor(hiScore)).padStart(5,'0'), W - 72, 16);
      }
      ctx.fillStyle = 'rgba(125,211,252,0.8)';
      ctx.fillText(String(Math.floor(score)).padStart(5,'0'), W - 8, 16);
      ctx.textAlign = 'left';
    }

    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(19,32,46,0.75)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(125,211,252,0.9)';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W/2, H/2 - 2);
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(125,211,252,0.5)';
      ctx.fillText('Space / tap to restart', W/2, H/2 + 13);
      ctx.textAlign = 'left';
    }

    // Mode badge
    const label = mode === 'auto' ? '▶ PLAY' : '⏸ AUTO';
    ctx.fillStyle = 'rgba(125,211,252,0.1)';
    ctx.beginPath(); ctx.roundRect(W - 58, H - 18, 52, 14, 3); ctx.fill();
    ctx.fillStyle = 'rgba(125,211,252,0.45)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(label, W - 8, H - 7);
    ctx.textAlign = 'left';
  }

  // ── Input ────────────────────────────────────────────────────────
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      const r = canvas.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) e.preventDefault();
      if (mode === 'play') dead ? reset() : jump();
    }
    if (e.code === 'Enter') toggleMode();
  });

  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    if (cy > H - 22 || cx < 140) { toggleMode(); return; }
    if (mode === 'play') dead ? reset() : jump();
    else toggleMode();
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (mode === 'play') dead ? reset() : jump();
    else toggleMode();
  }, { passive: false });

  // ── Init ─────────────────────────────────────────────────────────
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
