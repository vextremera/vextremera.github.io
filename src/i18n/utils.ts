import { es } from './es';
import { en } from './en';
import type { Dict, Locale } from './types';

export const dicts: Record<Locale, Dict> = { es, en };

export function getDict(locale: Locale): Dict {
	return dicts[locale];
}

/** Raíz de cada idioma: el español vive en / y el inglés en /en/ */
export function homePath(locale: Locale): string {
	return locale === 'es' ? '/' : '/en/';
}

/** Las URLs de caso se traducen, el slug no. */
export function projectPath(locale: Locale, slug: string): string {
	return locale === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`;
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'es' ? 'en' : 'es';
}
