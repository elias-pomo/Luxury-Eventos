import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, Images } from 'lucide-react'
import { candyBars, candyBarSteps } from '../../data/candybar'
import { candyBarPrices } from '../../data/pricing'
import { formatPrice } from '../../utils/format'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Lightbox from './Lightbox'

const ease = [0.22, 1, 0.36, 1]

// Candy bar compacto: los 3 pasos en una fila y los estilos en tarjetas en arco
// (carrusel deslizable en celular, tres columnas en escritorio). Cada tarjeta alterna
// sus fotos sola mientras está a la vista.
export default function CandyBarShowcase({ id }) {
  const [lightbox, setLightbox] = useState(null) // { photos, index }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-luxe-cream scroll-mt-20 overflow-hidden py-16 sm:py-24">
      <div className="container-page">
        <SectionTitle
          eyebrow="Candy bar"
          title="Una mesa dulce para cada fiesta"
          subtitle="Exclusivo del salón y armado a tono con tu temática. Elegí el estilo y sumalo en el cotizador."
          titleId={`${id}-title`}
        />

        {/* Cómo se arma: tres pasos en una fila */}
        <ol className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:mt-12 sm:gap-6">
          {candyBarSteps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.1} className="flex flex-col items-center text-center">
              <span className="relative flex size-11 items-center justify-center rounded-full bg-ink font-display text-xl text-gold-light shadow-soft">
                <span aria-hidden="true" className="animate-spin-slow absolute -inset-1.5 rounded-full border border-dashed border-gold/60" />
                {i + 1}
              </span>
              <h3 className="mt-3 text-base leading-tight sm:text-xl">{step.title}</h3>
              <p className="mt-1 hidden text-sm leading-relaxed text-muted sm:block">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
          {candyBars.map((candyBar, i) => (
            <CandyCard
              key={candyBar.id}
              candyBar={candyBar}
              index={i}
              onOpen={(photoIndex) =>
                setLightbox({
                  photos: candyBar.photos.map((image) => ({ image, caption: candyBar.name, label: 'Candy bar' })),
                  index: photoIndex,
                })
              }
            />
          ))}
        </ul>
      </div>

      <Lightbox
        photos={lightbox?.photos ?? []}
        index={lightbox ? lightbox.index : null}
        onClose={() => setLightbox(null)}
        onChange={(index) => setLightbox((l) => ({ ...l, index }))}
      />
    </section>
  )
}

function CandyCard({ candyBar, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)
  const { id, name, idealFor, includes, photos } = candyBar

  // Alterna las fotos cada tanto, desfasado por tarjeta para que no cambien todas juntas.
  useEffect(() => {
    if (!inView || reduce || photos.length < 2) return
    const timer = setInterval(() => setShown((s) => (s + 1) % photos.length), 3600 + index * 700)
    return () => clearInterval(timer)
  }, [inView, reduce, photos.length, index])

  const photo = photos[shown]

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
      className="group card-luxe card-luxe-arch relative flex w-[82%] shrink-0 snap-center flex-col p-3 text-center sm:w-auto"
    >
      <button
        type="button"
        onClick={() => onOpen(shown)}
        aria-label={`Ver fotos del candy bar ${name}`}
        className="relative block aspect-4/5 w-full overflow-hidden rounded-t-full bg-sand"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.position ?? 'center' }}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 4, ease: 'easeOut' } }}
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
          />
        </AnimatePresence>
        <span className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/55 px-3 py-1.5 text-[11px] text-white backdrop-blur-sm">
          <Images className="size-3.5" /> {photos.length} fotos
        </span>
      </button>

      <div className="flex flex-1 flex-col px-3 pb-4">
        <p className="mt-5 text-[11px] font-semibold tracking-[0.3em] text-gold-dark uppercase">Candy bar</p>
        <h3 className="mt-1 text-4xl leading-tight">{name}</h3>
        <p className="mt-1 text-sm text-muted">
          Desde <span className="font-display text-2xl text-gold-dark">{formatPrice(candyBarPrices[id])}</span>
        </p>
        <span aria-hidden="true" className="mx-auto mt-3 flex items-center gap-2">
          <span className="h-px w-6 bg-gold/60" />
          <span className="size-1.5 rotate-45 bg-gold" />
          <span className="h-px w-6 bg-gold/60" />
        </span>
        <p className="mt-3 text-sm text-ink">
          <span className="text-muted">Ideal para </span>
          {idealFor.toLowerCase()}
        </p>
        <ul className="mt-4 space-y-1.5 text-left text-sm text-ink">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" />
              {item}
            </li>
          ))}
        </ul>
        <Button to={`/servicios?candy=${id}`} className="mt-6 w-full sm:mt-auto sm:translate-y-0">
          Sumalo a tu evento <ArrowRight className="size-4" />
        </Button>
      </div>
    </motion.li>
  )
}
