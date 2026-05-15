/**
 * Dino Runner — Chromium offline-sprite-1x.png
 *
 * Verified sprite coords (measured from actual PNG):
 *   trex_run0:  x=840  y=2   w=57  h=63   (right leg back)
 *   trex_run1:  x=899  y=4   w=41  h=62   (right leg forward)
 *   trex_stand: x=41   y=4   w=45  h=62   (standing / jump pose)
 *   trex_dead:  x=941  y=19  w=59  h=44
 *   cactus_sm:  x=228  y=2   w=20  h=62   (single small cactus)
 *   cactus_lg:  x=332  y=2   w=30  h=64   (single large cactus)
 *   cloud:      x=86   y=2   w=64  h=18
 *   ground:     y=54 (row), tiled
 *
 * Sprite is dark-on-black; we invert to draw on dark banner.
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Load & prepare sprite (invert: black bg → transparent, grey → sky-blue) ──
  const rawImg = new Image();
  rawImg.src = '/dino-sprite.png';

  let spriteCanvas = null;

  rawImg.onload = () => {
    // Draw raw sprite onto offscreen canvas, then recolor
    const oc = document.createElement('canvas');
    oc.width  = rawImg.naturalWidth;
    oc.height = rawImg.naturalHeight;
    const octx = oc.getContext('2d');
    octx.drawImage(rawImg, 0, 0);

    const idata = octx.getImageData(0, 0, oc.width, oc.height);
    const d = idata.data;
    // Original: bg=black(0,0,0), content=grey(83,83,83) or white(247,247,247)
    // Remap: black → transparent; grey/white → sky-blue (#7dd3fc = 125,211,252)
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      if (r < 20 && g < 20 && b < 20) {
        // black background → transparent
        d[i+3] = 0;
      } else {
        // content → sky blue
        d[i]   = 125;
        d[i+1] = 211;
        d[i+2] = 252;
        d[i+3] = 230;
      }
    }
    octx.putImageData(idata, 0, 0);
    spriteCanvas = oc;
  };

  // ── Sprite rects [x, y, w, h] ────────────────────────────────────
  const SP = {
    run0:   [840, 2,  57, 63],
    run1:   [899, 4,  41, 62],
    stand:  [ 41, 4,  45, 62],
    dead:   [941, 19, 59, 44],
    cactS:  [228, 2,  20, 62],
    cactL:  [332, 2,  30, 64],
    cloud:  [ 86, 2,  64, 18],
  };

  // Normalised dino display size (scale to fit 47px tall)
  const DINO_H = 47;
  const DINO_SCALE = DINO_H / SP.run0[3]; // ~0.75
  const DINO_W = Math.round(SP.run0[2] * DINO_SCALE); // display width

  // ── Canvas dims ───────────────────────────────────────────────────
  let W, H, GY;

  function resize() {
    W = canvas.width  = canvas.parentElement.clientWidth || 800;
    H = canvas.height = 68;
    GY = H - 10;
    dino.y = GY - DINO_H;
  }

  // ── State ─────────────────────────────────────────────────────────
  let mode = 'auto'; // 'auto' | 'play'
  let score = 0, hiScore = 0, speed = 5;
  let gFrame = 0;
  let dead = false, flashT = 0;
  let animF = 0, animT = 0;
  let groundOffset = 0;

  const dino = { x: 60, y: 0, vy: 0, jumping: false, crashed: false };
  let obstacles = [];
  let nextObs = 150;
  let clouds = [
    { x: 200, y: 6  },
    { x: 480, y: 12 },
    { x: 720, y: 5  },
  ];

  // ── Helpers ───────────────────────────────────────────────────────
  function jump() {
    if (dino.jumping || dead) return;
    dino.vy = -11.5;
    dino.jumping = true;
  }

  function reset() {
    score = 0; gFrame = 0; speed = 5;
    obstacles = []; nextObs = 150;
    dead = false; flashT = 0;
    dino.y = GY - DINO_H;
    dino.vy = 0; dino.jumping = false; dino.crashed = false;
    groundOffset = 0;
  }

  function toggleMode() {
    mode = mode === 'auto' ? 'play' : 'auto';
    reset();
  }

  // ── Sprite draw ───────────────────────────────────────────────────
  function spr([sx, sy, sw, sh], dx, dy, dw, dh) {
    if (!spriteCanvas) return;
    ctx.drawImage(spriteCanvas, sx, sy, sw, sh, dx, dy, dw ?? sw, dh ?? sh);
  }

  // ── AI auto-jump ──────────────────────────────────────────────────
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obstacles) {
      const dinoRight = dino.x + DINO_W - 8;
      const obsLeft   = o.x + 2;
      const dx = obsLeft - dinoRight;
      if (dx < 0) continue;
      if (dx < 22 + speed * 2.5) { jump(); break; }
    }
  }

  // ── Collision ─────────────────────────────────────────────────────
  function checkHit() {
    const inset = 7;
    const dl = dino.x + inset, dr = dino.x + DINO_W - inset;
    const dt = dino.y + inset, db = dino.y + DINO_H - 4;
    for (const o of obstacles) {
      const sp = o.large ? SP.cactL : SP.cactS;
      const scale = o.large ? 1 : 0.9;
      const ow = Math.round(sp[2] * scale);
      const oh = Math.round(sp[3] * scale);
      const ol = o.x + 2, or_ = o.x + ow - 2;
      const ot = o.y + 4, ob  = o.y + oh;
      if (dl < or_ && dr > ol && dt < ob && db > ot) return true;
    }
    return false;
  }

  // ── Ground draw ───────────────────────────────────────────────────
  function drawGround() {
    // Simple line + dots (no ground sprite needed)
    ctx.strokeStyle = 'rgba(125,211,252,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, GY); ctx.lineTo(W, GY); ctx.stroke();
    ctx.fillStyle = 'rgba(125,211,252,0.2)';
    for (let x = (-groundOffset % 20); x < W; x += 20) {
      ctx.fillRect(x, GY + 2, 3, 1);
      ctx.fillRect(x + 10, GY + 4, 2, 1);
    }
  }

  // ── Main loop ─────────────────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    gFrame++;
    if (!dead) {
      score += 0.05;
      speed = Math.min(5 + Math.floor(score / 80) * 0.5, 12);
    }
    if (score > hiScore) hiScore = score;

    // Physics
    if (!dead) {
      dino.vy += 0.65;
      dino.y  += dino.vy;
      const floor = GY - DINO_H;
      if (dino.y >= floor) { dino.y = floor; dino.vy = 0; dino.jumping = false; }
    }

    // Walk anim
    animT++;
    if (animT > 6) { animF = 1 - animF; animT = 0; }

    // Spawn
    if (!dead && --nextObs <= 0) {
      const large = Math.random() > 0.55;
      const sp = large ? SP.cactL : SP.cactS;
      const scale = large ? 1 : 0.9;
      obstacles.push({ x: W + 20, y: GY - Math.round(sp[3] * scale), large });
      nextObs = Math.max(55, 115 - Math.floor(speed * 5) + Math.floor(Math.random() * 55));
    }

    // Move
    if (!dead) {
      obstacles.forEach(o => o.x -= speed);
      groundOffset += speed;
    }
    obstacles = obstacles.filter(o => o.x > -60);
    clouds.forEach(cl => { cl.x -= 0.4; if (cl.x + SP.cloud[2] < 0) cl.x = W + 40; });

    // AI
    if (mode === 'auto') autoJump();

    // Collision
    if (!dead && checkHit()) {
      dead = true; flashT = 10; dino.crashed = true;
      if (mode === 'auto') setTimeout(reset, 800);
    }
    if (flashT > 0) flashT--;

    // ── Draw ──────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    if (flashT > 0) {
      ctx.fillStyle = 'rgba(125,211,252,0.12)';
      ctx.fillRect(0, 0, W, H);
    }

    // Clouds
    clouds.forEach(cl => spr(SP.cloud, cl.x, cl.y));

    drawGround();

    // Obstacles
    obstacles.forEach(o => {
      const sp = o.large ? SP.cactL : SP.cactS;
      const scale = o.large ? 1 : 0.9;
      const dw = Math.round(sp[2] * scale);
      const dh = Math.round(sp[3] * scale);
      spr(sp, o.x, o.y, dw, dh);
    });

    // Dino
    const dinoSp = dino.crashed ? SP.dead
                 : dino.jumping  ? SP.stand
                 :                (animF === 0 ? SP.run0 : SP.run1);
    spr(dinoSp, dino.x, dino.y, DINO_W, DINO_H);

    // HUD
    if (mode === 'play') {
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      if (hiScore > 0) {
        ctx.fillStyle = 'rgba(125,211,252,0.45)';
        ctx.fillText(`HI ${String(Math.floor(hiScore)).padStart(5,'0')}`, W - 70, 14);
      }
      ctx.fillStyle = 'rgba(125,211,252,0.85)';
      ctx.fillText(String(Math.floor(score)).padStart(5,'0'), W - 8, 14);
      ctx.textAlign = 'left';
    }

    // Game Over
    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(19,32,46,0.78)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(125,211,252,0.9)';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W/2, H/2 - 2);
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(125,211,252,0.5)';
      ctx.fillText('Space / tap to restart', W/2, H/2 + 11);
      ctx.textAlign = 'left';
    }

    // Mode badge
    const label = mode === 'auto' ? '▶ PLAY' : '⏸ AUTO';
    const bw = 50, bh = 13, bx = W - bw - 6, by = H - bh - 3;
    ctx.fillStyle = 'rgba(125,211,252,0.1)';
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 3); ctx.fill();
    ctx.fillStyle = 'rgba(125,211,252,0.45)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(label, W - 8, by + 9);
    ctx.textAlign = 'left';
  }

  // ── Input ─────────────────────────────────────────────────────────
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      const r = canvas.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) e.preventDefault();
      if (mode === 'play') dead ? reset() : jump();
    }
    if (e.code === 'Enter') toggleMode();
  });

  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    if (cy > H - 20 || cx < 130) { toggleMode(); return; }
    if (mode === 'play') dead ? reset() : jump();
    else toggleMode();
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (mode === 'play') dead ? reset() : jump();
    else toggleMode();
  }, { passive: false });

  // ── Init ──────────────────────────────────────────────────────────
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement);
  requestAnimationFrame(tick);
})();
