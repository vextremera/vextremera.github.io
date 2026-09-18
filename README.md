# Victor Extremera — Portfolio

Mi portfolio personal, escrito desde cero. Astro, TypeScript y Tailwind CSS v4, estático y
bilingüe.

**→ [vextremera.github.io](https://vextremera.github.io)**

---

## Busco trabajo

Desarrollador web **full-stack junior**. Acabo de terminar el Grado Superior en Desarrollo
de Aplicaciones Web y estoy buscando mi primer puesto con contrato.

No busco prácticas ni becas: ya las hice, están en la web. Lo que quiero es entrar en un
equipo con gente mejor que yo y con ganas de enseñar.

- **Dónde** — Lloret de Mar, Girona. Presencial por la zona, o en remoto.
- **Idiomas** — español, catalán e inglés. He trabajado cuatro meses en Malta, en inglés.
- **Email** — [vicres43@gmail.com](mailto:vicres43@gmail.com)
- **LinkedIn** — [victor-extremera](https://www.linkedin.com/in/victor-extremera-7b461229a)

---

## Qué es esto

Una web de una sola página con caso de estudio aparte para cada proyecto. El español vive
en la raíz (`/`) y el inglés bajo `/en/`, con sus `hreflang` y su sitemap.

Me la tomé como un proyecto de verdad y no como una plantilla rellenada. Lo que hay aquí
es lo que sé hacer, así que preferí que cada pieza estuviera resuelta a mano aunque
costase más.

**Sin barras de progreso ni porcentajes de habilidad.** No significan nada: nadie sabe qué
es «JavaScript 85 %». Si quieres saber mi nivel real con algo, pregúntamelo.

---

## Lo que tiene por dentro

### Un motor de físicas propio, de 2,8 KB

La sección de stack es una caja con los logos quietos. Al tocarla, caen, rebotan y se
pueden arrastrar y lanzar.

No usa Matter.js (~25 KB gzip) sino un solver escrito para el caso, en
[`src/scripts/gravity.ts`](src/scripts/gravity.ts): las fichas son círculos, así que la
colisión es círculo-círculo y no hacen falta polígonos. Paso fijo, corrección posicional
con holgura, impulsos con corte de restitución para que las pilas se duerman, rozamiento
de rodadura y detección de reposo por desplazamiento real.

Mueve elementos del DOM, no un canvas, así que los logos siguen siendo una lista
semántica con sus nombres. Y si el sistema pide movimiento reducido, no se mueve nada.

### Los logos

`src/data/tech.ts` guarda solo los metadatos. El dibujo está en `public/logos.svg`, un
sprite de 43 `<symbol>` que el navegador descarga y cachea una vez. El script lo inyecta
en el documento en lugar de referenciarlo con `<use href="/logos.svg#id">`, porque esa
forma externa no es fiable en Safari. Si la descarga falla, cada ficha enseña su nombre
escrito.

Los colores de marca están **ajustados uno a uno** para llegar al contraste mínimo sobre
cada fondo. Sin eso, el amarillo de JavaScript se queda en 1,2:1 sobre el papel y el negro
de GitHub desaparece en el tema oscuro.

### Dos temas que no son una inversión

El oscuro no le da la vuelta al claro: cambia la temperatura y aclara el acento para
mantener el contraste. Todo sale de tokens en `@theme`, sin `tailwind.config.js` —
Tailwind v4 no lo necesita.

### Cursores y barra de scroll

Cursores del tema [Future Cursors](https://github.com/yeyushengfan258/Future-cursors), con
un fichero por tema porque el navegador dibuja el cursor aislado y ahí no llega el
`data-theme` del sitio. Los hotspots están leídos de los ficheros del tema original, no
puestos a ojo. Van en SVG con respaldo PNG, porque WebKit no admite SVG de cursor.

La barra de scroll está teñida con los colores del tema, sin una línea de JavaScript.

### Sin formulario de contacto

Una web estática no puede recibir envíos sin un servicio externo, y un formulario que no
envía nada es peor que no tenerlo. En su lugar, el email a la vista con botón de copiar.

---

## Accesibilidad y rendimiento

- HTML semántico, un solo `h1` por página, saltos de navegación y estados de foco visibles.
- Contraste comprobado sobre los dos fondos, incluidos los logos.
- `prefers-reduced-motion` respetado en todo, físicas incluidas.
- Fuentes propias en `public/fonts`, solo el subconjunto latino. Cero peticiones a terceros.
- Imágenes en WebP: la portada de ARCADIA pesa 26 KB, frente a 1,29 MB del PNG original.

Lo que se lleva el navegador en la portada:

| | gzip |
| --- | --- |
| HTML | 14,4 KB |
| CSS | 9,0 KB |
| JavaScript | 2,8 KB |

Cero JavaScript de framework. No hay islas: la web es HTML y CSS con unos cuantos
listeners.

---

## Estructura

```
src/
├── i18n/            todo el texto, en es.ts y en.ts
├── layouts/
│   └── Base.astro   <head>, SEO, tema, scripts globales
├── components/      una sección por componente
├── pages/
│   ├── index.astro              /            (ES)
│   ├── en/index.astro           /en/         (EN)
│   ├── proyectos/[slug].astro   /proyectos/…
│   └── en/projects/[slug].astro /en/projects/…
├── scripts/         el motor de físicas
├── data/            metadatos del stack
└── styles/global.css   tokens, tipografías, utilidades
```

**Ningún componente lleva texto dentro.** Todo el contenido está en `src/i18n/es.ts` y
`src/i18n/en.ts`, con la forma definida en `types.ts`. Entre los dos ficheros hay que
mantener a mano el `slug` de cada proyecto y el orden de los arrays: TypeScript avisa si
falta una clave, pero no puede comprobar que el orden coincida.

---

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

Requiere Node 22.12 o superior.

---

## Publicación

GitHub Pages, desde [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Cada
empujón a `main` reconstruye y publica.

La web vive en la **raíz del dominio**, y no es una preferencia: el CSS, los cursores, el
sprite y los PDF se piden con rutas absolutas, medio centenar de rutas que desde una
subcarpeta darían 404. Por eso `astro.config.mjs` comprueba el nombre del repositorio
durante el build y **falla con instrucciones** si no cuadra. Mejor un build en rojo que una
web publicada sin estilos.

`robots.txt` y las imágenes de compartir se generan solos a partir del mismo `site` que
usan los canonical, para que no se queden apuntando a un dominio viejo.

---

## Créditos

El código es mío. Lo de fuera lleva su licencia:

| | |
| --- | --- |
| [simple-icons](https://simpleicons.org) (CC0) | 38 de los 43 logos del stack |
| [thesvg](https://thesvg.org) (MIT) | los 5 restantes, cuyos dueños pidieron ser retirados de simple-icons |
| [Future Cursors](https://github.com/yeyushengfan258/Future-cursors) (GPL-3.0) | los cursores — licencia y fuente en `public/cursors/` |
| Inter, Instrument Serif, JetBrains Mono (OFL) | las tipografías, con sus licencias en `public/fonts/` |

Los iconos se hornearon en tiempo de compilación y ninguna de las dos librerías es
dependencia del proyecto.
