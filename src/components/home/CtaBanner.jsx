import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { images } from '../../data/images'
import { site } from '../../config/site'
import { whatsappLink } from '../../utils/whatsapp'
import { WhatsAppIcon } from '../icons/SocialIcons'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Sparkles from '../ui/Sparkles'

export default function CtaBanner() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // La foto de fondo se mueve más lento que el scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <motion.img
        src={images.table.src}
        alt=""
        loading="lazy"
        style={{ y: reduce ? 0 : y, objectPosition: images.table.position }}
        className="absolute inset-x-0 -inset-y-[14%] h-[128%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/75" />
      <Sparkles />

      <Reveal className="container-page relative z-10 flex flex-col items-center text-center text-white">
        <span className="mb-5 text-xs tracking-[0.4em] text-gold-light uppercase">Reservá tu fecha</span>
        <h2 className="max-w-3xl text-4xl leading-tight sm:text-6xl">
          ¿Tenés una fecha en mente? <em className="text-gold-shimmer">Hagámosla realidad</em>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Armá tu presupuesto online en pocos minutos o escribinos para consultar disponibilidad y coordinar una
          visita al salón. Te respondemos todos los días.
        </p>
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.2em] text-gold-light uppercase sm:flex-row sm:gap-10">
          {Object.values(site.shiftSchedules).map(({ label, shifts }) => (
            <p key={label}>
              <span className="block text-[10px] tracking-[0.25em] text-white/60">{label}</span>
              <span className="mt-1 block">{shifts.map((s) => s.time).join(' · ')}</span>
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button to="/servicios">Cotizá online</Button>
          <Button href={whatsappLink(`¡Hola ${site.name}! Quisiera consultar disponibilidad de fecha.`)} variant="light">
            <WhatsAppIcon className="size-4" /> Escribinos
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
