import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { images } from '../../data/images'
import { site } from '../../config/site'
import Button from '../ui/Button'
import Sparkles from '../ui/Sparkles'
import SplitText from '../ui/SplitText'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
})

// Fotos que se van alternando en la portada (cada una con su zoom lento).
const slides = [images.hero, images.table, images.balloons, images.ballroom]
const SLIDE_MS = 6500

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  // Parallax: la foto baja más lento que el scroll y el texto se desvanece al irse.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [reduce])

  const slide = slides[index]

  return (
    <section ref={ref} className="relative flex h-dvh min-h-150 items-center justify-center overflow-hidden bg-ink">
      <motion.div style={{ y: reduce ? 0 : photoY }} className="absolute -inset-y-[16%] inset-x-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            style={{ objectPosition: slide.position }}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.18 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, transition: { duration: 1.8 } }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: SLIDE_MS / 1000 + 2, ease: 'easeOut' } }}
            className="absolute inset-0 size-full object-cover"
            fetchPriority={index === 0 ? 'high' : undefined}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-ink/75 via-ink/55 to-ink/85" />
      <Sparkles />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className="container-page relative z-10 flex flex-col items-center text-center text-white"
      >
        <motion.span {...fadeUp(0.2)} className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.35em] text-gold-light uppercase sm:text-xs sm:tracking-[0.5em]">
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-px w-12 origin-right bg-gold-light sm:block"
          />
          Salón de eventos · {site.address.city.split(',')[0]}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-px w-12 origin-left bg-gold-light sm:block"
          />
        </motion.span>

        <h1 className="max-w-4xl text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
          <SplitText text="Celebrá momentos" delay={0.35} />
          <br />
          <SplitText text="inolvidables" delay={0.75} wordClassName="text-gold-shimmer font-normal italic" />
        </h1>

        <motion.p {...fadeUp(1.1)} className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Casamientos, 15 y 18 años, infantiles, bautismos y mucho más, en un salón íntimo para hasta{' '}
          {site.capacity} invitados. Elegí tu fiesta, sumá los extras que quieras y conocé el presupuesto al instante.
        </motion.p>

        <motion.div {...fadeUp(1.3)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button to="/servicios">Armá tu evento</Button>
          <Button to="/galeria" variant="light">Conocé el salón</Button>
        </motion.div>
      </motion.div>

      {/* Indicador de fotos: cada raya se llena mientras dura su foto */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-10 sm:left-12 sm:translate-x-0" aria-hidden="true">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            tabIndex={-1}
            onClick={() => setIndex(i)}
            className="relative h-0.5 w-8 overflow-hidden rounded-full bg-white/30"
          >
            {i === index && (
              <motion.span
                key={`${index}-bar`}
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                className="absolute inset-0 origin-left bg-gold-light"
              />
            )}
            {i < index && <span className="absolute inset-0 bg-gold-light/70" />}
          </button>
        ))}
      </div>

      <motion.a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.8 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <ChevronDown className="size-8" />
      </motion.a>
    </section>
  )
}
