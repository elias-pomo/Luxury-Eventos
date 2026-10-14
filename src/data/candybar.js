import { images } from './images'

// Tipos de candy bar que se muestran en la Galería. Los precios se definen en
// el cotizador de Servicios.
//
// TODO: reemplazar por los tipos, descripciones y fotos reales del salón.
export const candyBars = [
  {
    id: 'clasico',
    name: 'Clásico',
    description:
      'Una mesa dulce prolija y colorida, con golosinas surtidas presentadas en frascos y bandejas. Simple, alegre y siempre un éxito entre los chicos y los grandes.',
    idealFor: 'Infantiles, bautismos y comuniones',
    includes: ['Golosinas surtidas', 'Frascos y bandejas', 'Cartel con el nombre'],
    photos: [images.party, images.about],
  },
  {
    id: 'tematico',
    name: 'Temático',
    description:
      'Diseñado a medida según la temática de tu fiesta: elegimos golosinas en los colores del evento, sumamos decoración especial y etiquetas personalizadas.',
    idealFor: 'Cumpleaños, baby showers y revelaciones',
    includes: ['Golosinas en los colores del evento', 'Decoración temática', 'Etiquetas personalizadas'],
    photos: [images.about, images.hero],
  },
  {
    id: 'premium',
    name: 'Premium',
    description:
      'La mesa más completa, con mesa dulce y una puesta elegante de flores, luces y exhibidores. Pensada para lucirse en las noches de gala.',
    idealFor: '15 años, casamientos y fiestas de noche',
    includes: ['Golosinas y mesa dulce', 'Ambientación con flores y luces', 'Exhibidores y vajilla premium'],
    photos: [images.ballroom, images.table],
  },
]

// Cómo se arma un candy bar, en pasos.
// TODO: confirmar con el salón.
export const candyBarSteps = [
  { title: 'Elegís el estilo', text: 'Clásico, temático o premium, según el tipo de fiesta.' },
  { title: 'Definimos los detalles', text: 'Colores, temática, golosinas y carteles personalizados.' },
  { title: 'Lo armamos en el salón', text: 'El día del evento está listo antes de que lleguen tus invitados.' },
]
