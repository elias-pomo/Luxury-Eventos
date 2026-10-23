import { Fragment, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, Images } from 'lucide-react'
import { candyBars, candyBarSteps } from '../../data/candybar'
import { candyBarPrices } from '../../data/pricing'
import { formatPrice } from '../../utils/format'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Lightbox from './Lightbox'
import { ease } from '../../utils/motion'
import Section from '../ui/Section'
import Ornament from '../ui/Ornament'

// Candy bar: los pasos en una línea y cada estilo como un boleto de feria (talón con la
// foto, perforación y el detalle). Todo sale de data/candybar.js y candyBarPrices.
export default function CandyBarShowcase({ id }) {
  const [lightbox, setLightbox] = useState(null) // { photos, index }

  return (
    <Section id={id} aria-labelledby={`${id}-title`} tone="light" className="scroll-mt-20 overflow-x-clip">
      <div className="container-page">
        <SectionTitle
          eyebrow="Candy bar"
          title="Una mesa dulce para cada fiesta"
          subtitle="Exclusivo del salón y armado a tono con tu temática. Elegí el tamaño y sumalo en el cotizador."
          titleId={`${id}-title`}
        />

        {/* Cómo se arma: en celular una lista corta, desde sm en una sola línea */}
        <Reveal as="ol" className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          {candyBarSteps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && <Ornament className="hidden sm:flex" />}
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base text-gold-light">
                  {i + 1}
                </span>
                <span className="font-display text-lg leading-tight text-ink">{step.title}</span>
              </li>
            </Fragment>
          ))}
        </Reveal>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-6 sm:mt-14 sm:gap-8">
          {candyBars.map((candyBar, i) => (
            <CandyTicket
              key={candyBar.id}
              candyBar={candyBar}
              index={i}
              onOpen={() =>
                setLightbox({
                  photos: candyBar.photos.map((image) => ({ image, caption: candyBar.name, label: 'Candy bar' })),
                  index: 0,
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
    </Section>
  )
}

// Boleto. En celular: talón arriba (foto + nombre y precio), perforación horizontal y el
// detalle abajo. Desde sm: foto a la izquierda, perforación vertical y todo el texto a la derecha.
// El talón va en papel crema; el sello se "estampa" al aparecer.
function CandyTicket({ candyBar, index, onOpen }) {
  const reduce = useReducedMotion()
  const { id, name, includes, photos } = candyBar
  const photo = photos[0]
  const tilt = index % 2 ? 1.2 : -1.2

  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 24, rotate: reduce ? 0 : tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={reduce ? undefined : { y: -4 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, delay: 0.05, ease }}
      className="ticket-shadow"
    >
      <div className="ticket grid grid-cols-[auto_minmax(0,1fr)] [grid-template-areas:'photo_head''perf_perf''body_body'] sm:grid-cols-[13rem_auto_minmax(0,1fr)] sm:[grid-template-areas:'photo_perf_head''photo_perf_body']">
        <div className="bg-cream/45 p-3 pr-0 [grid-area:photo] sm:pr-3">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Ver fotos del candy bar ${name}`}
            className="group relative block size-26 overflow-hidden rounded-sm bg-sand shadow-soft sm:size-full sm:min-h-64"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{ objectPosition: photo.position ?? 'center' }}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
            />
            {/* Paspartú */}
            <span aria-hidden="true" className="absolute inset-1.5 rounded-[1px] border border-white/45" />
            <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-ink/60 px-2 py-1 text-[11px] whitespace-nowrap text-white backdrop-blur-sm sm:bottom-3 sm:px-3 sm:text-xs">
              <Images className="size-3" /> {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
            </span>
          </button>
        </div>

        <div className="relative flex flex-col justify-center bg-cream/45 px-4 py-4 [grid-area:head] sm:bg-transparent sm:px-7 sm:pt-7 sm:pb-0">
          {/* Sello de boleto, estampado a mano */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 1.5, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.55, ease: [0.3, 1.4, 0.5, 1] }}
            className="absolute top-7 right-9 hidden rounded-sm border-[3px] border-double border-gold/70 px-3 py-1.5 type-label text-gold-dark sm:block"
          >
            Válido para tu fiesta
          </motion.span>
          <p className="flex items-center gap-2 type-label text-gold-dark tabular-nums">
            Candy bar
            <span aria-hidden="true" className="size-1 rotate-45 bg-gold" />
            N° {String(index + 1).padStart(3, '0')}
          </p>
          <h3 className="mt-1 text-3xl leading-none sm:text-4xl">{name}</h3>
          <p className="mt-2 text-sm text-muted">
            Desde <span className="font-display text-2xl text-gold-dark">{formatPrice(candyBarPrices[id])}</span>
          </p>
        </div>

        <span aria-hidden="true" className="ticket-perf-x [grid-area:perf] sm:ticket-perf-y" />

        <div className="px-5 pt-4 pb-5 [grid-area:body] sm:pt-5 sm:pr-12 sm:pb-7 sm:pl-7">
          <p className="flex items-center gap-3 type-label text-gold-dark">
            Incluye
            <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-gold/40 to-transparent" />
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-2 lg:space-y-0">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" />
                {item}
              </li>
            ))}
          </ul>
          <Button to={`/servicios?candy=${id}`} className="mt-6 w-full sm:w-auto">
            Sumalo a tu evento <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Leyenda impresa en el borde, como en los boletos de feria */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-3 hidden -translate-y-1/2 rotate-180 type-label whitespace-nowrap text-gold/70 [writing-mode:vertical-rl] sm:block"
        >
          Luxury Eventos · Candy bar
        </span>
      </div>
    </motion.li>
  )
}
