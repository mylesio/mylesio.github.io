/**
 * Dino Runner — official sprite coords from wayou/t-rex-runner source
 *
 * Sprite: 100-offline-sprite.png (standard wayou LDPI, 1233x68)
 * Coords from Runner.spriteDefinition.LDPI + Trex.animFrames + Trex.config:
 *   TREX base: x=848, y=2, W=44, H=47
 *   RUNNING offsets: [88, 132]  → sourceX = 848+offset
 *   JUMPING offset:  [0]        → sourceX = 848
 *   CRASHED offset:  [220]      → sourceX = 848+220=1068
 *   CACTUS_SMALL: x=228, y=2, w=17, h=35
 *   CACTUS_LARGE: x=332, y=2, w=25, h=50
 *   CLOUD:        x=86,  y=2, w=46, h=14
 *
 * Controls: click canvas to jump (play mode) or toggle auto/play
 * No Space key — avoids page scroll conflict
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Load & recolor sprite ────────────────────────────────────────
  // Original: dark grey on white. Remap: white→transparent, grey→sky-blue #7dd3fc
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
      if (r > 200 && g > 200 && b > 200) {
        d[i+3] = 0;                                           // white → transparent
      } else if (r < 130) {
        d[i] = 125; d[i+1] = 211; d[i+2] = 252; d[i+3] = 210; // grey → sky blue
      }
    }
    oc2.putImageData(id, 0, 0);
    spr = oc;
  };

  // ── Official LDPI sprite coords ──────────────────────────────────
  const TREX_BASE_X = 848, TREX_BASE_Y = 2;
  const TREX_W = 44, TREX_H = 47;
  const TREX_FRAMES = {
    run:     [88, 132],
    jump:    [0],
    crashed: [220],
  };
  const CACTUS_S = { x: 228, y: 2, w: 17, h: 35 };
  const CACTUS_L = { x: 332, y: 2, w: 25, h: 50 };
  const CLOUD    = { x:  86, y: 2, w: 46, h: 14 };

  // ── Display scale ────────────────────────────────────────────────
  const SCALE = 36 / TREX_H;                   // 36px tall
  const D_W   = Math.round(TREX_W * SCALE);    // ~34px
  const D_H   = Math.round(TREX_H * SCALE);    // 36px

  // ── Canvas layout ────────────────────────────────────────────────
  let W, H, GY;

  function resize() {
    W = canvas.width  = canvas.parentElement.clientWidth || 800;
    H = canvas.height = 200;
    GY = H - 20;
    if (!dead) dino.y = GY - D_H;
  }

  // ── Game state ───────────────────────────────────────────────────
  let mode = 'auto';   // 'auto' | 'play'
  let score = 0, hiScore = 0, speed = 5, gFrame = 0;
  let dead = false, flashT = 0;
  let frameIdx = 0, frameTimer = 0;
  const FRAME_MS = 1000 / 12;   // 12fps — same as official
  let lastTs = 0;
  let groundOff = 0;

  const dino = { x: 60, y: 0, vy: 0, jumping: false };
  let obstacles = [];
  let nextObs = 180;
  let clouds = [
    { x: 160, y: 30 }, { x: 380, y: 22 }, { x: 600, y: 38 }, { x: 820, y: 18 },
  ];

  // ── Actions ──────────────────────────────────────────────────────
  function jump() {
    if (dino.jumping || dead) return;
    dino.vy = -11;
    dino.jumping = true;
  }

  function reset() {
    score = 0; gFrame = 0; speed = 5;
    obstacles = []; nextObs = 180;
    dead = false; flashT = 0;
    dino.y = GY - D_H; dino.vy = 0; dino.jumping = false;
    groundOff = 0; frameIdx = 0; frameTimer = 0;
  }

  function toggleMode() {
    mode = mode === 'auto' ? 'play' : 'auto';
    reset();
  }

  // ── Draw helpers ─────────────────────────────────────────────────
  // Draw dino frame, flipped horizontally so it faces right
  function drawTrex(offset, dx, dy) {
    if (!spr) return;
    const sx = TREX_BASE_X + offset;
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(spr, sx, TREX_BASE_Y, TREX_W, TREX_H, -(dx + D_W), dy, D_W, D_H);
    ctx.restore();
  }

  function drawSpr(s, dx, dy, dw, dh) {
    if (!spr) return;
    ctx.drawImage(spr, s.x, s.y, s.w, s.h, dx, dy, dw, dh);
  }

  // ── AI: look-ahead jump ──────────────────────────────────────────
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const dinoRight = dino.x + D_W - 4;
      const gap = o.x + 2 - dinoRight;
      if (gap < 0) continue;
      if (gap < 22 + speed * 3) { jump(); break; }
    }
  }

  // ── Collision ────────────────────────────────────────────────────
  function checkHit() {
    const pad = 5;
    const dl = dino.x + pad, dr = dino.x + D_W - pad;
    const dt = dino.y + pad, db = dino.y + D_H - 4;
    for (const o of obstacles) {
      const sp = o.large ? CACTUS_L : CACTUS_S;
      const ow = Math.round(sp.w * o.scale);
      const oh = Math.round(sp.h * o.scale);
      if (dl < o.x + ow - 2 && dr > o.x + 2 && dt < o.y + oh && db > o.y + 4) return true;
    }
    return false;
  }

  // ── Ground ───────────────────────────────────────────────────────
  function drawGround() {
    ctx.strokeStyle = 'rgba(125,211,252,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GY); ctx.lineTo(W, GY); ctx.stroke();
    ctx.fillStyle = 'rgba(125,211,252,0.15)';
    const off = (groundOff | 0) % 20;
    for (let x = -off; x < W; x += 20) {
      ctx.fillRect(x,      GY + 3, 4, 1);
      ctx.fillRect(x + 10, GY + 6, 3, 1);
    }
  }

  // ── Main loop ────────────────────────────────────────────────────
  function tick(ts) {
    requestAnimationFrame(tick);
    const dt = Math.min(ts - (lastTs || ts), 50);
    lastTs = ts;

    if (!dead) {
      score += dt * 0.003;
      speed = Math.min(5 + Math.floor(score / 100) * 0.5, 14);
    }
    if (score > hiScore) hiScore = score;

    // Physics
    if (!dead) {
      dino.vy += 0.65;
      dino.y  += dino.vy;
      const floor = GY - D_H;
      if (dino.y >= floor) { dino.y = floor; dino.vy = 0; dino.jumping = false; }
    }

    // Frame animation
    if (!dead && !dino.jumping) {
      frameTimer += dt;
      if (frameTimer >= FRAME_MS) {
        frameTimer -= FRAME_MS;
        frameIdx = 1 - frameIdx;
      }
    }

    // Spawn obstacles
    if (!dead && --nextObs <= 0) {
      const large = Math.random() > 0.5;
      const sp    = large ? CACTUS_L : CACTUS_S;
      const scale = 0.9 + Math.random() * 0.4;
      const oh = Math.round(sp.h * scale);
      obstacles.push({ x: W + 10, y: GY - oh, large, scale });
      nextObs = Math.max(55, Math.round(100 + Math.random() * 60 - speed * 3));
    }

    // Move
    if (!dead) {
      obstacles.forEach(o => o.x -= speed);
      groundOff += speed;
    }
    obstacles = obstacles.filter(o => o.x > -60);
    clouds.forEach(cl => { cl.x -= 0.4; if (cl.x + 50 < 0) cl.x = W + 40; });

    if (mode === 'auto') autoJump();

    if (!dead && checkHit()) {
      dead = true; flashT = 8;
      if (mode === 'auto') setTimeout(reset, 650);
    }
    if (flashT > 0) flashT--;

    // ── Render ────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    if (flashT > 0) {
      ctx.fillStyle = 'rgba(125,211,252,0.07)';
      ctx.fillRect(0, 0, W, H);
    }

    // Clouds
    clouds.forEach(cl => {
      drawSpr(CLOUD, cl.x, cl.y, Math.round(CLOUD.w * 0.85), Math.round(CLOUD.h * 0.85));
    });

    drawGround();

    // Obstacles
    obstacles.forEach(o => {
      const sp = o.large ? CACTUS_L : CACTUS_S;
      drawSpr(sp, o.x, o.y, Math.round(sp.w * o.scale), Math.round(sp.h * o.scale));
    });

    // Dino
    if (!dead) {
      const offset = dino.jumping
        ? TREX_FRAMES.jump[0]
        : TREX_FRAMES.run[frameIdx];
      drawTrex(offset, dino.x, dino.y);
    } else {
      drawTrex(TREX_FRAMES.crashed[0], dino.x, dino.y);
    }

    // Score (play mode)
    if (mode === 'play') {
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      if (hiScore > 0) {
        ctx.fillStyle = 'rgba(125,211,252,0.35)';
        ctx.fillText('HI ' + String(Math.floor(hiScore)).padStart(5, '0'), W - 72, 22);
      }
      ctx.fillStyle = 'rgba(125,211,252,0.75)';
      ctx.fillText(String(Math.floor(score)).padStart(5, '0'), W - 8, 22);
      ctx.textAlign = 'left';
    }

    // Game over (play mode)
    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(15,25,38,0.78)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(125,211,252,0.9)';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 4);
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(125,211,252,0.45)';
      ctx.fillText('click to restart', W / 2, H / 2 + 14);
      ctx.textAlign = 'left';
    }

    // Mode badge
    const badge = mode === 'auto' ? '▶ PLAY' : '⏸ AUTO';
    ctx.fillStyle = 'rgba(125,211,252,0.08)';
    ctx.beginPath(); ctx.roundRect(W - 60, H - 20, 54, 15, 3); ctx.fill();
    ctx.fillStyle = 'rgba(125,211,252,0.4)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(badge, W - 8, H - 8);
    ctx.textAlign = 'left';
  }

  // ── Input: click only (no Space — avoids page scroll) ───────────
  canvas.addEventListener('click', () => {
    if (mode === 'auto') {
      toggleMode();
    } else {
      dead ? reset() : jump();
    }
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (mode === 'auto') toggleMode();
    else dead ? reset() : jump();
  }, { passive: false });

  // ── Init ─────────────────────────────────────────────────────────
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
