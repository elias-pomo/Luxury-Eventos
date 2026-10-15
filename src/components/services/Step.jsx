import Reveal from '../ui/Reveal'

// Paso numerado del cotizador.
export default function Step({ number, title, subtitle, children }) {
  return (
    <Reveal as="section" aria-labelledby={`paso-${number}`} className="border-t border-sand pt-10 first:border-t-0 first:pt-0">
      <header className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold font-display text-2xl text-gold-dark">
          {number}
        </span>
        <div>
          <h2 id={`paso-${number}`} className="scroll-mt-36 text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-muted">{subtitle}</p>}
        </div>
      </header>
      <div className="mt-6">{children}</div>
    </Reveal>
  )
}
