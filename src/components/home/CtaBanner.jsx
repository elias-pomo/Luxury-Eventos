import { images } from '../../data/images'
import { site } from '../../config/site'
import { whatsappLink } from '../../utils/whatsapp'
import { WhatsAppIcon } from '../icons/SocialIcons'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Photo image={images.table} alt="" className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-ink/75" />

      <Reveal className="container-page relative z-10 flex flex-col items-center text-center text-white">
        <span className="mb-5 text-xs tracking-[0.4em] text-gold-light uppercase">Reservá tu fecha</span>
        <h2 className="max-w-3xl text-4xl leading-tight sm:text-6xl">
          ¿Tenés una fecha en mente? <em className="text-gold-gradient">Hagámosla realidad</em>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Armá tu presupuesto online en pocos minutos o escribinos para consultar disponibilidad y coordinar una
          visita al salón. Te respondemos todos los días.
        </p>
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.2em] text-gold-light uppercase sm:flex-row sm:gap-10">
          {Object.values(site.shiftSchedules).map(({ label, shifts }) => (
            <p key={label}>
              <span className="block text-[10px] tracking-[0.25em] text-white/60">{label}</span>
              <span className="mt-1 block">{shifts.map((s) => s.time).join(' · ')}</span>
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button to="/servicios">Cotizá online</Button>
          <Button href={whatsappLink(`¡Hola ${site.name}! Quisiera consultar disponibilidad de fecha.`)} variant="light">
            <WhatsAppIcon className="size-4" /> Escribinos
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
