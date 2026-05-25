/* ============================================================
   animations.js — Hero canvas & IntersectionObserver reveals
   ============================================================ */

'use strict';

/* ============================================================
   1. HERO CANVAS — Animated dot grid with subtle movement
   ============================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const COLOR  = '#00bfae';
  const DOT_R  = 1.2;
  const SPACING = 36;
  let   W, H, cols, rows, dots, raf;

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    cols = Math.ceil(W / SPACING) + 1;
    rows = Math.ceil(H / SPACING) + 1;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x:     c * SPACING,
          y:     r * SPACING,
          ox:    c * SPACING,    // origin x
          oy:    r * SPACING,    // origin y
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.4,
          amp:   2 + Math.random() * 3,
        });
      }
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    const time = t * 0.001;

    for (const d of dots) {
      const x = d.ox + Math.sin(time * d.speed + d.phase) * d.amp;
      const y = d.oy + Math.cos(time * d.speed + d.phase + 1) * d.amp;

      // Distance from centre — dots near centre are brighter
      const cx = W / 2;
      const cy = H / 2;
      const dist = Math.hypot(x - cx, y - cy);
      const maxDist = Math.hypot(cx, cy);
      const alpha = 0.08 + 0.18 * (1 - dist / maxDist);

      ctx.beginPath();
      ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = COLOR;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  // Stop animation when hero is not visible (performance)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }, { threshold: 0.01 });

  const hero = document.getElementById('hero');
  if (hero) observer.observe(hero);

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  resize();
  raf = requestAnimationFrame(draw);
})();

/* ============================================================
   2. SCROLL REVEAL — IntersectionObserver for .reveal elements
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px',
  });

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   3. HERO ENTRY — Trigger .reveal-hero animations on load
   ============================================================ */
(function initHeroEntrance() {
  const items = document.querySelectorAll('.reveal-hero');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    items.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  // Small delay so fonts are loaded before animating
  window.addEventListener('load', () => {
    items.forEach(el => el.classList.add('animated'));
  });

  // Fallback if load already fired
  if (document.readyState === 'complete') {
    items.forEach(el => el.classList.add('animated'));
  }
})();

/* ============================================================
   4. BUTTON RIPPLE EFFECT
   ============================================================ */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${x}px;
        top:    ${y}px;
      `;

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();
