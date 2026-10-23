import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { ease } from '../../utils/motion'

const MAX_SLOTS = 5
const STEP_MS = 1700 // cada cuánto cambia un lugar (van de a uno, en secuencia)

// Disposición según cuántos lugares hay (1 a 5). El primero siempre es la foto grande.
// Celular: 2 columnas · escritorio: 4. Las filas tienen alto fijo, así que nunca se alarga.
const layouts = {
  1: ['col-span-2 row-span-3 lg:col-span-4 lg:row-span-3'],
  2: ['col-span-2 row-span-2 lg:col-span-4', 'col-span-2 row-span-2 lg:col-span-4'],
  3: ['col-span-2 row-span-2 lg:col-span-4', 'row-span-2 lg:col-span-2', 'row-span-2 lg:col-span-2'],
  4: ['col-span-2 row-span-2 lg:col-span-4', 'row-span-2 lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'],
  5: ['col-span-2 row-span-2 lg:col-span-4', 'row-span-2 lg:col-span-2', '', '', 'col-span-2'],
}

// Reparte las fotos entre los lugares por turnos: la 1.ª a la grande, la 2.ª al lugar 2…
// Cada lugar guarda los índices (en `photos`) de las fotos que va a rotar.
const splitIntoSlots = (count) => {
  const slots = Array.from({ length: Math.min(MAX_SLOTS, count) }, () => [])
  for (let i = 0; i < count; i++) slots[i % slots.length].push(i)
  return slots
}

// Mosaico con pocos lugares fijos (una foto grande y hasta cuatro abajo); cada lugar es un
// minicarrusel con las fotos que le tocan. Cambia un lugar por vez mientras está a la vista.
// Tocar abre el visor (`onOpen(index)`). El padre le pasa una `key` por filtro.
export default function EventMosaic({ photos, showLabel, paused: externalPause, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  const [rotation, setRotation] = useState({ step: 0, positions: [] })

  const slots = splitIntoSlots(photos.length)
  const sizes = layouts[slots.length]
  const rotating = slots.map((s, i) => (s.length > 1 ? i : -1)).filter((i) => i >= 0)
  const canRotate = !reduce && rotating.length > 0
  const running = canRotate && inView && !userPaused && !externalPause

  // `slots` y `rotating` no cambian mientras vive el mosaico (se remonta con cada filtro).
  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setRotation(({ step, positions }) => {
        const slot = rotating[step % rotating.length]
        const next = [...positions]
        next[slot] = ((next[slot] ?? 0) + 1) % slots[slot].length
        return { step: step + 1, positions: next }
      })
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [running, rotating.length])

  return (
    <div ref={ref}>
      <ul className="grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[12rem] sm:gap-3 lg:auto-rows-[10.5rem] lg:grid-cols-4">
        {slots.map((slot, s) => {
          const position = rotation.positions[s] ?? 0
          const index = slot[position]
          return (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: s * 0.08, ease }}
              className={sizes[s]}
            >
              <MosaicSlot
                photo={photos[index]}
                big={s === 0}
                position={position}
                total={slot.length}
                showLabel={showLabel}
                reduce={reduce}
                onOpen={() => onOpen(index)}
              />
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 type-label text-muted">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
          {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
        </p>
        {canRotate && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className="flex min-h-11 items-center gap-2 rounded-full border border-gold/40 bg-white px-4 type-label text-ink transition-colors hover:border-gold hover:bg-gold/10"
          >
            {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {userPaused ? 'Reanudar' : 'Pausar'}
          </button>
        )}
      </div>
    </div>
  )
}

function MosaicSlot({ photo, big, position, total, showLabel, reduce, onOpen }) {
  const Icon = photo.icon
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver en grande: ${photo.caption}`}
      className="group relative block size-full overflow-hidden rounded-sm bg-ink ring-1 ring-gold/30"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={photo.image.src}
          src={photo.image.src}
          alt={photo.image.alt}
          style={{ objectPosition: photo.image.position ?? 'center' }}
          initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9, ease }, scale: { duration: 7, ease: 'easeOut' } }}
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
      </AnimatePresence>
      <span className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/5 to-ink/20" />

      {/* Paspartú: filete claro y esquineros dorados */}
      <span aria-hidden="true" className={`pointer-events-none absolute border border-white/30 ${big ? 'inset-3 sm:inset-4' : 'inset-2'}`}>
        <Corners big={big} />
      </span>

      {/* Insignia con el ícono del evento */}
      {Icon && (
        <span
          aria-hidden="true"
          className={`absolute flex items-center justify-center rounded-full border border-gold-light/60 bg-ink/45 text-gold-light backdrop-blur-sm ${
            big ? 'top-6 left-6 size-10 sm:top-7 sm:left-7' : 'top-4 left-4 size-8'
          }`}
        >
          <Icon className={big ? 'size-5' : 'size-4'} strokeWidth={1.5} />
        </span>
      )}

      <span className={`absolute inset-x-0 bottom-0 text-left ${big ? 'p-6 sm:p-8' : 'p-4'}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={photo.image.src}
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4 }}
            transition={{ duration: 0.4, ease }}
            className="block"
          >
            {showLabel && <span className="block type-label text-gold-light">{photo.label}</span>}
            <span className={`mt-0.5 line-clamp-2 block font-display leading-tight text-white ${big ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
              {photo.caption}
            </span>
          </motion.span>
        </AnimatePresence>
        {total > 1 && (
          <span aria-hidden="true" className="mt-2 flex items-center gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === position ? 'w-4 bg-gold-light' : 'w-1 bg-white/50'}`}
              />
            ))}
            {big && (
              <span className="ml-2 font-display text-sm text-white/80 tabular-nums">
                {String(position + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            )}
          </span>
        )}
      </span>
    </button>
  )
}

// Esquineros dorados en L, por dentro del filete.
function Corners({ big }) {
  const size = big ? 'size-5 sm:size-6' : 'size-3'
  const line = 'absolute border-gold-light'
  return (
    <>
      <span className={`${line} ${size} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${line} ${size} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${line} ${size} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${line} ${size} -right-px -bottom-px border-r-2 border-b-2`} />
    </>
  )
}
