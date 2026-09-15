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
				slug: 'proyecto-uno',
				n: '01',
				name: '[Lead project]',
				tagline: '[One line: what it is and who it is for]',
				year: '[year]',
				role: '[solo · team of N · full-stack]',
				type: '[personal · academic · client]',
				stack: ['[Technology]', '[Technology]', '[Technology]'],
				problem:
					'[What it solves, or why you built it. Two or three sentences: what the situation was and what was missing.]',
				contribution:
					'[What you did yourself. If it was a team project, be explicit about which part was yours and who you worked with.]',
				outcome:
					'[How it ended: what worked, what you learned, what you would do differently now. No need to invent metrics — honesty reads well.]',
				repo: '',
				demo: '',
				featured: true,
				placeholder: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-dos',
				n: '02',
				name: '[Second project]',
				tagline: '[What this one proves that the first one does not]',
				year: '[year]',
				role: '[your role]',
				type: '[personal · academic · client]',
				stack: ['[Technology]', '[Technology]'],
				problem: '[The problem or the motivation.]',
				contribution: '[Your specific contribution.]',
				outcome: '[The result and what you learned.]',
				repo: '',
				demo: '',
				placeholder: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-tres',
				n: '03',
				name: '[Third project]',
				tagline: '[Ideally one that shows the backend or data side]',
				year: '[year]',
				role: '[your role]',
				type: '[personal · academic · client]',
				stack: ['[Technology]', '[Technology]'],
				problem: '[The problem or the motivation.]',
				contribution: '[Your specific contribution.]',
				outcome: '[The result and what you learned.]',
				repo: '',
				demo: '',
				placeholder: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-cuatro',
				n: '04',
				name: '[Fourth project]',
				tagline: '[Something small but properly finished counts too]',
				year: '[year]',
				role: '[your role]',
				type: '[personal · academic · client]',
				stack: ['[Technology]'],
				problem: '[The problem or the motivation.]',
				contribution: '[Your specific contribution.]',
				outcome: '[The result and what you learned.]',
				repo: '',
				demo: '',
				placeholder: true,
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
				company: '[Company]',
				role: '[Job title]',
				period: '[month year] — [month year or Present]',
				location: '[City, Country]',
				summary:
					'[Two or three sentences on what the company did and what your part in the team was.]',
				duties: [
					'[Specific responsibility]',
					'[Specific responsibility]',
					'[Specific responsibility]',
				],
				learned: '[What you learned there that you would not have learned alone.]',
				stack: ['[Technology]', '[Technology]'],
				international: true,
				placeholder: true,
			},
			{
				company: '[Company or project]',
				role: '[Job title]',
				period: '[month year] — [month year]',
				location: '[City, Country]',
				summary: '[Context and your part in it.]',
				duties: ['[Specific responsibility]', '[Specific responsibility]'],
				learned: '[What you learned.]',
				stack: ['[Technology]'],
				placeholder: true,
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
				title: '[Qualification]',
				school: '[Institution]',
				period: '[year] — [year]',
				location: '[City, Country]',
				detail: '[What it covered and which part stuck with you.]',
				topics: ['[Subject]', '[Subject]', '[Subject]'],
				placeholder: true,
			},
			{
				title: '[Course or certification]',
				school: '[Platform or institution]',
				period: '[year]',
				location: 'Online',
				detail: '[What you learned and where you have applied it since.]',
				topics: ['[Subject]', '[Subject]'],
				placeholder: true,
			},
		],
		moreNote:
			'Add courses, certifications and one-off training here as you go — the list grows on its own.',
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
		cvHref: '/cv-victor-extremera.pdf',
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
