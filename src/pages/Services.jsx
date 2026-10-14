import PageHeader from '../components/ui/PageHeader'
import { images } from '../data/images'

// TODO: desarrollar el cotizador interactivo (tipo de fiesta, temática, extras y envío por WhatsApp).
export default function Services() {
  return (
    <PageHeader
      eyebrow="Servicios"
      title="Armá tu evento"
      subtitle="Próximamente: elegí tu fiesta, la temática y los extras, con el presupuesto en tiempo real."
      image={images.party}
    />
  )
}
