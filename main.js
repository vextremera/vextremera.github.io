(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // Tiempo real que ha tardado esta página en abrirse en este navegador (demo "Abre al instante").
  const loadEl = $('[data-load]');
  const showLoad = () => {
    const n = performance.getEntriesByType('navigation')[0];
    const ms = n && n.loadEventEnd ? n.loadEventEnd : performance.now();
    loadEl.textContent = Math.max(.1, ms / 1000).toFixed(1).replace('.', ',');
  };
  if (loadEl) document.readyState === 'complete' ? setTimeout(showLoad, 0) : addEventListener('load', () => setTimeout(showLoad, 0));

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
      el.textContent = Math.round(+el.dataset.count * (1 - Math.pow(1 - p, 4))); // relee el objetivo: GitHub puede actualizarlo a mitad
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-in');
    $$('[data-count]', en.target).forEach(countUp);
    io.unobserve(en.target);
  }), { threshold: .25 });
  $$('.title, .eyebrow, .steps li, .panel, .lab__p, .case, .case__facts').forEach(el => el.classList.add('reveal'));
  $$('.reveal, .card').forEach(el => io.observe(el));

  /* ─── Cifras de GitHub: las del HTML son de respaldo; si la API pública responde, se actualizan ─── */
  const ghStat = (key, url, pick) => {
    const el = $(`[data-gh=${key}]`); if (!el) return;
    fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        const v = d && pick(d);
        if (!Number.isFinite(v) || v <= 0) return;
        el.dataset.count = v;
        if (el.closest('.is-in')) el.textContent = v;
      })
      .catch(() => {});
  };
  ghStat('commits', 'https://api.github.com/search/commits?q=author:vextremera&per_page=1', d => d.total_count);
  ghStat('repos', 'https://api.github.com/users/vextremera', d => d.public_repos);

  /* ─── Texto que se ilumina palabra a palabra ─── */
  const st = $('[data-words]');
  const words = st.textContent.trim().split(/\s+/).map(w => `<span class="statement__word">${w}</span>`);
  st.innerHTML = words.join(' ');
  const wEls = $$('.statement__word', st);

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
  const nav = $('[data-nav]'), navLinks = $$('.nav__links a'), accentZones = $$('[data-accent-zone]');
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
    document.body.classList.add('is-menu-open');
    burger.setAttribute('aria-expanded', 'true'); $('.sr-only', burger).textContent = 'Cerrar menú';
    menuLinks[0].focus();
  };
  const closeMenu = (refocus = true) => {
    menuOpen = false; menu.classList.remove('is-open');
    document.body.classList.remove('is-menu-open');
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

  /* ─── Scroll: progreso, nav, texto, tarjetas, imagen del caso, proceso ─── */
  const stack = $('.stack'), cards = $$('.card', stack);
  let tab = 92;
  const bar = $('.progress');
  const parallax = $('[data-parallax]');
  const steps = $('.steps'), stepEls = $$('li', steps);

  const isMobile = () => matchMedia('(max-width: 900px)') /* mismo corte que styles.css */.matches;
  const measure = () => {
    tab = parseFloat(getComputedStyle(stack).getPropertyValue('--tab')) || 92;
    if (isMobile()) { cards.forEach(c => { c.style.transform = ''; c.style.filter = ''; }); return; }
    if (menuOpen) closeMenu(false);
  };

  const onScroll = () => {
    const y = scrollY, H = innerHeight;
    const max = document.documentElement.scrollHeight - H;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    // nav: se esconde al bajar y vuelve al subir; cambia de color sobre los bloques con fondo de acento
    if (!menuOpen) {
      if (y > lastY + 6 && y > 300) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 300) nav.classList.remove('is-hidden');
    }
    lastY = y;
    const navMid = nav.offsetHeight * .5;
    nav.classList.toggle('is-on-accent', accentZones.some(z => { const r = z.getBoundingClientRect(); return r.top <= navMid && r.bottom > navMid; }));

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
    wEls.forEach((w, i) => w.classList.toggle('is-on', i < lit));

    // la imagen del caso se desplaza un poco más despacio que la página
    if (parallax && !reduce) {
      const r = parallax.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < H) parallax.style.translate = `0 ${((r.top + r.height / 2 - H / 2) / H * -5).toFixed(2)}%`;
    }

    // proceso
    const pr = steps.getBoundingClientRect();
    const pp = clamp((H * .6 - pr.top) / pr.height);
    steps.style.setProperty('--p', pp.toFixed(3));
    stepEls.forEach((li, i) => li.classList.toggle('is-on', pp >= (i / stepEls.length) + .02));
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener('resize', () => { measure(); onScroll(); });
  addEventListener('load', () => { measure(); onScroll(); });
  measure(); onScroll();

  /* ─── Laboratorio: reescribe los tokens de toda la página ─── */
  const defaults = { h: 78, r: 18 };
  const fmt = { h: v => v, r: v => v + 'px' };
  const apply = (k, v) => {
    if (k === 'h') root.style.setProperty('--hue', v);
    if (k === 'r') root.style.setProperty('--radius', v + 'px');
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

  /* ─── Demo "Habla idiomas": la misma mini web en español, catalán e inglés ─── */
  const langs = $('[data-langs]');
  if (langs) {
    const TEXTS = {
      es: { title: 'Bienvenidos', text: 'Reserva tu mesa en un minuto.', cta: 'Reservar' },
      ca: { title: 'Benvinguts', text: 'Reserva la teva taula en un minut.', cta: 'Reservar' },
      en: { title: 'Welcome', text: 'Book your table in a minute.', cta: 'Book now' },
    };
    const order = Object.keys(TEXTS);
    const site = $('.langs__site', langs), btns = $$('[data-lang]', langs), slots = $$('[data-l]', site);
    let cur = 'es', auto = !reduce; // va rotando solo hasta que alguien elige un idioma
    const setLang = k => {
      cur = k; site.lang = k;
      slots.forEach(el => el.textContent = TEXTS[k][el.dataset.l]);
      btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === k));
      site.classList.remove('is-swap'); void site.offsetWidth; site.classList.add('is-swap');
    };
    btns.forEach(b => b.addEventListener('click', () => { auto = false; site.setAttribute('aria-live', 'polite'); setLang(b.dataset.lang); }));
    setInterval(() => { if (auto && !document.hidden) setLang(order[(order.indexOf(cur) + 1) % order.length]); }, 2600);
  }

  /* ─── Formulario de contacto ───
     Se envía por fetch a la dirección de data-endpoint (Formspree) sin salir de la página.
     Si el envío falla, se avisa y se ofrece el email directo. */
  const form = $('[data-form]');
  if (form) {
    const MAIL = 'vicres43@gmail.com';
    const err = $('[data-form-err]', form), done = $('[data-form-done]', form), send = $('[data-form-send]', form);
    const val = n => form.elements[n].value.trim();
    const fail = (name, msg) => { const f = form.elements[name]; f.setAttribute('aria-invalid', 'true'); err.textContent = msg; f.focus(); };
    const finish = (title, text) => {
      $('[data-form-done-title]', form).textContent = title; $('[data-form-done-text]', form).textContent = text;
      form.classList.add('is-done'); done.hidden = false; done.focus();
    };
    form.addEventListener('input', e => { e.target.removeAttribute('aria-invalid'); err.textContent = ''; });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (val('_gotcha')) return; // campo trampa: solo lo rellenan los bots
      if (!val('nombre')) return fail('nombre', 'Dime cómo te llamas.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) return fail('email', 'Revisa el email: lo necesito para contestarte.');
      if (!val('mensaje')) return fail('mensaje', 'Cuéntame aunque sea en una línea qué necesitas.');
      form.elements._subject.value = `Nuevo proyecto · ${val('tipo')} · ${val('nombre')}`;
      const label = send.innerHTML; send.disabled = true; send.textContent = 'Enviando…';
      try {
        const r = await fetch(form.dataset.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        if (!r.ok) throw new Error(r.status);
        finish('Mensaje enviado.', 'Gracias. Te contesto en cuanto lo lea.');
      } catch {
        err.textContent = `No se ha podido enviar. Escríbeme directamente a ${MAIL}.`;
        send.disabled = false; send.innerHTML = label;
      }
    });
  }

  /* ─── Hero: tu nombre hecho de partículas que huyen del cursor ─── */
  const cv = $('.hero__canvas'), ctx = cv.getContext('2d');
  const hero = $('.hero');
  let parts = [], W = 0, H = 0, dpr = 1, visible = true, color = '#c6ff3d';
  const ptr = { x: -9999, y: -9999 };
  const hint = $('[data-hint]'), slot = $('[data-name-slot]');
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
    // El nombre se dibuja dentro de .hero__name: en una línea si el hueco es ancho, en dos si no.
    const cr = cv.getBoundingClientRect(), sr = slot.getBoundingClientRect();
    const box = { x: sr.left - cr.left, y: sr.top - cr.top, w: sr.width, h: sr.height };
    const lines = box.w / box.h > 5 ? ['VICTOR EXTREMERA'] : ['VICTOR', 'EXTREMERA'];
    const font = s => `800 ${s}px "Bricolage Grotesque", system-ui, sans-serif`;
    let fs = box.h / lines.length * 1.18;
    o.font = font(fs);
    const widest = Math.max(...lines.map(l => o.measureText(l).width));
    fs = Math.min(fs, fs * box.w / widest);
    o.font = font(fs);
    o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillStyle = '#fff';
    const lh = fs * .9, cy = box.y + box.h / 2;
    lines.forEach((l, i) => o.fillText(l, box.x + box.w / 2, cy + (i - (lines.length - 1) / 2) * lh));

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
