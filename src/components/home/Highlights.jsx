import { badgeLabels, highlights } from '../../data/highlights'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const badgeStyles = {
  included: 'bg-gold/15 text-gold-dark',
  required: 'bg-ink text-gold-light',
  optional: 'border border-gold/50 text-gold-dark',
}

export default function Highlights() {
  return (
    <section className="bg-luxe-cream py-24 sm:py-32">
      <div className="container-page">
        <SectionTitle
          eyebrow="El salón"
          title="Todo lo que tu evento necesita"
          subtitle="El salón ya viene equipado con sonido, luces y climatización. A eso le sumás el servicio de mozos y, si querés, DJ y candy bar para armar la fiesta a tu medida."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text, badge }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1}>
              <article className="group relative h-full rounded-sm border border-sand bg-ivory p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-soft">
                <span
                  className={`absolute top-8 right-8 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase ${badgeStyles[badge]}`}
                >
                  {badgeLabels[badge]}
                </span>
                <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-xs text-muted">
            <span className="font-semibold text-ink">Obligatorio:</span> el servicio de mozos (uno cada 30 invitados) y
            el ayudante de cocina se cotizan aparte y se incluyen en todos los eventos.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
