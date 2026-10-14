import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../../config/site'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../icons/SocialIcons'
import { whatsappLink } from '../../utils/whatsapp'

export default function Footer() {
  const socials = [
    { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: whatsappLink(), label: 'WhatsApp', Icon: WhatsAppIcon },
  ]

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-white">{site.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.tagline}.</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-gold uppercase">Navegación</p>
          <ul className="space-y-3 text-sm">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-gold uppercase">Contacto</p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-4 shrink-0 text-gold" />
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {site.address.street}, {site.address.city}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {site.phoneDisplay}
              </a>
            </li>
            {site.email && (
              <li className="flex gap-3">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
              </li>
            )}
            <li className="flex gap-3">
              <Clock className="size-4 shrink-0 text-gold" />
              <div className="space-y-1">
                <p className="text-white">Turnos de eventos</p>
                {site.eventShifts.map(({ label, time }) => (
                  <p key={label}>{label}: {time}</p>
                ))}
                <p className="pt-1 text-white/50">{site.attention}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wider">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
