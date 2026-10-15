import { Baby, Balloon, Briefcase, Church, Crown, Droplets, Gem, Gift, Martini, PartyPopper } from 'lucide-react'

// Tipos de evento del salón. Se usan en el Inicio, la Galería y el cotizador
// de Servicios. Los precios y lo que incluye cada uno están en data/pricing.js.
// `short`: descripción del carrusel del Inicio · `tagline` y `perks` (dos puntos
// fuertes): tarjetas del cotizador.
export const eventTypes = [
  {
    id: 'casamientos',
    name: 'Casamientos',
    icon: Gem,
    short: 'Una celebración íntima y elegante para dar el “sí” rodeados de quienes más quieren.',
    tagline: 'Íntimo y elegante',
    perks: ['Mozos incluidos', 'Sonido y luces'],
  },
  {
    id: 'quince',
    name: '15 Años',
    icon: Crown,
    short: 'La noche soñada: ambientación, luces y pista para vivir una fiesta de película.',
    tagline: 'La noche soñada',
    perks: ['Mozos incluidos', 'Pista con luces'],
  },
  {
    id: 'dieciocho',
    name: '18 Años',
    icon: PartyPopper,
    short: 'Música, luces de colores y mucha onda para festejar la mayoría de edad a lo grande.',
    tagline: 'A pura pista',
    perks: ['Mozos incluidos', 'Sonido y luces'],
  },
  {
    id: 'infantiles',
    name: 'Infantiles',
    icon: Balloon,
    short: 'Cumpleaños llenos de color y diversión, con temáticas que los chicos van a amar.',
    tagline: 'Color y diversión',
    perks: ['Pelotero y metegol', 'Temática a elección'],
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    icon: Baby,
    short: 'Un encuentro tierno y delicado para recibir al bebé con la familia y amigos.',
    tagline: 'Tierno y delicado',
    perks: ['Decoración a medida', 'Tarde o noche'],
  },
  {
    id: 'revelacion',
    name: 'Revelación de Género',
    icon: Gift,
    short: 'El momento más esperado, ambientado para que la sorpresa sea inolvidable.',
    tagline: 'La gran sorpresa',
    perks: ['Decoración a medida', 'Tarde o noche'],
  },
  {
    id: 'bautismos',
    name: 'Bautismos',
    icon: Droplets,
    short: 'Una celebración serena y luminosa para compartir este día tan especial.',
    tagline: 'Sereno y luminoso',
    perks: ['Decoración a medida', 'Cocina y asador'],
  },
  {
    id: 'comuniones',
    name: 'Comuniones',
    icon: Church,
    short: 'Ambientaciones delicadas y cálidas para festejar en familia.',
    tagline: 'Cálido y en familia',
    perks: ['Decoración a medida', 'Cocina y asador'],
  },
  {
    id: 'despedidas',
    name: 'Despedidas de Solteros',
    icon: Martini,
    short: 'La última gran fiesta antes del casamiento, con música, brindis y mucha diversión.',
    tagline: 'La última gran fiesta',
    perks: ['DJ opcional', 'Patio para fumadores'],
  },
  {
    id: 'corporativos',
    name: 'Eventos Corporativos',
    icon: Briefcase,
    short: 'Cenas de fin de año, lanzamientos y celebraciones de empresa con un servicio impecable.',
    tagline: 'Servicio impecable',
    perks: ['Mozos incluidos', 'Habilitación IPLA'],
  },
]
