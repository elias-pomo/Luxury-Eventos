import { Gem } from 'lucide-react'

// Franja de texto que corre sin parar. La lista se duplica para que el bucle no tenga salto
// (la animación recorre exactamente la mitad). Se frena al pasar el mouse.
export default function Marquee({ items, time = 45, className = '' }) {
  const row = (suffix) =>
    items.map((item) => (
      <li key={`${item}-${suffix}`} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
        <span className="font-display text-3xl whitespace-nowrap italic sm:text-5xl">{item}</span>
        <Gem aria-hidden="true" className="size-4 shrink-0 text-gold sm:size-5" strokeWidth={1.4} />
      </li>
    ))

  return (
    <div className={`group overflow-hidden ${className}`} aria-label={items.join(', ')} role="group">
      <ul
        aria-hidden="true"
        className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={{ '--marquee-time': `${time}s` }}
      >
        {row('a')}
        {row('b')}
      </ul>
    </div>
  )
}
