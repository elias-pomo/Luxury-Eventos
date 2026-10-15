import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Expand, MapPin, Navigation } from 'lucide-react'
import { site } from '../../config/site'
import { contactLocation, facadePhotos } from '../../data/contact'
import Lightbox from '../gallery/Lightbox'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const ease = [0.22, 1, 0.36, 1]

export default function ContactLocation() {
  const [open, setOpen] = useState(null)
  const reduce = useReducedMotion()

  // Revelado tipo cortina (de abajo hacia arriba), igual que el mosaico de la Galería.
  const curtain = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
    // Margen solo abajo: uno negativo en los costados deja sin revelar lo que está pegado al borde.
    viewport: { once: true, margin: '0px 0px -40px 0px' },
    transition: { duration: 1.1, delay, ease },
  })

  return (
    <section id="como-llegar" className="bg-luxe scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle eyebrow="Cómo llegar" title="Te esperamos en El Colmenar" subtitle={contactLocation.subtitle} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8">
          <motion.div
            {...curtain()}
            className="relative aspect-square overflow-hidden rounded-sm border border-sand bg-sand shadow-soft sm:aspect-video lg:aspect-auto lg:min-h-110"
          >
            <iframe
              src={site.address.mapsEmbedUrl}
              title={`Mapa: ${site.name}, ${site.address.street}, ${site.address.city}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </motion.div>

          <Reveal delay={0.15} className="flex flex-col rounded-sm border border-sand bg-ivory p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                <span className="absolute inset-0 rounded-full bg-gold/50 motion-safe:animate-ping" />
                <MapPin className="relative size-5" />
              </span>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Dirección</p>
                <p className="mt-1 font-display text-2xl leading-tight">{site.address.street}</p>
                <p className="text-sm text-muted">{site.address.city}</p>
              </div>
            </div>

            <ol className="mt-6 space-y-3 border-t border-sand pt-6 text-sm text-muted">
              {facadePhotos.map(({ label, caption }, i) => (
                <li key={label} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/50 font-display text-sm text-gold-dark">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-semibold text-ink">{label}:</span> {caption.toLowerCase()}
                  </span>
                </li>
              ))}
            </ol>

            <Button href={site.address.mapsUrl} className="mt-8 w-full lg:mt-auto">
              <Navigation className="size-4" /> Abrir en Google Maps
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-14 mb-5 flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
          <span className="h-px w-8 bg-gold" /> Así se ve desde afuera
        </Reveal>

        {/* En celular: carrusel deslizable; en escritorio: tres columnas. */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0">
          {facadePhotos.map((photo, i) => (
            <motion.li key={photo.label} {...curtain(i * 0.12)} className="w-[85%] shrink-0 snap-center sm:w-auto">
              <button
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto: ${photo.label}, ${photo.caption}`}
                className="group relative block aspect-4/3 w-full overflow-hidden rounded-sm transition-transform duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Photo
                  image={photo.image}
                  className="size-full transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 flex flex-col items-start justify-end bg-linear-to-t from-ink/80 via-ink/10 to-transparent p-4 text-left">
                  <span className="text-[10px] tracking-[0.3em] text-gold-light uppercase">
                    {i + 1}. {photo.label}
                  </span>
                  <span className="mt-1 font-display text-lg text-white">{photo.caption}</span>
                </span>
                <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-sm">
                  <Expand className="size-4" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Lightbox photos={facadePhotos} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  )
}
