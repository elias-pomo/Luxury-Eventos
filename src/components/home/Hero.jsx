import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { images } from '../../data/images'
import { site } from '../../config/site'
import Button from '../ui/Button'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative flex h-dvh min-h-150 items-center justify-center overflow-hidden">
      <motion.img
        src={images.hero.src}
        alt={images.hero.alt}
        style={{ objectPosition: images.hero.position }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/75 via-ink/60 to-ink/85" />

      <div className="container-page relative z-10 flex flex-col items-center text-center text-white">
        <motion.span {...fadeUp(0.2)} className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.35em] text-gold-light uppercase sm:text-xs sm:tracking-[0.5em]">
          <span className="hidden h-px w-10 bg-gold-light sm:block" />
          Salón de eventos · {site.address.city.split(',')[0]}
          <span className="hidden h-px w-10 bg-gold-light sm:block" />
        </motion.span>

        <motion.h1 {...fadeUp(0.4)} className="max-w-4xl text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
          Celebrá momentos{' '}
          <em className="text-gold-gradient font-normal drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)]">inolvidables</em>
        </motion.h1>

        <motion.p {...fadeUp(0.6)} className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Casamientos, 15 y 18 años, infantiles, bautismos y mucho más, en un salón íntimo para hasta{' '}
          {site.capacity} invitados. Elegí tu fiesta, sumá los extras que quieras y conocé el presupuesto al instante.
        </motion.p>

        <motion.div {...fadeUp(0.8)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button to="/servicios">Armá tu evento</Button>
          <Button to="/galeria" variant="light">Conocé el salón</Button>
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <ChevronDown className="size-8" />
      </motion.a>
    </section>
  )
}
