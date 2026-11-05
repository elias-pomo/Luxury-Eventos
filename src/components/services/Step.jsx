import Reveal from '../ui/Reveal'

// Paso numerado del cotizador.
export default function Step({ number, title, subtitle, children }) {
  return (
    <Reveal as="section" aria-labelledby={`paso-${number}`} className="border-t border-gold/25 pt-10 first:border-t-0 first:pt-0">
      <header className="flex items-start gap-4">
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-2xl text-gold-light shadow-soft">
          <span aria-hidden="true" className="absolute -inset-1.5 rounded-full border border-dashed border-gold/60" />
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
