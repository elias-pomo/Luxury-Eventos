import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { badgeLabels, highlights, highlightsIntro, highlightsNote } from '../../data/highlights'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const ease = [0.22, 1, 0.36, 1]
const AUTOPLAY_S = 5

const badgeStyles = {
  included: 'bg-gold/20 text-gold-light',
  required: 'bg-gold text-ink',
  optional: 'border border-gold/60 text-gold-light',
  kids: 'bg-white/10 text-gold-light',
}

// Lo que tiene el salón, compacto: una grilla de íconos (3 columnas también en celular)
// y un panel que muestra el detalle del elegido. Avanza solo mientras está a la vista
// hasta que la persona toca uno; con "reducir movimiento" no avanza.
export default function Highlights() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = useReducedMotion()
  const running = auto && inView && !reduce

  const item = highlights[active]
  const Icon = item.icon

  const choose = (i) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <section className="bg-luxe-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionTitle eyebrow="El salón" title="Todo lo que tu evento necesita" subtitle={highlightsIntro} />

        <div ref={ref} className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* Grilla de íconos */}
          <Reveal className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {highlights.map(({ icon: TileIcon, title }, i) => {
              const on = i === active
              return (
                <motion.button
                  key={title}
                  type="button"
                  aria-pressed={on}
                  aria-controls="highlight-panel"
                  onClick={() => choose(i)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex min-h-26 flex-col items-center justify-center gap-2 card-luxe card-luxe-sm px-1.5 py-3 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:min-h-32 sm:gap-3 ${
                    on ? 'border-gold! text-white [--cc:#fff]' : 'text-ink'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="highlight-tile"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-[1px] bg-gold shadow-gold"
                    />
                  )}
                  <motion.span
                    animate={on && !reduce ? { y: [0, -5, 0], rotate: [0, -8, 0] } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <TileIcon className={`size-6 sm:size-7 ${on ? 'text-white' : 'text-gold-dark'}`} strokeWidth={1.5} />
                  </motion.span>
                  <span className="relative text-[11.5px] leading-tight font-medium sm:text-sm">{title}</span>
                </motion.button>
              )
            })}
          </Reveal>

          {/* Panel con el detalle */}
          <Reveal delay={0.1}>
            <div
              id="highlight-panel"
              aria-live="polite"
              className="card-luxe card-luxe-dark relative flex h-full min-h-80 flex-col overflow-hidden p-6 text-white sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative flex flex-1 flex-col"
                >
                  {/* Ícono grande de fondo, decorativo */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: -12, scale: 1 }}
                    transition={{ duration: 0.7, ease }}
                    className="pointer-events-none absolute -top-4 -right-6 text-gold/10"
                  >
                    <Icon className="size-36 sm:size-44" strokeWidth={1} />
                  </motion.span>

                  <div className="flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-light">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase ${badgeStyles[item.badge]}`}
                    >
                      {badgeLabels[item.badge]}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-3xl text-white sm:text-4xl">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{item.text}</p>
                  {item.badge === 'required' && (
                    <p className="relative mt-3 text-xs leading-relaxed text-gold-light/90">{highlightsNote}</p>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="relative mt-6 font-display text-lg text-white/50">
                <span className="text-gold-light">{active + 1}</span> / {highlights.length}
              </p>

              {/* Hilo que se llena mientras dura cada uno (solo en avance automático) */}
              {running && (
                <motion.span
                  key={active}
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_S, ease: 'linear' }}
                  onAnimationComplete={() => setActive((i) => (i + 1) % highlights.length)}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold-light"
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
