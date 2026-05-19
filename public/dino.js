/**
 * Dino Runner — main thread, no OffscreenCanvas
 * Favicon animation permanently disabled for performance.
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const spr = new Image();
  spr.src = '/dino-sprite-white.png';

  const TREX_BASE_X = 848, TREX_BASE_Y = 2;
  const TREX_W = 44, TREX_H = 47;
  const TREX_FRAMES = { run: [88, 132], jump: [0], crashed: [220] };
  const CACTUS_S = { x: 228, y: 2, w: 17, h: 35 };
  const CACTUS_L = { x: 332, y: 2, w: 25, h: 50 };
  const CLOUD    = { x:  86, y: 2, w: 46, h: 14 };

  const SCALE = 36 / TREX_H;
  const D_W   = Math.round(TREX_W * SCALE);
  const D_H   = Math.round(TREX_H * SCALE);

  const CANVAS_H = 170;
  const NAVBAR_H = 48;
  let W = 0;
  const H  = CANVAS_H;
  const GY = H - 16;

  const IDLE_SCALE = 22 / TREX_H;
  const IDLE_DW = Math.round(TREX_W * IDLE_SCALE);
  const IDLE_DH = Math.round(TREX_H * IDLE_SCALE);

  function getIdlePos() {
    const anchor = document.getElementById('dino-anchor');
    const isMobile = window.innerWidth < 640;
    const y = Math.round((NAVBAR_H - IDLE_DH) / 2);
    if (!anchor) return { x: 24, y };
    const ar = anchor.getBoundingClientRect();
    // canvas is position:absolute inside #dino-stage which is position:fixed top:0 left:0
    // so canvas left edge = 0 in viewport coords → ar.left is directly the canvas-local x
    const x = Math.round(ar.left + 2);
    return { x: Math.max(4, Math.min(x, W - IDLE_DW - 4)), y };
  }

  let IDLE_X = 24;
  let IDLE_Y = Math.round((NAVBAR_H - IDLE_DH) / 2);

  function resize() {
    const newW = canvas.parentElement.clientWidth || window.innerWidth || 800;
    if (newW === W) return;
    W = canvas.width  = newW;
    canvas.height = CANVAS_H;
  }

  let resizeTimer = null;
  function resizeDebounced() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); if (typeof updateHitArea === 'function') updateHitArea(); }, 100);
  }

  let started = false, jumping = false;
  let mode = 'auto';
  let score = 0, hiScore = 0, speed = 5, gFrame = 0;
  let dead = false, flashT = 0;
  let frameIdx = 0, frameTimer = 0;
  const FRAME_MS = 1000 / 12;
  let lastTs = 0, groundOff = 0;
  let fpsFrames = 0, fpsLast = 0, fpsDisplay = 0;

  const dino = { x: IDLE_X, y: IDLE_Y, vy: 0, jumping: false };
  let obstacles = [], nextObs = 180;
  let clouds = [
    { x: 160, y: 30 }, { x: 380, y: 22 }, { x: 600, y: 38 }, { x: 820, y: 18 },
  ];

  function jump() {
    if (dino.jumping || dead) return;
    dino.vy = -11; dino.jumping = true;
  }

  function reset() {
    score = 0; gFrame = 0; speed = 5;
    obstacles = []; nextObs = 180;
    dead = false; flashT = 0;
    dino.y = GY - D_H; dino.vy = 0; dino.jumping = false;
    groundOff = 0; frameIdx = 0; frameTimer = 0;
  }

  function drawTrex(offset, dx, dy) {
    if (!spr.complete) return;
    ctx.drawImage(spr, TREX_BASE_X + offset, TREX_BASE_Y, TREX_W, TREX_H, dx, dy, D_W, D_H);
  }

  function drawSpr(s, dx, dy, dw, dh) {
    if (!spr.complete) return;
    ctx.drawImage(spr, s.x, s.y, s.w, s.h, dx, dy, dw, dh);
  }

  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const gap = o.x + 2 - (dino.x + D_W - 4);
      if (gap < 0) continue;
      if (gap < 22 + speed * 3) { jump(); break; }
    }
  }

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

  let introT = 0;
  const INTRO_DURATION = 600;
  const GAME_X = 60;
  const GAME_Y = GY - D_H;
  let introStartX = IDLE_X, introStartY = IDLE_Y;

  function tickIntro(dt) {
    introT = Math.min(introT + dt, INTRO_DURATION);
    const p = introT / INTRO_DURATION;
    const ctrlX = introStartX + (GAME_X - introStartX) * 0.2;
    const ctrlY = introStartY - 20;
    dino.x = Math.round((1-p)*(1-p)*introStartX + 2*(1-p)*p*ctrlX + p*p*GAME_X);
    dino.y = Math.round((1-p)*(1-p)*introStartY + 2*(1-p)*p*ctrlY + p*p*GAME_Y);
    frameTimer += dt;
    if (frameTimer >= FRAME_MS) { frameTimer -= FRAME_MS; frameIdx = 1 - frameIdx; }
    if (introT >= INTRO_DURATION) {
      const siteHeader = document.getElementById('dino-stage');
      if (siteHeader) siteHeader.classList.add('expanded');
      dino.x = GAME_X; dino.y = GAME_Y; dino.vy = 0; dino.jumping = false;
      jumping = false; started = true;
    }
  }

  // Draw idle dino once (no RAF loop needed)
  function drawIdle() {
    if (!spr.complete) { spr.onload = drawIdle; return; }
    if (!W) resize(); // ensure canvas has width
    if (!W) return;   // still 0 → bail
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(spr, TREX_BASE_X + TREX_FRAMES.run[0], TREX_BASE_Y, TREX_W, TREX_H,
      dino.x, dino.y, IDLE_DW, IDLE_DH);
  }

  let rafId = null;

  function tick(ts) {
    rafId = requestAnimationFrame(tick);
    const dt = Math.min(ts - (lastTs || ts), 50);
    lastTs = ts;
    ctx.clearRect(0, 0, W, H);

    if (jumping) {
      tickIntro(dt);
      drawGround();
      drawTrex(TREX_FRAMES.run[frameIdx], dino.x, dino.y);
      return;
    }

    if (!dead) {
      score += dt * 0.003;
      speed = Math.min(5 + Math.floor(score / 100) * 0.5, 14);
    }
    if (score > hiScore) hiScore = score;

    if (!dead) {
      dino.vy += 0.65; dino.y += dino.vy;
      if (dino.y >= GAME_Y) { dino.y = GAME_Y; dino.vy = 0; dino.jumping = false; }
    }

    if (!dead && !dino.jumping) {
      frameTimer += dt;
      if (frameTimer >= FRAME_MS) { frameTimer -= FRAME_MS; frameIdx = 1 - frameIdx; }
    }

    if (!dead && --nextObs <= 0) {
      const large = Math.random() > 0.5;
      const sp = large ? CACTUS_L : CACTUS_S;
      const scale = 0.9 + Math.random() * 0.4;
      obstacles.push({ x: W + 10, y: GY - Math.round(sp.h * scale), large, scale });
      nextObs = Math.max(55, Math.round(100 + Math.random() * 60 - speed * 3));
    }

    if (!dead) { obstacles.forEach(o => o.x -= speed); groundOff += speed; }
    obstacles = obstacles.filter(o => o.x > -60);
    clouds.forEach(cl => { cl.x -= 0.4; if (cl.x + 50 < 0) cl.x = W + 40; });

    if (mode === 'auto') autoJump();
    if (!dead && checkHit()) { dead = true; flashT = 8; }
    if (flashT > 0) flashT--;

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

    // FPS
    fpsFrames++;
    const fpsNow = performance.now();
    if (fpsNow - fpsLast >= 500) {
      fpsDisplay = Math.round(fpsFrames * 1000 / (fpsNow - fpsLast));
      fpsFrames = 0; fpsLast = fpsNow;
    }

    const scoreY = NAVBAR_H + 14;
    ctx.font = '11px monospace'; ctx.textAlign = 'right';
    if (hiScore > 0) {
      ctx.fillStyle = 'rgba(83,83,83,0.4)';
      ctx.fillText('HI ' + String(Math.floor(hiScore)).padStart(5, '0'), W - 72, scoreY);
    }
    ctx.fillStyle = 'rgba(83,83,83,0.8)';
    ctx.fillText(String(Math.floor(score)).padStart(5, '0'), W - 8, scoreY);
    ctx.fillStyle = 'rgba(83,83,83,0.35)';
    ctx.fillText(fpsDisplay + 'fps', W - 8, scoreY + 14);
    ctx.textAlign = 'left';

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

  const GAMEPAD_CURSOR = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='22' viewBox='0 0 32 22'><rect x='2' y='5' width='28' height='13' rx='6' fill='%23444'/><rect x='6' y='9' width='2' height='6' rx='1' fill='white'/><rect x='4' y='11' width='6' height='2' rx='1' fill='white'/><circle cx='22' cy='10' r='2' fill='white'/><circle cx='26' cy='13' r='2' fill='white'/></svg>") 16 11, pointer`;

  const hitArea = document.createElement('div');
  hitArea.id = 'dino-hit-area';
  hitArea.title = 'Click to open game zone';
  // position:fixed, z:90 (above navbar z:80) so clicks always reach it
  hitArea.style.cssText = 'position:fixed;z-index:90;cursor:pointer;pointer-events:auto;';
  document.body.appendChild(hitArea);

  function updateHitArea() {
    if (!started && !jumping) {
      const rect = canvas.getBoundingClientRect(); // viewport coords (canvas is in fixed stage)
      const sx = rect.width / canvas.width;
      const sy = rect.height / canvas.height;
      const pad = 8;
      // hitArea is position:fixed → left/top are viewport coords directly
      hitArea.style.left   = (rect.left + (IDLE_X - pad) * sx) + 'px';
      hitArea.style.top    = (rect.top  + (IDLE_Y - pad) * sy) + 'px';
      hitArea.style.width  = Math.max((IDLE_DW + pad * 2) * sx, 36) + 'px';
      hitArea.style.height = Math.max((IDLE_DH + pad * 2) * sy, 36) + 'px';
      hitArea.style.display = 'block';
      hitArea.style.cursor = GAMEPAD_CURSOR;
    } else {
      hitArea.style.display = 'none';
    }
  }

  function startGame() {
    if (started || jumping) return;
    initIdlePos();
    introStartX = IDLE_X; introStartY = IDLE_Y;
    jumping = true; introT = 0;
    const siteHeader = document.getElementById('dino-stage');
    if (siteHeader) siteHeader.classList.add('expanded');
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = GAMEPAD_CURSOR;
    hitArea.style.display = 'none';
    scrollCooldown = true;
    lastScrollY = window.scrollY || 0;
    setTimeout(() => { scrollCooldown = false; lastScrollY = window.scrollY || 0; }, 600);
    // Start RAF loop only when game begins
    lastTs = 0;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  hitArea.addEventListener('click', startGame);
  hitArea.addEventListener('touchstart', (e) => { e.preventDefault(); startGame(); }, { passive: false });

  canvas.addEventListener('click', () => {
    if (!started) return;
    if (dead) { reset(); return; }
    if (mode === 'auto') { mode = 'play'; } else { jump(); }
  });
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!started) return;
    if (dead) { reset(); return; }
    if (mode === 'auto') { mode = 'play'; } else { jump(); }
  }, { passive: false });

  function collapseToIdle() {
    if (!started && !jumping) return;
    started = false; jumping = false; dead = false;
    score = 0; hiScore = 0; speed = 5;
    obstacles = []; nextObs = 180;
    flashT = 0; groundOff = 0; frameIdx = 0; frameTimer = 0;
    initIdlePos();
    dino.x = IDLE_X; dino.y = IDLE_Y; dino.vy = 0; dino.jumping = false;
    const siteHeader = document.getElementById('dino-stage');
    if (siteHeader) siteHeader.classList.remove('expanded');
    canvas.style.pointerEvents = 'none';
    canvas.style.cursor = 'default';
    updateHitArea();
    // Stop RAF loop, redraw idle statically
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    drawIdle();
  }

  let lastScrollY = window.scrollY || 0;
  let scrollCooldown = false;
  window.addEventListener('scroll', () => {
    if (scrollCooldown) return;
    const sy = window.scrollY || window.pageYOffset;
    const delta = sy - lastScrollY;
    lastScrollY = sy;
    if (delta > 3 && (started || jumping)) collapseToIdle();
  }, { passive: true });

  resize();
  updateHitArea();

  function initIdlePos() {
    const p = getIdlePos();
    IDLE_X = p.x; IDLE_Y = p.y;
    dino.x = IDLE_X; dino.y = IDLE_Y;
    updateHitArea();
    if (!started && !jumping) drawIdle(); // redraw at correct position
  }

  if (document.readyState === 'complete') { initIdlePos(); }
  else { window.addEventListener('load', initIdlePos); }
  setTimeout(initIdlePos, 300);

  new ResizeObserver(resizeDebounced).observe(canvas.parentElement);
  // No RAF on page load — idle dino is static, RAF only starts when game begins
  drawIdle();
})();
