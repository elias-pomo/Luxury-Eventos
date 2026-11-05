// Sección de página con el fondo y el ritmo vertical del sitio en un solo lugar.
// tone: 'light' (marfil) · 'cream' · 'dark' (tinta, con texto claro).
// art: usa el fondo con ondas doradas (fondo2/fondo1). Reservado para momentos clave.
// spacing: 'base' (ritmo normal) · 'tight' (secciones de trabajo, como el cotizador).
const backgrounds = {
  light: { plain: 'bg-luxe', art: 'bg-luxe-art' },
  cream: { plain: 'bg-luxe-cream', art: 'bg-luxe-art' },
  dark: { plain: 'bg-luxe-dark text-white', art: 'bg-luxe-dark-art text-white' },
}

const spacings = {
  base: 'section-y',
  tight: 'section-y-tight',
}

export default function Section({ tone = 'light', art = false, spacing = 'base', className = '', children, ...props }) {
  const background = backgrounds[tone][art ? 'art' : 'plain']
  return (
    <section className={`relative ${background} ${spacings[spacing]} ${className}`} {...props}>
      {children}
    </section>
  )
}
