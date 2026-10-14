import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

const variants = {
  primary: 'bg-gold text-white shadow-gold hover:bg-gold-dark hover:-translate-y-0.5',
  outline: 'border border-gold text-gold-dark hover:bg-gold hover:text-white',
  light: 'border border-white/70 text-white backdrop-blur-sm hover:bg-white hover:text-ink',
}

// Renderiza <Link> para rutas internas, <a> para externas o <button> si no hay destino.
export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  return <button className={classes} {...props}>{children}</button>
}
