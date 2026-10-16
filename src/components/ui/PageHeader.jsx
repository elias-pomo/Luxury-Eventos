import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Sparkles from './Sparkles'
import SplitText from './SplitText'

const ease = [0.22, 1, 0.36, 1]

// Encabezado de las páginas internas (Galería, Servicios, Contacto), con el mismo
// lenguaje que la portada: foto con zoom lento y parallax, destellos, título que sube
// palabra por palabra y etiqueta con rayitas que se dibujan.
export default function PageHeader({ eyebrow, title, subtitle, image }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink pt-32 pb-16 sm:min-h-[56vh]">
      {image && (
        <motion.div style={{ y: reduce ? 0 : photoY }} className="absolute -inset-y-[12%] inset-x-0">
          <motion.img
            src={image.src}
            alt=""
            loading="eager"
            style={{ objectPosition: image.position ?? 'center' }}
            initial={{ scale: reduce ? 1 : 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="size-full object-cover"
          />
        </motion.div>
      )}
      <div className={`absolute inset-0 ${image ? 'bg-linear-to-b from-ink/70 via-ink/60 to-ink/85' : 'bg-luxe-cream'}`} />
      {image && <Sparkles count={8} />}

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className={`container-page relative z-10 text-center ${image ? 'text-white' : 'text-ink'}`}
      >
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.4em] text-gold-light uppercase"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="h-px w-10 origin-right bg-gold-light"
            />
            {eyebrow}
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="h-px w-10 origin-left bg-gold-light"
            />
          </motion.span>
        )}
        <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          <SplitText text={title} delay={0.25} />
        </h1>
        {/* Rombo con filetes, firma de la casa */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mx-auto mt-5 flex w-max items-center gap-2"
        >
          <span className="h-px w-8 bg-gold/70" />
          <span className="size-1.5 rotate-45 bg-gold-light" />
          <span className="h-px w-8 bg-gold/70" />
        </motion.span>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease }}
            className={`mx-auto mt-5 max-w-xl text-sm sm:text-base ${image ? 'text-white/85' : 'text-muted'}`}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
