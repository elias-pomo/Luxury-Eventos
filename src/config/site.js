// Datos generales del salón. Única fuente de verdad: cualquier cambio de
// contacto, redes o textos institucionales se hace solo acá.

export const site = {
  name: 'Luxury Eventos',
  // Dominio definitivo, sin barra final (ej: 'https://luxuryeventos.com.ar'). Lo usan
  // la imagen y el link que se muestran al compartir el sitio en WhatsApp o redes.
  // TODO: completar cuando esté el dominio.
  url: '',
  tagline: 'Donde cada celebración se vuelve inolvidable',
  description:
    'Un salón cálido y elegante en El Colmenar, pensado para celebraciones íntimas de hasta 100 invitados. Nos encargamos de cada detalle para que vos solo te ocupes de disfrutar.',

  owner: 'Fernanda Rechi',
  // Formato internacional sin "+", espacios ni guiones: 54 (país) + 9 (celular) + área + número
  whatsapp: '5493815265630',
  phoneDisplay: '381 526-5630',
  // Link de llamada (mismo número que el WhatsApp)
  phoneHref: 'tel:+5493815265630',
  email: 'alejandro.rodriguez1374@gmail.com',

  // Analítica (opcional). Dejar vacío para no cargar nada. Con el dominio de Plausible
  // (ej: 'luxuryeventos.com.ar') o el ID de medición de Google Analytics 4 (ej: 'G-XXXXXXXXXX').
  // Los eventos propios (quote_sent, contact_sent, call_click, whatsapp_click, quote_shared)
  // se dan de alta como objetivos en Plausible. TODO: completar con el dominio.
  analytics: { plausibleDomain: '', ga4Id: '' },

  address: {
    street: 'Av. William Cross 2935',
    city: 'El Colmenar, Tucumán',
    // Para los datos estructurados de Google (SEO local)
    locality: 'El Colmenar',
    region: 'Tucumán',
    mapsUrl: 'https://maps.app.goo.gl/YGHGrgzisUFv5ufp8',
    // Mapa embebido de Contacto (Google Maps → Compartir → Insertar un mapa → solo el valor de `src`)
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35723.69828003514!2d-65.1674485698776!3d-26.800455481756792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225f51c8cfaa2d%3A0xcdeca787c8923d3d!2sLuxury%20Eventos!5e1!3m2!1sen!2sar!4v1792002205732!5m2!1sen!2sar',
  },

  // Turnos según el tipo de evento. Cada categoría del cotizador (data/pricing.js)
  // indica cuál usa con `schedule`.
  shiftSchedules: {
    standard: {
      label: 'Infantiles, familiares y despedidas',
      shifts: [
        { label: 'Turno mediodía', time: '12 a 17 h' },
        { label: 'Turno tarde', time: '17 a 22 h' },
      ],
    },
    premium: {
      label: '15, 18, casamientos y corporativos',
      shifts: [
        { label: 'Turno mediodía', time: '12 a 19 h' },
        { label: 'Turno tarde', time: '17 a 23 h' },
      ],
    },
  },
  attention: 'Consultas todos los días por WhatsApp',

  social: {
    instagram: 'https://instagram.com/luxuryeventosarf',
    facebook: 'https://www.facebook.com/share/1EAqWeYu5A/',
  },

  capacity: 100,
  stats: [
    { value: '100', label: 'Invitados' },
    { value: '+250', label: 'Eventos realizados' },
    { value: '5', label: 'Años de trayectoria' },
    { value: '100%', label: 'Climatizado' },
  ],
}

// Título de la pestaña del navegador en cada página (se suma " | Luxury Eventos").
export const pageTitles = {
  galeria: 'Galería',
  servicios: 'Armá tu evento',
  contacto: 'Contacto',
  notFound: 'Página no encontrada',
}

export const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/galeria', label: 'Galería' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]
