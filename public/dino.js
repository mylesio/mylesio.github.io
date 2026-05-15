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

  // ── Load sprite (pre-processed PNG: white content + transparent bg) ──
  const spr = new Image();
  spr.src = '/dino-sprite-white.png';

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
  let resizeTimer = null;

  function resize() {
    const newW = canvas.parentElement.clientWidth || 800;
    if (newW === W) return;
    W = canvas.width  = newW;
    H = canvas.height = 150;
    GY = H - 16;
    if (started && !dead) dino.y = GY - D_H;
  }

  function resizeDebounced() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  }

  // ── Game state ───────────────────────────────────────────────────
  let started = false;
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
  // Draw dino frame — no flip, sprite already faces right
  function drawTrex(offset, dx, dy) {
    if (!spr.complete) return;
    const sx = TREX_BASE_X + offset;
    ctx.drawImage(spr, sx, TREX_BASE_Y, TREX_W, TREX_H, dx, dy, D_W, D_H);
  }

  function drawSpr(s, dx, dy, dw, dh) {
    if (!spr.complete) return;
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

  // ── Main loop ────────────────────────────────────────────────────
  function tick(ts) {
    requestAnimationFrame(tick);
    const dt = Math.min(ts - (lastTs || ts), 50);
    lastTs = ts;

    if (!started) {
      // idle: blank canvas, dino lives in navbar logo
      ctx.clearRect(0, 0, W, H);
      return;
    }

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
      ctx.fillStyle = 'rgba(83,83,83,0.05)';
      ctx.fillRect(0, 0, W, H);
    }

    // Clouds — boost opacity so they're visible
    ctx.globalAlpha = 0.7;
    clouds.forEach(cl => {
      drawSpr(CLOUD, cl.x, cl.y, Math.round(CLOUD.w * 0.85), Math.round(CLOUD.h * 0.85));
    });
    ctx.globalAlpha = 1.0;

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
        ctx.fillStyle = 'rgba(83,83,83,0.4)';
        ctx.fillText('HI ' + String(Math.floor(hiScore)).padStart(5, '0'), W - 72, 22);
      }
      ctx.fillStyle = 'rgba(83,83,83,0.8)';
      ctx.fillText(String(Math.floor(score)).padStart(5, '0'), W - 8, 22);
      ctx.textAlign = 'left';
    }

    // Game over (play mode)
    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(245,242,236,0.85)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(83,83,83,0.9)';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 4);
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(83,83,83,0.45)';
      ctx.fillText('click to restart', W / 2, H / 2 + 14);
      ctx.textAlign = 'left';
    }

  }

  // ── Logo dino (drawn in navbar #dino-logo canvas) ────────────────
  const logoCanvas = document.getElementById('dino-logo');
  const lctx = logoCanvas ? logoCanvas.getContext('2d') : null;

  function drawLogoDino() {
    if (!lctx || !spr.complete) return;
    lctx.clearRect(0, 0, 24, 24);
    // scale down: TREX is 44x47, fit into 24x24
    const scale = 24 / 47;
    const sw = Math.round(44 * scale), sh = 24;
    const ox = Math.round((24 - sw) / 2);
    lctx.drawImage(spr,
      TREX_BASE_X + TREX_FRAMES.run[0], TREX_BASE_Y, TREX_W, TREX_H,
      ox, 0, sw, sh);
  }

  // draw logo dino once sprite loads
  if (spr.complete) drawLogoDino();
  else spr.addEventListener('load', drawLogoDino);

  // ── Flying animation from logo to canvas ─────────────────────────
  function flyDinoToCanvas(onDone) {
    if (!logoCanvas) { onDone(); return; }

    // get positions
    const logoRect = logoCanvas.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const canvasTop  = canvasRect.top + window.scrollY;
    const canvasLeft = canvasRect.left + window.scrollX;

    // target: dino.x on the ground in canvas coords
    const targetX = canvasLeft + dino.x;
    const targetY = canvasTop  + GY - D_H;

    // start: center of logo canvas
    const startX = logoRect.left + window.scrollX + 12;
    const startY = logoRect.top  + window.scrollY + 12;

    // create flying overlay div
    const fly = document.createElement('canvas');
    fly.width  = D_W;
    fly.height = D_H;
    fly.style.cssText = `
      position: absolute;
      left: ${startX - D_W/2}px;
      top:  ${startY - D_H/2}px;
      width: ${D_W}px; height: ${D_H}px;
      image-rendering: pixelated;
      pointer-events: none;
      z-index: 999;
      transition: none;
    `;
    document.body.appendChild(fly);
    const fctx = fly.getContext('2d');

    // draw dino on fly canvas
    function drawFly(frame) {
      fctx.clearRect(0, 0, D_W, D_H);
      fctx.drawImage(spr,
        TREX_BASE_X + TREX_FRAMES.run[frame], TREX_BASE_Y, TREX_W, TREX_H,
        0, 0, D_W, D_H);
    }

    // animate: parabolic arc from logo to canvas ground
    const DURATION = 600; // ms
    let startTime = null;
    let animFrame = 0;
    let animTimer = 0;

    // hide logo dino
    lctx.clearRect(0, 0, 24, 24);

    function animStep(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / DURATION, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic

      // position: linear X, arc Y (parabola)
      const x = startX + (targetX - startX) * ease - D_W/2;
      // Y: goes up first then down to target
      const arcHeight = Math.abs(targetY - startY) * 1.2 + 60;
      const yLinear = startY + (targetY - startY) * ease;
      const yArc = yLinear - arcHeight * 4 * progress * (1 - progress);
      const y = yArc - D_H/2;

      fly.style.left = `${x}px`;
      fly.style.top  = `${y}px`;

      // animate legs
      animTimer += 16;
      if (animTimer > 80) { animTimer = 0; animFrame = 1 - animFrame; }
      drawFly(animFrame);

      if (progress < 1) {
        requestAnimationFrame(animStep);
      } else {
        fly.remove();
        onDone();
      }
    }
    requestAnimationFrame(animStep);
  }

  // ── Start on first interaction anywhere on page ──────────────────
  function startGame() {
    if (started) return;
    started = true;
    document.removeEventListener('click', startGame, true);
    document.removeEventListener('touchstart', startGame, true);

    // 1. expand banner
    const siteHeader = canvas.closest('.site-header');
    if (siteHeader) siteHeader.classList.add('expanded');

    // 2. hide logo dino
    if (lctx) lctx.clearRect(0, 0, 24, 24);

    // 3. parabolic fly from logo → canvas landing spot
    // get logo position
    const logoEl = document.getElementById('dino-logo');
    const logoRect = logoEl ? logoEl.getBoundingClientRect() : null;
    if (!logoRect) { resize(); started = true; return; }

    // logoRect is viewport-relative, fly uses position:fixed — no scrollY needed
    const startX = logoRect.left + logoRect.width / 2;
    const startY = logoRect.top  + logoRect.height / 2;

    // after banner starts expanding, compute target position
    // canvas top is always at site-header top (sticky top:0), GY is fixed canvas coord
    setTimeout(() => {
      resize();
      const siteHeader = canvas.closest('.site-header');
      const shRect = siteHeader.getBoundingClientRect();
      const targetX = shRect.left + dino.x + D_W / 2;
      const targetY = shRect.top  + GY - D_H / 2;  // fixed canvas y, no scrollY needed (fixed viewport)

      // create overlay canvas for the flying dino
      const fly = document.createElement('canvas');
      fly.width = D_W; fly.height = D_H;
      fly.style.cssText = `position:fixed;pointer-events:none;z-index:999;image-rendering:pixelated;left:${startX - D_W/2}px;top:${startY - D_H/2}px;width:${D_W}px;height:${D_H}px;`;
      document.body.appendChild(fly);
      const fctx = fly.getContext('2d');

      const DURATION = 500;
      let t0 = null, legFrame = 0, legTimer = 0;

      let lastLegTs = null;
      function flyStep(ts) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / DURATION, 1);

        // ease-out cubic for smooth deceleration
        const ease = 1 - Math.pow(1 - p, 3);

        const cx = startX + (targetX - startX) * ease - D_W / 2;

        // parabola going DOWNWARD: starts at startY (navbar), ends at targetY (canvas ground)
        // arc bows to the RIGHT/DOWN — subtract a lateral bow using p*(1-p)
        // y: linear drop + forward lean (arc bows toward bottom-right, not upward)
        const dy = targetY - startY;  // positive = going down
        const arcBow = Math.max(dy * 0.3, 30);  // bow magnitude, at least 30px
        // quadratic bezier: P0=start, P1=control(mid-right,lower), P2=end
        // using De Casteljau: cy = (1-p)²*startY + 2*(1-p)*p*(startY+arcBow) + p²*targetY
        const ctrlY = startY + arcBow;  // control point pulls arc downward early
        const cy = Math.pow(1-p,2)*startY + 2*(1-p)*p*ctrlY + p*p*targetY - D_H/2;

        fly.style.left = `${cx}px`;
        fly.style.top  = `${cy}px`;

        // animate legs
        if (lastLegTs !== null && ts - lastLegTs > 80) {
          legFrame = 1 - legFrame;
          lastLegTs = ts;
        } else if (lastLegTs === null) lastLegTs = ts;
        fctx.clearRect(0, 0, D_W, D_H);
        fctx.drawImage(spr, TREX_BASE_X + TREX_FRAMES.run[legFrame], TREX_BASE_Y, TREX_W, TREX_H, 0, 0, D_W, D_H);

        if (p < 1) {
          requestAnimationFrame(flyStep);
        } else {
          fly.remove();
          dino.y = GY - D_H;
          dino.vy = 0;
          dino.jumping = false;
          // wait one rAF so fly is fully gone before canvas dino appears
          requestAnimationFrame(() => { started = true; });
        }
      }
      requestAnimationFrame(flyStep);
    }, 50);
  }
  document.addEventListener('click', startGame, true);
  document.addEventListener('touchstart', startGame, true);

  // ── Input: click on canvas ───────────────────────────────────────
  canvas.addEventListener('click', () => {
    if (!started) return;
    if (mode === 'play') {
      dead ? reset() : jump();
    }
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!started) return;
    if (mode === 'play') {
      dead ? reset() : jump();
    }
  }, { passive: false });

  // ── Init ─────────────────────────────────────────────────────────
  resize();
  new ResizeObserver(resizeDebounced).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
