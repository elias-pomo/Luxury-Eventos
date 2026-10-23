import { motion } from 'motion/react'
import { ease } from '../../utils/motion'

// Etiqueta de sección: texto en mayúsculas espaciadas con filetes dorados que se dibujan
// al aparecer. `lines`: 'both' (centrada), 'start' (alineada a la izquierda) o 'none'.
// `light` la pasa a dorado claro, para fondos oscuros.
export default function Eyebrow({ children, lines = 'both', light = false, className = '' }) {
  return (
    <span className={`flex items-center gap-3 type-eyebrow ${light ? 'text-gold-light' : 'text-gold-dark'} ${className}`}>
      {lines !== 'none' && <Line origin="origin-right" light={light} />}
      {children}
      {lines === 'both' && <Line origin="origin-left" light={light} />}
    </span>
  )
}

function Line({ origin, light }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className={`h-px w-8 ${light ? 'bg-gold-light' : 'bg-gold'} ${origin}`}
    />
  )
}
