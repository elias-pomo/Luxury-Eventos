import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { eventTypes } from '../../data/events'
import { galleryEventDetails, galleryPhotos } from '../../data/gallery'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Lightbox from './Lightbox'
import PhotoMosaic from './PhotoMosaic'

const ALL = 'todos'
const eventsById = Object.fromEntries(eventTypes.map((event) => [event.id, event]))
const ease = [0.22, 1, 0.36, 1]

// Sección de la Galería: pestañas por tipo de evento, panel con información
// del evento elegido (fijo al costado en desktop) y mosaico de fotos con visor.
export default function GallerySection({ section }) {
  const { id, eyebrow, title, subtitle, events, dark, intro } = section
  const [filter, setFilter] = useState(ALL)
  const [openIndex, setOpenIndex] = useState(null)

  const sectionPhotos = useMemo(
    () =>
      galleryPhotos
        .filter((photo) => events.includes(photo.event))
        .map((photo) => ({ ...photo, label: eventsById[photo.event].name })),
    [events],
  )
  const photos = filter === ALL ? sectionPhotos : sectionPhotos.filter((photo) => photo.event === filter)

  const tabs = [
    { id: ALL, name: 'Todos' },
    ...events.filter((event) => sectionPhotos.some((photo) => photo.event === event)).map((event) => eventsById[event]),
  ]

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-(--scroll-offset,7rem) overflow-clip py-24 sm:py-32 ${dark ? 'bg-luxe-dark text-white' : 'bg-luxe'}`}
    >
      <div className="container-page">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} light={dark} titleId={`${id}-title`} />

        <Reveal delay={0.1} className="mt-12">
          {/* En celular las pestañas se deslizan de costado: el degradé de los bordes
              avisa que hay más, y la elegida se centra sola. */}
          <div
            role="group"
            aria-label="Filtrar por tipo de evento"
            className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto py-1 pr-10 pl-4 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2.5rem),transparent)] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 sm:[mask-image:none]"
          >
            {tabs.map((tab) => {
              const active = filter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    setFilter(tab.id)
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                  }}
                  aria-pressed={active}
                  className={`shrink-0 snap-start rounded-full border px-5 py-3 text-[11px] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 ${
                    active
                      ? 'border-gold bg-gold text-white'
                      : dark
                        ? 'border-white/20 text-white/75 hover:border-gold hover:text-gold-light'
                        : 'border-gold/35 text-gold-dark hover:border-gold hover:bg-gold/10'
                  }`}
                >
                  {tab.name}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 ${dark ? 'lg:order-2' : ''}`}>
            <Reveal delay={0.15} className="lg:sticky lg:top-40">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <InfoPanel
                    event={filter === ALL ? null : eventsById[filter]}
                    intro={intro}
                    photoCount={photos.length}
                    dark={dark}
                  />
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={filter} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                <PhotoMosaic photos={photos} onOpen={setOpenIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </section>
  )
}

// Texto del panel: la introducción de la sección ("Todos") o el detalle del evento elegido.
function InfoPanel({ event, intro, photoCount, dark }) {
  const details = event ? galleryEventDetails[event.id] : intro
  const Icon = event?.icon ?? Sparkles
  const muted = dark ? 'text-white/70' : 'text-muted'

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Icon className="size-5" strokeWidth={1.5} />
        </span>
        <span className={`text-[11px] tracking-[0.3em] uppercase ${dark ? 'text-gold-light' : 'text-gold-dark'}`}>
          {photoCount} {photoCount === 1 ? 'foto' : 'fotos'}
        </span>
      </div>

      <h3 className={`mt-6 text-3xl leading-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>
        {event ? event.name : intro.title}
      </h3>
      <span className="mt-5 block h-px w-16 bg-gold" />
      <p className={`mt-5 text-sm leading-relaxed sm:text-base ${muted}`}>{details.text}</p>

      <ul className="mt-7 space-y-3">
        {details.points.map((point) => (
          <li key={point} className={`flex items-start gap-3 text-sm ${dark ? 'text-white/90' : 'text-ink'}`}>
            <Check className="mt-0.5 size-4 shrink-0 text-gold" />
            {point}
          </li>
        ))}
      </ul>

      <Button to="/servicios" className="mt-8 w-full sm:mt-9 sm:w-auto">
        {event ? 'Cotizá este evento' : 'Armá tu presupuesto'} <ArrowRight className="size-4" />
      </Button>
    </>
  )
}
