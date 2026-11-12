(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ─── HUD: la página se mide a sí misma ─── */
  const hud = {
    fps: $('[data-hud=fps]'), kb: $('[data-hud=kb]'),
    dom: $('[data-hud=dom]'), scroll: $('[data-hud=scroll]'),
  };
  hud.dom.textContent = document.getElementsByTagName('*').length;
  // Peso real: el HTML más todo lo que ha descargado (CSS, JS, fuentes, imágenes).
  const sizeOf = e => e.encodedBodySize || e.transferSize || 0;
  const updateWeight = () => {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      const total = (nav ? sizeOf(nav) : 0) + performance.getEntriesByType('resource').reduce((a, e) => a + sizeOf(e), 0);
      if (total) hud.kb.textContent = Math.round(total / 1024) + ' KB';
    } catch { /* sin Performance API se queda en "--" */ }
  };
  updateWeight();
  try { new PerformanceObserver(updateWeight).observe({ type: 'resource', buffered: true }); } catch { addEventListener('load', updateWeight); }

  let frames = 0, last = performance.now();
  const fpsLoop = (t) => {
    frames++;
    if (t - last >= 500) { hud.fps.textContent = Math.round(frames * 1000 / (t - last)); frames = 0; last = t; }
    requestAnimationFrame(fpsLoop);
  };
  requestAnimationFrame(fpsLoop);

  /* ─── Cursor ─── */
  const cursor = $('.cursor');
  if (fine && cursor) {
    document.body.classList.add('has-cursor');
    const dot = $('.cursor__dot'), ring = $('.cursor__ring');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      dot.style.transform = `translate(${mx}px,${my}px)`;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]');
      cursor.classList.toggle('is-link', t?.dataset.cursor === 'link');
      cursor.classList.toggle('is-view', t?.dataset.cursor === 'view');
    });
  }

  /* ─── Botones magnéticos ─── */
  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .3, y = (e.clientY - r.top - r.height / 2) * .4;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)'; setTimeout(() => el.style.transition = '', 500); });
    });
  }

  /* ─── Revelado + contadores + tarjetas ─── */
  const countUp = el => {
    const to = +el.dataset.count; if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = clamp((t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('[data-count]', en.target).forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: .25 });
  $$('.title, .eyebrow, .steps li, .panel, .lab__p').forEach(el => el.classList.add('reveal'));
  $$('.reveal, .card').forEach(el => io.observe(el));

  /* ─── Texto que se ilumina palabra a palabra ─── */
  const st = $('[data-words]');
  const words = st.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`);
  st.innerHTML = words.join(' ');
  const wEls = $$('.w', st);

  /* ─── Tilt 3D en la foto ─── */
  const tilt = $('[data-tilt]');
  if (fine && !reduce) {
    const img = $('img', tilt);
    tilt.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      img.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
    });
    tilt.addEventListener('pointerleave', () => img.style.transform = '');
  }

  /* ─── Navegación: sección activa, se esconde al bajar, color sobre el acento ─── */
  const nav = $('[data-nav]'), navLinks = $$('.nav__links a'), contact = $('#contacto');
  const secIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    navLinks.forEach(a => a.getAttribute('href') === '#' + en.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id]').forEach(sec => secIO.observe(sec));
  let lastY = scrollY, menuOpen = false;
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

  const burger = $('[data-burger]'), menu = $('#menu'), menuLinks = $$('a', menu);
  menuLinks.forEach((a, k) => a.style.setProperty('--k', k));
  const openMenu = () => {
    menuOpen = true; menu.hidden = false; nav.classList.remove('is-hidden');
    requestAnimationFrame(() => menu.classList.add('is-open'));
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true'); $('.sr-only', burger).textContent = 'Cerrar menú';
    menuLinks[0].focus();
  };
  const closeMenu = (refocus = true) => {
    menuOpen = false; menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false'); $('.sr-only', burger).textContent = 'Abrir menú';
    setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 350);
    if (refocus) burger.focus();
  };
  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  menuLinks.forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => {
    if (!menuOpen) return;
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key === 'Tab') { // el foco no sale del menú mientras está abierto
      const f = [burger, ...menuLinks], i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* ─── Scroll: progreso, nav, texto, tarjetas, horizontal, proceso ─── */
  const stack = $('.stack'), cards = $$('.card', stack);
  let tab = 92;
  const bar = $('.progress');
  const work = $('.work'), track = $('.work__track'), wbar = $('.work__bar i'), wn = $('[data-work-n]');
  const projs = $$('.proj');
  const steps = $('.steps'), stepEls = $$('li', steps);
  let workH = 0, maxX = 0;

  const isMobile = () => matchMedia('(max-width: 900px)').matches;
  const measure = () => {
    tab = parseFloat(getComputedStyle(stack).getPropertyValue('--tab')) || 92;
    if (isMobile()) {
      work.style.removeProperty('--work-h'); maxX = 0; track.style.transform = '';
      projs.forEach(pj => $('img', pj).style.translate = '');
      cards.forEach(c => { c.style.transform = ''; c.style.filter = ''; });
      return;
    }
    if (menuOpen) closeMenu(false);
    maxX = Math.max(0, track.scrollWidth - innerWidth);
    workH = maxX + innerHeight;
    work.style.setProperty('--work-h', workH + 'px');
  };

  const onScroll = () => {
    const y = scrollY, H = innerHeight;
    const max = document.documentElement.scrollHeight - H;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    hud.scroll.textContent = Math.round((max > 0 ? y / max : 0) * 100) + '%';

    // nav: se esconde al bajar y vuelve al subir; cambia de color sobre el bloque de contacto
    if (!menuOpen) {
      if (y > lastY + 6 && y > 300) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 300) nav.classList.remove('is-hidden');
    }
    lastY = y;
    const cr = contact.getBoundingClientRect();
    nav.classList.toggle('on-accent', cr.top <= nav.offsetHeight * .6 && cr.bottom > 0);

    // tarjetas: cada una se encoge y se apaga un poco cuando las siguientes la van tapando
    if (!isMobile() && !reduce) {
      const tops = cards.map(c => c.getBoundingClientRect().top);
      const arrive = cards.map((c, i) => i === 0 ? 0 : clamp(1 - (tops[i] - tops[i - 1] - tab) / (cards[i - 1].offsetHeight - tab)));
      cards.forEach((c, i) => {
        let d = 0; for (let j = i + 1; j < cards.length; j++) d += arrive[j];
        c.style.transform = d ? `scale(${1 - d * .03})` : '';
        c.style.filter = d ? `brightness(${1 - d * .12})` : '';
      });
    }

    // texto
    const sr = st.getBoundingClientRect();
    const sp = clamp((H * .85 - sr.top) / (sr.height + H * .45));
    const lit = Math.floor(sp * wEls.length * 1.15);
    wEls.forEach((w, i) => w.classList.toggle('on', i < lit));

    // horizontal
    if (maxX > 0) {
      const wr = work.getBoundingClientRect();
      const p = clamp(-wr.top / (workH - H));
      track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      wbar.style.transform = `scaleX(${p})`;
      const idx = Math.min(projs.length, Math.round(p * (projs.length - 1)) + 1);
      wn.textContent = String(idx).padStart(2, '0');
      // parallax interno de cada imagen
      projs.forEach(pj => {
        const r = pj.getBoundingClientRect();
        const c = (r.left + r.width / 2 - innerWidth / 2) / innerWidth;
        $('img', pj).style.translate = `${c * -50}px 0`;
      });
    }

    // proceso
    const pr = steps.getBoundingClientRect();
    const pp = clamp((H * .6 - pr.top) / pr.height);
    steps.style.setProperty('--p', pp.toFixed(3));
    stepEls.forEach((li, i) => li.classList.toggle('on', pp >= (i / stepEls.length) + .02));
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener('resize', () => { measure(); onScroll(); });
  addEventListener('load', () => { measure(); onScroll(); });
  measure(); onScroll();

  /* ─── Laboratorio: reescribe los tokens de toda la página ─── */
  const defaults = { h: 78, r: 18, rhythm: 100 };
  const fmt = { h: v => v, r: v => v + 'px', rhythm: v => (v / 100).toFixed(2) + '×' };
  const apply = (k, v) => {
    if (k === 'h') root.style.setProperty('--h', v);
    if (k === 'r') root.style.setProperty('--r', v + 'px');
    if (k === 'rhythm') root.style.setProperty('--rhythm', v / 100);
    window.dispatchEvent(new Event('tokens'));
  };
  $$('[data-var]').forEach(inp => {
    const out = inp.nextElementSibling;
    inp.addEventListener('input', () => { out.textContent = fmt[inp.dataset.var](+inp.value); apply(inp.dataset.var, +inp.value); measure(); onScroll(); });
  });
  const sw = $('[data-theme-toggle]');
  sw.addEventListener('click', () => {
    const flip = () => {
      const light = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', light);
      root.dataset.theme = light ? 'light' : 'dark';
      sw.nextElementSibling.textContent = light ? 'claro' : 'oscuro';
      window.dispatchEvent(new Event('tokens'));
    };
    if (!document.startViewTransition || reduce) { flip(); return; }
    const r = sw.getBoundingClientRect();
    root.style.setProperty('--vx', r.left + r.width / 2 + 'px');
    root.style.setProperty('--vy', r.top + r.height / 2 + 'px');
    document.startViewTransition(flip);
  });
  $('[data-reset]').addEventListener('click', () => {
    $$('[data-var]').forEach(inp => {
      inp.value = defaults[inp.dataset.var];
      inp.nextElementSibling.textContent = fmt[inp.dataset.var](+inp.value);
      apply(inp.dataset.var, +inp.value);
    });
    if (sw.getAttribute('aria-checked') === 'true') sw.click();
    measure(); onScroll();
  });

  /* ─── Hero: tu nombre hecho de partículas que huyen del cursor ─── */
  const cv = $('.hero__canvas'), ctx = cv.getContext('2d');
  const hero = $('.hero');
  let parts = [], W = 0, H = 0, dpr = 1, visible = true, color = '#c6ff3d';
  const ptr = { x: -9999, y: -9999 };
  const hint = $('[data-hint]');
  let ripples = [], lastMove = 0, lastRipple = 0;

  const readColor = () => { color = getComputedStyle(root).getPropertyValue('--accent-text').trim() || color; };
  readColor();
  addEventListener('tokens', () => { readColor(); });

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const o = off.getContext('2d');
    const lines = W < 700 ? ['VICTOR', 'EXTREMERA'] : ['VICTOR', 'EXTREMERA'];
    const wide = W >= 700;
    let fs = Math.min(H * (wide ? .27 : .2), 300);
    const family = '800 ' + fs + 'px "Bricolage Grotesque", system-ui, sans-serif';
    o.font = family;
    const widest = Math.max(...lines.map(l => o.measureText(l).width));
    fs = Math.min(fs, fs * (W * .9) / widest);
    o.font = '800 ' + fs + 'px "Bricolage Grotesque", system-ui, sans-serif';
    o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillStyle = '#fff';
    const lh = fs * .92, cy = H * .5 - 6;
    lines.forEach((l, i) => o.fillText(l, W / 2, cy + (i - (lines.length - 1) / 2) * lh));

    const gap = Math.max(4, Math.round(fs / 34));
    const data = o.getImageData(0, 0, W, H).data;
    const next = [];
    for (let y = 0; y < H; y += gap) for (let x = 0; x < W; x += gap) {
      if (data[(y * W + x) * 4 + 3] > 128) next.push({ hx: x, hy: y });
    }
    parts = next.map((p, i) => {
      const old = parts[i];
      return { hx: p.hx, hy: p.hy, x: old ? old.x : Math.random() * W, y: old ? old.y : Math.random() * H, vx: 0, vy: 0, ph: Math.random() * 6.283 };
    });
    parts.size = gap > 5 ? 3 : 2.4;
  };

  const addRipple = (x, y, str) => ripples.push({ x, y, t0: performance.now(), str });
  const draw = t => {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color;
    const R = Math.max(90, W * .08), R2 = R * R, s = parts.size;
    // si nadie toca nada, una onda recorre el nombre de vez en cuando
    if (t - lastMove > 3000 && t - lastRipple > 4200 && parts.length) {
      const p = parts[(Math.random() * parts.length) | 0];
      addRipple(p.hx, p.hy, 1.4); lastRipple = t;
    }
    const maxR = Math.hypot(W, H);
    ripples = ripples.filter(r => (t - r.t0) * .55 < maxR);
    for (const p of parts) {
      // respiración: cada partícula oscila un poco alrededor de su sitio
      const hx = p.hx + Math.cos(t * .0011 + p.ph) * .9, hy = p.hy + Math.sin(t * .0016 + p.ph) * 1.1;
      const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
      if (d2 < R2) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 5; p.vx += dx / d * f; p.vy += dy / d * f; }
      for (const r of ripples) {
        const rx = p.x - r.x, ry = p.y - r.y, d = Math.hypot(rx, ry) || 1, off = Math.abs(d - (t - r.t0) * .55);
        if (off < 36) { const f = (1 - off / 36) * r.str; p.vx += rx / d * f; p.vy += ry / d * f; }
      }
      p.vx += (hx - p.x) * .05; p.vy += (hy - p.y) * .05;
      p.vx *= .86; p.vy *= .86;
      p.x += p.vx; p.y += p.vy;
      ctx.fillRect(p.x, p.y, s, s);
    }
  };
  const drawStatic = () => { ctx.clearRect(0, 0, W, H); ctx.fillStyle = color; for (const p of parts) ctx.fillRect(p.hx, p.hy, parts.size, parts.size); };

  const setPtr = (cx, cy) => { const r = cv.getBoundingClientRect(); ptr.x = cx - r.left; ptr.y = cy - r.top; lastMove = performance.now(); };
  const resetPtr = () => { ptr.x = ptr.y = -9999; };
  hero.addEventListener('pointermove', e => setPtr(e.clientX, e.clientY), { passive: true });
  hero.addEventListener('pointerleave', resetPtr);
  // en táctil el dedo también empuja, incluso mientras se hace scroll
  hero.addEventListener('touchmove', e => setPtr(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  hero.addEventListener('touchend', resetPtr, { passive: true });
  // clic o toque: explosión y onda expansiva
  hero.addEventListener('pointerdown', e => {
    if (reduce || e.target.closest('a, button')) return;
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, R = Math.max(160, W * .14);
    for (const p of parts) {
      const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy) || 1;
      if (d < R) { const f = (1 - d / R) * 22; p.vx += dx / d * f; p.vy += dy / d * f; }
    }
    addRipple(x, y, 3); lastMove = performance.now();
    hint?.classList.add('is-gone');
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const start = () => {
    build();
    if (reduce) { parts.forEach(p => { p.x = p.hx; p.y = p.hy; }); drawStatic(); return; }
    (function loop(t) { if (visible) draw(t || performance.now()); requestAnimationFrame(loop); })();
  };
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (reduce) { parts.forEach(p => { p.x = p.hx; p.y = p.hy; }); drawStatic(); } }, 150); });
  (document.fonts?.ready || Promise.resolve()).then(start);
})();
