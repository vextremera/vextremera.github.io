/* ===========================================================================
   MOTOR DE FÍSICAS PARA LAS FICHAS DEL STACK
   ---------------------------------------------------------------------------
   Por qué a mano y no Matter.js: Matter pesa ~25 KB gzip y trae solver de
   polígonos, restricciones y renderer que aquí no se usan. Con fichas
   circulares el problema se reduce a colisión círculo-círculo, que es
   estable por construcción — no hay caras ni vértices que se enganchen.
   Esto ocupa ~3 KB y el portfolio sigue sin dependencias.

   Mueve elementos del DOM, no un <canvas>: los logos siguen siendo una lista
   semántica, legible por lector de pantalla y nítida a cualquier escala.
   Solo se escribe `transform`, así que no provoca recálculo de layout.

   Tres cosas que solo se ven con muchas fichas y están cableadas aquí:
     · Hay que repasar las paredes DESPUÉS de resolver colisiones, o alguna
       ficha acaba fuera de la caja.
     · Los contactos en reposo no deben inyectar giro: la gravedad reinyecta
       velocidad en cada paso y eso se cuela como rotación que no para.
     · Sin corte de rebote a baja velocidad, un montón nunca se asienta y la
       simulación no llega a dormirse.
   =========================================================================== */

const STEP = 1 / 120; // paso fijo: estable e independiente del refresco
const GRAVITY = 2600; // px/s²
const RESTITUTION = 0.52; // rebote en impactos de verdad
const MIN_BOUNCE = 100; // px/s: por debajo de esto se apoya en vez de rebotar
const WALL_FRICTION = 0.88;
const AIR = 0.999;
const ITERATIONS = 5; // pasadas de resolución por paso
const SLOP = 0.5; // px de solape tolerado sin corregir
const CORRECTION = 0.8; // fracción del solape corregida por iteración

// Giro: acotado y con freno rápido. Es un efecto decorativo, no dinámica de
// sólido rígido — se busca inercia corta, no molinillos.
const MAX_SPIN = 7; // rad/s
const SPIN_DECAY = 0.972; // por paso, en el aire
const CONTACT_SPIN_DAMP = 0.85; // al apoyarse sobre otra ficha

// Asentamiento y sueño
const SETTLE_SPEED = 45;
const SETTLE_DAMP = 0.88;
const SETTLE_SPIN_DAMP = 0.9; // el giro se apaga al asentarse
const SLEEP_MOVE = 0.12; // px por frame: por debajo, nada se mueve a la vista
const ROLL_MIN = 30; // px/s: por debajo, no hay rodadura
const SPIN_DEADBAND = 0.36; // rad/s: por debajo, se para del todo
const SLEEP_SPIN = 0.25; // rad/s
const SLEEP_FRAMES = 45;
const WATCHDOG_FRAMES = 900; // ~15 s: tope duro por si un montón se atasca
const MAX_SPEED = 3200;
const THROW_SPEED = 2200; // tope al lanzar con el puntero

// Crecimiento al soltar
const TIP_DELAY_REST = 300; // ms quieto sobre una ficha en reposo
const TIP_DELAY_LIVE = 500; // ms sueltas: algo más largo que en reposo, o
//                             parpadearía cada vez que una ficha pasa por
//                             debajo del cursor
const TIP_OFFSET = 14; // separación de la etiqueta respecto al cursor
const GROW_MS = 420;
const GROW_OVERSHOOT = 1.08;

interface Chip {
	el: HTMLElement;
	x: number; // centro
	y: number;
	vx: number;
	vy: number;
	r: number; // radio actual (crece al soltar)
	r0: number; // radio en la rejilla
	rMax: number; // radio ya suelto
	m: number;
	angle: number;
	spin: number;
	homeX: number;
	homeY: number;
	px: number; // posición en el frame anterior
	py: number;
	held: boolean;
}

export function initGravity(box: HTMLElement) {
	const startBtn = box.querySelector<HTMLButtonElement>('[data-gravity-start]');
	const resetBtn = box.querySelector<HTMLButtonElement>('[data-gravity-reset]');
	const els = Array.from(box.querySelectorAll<HTMLElement>('[data-chip]'));

	if (!startBtn || !resetBtn || !els.length) return;

	// Declarado aquí arriba a propósito: el listener de reposo lo consulta, y
	// con prefers-reduced-motion la función retorna antes de llegar al bloque
	// de estado de la simulación. Declarado allí, ese listener reventaría con
	// un ReferenceError en cuanto se moviera el ratón.
	let live = false;

	const tip = box.querySelector<HTMLElement>('[data-gravity-tip]');

	let tipName = '';
	let restTimer = 0;

	/** Junto al cursor, no bajo la ficha. Si no cabe a la derecha o abajo, se
	    coloca al otro lado para no salirse de la caja. */
	function moveTip(px: number, py: number) {
		if (!tip) return;
		const w = tip.offsetWidth;
		const h = tip.offsetHeight;
		let x = px + TIP_OFFSET;
		let y = py + TIP_OFFSET;
		if (x + w > box.clientWidth - 4) x = px - w - TIP_OFFSET;
		if (y + h > box.clientHeight - 4) y = py - h - TIP_OFFSET;
		tip.style.left = Math.max(4, x) + 'px';
		tip.style.top = Math.max(4, y) + 'px';
	}

	const TIP_VARS = ['--tip-bg', '--tip-fg', '--tip-bg-dark', '--tip-fg-dark'];

	function showTip(el: HTMLElement, px: number, py: number) {
		if (!tip) return;
		const name = el.dataset.name ?? '';
		if (name !== tipName) {
			tip.textContent = name;
			tipName = name;
			// El color de marca viaja como variables: así el cambio de tema
			// se resuelve en CSS y no hay que repintar aquí.
			for (const v of TIP_VARS) tip.style.setProperty(v, el.style.getPropertyValue(v));
		}
		moveTip(px, py);
		tip.classList.add('is-on');
	}

	function hideTip() {
		if (!tip) return;
		tip.classList.remove('is-on');
		tipName = '';
	}

	let restChip: HTMLElement | null = null;
	let restX = 0;
	let restY = 0;

	// En reposo las fichas no se mueven: el elemento bajo el cursor lo da el
	// propio evento. Se escucha pointermove y no pointerover porque la
	// etiqueta tiene que seguir al cursor mientras se mueve por la ficha.
	box.addEventListener('pointermove', (e) => {
		if (live) return;
		const b = box.getBoundingClientRect();
		restX = e.clientX - b.left;
		restY = e.clientY - b.top;

		const el = (e.target as HTMLElement).closest<HTMLElement>('[data-chip]');

		if (el !== restChip) {
			restChip = el;
			window.clearTimeout(restTimer);
			hideTip();
			if (el) {
				restTimer = window.setTimeout(() => {
					if (!live && restChip) showTip(restChip, restX, restY);
				}, TIP_DELAY_REST);
			}
		} else if (el && tipName) {
			moveTip(restX, restY);
		}
	});

	const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (calm.matches) {
		box.setAttribute('data-calm', '');
		box.addEventListener('pointerleave', () => {
			window.clearTimeout(restTimer);
			restChip = null;
			hideTip();
		});
		return;
	}

	let chips: Chip[] = [];
	let width = 0;
	let height = 0;
	let raf = 0;
	let last = 0;
	let acc = 0;
	let still = 0;
	let resetting = false;
	let grow = 0; // 0..1
	let frames = 0;
	let hoverX = -1;
	let hoverY = -1;
	let hoverChip: Chip | null = null;
	let hoverSince = 0;

	function measure() {
		const b = box.getBoundingClientRect();
		width = b.width;
		height = b.height;
		return b;
	}

	/** Suavizado con un pelín de pasada: se inflan, rebasan un poco el tamaño
	    final y se asientan. */
	function easeGrow(t: number) {
		const p = 1 - Math.pow(1 - t, 3);
		return p * (1 + (GROW_OVERSHOOT - 1) * Math.sin(Math.PI * t));
	}

	function start() {
		const b = measure();

		// 1. Posiciones de la rejilla, todavía con el tamaño pequeño.
		const seeds = els.map((el) => {
			const r = el.getBoundingClientRect();
			return {
				el,
				x: r.left - b.left + r.width / 2,
				y: r.top - b.top + r.height / 2,
				r0: r.width / 2,
			};
		});

		// 2. Fijamos la altura ANTES de sacar las fichas del flujo. Con
		//    is-live pasan a position:absolute y el contenido de la caja se
		//    queda vacío, así que volvía a su min-height: en móvil, donde las
		//    filas ocupan bastante más que ese mínimo, la caja encogía de
		//    golpe y las fichas quedaban recortadas por debajo.
		box.style.height = b.height + 'px';

		// 3. is-live agranda las fichas por CSS; leemos el tamaño nuevo.
		box.classList.add('is-live');
		const rMax = els[0].getBoundingClientRect().width / 2 || seeds[0].r0;

		chips = seeds.map((s) => ({
			el: s.el,
			x: s.x,
			y: s.y,
			// Impulso inicial: se abren hacia arriba antes de caer.
			vx: (Math.random() - 0.5) * 220,
			vy: -Math.random() * 190,
			r: s.r0,
			r0: s.r0,
			rMax,
			m: rMax * rMax,
			angle: 0,
			spin: (Math.random() - 0.5) * 3,
			homeX: s.x,
			homeY: s.y,
			px: s.x,
			py: s.y,
			held: false,
		}));

		live = true;
		grow = 0;
		frames = 0;
		startBtn!.hidden = true;
		resetBtn!.hidden = false;
		draw();

		last = performance.now();
		acc = 0;
		still = 0;
		raf = requestAnimationFrame(tick);
	}

	function integrate() {
		for (const c of chips) {
			if (c.held) {
				// Una ficha agarrada no la mueve la física, pero sí debe girar
				// con el gesto: si no, acumula giro sin tope mientras la
				// arrastras y sale disparada rotando al soltarla.
				c.angle += c.spin * STEP;
				c.spin *= 0.9;
				continue;
			}
			c.vy += GRAVITY * STEP;
			c.vx *= AIR;
			c.vy *= AIR;

			const speed = Math.hypot(c.vx, c.vy);
			if (speed > MAX_SPEED) {
				c.vx = (c.vx / speed) * MAX_SPEED;
				c.vy = (c.vy / speed) * MAX_SPEED;
			}

			c.x += c.vx * STEP;
			c.y += c.vy * STEP;

			if (c.spin > MAX_SPIN) c.spin = MAX_SPIN;
			else if (c.spin < -MAX_SPIN) c.spin = -MAX_SPIN;

			c.angle += c.spin * STEP;
			c.spin *= SPIN_DECAY;

			// Banda muerta. Los contactos de un montón denso reinyectan giro
			// en cada paso y el amortiguado solo, por fuerte que sea, deja un
			// residuo perpetuo: las fichas seguirían rotando despacio para
			// siempre. Por debajo de este umbral (unos 20°/s, un frame) se
			// para en seco y no se nota el corte.
			if (c.spin < SPIN_DEADBAND && c.spin > -SPIN_DEADBAND) c.spin = 0;
		}
	}

	/** Rebote con corte: por debajo de MIN_BOUNCE se apoya y la velocidad se
	    anula. Sin esto la gravedad de cada paso reinyecta velocidad y el
	    montón vibra para siempre. */
	function bounce(v: number) {
		return Math.abs(v) < MIN_BOUNCE ? 0 : -v * RESTITUTION;
	}

	function walls(c: Chip) {
		if (c.x - c.r < 0) {
			c.x = c.r;
			if (!c.held) {
				c.vx = bounce(c.vx);
				c.vy *= WALL_FRICTION;
			}
		} else if (c.x + c.r > width) {
			c.x = width - c.r;
			if (!c.held) {
				c.vx = bounce(c.vx);
				c.vy *= WALL_FRICTION;
			}
		}

		if (c.y - c.r < 0) {
			c.y = c.r;
			if (!c.held) c.vy = bounce(c.vy);
		} else if (c.y + c.r > height) {
			c.y = height - c.r;
			if (!c.held) {
				c.vy = bounce(c.vy);
				c.vx *= WALL_FRICTION;

				// Rodar sin deslizar: el giro sale de la velocidad horizontal,
				// pero SOLO si la ficha se está moviendo de verdad. En un
				// montón asentado queda un vx residual de unos 10 px/s que no
				// desplaza nada; sin esta condición se convertía en una
				// rotación permanente de ~0.35 rad/s que no paraba nunca.
				if (Math.abs(c.vx) > ROLL_MIN) c.spin += (c.vx / c.r - c.spin) * 0.35;
				else c.spin *= 0.75;
			}
		}
	}

	let maxPen = 0;

	function collide(a: Chip, b: Chip) {
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const min = a.r + b.r;
		const d2 = dx * dx + dy * dy;
		if (d2 >= min * min || d2 === 0) return;

		const d = Math.sqrt(d2);
		const nx = dx / d;
		const ny = dy / d;
		const overlap = min - d;

		const aFixed = a.held;
		const bFixed = b.held;
		if (aFixed && bFixed) return;

		const total = a.m + b.m;
		const aShare = aFixed ? 0 : bFixed ? 1 : b.m / total;
		const bShare = bFixed ? 0 : aFixed ? 1 : a.m / total;

		// Se tolera un solape mínimo y se corrige solo una fracción por
		// iteración. Corregir el 100% de cada micro-solape mete energía en el
		// sistema: con muchas fichas apiladas aparecen configuraciones
		// atascadas que vibran y no dejan que la simulación se duerma.
		const pen = Math.max(overlap - SLOP, 0);
		if (pen > maxPen) maxPen = pen;
		const corr = pen * CORRECTION;
		a.x -= nx * corr * aShare;
		a.y -= ny * corr * aShare;
		b.x += nx * corr * bShare;
		b.y += ny * corr * bShare;

		const rvx = b.vx - a.vx;
		const rvy = b.vy - a.vy;
		const vn = rvx * nx + rvy * ny;
		if (vn > 0) return;

		const invA = aFixed ? 0 : 1 / a.m;
		const invB = bFixed ? 0 : 1 / b.m;
		const inv = invA + invB;
		if (inv === 0) return;

		const e = -vn < MIN_BOUNCE ? 0 : RESTITUTION;
		const j = (-(1 + e) * vn) / inv;

		a.vx -= nx * j * invA;
		a.vy -= ny * j * invA;
		b.vx += nx * j * invB;
		b.vy += ny * j * invB;

		if (e === 0) {
			// Contacto en reposo: en vez de inyectar giro, lo frena. Si no,
			// una ficha apoyada sobre otra se queda girando despacio para
			// siempre y la simulación nunca se duerme.
			if (!aFixed) a.spin *= CONTACT_SPIN_DAMP;
			if (!bFixed) b.spin *= CONTACT_SPIN_DAMP;
			return;
		}

		// Rozamiento tangencial en impactos de verdad: por eso giran al
		// chocar. El coeficiente va dividido entre las iteraciones, que
		// resuelven el mismo contacto varias veces por paso.
		const vt = rvx * -ny + rvy * nx;
		const k = 0.06 / ITERATIONS;
		if (!aFixed) a.spin += (vt / a.r) * k;
		if (!bFixed) b.spin -= (vt / b.r) * k;
	}

	function resolve() {
		maxPen = 0;

		for (let k = 0; k < ITERATIONS; k++) {
			for (let i = 0; i < chips.length; i++) {
				walls(chips[i]);
				for (let j = i + 1; j < chips.length; j++) collide(chips[i], chips[j]);
			}
		}

		// Repaso final de paredes: dentro del bucle se comprueban los límites
		// de una ficha y después otra colisión puede empujarla fuera.
		for (const c of chips) walls(c);

		// Amortiguación de asentamiento: frenar de más lo que ya va muy lento
		// no se nota y hace que el montón se asiente de verdad. El giro entra
		// aquí también — es lo que da la inercia corta: la ficha sigue girando
		// un poco al caer y se para sola en menos de un segundo, en vez de
		// quedarse dando vueltas residuales indefinidamente.
		for (const c of chips) {
			if (c.held) continue;
			if (Math.hypot(c.vx, c.vy) < SETTLE_SPEED) {
				c.vx *= SETTLE_DAMP;
				c.vy *= SETTLE_DAMP;
				c.spin *= SETTLE_SPIN_DAMP;
			}
		}
	}

	function draw() {
		for (const c of chips) {
			const s = (c.r / c.rMax).toFixed(4);
			c.el.style.transform =
				'translate3d(' +
				(c.x - c.rMax) +
				'px, ' +
				(c.y - c.rMax) +
				'px, 0) scale(' +
				s +
				') rotate(' +
				c.angle +
				'rad)';
		}
	}

	function tick(now: number) {
		frames++;
		const frame = Math.min((now - last) / 1000, 0.05);
		last = now;
		acc += frame;

		// El radio de colisión crece a la vez que la escala visual, así que
		// se empujan entre ellas mientras se inflan.
		if (grow < 1) {
			grow = Math.min(1, grow + (frame * 1000) / GROW_MS);
			const k = easeGrow(grow);
			for (const c of chips) c.r = c.r0 + (c.rMax - c.r0) * k;
		}

		let steps = 0;
		while (acc >= STEP && steps < 8) {
			integrate();
			resolve();
			acc -= STEP;
			steps++;
		}

		draw();

		// Etiqueta mientras están sueltas. Se resuelve por posición y no con
		// pointerover: las fichas se mueven por debajo de un cursor que puede
		// estar quieto, y ahí el navegador no dispara esos eventos.
		if (tip) {
			const under = hoverX < 0 ? null : (dragged ?? pick(hoverX, hoverY));
			if (under !== hoverChip) {
				hoverChip = under;
				hoverSince = now;
				hideTip();
			} else if (under && now - hoverSince >= TIP_DELAY_LIVE) {
				showTip(under.el, hoverX, hoverY);
			}
		}

		// Dormirse se decide por desplazamiento REAL, no por la variable de
		// velocidad: una ficha apoyada conserva ahí el resto de un paso de
		// gravedad (~22 px/s) aunque no se mueva ni un píxel, y con montones
		// densos aparecen atascos que mantienen ese resto alto para siempre.
		// Si nada se mueve y nada gira, no hay nada que dibujar.
		let moved = 0;
		let spinning = 0;
		let held = false;
		for (const c of chips) {
			if (c.held) held = true;
			const d = Math.hypot(c.x - c.px, c.y - c.py);
			if (d > moved) moved = d;
			c.px = c.x;
			c.py = c.y;
			const sp = Math.abs(c.spin);
			if (sp > spinning) spinning = sp;
		}

		// Tampoco se duerme si quedan fichas superpuestas: con el montón muy
		// comprimido la separación avanza despacio y, sin esta condición, se
		// dormía a medio resolver y dejaba pares visiblemente encajados.
		// Con montones muy comprimidos puede quedar algún par encajado que
		// tarda en separarse. El tope duro garantiza que el bucle acaba
		// siempre: a esas alturas la pila lleva rato quieta a la vista.
		const stuck = frames > WATCHDOG_FRAMES;
		const asleep =
			grow >= 1 &&
			moved < SLEEP_MOVE &&
			spinning < SLEEP_SPIN &&
			(maxPen < 1 || stuck) &&
			!held &&
			// Con una ficha bajo el cursor el bucle sigue vivo: es quien
			// cuenta el hover y mantiene la etiqueta pegada a la ficha.
			!hoverChip;
		still = asleep ? still + 1 : 0;

		if (still > SLEEP_FRAMES) {
			raf = 0;
			return;
		}

		raf = requestAnimationFrame(tick);
	}

	function wake() {
		if (!live || raf) return;
		last = performance.now();
		acc = 0;
		still = 0;
		raf = requestAnimationFrame(tick);
	}

	let dragged: Chip | null = null;
	let pointer = -1;
	let lastPx = 0;
	let lastPy = 0;
	let lastT = 0;

	function pick(px: number, py: number) {
		for (let i = chips.length - 1; i >= 0; i--) {
			const c = chips[i];
			if (Math.hypot(px - c.x, py - c.y) <= c.r) return c;
		}
		return null;
	}

	box.addEventListener('pointerdown', (e) => {
		if (!live) return;
		const b = box.getBoundingClientRect();
		const px = e.clientX - b.left;
		const py = e.clientY - b.top;
		const hit = pick(px, py);
		if (!hit) return;

		// Sin esto el navegador arranca su propio arrastre de imagen o
		// selección de texto y deja de mandar pointermove: la ficha se
		// quedaba pegada al puntero o directamente no respondía.
		e.preventDefault();

		dragged = hit;
		pointer = e.pointerId;
		hit.held = true;
		hit.vx = 0;
		hit.vy = 0;
		hit.el.classList.add('is-held');
		lastPx = px;
		lastPy = py;
		lastT = performance.now();
		box.setPointerCapture(e.pointerId);
		wake();
	});

	box.addEventListener('pointermove', (e) => {
		const bb = box.getBoundingClientRect();
		hoverX = e.clientX - bb.left;
		hoverY = e.clientY - bb.top;
		// Si la simulación se durmió, hay que despertarla: el bucle es quien
		// cuenta el tiempo de hover y coloca la etiqueta.
		if (live && !raf) wake();

		if (!dragged || e.pointerId !== pointer) return;
		const b = box.getBoundingClientRect();
		const px = e.clientX - b.left;
		const py = e.clientY - b.top;
		const now = performance.now();
		const dt = Math.max((now - lastT) / 1000, 1 / 240);

		// Con dt muy pequeño la división dispara la velocidad a miles de
		// px/s. Una ficha agarrada no pasa por el acotado de integrate(),
		// así que hay que acotarla aquí o al soltarla atraviesa a las demás.
		const vx = (px - lastPx) / dt;
		const vy = (py - lastPy) / dt;
		const sp = Math.hypot(vx, vy);
		const k = sp > THROW_SPEED ? THROW_SPEED / sp : 1;

		dragged.vx = vx * k;
		dragged.vy = vy * k;
		dragged.x = Math.min(Math.max(px, dragged.r), width - dragged.r);
		dragged.y = Math.min(Math.max(py, dragged.r), height - dragged.r);

		dragged.spin += ((px - lastPx) / dragged.r) * 0.04;
		if (dragged.spin > MAX_SPIN) dragged.spin = MAX_SPIN;
		else if (dragged.spin < -MAX_SPIN) dragged.spin = -MAX_SPIN;

		lastPx = px;
		lastPy = py;
		lastT = now;
		wake();
	});

	function release(e: PointerEvent) {
		if (!dragged || e.pointerId !== pointer) return;
		dragged.held = false;
		dragged.el.classList.remove('is-held');
		dragged = null;
		pointer = -1;
		wake();
	}

	box.addEventListener('pointerup', release);
	box.addEventListener('pointercancel', release);

	box.addEventListener('pointerleave', () => {
		window.clearTimeout(restTimer);
		restChip = null;
		hoverX = -1;
		hoverY = -1;
		hoverChip = null;
		hideTip();
	});

	function reset() {
		if (!live) return;
		if (raf) cancelAnimationFrame(raf);
		raf = 0;

		for (const c of chips) {
			const s = (c.r0 / c.rMax).toFixed(4);
			c.el.style.transition = 'transform .75s cubic-bezier(0.16, 1, 0.3, 1)';
			c.el.style.transform =
				'translate3d(' +
				(c.homeX - c.rMax) +
				'px, ' +
				(c.homeY - c.rMax) +
				'px, 0) scale(' +
				s +
				') rotate(0rad)';
		}

		hoverChip = null;
		hideTip();
		live = false;
		resetting = true;
		resetBtn!.hidden = true;

		window.setTimeout(() => {
			box.classList.remove('is-live');
			box.style.height = '';
			for (const c of chips) {
				c.el.style.transition = '';
				c.el.style.transform = '';
			}
			startBtn!.hidden = false;
			resetting = false;
		}, 760);
	}

	// Toda la caja arranca la simulación, no solo el botón: así el hover de
	// las fichas funciona en reposo. Antes había una capa que las tapaba y
	// se comía el hover.
	box.addEventListener('click', () => {
		// Durante la vuelta a la rejilla las fichas están a mitad de
		// transición: medirlas ahí daría posiciones sin sentido.
		if (!live && !resetting) start();
	});

	// El botón de arrancar vive dentro de la caja, así que su clic ya burbujea
	// hasta el handler de arriba. El de recolocar tiene que cortar la burbuja
	// o volvería a arrancar en el mismo clic.
	resetBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		reset();
	});

	window.addEventListener(
		'resize',
		() => {
			if (!live) return;
			measure();
			for (const c of chips) {
				c.x = Math.min(Math.max(c.x, c.r), Math.max(width - c.r, c.r));
				c.y = Math.min(Math.max(c.y, c.r), Math.max(height - c.r, c.r));
			}
			wake();
		},
		{ passive: true }
	);

	calm.addEventListener('change', (e) => {
		if (e.matches && live) reset();
	});
}
