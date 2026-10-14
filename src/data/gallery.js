import { site } from '../config/site'
import { images } from './images'

// "Turno tarde (12 a 17 h) o turno noche (17 a 22 h)"
const shifts = site.eventShifts
  .map(({ label, time }, i) => `${i ? label.toLowerCase() : label} (${time})`)
  .join(' o ')

// Secciones de la Galería. `events` son ids de data/events.js: definen qué
// pestañas aparecen y en qué orden. `intro` es el texto que se muestra en la
// pestaña "Todos".
export const gallerySections = [
  {
    id: 'en-familia',
    nav: 'En familia',
    eyebrow: 'En familia',
    title: 'Momentos tiernos y llenos de color',
    subtitle:
      'Cumpleaños infantiles, bautismos, comuniones y los primeros festejos del bebé: ambientaciones cálidas para compartir con los que más querés.',
    events: ['infantiles', 'bautismos', 'comuniones', 'baby-shower', 'revelacion'],
    dark: false,
    intro: {
      title: 'Festejos para compartir en familia',
      text: 'Un salón luminoso y cómodo para que los chicos jueguen y los grandes disfruten. Adaptamos la ambientación a cada ocasión: colores, temática y cada pequeño detalle.',
      points: [
        `Salón climatizado para hasta ${site.capacity} invitados`,
        shifts,
        'Ambientación según la temática que elijas',
        'Candy bar, decoración y extras a tu medida',
      ],
    },
  },
  {
    id: 'noches-de-gala',
    nav: 'Noches de gala',
    eyebrow: 'Noches de gala',
    title: 'Fiestas para recordar toda la vida',
    subtitle:
      'Quince, dieciocho, casamientos y despedidas: luces, pista y una puesta elegante para las noches más importantes.',
    events: ['quince', 'dieciocho', 'casamientos', 'despedidas'],
    dark: true,
    intro: {
      title: 'Noches que se viven a pleno',
      text: 'Para las fiestas más esperadas transformamos el salón: luces, pista, mesas vestidas de gala y una puesta pensada para que cada momento salga perfecto en las fotos.',
      points: [
        `Hasta ${site.capacity} invitados en un ambiente íntimo`,
        'Pista con luces y sonido',
        'Mesas de gala y ambientación elegante',
        'DJ, luces y mesa dulce como extras',
      ],
    },
  },
]

// Texto de cada tipo de evento en la Galería (se muestra al elegir su pestaña).
// TODO: revisar con el salón que los detalles coincidan con lo que se ofrece.
export const galleryEventDetails = {
  infantiles: {
    text: 'Cumpleaños con la temática favorita de los chicos: princesas, superhéroes, dibujos animados o lo que imaginen. Llenamos el salón de color, globos y un rincón especial para las fotos.',
    points: ['Ambientación temática', 'Espacio amplio para jugar', 'Candy bar a juego con la temática'],
  },
  bautismos: {
    text: 'Una celebración serena y luminosa para después de la ceremonia. Tonos claros, flores y mesas vestidas de blanco para compartir un almuerzo o una merienda en familia.',
    points: ['Ideal para el turno tarde', 'Ambientación en tonos suaves', 'Mesa dulce y torta'],
  },
  comuniones: {
    text: 'Un festejo cálido para un día muy especial. Ambientamos con delicadeza, con detalles en blanco y dorado y una mesa principal para las fotos del recuerdo.',
    points: ['Ambientación delicada', 'Mesa principal decorada', 'Almuerzo o merienda en familia'],
  },
  'baby-shower': {
    text: 'Un encuentro tierno para recibir al bebé: colores pastel, un rincón para las fotos y todo listo para los juegos y los regalos.',
    points: ['Ambientación en tonos pastel', 'Rincón para las fotos', 'Mesa dulce temática'],
  },
  revelacion: {
    text: 'Preparamos todo para el gran momento: decoración en rosa y celeste y una puesta pensada para que la sorpresa se viva, se emocione y se filme.',
    points: ['Decoración en rosa y celeste', 'El momento sorpresa preparado', 'Ideal para compartir en familia'],
  },
  quince: {
    text: 'La noche soñada. Recepción, entrada, vals y pista: ambientamos el salón con luces, flores y la temática que elijas para que sea una fiesta de película.',
    points: ['Ambientación a medida', 'Pista con luces y sonido', 'Rincón para las fotos'],
  },
  dieciocho: {
    text: 'Música, luces de colores y mucha onda para festejar la mayoría de edad. Una fiesta pensada para bailar de principio a fin.',
    points: ['Pista con luces de colores', 'DJ como extra', 'Ambientación moderna'],
  },
  casamientos: {
    text: 'Un casamiento íntimo y elegante, con mesas vestidas de gala, luces cálidas y cada detalle cuidado para que ustedes solo se ocupen de disfrutar.',
    points: [`Hasta ${site.capacity} invitados`, 'Mesas de gala y centros de mesa', 'Pista para el vals y la fiesta'],
  },
  despedidas: {
    text: 'La última gran fiesta antes del “sí”. DJ, luces, brindis y un ambiente relajado para festejar a lo grande con amigos.',
    points: ['DJ y luces', 'Brindis y música', 'Ambiente distendido'],
  },
}

// Fotos de la Galería. `event` es el id del tipo de evento (data/events.js).
// Para sumar una foto: copiarla en /public/images, registrarla en data/images.js
// y agregar una línea acá.
//
// TODO: reemplazar por fotos reales de cada tipo de evento (por ahora se repiten
// las fotos generales del salón como placeholder).
export const galleryPhotos = [
  // En familia
  { image: images.about, event: 'infantiles', caption: 'Backdrop con arcos y flores' },
  { image: images.party, event: 'infantiles', caption: 'Centros de mesa con luces' },
  { image: images.toast, event: 'bautismos', caption: 'Salón de día vestido de blanco' },
  { image: images.party, event: 'bautismos', caption: 'Detalles florales' },
  { image: images.hero, event: 'comuniones', caption: 'Mesas redondas con telas rosadas' },
  { image: images.toast, event: 'comuniones', caption: 'Almuerzo en familia' },
  { image: images.about, event: 'baby-shower', caption: 'Rincón para las fotos' },
  { image: images.hero, event: 'baby-shower', caption: 'Ambientación en tonos suaves' },
  { image: images.party, event: 'revelacion', caption: 'Mesa principal' },

  // Noches de gala
  { image: images.ballroom, event: 'quince', caption: 'Mesa de gala con sitiales dorados' },
  { image: images.balloons, event: 'quince', caption: 'Pista con luces' },
  { image: images.table, event: 'quince', caption: 'Noche con centros iluminados' },
  { image: images.balloons, event: 'dieciocho', caption: 'Luces de colores y sonido' },
  { image: images.table, event: 'dieciocho', caption: 'El salón de noche' },
  { image: images.ballroom, event: 'casamientos', caption: 'Mesa de los novios' },
  { image: images.hero, event: 'casamientos', caption: 'Salón ambientado para la cena' },
  { image: images.table, event: 'casamientos', caption: 'Centros de mesa iluminados' },
  { image: images.balloons, event: 'despedidas', caption: 'Fiesta con DJ y luces' },
]
