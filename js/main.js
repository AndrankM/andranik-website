/* ============================================================
   main.js — Navigation, scroll spy, profile image, contact form
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — Scroll state & mobile toggle
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');
  if (!navbar || !toggle || !navLinks) return;

  // Scroll → add .scrolled class
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  function openNav() {
    navLinks.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (overlay) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => overlay.classList.add('visible'));
    }
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('visible');
      overlay.addEventListener('transitionend', () => {
        if (!overlay.classList.contains('visible')) overlay.style.display = '';
      }, { once: true });
    }
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });

  if (overlay) overlay.addEventListener('click', closeNav);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeNav();
  });
})();

/* ============================================================
   2. SCROLL SPY — Highlight active nav link
   ============================================================ */
(function initScrollSpy() {
  const links    = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(links)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  function setActive() {
    const scrollY  = window.scrollY;
    const navH     = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - navH - 60;
      if (scrollY >= top) currentId = sec.id;
    });

    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ============================================================
   3. PROFILE IMAGE — Show/hide placeholder
   ============================================================ */
(function initProfileImage() {
  const img         = document.getElementById('profileImg');
  const placeholder = document.getElementById('imgPlaceholder');
  if (!img || !placeholder) return;

  img.addEventListener('load', () => {
    img.classList.add('loaded');
    placeholder.style.display = 'none';
  });

  img.addEventListener('error', () => {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  });

  // If browser cached the image and load already fired
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
    placeholder.style.display = 'none';
  }
})();

/* ============================================================
   4. CONTACT FORM — Validation & mailto submission
   ============================================================ */
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  // Simple email regex for front-end validation
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function getField(id)      { return document.getElementById(id); }
  function getError(id)      { return document.getElementById(`${id}Error`); }

  function showError(id, msg) {
    const input = getField(id);
    const error = getError(id);
    if (input)  input.classList.add('invalid');
    if (error)  error.textContent = msg;
  }

  function clearError(id) {
    const input = getField(id);
    const error = getError(id);
    if (input)  input.classList.remove('invalid');
    if (error)  error.textContent = '';
  }

  function validate() {
    let valid = true;

    const nameVal    = getField('name')?.value.trim()    ?? '';
    const emailVal   = getField('email')?.value.trim()   ?? '';
    const messageVal = getField('message')?.value.trim() ?? '';

    clearError('name');
    clearError('email');
    clearError('message');

    if (!nameVal) {
      showError('name', 'Please enter your name.');
      valid = false;
    } else if (nameVal.length < 2) {
      showError('name', 'Name must be at least 2 characters.');
      valid = false;
    }

    if (!emailVal) {
      showError('email', 'Please enter your email address.');
      valid = false;
    } else if (!EMAIL_RE.test(emailVal)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!messageVal) {
      showError('message', 'Please write a message.');
      valid = false;
    } else if (messageVal.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      valid = false;
    }

    return valid;
  }

  // Real-time clear on input
  ['name', 'email', 'message'].forEach(id => {
    const el = getField(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) return; // bot detected — silent ignore

    if (!validate()) return;

    const name    = getField('name').value.trim();
    const email   = getField('email').value.trim();
    const message = getField('message').value.trim();

    // Build mailto link
    const subject = encodeURIComponent(`[Website] Message from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailto  = `mailto:andranik.meliqsetyan@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;

    // Show success state
    form.reset();
    if (submitBtn)  submitBtn.disabled = true;
    if (successMsg) successMsg.classList.add('visible');

    // Re-enable after a moment
    setTimeout(() => {
      if (submitBtn)  submitBtn.disabled = false;
      if (successMsg) successMsg.classList.remove('visible');
    }, 6000);
  });
})();

/* ============================================================
   5. SMOOTH SCROLL POLYFILL for anchor links (Safari < 15.4)
   ============================================================ */
(function initSmoothScroll() {
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   6. SCROLL PROGRESS BAR
   ============================================================ */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docH      = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   8. COPY EMAIL TO CLIPBOARD
   ============================================================ */
(function initCopyEmail() {
  const trigger = document.getElementById('copyEmail');
  if (!trigger) return;

  trigger.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = trigger.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      const tip = trigger.querySelector('.copy-tip');
      if (tip) {
        tip.textContent = 'Copied!';
        tip.classList.add('copied');
        setTimeout(() => {
          tip.textContent = 'Click to copy';
          tip.classList.remove('copied');
        }, 2200);
      }
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${email}`;
    }
  });
})();
