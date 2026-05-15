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
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Load sprite ──────────────────────────────────────────────────
  const spr = new Image();
  spr.src = '/dino-sprite-white.png';

  // ── Official LDPI sprite coords ──────────────────────────────────
  const TREX_BASE_X = 848, TREX_BASE_Y = 2;
  const TREX_W = 44, TREX_H = 47;
  const TREX_FRAMES = { run: [88, 132], jump: [0], crashed: [220] };
  const CACTUS_S = { x: 228, y: 2, w: 17, h: 35 };
  const CACTUS_L = { x: 332, y: 2, w: 25, h: 50 };
  const CLOUD    = { x:  86, y: 2, w: 46, h: 14 };

  // ── Display scale ────────────────────────────────────────────────
  const SCALE = 36 / TREX_H;
  const D_W   = Math.round(TREX_W * SCALE);
  const D_H   = Math.round(TREX_H * SCALE);

  // ── Canvas layout (fixed 150px, site-header clips to 48px idle) ──
  const CANVAS_H = 170;
  const NAVBAR_H = 48;
  let W = 0;
  const H  = CANVAS_H;
  const GY = H - 16;           // ground y (fixed)

  // idle dino position: to the left of "mylesio" logo
  // computed from #dino-anchor element position relative to canvas
  // idle dino is drawn smaller
  const IDLE_SCALE = 22 / TREX_H;   // ~22px tall (vs 36px in game)
  const IDLE_DW = Math.round(TREX_W * IDLE_SCALE);
  const IDLE_DH = Math.round(TREX_H * IDLE_SCALE);

  function getIdlePos() {
    const anchor = document.getElementById('dino-anchor');
    if (!anchor) return { x: 24, y: Math.round((NAVBAR_H - IDLE_DH) / 2) };
    const ar = anchor.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    // place just to the right of anchor (left of mylesio text), +2px gap
    const x = Math.round(ar.left - cr.left + 2);
    // on mobile navbar is taller due to different padding — push dino lower
    const isMobile = window.innerWidth < 640;
    const y = Math.round((NAVBAR_H - IDLE_DH) / 2) + (isMobile ? 9 : 0);
    return { x: Math.max(4, x), y };
  }

  let IDLE_X = 24;
  let IDLE_Y = Math.round((NAVBAR_H - IDLE_DH) / 2);

  function resize() {
    const newW = canvas.parentElement.clientWidth || 800;
    if (newW === W) return;
    W = canvas.width  = newW;
    canvas.height = CANVAS_H;
  }

  function resizeDebounced() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  }
  let resizeTimer = null;

  // ── Game state ───────────────────────────────────────────────────
  let started  = false;   // true = game running
  let jumping  = false;   // true = parabola-jump intro in progress
  let mode     = 'auto';
  let score = 0, hiScore = 0, speed = 5, gFrame = 0;
  let dead = false, flashT = 0;
  let frameIdx = 0, frameTimer = 0;
  const FRAME_MS = 1000 / 12;
  let lastTs = 0, groundOff = 0;

  // dino position — starts at idle (logo spot)
  const dino = { x: IDLE_X, y: IDLE_Y, vy: 0 };
  let obstacles = [], nextObs = 180;
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

  // ── Draw helpers ─────────────────────────────────────────────────
  function drawTrex(offset, dx, dy) {
    if (!spr.complete) return;
    ctx.drawImage(spr, TREX_BASE_X + offset, TREX_BASE_Y, TREX_W, TREX_H, dx, dy, D_W, D_H);
  }

  function drawSpr(s, dx, dy, dw, dh) {
    if (!spr.complete) return;
    ctx.drawImage(spr, s.x, s.y, s.w, s.h, dx, dy, dw, dh);
  }

  // ── AI auto-jump ─────────────────────────────────────────────────
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const gap = o.x + 2 - (dino.x + D_W - 4);
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
      const ow = Math.round(sp.w * o.scale), oh = Math.round(sp.h * o.scale);
      if (dl < o.x + ow - 2 && dr > o.x + 2 && dt < o.y + oh && db > o.y + 4) return true;
    }
    return false;
  }

  // ── Ground ───────────────────────────────────────────────────────
  function drawGround() {
    ctx.strokeStyle = 'rgba(83,83,83,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GY); ctx.lineTo(W, GY); ctx.stroke();
    ctx.fillStyle = 'rgba(83,83,83,0.2)';
    const off = (groundOff | 0) % 20;
    for (let x = -off; x < W; x += 20) {
      ctx.fillRect(x,      GY + 3, 4, 1);
      ctx.fillRect(x + 10, GY + 6, 3, 1);
    }
  }

  // ── Intro parabola: dino jumps from logo spot to ground ──────────
  // Uses canvas-internal coordinates only (no DOM/viewport math)
  let introT = 0;
  const INTRO_DURATION = 600; // ms
  // Control point for quadratic bezier: same X as midpoint, y=0 (top of canvas)
  // P0 = (IDLE_X, IDLE_Y), P1 = ctrl, P2 = (GAME_X, GY - D_H)
  const GAME_X = 60;
  const GAME_Y = GY - D_H;

  // capture start pos when jump begins
  let introStartX = IDLE_X, introStartY = IDLE_Y;

  function tickIntro(dt) {
    introT = Math.min(introT + dt, INTRO_DURATION);
    const p = introT / INTRO_DURATION;

    // Quadratic bezier from intro start → game ground
    const ctrlX = introStartX + (GAME_X - introStartX) * 0.2;
    const ctrlY = introStartY - 20;
    dino.x = Math.round((1-p)*(1-p)*introStartX + 2*(1-p)*p*ctrlX + p*p*GAME_X);
    dino.y = Math.round((1-p)*(1-p)*introStartY + 2*(1-p)*p*ctrlY + p*p*GAME_Y);

    // leg animation during flight
    frameTimer += dt;
    if (frameTimer >= FRAME_MS) { frameTimer -= FRAME_MS; frameIdx = 1 - frameIdx; }

    if (introT >= INTRO_DURATION) {
      // landed — now switch z-index so navbar covers canvas
      const siteHeader = canvas.closest('.site-header');
      if (siteHeader) siteHeader.classList.add('expanded');
      canvas.style.zIndex = '5';
      dino.x = GAME_X;
      dino.y = GAME_Y;
      dino.vy = 0;
      dino.jumping = false;
      jumping = false;
      started = true;
    }
  }

  // ── Main loop ────────────────────────────────────────────────────
  function tick(ts) {
    requestAnimationFrame(tick);
    const dt = Math.min(ts - (lastTs || ts), 50);
    lastTs = ts;

    ctx.clearRect(0, 0, W, H);

    // ── IDLE: draw small static dino at logo position ────────────
    if (!started && !jumping) {
      if (spr.complete) {
        ctx.drawImage(spr,
          TREX_BASE_X + TREX_FRAMES.run[0], TREX_BASE_Y, TREX_W, TREX_H,
          dino.x, dino.y, IDLE_DW, IDLE_DH);
      }
      return;
    }

    // ── INTRO JUMP: parabola animation ───────────────────────────
    if (jumping) {
      tickIntro(dt);
      // draw ground + dino during arc
      drawGround();
      const offset = TREX_FRAMES.run[frameIdx];
      drawTrex(offset, dino.x, dino.y);
      return;
    }

    // ── GAME RUNNING ─────────────────────────────────────────────
    if (!dead) {
      score += dt * 0.003;
      speed = Math.min(5 + Math.floor(score / 100) * 0.5, 14);
    }
    if (score > hiScore) hiScore = score;

    // Physics
    if (!dead) {
      dino.vy += 0.65;
      dino.y  += dino.vy;
      if (dino.y >= GAME_Y) { dino.y = GAME_Y; dino.vy = 0; dino.jumping = false; }
    }

    // Frame animation
    if (!dead && !dino.jumping) {
      frameTimer += dt;
      if (frameTimer >= FRAME_MS) { frameTimer -= FRAME_MS; frameIdx = 1 - frameIdx; }
    }

    // Spawn obstacles
    if (!dead && --nextObs <= 0) {
      const large = Math.random() > 0.5;
      const sp = large ? CACTUS_L : CACTUS_S;
      const scale = 0.9 + Math.random() * 0.4;
      obstacles.push({ x: W + 10, y: GY - Math.round(sp.h * scale), large, scale });
      nextObs = Math.max(55, Math.round(100 + Math.random() * 60 - speed * 3));
    }

    // Move
    if (!dead) { obstacles.forEach(o => o.x -= speed); groundOff += speed; }
    obstacles = obstacles.filter(o => o.x > -60);
    clouds.forEach(cl => { cl.x -= 0.4; if (cl.x + 50 < 0) cl.x = W + 40; });

    if (mode === 'auto') autoJump();

    if (!dead && checkHit()) {
      dead = true; flashT = 8;
    }
    if (flashT > 0) flashT--;

    // Render
    if (flashT > 0) { ctx.fillStyle = 'rgba(83,83,83,0.05)'; ctx.fillRect(0, 0, W, H); }

    ctx.globalAlpha = 0.7;
    clouds.forEach(cl => drawSpr(CLOUD, cl.x, cl.y, Math.round(CLOUD.w * 0.85), Math.round(CLOUD.h * 0.85)));
    ctx.globalAlpha = 1.0;

    drawGround();
    obstacles.forEach(o => {
      const sp = o.large ? CACTUS_L : CACTUS_S;
      drawSpr(sp, o.x, o.y, Math.round(sp.w * o.scale), Math.round(sp.h * o.scale));
    });

    if (!dead) {
      drawTrex(dino.jumping ? TREX_FRAMES.jump[0] : TREX_FRAMES.run[frameIdx], dino.x, dino.y);
    } else {
      drawTrex(TREX_FRAMES.crashed[0], dino.x, dino.y);
    }

    // Score — always visible
    ctx.font = '11px monospace'; ctx.textAlign = 'right';
    if (hiScore > 0) {
      ctx.fillStyle = 'rgba(83,83,83,0.4)';
      ctx.fillText('HI ' + String(Math.floor(hiScore)).padStart(5, '0'), W - 72, 22);
    }
    ctx.fillStyle = 'rgba(83,83,83,0.8)';
    ctx.fillText(String(Math.floor(score)).padStart(5, '0'), W - 8, 22);
    ctx.textAlign = 'left';

    // Game over — always shown when dead
    if (dead) {
      ctx.fillStyle = 'rgba(245,242,236,0.85)'; ctx.fillRect(0, 0, W, H);
      const isMobile = window.innerWidth < 640;
      const centerY = H / 2 + (isMobile ? 25 : 10);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(83,83,83,0.9)'; ctx.font = 'bold 13px monospace';
      ctx.fillText('GAME OVER', W / 2, centerY - 4);
      ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(83,83,83,0.45)';
      ctx.fillText('click to restart', W / 2, centerY + 14);
      ctx.textAlign = 'left';
    }
  }

  // ── Start on first interaction ───────────────────────────────────
  function startGame() {
    if (started || jumping) return;
    // refresh idle pos right before launch (in case layout changed)
    initIdlePos();
    introStartX = IDLE_X;
    introStartY = IDLE_Y;
    jumping = true;
    introT = 0;
    document.removeEventListener('click', startGame, true);
    document.removeEventListener('touchstart', startGame, true);

    // expand site-header immediately on click
    const siteHeader = canvas.closest('.site-header');
    if (siteHeader) siteHeader.classList.add('expanded');
    // z-index stays at 20 (canvas above navbar) until dino lands
  }
  document.addEventListener('click', startGame, true);
  document.addEventListener('touchstart', startGame, true);

  // ── Input ────────────────────────────────────────────────────────
  canvas.addEventListener('click', () => {
    if (!started) return;
    if (dead) { reset(); return; }
    if (mode === 'auto') {
      mode = 'play';
    } else {
      jump();
    }
  });
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!started) return;
    if (dead) { reset(); return; }
    if (mode === 'auto') {
      mode = 'play';
    } else {
      jump();
    }
  }, { passive: false });

  // ── Gamepad cursor after game starts ────────────────────────────
  const GAMEPAD_CURSOR = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='22' viewBox='0 0 32 22'><rect x='2' y='5' width='28' height='13' rx='6' fill='%23444'/><rect x='6' y='9' width='2' height='6' rx='1' fill='white'/><rect x='4' y='11' width='6' height='2' rx='1' fill='white'/><circle cx='22' cy='10' r='2' fill='white'/><circle cx='26' cy='13' r='2' fill='white'/></svg>") 16 11, pointer`;

  canvas.addEventListener('mouseenter', () => {
    if (started) canvas.style.cursor = GAMEPAD_CURSOR;
  });
  canvas.addEventListener('mouseleave', () => {
    canvas.style.cursor = 'pointer';
  });

  // ── Init ─────────────────────────────────────────────────────────
  resize();

  function initIdlePos() {
    const p = getIdlePos();
    IDLE_X = p.x; IDLE_Y = p.y;
    dino.x = IDLE_X; dino.y = IDLE_Y;
  }

  // compute after layout settles
  if (document.readyState === 'complete') {
    initIdlePos();
  } else {
    window.addEventListener('load', initIdlePos);
  }
  // also recompute if font/layout shifts
  setTimeout(initIdlePos, 300);

  new ResizeObserver(resizeDebounced).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
