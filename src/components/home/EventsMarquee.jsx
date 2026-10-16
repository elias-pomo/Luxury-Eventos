import { eventTypes } from '../../data/events'
import Marquee from '../ui/Marquee'

const names = eventTypes.map((e) => e.name)

// Franja oscura con los tipos de evento corriendo, entre la portada y "Nosotros".
export default function EventsMarquee() {
  return (
    <section aria-label="Eventos que celebramos" className="bg-luxe-dark py-6 text-gold-light sm:py-8">
      <Marquee items={names} time={55} />
    </section>
  )
}
