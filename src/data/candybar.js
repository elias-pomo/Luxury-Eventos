import { photos } from './photos'

// Tamaños de candy bar (definidos por el salón). Los precios están en
// candyBarPrices de pricing.js. La Galería muestra un boleto por cada uno y el
// cotizador los ofrece en el paso de extras. `summary` es la línea corta que
// acompaña al nombre.
//
// TODO: las fotos son de candy bar reales del salón, pero no están asignadas por
// tamaño: confirmar con el salón cuál corresponde a cada uno.
export const candyBars = [
  {
    id: 'pequeno',
    name: 'Pequeño',
    summary: '1 panel, 1 personaje y 2 mesas',
    includes: [
      '1 panel de diseño',
      '1 personaje u ornamentación temática',
      '2 mesas',
      'Globos',
      'Bandejas para lo dulce',
    ],
    photos: [photos.candyAlgodones, photos.candyPatrullaDulces],
  },
  {
    id: 'mediano',
    name: 'Mediano',
    summary: '2 paneles, 2 personajes, 4 mesas y alfombra',
    includes: ['2 paneles de diseño', '2 personajes u ornamentos', '4 mesas', 'Globos', 'Alfombra'],
    photos: [photos.candyMonsters],
  },
  {
    id: 'grande',
    name: 'Grande',
    summary: '3 paneles, 4 mesas, luces y carteles de neón',
    includes: [
      '3 paneles de diseño',
      '2 personajes u ornamentos',
      '4 mesas',
      'Globos',
      'Luces de protón',
      'Carteles de neón',
    ],
    photos: [photos.candyPatrulla],
  },
  {
    id: 'completo',
    name: 'Completo',
    summary: 'Todo el espacio ambientado, con lo que pida el diseño',
    includes: [
      'Un panel que abarca todo el espacio, o los paneles que pida el diseño',
      'Alfombra',
      'Todas las mesas necesarias',
      'Todos los personajes u ornamentos necesarios',
      'Luces y carteles de neón',
    ],
    photos: [photos.candySafariMesa, photos.candySafari],
  },
]

// Cómo se arma un candy bar, en pasos.
// TODO: confirmar con el salón.
export const candyBarSteps = [
  { title: 'Elegís el tamaño', text: 'Pequeño, mediano, grande o completo, según tu fiesta.' },
  { title: 'Definimos los detalles', text: 'Colores, temática, personajes y carteles.' },
  { title: 'Lo armamos en el salón', text: 'El día del evento está listo antes de que lleguen tus invitados.' },
]
