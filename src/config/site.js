// Datos generales del salón. Única fuente de verdad: cualquier cambio de
// contacto, redes o textos institucionales se hace solo acá.

export const site = {
  name: 'Luxury Eventos',
  tagline: 'Donde cada celebración se vuelve inolvidable',
  description:
    'Un salón cálido y elegante en El Colmenar, pensado para celebraciones íntimas de hasta 100 invitados. Nos encargamos de cada detalle para que vos solo te ocupes de disfrutar.',

  owner: 'Fernanda Rechi',
  // Formato internacional sin "+", espacios ni guiones: 54 (país) + 9 (celular) + área + número
  whatsapp: '5493816348201',
  phoneDisplay: '381 634-8201',
  email: '', // TODO: completar si el salón tiene email (vacío = no se muestra)

  address: {
    street: 'Av. William Cross 2935',
    city: 'El Colmenar, Tucumán',
    mapsUrl: 'https://maps.app.goo.gl/YGHGrgzisUFv5ufp8',
  },

  // Turnos en los que se realizan los eventos
  eventShifts: [
    { label: 'Turno tarde', time: '12 a 17 h' },
    { label: 'Turno noche', time: '17 a 22 h' },
  ],
  attention: 'Consultas todos los días por WhatsApp',

  social: {
    instagram: 'https://instagram.com/luxuryeventosarf',
    facebook: 'https://www.facebook.com/share/1EAqWeYu5A/',
  },

  capacity: 100,
  stats: [
    { value: '100', label: 'Invitados' },
    { value: '+130', label: 'Eventos realizados' },
    { value: '10', label: 'Años de trayectoria' },
    { value: '100%', label: 'Climatizado' },
  ],
}

export const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/galeria', label: 'Galería' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]
