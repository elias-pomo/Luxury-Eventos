import PageHeader from '../components/ui/PageHeader'
import { images } from '../data/images'

// TODO: desarrollar en la próxima etapa (tipos de evento, fotos y candy bar).
export default function Gallery() {
  return (
    <PageHeader
      eyebrow="Galería"
      title="Nuestros eventos"
      subtitle="Próximamente: recorré cada tipo de celebración y nuestro candy bar."
      image={images.ballroom}
    />
  )
}
