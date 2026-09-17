export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export interface NavItem {
	id: string;
	label: string;
}

export interface Fact {
	k: string;
	v: string;
}

export type TechGroup = 'lang' | 'front' | 'back' | 'infra' | 'tools' | 'design';

/** Solo la parte traducible de un grupo. Las tecnologías viven en
    src/data/tech.ts porque su nombre no cambia de idioma. */
export interface SkillGroup {
	id: TechGroup;
	title: string;
	note: string;
}

export interface Principle {
	tag: string;
	title: string;
	body: string;
}

export interface Project {
	/** Identificador de URL. Debe ser igual en los dos idiomas. */
	slug: string;
	n: string;
	name: string;
	tagline: string;
	year: string;
	role: string;
	type: string;
	stack: string[];
	problem: string;
	contribution: string;
	outcome: string;
	/** Vacío = no se muestra el enlace. */
	repo: string;
	demo: string;
	featured?: boolean;
	/** Muestra el distintivo de contenido pendiente. Ponlo a false al rellenarlo. */
	placeholder?: boolean;
	/**
	 * Hueco anunciado pero todavía sin contenido. La ficha se pinta sin
	 * enlace y no se le genera página de caso: enlazar a una página vacía
	 * es peor que no enlazar.
	 */
	soon?: boolean;
	/** Ruta a una captura en /public. Vacío = portada tipográfica generada. */
	cover: string;
	coverAlt: string;
}

export interface Job {
	company: string;
	role: string;
	period: string;
	location: string;
	summary: string;
	duties: string[];
	learned: string;
	stack: string[];
	international?: boolean;
	placeholder?: boolean;
}

export interface Study {
	title: string;
	school: string;
	period: string;
	location: string;
	detail: string;
	topics: string[];
	placeholder?: boolean;
}

export interface Dict {
	locale: Locale;
	htmlLang: string;
	meta: { title: string; description: string; ogAlt: string };
	a11y: {
		skip: string;
		menuOpen: string;
		menuClose: string;
		theme: string;
		lang: string;
		toTop: string;
		nav: string;
	};
	nav: NavItem[];
	hero: {
		name: string;
		statementLead: string;
		statementEm: string;
		statementTail: string;
		support: string;
		ctaPrimary: string;
		ctaSecondary: string;
		status: string;
		location: string;
		timeLabel: string;
		scroll: string;
	};
	about: {
		n: string;
		title: string;
		statement: string;
		body: string[];
		factsTitle: string;
		facts: Fact[];
	};
	stack: {
		n: string;
		title: string;
		lead: string;
		groups: SkillGroup[];
		/** Competencias sin logo: conceptos, no herramientas. */
		alsoLabel: string;
		also: string[];
		/** Lo que todavía no está en el stack. Separado a propósito: mezclarlo
		    con lo que sí usa sería vender humo. */
		nextLabel: string;
		next: string[];
		footnote: string;
		gravity: {
			hint: string;
			activate: string;
			drag: string;
			reset: string;
			calm: string;
		};
	};
	method: { n: string; title: string; lead: string; items: Principle[] };
	projects: {
		n: string;
		title: string;
		lead: string;
		featuredLabel: string;
		viewCase: string;
		repo: string;
		demo: string;
		placeholderBadge: string;
		labels: {
			problem: string;
			contribution: string;
			outcome: string;
			stack: string;
			role: string;
			year: string;
			type: string;
			back: string;
			next: string;
			overview: string;
		};
		items: Project[];
	};
	experience: {
		n: string;
		title: string;
		lead: string;
		labels: { duties: string; learned: string; stack: string; abroad: string };
		items: Job[];
	};
	education: {
		n: string;
		title: string;
		lead: string;
		labels: { topics: string; more: string };
		items: Study[];
		moreNote: string;
	};
	contact: {
		n: string;
		title: string;
		lead: string;
		emailLabel: string;
		email: string;
		copy: string;
		copied: string;
		cvLabel: string;
		cvHref: string;
		social: { label: string; href: string; handle: string }[];
		note: string;
	};
	footer: { colophon: string; rights: string; toTop: string };
}
