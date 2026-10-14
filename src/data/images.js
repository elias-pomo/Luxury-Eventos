// Imágenes centralizadas. Para cambiar una foto: reemplazar el archivo en
// /public/images (o la ruta `src`) sin tocar los componentes.
//
// `position` es el punto de enfoque del recorte (CSS object-position):
// 'center' por defecto; 'center 70%' baja el foco, '30% center' lo corre a la izquierda.
// Útil sobre todo en fotos verticales que se muestran en espacios horizontales.

export const images = {
  hero: {
    src: '/images/hero.jpg',
    alt: 'Salón ambientado con mesas redondas, centros de mesa con luces y telas rosadas',
    position: 'center 70%',
  },
  about: {
    src: '/images/about.jpg',
    alt: 'Backdrop de cumpleaños con arcos dorados, flores y cartel de neón',
    position: 'center 70%',
  },
  ballroom: {
    src: '/images/ballroom.jpg',
    alt: 'Mesa elegante con mantel negro, copas y sitiales dorados',
    position: 'center 55%',
  },
  table: {
    src: '/images/table.jpg',
    alt: 'Salón de noche con centros de mesa iluminados',
    position: 'center 60%',
  },
  balloons: {
    src: '/images/balloons.jpg',
    alt: 'Salón iluminado con luces azules y sonido profesional',
    position: 'center 40%',
  },
  party: {
    src: '/images/party.jpg',
    alt: 'Centro de mesa con aro de flores y luces cálidas',
    position: 'center 45%',
  },
  toast: {
    src: '/images/toast.jpg',
    alt: 'Salón de día con mesas vestidas de blanco durante un evento',
    position: 'center 40%',
  },

  // Fachada (página de Contacto, para que los invitados reconozcan el salón)
  facadeStreet: {
    src: '/images/fachada1.png',
    alt: 'Vista de la cuadra: casa blanca de dos pisos con balcón de rejas negras, junto a un portón gris',
    position: 'center 55%',
  },
  facade: {
    src: '/images/fachada2.png',
    alt: 'Fachada blanca del salón con balcón de rejas y el cartel de Luxury Eventos sobre la puerta',
    position: 'center 60%',
  },
  entrance: {
    src: '/images/fachada3.png',
    alt: 'Entrada del salón: puerta con rejas negras debajo del cartel de Luxury Eventos',
    position: 'center 70%',
  },
}
