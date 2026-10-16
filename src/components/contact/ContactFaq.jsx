import { Plus } from 'lucide-react'
import { faqSubtitle, faqTitle, faqs } from '../../data/faq'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

// Acordeón con <details>: accesible, sin JS y sin depender del hover.
export default function ContactFaq() {
  return (
    <section id="preguntas" className="bg-luxe-cream scroll-mt-20 py-20 sm:py-28">
      <div className="container-page max-w-3xl">
        <SectionTitle eyebrow="Preguntas frecuentes" title={faqTitle} subtitle={faqSubtitle} />

        <Reveal className="mt-12 divide-y divide-sand border-y border-sand">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl text-ink sm:text-2xl">{question}</span>
                <Plus className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted sm:text-base">{answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
