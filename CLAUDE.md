# Contexto para Claude

Sitio del salón **Luxury Eventos** (El Colmenar, Tucumán; dueña: Fernanda Rechi). Los clientes llegan desde redes, conocen el salón y arman su evento con un cotizador; el pedido final se envía por WhatsApp. Detalle de stack, estructura y edición de contenido en [README.md](README.md).

El proyecto se trabaja desde **dos computadoras** con la misma cuenta de git. Este archivo es la memoria compartida entre ambas: la memoria local de Claude no se sincroniza.

## Reglas de trabajo

- **Al empezar:** recordar hacer `git pull` si el repo puede estar desactualizado.
- **Al terminar una tarea o sesión:** actualizar "Estado actual" y agregar una línea a "Bitácora" (fecha, qué se hizo, qué quedó pendiente). Después sugerir commit + push para que la otra compu lo reciba.
- Textos del sitio en español rioplatense con voseo ("armá", "elegí", "vos").
- El contenido (textos, precios, imágenes, contacto) va en `src/config/` y `src/data/`, nunca hardcodeado en componentes.
- Reutilizar las piezas de `src/components/ui/` y los tokens de color de `src/index.css` (`bg-ivory`, `text-gold`, `font-display`, etc.).
- Precios en ARS con `src/utils/format.js`; links de WhatsApp con `src/utils/whatsapp.js`.
- **Mobile first, prioridad máxima:** el sitio se va a ver casi siempre desde el celular. Diseñar y revisar primero a 360–414 px (sin scroll horizontal, textos que no se corten, botones a lo ancho, objetivos táctiles de ~44 px, nada que dependa del hover) y después escritorio. Verificar con capturas emulando celular antes de dar algo por terminado.

## Estado actual

- ✅ Inicio completo (Hero, About, Highlights, ServicesPreview, GalleryPreview, Testimonials, CtaBanner), layout, botón de WhatsApp.
- ⏳ **Servicios / cotizador** (`src/pages/Services.jsx`): solo PageHeader. Falta elegir tipo de fiesta, temática y extras (mozos, DJ, candy bar, luces, decoración), total en tiempo real y envío del resumen por WhatsApp.
- ✅ **Galería** (`src/pages/Gallery.jsx`): barra de secciones fija, "En familia" (infantiles, bautismos, comuniones, baby shower, revelación) y "Noches de gala" (15, 18, casamientos, despedidas) con pestañas que filtran, sección Candy bar con tarjetas y visor de fotos (`src/components/gallery/`). Datos en `src/data/gallery.js` y `src/data/candybar.js`. **Fotos y tipos de candy bar son placeholders (TODO)**: falta que el usuario pase fotos reales por tipo de evento y los tipos/diseños reales de candy bar.
- ⏳ **Contacto** (`src/pages/Contact.jsx`): solo PageHeader. Falta mapa, datos del salón y formulario.

### Pendientes antes de producción

- Reseñas reales en `src/data/reviews.js` (las actuales son de ejemplo).
- Confirmar si la decoración temática se ofrece como extra.
- Email del salón en `src/config/site.js` (si existe).
- Dominio y redirecciones SPA en el hosting (ver README).

## Bitácora

- **2026-10-14** — Commit inicial: Inicio terminado, resto de páginas como placeholder. Creado este CLAUDE.md para compartir contexto entre las dos compus. Próximo paso sugerido: cotizador.
- **2026-10-14** — Galería armada (secciones, pestañas, candy bar, visor). `ScrollToTop` ahora respeta anclas (`/galeria#candy-bar`). Nuevo fondo `bg-luxe-dark`. Pendiente: fotos reales y tipos reales de candy bar. Próximo paso: cotizador (Servicios).
- **2026-10-14** — Galería v2 (pedido del usuario: más texto y fotos menos en cuadrícula). Panel de info fijo al costado que cambia por pestaña (`galleryEventDetails` en `data/gallery.js`), mosaico con parallax y revelado tipo cortina (`PhotoMosaic.jsx`), candy bar en zigzag con collage y pasos (`candyBarSteps`). Los textos de eventos y pasos son propuestas: confirmar con el salón.
- **2026-10-14** — Pulido responsive de la Galería (verificado con capturas a 360, 390 y 1280 px): barra de secciones en 3 columnas sin scroll y activa correcta arriba de todo, pestañas con degradé y auto-centrado, mosaico con textos más chicos y parallax suave en celular, visor con flechas abajo y safe-area, pasos del candy bar en lista vertical, botones a lo ancho. `SectionNav` publica `--scroll-offset` (Navbar + barra) para el `scroll-margin` de las secciones.
