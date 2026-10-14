# Luxury Eventos

Sitio web del salón de eventos **Luxury Eventos** (El Colmenar, Tucumán). La idea es que los clientes lleguen desde las redes del salón, lo conozcan y armen su evento online con un cotizador interactivo. Al final, el pedido completo se envía por WhatsApp para cerrar la reserva.

> 🚧 **En desarrollo.** Inicio y Galería están terminadas. Servicios (cotizador) y Contacto están en construcción.

---

## ✨ Características

- **4 páginas:** Inicio, Galería, Servicios y Contacto, con React Router
- **Diseño elegante** en marfil, crema y dorado, con tipografías Cormorant Garamond y Montserrat
- **Fondos con textura** (grano de papel, halos dorados y enrejado art déco) hechos en CSS puro
- **Animaciones** al hacer scroll, hero con zoom suave y transiciones con [Motion](https://motion.dev)
- **Carruseles** de tipos de evento (scroll-snap nativo) y de reseñas, con autoplay, swipe y controles
- **Contacto por WhatsApp** con mensajes precargados y botón flotante en todo el sitio
- **Responsive:** pensado primero para celular, porque la mayoría de las visitas llega desde redes
- **Accesible:** HTML semántico, etiquetas ARIA y respeto por `prefers-reduced-motion`
- **Datos centralizados:** textos, precios, imágenes y contacto viven en archivos de datos, separados de los componentes

### Próximamente

- **Cotizador interactivo:** elegir tipo de fiesta, temática y extras (mozos, DJ, candy bar, luces, decoración), ver el total en tiempo real y enviar el resumen por WhatsApp
- **Contacto** con mapa, datos del salón y formulario

---

## 🛠️ Stack

| Herramienta | Uso |
|---|---|
| [React 19](https://react.dev) | Interfaz |
| [Vite 8](https://vite.dev) | Servidor de desarrollo y build |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos, con tokens de diseño en `@theme` |
| [React Router 7](https://reactrouter.com) | Navegación entre páginas |
| [Motion](https://motion.dev) | Animaciones |
| [Lucide](https://lucide.dev) | Íconos |

---

## 🚀 Instalación

Requisitos: **Node.js 20 o superior**.

```bash
git clone https://github.com/<tu-usuario>/luxury-eventos.git
cd luxury-eventos
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:5173`.

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente para probarlo |

---

## 📁 Estructura

```
├── public/
│   ├── favicon.svg
│   └── images/              # Fotos del salón
└── src/
    ├── config/
    │   └── site.js          # Datos del salón: contacto, redes, turnos, estadísticas
    ├── data/
    │   ├── candybar.js      # Tipos de candy bar y pasos de armado
    │   ├── events.js        # Tipos de evento
    │   ├── gallery.js       # Secciones, textos y fotos de la Galería
    │   ├── highlights.js    # Comodidades del salón (incluidas / obligatorias / opcionales)
    │   ├── images.js        # Rutas, textos alternativos y encuadre de cada imagen
    │   └── reviews.js       # Reseñas de clientes
    ├── components/
    │   ├── layout/          # Navbar, Footer, Layout, botón de WhatsApp, ScrollToTop
    │   ├── ui/              # Piezas reutilizables: Button, Photo, Reveal, SectionTitle, PageHeader
    │   ├── home/            # Secciones del Inicio
    │   ├── gallery/         # Secciones de la Galería, mosaico de fotos y visor
    │   └── icons/           # Íconos de redes sociales
    ├── pages/               # Home, Gallery, Services, Contact, NotFound
    ├── utils/               # Formato de precios (ARS) y armado de links de WhatsApp
    ├── App.jsx              # Rutas
    ├── main.jsx
    └── index.css            # Tokens de diseño, texturas de fondo y utilidades
```

---

## ⚙️ Cómo editar el contenido

Casi todo el contenido se modifica en `src/config/` y `src/data/`, sin tocar componentes.

### Datos del salón

En [`src/config/site.js`](src/config/site.js): nombre, dueña, WhatsApp, dirección, turnos, redes y estadísticas.

> El número de WhatsApp va en formato internacional sin `+` ni espacios: `54` + `9` + código de área + número (ej: `5493810000000`).

### Imágenes

1. Copiá la foto en `public/images/`, en **.webp** o **.jpg** de menos de 300 KB, con el nombre en minúsculas y sin espacios.
2. Actualizá su entrada en [`src/data/images.js`](src/data/images.js):

```js
hero: {
  src: '/images/hero.jpg',
  alt: 'Descripción de la foto para accesibilidad',
  position: 'center 70%', // punto de enfoque del recorte
},
```

`position` controla qué parte de la foto se ve cuando se recorta para llenar su espacio. Es útil sobre todo en fotos verticales mostradas en espacios horizontales. `'center 70%'` baja el foco y `'30% center'` lo corre a la izquierda.

### Tipos de evento, comodidades y reseñas

Cada lista vive en su archivo dentro de `src/data/`. Agregar un elemento al array lo muestra en el sitio automáticamente.

### Colores y tipografías

Están definidos como tokens en el bloque `@theme` de [`src/index.css`](src/index.css), y se usan como clases de Tailwind (`bg-ivory`, `text-gold`, `font-display`, etc.).

| Token | Color |
|---|---|
| `ivory` | `#FBF8F3` |
| `cream` | `#F4EDE1` |
| `sand` | `#E9DFCF` |
| `gold-light` | `#E3CB8F` |
| `gold` | `#C5A059` |
| `gold-dark` | `#9C7A35` |
| `ink` | `#1F1B16` |

Fondos de sección disponibles: `bg-luxe` (halos dorados), `bg-luxe-center` (halo centrado) y `bg-luxe-cream` (crema con enrejado art déco).

---

## 🌐 Deploy

El proyecto genera un sitio estático (`npm run build` → `dist/`) y se puede publicar gratis en **Vercel** o **Netlify**.

Como es una SPA con rutas del lado del cliente, el hosting tiene que redirigir todas las rutas a `index.html`. Si no, recargar `/galeria` da 404.

- **Vercel:** agregar `vercel.json` en la raíz:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Netlify:** agregar `public/_redirects` con:
  ```
  /*  /index.html  200
  ```

---

## 📌 Pendientes antes de producción

- [ ] Reemplazar las reseñas de ejemplo de `src/data/reviews.js` por reseñas reales, con permiso de los clientes
- [ ] Confirmar si la decoración temática se ofrece como servicio extra
- [ ] Completar el email del salón si lo hay
- [ ] Reemplazar las fotos y los tipos de candy bar de ejemplo de `src/data/gallery.js` y `src/data/candybar.js` por los reales
- [ ] Desarrollar Servicios y Contacto
- [ ] Configurar dominio y redirecciones en el hosting

---

## 👤 Autor

Desarrollado por **Elias** · [eliaspomo2024@gmail.com](mailto:eliaspomo2024@gmail.com)

Proyecto realizado para **Luxury Eventos**. Las fotografías del salón pertenecen a su propietaria y no pueden reutilizarse sin autorización.
