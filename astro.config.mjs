// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/* ---------------------------------------------------------------------------
   DÓNDE SE PUBLICA
   Lo usan el sitemap, las etiquetas canonical, los hreflang y las Open Graph.

   La web da por hecho que vive en la RAÍZ del dominio. No es un capricho: el
   CSS, los cursores, el sprite de logos y los PDF se piden con rutas absolutas
   (/cursors/…, /logos.svg, /cv-…pdf). Son medio centenar, y desde una
   subcarpeta darían 404 todas.

   En GitHub Pages eso significa que el repositorio tiene que llamarse
   <usuario>.github.io. Cualquier otro nombre se sirve bajo /<nombre>/. Para
   que nadie lo descubra con la web ya publicada y sin estilos, el build falla
   abajo con instrucciones si el nombre no cuadra.

   Para un dominio propio, basta con pasar SITE_URL y añadir el CNAME.
   --------------------------------------------------------------------------- */

const repo = process.env.GITHUB_REPOSITORY; // "usuario/repositorio", solo en Actions

if (repo && !process.env.SITE_URL) {
	const [usuario, nombre] = repo.split('/');
	const esperado = `${usuario.toLowerCase()}.github.io`;

	if (nombre.toLowerCase() !== esperado) {
		throw new Error(
			`\n\nEl repositorio se llama "${nombre}", así que GitHub Pages serviría la web en\n` +
				`  https://${esperado}/${nombre}/\n` +
				`y no en la raíz. Esta web solo funciona en la raíz: las rutas de los cursores,\n` +
				`del sprite de logos y de los PDF son absolutas y desde una subcarpeta dan 404.\n\n` +
				`Dos salidas:\n` +
				`  · Renombra el repositorio a "${esperado}" en Settings › General › Repository name.\n` +
				`  · O usa un dominio propio: pon SITE_URL en el workflow y añade public/CNAME.\n`
		);
	}
}

export default defineConfig({
	site: process.env.SITE_URL ?? 'https://vextremera.github.io',

	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: {
			// El español vive en la raíz (/) y el inglés bajo /en/
			prefixDefaultLocale: false,
		},
	},

	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-ES', en: 'en-US' },
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
