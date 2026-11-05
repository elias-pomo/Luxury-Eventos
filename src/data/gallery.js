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
      'Quince, dieciocho, casamientos, cumpleaños de adultos y fiestas de empresa: luces, pista y una puesta elegante para las noches más importantes.',
    events: ['quince', 'dieciocho', 'casamientos', 'adultos', 'corporativos'],
    dark: true,
    intro: {
      title: 'Noches que se viven a pleno',
      text: 'Para las fiestas más esperadas transformamos el salón: luces, pista, mesas vestidas de gala y una puesta pensada para que cada momento salga perfecto en las fotos.',
      points: [
        `Hasta ${site.capacity} invitados en un ambiente íntimo`,
        `15, 18 y casamientos: ${shiftsText(site.shiftSchedules.premium).toLowerCase()}`,
        `Cumpleaños y fiestas: ${shiftsText(site.shiftSchedules.standard).toLowerCase()}`,
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
  adultos: {
    text: 'Tus 30, 40, 50 o los que cumplas, un aniversario, una despedida o una reunión con amigos: armamos la fiesta con la temática que elijas, música, brindis y una mesa para disfrutar sin apuro.',
    points: ['Temática a elección', 'DJ como extra', 'Lunch y mesa dulce'],
  },
  corporativos: {
    text: 'Jornadas, reuniones y fiestas de fin de año de empresa. Armamos el salón con mesas vestidas, coffee break o almuerzo y, para festejar, la pista y el momento de los sorteos, con mozos para que el equipo solo se ocupe de lo suyo.',
    points: ['Mozos incluidos', 'Jornadas con coffee break', 'Fin de año con sorteos y pista'],
  },
}

// Fotos de la Galería. `event` es el id del tipo de evento (data/events.js) y el
// orden es el del mosaico. Para sumar una foto: copiarla en /public/images,
// registrarla en data/photos.js y agregar una línea acá.
export const galleryPhotos = [
  // En familia
  { image: photos.infantilMonsters, event: 'infantiles', caption: 'Monsters Inc.' },
  { image: photos.babyConejitaPapas, event: 'baby-shower', caption: 'Oh Baby! en el bosque' },
  { image: photos.comunionVerdeFamilia, event: 'comuniones', caption: 'Verde, dorado y crema' },
  { image: photos.bautismoBeige, event: 'bautismos', caption: 'Beige y dorado' },
  { image: photos.candyKpop, event: 'infantiles', caption: 'K-pop' },
  { image: photos.revelacionMesa, event: 'revelacion', caption: 'Mesa dulce en azul' },
  { image: photos.comunionCaliz, event: 'comuniones', caption: 'Dorado y blanco' },
  { image: photos.babySafari, event: 'baby-shower', caption: 'Safari' },
  { image: photos.infantilPocoyo, event: 'infantiles', caption: 'Pocoyó' },
  { image: photos.comunionRosaMesa, event: 'comuniones', caption: 'Rosa viejo y dorado' },
  { image: photos.bautismoElefante, event: 'bautismos', caption: 'Elefantito en rosa' },
  { image: photos.comunionVerde, event: 'comuniones', caption: 'La torta con cruz' },
  { image: photos.babyConejitaMesa, event: 'baby-shower', caption: 'Mesa dulce sobre hongos' },
  { image: photos.comunionVerdeMesa, event: 'comuniones', caption: 'La mesa principal' },
  { image: photos.candyConejita, event: 'infantiles', caption: 'Conejita del bosque' },
  { image: photos.comunionAmarilla, event: 'comuniones', caption: 'Amarillo y blanco' },
  { image: photos.infantilPocoyoChicos, event: 'infantiles', caption: 'Pocoyó con los chicos' },
  { image: photos.comunionRosaSalon, event: 'comuniones', caption: 'El salón de gala' },
  { image: photos.babyBosque, event: 'baby-shower', caption: 'Animalitos del bosque' },
  { image: photos.infantilPooh, event: 'infantiles', caption: 'Winnie Pooh' },
  { image: photos.bautismoCeleste, event: 'bautismos', caption: 'Celeste y dorado' },
  { image: photos.comunionVerdeAbrazo, event: 'comuniones', caption: 'Un abrazo para el recuerdo' },
  { image: photos.babyConejitaTorta, event: 'baby-shower', caption: 'El corte de la torta' },
  { image: photos.infantilFrutillita, event: 'infantiles', caption: 'Frutillitas' },
  { image: photos.comunionDorada, event: 'comuniones', caption: 'Columnas doradas' },
  { image: photos.babyPanda, event: 'baby-shower', caption: 'Osito panda' },
  { image: photos.infantilVampirina, event: 'infantiles', caption: 'Vampirina' },
  { image: photos.comunionVerdeHermanos, event: 'comuniones', caption: 'En familia' },
  { image: photos.comunionRosaArco, event: 'comuniones', caption: 'Arco con camino de flores' },
  { image: photos.infantilPintacaritas, event: 'infantiles', caption: 'Pintacaritas' },
  { image: photos.babyConejitaRincon, event: 'baby-shower', caption: 'Rincón de la conejita' },
  { image: photos.infantilLol, event: 'infantiles', caption: 'Muñecas LOL' },
  { image: photos.comunionVerdeInvitados, event: 'comuniones', caption: 'Con los invitados' },
  { image: photos.comunionRosaMesas, event: 'comuniones', caption: 'Mesas en negro y dorado' },
  { image: photos.comunionVerdeSillon, event: 'comuniones', caption: 'El sillón y el neón' },
  { image: photos.babyMasitas, event: 'baby-shower', caption: 'Masitas y tartitas' },
  { image: photos.infantilMariposa, event: 'infantiles', caption: 'Detalles personalizados' },
  { image: photos.comunionSouvenir, event: 'comuniones', caption: 'Souvenirs de angelitos' },
  { image: photos.comunionRosaDetalle, event: 'comuniones', caption: 'Mármol y cristal' },
  { image: photos.infantilSouvenirs, event: 'infantiles', caption: 'Biblioteca de souvenirs' },
  { image: photos.comunionVerdeLampara, event: 'comuniones', caption: 'Lámpara de plumas' },
  { image: photos.comunionRosaSouvenirs, event: 'comuniones', caption: 'Souvenirs en frasquitos' },
  { image: photos.comunionVerdeBienvenida, event: 'comuniones', caption: 'La bienvenida' },
  { image: photos.comunionRosaBienvenida, event: 'comuniones', caption: 'Bienvenida con tul' },
  { image: photos.babyConejitaNombre, event: 'baby-shower', caption: 'El nombre de la bebé' },
  { image: photos.infantilCentro, event: 'infantiles', caption: 'Centro de mesa' },
  { image: photos.babyProfiteroles, event: 'baby-shower', caption: 'Profiteroles' },
  { image: photos.babySouvenirs, event: 'baby-shower', caption: 'Souvenirs' },
  { image: photos.babyVelita, event: 'baby-shower', caption: 'Souvenir de velita' },

  // Noches de gala
  { image: photos.bodaNovios, event: 'casamientos', caption: 'El corte de la torta' },
  { image: photos.quinceMesa, event: 'quince', caption: 'Lila y plateado' },
  { image: photos.muestraQuince1, event: 'quince', caption: 'Mesa principal' },
  { image: photos.dieciochoMesa, event: 'dieciocho', caption: 'Negro y dorado' },
  { image: photos.bodaMesaDulce, event: 'casamientos', caption: 'Mesa dulce dorada' },
  { image: photos.adultosMesa, event: 'adultos', caption: 'Noche ochentosa' },
  { image: photos.adultosTorta, event: 'adultos', caption: 'Mis 50' },
  { image: photos.dieciochoFiesta, event: 'dieciocho', caption: 'La fiesta' },
  { image: photos.quinceSalon, event: 'quince', caption: 'El salón para la cena' },
  { image: photos.muestraQuince2, event: 'quince', caption: 'El vals' },
  { image: photos.bodaAbrazo, event: 'casamientos', caption: 'Los novios' },
  { image: photos.adultosCumpleanero, event: 'adultos', caption: 'El cumpleañero' },
  { image: photos.dieciochoTorta, event: 'dieciocho', caption: 'La torta' },
  { image: photos.bodaMesa, event: 'casamientos', caption: 'Columnas doradas' },
  { image: photos.dieciochoSalon, event: 'dieciocho', caption: 'La recepción' },
  { image: photos.bodaRamo, event: 'casamientos', caption: 'El ramo' },
  { image: photos.adultosDetalle, event: 'adultos', caption: 'Brillo disco' },
  { image: photos.adultosLiving, event: 'adultos', caption: 'Living con luces' },
  { image: photos.adultosLunch, event: 'adultos', caption: 'Mesa de lunch' },
  { image: photos.dieciochoLunch, event: 'dieciocho', caption: 'Mesa de lunch' },
  { image: photos.corporativoPremios, event: 'corporativos', caption: 'Fin de año: la mesa de premios' },
  { image: photos.corporativoReunion, event: 'corporativos', caption: 'Jornada de empresa' },
  { image: photos.corporativoFiesta, event: 'corporativos', caption: 'Fin de año' },
  { image: photos.corporativoCoffee, event: 'corporativos', caption: 'Coffee break' },
  { image: photos.corporativoArco, event: 'corporativos', caption: 'Frente al arco' },
  { image: photos.corporativoRecepcion, event: 'corporativos', caption: 'La recepción' },
  { image: photos.corporativoPista, event: 'corporativos', caption: 'La pista' },
  { image: photos.corporativoMesa, event: 'corporativos', caption: 'Mesas vestidas de blanco' },
  { image: photos.corporativoGrupo, event: 'corporativos', caption: 'Todo el equipo' },
  { image: photos.corporativoJornada, event: 'corporativos', caption: 'En plena jornada' },
]
