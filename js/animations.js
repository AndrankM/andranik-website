/* ============================================================
   animations.js — Hero canvas & IntersectionObserver reveals
   ============================================================ */

'use strict';

/* ============================================================
   1. HERO CANVAS — Particle network with mouse interaction
   ============================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Config
  const PARTICLE_COUNT = 88;
  const MAX_DIST       = 150;   // px — max distance to draw a line
  const SPEED          = 0.45;
  const MOUSE_RADIUS   = 120;   // px — mouse repulsion radius
  const MOUSE_FORCE    = 2.2;

  const COLOR_TEAL  = { r: 0,   g: 204, b: 143 };
  const COLOR_AMBER = { r: 230, g: 168, b: 23  };

  let W, H, particles, raf;
  let mouse = { x: -9999, y: -9999 };

  // ---- Build ----
  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    buildParticles();
  }

  function buildParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const isTeal = Math.random() > 0.18; // ~82% teal, ~18% amber
      const c = isTeal ? COLOR_TEAL : COLOR_AMBER;
      const angle = Math.random() * Math.PI * 2;
      const speed = SPEED * (0.5 + Math.random() * 0.8);
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r:  1.2 + Math.random() * 2.2,
        c,
      };
    });
  }

  // ---- Draw ----
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move & wrap
    for (const p of particles) {
      // Mouse repulsion
      const mdx  = p.x - mouse.x;
      const mdy  = p.y - mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < MOUSE_RADIUS && mdist > 0) {
        const force = (1 - mdist / MOUSE_RADIUS) * MOUSE_FORCE;
        p.vx += (mdx / mdist) * force * 0.06;
        p.vy += (mdy / mdist) * force * 0.06;
      }

      // Speed cap
      const spd = Math.hypot(p.vx, p.vy);
      const maxSpd = SPEED * 1.8;
      if (spd > maxSpd) {
        p.vx = (p.vx / spd) * maxSpd;
        p.vy = (p.vy / spd) * maxSpd;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Soft wrap
      if (p.x < -10)    p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10)    p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.38;
          const c = particles[i].c;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      const { r, g, b } = p.c;

      // Glow halo
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grd.addColorStop(0,   `rgba(${r},${g},${b},0.35)`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  // ---- Mouse tracking ----
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  // ---- Visibility (pause when off-screen) ----
  const visObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }, { threshold: 0.01 });

  if (hero) visObserver.observe(hero);

  window.addEventListener('resize', resize, { passive: true });

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
