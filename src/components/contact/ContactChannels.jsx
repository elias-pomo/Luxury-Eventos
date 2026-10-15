import { ArrowUpRight, Clock, Mail } from 'lucide-react'
import { site } from '../../config/site'
import { whatsappLink } from '../../utils/whatsapp'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../icons/SocialIcons'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import ContactForm from './ContactForm'

const instagramHandle = `@${site.social.instagram.replace(/\/+$/, '').split('/').pop()}`

const channels = [
  {
    href: whatsappLink(`¡Hola ${site.name}! Quisiera hacer una consulta.`),
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    detail: site.phoneDisplay,
    featured: true,
  },
  { href: site.social.instagram, Icon: InstagramIcon, label: 'Instagram', detail: instagramHandle },
  { href: site.social.facebook, Icon: FacebookIcon, label: 'Facebook', detail: site.name },
  site.email && { href: `mailto:${site.email}`, Icon: Mail, label: 'Email', detail: site.email },
].filter(Boolean)

export default function ContactChannels() {
  return (
    <section id="escribinos" className="bg-luxe-cream scroll-mt-20 py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle
            eyebrow="Escribinos"
            title="Estamos a un mensaje"
            subtitle={`${site.attention}. Escribinos por donde te quede más cómodo o dejanos tu consulta y te respondemos con disponibilidad.`}
            align="left"
          />

          <ul className="mt-10 space-y-3">
            {channels.map(({ href, Icon, label, detail, featured }, i) => (
              <Reveal as="li" key={label} delay={0.08 * i} y={20}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex min-h-16 items-center gap-4 rounded-sm border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99] sm:px-5 ${
                    featured ? 'border-ink bg-ink text-white' : 'border-sand bg-ivory hover:border-gold'
                  }`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      featured ? 'bg-gold text-white' : 'border border-gold/40 text-gold group-hover:bg-gold group-hover:text-white'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[11px] tracking-[0.2em] uppercase ${featured ? 'text-gold-light' : 'text-muted'}`}>
                      {label}
                    </span>
                    <span className="block truncate font-display text-xl">{detail}</span>
                  </span>
                  <ArrowUpRight
                    className={`size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      featured ? 'text-gold-light' : 'text-gold'
                    }`}
                  />
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-6 flex gap-4 rounded-sm border border-dashed border-gold/50 px-4 py-4 sm:px-5">
            <Clock className="mt-0.5 size-5 shrink-0 text-gold" />
            <div className="text-sm">
              <p className="font-semibold text-ink">Turnos de eventos</p>
              {Object.values(site.shiftSchedules).map(({ label, shifts }) => (
                <p key={label} className="mt-2 text-muted">
                  <span className="block text-xs text-gold-dark">{label}</span>
                  {shifts.map((s) => s.time).join(' · ')}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
