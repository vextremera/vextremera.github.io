# Victor Extremera, web freelance

La web con la que me presento a clientes: qué hago, cómo trabajo y un formulario para
escribirme.

**→ [vextremera.github.io](https://vextremera.github.io)**

Es HTML, CSS y JavaScript escritos a mano. No hay framework, ni dependencias, ni paso de
compilación: lo que hay en el repositorio es lo que se publica.

## Qué hay dentro

| Archivo | Qué es |
| --- | --- |
| `index.html` | La página entera, con todo el texto. |
| `styles.css` | Los estilos. Arriba del todo están los tokens: color, tipografía, espaciado, radios, sombras, movimiento y capas. |
| `main.js` | Las partículas del nombre, las demostraciones de servicios, la navegación y el formulario. |
| `assets/` | Mi foto y la portada de ARCADIA, en WebP. |

Algunas piezas que no se ven a simple vista:

- **El nombre del hero** son partículas dibujadas en un `<canvas>`. Se apartan del cursor,
  estallan al hacer clic y vuelven a su sitio. El hueco que ocupan lo decide el CSS
  (`.hero__name`) y el JavaScript lo mide para saber dónde dibujar.
- **El Laboratorio** cambia el color y el radio de toda la página en vivo. Funciona porque
  casi todos los valores visuales salen de los tokens de `styles.css`.
- **Las cifras de GitHub** se piden a la API pública al abrir la página. Las que están
  escritas en el HTML son el respaldo por si la API no responde.
- **El formulario** envía a Formspree por `fetch`. La dirección está en el atributo
  `data-endpoint` del `<form>`; el `action` es el respaldo si el JavaScript no carga.

Respeta `prefers-reduced-motion`: con movimiento reducido no hay partículas animadas ni
transiciones.

## Verla en local

Cualquier servidor estático sirve. Con Python:

```bash
python -m http.server 5620
```

Y después abrir `http://localhost:5620`.

## Publicación

GitHub Pages, desde [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Cada
empujón a `main` copia `index.html`, `styles.css`, `main.js` y `assets/` a una carpeta y
la publica. El README y la configuración del repositorio no se publican.

## El portfolio anterior

Antes de esta web, el dominio servía mi portfolio hecho con Astro, TypeScript y Tailwind,
bilingüe y con un motor de físicas propio. Está entero en la rama
[`portfolio-astro`](https://github.com/vextremera/vextremera.github.io/tree/portfolio-astro),
con su propio README.

## Créditos

El código es mío. Las tipografías, Bricolage Grotesque y JetBrains Mono, tienen licencia
OFL y se cargan desde Google Fonts.
