import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, Expand, Pause, Play } from 'lucide-react'
import { eventTypes } from '../../data/events'
import { galleryEventDetails, galleryPhotos, gallerySections } from '../../data/gallery'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Sparkles from '../ui/Sparkles'
import Lightbox from './Lightbox'

const ALL = 'todos'
const SLIDE_S = 4.5
const ease = [0.22, 1, 0.36, 1]
const eventsById = Object.fromEntries(eventTypes.map((event) => [event.id, event]))

// Fotos de cada grupo ("En familia", "Noches de gala"), con el nombre del evento como etiqueta.
const photosByGroup = Object.fromEntries(
  gallerySections.map(({ id, events }) => [
    id,
    galleryPhotos
      .filter((photo) => events.includes(photo.event))
      .map((photo) => ({ ...photo, label: eventsById[photo.event].name })),
  ]),
)

// Explorador de la Galería: dos grupos, fichas por evento y un "escenario" de fotos
// tipo historias (avanza solo mientras está a la vista; tocá a los costados para ir y
// volver, o el ícono para verla en grande). Reemplaza a las secciones largas con mosaico.
export default function EventExplorer() {
  const [groupId, setGroupId] = useState(gallerySections[0].id)
  const [eventId, setEventId] = useState(ALL)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [holding, setHolding] = useState(false) // dedo apoyado sobre la foto: se frena, como en las historias
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const thumbsRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const reduce = useReducedMotion()

  const group = gallerySections.find((g) => g.id === groupId)
  const groupPhotos = photosByGroup[groupId]
  const photos = useMemo(
    () => (eventId === ALL ? groupPhotos : groupPhotos.filter((p) => p.event === eventId)),
    [groupPhotos, eventId],
  )
  const photo = photos[index] ?? photos[0]
  const event = eventId === ALL ? null : eventsById[eventId]
  const details = event ? galleryEventDetails[event.id] : group.intro
  const chips = [{ id: ALL, name: 'Todos' }, ...group.events.filter((id) => groupPhotos.some((p) => p.event === id)).map((id) => eventsById[id])]
  const running = inView && !paused && !holding && !reduce && openIndex === null && photos.length > 1

  const go = (step) => setIndex((i) => (i + step + photos.length) % photos.length)
  const chooseGroup = (id) => {
    setGroupId(id)
    setEventId(ALL)
    setIndex(0)
  }
  const chooseEvent = (id) => {
    setEventId(id)
    setIndex(0)
  }

  // Mantiene la miniatura activa a la vista dentro de la tira (sin mover la página).
  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[index]
    if (!thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' })
  }, [index, photos])

  return (
    <section ref={sectionRef} aria-labelledby="explorador-title" className="bg-luxe-dark relative overflow-hidden py-16 text-white sm:py-24">
      <Sparkles count={7} />
      <div className="container-page relative">
        <SectionTitle
          eyebrow="Nuestros eventos"
          title="Elegí una celebración"
          subtitle="Mirá cómo se transforma el salón en cada fiesta. Tocá a los costados de la foto para pasar."
          light
          titleId="explorador-title"
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 lg:gap-y-8">
          {/* Grupos y fichas por evento */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <div className="relative grid grid-cols-2 rounded-full border border-gold/30 bg-white/5 p-1">
              {gallerySections.map(({ id, nav }) => {
                const on = id === groupId
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => chooseGroup(id)}
                    className={`relative min-h-11 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      on ? 'text-ink' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="gallery-group"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-gold-light"
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
                      onClick={() => chooseEvent(id)}
                      className={`relative min-h-10 rounded-full border px-4 text-sm whitespace-nowrap transition-colors duration-300 ${
                        on ? 'border-gold text-ink' : 'border-white/20 text-white/80 hover:border-gold hover:text-gold-light'
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

          {/* Escenario: foto grande en arco */}
          <Reveal className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="card-luxe card-luxe-arch card-luxe-dark relative mx-auto max-w-md p-2.5 sm:p-3">
              <div
                className="relative aspect-4/5 overflow-hidden rounded-t-full bg-ink"
                onPointerUp={() => setHolding(false)}
                onPointerLeave={() => setHolding(false)}
              >
                <AnimatePresence initial={false}>
                  <motion.img
                    key={photo.image.src}
                    src={photo.image.src}
                    alt={photo.image.alt}
                    style={{ objectPosition: photo.image.position ?? 'center' }}
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.6 }, scale: { duration: SLIDE_S + 1, ease: 'easeOut' } }}
                    className="absolute inset-0 size-full object-cover select-none"
                    draggable={false}
                  />
                </AnimatePresence>
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />

                {/* Zonas táctiles: izquierda vuelve, derecha avanza */}
                <button type="button" aria-label="Foto anterior" onPointerDown={() => setHolding(true)} onClick={() => go(-1)} className="absolute inset-y-0 left-0 w-1/3" />
                <button type="button" aria-label="Foto siguiente" onPointerDown={() => setHolding(true)} onClick={() => go(1)} className="absolute inset-y-0 right-0 w-2/3" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={photo.image.src}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-light uppercase">{photo.label}</p>
                      <p className="mt-1 font-display text-2xl text-white sm:text-3xl">{photo.caption}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
                      {running ? (
                        <motion.span
                          key={`${groupId}-${eventId}-${index}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: SLIDE_S, ease: 'linear' }}
                          onAnimationComplete={() => go(1)}
                          className="absolute inset-0 origin-left bg-gold-light"
                        />
                      ) : (
                        <span
                          className="absolute inset-y-0 left-0 bg-gold-light/70"
                          style={{ width: `${((index + 1) / photos.length) * 100}%` }}
                        />
                      )}
                    </span>
                    <span className="font-display text-base text-white/80 tabular-nums">
                      {index + 1} / {photos.length}
                    </span>
                  </div>
                </div>

                <div className="absolute top-[18%] right-4 flex flex-col gap-2 sm:right-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label="Ver la foto en grande"
                    className="flex size-11 items-center justify-center rounded-full bg-ink/50 text-white backdrop-blur-sm transition-colors hover:bg-gold"
                  >
                    <Expand className="size-4" />
                  </button>
                  {!reduce && photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      aria-label={paused ? 'Reanudar las fotos' : 'Pausar las fotos'}
                      className="flex size-11 items-center justify-center rounded-full bg-ink/50 text-white backdrop-blur-sm transition-colors hover:bg-gold"
                    >
                      {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Tira de miniaturas */}
              <ul ref={thumbsRef} className="no-scrollbar relative mt-3 flex gap-2 overflow-x-auto px-1 py-1.5">
                {photos.map((p, i) => (
                  <li key={p.image.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Ver ${p.caption}`}
                      aria-current={i === index}
                      className={`block size-14 overflow-hidden rounded-sm transition-all duration-300 sm:size-16 ${
                        i === index ? 'opacity-100 ring-2 ring-gold-light ring-offset-2 ring-offset-ink' : 'opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={p.image.src}
                        alt=""
                        loading="lazy"
                        style={{ objectPosition: p.image.position ?? 'center' }}
                        className="size-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Detalle del evento elegido */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
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
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </section>
  )
}
