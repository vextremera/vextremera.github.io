// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// TODO: sustituir por el dominio final. Lo usan el sitemap, el canonical y las Open Graph.
	site: 'https://victorextremera.dev',

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
