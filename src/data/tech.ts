import type { TechGroup } from '../i18n/types';

/* ===========================================================================
   FICHAS DEL STACK
   ---------------------------------------------------------------------------
   Aquí solo los metadatos. El dibujo vive en /public/logos.svg, un sprite de
   <symbol> que el navegador descarga y cachea una vez, en lugar de viajar
   incrustado en el HTML.

   Dos fuentes, horneadas: ninguna es dependencia del proyecto.

     simple-icons (CC0)   Base. Trazo único de 24x24 sin `fill` propio: hereda
                          currentColor, así que en reposo va en gris y al
                          interactuar toma el color de marca. Todos los logos
                          tienen el mismo peso visual y la misma construcción.

     thesvg (MIT)         Solo para los que simple-icons no tiene, porque sus
                          dueños pidieron ser retirados: Java (Oracle), C# y
                          VS Code (Microsoft), AWS (Amazon), Photoshop (Adobe)
                          y Canva. Esos van con su arte a color.

   Las marcas son de sus dueños; se usan solo para identificar la tecnología.

   Colores — los cuatro existen para TODAS las fichas, porque los usa también
   la etiqueta de nombre que sale al pasar el ratón:

     hex / hexDark   Color de marca ajustado: mezclado hacia negro o blanco lo
                     justo para llegar al contraste mínimo sobre el fondo de
                     cada tema. Sin ese ajuste el amarillo de JavaScript queda
                     a 1.2:1 sobre el papel y el negro de GitHub desaparece en
                     el tema oscuro.
     tipBg / tipFg   Fondo y texto de la etiqueta de nombre, para cada tema.
                     El fondo parte del color de marca y se empuja lo justo
                     para que el texto llegue a 4.5:1: con azules de tono
                     medio ni negro ni blanco pasan de 4.4:1 sobre el color
                     tal cual, y la etiqueta lleva texto pequeño.

   `invertOnDark` / `invertOnLight` (solo `kind: 'color'`) — ese arte es
   monocromo y desaparecería sobre su propio fondo, así que ese estado se
   invierte. Invertir un logo con color real le cambiaría el tono.

   Todos los símbolos van normalizados a viewBox "0 0 24 24" y los ids de sus
   <defs> llevan prefijo — sin eso, varios logos con id="a" se pisarían los
   degradados entre sí.
   =========================================================================== */

export type TechKind = 'mono' | 'color';

export interface Tech {
	id: string;
	name: string;
	group: TechGroup;
	kind: TechKind;
	hex: string;
	hexDark: string;
	tipBg: string;
	tipFg: string;
	tipBgDark: string;
	tipFgDark: string;
	invertOnDark: boolean;
	invertOnLight: boolean;
}

export const SPRITE_URL = '/logos.svg';

export const tech: Tech[] = [
	{ id: 'javascript', name: 'JavaScript', group: 'lang', kind: 'mono', hex: '#AD9C15', hexDark: '#F7DF1E', tipBg: '#AD9C15', tipFg: '#14130F', tipBgDark: '#F7DF1E', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'typescript', name: 'TypeScript', group: 'lang', kind: 'mono', hex: '#3178C6', hexDark: '#3178C6', tipBg: '#4686CC', tipFg: '#14130F', tipBgDark: '#4686CC', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'java', name: 'Java', group: 'lang', kind: 'color', hex: '#E76F00', hexDark: '#E76F00', tipBg: '#E76F00', tipFg: '#14130F', tipBgDark: '#E76F00', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'csharp', name: 'C#', group: 'lang', kind: 'color', hex: '#953DAC', hexDark: '#953DAC', tipBg: '#953DAC', tipFg: '#F5F3EF', tipBgDark: '#953DAC', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'cpp', name: 'C++', group: 'lang', kind: 'mono', hex: '#00599C', hexDark: '#1A6AA6', tipBg: '#00599C', tipFg: '#F5F3EF', tipBgDark: '#1A6AA6', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'php', name: 'PHP', group: 'lang', kind: 'mono', hex: '#777BB4', hexDark: '#777BB4', tipBg: '#777BB4', tipFg: '#14130F', tipBgDark: '#777BB4', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'html', name: 'HTML', group: 'lang', kind: 'mono', hex: '#E34F26', hexDark: '#E34F26', tipBg: '#E34F26', tipFg: '#14130F', tipBgDark: '#E34F26', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'css', name: 'CSS', group: 'lang', kind: 'mono', hex: '#663399', hexDark: '#7D52A8', tipBg: '#663399', tipFg: '#F5F3EF', tipBgDark: '#7D52A8', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'json', name: 'JSON', group: 'lang', kind: 'mono', hex: '#000000', hexDark: '#666666', tipBg: '#000000', tipFg: '#F5F3EF', tipBgDark: '#666666', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'svg', name: 'SVG', group: 'lang', kind: 'mono', hex: '#CC8E2F', hexDark: '#FFB13B', tipBg: '#CC8E2F', tipFg: '#14130F', tipBgDark: '#FFB13B', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'react', name: 'React', group: 'front', kind: 'mono', hex: '#49A4BC', hexDark: '#61DAFB', tipBg: '#49A4BC', tipFg: '#14130F', tipBgDark: '#61DAFB', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'preact', name: 'Preact', group: 'front', kind: 'mono', hex: '#673AB8', hexDark: '#764EBF', tipBg: '#673AB8', tipFg: '#F5F3EF', tipBgDark: '#764EBF', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'vue', name: 'Vue', group: 'front', kind: 'mono', hex: '#47AD7F', hexDark: '#4FC08D', tipBg: '#47AD7F', tipFg: '#14130F', tipBgDark: '#4FC08D', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'next', name: 'Next.js', group: 'front', kind: 'mono', hex: '#000000', hexDark: '#666666', tipBg: '#000000', tipFg: '#F5F3EF', tipBgDark: '#666666', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'astro', name: 'Astro', group: 'front', kind: 'mono', hex: '#BC52EE', hexDark: '#BC52EE', tipBg: '#BC52EE', tipFg: '#14130F', tipBgDark: '#BC52EE', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'tailwind', name: 'Tailwind CSS', group: 'front', kind: 'mono', hex: '#06ADC9', hexDark: '#06B6D4', tipBg: '#06ADC9', tipFg: '#14130F', tipBgDark: '#06B6D4', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'wordpress', name: 'WordPress', group: 'front', kind: 'mono', hex: '#21759B', hexDark: '#21759B', tipBg: '#21759B', tipFg: '#F5F3EF', tipBgDark: '#21759B', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'node', name: 'Node.js', group: 'back', kind: 'mono', hex: '#5FA04E', hexDark: '#5FA04E', tipBg: '#5FA04E', tipFg: '#14130F', tipBgDark: '#5FA04E', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'drizzle', name: 'Drizzle', group: 'back', kind: 'mono', hex: '#80A133', hexDark: '#C5F74F', tipBg: '#80A133', tipFg: '#14130F', tipBgDark: '#C5F74F', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'mysql', name: 'MySQL', group: 'back', kind: 'mono', hex: '#4479A1', hexDark: '#4479A1', tipBg: '#417399', tipFg: '#F5F3EF', tipBgDark: '#417399', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'postgres', name: 'PostgreSQL', group: 'back', kind: 'mono', hex: '#4169E1', hexDark: '#4169E1', tipBg: '#3E64D6', tipFg: '#F5F3EF', tipBgDark: '#3E64D6', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'supabase', name: 'Supabase', group: 'back', kind: 'mono', hex: '#36B079', hexDark: '#3FCF8E', tipBg: '#36B079', tipFg: '#14130F', tipBgDark: '#3FCF8E', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'redis', name: 'Redis', group: 'back', kind: 'mono', hex: '#FF4438', hexDark: '#FF4438', tipBg: '#FF4438', tipFg: '#14130F', tipBgDark: '#FF4438', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'turso', name: 'Turso', group: 'back', kind: 'mono', hex: '#37AE93', hexDark: '#4FF8D2', tipBg: '#37AE93', tipFg: '#14130F', tipBgDark: '#4FF8D2', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'upstash', name: 'Upstash', group: 'back', kind: 'mono', hex: '#00AF7A', hexDark: '#00E9A3', tipBg: '#00AF7A', tipFg: '#14130F', tipBgDark: '#00E9A3', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'docker', name: 'Docker', group: 'infra', kind: 'mono', hex: '#2496ED', hexDark: '#2496ED', tipBg: '#2496ED', tipFg: '#14130F', tipBgDark: '#2496ED', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'linux', name: 'Linux', group: 'infra', kind: 'mono', hex: '#BD951B', hexDark: '#FCC624', tipBg: '#BD951B', tipFg: '#14130F', tipBgDark: '#FCC624', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'virtualbox', name: 'VirtualBox', group: 'infra', kind: 'mono', hex: '#2F61B4', hexDark: '#2F61B4', tipBg: '#2F61B4', tipFg: '#F5F3EF', tipBgDark: '#2F61B4', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'vercel', name: 'Vercel', group: 'infra', kind: 'mono', hex: '#000000', hexDark: '#666666', tipBg: '#000000', tipFg: '#F5F3EF', tipBgDark: '#666666', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'cloudflare', name: 'Cloudflare', group: 'infra', kind: 'mono', hex: '#E77A1E', hexDark: '#F38020', tipBg: '#E77A1E', tipFg: '#14130F', tipBgDark: '#F38020', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'cisco', name: 'Cisco Packet Tracer', group: 'infra', kind: 'mono', hex: '#1BA0D7', hexDark: '#1BA0D7', tipBg: '#1BA0D7', tipFg: '#14130F', tipBgDark: '#1BA0D7', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'git', name: 'Git', group: 'tools', kind: 'mono', hex: '#F03C2E', hexDark: '#F03C2E', tipBg: '#F03C2E', tipFg: '#14130F', tipBgDark: '#F03C2E', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'github', name: 'GitHub', group: 'tools', kind: 'mono', hex: '#181717', hexDark: '#696868', tipBg: '#181717', tipFg: '#F5F3EF', tipBgDark: '#696868', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'bitbucket', name: 'Bitbucket', group: 'tools', kind: 'mono', hex: '#0052CC', hexDark: '#1A63D1', tipBg: '#0052CC', tipFg: '#F5F3EF', tipBgDark: '#1A63D1', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'atlassian', name: 'Atlassian', group: 'tools', kind: 'mono', hex: '#0052CC', hexDark: '#1A63D1', tipBg: '#0052CC', tipFg: '#F5F3EF', tipBgDark: '#1A63D1', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'vscode', name: 'VS Code', group: 'tools', kind: 'color', hex: '#007ACC', hexDark: '#007ACC', tipBg: '#1A87D1', tipFg: '#14130F', tipBgDark: '#1A87D1', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'cursor', name: 'Cursor', group: 'tools', kind: 'mono', hex: '#000000', hexDark: '#666666', tipBg: '#000000', tipFg: '#F5F3EF', tipBgDark: '#666666', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'claude', name: 'Claude', group: 'tools', kind: 'mono', hex: '#D97757', hexDark: '#D97757', tipBg: '#D97757', tipFg: '#14130F', tipBgDark: '#D97757', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'stripe', name: 'Stripe', group: 'tools', kind: 'mono', hex: '#635BFF', hexDark: '#635BFF', tipBg: '#5E56F2', tipFg: '#F5F3EF', tipBgDark: '#5E56F2', tipFgDark: '#F5F3EF', invertOnDark: false, invertOnLight: false },
	{ id: 'figma', name: 'Figma', group: 'design', kind: 'mono', hex: '#F24E1E', hexDark: '#F24E1E', tipBg: '#F24E1E', tipFg: '#14130F', tipBgDark: '#F24E1E', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'photoshop', name: 'Photoshop', group: 'design', kind: 'color', hex: '#2FA0F2', hexDark: '#31A8FF', tipBg: '#2FA0F2', tipFg: '#14130F', tipBgDark: '#31A8FF', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'canva', name: 'Canva', group: 'design', kind: 'color', hex: '#00A7AD', hexDark: '#00C4CC', tipBg: '#00A7AD', tipFg: '#14130F', tipBgDark: '#00C4CC', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
	{ id: 'unity', name: 'Unity', group: 'design', kind: 'mono', hex: '#999999', hexDark: '#FFFFFF', tipBg: '#999999', tipFg: '#14130F', tipBgDark: '#FFFFFF', tipFgDark: '#14130F', invertOnDark: false, invertOnLight: false },
];

export const techByGroup = (group: TechGroup): Tech[] => tech.filter((t) => t.group === group);
