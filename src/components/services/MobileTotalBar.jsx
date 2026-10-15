import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import AnimatedPrice from '../ui/AnimatedPrice'

// Barra fija abajo (solo celular) con el total mientras se arma el evento.
// Lleva al resumen; se oculta cuando el resumen ya está en pantalla o quedó arriba.
export default function MobileTotalBar({ total, visible, onView }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-ink shadow-[0_-10px_30px_-12px_rgb(31_27_22/0.2)] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] whitespace-nowrap text-muted uppercase">Total estimado</p>
              <AnimatedPrice value={total} className="font-display text-[1.75rem] leading-tight whitespace-nowrap text-gold-gradient" />
            </div>
            <button
              type="button"
              onClick={onView}
              className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full bg-gold px-4 text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap text-white uppercase shadow-gold"
            >
              Ver presupuesto <ChevronDown className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
