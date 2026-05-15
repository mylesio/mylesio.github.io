/**
 * Dino Runner — uses official Chromium sprite (offline-sprite-1x.png)
 * Auto mode: AI runs forever   |   Play mode: Space/tap to jump
 * Click canvas or press Enter to toggle modes
 *
 * Sprite layout (1x, 1204×68):
 *   TREX base   x:848  y:2   w:44 h:47  (RUNNING frames at +88, +132 from base x)
 *   TREX jump   x:848  y:2   (frame offset 0 = standing pose used for jump)
 *   CACTUS_SM   x:228  y:2   w:17 h:35
 *   CACTUS_LG   x:332  y:2   w:25 h:50
 *   CLOUD       x:86   y:2   w:46 h:14
 *   GROUND      x:2    y:54  w:1200 h:12  (tiled)
 */
(function () {
  const SPRITE_SRC = '/dino-sprite.png';

  // Sprite rects [x, y, w, h]
  const SP = {
    trexRun0:  [936, 2, 44, 47],   // 848+88
    trexRun1:  [980, 2, 44, 47],   // 848+132
    trexJump:  [848, 2, 44, 47],   // standing/jump frame
    trexCrash: [1068, 2, 44, 47],  // 848+220
    cactusS:   [228, 2, 17, 35],
    cactusL:   [332, 2, 25, 50],
    cloud:     [86,  2, 46, 14],
    ground:    [2,  54, 1200, 12],
  };

  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Load sprite
  const img = new Image();
  img.src = SPRITE_SRC;
  let spriteReady = false;
  img.onload = () => { spriteReady = true; };

  // Canvas palette
  const TINT = false; // set true to apply blue tint filter

  // ── Dims ─────────────────────────────────────────────────────────
  let W, H, GY;

  function resize() {
    const parent = canvas.parentElement;
    W = canvas.width  = parent.clientWidth || 800;
    H = canvas.height = 70;
    GY = H - 12;
    dino.y = GY - SP.trexRun0[3];
  }

  // ── Game state ───────────────────────────────────────────────────
  let mode = 'auto';
  let score = 0, hiScore = 0, gameFrame = 0, speed = 5;
  let dead = false, flashT = 0;
  let animFrame = 0, animT = 0;

  const dino = {
    x: 60, y: 0,
    vy: 0,
    jumping: false,
    crashed: false,
  };

  let obstacles = [];
  let nextObs   = 150; // first obstacle spawns after 150 frames — enough time to settle
  let clouds    = [
    { x: 250, y: 10, frame: 0 },
    { x: 520, y: 18, frame: 0 },
    { x: 750, y:  8, frame: 0 },
  ];
  let groundOffset = 0;

  // ── Jump ─────────────────────────────────────────────────────────
  function jump() {
    if (dino.jumping || dead) return;
    dino.vy   = -11;
    dino.jumping = true;
  }

  // ── Reset ────────────────────────────────────────────────────────
  function reset() {
    score = 0; gameFrame = 0; speed = 5;
    obstacles = []; nextObs = 150;
    dead = false; flashT = 0;
    dino.y = GY - SP.trexRun0[3];
    dino.vy = 0;
    dino.jumping = false;
    dino.crashed = false;
    groundOffset = 0;
  }

  // ── Toggle mode ──────────────────────────────────────────────────
  function toggleMode() {
    mode = mode === 'auto' ? 'play' : 'auto';
    reset();
  }

  // ── Sprite draw helper ───────────────────────────────────────────
  function spr([sx, sy, sw, sh], dx, dy, dw, dh) {
    if (!spriteReady) return;
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw ?? sw, dh ?? sh);
  }

  // ── Auto-jump AI ─────────────────────────────────────────────────
  // Lookahead: compute time-to-collision, jump early enough
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const dinoRight = dino.x + 34;   // conservative dino right edge
      const obsLeft   = o.x + 2;
      const dx = obsLeft - dinoRight;
      if (dx < 0) continue;           // already passed

      // Time (frames) to reach obstacle at current speed
      const timeFrames = dx / speed;
      // Jump takes ~20 frames to peak and land; trigger when ~22 frames away
      // Add buffer based on speed: faster = jump earlier
      const triggerDist = 20 + speed * 2;
      if (dx < triggerDist) {
        jump();
        break;
      }
    }
  }

  // ── Collision (AABB with inset) ───────────────────────────────────
  function checkCollision() {
    const dx = 8, dy = 6; // inset
    const dr = dino.x + SP.trexRun0[2] - dx * 2;
    const db = dino.y + SP.trexRun0[3] - dy;
    const dt = dino.y + dy;
    const dl = dino.x + dx;

    for (const o of obstacles) {
      const sp   = o.large ? SP.cactusL : SP.cactusS;
      const cnt  = o.count;
      const ow   = sp[2] * cnt + (cnt - 1) * 2;
      const oh   = sp[3];
      const or_  = o.x + ow - 2;
      const ob   = o.y + oh;
      const ot   = o.y + 4;
      const ol   = o.x + 2;

      if (dl < or_ && dr > ol && dt < ob && db > ot) return true;
    }
    return false;
  }

  // ── Main tick ────────────────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    gameFrame++;

    if (!dead) {
      score  += 0.05;
      speed   = 5 + Math.floor(score / 80) * 0.5;
      speed   = Math.min(speed, 12);
    }
    if (score > hiScore) hiScore = score;

    // Physics
    if (!dead) {
      dino.vy += 0.65;
      dino.y  += dino.vy;
      const floor = GY - SP.trexRun0[3];
      if (dino.y >= floor) {
        dino.y      = floor;
        dino.vy     = 0;
        dino.jumping = false;
      }
    }

    // Walk anim
    animT++;
    if (animT > 6) { animFrame = 1 - animFrame; animT = 0; }

    // Spawn obstacles
    if (!dead) {
      nextObs--;
      if (nextObs <= 0) {
        const large = Math.random() > 0.5;
        const count = 1 + Math.floor(Math.random() * (large ? 2 : 3));
        const sp    = large ? SP.cactusL : SP.cactusS;
        obstacles.push({
          x: W + 20,
          y: GY - sp[3],
          large, count,
        });
        // Gap between obstacles: shrinks as speed increases
        nextObs = Math.max(50, 110 - Math.floor(speed * 5) + Math.floor(Math.random() * 50));
      }
    }

    // Move obstacles
    if (!dead) obstacles.forEach(o => o.x -= speed);
    obstacles = obstacles.filter(o => {
      const sp = o.large ? SP.cactusL : SP.cactusS;
      return o.x + sp[2] * o.count > -20;
    });

    // Move clouds
    clouds.forEach(cl => {
      cl.x -= 0.4;
      if (cl.x + SP.cloud[2] < 0) cl.x = W + 40;
    });

    // Ground scroll
    groundOffset = (groundOffset + speed) % SP.ground[2];

    // AI
    if (mode === 'auto' && !dead) autoJump();

    // Collision
    if (!dead && checkCollision()) {
      dead    = true;
      flashT  = 10;
      dino.crashed = true;
      if (mode === 'auto') setTimeout(reset, 800);
    }
    if (flashT > 0) flashT--;

    // ── Draw ──────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    // Flash on death
    if (flashT > 0) {
      ctx.fillStyle = 'rgba(125,211,252,0.15)';
      ctx.fillRect(0, 0, W, H);
    }

    if (!spriteReady) {
      // Loading placeholder
      ctx.fillStyle = 'rgba(125,211,252,0.3)';
      ctx.fillRect(0, 0, W, H);
      return;
    }

    // Clouds
    clouds.forEach(cl => {
      spr(SP.cloud, cl.x, cl.y);
    });

    // Ground (tiled)
    const gw = SP.ground[2], gh = SP.ground[3];
    const gx0 = -groundOffset;
    for (let gx = gx0; gx < W; gx += gw) {
      spr(SP.ground, gx, GY, gw, gh);
    }

    // Obstacles
    obstacles.forEach(o => {
      const sp = o.large ? SP.cactusL : SP.cactusS;
      for (let i = 0; i < o.count; i++) {
        spr(sp, o.x + i * (sp[2] + 2), o.y);
      }
    });

    // Dino
    let dinoSp;
    if (dino.crashed)      dinoSp = SP.trexCrash;
    else if (dino.jumping) dinoSp = SP.trexJump;
    else                   dinoSp = animFrame === 0 ? SP.trexRun0 : SP.trexRun1;
    spr(dinoSp, dino.x, dino.y);

    // HUD — score
    if (mode === 'play') {
      ctx.fillStyle = '#4a7a9b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      if (hiScore > 0) {
        ctx.fillStyle = '#6b96b4';
        ctx.fillText(`HI ${String(Math.floor(hiScore)).padStart(5,'0')}`, W - 72, 14);
      }
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText(String(Math.floor(score)).padStart(5,'0'), W - 8, 14);
      ctx.textAlign = 'left';
    }

    // Game Over
    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(19,32,46,0.75)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#7dd3fc';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 2);
      ctx.font = '9px monospace';
      ctx.fillStyle = '#4a7a9b';
      ctx.fillText('Space / tap to restart', W / 2, H / 2 + 12);
      ctx.textAlign = 'left';
    }

    // Mode badge
    const badge = mode === 'auto' ? '▶ PLAY' : '⏸ AUTO';
    const bw = 52, bh = 14, bx = W - bw - 6, by = H - bh - 4;
    ctx.fillStyle = 'rgba(125,211,252,0.12)';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(125,211,252,0.55)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(badge, W - 8, by + 10);
    ctx.textAlign = 'left';
  }

  // ── Input ────────────────────────────────────────────────────────
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      // Only prevent default if canvas is in viewport
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom > 0) e.preventDefault();
      if (mode === 'play') { dead ? reset() : jump(); }
    }
    if (e.code === 'Enter') toggleMode();
  });

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // Bottom-right badge area → toggle mode
    if (cx > W - 65 && cy > H - 22) { toggleMode(); return; }
    // Left area (dino zone) → toggle mode
    if (cx < 130) { toggleMode(); return; }
    // Middle area in play mode → jump / restart
    if (mode === 'play') { dead ? reset() : jump(); }
    else toggleMode();
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (mode === 'play') { dead ? reset() : jump(); }
    else toggleMode();
  }, { passive: false });

  // ── Boot ─────────────────────────────────────────────────────────
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
