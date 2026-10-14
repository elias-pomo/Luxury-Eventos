import PageHeader from '../components/ui/PageHeader'
import { images } from '../data/images'

// TODO: desarrollar información de contacto, mapa y formulario.
export default function Contact() {
  return (
    <PageHeader
      eyebrow="Contacto"
      title="Hablemos de tu evento"
      subtitle="Próximamente: datos de contacto, ubicación y formulario."
      image={images.toast}
    />
  )
}
