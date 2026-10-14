import ContactAbout from '../components/contact/ContactAbout'
import ContactChannels from '../components/contact/ContactChannels'
import ContactLocation from '../components/contact/ContactLocation'
import PageHeader from '../components/ui/PageHeader'
import { images } from '../data/images'

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu evento"
        subtitle="Conocé quiénes somos, escribinos por donde te quede cómodo y descubrí cómo llegar al salón."
        image={images.toast}
      />
      <ContactAbout />
      <ContactChannels />
      <ContactLocation />
    </>
  )
}
