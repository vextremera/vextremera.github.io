import type { Dict } from './types';

/* ===========================================================================
   CONTENIDO — ESPAÑOL
   ---------------------------------------------------------------------------
   Todo lo que se lee en la web sale de este fichero (y de en.ts).
   Los componentes no llevan texto dentro.

   PENDIENTE DE RELLENAR — busca los corchetes [ ]:
     · hero.location          tu ciudad
     · about.facts            idiomas / ubicación
     · projects.items         los 4 proyectos completos (pon placeholder: false
                              en cada uno cuando lo rellenes)
     · experience.items       tus puestos reales
     · education.items        tu formación real
     · contact.social         tus URLs de LinkedIn y GitHub
     · contact.cvHref         deja tu CV en public/ con ese nombre
   Mantén el mismo slug, el mismo n y el mismo orden en es.ts y en.ts.
   =========================================================================== */

export const es: Dict = {
	locale: 'es',
	htmlLang: 'es-ES',

	meta: {
		title: 'Victor Extremera — Desarrollador web full-stack',
		description:
			'Portfolio de Victor Extremera, desarrollador web junior full-stack. Java, Node.js, TypeScript y Astro: del modelo de datos a la interfaz, con atención al detalle.',
		ogAlt: 'Victor Extremera, desarrollador web full-stack',
	},

	a11y: {
		skip: 'Saltar al contenido',
		menuOpen: 'Abrir menú',
		menuClose: 'Cerrar menú',
		theme: 'Cambiar entre tema claro y oscuro',
		lang: 'View this page in English',
		toTop: 'Volver arriba',
		nav: 'Secciones del portfolio',
	},

	nav: [
		{ id: 'about', label: 'Sobre mí' },
		{ id: 'stack', label: 'Stack' },
		{ id: 'projects', label: 'Proyectos' },
		{ id: 'experience', label: 'Experiencia' },
		{ id: 'education', label: 'Formación' },
		{ id: 'contact', label: 'Contacto' },
	],

	hero: {
		name: 'Victor Extremera',
		statementLead: 'Construyo la parte que se ve y la que la ',
		statementEm: 'sostiene',
		statementTail: '.',
		support:
			'Full-stack con buen ojo para la interfaz. Del esquema de la base de datos al estado de foco de un botón — y aprendo lo que haga falta para que las piezas encajen.',
		ctaPrimary: 'Ver proyectos',
		ctaSecondary: 'Hablemos',
		status: 'Disponible para incorporarme a un equipo',
		location: 'Lloret de Mar, España',
		timeLabel: 'Hora local',
		scroll: 'Sigue bajando',
	},

	about: {
		n: '01',
		title: 'Sobre mí',
		statement: 'Todavía estoy construyendo mi oficio. Me lo tomo en serio.',
		body: [
			'Empecé por curiosidad: entender qué pasa de verdad entre que alguien pulsa un botón y le vuelve una respuesta. Esa cadena entera —interfaz, servidor, base de datos— es lo que me enganchó, y sigo ahí.',
			'Soy junior y lo digo sin rodeos. No tengo diez años de experiencia: tengo criterio, constancia y una obsesión sana por los detalles que casi nadie mira. El estado de foco. El layout que salta al cargar. La consulta que va fina con diez filas y se cae con diez mil. Lo que pasa cuando el texto mide el doble de lo previsto.',
			'Trabajo a los dos lados: monto la interfaz y también la API y el modelo de datos que hay debajo. No domino todo por igual, soy junior, pero entiendo el recorrido completo — y eso hace que no proponga cosas imposibles. Lo que busco ahora es un equipo con gente mejor que yo y con ganas de enseñar.',
		],
		factsTitle: 'En corto',
		facts: [
			{ k: 'Perfil', v: 'Full-stack' },
			{ k: 'Idiomas', v: 'Español · Catalán · Inglés' },
			{ k: 'Ubicación', v: 'Lloret de Mar, España' },
			{ k: 'Estado', v: 'Buscando equipo' },
		],
	},

	stack: {
		n: '02',
		title: 'Stack',
		lead: 'Lo que uso a diario, lo que uso cuando hace falta, y lo que toco lo justo para entenderme con quien lo domina.',
		groups: [
			{ id: 'lang', title: 'Lenguajes', note: 'Con los que escribo' },
			{ id: 'front', title: 'Frontend', note: 'Interfaz y accesibilidad' },
			{ id: 'back', title: 'Backend y datos', note: 'Servidor, APIs y bases de datos' },
			{ id: 'infra', title: 'Infraestructura', note: 'Dónde corre y cómo se despliega' },
			{ id: 'tools', title: 'Herramientas', note: 'El día a día' },
			{ id: 'design', title: 'Diseño', note: 'Cuando toca maquetar o dibujar' },
		],
		alsoLabel: 'Además',
		also: ['Diseño responsive', 'Desarrollo de UI', 'Accesibilidad', 'APIs REST'],
		nextLabel: 'Interesado en',
		next: ['AWS', 'Kubernetes', 'Python'],
		footnote:
			'Sin barras de progreso ni porcentajes: no significan nada. Si quieres saber mi nivel real con algo, pregúntamelo y te lo digo sin adornos.',
		gravity: {
			hint: 'Suéltalos',
			activate: 'Soltar los logos: caen y se pueden arrastrar',
			drag: 'Arrástralos',
			reset: 'Recolocar',
			calm: 'Tu sistema pide movimiento reducido, así que se quedan quietos.',
		},
	},
	method: {
		n: '03',
		title: 'Cómo trabajo',
		lead: 'Menos adjetivos, más ejemplos.',
		items: [
			{
				tag: 'Comunicación',
				title: 'Pregunto pronto',
				body: 'Prefiero una pregunta incómoda el lunes que rehacer el trabajo el viernes.',
			},
			{
				tag: 'Adaptabilidad',
				title: 'Leo antes de proponer',
				body: 'Cuando entro en código que no es mío, primero entiendo por qué está hecho así. Casi siempre hay una razón.',
			},
			{
				tag: 'Aprendizaje',
				title: 'Aprendo en voz alta',
				body: 'Si no sé algo lo digo, lo busco y mañana lo sé. Admitir que empiezo de cero no me cuesta nada.',
			},
			{
				tag: 'Detalle',
				title: 'El detalle es el trabajo',
				body: 'Un foco mal resuelto o un layout que salta dicen tanto de un equipo como su arquitectura.',
			},
			{
				tag: 'Resolución',
				title: 'Parto el problema',
				body: 'Antes de escribir nada separo lo que sé de lo que supongo. Casi siempre queda un problema mucho más pequeño.',
			},
			{
				tag: 'Equipo',
				title: 'El código es de todos',
				body: 'Escribo pensando en quien lo lea después. A veces ese alguien soy yo dentro de tres meses.',
			},
			{
				tag: 'Curiosidad',
				title: 'Pruebo fuera de producción',
				body: 'Lo nuevo entra primero en un proyecto pequeño. La curiosidad está bien; experimentar con el trabajo de otros, no.',
			},
			{
				tag: 'Responsabilidad',
				title: 'Termino lo que empiezo',
				body: 'Un 90% entregado tarde vale menos que un 80% entregado, revisado y en manos de alguien.',
			},
		],
	},

	projects: {
		n: '04',
		title: 'Proyectos',
		lead: 'Cada uno resuelve algo distinto. Entra en el que te interese: dentro está el problema, qué hice exactamente y qué me llevé.',
		featuredLabel: 'Caso principal',
		viewCase: 'Ver el caso',
		repo: 'Código',
		demo: 'Demo',
		placeholderBadge: 'Pendiente de rellenar',
		labels: {
			problem: 'El problema',
			contribution: 'Mi aportación',
			outcome: 'Resultado',
			stack: 'Tecnologías',
			role: 'Rol',
			year: 'Año',
			type: 'Tipo',
			back: 'Todos los proyectos',
			next: 'Siguiente proyecto',
			overview: 'Resumen',
		},
		items: [
			{
				slug: 'proyecto-uno',
				n: '01',
				name: '[Proyecto destacado]',
				tagline: '[Una frase que explique qué es y para quién]',
				year: '[año]',
				role: '[solo · equipo de N · full-stack]',
				type: '[personal · académico · cliente]',
				stack: ['[Tecnología]', '[Tecnología]', '[Tecnología]'],
				problem:
					'[Qué problema resuelve, o por qué decidiste construirlo. Dos o tres frases bastan: cuál era la situación y qué faltaba.]',
				contribution:
					'[Qué hiciste tú exactamente. Si fue en equipo, deja muy claro qué parte era tuya y con quién te coordinabas.]',
				outcome:
					'[En qué quedó: qué funcionó, qué aprendiste, qué harías distinto hoy. No hace falta inventar métricas — la honestidad se nota.]',
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
				name: '[Segundo proyecto]',
				tagline: '[Qué demuestra este que no demuestre el anterior]',
				year: '[año]',
				role: '[tu rol]',
				type: '[personal · académico · cliente]',
				stack: ['[Tecnología]', '[Tecnología]'],
				problem: '[El problema o la motivación.]',
				contribution: '[Tu aportación concreta.]',
				outcome: '[El resultado y lo aprendido.]',
				repo: '',
				demo: '',
				placeholder: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-tres',
				n: '03',
				name: '[Tercer proyecto]',
				tagline: '[Ideal: uno que enseñe el lado backend o de datos]',
				year: '[año]',
				role: '[tu rol]',
				type: '[personal · académico · cliente]',
				stack: ['[Tecnología]', '[Tecnología]'],
				problem: '[El problema o la motivación.]',
				contribution: '[Tu aportación concreta.]',
				outcome: '[El resultado y lo aprendido.]',
				repo: '',
				demo: '',
				placeholder: true,
				cover: '',
				coverAlt: '',
			},
			{
				slug: 'proyecto-cuatro',
				n: '04',
				name: '[Cuarto proyecto]',
				tagline: '[Algo pequeño pero bien acabado también cuenta]',
				year: '[año]',
				role: '[tu rol]',
				type: '[personal · académico · cliente]',
				stack: ['[Tecnología]'],
				problem: '[El problema o la motivación.]',
				contribution: '[Tu aportación concreta.]',
				outcome: '[El resultado y lo aprendido.]',
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
		title: 'Experiencia',
		lead: 'Poca todavía, pero cada sitio me dejó algo concreto.',
		labels: {
			duties: 'Responsabilidades',
			learned: 'Qué me llevé',
			stack: 'Stack',
			abroad: 'Internacional',
		},
		items: [
			{
				company: '[Empresa]',
				role: '[Puesto]',
				period: '[mes año] — [mes año o Actualidad]',
				location: '[Ciudad, País]',
				summary:
					'[Dos o tres frases sobre qué hacía la empresa y cuál era tu papel dentro del equipo.]',
				duties: [
					'[Responsabilidad concreta]',
					'[Responsabilidad concreta]',
					'[Responsabilidad concreta]',
				],
				learned: '[Lo que aprendiste ahí y que no habrías aprendido solo.]',
				stack: ['[Tecnología]', '[Tecnología]'],
				international: true,
				placeholder: true,
			},
			{
				company: '[Empresa o proyecto]',
				role: '[Puesto]',
				period: '[mes año] — [mes año]',
				location: '[Ciudad, País]',
				summary: '[Contexto y tu papel.]',
				duties: ['[Responsabilidad concreta]', '[Responsabilidad concreta]'],
				learned: '[Lo que aprendiste.]',
				stack: ['[Tecnología]'],
				placeholder: true,
			},
		],
	},

	education: {
		n: '06',
		title: 'Formación',
		lead: 'La base académica y lo que he ido sumando por mi cuenta.',
		labels: { topics: 'Contenidos', more: 'Formación adicional' },
		items: [
			{
				title: '[Titulación]',
				school: '[Centro educativo]',
				period: '[año] — [año]',
				location: '[Ciudad, País]',
				detail: '[Qué cubría y qué parte te marcó más.]',
				topics: ['[Materia]', '[Materia]', '[Materia]'],
				placeholder: true,
			},
			{
				title: '[Curso o certificación]',
				school: '[Plataforma o centro]',
				period: '[año]',
				location: 'Online',
				detail: '[Qué aprendiste y dónde lo has aplicado después.]',
				topics: ['[Materia]', '[Materia]'],
				placeholder: true,
			},
		],
		moreNote:
			'Añade aquí cursos, certificaciones o formación suelta a medida que la hagas: la lista crece sola.',
	},

	contact: {
		n: '07',
		title: 'Let’s build something.',
		lead: 'Si buscáis a alguien junior con criterio, ganas reales de aprender y sin miedo a preguntar, escribidme. Contesto a todos los mensajes.',
		emailLabel: 'Escríbeme',
		email: 'vicres43@gmail.com',
		copy: 'Copiar',
		copied: 'Copiado',
		cvLabel: 'Descargar CV',
		cvHref: '/cv-victor-extremera.pdf',
		social: [
			{
				label: 'LinkedIn',
				href: 'https://www.linkedin.com/in/[tu-usuario]',
				handle: '[tu-usuario]',
			},
			{ label: 'GitHub', href: 'https://github.com/[tu-usuario]', handle: '[tu-usuario]' },
		],
		note: 'También me interesan prácticas, becas o proyectos pequeños si encajan.',
	},

	footer: {
		colophon:
			'Astro, TypeScript y Tailwind CSS v4. Inter, Instrument Serif y JetBrains Mono servidas desde este mismo dominio. Sin librerías: las animaciones y el motor de físicas del stack son CSS y JavaScript escritos a mano.',
		rights: 'Diseñado y desarrollado por Victor Extremera',
		toTop: 'Arriba',
	},
};
