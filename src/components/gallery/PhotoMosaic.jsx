import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Expand } from 'lucide-react'
import Photo from '../ui/Photo'

// Proporciones que se van alternando para que las fotos no queden en cuadrícula.
const ratios = ['aspect-3/4', 'aspect-4/3', 'aspect-4/5', 'aspect-square', 'aspect-5/4', 'aspect-3/4']
const ease = [0.22, 1, 0.36, 1]

// Mosaico de dos columnas con alturas distintas. Las columnas se desplazan a
// distinta velocidad con el scroll (parallax) y cada foto aparece con un
// efecto de cortina. `onOpen(index)` abre el visor.
export default function PhotoMosaic({ photos, onOpen }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // En celular el desfase es menor: las columnas son angostas y el movimiento se nota más.
  const [mobile] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const shift = reduce ? 0 : mobile ? 0.5 : 1
  const yLeft = useTransform(scrollYProgress, [0, 1], [20 * shift, -20 * shift])
  const yRight = useTransform(scrollYProgress, [0, 1], [90 * shift, -40 * shift])

  const single = photos.length === 1
  const columns = single ? [0] : [0, 1]

  return (
    <div ref={ref} className={`grid gap-2.5 sm:gap-5 ${single ? '' : 'grid-cols-2 pb-8 sm:pb-12'}`}>
      {columns.map((column) => (
        <motion.ul key={column} style={{ y: column ? yRight : yLeft }} className="flex flex-col gap-2.5 sm:gap-5">
          {photos.map(
            (photo, i) =>
              i % columns.length === column && (
                <MosaicItem
                  key={`${photo.event}-${photo.caption}`}
                  photo={photo}
                  ratio={single ? 'aspect-4/3' : ratios[i % ratios.length]}
                  delay={Math.min(i, 6) * 0.08}
                  reduce={reduce}
                  onOpen={() => onOpen(i)}
                />
              ),
          )}
        </motion.ul>
      ))}
    </div>
  )
}

function MosaicItem({ photo, ratio, delay, reduce, onOpen }) {
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 1.1, delay, ease }}
      className={ratio}
    >
      <button
        onClick={onOpen}
        aria-label={`Ampliar foto: ${photo.caption} (${photo.label})`}
        className="group relative block size-full overflow-hidden rounded-sm transition-transform duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <motion.div
          initial={{ scale: reduce ? 1 : 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay, ease }}
          className="size-full"
        >
          <Photo
            image={photo.image}
            className="size-full transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Marco dorado que aparece al pasar el mouse */}
        <span className="pointer-events-none absolute inset-3 border border-gold-light/0 transition-all duration-500 group-hover:inset-4 group-hover:border-gold-light/70" />

        <span className="absolute inset-0 flex flex-col items-start justify-end bg-linear-to-t from-ink/75 via-ink/5 to-transparent p-3 text-left transition-colors duration-500 group-hover:from-ink/85 sm:p-6">
          <span className="text-[9px] tracking-[0.25em] text-gold-light uppercase sm:text-[10px] sm:tracking-[0.3em]">{photo.label}</span>
          <span className="mt-0.5 line-clamp-2 font-display text-base leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1 sm:mt-1 sm:text-2xl">
            {photo.caption}
          </span>
        </span>
        <Expand className="absolute top-4 right-4 hidden size-4 text-white opacity-0 transition-opacity sm:block duration-500 group-hover:opacity-100" />
      </button>
    </motion.li>
  )
}
