/**
 * Dino Runner — main thread coordinator
 * Rendering runs in dino-worker.js via OffscreenCanvas.
 * This file handles: DOM interaction, hitArea, scroll, resize, idle pos.
 */
(function () {
  const canvas = document.getElementById('dino-canvas');
  if (!canvas) return;

  // ── OffscreenCanvas support check ────────────────────────────────
  if (!canvas.transferControlToOffscreen) {
    // Fallback: load classic dino.js behavior inline (not implemented here)
    console.warn('OffscreenCanvas not supported, game unavailable');
    return;
  }

  const NAVBAR_H = 48;
  const TREX_H = 47, TREX_W = 44;
  const IDLE_SCALE = 22 / TREX_H;
  const IDLE_DW = Math.round(TREX_W * IDLE_SCALE);
  const IDLE_DH = Math.round(TREX_H * IDLE_SCALE);

  let IDLE_X = 24;
  let IDLE_Y = Math.round((NAVBAR_H - IDLE_DH) / 2);
  let started = false;
  let jumping = false;

  // ── Spawn worker ─────────────────────────────────────────────────
  const worker = new Worker('/dino-worker.js');
  const offscreen = canvas.transferControlToOffscreen();

  worker.postMessage({
    type: 'init',
    canvas: offscreen,
    width: canvas.parentElement.clientWidth || window.innerWidth,
  }, [offscreen]);

  // ── Worker messages ───────────────────────────────────────────────
  worker.onmessage = function(e) {
    if (e.data.type === 'intro-done') {
      // Dino landed — expand header, shift canvas z so navbar covers it
      const siteHeader = canvas.closest('.site-header');
      if (siteHeader) siteHeader.classList.add('expanded');
      canvas.style.zIndex = '5';
      started = true;
      jumping = false;
    }
  };

  // ── Idle pos: computed from anchor element ────────────────────────
  function getIdlePos() {
    const anchor = document.getElementById('dino-anchor');
    const isMobile = window.innerWidth < 640;
    const y = Math.round((NAVBAR_H - IDLE_DH) / 2) + (isMobile ? 9 : 0);
    if (!anchor) return { x: 24, y };
    const ar = anchor.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    const x = Math.round(ar.left - cr.left + 2);
    return { x: Math.max(4, x), y };
  }

  function sendIdlePos() {
    const p = getIdlePos();
    IDLE_X = p.x; IDLE_Y = p.y;
    worker.postMessage({ type: 'idle-pos', x: IDLE_X, y: IDLE_Y });
    updateHitArea();
  }

  // ── Resize ───────────────────────────────────────────────────────
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const w = canvas.parentElement.clientWidth || window.innerWidth;
      worker.postMessage({ type: 'resize', width: w });
      sendIdlePos();
    }, 100);
  }
  new ResizeObserver(onResize).observe(canvas.parentElement);

  // ── Gamepad cursor ────────────────────────────────────────────────
  const GAMEPAD_CURSOR = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='22' viewBox='0 0 32 22'><rect x='2' y='5' width='28' height='13' rx='6' fill='%23444'/><rect x='6' y='9' width='2' height='6' rx='1' fill='white'/><rect x='4' y='11' width='6' height='2' rx='1' fill='white'/><circle cx='22' cy='10' r='2' fill='white'/><circle cx='26' cy='13' r='2' fill='white'/></svg>") 16 11, pointer`;

  // ── HitArea ───────────────────────────────────────────────────────
  const hitArea = document.createElement('div');
  hitArea.id = 'dino-hit-area';
  hitArea.title = 'Click to open game zone';
  hitArea.style.cssText = 'position:absolute;z-index:21;cursor:pointer;pointer-events:auto;';
  canvas.parentElement.appendChild(hitArea);

  function updateHitArea() {
    if (!started && !jumping) {
      const rect = canvas.getBoundingClientRect();
      const parentRect = canvas.parentElement.getBoundingClientRect();
      const sx = rect.width / (canvas.width || rect.width);
      const sy = rect.height / (canvas.height || rect.height);
      const pad = 8;
      const w = (IDLE_DW + pad * 2) * sx;
      const h = (IDLE_DH + pad * 2) * sy;
      const left = (IDLE_X - pad) * sx + rect.left - parentRect.left;
      const top  = (IDLE_Y - pad) * sy + rect.top  - parentRect.top;
      hitArea.style.left = left + 'px';
      hitArea.style.top  = top  + 'px';
      hitArea.style.width  = Math.max(w, 36) + 'px';
      hitArea.style.height = Math.max(h, 36) + 'px';
      hitArea.style.display = 'block';
      hitArea.style.cursor = GAMEPAD_CURSOR;
    } else {
      hitArea.style.display = 'none';
    }
  }

  // ── Start game ────────────────────────────────────────────────────
  function startGame() {
    if (started || jumping) return;
    sendIdlePos();
    jumping = true;
    worker.postMessage({ type: 'start' });

    const siteHeader = canvas.closest('.site-header');
    if (siteHeader) siteHeader.classList.add('expanded');
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = GAMEPAD_CURSOR;
    hitArea.style.display = 'none';

    scrollCooldown = true;
    lastScrollY = window.scrollY || 0;
    setTimeout(() => { scrollCooldown = false; lastScrollY = window.scrollY || 0; }, 600);
  }

  hitArea.addEventListener('click', startGame);
  hitArea.addEventListener('touchstart', (e) => { e.preventDefault(); startGame(); }, { passive: false });

  // ── In-game click ─────────────────────────────────────────────────
  canvas.addEventListener('click', () => {
    if (!started) return;
    worker.postMessage({ type: 'click' });
  });
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (!started) return;
    worker.postMessage({ type: 'click' });
  }, { passive: false });

  // ── Collapse ──────────────────────────────────────────────────────
  function collapseToIdle() {
    if (!started && !jumping) return;
    started = false; jumping = false;
    worker.postMessage({ type: 'collapse' });

    const siteHeader = canvas.closest('.site-header');
    if (siteHeader) siteHeader.classList.remove('expanded');

    canvas.style.zIndex = '20';
    canvas.style.pointerEvents = 'none';
    canvas.style.cursor = 'default';
    updateHitArea();
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

  // ── Init ──────────────────────────────────────────────────────────
  function initIdlePos() {
    sendIdlePos();
  }

  if (document.readyState === 'complete') {
    initIdlePos();
  } else {
    window.addEventListener('load', initIdlePos);
  }
  setTimeout(initIdlePos, 300);
})();
