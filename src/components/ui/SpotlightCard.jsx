// Tarjeta con un halo dorado que sigue al dedo o al mouse (también al arrastrar en celular).
// Pone --x e --y en el elemento y el halo se dibuja con ellos; sin puntero queda apagado.
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...props }) {
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag onPointerMove={onMove} className={`group/spot relative overflow-hidden ${className}`} {...props}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 group-active/spot:opacity-100"
        style={{
          background: 'radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgb(227 203 143 / 0.38), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  )
}
