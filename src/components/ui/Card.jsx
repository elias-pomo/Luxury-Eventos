// Tarjeta con el estilo de la casa (card-luxe de index.css): borde dorado, filete interior y
// esquineros que se estiran al pasar o tocar.
// variant: 'light' · 'dark' · size: 'base' · 'sm' (esquineros chicos) · arch: borde superior en arco ·
// position: 'relative' (por defecto) o 'absolute' para tarjetas que flotan sobre otra pieza.
// `as` elige la etiqueta (div, article, form, li, details…). Para tarjetas animadas con motion
// se usan las clases directamente (card-luxe …) sobre el motion.*.
export function cardClasses({ variant = 'light', size = 'base', arch = false, position = 'relative' } = {}) {
  return [
    `card-luxe ${position}`,
    size === 'sm' && 'card-luxe-sm',
    variant === 'dark' && 'card-luxe-dark text-white',
    arch && 'card-luxe-arch',
  ]
    .filter(Boolean)
    .join(' ')
}

export default function Card({ as: Tag = 'div', variant, size, arch, position, className = '', children, ...props }) {
  return (
    <Tag className={`${cardClasses({ variant, size, arch, position })} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
