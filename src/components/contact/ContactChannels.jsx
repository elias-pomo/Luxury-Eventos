import { ArrowUpRight, Clock, Mail, Phone } from 'lucide-react'
import { site } from '../../config/site'
import { track } from '../../utils/analytics'
import { whatsappLink } from '../../utils/whatsapp'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../icons/SocialIcons'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import ContactForm from './ContactForm'
import Section from '../ui/Section'

const instagramHandle = `@${site.social.instagram.replace(/\/+$/, '').split('/').pop()}`

const channels = [
  {
    href: whatsappLink(`¡Hola ${site.name}! Quisiera hacer una consulta.`),
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    detail: site.phoneDisplay,
    featured: true,
  },
  { href: site.phoneHref, Icon: Phone, label: 'Llamanos', detail: site.phoneDisplay, call: true },
  { href: site.social.instagram, Icon: InstagramIcon, label: 'Instagram', detail: instagramHandle },
  { href: site.social.facebook, Icon: FacebookIcon, label: 'Facebook', detail: site.name },
  site.email && { href: `mailto:${site.email}`, Icon: Mail, label: 'Email', detail: site.email },
].filter(Boolean)

export default function ContactChannels() {
  return (
    <Section id="escribinos" tone="cream" className="scroll-mt-20">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle
            eyebrow="Escribinos"
            title="Estamos a un mensaje"
            subtitle={`${site.attention}. Escribinos por donde te quede más cómodo o dejanos tu consulta y te respondemos con disponibilidad.`}
            align="left"
          />

          <ul className="mt-10 space-y-3">
            {channels.map(({ href, Icon, label, detail, featured, call }, i) => (
              <Reveal as="li" key={label} delay={0.08 * i} y={20}>
                <a
                  href={href}
                  {...(call ? { onClick: () => track('call_click', { origen: 'contacto' }) } : { target: '_blank', rel: 'noopener noreferrer' })}
                  className={`group relative card-luxe card-luxe-sm flex min-h-16 items-center gap-4 px-4 py-3 hover:-translate-y-0.5 active:scale-[0.99] sm:px-5 ${
                    featured ? 'card-luxe-dark text-white' : ''
                  }`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      featured ? 'bg-gold text-ink' : 'border border-gold/40 text-gold-dark group-hover:bg-gold group-hover:text-ink'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block type-label ${featured ? 'text-gold-light' : 'text-muted'}`}>
                      {label}
                    </span>
                    <span className="block truncate font-display text-xl">{detail}</span>
                  </span>
                  <ArrowUpRight
                    className={`size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      featured ? 'text-gold-light' : 'text-gold-dark'
                    }`}
                  />
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="card-luxe card-luxe-sm relative mt-6 flex gap-4 px-4 py-4 sm:px-5">
            <Clock className="mt-0.5 size-5 shrink-0 text-gold-dark" />
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
    </Section>
  )
}
