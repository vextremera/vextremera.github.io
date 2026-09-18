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

Los huecos pendientes van **entre corchetes**. Busca `[` en los dos ficheros y no se te
escapará ninguno: a día de hoy solo queda uno.

Mientras un proyecto, empleo o titulación tenga `placeholder: true`, la web muestra un
distintivo *Pendiente de rellenar*. **Ponlo a `false` cuando lo completes** y el distintivo
desaparece. Ahora mismo no lo lleva ninguno.

Lo que hay que mantener sincronizado entre `es.ts` y `en.ts`:

- el `slug` de cada proyecto (define la URL en los dos idiomas)
- el número `n` y el **orden** de los arrays

TypeScript avisa si falta una clave, pero no puede comprobar que el orden coincida.

### Pendientes concretos

1. **El tipo de encargo de ARCADIA** — `projects.items[0].type`, en los dos idiomas.
   Es el último corchete que queda en toda la web.
2. **Los tres proyectos anunciados** — llevan `soon: true` y salen como *Próximamente*,
   sin enlace y sin página de caso. Rellena uno y quítale el `soon`: entonces se le
   genera la página y la ficha enlaza.

---

## Publicación

Se publica en **GitHub Pages** desde `.github/workflows/deploy.yml`. Cada empujón a
`main` reconstruye y publica; también se puede lanzar a mano desde la pestaña Actions.

Para que funcione hay que dejar Pages en modo Actions: *Settings › Pages › Build and
deployment › Source: **GitHub Actions***. Solo se hace una vez.

### La web vive en la raíz del dominio

No es una preferencia, es un requisito. El CSS, los cursores, el sprite de logos y los
PDF se piden con rutas absolutas (`/cursors/…`, `/logos.svg`, `/cv-…pdf`): medio centenar
de rutas que desde una subcarpeta darían 404. En GitHub Pages eso significa que **el
repositorio tiene que llamarse `<usuario>.github.io`**.

`astro.config.mjs` lo comprueba durante el build y **falla con instrucciones** si el
nombre no cuadra, para que nadie lo descubra con la web ya publicada y sin estilos.

Para un dominio propio: define `SITE_URL` en el workflow y añade `public/CNAME`.

### Cosas que se generan solas

- `robots.txt` sale de `src/pages/robots.txt.ts` y toma la URL del sitemap del mismo
  `site` que usan los canonical. Escrito a mano se quedaba apuntando al dominio viejo.
- Las imágenes de compartir (`public/og-es.png` y `og-en.png`) se rasterizan del SVG
  que está al lado. Si cambias el texto, edita el `.svg` y vuelve a exportarlo a 1200×630.

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
