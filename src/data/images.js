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
    src: '/images/about.webp',
    alt: 'Backdrop de cumpleaños con arcos dorados, flores y cartel de neón',
    position: 'center 70%',
  },
  // Foto de la dueña (secciones "Nosotros" de Inicio y Contacto)
  owner: {
    src: '/images/duena.webp',
    alt: 'Fernanda Rechi, dueña del salón, sonriendo con un ramo de flores junto a una mesa dulce',
    position: 'center 30%',
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
    src: '/images/toast.webp',
    alt: 'Salón de día con mesas vestidas de blanco durante un evento',
    position: 'center 40%',
  },

  // Fachada (página de Contacto, para que los invitados reconozcan el salón)
  facade: {
    src: '/images/fachada2.webp',
    alt: 'Fachada blanca del salón con el cartel luminoso de Luxury Eventos y rejas negras',
    position: 'center 40%',
  },
  entrance: {
    src: '/images/fachada3.webp',
    alt: 'Entrada del salón con la puerta de rejas abierta bajo el cartel luminoso',
    position: 'center 40%',
  },
}
