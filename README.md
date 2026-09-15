# Portfolio — Victor Extremera

Portfolio personal. Astro + TypeScript + Tailwind CSS v4, estático, bilingüe (ES/EN).

```bash
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

---

## Qué tengo que rellenar

Todo el texto vive en dos ficheros. **No hay copy dentro de los componentes.**

| Fichero | Qué contiene |
| --- | --- |
| `src/i18n/es.ts` | Todo el contenido en español |
| `src/i18n/en.ts` | Lo mismo en inglés |
| `src/i18n/types.ts` | La forma de los datos. Si añado un campo, va aquí primero |

Los huecos pendientes están marcados **entre corchetes**: `[tu ciudad]`, `[Proyecto destacado]`,
`[Empresa]`… Busca `[` en los dos ficheros y no te dejarás ninguno.

Mientras un proyecto, empleo o titulación tenga `placeholder: true`, la web muestra un
distintivo *Pendiente de rellenar*. **Ponlo a `false` cuando lo completes** y el distintivo
desaparece.

Lo que hay que mantener sincronizado entre `es.ts` y `en.ts`:

- el `slug` de cada proyecto (define la URL en los dos idiomas)
- el número `n` y el **orden** de los arrays

TypeScript avisa si falta una clave, pero no puede comprobar que el orden coincida.

### Pendientes concretos

1. **Dominio** — `astro.config.mjs` (`site`) y `public/robots.txt`. Lo usan el sitemap,
   la URL canónica y las Open Graph.
2. **CV** — deja el PDF en `public/cv-victor-extremera.pdf`, o cambia `contact.cvHref`.
3. **Imagen social** — `public/og.svg` es el diseño; hay que exportarlo a
   `public/og.png` a 1200×630. Es el único recurso gráfico que falta.
4. **Perfiles** — LinkedIn y GitHub en `contact.social`. Los que llevan `[` no entran
   en los datos estructurados de Schema.org, así que no hay riesgo de publicar una URL falsa.
5. **Capturas de proyecto** — opcional. Rellena `cover` (ruta dentro de `public/`) y
   `coverAlt`; si lo dejas vacío se genera una portada tipográfica.

---

## Estructura

```
src/
├── i18n/            contenido y utilidades de idioma
├── layouts/
│   └── Base.astro   <head>, SEO, tema, scripts globales
├── components/      una sección por componente
├── pages/
│   ├── index.astro              /            (ES)
│   ├── en/index.astro           /en/         (EN)
│   ├── proyectos/[slug].astro   /proyectos/…
│   └── en/projects/[slug].astro /en/projects/…
└── styles/global.css   tokens, tipografías, utilidades
```

### El stack y sus logos

`src/data/tech.ts` lleva solo los metadatos. El dibujo vive en
`public/logos.svg`, un sprite de `<symbol>` que el navegador descarga y cachea
una vez. El script lo inyecta en el documento en lugar de referenciarlo con
`<use href="/logos.svg#id">`, porque esa forma externa no es fiable en Safari.
Si la descarga falla, cada ficha enseña su nombre escrito.

Dos fuentes, horneadas — ninguna es dependencia del proyecto:

- **simple-icons (CC0)** es la base: 43 de 49. Trazo único de 24×24 sin `fill`
  propio, así que hereda `currentColor`. Todos los logos tienen el mismo peso
  visual y la misma construcción, que es lo que pide el diseño del sitio.
- **thesvg (MIT)** cubre los 6 que simple-icons no tiene porque sus dueños
  pidieron ser retirados: Java (Oracle), C# y VS Code (Microsoft), AWS
  (Amazon), Photoshop (Adobe) y Canva. Esos van con su arte a color.

En reposo todos se ven en gris; al pasar el ratón por encima y mientras están
sueltos toman su color.

Banderas del fichero de datos:

- `hex` / `hexDark` (solo `kind: 'mono'`) — el color de marca ya ajustado,
  mezclado hacia negro o blanco lo justo para llegar al contraste mínimo sobre
  cada fondo. Sin eso el amarillo de JavaScript queda a 1.2:1 sobre el papel y
  el negro de GitHub desaparece en el tema oscuro.
- `invertOnDark` / `invertOnLight` (solo `kind: 'color'`) — ese arte es
  monocromo y desaparecería sobre su propio fondo, así que ese estado se
  invierte. Invertir un logo con color real le cambiaría el tono.

Todos los símbolos van normalizados a `viewBox` 24×24 y los ids de sus
`<defs>` llevan prefijo — sin eso, varios logos con `id="a"` se pisarían los
degradados entre sí.

### Dónde se toca cada cosa

- **Colores, tipos, tamaños** → `src/styles/global.css`, bloque `@theme`. Son tokens de
  Tailwind v4: `--color-accent` genera `bg-accent`, `text-accent`, `border-accent`…
  No hay `tailwind.config.js` y no hace falta.
- **Tema oscuro** → el bloque `[data-theme='dark']` del mismo fichero redefine los tokens.
  No es una inversión: cambia la temperatura y el acento se aclara para mantener contraste.
- **Secciones de la home** → `src/components/Home.astro` define el orden, igual en ambos idiomas.

---

## Decisiones

- **Sin librería de animación ni de físicas.** Reveal con `IntersectionObserver`,
  el resto es CSS. La caja de gravedad del stack usa un solver propio de
  ~2 KB (`src/scripts/gravity.ts`) en lugar de Matter.js (~25 KB gzip): con
  fichas circulares la colisión es círculo-círculo y no hacen falta polígonos.
  Mueve elementos del DOM, no un canvas, así que los logos siguen siendo una
  lista semántica. Todo respeta `prefers-reduced-motion`.
- **Fuentes propias.** Inter, Instrument Serif y JetBrains Mono en `public/fonts`,
  solo el subconjunto latino. Cero peticiones a terceros, sin FOUT visible.
  Licencias OFL incluidas.
- **Sin formulario de contacto.** Un sitio estático no puede recibir envíos sin un
  servicio externo; un formulario que no envía nada es peor que no tenerlo. En su lugar,
  el email a la vista con botón de copiar. Si más adelante quieres formulario,
  Formspree o Web3Forms se enchufan sin backend.
- **Sin porcentajes de habilidades.** No significan nada.
- **Cero JavaScript de framework.** No hay islas: la web es HTML y CSS con unos
  cuantos listeners.
