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

// Páginas públicas, para el sitemap.
const routes = ['/', '/galeria', '/servicios', '/contacto']

// Datos estructurados para Google (SEO local): ficha del salón con dirección y teléfono.
const localBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EventVenue'],
  name: site.name,
  description: site.description,
  telephone: `+${site.whatsapp}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: 'AR',
  },
  hasMap: site.address.mapsUrl,
  maximumAttendeeCapacity: site.capacity,
  sameAs: [site.social.instagram, site.social.facebook],
  ...(site.url && { url: site.url, image: `${site.url}/og-image.jpg` }),
})

// Inyecta en <head> los datos estructurados y, si están configurados, Plausible / GA4.
const seoAndAnalytics = {
  name: 'seo-analytics',
  transformIndexHtml() {
    const { plausibleDomain, ga4Id } = site.analytics
    const tags = [
      { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(localBusiness()), injectTo: 'head' },
    ]
    if (plausibleDomain) {
      tags.push({
        tag: 'script',
        attrs: { defer: true, 'data-domain': plausibleDomain, src: 'https://plausible.io/js/script.js' },
        injectTo: 'head',
      })
    }
    if (ga4Id) {
      tags.push(
        { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}` }, injectTo: 'head' },
        {
          tag: 'script',
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}');`,
          injectTo: 'head',
        },
      )
    }
    return tags
  },
}

// robots.txt siempre; sitemap.xml solo cuando hay dominio (necesita URLs completas).
const crawlers = {
  name: 'crawlers',
  generateBundle() {
    const lines = ['User-agent: *', 'Allow: /']
    if (site.url) lines.push('', `Sitemap: ${site.url}/sitemap.xml`)
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${lines.join('\n')}\n` })

    if (!site.url) return
    const urls = routes.map((path) => `  <url><loc>${site.url}${path === '/' ? '/' : path}</loc></url>`).join('\n')
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), shareMeta, seoAndAnalytics, crawlers],
})
