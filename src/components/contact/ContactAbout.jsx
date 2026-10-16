import { site } from '../../config/site'
import { contactAbout } from '../../data/contact'
import { images } from '../../data/images'
import CountUp from '../ui/CountUp'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

export default function ContactAbout() {
  return (
    <section id="nosotros" className="bg-luxe scroll-mt-20 py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <Reveal className="relative mx-auto w-[calc(100%-4rem)] max-w-xs sm:max-w-sm">
          <div className="absolute -inset-3 rounded-t-full border border-gold" />
          <Photo image={images.owner} className="relative aspect-4/5 w-full rounded-t-full shadow-soft" />
          <div className="absolute -bottom-5 -left-6 rounded-sm bg-white px-5 py-4 shadow-soft">
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase">Te atiende</p>
            <p className="mt-0.5 font-display text-xl text-gold-dark italic">{site.owner}</p>
          </div>
        </Reveal>

        <div>
          <SectionTitle eyebrow="Nosotros" title={contactAbout.title} align="left" />
          <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-muted">
            {contactAbout.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6 border-t border-sand pt-8 sm:grid-cols-4">
            {site.stats.map(({ value, label }) => (
              <div key={label}>
                <CountUp value={value} className="font-display text-4xl text-gold-dark" />
                <p className="mt-1 text-[11px] tracking-[0.15em] text-muted uppercase">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
