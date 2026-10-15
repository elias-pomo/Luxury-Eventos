import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site.js'

// Completa en index.html los datos para compartir el link (WhatsApp, Facebook,
// Instagram): %SITE_URL% con el dominio de config/site.js. Las redes necesitan
// la dirección completa de la imagen, por eso sin dominio quedan sin foto.
const shareMeta = {
  name: 'share-meta',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', site.url),
}

export default defineConfig({
  plugins: [react(), tailwindcss(), shareMeta],
})
