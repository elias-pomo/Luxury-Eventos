import { site } from '../../config/site'
import { images } from '../../data/images'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  return (
    <section id="nosotros" className="bg-luxe scroll-mt-20 py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-[calc(100%-2rem)] max-w-md sm:w-full lg:max-w-none">
          {/* Marco concéntrico: misma separación en todos los lados para que los arcos queden paralelos */}
          <div className="absolute -inset-3 rounded-t-full border border-gold sm:-inset-4" />
          <Photo image={images.about} className="relative aspect-4/5 w-full rounded-t-full shadow-soft" />
          <div className="absolute -right-2 -bottom-6 rounded-sm bg-white px-6 py-5 shadow-soft sm:-right-8">
            <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Atención personalizada</p>
            <p className="mt-1 font-display text-2xl text-gold-dark italic">{site.owner}</p>
          </div>
        </Reveal>

        <div>
          <SectionTitle eyebrow="Nosotros" title={`Bienvenidos a ${site.name}`} align="left" />
          <Reveal delay={0.1} className="space-y-4 leading-relaxed text-muted">
            <p className="mt-6">{site.description}</p>
            <p>
              Hace más de 10 años que acompañamos a familias de Tucumán en sus días más importantes. Desde la
              primera consulta hasta el último baile, {site.owner.split(' ')[0]} y su equipo están presentes para
              que todo salga tal como lo imaginaste.
            </p>
            <p>
              Contamos con sonido JBL, luces de colores y aire acondicionado incluidos, y podés sumar DJ, candy bar
              y decoración temática para armar una fiesta a tu medida, en turno tarde o noche.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6 border-t border-sand pt-10 sm:grid-cols-4">
            {site.stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl text-gold-dark">{value}</p>
                <p className="mt-1 text-[11px] tracking-[0.15em] text-muted uppercase">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
