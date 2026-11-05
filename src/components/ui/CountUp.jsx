import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { ease } from '../../utils/motion'

// Cuenta desde 0 hasta el número de `value` al entrar en pantalla, respetando
// lo que tenga antes y después (ej: '+130', '100%').
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  // Margen solo abajo: uno negativo en los costados deja afuera a los números
  // angostos pegados al borde en celular y nunca arrancan.
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const [, prefix = '', number = '', suffix = ''] = String(value).match(/^(\D*)(\d+)(.*)$/) ?? []
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || !number || reduce) return
    const controls = animate(0, Number(number), {
      duration: 1.6,
      ease: ease,
      onUpdate: (n) => setCurrent(Math.round(n)),
    })
    return () => controls.stop()
  }, [inView, number, reduce])

  return (
    <span ref={ref} className={className}>
      {number && !reduce ? `${prefix}${current}${suffix}` : value}
    </span>
  )
}
