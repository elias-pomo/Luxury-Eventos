import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { images } from '../../data/images'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const preview = [
  { image: images.ballroom, label: 'Mesas de gala', className: 'col-span-2 sm:row-span-2', shift: 10 },
  { image: images.table, label: 'Noches mágicas', shift: 16 },
  { image: images.party, label: 'Centros de mesa', shift: 8 },
  { image: images.balloons, label: 'Luces de colores', shift: 14 },
  { image: images.toast, label: 'Eventos de día', shift: 9 },
]

const ease = [0.22, 1, 0.36, 1]

export default function GalleryPreview() {
  return (
    <section className="bg-luxe-dark py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Galería"
            title="Momentos que ya vivimos"
            subtitle="Cada evento es único. Mirá cómo se transforma el salón con distintas ambientaciones, desde una tarde luminosa hasta una noche llena de luces."
            align="left"
            light
          />
          <Reveal delay={0.2} className="hidden shrink-0 md:block">
            <Button to="/galeria" variant="light">
              Ver galería <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-40 grid-cols-2 gap-3 sm:auto-rows-60 sm:grid-cols-4 sm:gap-4">
          {preview.map((tile, i) => (
            <Tile key={tile.label} {...tile} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button to="/galeria" variant="light">
            Ver galería <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// Cada foto se revela como una cortina y se mueve a su propio ritmo al hacer scroll.
function Tile({ image, label, className = '', shift, index }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`])

  return (
    <motion.figure
      ref={ref}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      // Margen solo abajo: uno negativo en los costados deja sin revelar lo que está pegado al borde.
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 1.1, delay: (index % 3) * 0.12, ease }}
      className={`group relative overflow-hidden rounded-sm ${className}`}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={{ y: reduce ? 0 : y, objectPosition: image.position ?? 'center' }}
        className="absolute inset-x-0 -inset-y-[18%] h-[136%] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <figcaption className="absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-transparent to-transparent p-4 sm:p-6">
        <span className="translate-y-1 font-display text-xl text-white transition-transform duration-500 group-hover:translate-y-0 sm:text-2xl">
          {label}
        </span>
      </figcaption>
    </motion.figure>
  )
}
