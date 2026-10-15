import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Check, Images } from 'lucide-react'
import { candyBars, candyBarSteps } from '../../data/candybar'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Lightbox from './Lightbox'

const pad = (n) => String(n).padStart(2, '0')

// Sección de la Galería con los tipos de candy bar: pasos de cómo se arma y
// una fila en zigzag por cada diseño, con collage de fotos y visor.
export default function CandyBarSection({ id }) {
  const [viewer, setViewer] = useState({ photos: [], index: null })

  const openViewer = (candyBar, index = 0) =>
    setViewer({
      photos: candyBar.photos.map((image) => ({ image, label: 'Candy bar', caption: candyBar.name })),
      index,
    })

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-luxe-cream scroll-mt-(--scroll-offset,7rem) overflow-clip py-24 sm:py-32">
      <div className="container-page">
        <SectionTitle
          eyebrow="Candy bar"
          title="Una mesa dulce para cada estilo"
          subtitle="El candy bar es uno de los rincones más lindos de la fiesta: suma color, acompaña la temática y es el lugar preferido para las fotos. Elegí el diseño que mejor vaya con tu celebración."
          titleId={`${id}-title`}
        />

        {/* Celular: lista vertical con el número al costado. Desde sm: tres columnas. */}
        <ol className="relative mx-auto mt-12 grid max-w-4xl gap-6 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {/* Línea que une los pasos (pasa por detrás de los círculos) */}
          <span aria-hidden className="absolute inset-y-6 left-6 w-px bg-gold/30 sm:inset-x-[16.6%] sm:inset-y-auto sm:top-6 sm:h-px sm:w-auto" />
          {candyBarSteps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.12} className="relative flex items-start gap-5 sm:block sm:text-center">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-gold-dark sm:mx-auto">
                {pad(i + 1)}
              </span>
              <div className="pt-1 sm:pt-0">
                <h3 className="text-xl sm:mt-4">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted sm:mx-auto sm:mt-2 sm:max-w-60">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 space-y-24 sm:mt-32 sm:space-y-36">
          {candyBars.map((candyBar, i) => (
            <CandyBarRow key={candyBar.id} candyBar={candyBar} index={i} onOpen={(photo) => openViewer(candyBar, photo)} />
          ))}
        </div>
      </div>

      <Lightbox
        photos={viewer.photos}
        index={viewer.index}
        onClose={() => setViewer((v) => ({ ...v, index: null }))}
        onChange={(index) => setViewer((v) => ({ ...v, index }))}
      />
    </section>
  )
}

function CandyBarRow({ candyBar, index, onOpen }) {
  const reversed = index % 2 === 1

  return (
    <article className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
      <div className={reversed ? 'lg:order-2' : ''}>
        <Collage candyBar={candyBar} reversed={reversed} onOpen={onOpen} />
      </div>

      <Reveal delay={0.1}>
        <span className="font-display text-5xl leading-none text-gold-gradient sm:text-7xl">{pad(index + 1)}</span>
        <span className="mt-4 block text-[11px] tracking-[0.35em] text-gold-dark uppercase">Candy bar</span>
        <h3 className="mt-2 text-4xl sm:text-5xl">{candyBar.name}</h3>
        <span className="mt-5 block h-px w-16 bg-gold" />
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{candyBar.description}</p>

        <p className="mt-6 text-sm text-ink">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-gold-dark uppercase">Ideal para · </span>
          {candyBar.idealFor}
        </p>

        <ul className="mt-6 space-y-3 border-t border-sand pt-6">
          {candyBar.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
          <Button to={`/servicios?candy=${candyBar.id}`}>
            Sumalo a tu evento <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" onClick={() => onOpen(0)}>
            <Images className="size-4" /> Ver fotos
          </Button>
        </div>
      </Reveal>
    </article>
  )
}

// Foto principal con marco dorado desfasado y una segunda foto superpuesta;
// cada capa se mueve a distinta velocidad con el scroll.
function Collage({ candyBar, reversed, onOpen }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yMain = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30])
  const ySecond = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -70])
  const [main, second] = candyBar.photos

  return (
    <div ref={ref} className={`relative pb-16 ${reversed ? 'pl-[18%]' : 'pr-[18%]'}`}>
      <motion.div style={{ y: yMain }} className="relative">
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-5 border border-gold/50 ${reversed ? '-translate-x-5' : 'translate-x-5'}`}
        />
        <Reveal y={0}>
          <PhotoButton image={main} label={`Ver fotos del candy bar ${candyBar.name}`} onClick={() => onOpen(0)} className="aspect-4/5" />
        </Reveal>
      </motion.div>

      {second && (
        <motion.div
          style={{ y: ySecond }}
          className={`absolute bottom-0 w-[46%] ${reversed ? 'left-0 -rotate-3' : 'right-0 rotate-3'}`}
        >
          <Reveal delay={0.25} y={40}>
            <PhotoButton
              image={second}
              label={`Ver segunda foto del candy bar ${candyBar.name}`}
              onClick={() => onOpen(1)}
              className="aspect-square border-6 border-ivory shadow-soft"
            />
          </Reveal>
        </motion.div>
      )}
    </div>
  )
}

function PhotoButton({ image, label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group relative block w-full overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <Photo image={image} className="size-full transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
    </button>
  )
}
