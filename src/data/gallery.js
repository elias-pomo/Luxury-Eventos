import { site } from '../config/site'
import { photos } from './photos'

// "Turno mediodía (12 a 17 h) o turno tarde (17 a 22 h)"
const shiftsText = ({ shifts }) =>
  shifts.map(({ label, time }, i) => `${i ? label.toLowerCase() : label} (${time})`).join(' o ')

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
        `Salón para hasta ${site.capacity} invitados, con pelotero y metegol en los infantiles`,
        shiftsText(site.shiftSchedules.standard),
        'Decoración según la temática que elijas',
        'Candy bar, DJ y aire acondicionado como extras',
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
        `15, 18 y casamientos: ${shiftsText(site.shiftSchedules.premium).toLowerCase()}`,
        `Despedidas: ${shiftsText(site.shiftSchedules.standard).toLowerCase()}`,
        'Mozos, sonido, luces y aire incluidos en los eventos premium',
        'Paquete Luxury con DJ del salón',
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
    points: ['Ideal para el turno mediodía', 'Ambientación en tonos suaves', 'Mesa dulce y torta'],
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
    text: 'La última gran fiesta antes del “sí”. Música, brindis y un ambiente relajado para festejar a lo grande con amigos.',
    points: ['DJ como extra', 'Brindis y música', 'Ambiente distendido'],
  },
}

// Fotos de la Galería. `event` es el id del tipo de evento (data/events.js) y el
// orden es el del mosaico. Para sumar una foto: copiarla en /public/images,
// registrarla en data/photos.js y agregar una línea acá.
export const galleryPhotos = [
  // En familia
  { image: photos.infantilMonsters, event: 'infantiles', caption: 'Monsters Inc.' },
  { image: photos.babySafari, event: 'baby-shower', caption: 'Safari' },
  { image: photos.comunionCaliz, event: 'comuniones', caption: 'Dorado y blanco' },
  { image: photos.bautismoBeige, event: 'bautismos', caption: 'Beige y dorado' },
  { image: photos.infantilPocoyo, event: 'infantiles', caption: 'Pocoyó' },
  { image: photos.revelacionMesa, event: 'revelacion', caption: 'Mesa dulce en azul' },
  { image: photos.comunionAmarilla, event: 'comuniones', caption: 'Amarillo y blanco' },
  { image: photos.babyBosque, event: 'baby-shower', caption: 'Animalitos del bosque' },
  { image: photos.infantilPooh, event: 'infantiles', caption: 'Winnie Pooh' },
  { image: photos.bautismoElefante, event: 'bautismos', caption: 'Elefantito en rosa' },
  { image: photos.comunionAngel, event: 'comuniones', caption: 'Angelito en celeste' },
  { image: photos.infantilFrutillita, event: 'infantiles', caption: 'Frutillitas' },
  { image: photos.babyPanda, event: 'baby-shower', caption: 'Osito panda' },
  { image: photos.bautismoCeleste, event: 'bautismos', caption: 'Celeste y dorado' },
  { image: photos.comunionRosa, event: 'comuniones', caption: 'Rosa y dorado' },
  { image: photos.infantilVampirina, event: 'infantiles', caption: 'Vampirina' },
  { image: photos.muestraInfantiles, event: 'infantiles', caption: 'Rincón de juegos' },
  { image: photos.comunionArco, event: 'comuniones', caption: 'Arco de globos' },
  { image: photos.infantilLol, event: 'infantiles', caption: 'Muñecas LOL' },
  { image: photos.babyVelita, event: 'baby-shower', caption: 'Souvenir de velita' },
  { image: photos.comunionDorada, event: 'comuniones', caption: 'Columnas doradas' },

  { image: photos.infantilMariposa, event: 'infantiles', caption: 'Detalles personalizados' },
  { image: photos.comunionSouvenir, event: 'comuniones', caption: 'Souvenirs de angelitos' },
  { image: photos.muestraComuniones, event: 'comuniones', caption: 'El salón ambientado' },
  { image: photos.infantilCentro, event: 'infantiles', caption: 'Centro de mesa' },

  // Noches de gala
  { image: photos.bodaNovios, event: 'casamientos', caption: 'El corte de la torta' },
  { image: photos.quinceMesa, event: 'quince', caption: 'Lila y plateado' },
  { image: photos.muestraQuince1, event: 'quince', caption: 'Mesa principal' },
  { image: photos.dieciochoMesa, event: 'dieciocho', caption: 'Negro y dorado' },
  { image: photos.bodaMesaDulce, event: 'casamientos', caption: 'Mesa dulce dorada' },
  { image: photos.despedidaLiving, event: 'despedidas', caption: 'Living con luces' },
  { image: photos.muestraDespedidas1, event: 'despedidas', caption: 'La pista' },
  { image: photos.dieciochoFiesta, event: 'dieciocho', caption: 'La fiesta' },
  { image: photos.quinceSalon, event: 'quince', caption: 'El salón para la cena' },
  { image: photos.muestraQuince2, event: 'quince', caption: 'El vals' },
  { image: photos.bodaAbrazo, event: 'casamientos', caption: 'Los novios' },
  { image: photos.muestraDespedidas2, event: 'despedidas', caption: 'El brindis' },
  { image: photos.dieciochoTorta, event: 'dieciocho', caption: 'La torta' },
  { image: photos.bodaMesa, event: 'casamientos', caption: 'Columnas doradas' },
  { image: photos.dieciochoSalon, event: 'dieciocho', caption: 'La recepción' },
  { image: photos.bodaRamo, event: 'casamientos', caption: 'El ramo' },
  { image: photos.muestraDespedidas3, event: 'despedidas', caption: 'Living y luces' },
  { image: photos.dieciochoLunch, event: 'dieciocho', caption: 'Mesa de lunch' },
]
