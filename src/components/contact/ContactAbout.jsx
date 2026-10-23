import { site } from '../../config/site'
import { contactAbout } from '../../data/contact'
import { images } from '../../data/images'
import CountUp from '../ui/CountUp'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import Section from '../ui/Section'
import Card from '../ui/Card'

export default function ContactAbout() {
  return (
    <Section id="nosotros" tone="light" art className="scroll-mt-20">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <Reveal className="relative mx-auto w-[calc(100%-4rem)] max-w-xs sm:max-w-sm">
          <div className="absolute -inset-3 rounded-t-full border border-gold" />
          <Photo image={images.owner} className="relative aspect-4/5 w-full rounded-t-full shadow-soft" />
          <Card size="sm" position="absolute" className="-bottom-5 -left-6 px-5 py-4">
            <p className="type-label text-muted">Te atiende</p>
            <p className="mt-0.5 font-display text-xl text-gold-dark italic">{site.owner}</p>
          </Card>
        </Reveal>

        <div>
          <SectionTitle eyebrow="Nosotros" title={contactAbout.title} align="left" />
          <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-muted">
            {contactAbout.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/25 pt-8 sm:grid-cols-4">
            {site.stats.map(({ value, label }) => (
              <div key={label}>
                <CountUp value={value} className="font-display text-4xl text-gold-dark" />
                <p className="mt-1 type-label text-muted">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
