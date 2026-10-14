import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Visor de fotos a pantalla completa. `photos`: [{ image, caption, label }].
// `index` null = cerrado. Se monta en <body> para que ningún ancestro con
// transform (Reveal, motion) rompa el position: fixed.
export default function Lightbox({ photos, index, onClose, onChange }) {
  const open = index !== null
  const closeRef = useRef(null)

  const go = useCallback(
    (step) => onChange((index + step + photos.length) % photos.length),
    [index, photos.length, onChange],
  )

  // Al abrir: bloquea el scroll y lleva el foco al visor. Al cerrar: lo devuelve
  // a la foto que lo abrió.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  const photo = open ? photos[index] : null
  const multiple = photos.length > 1

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-4 py-4 text-white/70 sm:px-8">
            <span className="text-xs tracking-[0.3em] uppercase">
              {index + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Cerrar visor"
              className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={index}
                src={photo.image.src}
                alt={photo.image.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                drag={multiple ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, { offset }) => {
                  if (offset.x < -60) go(1)
                  else if (offset.x > 60) go(-1)
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full rounded-sm object-contain select-none"
                draggable={false}
              />
            </AnimatePresence>

            {multiple && (
              <>
                <NavButton side="left" onClick={() => go(-1)} label="Foto anterior" />
                <NavButton side="right" onClick={() => go(1)} label="Foto siguiente" />
              </>
            )}
          </div>

          {/* En celular las flechas van abajo, al alcance del pulgar (también se puede deslizar). */}
          <div
            className="flex items-center gap-3 px-4 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {multiple && <MobileNavButton onClick={() => go(-1)} label="Foto anterior" icon={ChevronLeft} />}
            <div className="min-w-0 flex-1 text-center sm:flex-none">
              {photo.label && <p className="text-[11px] tracking-[0.3em] text-gold-light uppercase">{photo.label}</p>}
              {photo.caption && <p className="mt-2 font-display text-xl text-white sm:text-2xl">{photo.caption}</p>}
            </div>
            {multiple && <MobileNavButton onClick={() => go(1)} label="Foto siguiente" icon={ChevronRight} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function MobileNavButton({ onClick, label, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 active:bg-gold active:text-white sm:hidden"
    >
      <Icon className="size-6" />
    </button>
  )
}

function NavButton({ side, onClick, label }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={label}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-white sm:flex ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      <Icon className="size-6" />
    </button>
  )
}
