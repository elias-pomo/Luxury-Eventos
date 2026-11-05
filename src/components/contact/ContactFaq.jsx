import { Plus } from 'lucide-react'
import { faqSubtitle, faqTitle, faqs } from '../../data/faq'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Section from '../ui/Section'
import Card from '../ui/Card'

// Acordeón con <details>: accesible, sin JS y sin depender del hover.
export default function ContactFaq() {
  return (
    <Section id="preguntas" tone="cream" className="scroll-mt-20">
      <div className="container-page max-w-3xl">
        <SectionTitle eyebrow="Preguntas frecuentes" title={faqTitle} subtitle={faqSubtitle} />

        <Reveal className="mt-12 space-y-3">
          {faqs.map(({ question, answer }) => (
            <Card as="details" key={question} size="sm" className="group px-5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl text-ink sm:text-2xl">{question}</span>
                <Plus className="size-5 shrink-0 text-gold-dark transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted sm:text-base">{answer}</p>
            </Card>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
