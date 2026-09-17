import type { Dict } from './types';

/* ===========================================================================
   CONTENT — ENGLISH
   ---------------------------------------------------------------------------
   Not a literal translation of es.ts. Same structure, same slugs, same order,
   but written to read naturally to an international recruiter.

   TO FILL IN — look for the brackets [ ]. Keep slug / n / order in sync
   with es.ts, or the case-study links will not match between languages.
   =========================================================================== */

export const en: Dict = {
	locale: 'en',
	htmlLang: 'en',

	meta: {
		title: 'Victor Extremera — Full-stack Web Developer',
		description:
			'Portfolio of Victor Extremera, a junior full-stack web developer. Java, Node.js, TypeScript and Astro: from the data model to the interface, with attention to detail.',
		ogAlt: 'Victor Extremera, full-stack web developer',
	},

	a11y: {
		skip: 'Skip to content',
		menuOpen: 'Open menu',
		menuClose: 'Close menu',
		theme: 'Switch between light and dark theme',
		lang: 'Ver esta página en español',
		toTop: 'Back to top',
		nav: 'Portfolio sections',
	},

	nav: [
		{ id: 'about', label: 'About' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'education', label: 'Education' },
		{ id: 'contact', label: 'Contact' },
	],

	hero: {
		name: 'Victor Extremera',
		statementLead: 'I build the part people see and the part that ',
		statementEm: 'holds it up',
		statementTail: '.',
		support:
			'Full-stack, with an eye for the interface. From the database schema to a button’s focus state — and I learn whatever it takes to make the pieces fit.',
		ctaPrimary: 'See projects',
		ctaSecondary: 'Get in touch',
		status: 'Available to join a team',
		location: 'Lloret de Mar, Spain',
		timeLabel: 'Local time',
		scroll: 'Keep scrolling',
	},

	about: {
		n: '01',
		title: 'About',
		statement: 'I am still learning the craft. I take it seriously.',
		body: [
			'It started with curiosity: working out what really happens between someone pressing a button and a response coming back. That whole chain — interface, server, database — is what hooked me, and I am still there.',
			'I am junior and I would rather say so plainly. I do not have ten years of experience: I have judgement, persistence and a healthy obsession with the details most people skip. Focus states. Layout that jumps on load. A query that flies with ten rows and falls over with ten thousand. What happens when the copy turns out twice as long as the mockup.',
			'I work on both sides: I build the interface, and also the API and the data model underneath it. I am junior, so I am not equally strong everywhere — but I understand the full round trip, and that keeps me from proposing things that cannot be built. What I am looking for now is a team of people better than me who are willing to teach.',
		],
		factsTitle: 'In short',
		facts: [
			{ k: 'Profile', v: 'Full-stack' },
			{ k: 'Languages', v: 'Spanish · Catalan · English' },
			{ k: 'Location', v: 'Lloret de Mar, Spain' },
			{ k: 'Status', v: 'Looking for a team' },
		],
	},

	stack: {
		n: '02',
		title: 'Stack',
		lead: 'What I use every day, what I reach for when a project needs it, and what I know just well enough to work with the people who own it.',
		groups: [
			{ id: 'lang', title: 'Languages', note: 'What I write in' },
			{ id: 'front', title: 'Frontend', note: 'Interface and accessibility' },
			{ id: 'back', title: 'Backend & data', note: 'Server, APIs and databases' },
			{ id: 'infra', title: 'Infrastructure', note: 'Where it runs and how it ships' },
			{ id: 'tools', title: 'Tools', note: 'Daily drivers' },
			{ id: 'design', title: 'Design', note: 'When I need to lay things out' },
		],
		alsoLabel: 'Also',
		also: ['Responsive design', 'UI development', 'Accessibility', 'REST APIs'],
		nextLabel: 'Interested in',
		next: ['AWS', 'Kubernetes', 'Python'],
		footnote:
			'No progress bars, no percentages — they do not mean anything. If you want to know how far I actually am with something, ask me and I will tell you straight.',
		gravity: {
			hint: 'Drop them',
			activate: 'Drop the logos: they fall and can be dragged around',
			drag: 'Drag them',
			reset: 'Put them back',
			calm: 'Your system asks for reduced motion, so they stay put.',
		},
	},
	method: {
		n: '03',
		title: 'How I work',
		lead: 'Fewer adjectives, more examples.',
		items: [
			{
				tag: 'Communication',
				title: 'I ask early',
				body: 'An awkward question on Monday beats rebuilding the whole thing on Friday.',
			},
			{
				tag: 'Adaptability',
				title: 'I read before I suggest',
				body: 'When I land in code that is not mine, I work out why it was written that way first. There is usually a reason.',
			},
			{
				tag: 'Learning',
				title: 'I learn out loud',
				body: 'If I do not know something I say so, go and find out, and know it the next day. Admitting I am starting from zero costs me nothing.',
			},
			{
				tag: 'Craft',
				title: 'The detail is the job',
				body: 'A broken focus state or a layout that shifts says as much about a team as its architecture does.',
			},
			{
				tag: 'Problem solving',
				title: 'I break the problem down',
				body: 'Before writing anything I separate what I know from what I am assuming. What is left is usually a much smaller problem.',
			},
			{
				tag: 'Teamwork',
				title: 'The code belongs to everyone',
				body: 'I write for whoever reads it next. Sometimes that person is me in three months.',
			},
			{
				tag: 'Curiosity',
				title: 'I experiment outside production',
				body: 'New things go into a small project first. Curiosity is good; experimenting with other people’s work is not.',
			},
			{
				tag: 'Ownership',
				title: 'I finish what I start',
				body: 'Ninety percent delivered late is worth less than eighty percent delivered, reviewed and in someone’s hands.',
			},
		],
	},

	projects: {
		n: '04',
		title: 'Projects',
		lead: 'Each one solves something different. Open whichever interests you — inside is the problem, what I actually did, and what I took away.',
		featuredLabel: 'Lead case',
		viewCase: 'Read the case',
		repo: 'Code',
		demo: 'Live',
		placeholderBadge: 'To be filled in',
		labels: {
			problem: 'The problem',
			contribution: 'What I did',
			outcome: 'Outcome',
			stack: 'Built with',
			role: 'Role',
			year: 'Year',
			type: 'Type',
			back: 'All projects',
			next: 'Next project',
			overview: 'Overview',
		},
		items: [
			{
				slug: 'arcadia',
				n: '01',
				name: 'ARCADIA',
				tagline: 'Menu, online ordering and back office for a bar-restaurant.',
				year: '2026',
				role: 'Solo · Full-stack',
				type: '[personal · academic · client]',
				stack: ['Astro', 'TypeScript', 'Preact', 'Tailwind CSS', 'Astro DB', 'Redis', 'Vercel'],
				problem: [
					'A bar-restaurant that wants to sell online needs rather more than a PDF menu: a catalogue with allergens, products you can configure to taste, orders for pickup or delivery, and someone on the staff who can change prices, opening hours or coupons without touching code.',
					'ARCADIA covers that whole journey, from the public menu to the kitchen screen.',
				],
				contribution: [
					'I built all of it, on my own. Of the 150 commits in the repository, 149 are mine; the other one belongs to the Astro bot.',
					'The hardest part is the part you cannot see. A product is not a row with a price on it: it is a base you strip ingredients from, add extras to and pick sauces for, and every combination has to add up in price and carry its own allergens. All of that lives in the Astro DB schema, spread across products, ingredients, modifiers and the compatibility rules that say what can go with what. The step-by-step configurator is just the visible face of that decision table.',
					'On the front, Astro serving HTML and Preact only in the three islands that genuinely need state: the cart, the configurator and the upsell. The cart survives the session in Redis, and the checkout revalidates availability and coupons on the server before creating the order, because I do not trust anything that arrives from the browser.',
					'Behind it sits the back office: eighteen areas that look like nothing and decide everything, from catalogue and allergens to opening hours, payment methods, coupons, upsell, loyalty, kitchen and audit. If the owner cannot change a price without calling me, the project has failed however good the front end looks.',
				],
				outcome: [
					'Finished and running: you can order end to end, the business administers all of it from the panel, and the kitchen works from its own screen.',
					'What I took away is what it is like to build against a real problem rather than a brief. Nobody hands you the awkward cases; they turn up on their own, and every decision you make gets paid for or paid back weeks later.',
					'What I would do differently: today I would build it with React rather than Preact.',
				],
				repo: 'https://github.com/vextremera/arcadia',
				demo: 'https://victorextremera.cat',
				featured: true,
				cover: '/proyectos/arcadia.webp',
				coverAlt:
					'ARCADIA home page: a chef finishing a plate, spooning oil over it, with the restaurant name set over the image.',
			},
			{
				slug: 'proyecto-dos',
				n: '02',
				name: 'Coming soon',
				tagline: '',
				year: '',
				role: '',
				type: '',
				stack: [],
				problem: [],
				contribution: [],
				outcome: [],
				repo: '',
				demo: '',
				soon: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-tres',
				n: '03',
				name: 'Coming soon',
				tagline: '',
				year: '',
				role: '',
				type: '',
				stack: [],
				problem: [],
				contribution: [],
				outcome: [],
				repo: '',
				demo: '',
				soon: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-cuatro',
				n: '04',
				name: 'Coming soon',
				tagline: '',
				year: '',
				role: '',
				type: '',
				stack: [],
				problem: [],
				contribution: [],
				outcome: [],
				repo: '',
				demo: '',
				soon: true,
				cover: '',
				coverAlt: '',
			},
		],
	},

	experience: {
		n: '05',
		title: 'Experience',
		lead: 'Not a long list yet, but every place left me with something specific.',
		labels: {
			duties: 'Responsibilities',
			learned: 'What I took away',
			stack: 'Stack',
			abroad: 'International',
		},
		items: [
			{
				company: 'Web agency',
				role: 'Web developer · Erasmus+',
				period: 'February 2026 — May 2026',
				location: 'Malta',
				summary:
					'An Erasmus+ placement working for real clients, in English, a long way from home. What left my hands was going to be used by someone who had paid for it.',
				duties: [
					'Designing and building websites in WordPress',
					'Fixing problems in code and in plugins',
					'Professional image editing',
					'Walking new interns through how the work got done',
				],
				learned:
					'How to deal with real clients, who do not bring you a specification, they bring you a result they have in mind, and change it halfway through. Also how to organise myself alone in another country, and how not to freeze when something breaks and there is nobody to ask.',
				stack: ['WordPress', 'Photoshop'],
				international: true,
			},
			{
				company: 'Restaurant',
				role: 'Front of house manager',
				period: 'Summer 2022 — January 2026',
				location: 'Lloret de Mar, Spain',
				summary:
					'Part time, weekends, alongside my studies and alongside everything else on this list. Running the floor on the busiest shifts.',
				duties: [
					'Running the workflow of the whole floor team',
					'Managing the orders for every table',
					'Making sure the service went out properly',
				],
				learned:
					'Responsibility, teamwork and empathy. A full service teaches you quickly that the work only gets done when the team moves in step, and that keeping it in step means looking at how each person is coping before you hand anything out.',
				stack: [],
			},
			{
				company: 'Institut Escola',
				role: 'IT technician · Placement',
				period: 'September 2023 — January 2024',
				location: 'Lloret de Mar, Spain',
				summary:
					'A placement looking after the school’s IT: the devices handed out by the government, the school’s own hardware, and every software problem the teaching staff ran into.',
				duties: [
					'Administering the Chromebooks issued to the school under the government programme',
					'Repairing the school’s hardware',
					'Handling the teaching staff’s software issues through an internal mail inbox',
				],
				learned:
					'Persistence: the tickets never stop and you take them one at a time. And how to explain technical things without technical words, because on the other end of that inbox were teachers who wanted to teach their lesson, not understand the problem.',
				stack: ['Chromebooks', 'Hardware'],
			},
		],
	},

	education: {
		n: '06',
		title: 'Education',
		lead: 'The formal grounding, plus what I have added on my own since.',
		labels: { topics: 'Covered', more: 'Further training' },
		items: [
			{
				/* Formación profesional española. Se deja el nombre original
				   entre paréntesis: traducido a secas no le dice gran cosa a
				   quien contrata fuera, y sin traducir tampoco. */
				title: 'Higher Vocational Diploma in Web Application Development',
				school: 'Institut Sa Palomera',
				period: '2024 — 2026',
				location: 'Blanes, Spain',
				detail:
					'Both sides of a web application: from markup and accessible design through to the back end and the database. Spanish “Grado Superior en Desarrollo de Aplicaciones Web”. It is the training behind nearly everything on this site.',
				topics: [
					'Frontend',
					'Backend',
					'Databases',
					'Design',
					'Accessibility',
					'Markup languages',
					'Development environments',
				],
			},
			{
				title: 'Intermediate Vocational Diploma in Computer Systems and Networks',
				school: 'Institut Sa Palomera',
				period: '2022 — 2024',
				location: 'Blanes, Spain',
				detail:
					'The layer underneath development: hardware, operating systems and networks. Spanish “Grado Medio en Sistemas Microinformáticos y Redes”. Knowing what is down there when something breaks is not something you pick up by writing code.',
				topics: ['Operating systems', 'Networks', 'Hardware', 'Office software', 'Business'],
			},
		],
		moreNote:
			'Four straight years at the same school: the intermediate diploma first, then the higher one right after it, with no gap in between.',
	},

	contact: {
		n: '07',
		title: 'Let’s build something.',
		lead: 'If you are looking for someone junior with judgement, a real appetite to learn and no fear of asking questions, write to me. I answer every message.',
		emailLabel: 'Write to me',
		email: 'vicres43@gmail.com',
		copy: 'Copy',
		copied: 'Copied',
		cvLabel: 'Download CV',
		/* Each language gets its own PDF: reading the site in English
		   downloads the English CV. */
		cvHref: '/cv-victor-extremera-en.pdf',
		social: [
			{
				label: 'LinkedIn',
				href: 'https://www.linkedin.com/in/[your-handle]',
				handle: '[your-handle]',
			},
			{ label: 'GitHub', href: 'https://github.com/[your-handle]', handle: '[your-handle]' },
		],
		note: 'I am also open to internships, placements or small projects if they fit.',
	},

	footer: {
		colophon:
			'Astro, TypeScript and Tailwind CSS v4. Inter, Instrument Serif and JetBrains Mono served from this domain. No libraries: the animations and the stack section physics engine are hand-written CSS and JavaScript.',
		rights: 'Designed and built by Victor Extremera',
		toTop: 'Top',
	},
};
