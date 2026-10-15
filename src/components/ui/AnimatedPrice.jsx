import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import { formatPrice } from '../../utils/format'

// Precio que se desliza hasta el nuevo valor cuando cambia. El valor final se
// anuncia a lectores de pantalla una sola vez (no en cada cuadro de la animación).
export default function AnimatedPrice({ value, className = '' }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(value)
  const current = useRef(value)

  useEffect(() => {
    if (reduce) {
      current.current = value
      setShown(value)
      return
    }
    const controls = animate(current.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        current.current = n
        setShown(n)
      },
    })
    return () => controls.stop()
  }, [value, reduce])

  return (
    <span className={className}>
      <span aria-hidden="true">{formatPrice(Math.round(shown))}</span>
      <span className="sr-only" aria-live="polite">
        {formatPrice(value)}
      </span>
    </span>
  )
}
