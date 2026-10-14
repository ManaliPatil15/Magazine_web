/* =====================================================
   Mahodadhi — main.js  (shared by all pages)
   ===================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  /* ---------- Preloader ---------- */
  const pre = $('#preloader');
  const hidePre = () => pre && pre.classList.add('done');
  window.addEventListener('load', () => setTimeout(hidePre, 900));
  setTimeout(hidePre, 3000); // safety net

  /* ---------- Footer year ---------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Navbar: scrolled state, active link, progress, back-to-top ---------- */
  const nav = $('#nav');
  const progress = $('#progress');
  const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    if (toTop) toTop.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const here = location.pathname.split('/').pop() || 'index.html';
  $$('#navMenu .nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === here));

  // close the mobile menu after tapping a link
  const menu = $('#navMenu');
  if (menu && window.bootstrap) {
    $$('#navMenu a').forEach(a => a.addEventListener('click', () => {
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }));
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- Counters ---------- */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    const dur = 1800, t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Bubbles ---------- */
  $$('.bubbles').forEach(box => {
    if (reduce) return;
    const count = window.innerWidth < 600 ? 12 : 22;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      const size = 8 + Math.random() * 34;
      b.className = 'bubble';
      b.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        animation-duration:${9 + Math.random() * 12}s;
        animation-delay:${-Math.random() * 15}s;
        --sway:${(Math.random() * 80 - 40).toFixed(0)}px;`;
      box.appendChild(b);
    }
  });

  /* ---------- Rotating words in the hero (Marathi / Hindi / English) ---------- */
  const swap = $('#swapWord');
  if (swap && !reduce) {
    const words = ['कथा', 'कविता', 'कहानियाँ', 'stories', 'चित्रे', 'design', 'photographs'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      swap.classList.remove('in');
      void swap.offsetWidth; // restart animation
      swap.textContent = words[i];
      swap.classList.add('in');
    }, 2200);
  }

  /* ---------- Hero parallax (mouse) ---------- */
  const hero = $('.hero');
  if (hero && canHover && !reduce) {
    const layers = $$('[data-depth]', hero);
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach(l => {
        const d = +l.dataset.depth;
        l.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
    });
  }

  /* ---------- 3D tilt on cards and the cover ---------- */
  if (canHover && !reduce) {
    $$('[data-tilt]').forEach(el => {
      const max = +el.dataset.tilt || 8;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
        el.style.animation = 'none';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.animation = '';
      });
    });
  }

  /* ---------- Team filter (About page) ---------- */
  const filterBtns = $$('.filter-btn');
  if (filterBtns.length) {
    const cols = $$('[data-cat]');
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const f = btn.dataset.filter;
      cols.forEach((c, idx) => {
        const show = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('d-none', !show);
        c.classList.remove('pop');
        if (show) {
          c.style.animationDelay = (idx % 6) * 60 + 'ms';
          void c.offsetWidth;
          c.classList.add('pop');
        }
      });
    }));
  }

  /* ---------- Submission form (Home page) ---------- */
  const form = $('#submitForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      // TODO: connect to a real backend (Google Forms, Formspree, EmailJS, etc.)
      form.reset();
      form.classList.remove('was-validated');
      const ok = $('#formOk');
      if (ok) {
        ok.classList.remove('d-none');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => ok.classList.add('d-none'), 6000);
      }
    });
  }
})();
