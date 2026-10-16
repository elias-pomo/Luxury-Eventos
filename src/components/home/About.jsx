import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { site } from '../../config/site'
import { images } from '../../data/images'
import CountUp from '../ui/CountUp'
import Reveal from '../ui/Reveal'
import RotatingSeal from '../ui/RotatingSeal'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // Parallax interno: la foto se desplaza dentro del arco mientras se baja.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <section id="nosotros" className="bg-luxe scroll-mt-20 py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-[calc(100%-2rem)] max-w-md sm:w-full lg:max-w-none">
          {/* Marco concéntrico: misma separación en todos los lados para que los arcos queden paralelos */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -inset-3 rounded-t-full border border-gold sm:-inset-4"
          />
          <div ref={ref} className="relative aspect-4/5 w-full overflow-hidden rounded-t-full shadow-soft">
            <motion.img
              src={images.owner.src}
              alt={images.owner.alt}
              loading="lazy"
              style={{ y: reduce ? 0 : y, objectPosition: images.owner.position }}
              className="absolute inset-x-0 -inset-y-[10%] h-[120%] w-full object-cover"
            />
          </div>
          <RotatingSeal
            text="LUXURY EVENTOS ✦ EL COLMENAR ✦ "
            className="absolute -top-8 -left-3 size-28 rounded-full bg-ivory shadow-soft sm:-top-10 sm:-left-6 sm:size-36"
          />
          <div className="card-luxe card-luxe-sm absolute -right-2 -bottom-6 px-6 py-5 sm:-right-8">
            <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Atención personalizada</p>
            <p className="mt-1 font-display text-2xl text-gold-dark italic">{site.owner}</p>
          </div>
        </Reveal>

        <div>
          <SectionTitle eyebrow="Nosotros" title={`Bienvenidos a ${site.name}`} align="left" />
          <Reveal delay={0.1} className="space-y-4 leading-relaxed text-muted">
            <p className="mt-6">{site.description}</p>
            <p>
              Hace más de 5 años que acompañamos a familias de Tucumán en sus días más importantes. Desde la
              primera consulta hasta el último baile, {site.owner.split(' ')[0]} y su equipo están presentes para
              que todo salga tal como lo imaginaste.
            </p>
            <p>
              Tenemos sonido JBL, cocina completa con asador, patio para fumadores y, para los más chicos, pelotero y
              metegol. Podés sumar DJ, candy bar y la decoración temática que imagines para armar una fiesta a tu
              medida, en turno mediodía o tarde.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/25 pt-10 sm:grid-cols-4">
            {site.stats.map(({ value, label }) => (
              <div key={label}>
                <CountUp value={value} className="font-display text-5xl text-gold-gradient" />
                <p className="mt-1 text-[11px] tracking-[0.15em] text-muted uppercase">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
