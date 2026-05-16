/**
 * Dino Runner — OffscreenCanvas Worker
 * Runs the entire game loop in a Web Worker, independent of main thread.
 */

// ── Sprite coords ────────────────────────────────────────────────
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

const CANVAS_H = 170;
const NAVBAR_H = 48;
const GY = CANVAS_H - 16;

const IDLE_SCALE = 22 / TREX_H;
const IDLE_DW = Math.round(TREX_W * IDLE_SCALE);
const IDLE_DH = Math.round(TREX_H * IDLE_SCALE);

const GAME_X = 60;
const GAME_Y = GY - D_H;
const FRAME_MS = 1000 / 12;
const INTRO_DURATION = 600;

// ── State ────────────────────────────────────────────────────────
let canvas = null;
let ctx = null;
let spr = null;
let sprLoaded = false;

let W = 800;
let started = false;
let jumping = false;
let mode = 'auto';
let score = 0, hiScore = 0, speed = 5, gFrame = 0;
let dead = false, flashT = 0;
let frameIdx = 0, frameTimer = 0;
let lastTs = 0, groundOff = 0;
let fpsFrames = 0, fpsLast = 0, fpsDisplay = 0;

let IDLE_X = 24;
let IDLE_Y = Math.round((NAVBAR_H - IDLE_DH) / 2);

const dino = { x: IDLE_X, y: IDLE_Y, vy: 0, jumping: false };
let obstacles = [], nextObs = 180;
let clouds = [
  { x: 160, y: 30 }, { x: 380, y: 22 }, { x: 600, y: 38 }, { x: 820, y: 18 },
];

let introT = 0, introStartX = IDLE_X, introStartY = IDLE_Y;

// ── Helpers ──────────────────────────────────────────────────────
function drawTrex(offset, dx, dy) {
  if (!sprLoaded) return;
  ctx.drawImage(spr, TREX_BASE_X + offset, TREX_BASE_Y, TREX_W, TREX_H, dx, dy, D_W, D_H);
}

function drawSpr(s, dx, dy, dw, dh) {
  if (!sprLoaded) return;
  ctx.drawImage(spr, s.x, s.y, s.w, s.h, dx, dy, dw, dh);
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
    dino.x = GAME_X; dino.y = GAME_Y; dino.vy = 0; dino.jumping = false;
    jumping = false; started = true;
    self.postMessage({ type: 'intro-done' });
  }
}

// ── Main loop ────────────────────────────────────────────────────
function tick(ts) {
  self.requestAnimationFrame(tick);
  const dt = Math.min(ts - (lastTs || ts), 50);
  lastTs = ts;

  ctx.clearRect(0, 0, W, CANVAS_H);

  // IDLE
  if (!started && !jumping) {
    if (sprLoaded) {
      ctx.drawImage(spr,
        TREX_BASE_X + TREX_FRAMES.run[0], TREX_BASE_Y, TREX_W, TREX_H,
        dino.x, dino.y, IDLE_DW, IDLE_DH);
    }
    return;
  }

  // INTRO
  if (jumping) {
    tickIntro(dt);
    drawGround();
    drawTrex(TREX_FRAMES.run[frameIdx], dino.x, dino.y);
    return;
  }

  // GAME
  if (!dead) {
    score += dt * 0.003;
    speed = Math.min(5 + Math.floor(score / 100) * 0.5, 14);
  }
  if (score > hiScore) hiScore = score;

  if (!dead) {
    dino.vy += 0.65;
    dino.y  += dino.vy;
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

  if (flashT > 0) { ctx.fillStyle = 'rgba(83,83,83,0.05)'; ctx.fillRect(0, 0, W, CANVAS_H); }

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

  // Score
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
    ctx.fillStyle = 'rgba(245,242,236,0.85)'; ctx.fillRect(0, 0, W, CANVAS_H);
    const centerY = CANVAS_H / 2 + 10;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(83,83,83,0.9)'; ctx.font = 'bold 13px monospace';
    ctx.fillText('GAME OVER', W / 2, centerY - 4);
    ctx.font = '10px monospace'; ctx.fillStyle = 'rgba(83,83,83,0.45)';
    ctx.fillText('click to restart', W / 2, centerY + 14);
    ctx.textAlign = 'left';
  }
}

// ── Message handler ──────────────────────────────────────────────
self.onmessage = function(e) {
  const msg = e.data;

  if (msg.type === 'init') {
    canvas = msg.canvas;
    ctx = canvas.getContext('2d');
    W = msg.width;
    canvas.width = W;
    canvas.height = CANVAS_H;

    // Load sprite via fetch + createImageBitmap (no Image() in Worker)
    fetch('/dino-sprite-white.png')
      .then(r => r.blob())
      .then(b => createImageBitmap(b))
      .then(bmp => {
        spr = bmp;
        sprLoaded = true;
        self.requestAnimationFrame(tick);
      });
    return;
  }

  if (msg.type === 'resize') {
    W = msg.width;
    if (canvas) { canvas.width = W; canvas.height = CANVAS_H; }
    return;
  }

  if (msg.type === 'idle-pos') {
    IDLE_X = msg.x; IDLE_Y = msg.y;
    if (!started && !jumping) { dino.x = IDLE_X; dino.y = IDLE_Y; }
    return;
  }

  if (msg.type === 'start') {
    if (started || jumping) return;
    introStartX = IDLE_X; introStartY = IDLE_Y;
    jumping = true; introT = 0;
    return;
  }

  if (msg.type === 'click') {
    if (!started) return;
    if (dead) { reset(); return; }
    if (mode === 'auto') { mode = 'play'; } else { jump(); }
    return;
  }

  if (msg.type === 'collapse') {
    started = false; jumping = false; dead = false;
    score = 0; hiScore = 0; speed = 5;
    obstacles = []; nextObs = 180;
    flashT = 0; groundOff = 0; frameIdx = 0; frameTimer = 0;
    mode = 'auto';
    dino.x = IDLE_X; dino.y = IDLE_Y; dino.vy = 0; dino.jumping = false;
    return;
  }
};
