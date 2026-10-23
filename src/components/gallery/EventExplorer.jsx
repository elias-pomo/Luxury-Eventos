import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { eventTypes } from '../../data/events'
import { galleryEventDetails, galleryPhotos, gallerySections } from '../../data/gallery'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import Lightbox from './Lightbox'
import EventMosaic from './EventMosaic'
import { ease } from '../../utils/motion'
import Section from '../ui/Section'

const ALL = 'todos'
const eventsById = Object.fromEntries(eventTypes.map((event) => [event.id, event]))

// Fotos de cada grupo ("En familia", "Noches de gala"), con el nombre del evento como etiqueta.
const photosByGroup = Object.fromEntries(
  gallerySections.map(({ id, events }) => [
    id,
    galleryPhotos
      .filter((photo) => events.includes(photo.event))
      .map((photo) => ({ ...photo, label: eventsById[photo.event].name, icon: eventsById[photo.event].icon })),
  ]),
)

// Explorador de la Galería: dos grupos, fichas por evento, mosaico de fotos y la tarjeta
// con el detalle del evento y el llamado a cotizar. En celular la tarjeta va después de
// las fotos; en escritorio queda fija a la izquierda junto a los filtros.
export default function EventExplorer() {
  const [groupId, setGroupId] = useState(gallerySections[0].id)
  const [eventId, setEventId] = useState(ALL)
  const [openIndex, setOpenIndex] = useState(null)
  const reduce = useReducedMotion()

  const group = gallerySections.find((g) => g.id === groupId)
  const groupPhotos = photosByGroup[groupId]
  const photos = useMemo(
    () => (eventId === ALL ? groupPhotos : groupPhotos.filter((p) => p.event === eventId)),
    [groupPhotos, eventId],
  )
  const event = eventId === ALL ? null : eventsById[eventId]
  const details = event ? galleryEventDetails[event.id] : group.intro
  const chips = [{ id: ALL, name: 'Todos' }, ...group.events.filter((id) => groupPhotos.some((p) => p.event === id)).map((id) => eventsById[id])]

  const chooseGroup = (id) => {
    setGroupId(id)
    setEventId(ALL)
  }

  return (
    <Section aria-labelledby="explorador-title" tone="cream" className="overflow-x-clip">
      <div className="container-page">
        <SectionTitle
          eyebrow="Nuestros eventos"
          title="Elegí una celebración"
          subtitle="Mirá cómo se transforma el salón en cada fiesta. Las fotos van cambiando solas: tocá una para verla en grande."
          titleId="explorador-title"
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
          {/* En celular este bloque no existe (contents) y sus hijos se ordenan alrededor del mosaico */}
          <div className="contents lg:sticky lg:top-28 lg:block">
            {/* Grupos y fichas por evento */}
            <div className="order-1 min-w-0">
              <div className="relative grid grid-cols-2 rounded-full border border-gold/30 bg-white p-1 shadow-soft">
                {gallerySections.map(({ id, nav }) => {
                  const on = id === groupId
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => chooseGroup(id)}
                      className={`relative min-h-11 rounded-full type-label transition-colors duration-300 ${
                        on ? 'text-gold-light' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="gallery-group"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          className="absolute inset-0 rounded-full bg-ink"
                        />
                      )}
                      <span className="relative">{nav}</span>
                    </button>
                  )
                })}
              </div>

              <ul className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                {chips.map(({ id, name }) => {
                  const on = id === eventId
                  return (
                    <li key={id} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setEventId(id)}
                        className={`relative min-h-10 rounded-full border px-4 text-sm whitespace-nowrap transition-colors duration-300 ${
                          on ? 'border-gold text-ink' : 'border-gold/30 bg-white/70 text-ink hover:border-gold'
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId={`gallery-chip-${groupId}`}
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                            className="absolute inset-0 rounded-full bg-gold"
                          />
                        )}
                        <span className="relative">{name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Detalle del evento elegido */}
            <div className="order-3 min-w-0 lg:mt-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${groupId}-${eventId}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.35, ease }}
                  className="card-luxe relative overflow-hidden p-6 text-ink sm:p-8"
                >
                  {event && (
                    <event.icon
                      aria-hidden="true"
                      strokeWidth={0.8}
                      className="pointer-events-none absolute -top-6 -right-8 size-40 -rotate-12 text-gold/10"
                    />
                  )}
                  <h3 className="relative text-3xl leading-tight sm:text-4xl">{event ? event.name : details.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted sm:text-base">{details.text}</p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {details.points.map((point) => (
                      <li key={point} className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-xs text-ink">
                        <Check className="size-3.5 shrink-0 text-gold-dark" strokeWidth={2.5} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button to={event ? `/servicios?tipo=${event.id}` : '/servicios'} className="relative mt-6 w-full sm:w-auto">
                    {event ? 'Cotizá este evento' : 'Armá tu presupuesto'} <ArrowRight className="size-4" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mosaico de fotos */}
          <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1">
            <EventMosaic
              key={`${groupId}-${eventId}`}
              photos={photos}
              showLabel={eventId === ALL}
              paused={openIndex !== null}
              onOpen={setOpenIndex}
            />
          </div>
        </div>
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </Section>
  )
}
