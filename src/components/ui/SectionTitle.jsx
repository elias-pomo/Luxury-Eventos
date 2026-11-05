import Eyebrow from './Eyebrow'
import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, titleId }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && (
        <Eyebrow light={light} lines={align === 'center' ? 'both' : 'start'} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 id={titleId} className={`text-4xl leading-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-5 text-sm leading-relaxed sm:text-base ${light ? 'text-white/80' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
