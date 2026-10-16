import { Gem } from 'lucide-react'

// Sello circular con texto que gira lentamente (detalle de papelería de lujo).
// Quien lo usa le da la posición (absolute/relative) en `className`.
export default function RotatingSeal({ text, className = '' }) {
  const id = 'seal-circle'
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 120 120" className="animate-spin-slow size-full">
        <defs>
          <path id={id} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text className="fill-gold-dark font-sans" fontSize="8.6" letterSpacing="2.8" fontWeight="500">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <Gem className="size-1/4 text-gold" strokeWidth={1.2} />
      </span>
    </div>
  )
}
