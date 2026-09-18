import type { APIRoute } from 'astro';

/* El robots.txt se genera en vez de estar suelto en public/ porque la línea
   Sitemap necesita la URL absoluta del sitio. Escrita a mano se quedaba
   apuntando al dominio de antes cada vez que este cambiaba, y un sitemap que
   no responde es peor que no declararlo. Así sale siempre del mismo `site`
   que usan los canonical y los hreflang. */

export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('sitemap-index.xml', site).href;

	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
