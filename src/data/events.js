import { Baby, Balloon, Briefcase, Church, Crown, Droplets, Gem, Gift, Martini, PartyPopper } from 'lucide-react'
import { images } from './images'
import { photos } from './photos'

// Tipos de evento del salón. Se usan en el Inicio, la Galería y el cotizador
// de Servicios. Los precios y lo que incluye cada uno están en data/pricing.js.
// `photo`: foto de la tarjeta del carrusel del Inicio · `short`: su descripción · `tagline` y `perks` (dos puntos
// fuertes): tarjetas del cotizador.
export const eventTypes = [
  {
    id: 'casamientos',
    photo: photos.bodaMesaDulce,
    name: 'Casamientos',
    icon: Gem,
    short: 'Una celebración íntima y elegante para dar el “sí” rodeados de quienes más quieren.',
    tagline: 'Íntimo y elegante',
    perks: ['Mozos incluidos', 'Sonido y luces'],
  },
  {
    id: 'quince',
    photo: photos.quinceMesa,
    name: '15 Años',
    icon: Crown,
    short: 'La noche soñada: ambientación, luces y pista para vivir una fiesta de película.',
    tagline: 'La noche soñada',
    perks: ['Mozos incluidos', 'Pista con luces'],
  },
  {
    id: 'dieciocho',
    photo: photos.dieciochoMesa,
    name: '18 Años',
    icon: PartyPopper,
    short: 'Música, luces de colores y mucha onda para festejar la mayoría de edad a lo grande.',
    tagline: 'A pura pista',
    perks: ['Mozos incluidos', 'Sonido y luces'],
  },
  {
    id: 'infantiles',
    photo: photos.infantilMonsters,
    name: 'Infantiles',
    icon: Balloon,
    short: 'Cumpleaños llenos de color y diversión, con temáticas que los chicos van a amar.',
    tagline: 'Color y diversión',
    perks: ['Pelotero y metegol', 'Temática a elección'],
  },
  {
    id: 'baby-shower',
    photo: photos.babySafari,
    name: 'Baby Shower',
    icon: Baby,
    short: 'Un encuentro tierno y delicado para recibir al bebé con la familia y amigos.',
    tagline: 'Tierno y delicado',
    perks: ['Decoración a medida', 'Mediodía o tarde'],
  },
  {
    id: 'revelacion',
    photo: photos.revelacionMesa,
    name: 'Revelación de Género',
    icon: Gift,
    short: 'El momento más esperado, ambientado para que la sorpresa sea inolvidable.',
    tagline: 'La gran sorpresa',
    perks: ['Decoración a medida', 'Mediodía o tarde'],
  },
  {
    id: 'bautismos',
    photo: photos.bautismoBeige,
    name: 'Bautismos',
    icon: Droplets,
    short: 'Una celebración serena y luminosa para compartir este día tan especial.',
    tagline: 'Sereno y luminoso',
    perks: ['Decoración a medida', 'Cocina y asador'],
  },
  {
    id: 'comuniones',
    photo: photos.comunionDorada,
    name: 'Comuniones',
    icon: Church,
    short: 'Ambientaciones delicadas y cálidas para festejar en familia.',
    tagline: 'Cálido y en familia',
    perks: ['Decoración a medida', 'Cocina y asador'],
  },
  {
    id: 'despedidas',
    photo: photos.despedidaLiving,
    name: 'Despedidas de Solteros',
    icon: Martini,
    short: 'La última gran fiesta antes del casamiento, con música, brindis y mucha diversión.',
    tagline: 'La última gran fiesta',
    perks: ['DJ opcional', 'Patio para fumadores'],
  },
  {
    id: 'corporativos',
    photo: images.table,
    name: 'Eventos Corporativos',
    icon: Briefcase,
    short: 'Cenas de fin de año, lanzamientos y celebraciones de empresa con un servicio impecable.',
    tagline: 'Servicio impecable',
    perks: ['Mozos incluidos', 'Habilitación IPLA'],
  },
]
