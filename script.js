/* ─── script.js ── Personal Portfolio ─────────────────────── */

/* ── 1. TIME-BASED GREETING ──────────────────────────────── */
(function setGreeting() {
  const el = document.getElementById('heroGreeting');
  if (!el) return;
  const h = new Date().getHours();
  const msg =
    h < 12 ? 'Good morning ☀️' :
    h < 17 ? 'Good afternoon 🌤️' :
    h < 21 ? 'Good evening 🌙' : 'Late night coding? 🦉';
  el.textContent = msg;
})();

/* ── 2. TYPEWRITER EFFECT ────────────────────────────────── */
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const words = [
    'Frontend Developer 💻',
    'Problem Solver 🧩',
    'UI Enthusiast 🎨',
    'Open Source Learner 🌐',
  ];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    if (!deleting && ci === word.length + 1) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      ci = 0;
      wi = (wi + 1) % words.length;
    }
    setTimeout(tick, deleting ? 55 : 90);
  }
  tick();
})();

/* ── 3. DARK / LIGHT MODE TOGGLE ─────────────────────────── */
(function themeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const root = document.documentElement;

  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  icon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    icon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('portfolio-theme', next);
  });
})();

/* ── 4. HAMBURGER MOBILE MENU ────────────────────────────── */
(function mobileMenu() {
  const burger = document.getElementById('hamburger');
  const links  = document.getElementById('navLinks');
  if (!burger) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* ── 5. ACTIVE NAV LINK ON SCROLL ────────────────────────── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function update() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 6. SCROLL REVEAL ────────────────────────────────────── */
(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.timeline-card, .skill-card, .project-card, .stat-card, .about-fun, .contact-item'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();

/* ── 7. SKILL BAR ANIMATION ON SCROLL ───────────────────── */
(function skillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => io.observe(f));
})();

/* ── 8. SKILLS TABS ──────────────────────────────────────── */
(function skillTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });
  });
})();

/* ── 9. CONTACT FORM INTERACTION ─────────────────────────── */
(function contactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  function validate() {
    let ok = true;
    ['userName', 'userEmail', 'userMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.classList.add('error');
        ok = false;
      } else {
        el.classList.remove('error');
      }
    });
    const emailEl = document.getElementById('userEmail');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value);
    if (!emailOk) {
      emailEl.classList.add('error');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    if (!validate()) {
      feedback.textContent = '⚠️ Please fill in all fields correctly.';
      feedback.classList.add('error');
      return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      feedback.textContent = '✅ Message sent! I\'ll get back to you soon.';
      feedback.classList.add('success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1600);
  });

  // Live clear error on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
})();

/* ── 10. NAVBAR SHADOW ON SCROLL ─────────────────────────── */
(function navShadow() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.4)'
      : 'none';
  }, { passive: true });
})();
