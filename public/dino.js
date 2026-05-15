/**
 * Dino Runner — banner component
 * Auto mode: dino runs forever, AI jumps automatically
 * Interactive mode: click/space/tap to jump, score tracked
 * Click dino or press Enter to toggle modes
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Colors (matches banner palette) ──────────────────────────────
  const C = {
    ground:  '#2a4a6b',
    dino:    '#7dd3fc',
    obs:     '#4ba8d8',
    score:   '#4a7a9b',
    scoreHi: '#7dd3fc',
    mode:    '#2a4a6b',
    modeTxt: '#7dd3fc',
    flash:   'rgba(125,211,252,0.15)',
  };

  // ── State ─────────────────────────────────────────────────────────
  let W, H, GY; // canvas dims, ground Y
  let mode = 'auto'; // 'auto' | 'play'
  let score = 0, hiScore = 0, frame = 0, speed = 3.5;
  let dead = false, flashT = 0;

  // Dino
  const dino = { x: 60, y: 0, vy: 0, w: 22, h: 26, jumping: false, frame: 0, frameT: 0 };

  // Obstacles
  let obs = [];
  let nextObs = 90;

  // Clouds (decorative)
  let clouds = [
    { x: 200, y: 12, w: 40, spd: 0.3 },
    { x: 420, y: 18, w: 28, spd: 0.2 },
    { x: 600, y: 8,  w: 50, spd: 0.25 },
  ];

  // ── Resize ────────────────────────────────────────────────────────
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = Math.min(rect.width, 900);
    H = canvas.height = 56;
    GY = H - 10; // ground y
    dino.y = GY - dino.h;
  }

  // ── Jump ─────────────────────────────────────────────────────────
  function jump() {
    if (dino.jumping) return;
    dino.vy = -9.2;
    dino.jumping = true;
  }

  // ── Reset game ───────────────────────────────────────────────────
  function reset() {
    score = 0; frame = 0; speed = 3.5;
    obs = []; nextObs = 90;
    dead = false;
    dino.y = GY - dino.h;
    dino.vy = 0;
    dino.jumping = false;
  }

  // ── Toggle mode ──────────────────────────────────────────────────
  function toggleMode() {
    mode = mode === 'auto' ? 'play' : 'auto';
    reset();
  }

  // ── Draw dino (pixel art, 2 walk frames + jump) ──────────────────
  function drawDino(x, y, frameIdx, isJump) {
    ctx.fillStyle = C.dino;
    const s = 2; // pixel scale

    // Body pixels [col, row] in a 11×13 grid
    const body = [
      [3,0],[4,0],[5,0],[6,0],[7,0],[8,0],
      [2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
      [2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
      [2,3],[3,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],
      [2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],
      [1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],
      [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],
      [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],
      [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],
      [2,9],[3,9],[4,9],[5,9],
      [2,10],[3,10],[4,10],[5,10],
    ];

    // Eye
    const eye = [[7,1]];

    // Legs — 2 walk frames
    const legs0 = [[3,11],[3,12],[5,11]];
    const legs1 = [[3,11],[5,11],[5,12]];
    const legsJump = [[2,11],[4,11],[2,12],[4,12]];

    body.forEach(([c, r]) => {
      ctx.fillRect(x + c * s, y + r * s, s, s);
    });
    ctx.fillStyle = C.mode; // eye is dark
    eye.forEach(([c, r]) => {
      ctx.fillRect(x + c * s, y + r * s, s, s);
    });
    ctx.fillStyle = C.dino;
    const legPx = isJump ? legsJump : (frameIdx === 0 ? legs0 : legs1);
    legPx.forEach(([c, r]) => {
      ctx.fillRect(x + c * s, y + r * s, s, s);
    });
  }

  // ── Draw cactus ──────────────────────────────────────────────────
  function drawCactus(x, y, h) {
    ctx.fillStyle = C.obs;
    const s = 2;
    // Stem
    for (let i = 0; i < h; i++) ctx.fillRect(x + 4, y + i * s, s * 3, s);
    // Arms
    ctx.fillRect(x,     y + 4,  s * 4, s * 2);
    ctx.fillRect(x + 8, y + 6,  s * 4, s * 2);
    ctx.fillRect(x,     y + 2,  s * 2, s * 4);
    ctx.fillRect(x + 10,y + 4,  s * 2, s * 4);
  }

  // ── Draw ground ──────────────────────────────────────────────────
  function drawGround() {
    ctx.strokeStyle = C.ground;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GY);
    ctx.lineTo(W, GY);
    ctx.stroke();

    // ground texture dots
    ctx.fillStyle = C.ground;
    for (let i = (frame * speed % 20); i < W; i += 20) {
      ctx.fillRect(i, GY + 2, 3, 1);
      ctx.fillRect(i + 10, GY + 4, 2, 1);
    }
  }

  // ── Draw clouds ──────────────────────────────────────────────────
  function drawClouds() {
    ctx.fillStyle = 'rgba(125,211,252,0.08)';
    clouds.forEach(cl => {
      ctx.beginPath();
      ctx.ellipse(cl.x, cl.y, cl.w / 2, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ── Draw score / mode badge ───────────────────────────────────────
  function drawHUD() {
    if (mode === 'play') {
      ctx.fillStyle = C.scoreHi;
      ctx.font = '9px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${String(Math.floor(score)).padStart(5,'0')}`, W - 8, 14);
      if (hiScore > 0) {
        ctx.fillStyle = C.score;
        ctx.fillText(`HI ${String(Math.floor(hiScore)).padStart(5,'0')}`, W - 65, 14);
      }
    }

    // Mode toggle hint
    ctx.fillStyle = mode === 'auto' ? 'rgba(125,211,252,0.18)' : 'rgba(125,211,252,0.28)';
    ctx.beginPath();
    ctx.roundRect(W - (mode === 'auto' ? 78 : 68), H - 18, mode === 'auto' ? 70 : 60, 13, 3);
    ctx.fill();
    ctx.fillStyle = C.modeTxt;
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(mode === 'auto' ? '▶ PLAY MODE' : '⏸ AUTO MODE', W - 6, H - 8);

    ctx.textAlign = 'left';
  }

  // ── Auto-jump AI: looks ahead for nearest obstacle ───────────────
  function autoJump() {
    if (dead || dino.jumping) return;
    for (const o of obs) {
      const dx = o.x - (dino.x + dino.w);
      if (dx > 0 && dx < 90 + speed * 8) {
        // jump if we'd collide
        const timeToReach = dx / speed;
        if (timeToReach < 22) jump();
        break;
      }
    }
  }

  // ── Collision ────────────────────────────────────────────────────
  function checkCollision() {
    for (const o of obs) {
      if (
        dino.x + 4 < o.x + o.w - 2 &&
        dino.x + dino.w - 4 > o.x + 2 &&
        dino.y + 4 < o.y + o.h &&
        dino.y + dino.h > o.y + 2
      ) return true;
    }
    return false;
  }

  // ── Main loop ────────────────────────────────────────────────────
  let raf;
  function tick() {
    frame++;
    if (!dead) score += 0.1;
    if (score > hiScore) hiScore = score;
    speed = 3.5 + Math.floor(score / 100) * 0.4;

    // Physics
    if (!dead) {
      dino.vy += 0.55; // gravity
      dino.y += dino.vy;
      if (dino.y >= GY - dino.h) {
        dino.y = GY - dino.h;
        dino.vy = 0;
        dino.jumping = false;
      }
    }

    // Walk animation
    dino.frameT++;
    if (dino.frameT > 7) { dino.frame = 1 - dino.frame; dino.frameT = 0; }

    // Spawn obstacles
    nextObs--;
    if (nextObs <= 0 && !dead) {
      const h = 12 + Math.floor(Math.random() * 10);
      obs.push({ x: W + 10, y: GY - h * 2, w: 14, h: h * 2 });
      nextObs = 70 + Math.floor(Math.random() * 60) - Math.floor(speed * 3);
    }

    // Move obstacles
    obs = obs.filter(o => o.x + o.w > -10);
    if (!dead) obs.forEach(o => o.x -= speed);

    // Move clouds
    clouds.forEach(cl => {
      cl.x -= cl.spd;
      if (cl.x + cl.w < 0) cl.x = W + cl.w;
    });

    // Auto mode: AI jumps
    if (mode === 'auto') autoJump();

    // Collision
    if (!dead && checkCollision()) {
      dead = true;
      flashT = 8;
      if (mode === 'auto') setTimeout(reset, 600);
    }

    if (flashT > 0) flashT--;

    // ── Draw ──────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    if (flashT > 0) {
      ctx.fillStyle = C.flash;
      ctx.fillRect(0, 0, W, H);
    }

    drawClouds();
    drawGround();

    // Draw obstacles
    obs.forEach(o => drawCactus(o.x, o.y, o.h / 2));

    // Draw dino
    drawDino(dino.x, dino.y, dino.frame, dino.jumping);

    // Dead screen (play mode)
    if (dead && mode === 'play') {
      ctx.fillStyle = 'rgba(125,211,252,0.9)';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER  — press Space or tap to restart', W / 2, H / 2 + 3);
      ctx.textAlign = 'left';
    }

    drawHUD();

    raf = requestAnimationFrame(tick);
  }

  // ── Input ────────────────────────────────────────────────────────
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (mode === 'play') {
        if (dead) reset();
        else jump();
      }
    }
    if (e.code === 'Enter') toggleMode();
  });

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // Click on mode badge → toggle
    if (cy > H - 20) { toggleMode(); return; }
    // Click on dino area → toggle or jump
    if (cx < 120) { toggleMode(); return; }
    if (mode === 'play') {
      if (dead) reset();
      else jump();
    }
  });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (mode === 'play') {
      if (dead) reset();
      else jump();
    } else {
      toggleMode();
    }
  }, { passive: false });

  // ── Init ─────────────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', () => { resize(); });
  tick();
})();
