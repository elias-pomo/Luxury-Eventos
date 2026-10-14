import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { eventTypes } from '../../data/events'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const AUTOPLAY_MS = 5000
const pad = (n) => String(n).padStart(2, '0')

export default function ServicesPreview() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [maxIndex, setMaxIndex] = useState(eventTypes.length - 1)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, { amount: 0.4 })

  // Distancia entre el inicio de una tarjeta y la siguiente (ancho + gap).
  const getStep = () => {
    const [first, second] = trackRef.current.children
    return second.offsetLeft - first.offsetLeft
  }

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current
    track.scrollTo({ left: index * getStep(), behavior: 'smooth' })
  }, [])

  // Sincroniza la tarjeta activa y cuántas posiciones hay según el ancho de pantalla.
  useEffect(() => {
    const track = trackRef.current
    const update = () => {
      const step = getStep()
      const gap = step - track.children[0].offsetWidth
      const visible = Math.max(1, Math.round((track.clientWidth + gap) / step))
      setMaxIndex(eventTypes.length - visible)
      setActive(Math.round(track.scrollLeft / step))
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (paused || reduceMotion || !inView) return
    const id = setInterval(() => scrollToIndex(active >= maxIndex ? 0 : active + 1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [active, maxIndex, paused, reduceMotion, inView, scrollToIndex])

  const current = Math.min(active, maxIndex)

  return (
    <section ref={sectionRef} className="bg-luxe-cream overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Servicios"
            title="Una fiesta para cada ocasión"
            subtitle="Elegí el tipo de celebración, la temática y los extras que quieras. Vas a ver el presupuesto actualizarse en tiempo real y, cuando esté listo, nos lo enviás por WhatsApp para reservar tu fecha."
            align="left"
          />

          <Reveal delay={0.2} className="hidden shrink-0 items-center gap-3 md:flex">
            <ArrowButton direction="prev" disabled={current === 0} onClick={() => scrollToIndex(current - 1)} />
            <ArrowButton direction="next" disabled={current >= maxIndex} onClick={() => scrollToIndex(current + 1)} />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onFocus={() => setPaused(true)}
            className="no-scrollbar relative mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pt-2 pb-4"
            aria-roledescription="carrusel"
            aria-label="Tipos de evento"
          >
            {eventTypes.map(({ id, name, short, icon: Icon }, i) => (
              <Link
                key={id}
                to={`/servicios?tipo=${id}`}
                aria-label={`${name}: cotizar evento`}
                className="group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-sand bg-ivory p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-soft sm:w-[calc((100%-1.5rem)/2)] sm:p-10 lg:w-[calc((100%-3rem)/3)]"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <span className="absolute top-6 right-8 font-display text-5xl text-gold/20 transition-colors duration-500 group-hover:text-gold/40">
                  {pad(i + 1)}
                </span>

                <div className="flex size-16 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <Icon className="size-7" strokeWidth={1.3} />
                </div>
                <h3 className="mt-8 text-3xl leading-tight">{name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{short}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-gold-dark uppercase">
                  Cotizar
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Indicadores */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <p className="font-display text-xl text-muted">
            <span className="text-gold-dark">{pad(current + 1)}</span> / {pad(maxIndex + 1)}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir a la posición ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-gold' : 'w-1.5 bg-gold/30 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3 md:hidden">
            <ArrowButton direction="prev" disabled={current === 0} onClick={() => scrollToIndex(current - 1)} />
            <ArrowButton direction="next" disabled={current >= maxIndex} onClick={() => scrollToIndex(current + 1)} />
          </div>
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Button to="/servicios">Armá tu evento</Button>
        </Reveal>
      </div>
    </section>
  )
}

function ArrowButton({ direction, ...props }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
      className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-30"
      {...props}
    >
      <Icon className="size-5" />
    </button>
  )
}
