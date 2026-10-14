import { site } from '../config/site'
import { images } from './images'

// Textos de la página de Contacto.

export const contactAbout = {
  title: 'Un salón con alma de casa',
  paragraphs: [
    `Somos un salón familiar en ${site.address.city}, con capacidad para ${site.capacity} invitados. Hace más de 5 años que acompañamos cumpleaños, casamientos y bautismos con la calidez de quien recibe en su propia casa.`,
    `${site.owner.split(' ')[0]} te atiende de principio a fin: te ayuda a elegir el turno, la ambientación y los extras para que el día del evento solo te ocupes de disfrutar.`,
  ],
}

export const contactForm = {
  title: 'Consultá tu fecha',
  subtitle: 'Dejanos tu nombre y la fecha que buscás, y te respondemos por WhatsApp con la disponibilidad.',
  messagePlaceholder: 'Contanos brevemente qué evento querés hacer. Ej: cumple de 15 para unos 80 invitados, turno noche.',
  submit: 'Enviar por WhatsApp',
}

export const contactLocation = {
  subtitle: 'Estamos sobre la avenida William Cross 2935. Buscá la casa blanca de dos pisos con balcón de rejas negras y el cartel dorado de Luxury Eventos sobre la puerta.',
}

// Fotos de la fachada, de lejos a cerca, para orientarse al llegar.
// Formato compatible con el visor de fotos: { image, label, caption }.
export const facadePhotos = [
  { image: images.facadeStreet, label: 'La cuadra', caption: 'Casa blanca con balcón de rejas' },
  { image: images.facade, label: 'La fachada', caption: 'El cartel sobre la puerta' },
  { image: images.entrance, label: 'La entrada', caption: 'Puerta de rejas negras' },
]
