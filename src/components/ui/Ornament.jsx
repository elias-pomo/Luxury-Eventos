// Firma de la casa: un rombo dorado entre dos filetes. Decorativo.
// `light` para fondos oscuros; `grow` estira los filetes cuando el grupo padre (`group`) recibe hover.
export default function Ornament({ light = false, grow = false, className = '' }) {
  const line = `h-px w-6 ${light ? 'bg-gold/70' : 'bg-gold/60'} ${grow ? 'transition-all duration-500 group-hover:w-10' : ''}`
  return (
    <span aria-hidden="true" className={`mx-auto flex w-max items-center gap-2 ${className}`}>
      <span className={line} />
      <span className={`size-1.5 rotate-45 ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      <span className={line} />
    </span>
  )
}
