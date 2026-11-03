import { imgProps } from '../../utils/img'

// Imagen del sitio: recibe una entrada de data/images.js y respeta su punto de enfoque.
// `sizes` indica cuánto ancho ocupa en pantalla (ver utils/img.js): así el celular baja la
// versión chica en vez de la de 1600 px.
export default function Photo({ image, alt = image.alt, sizes, className = '', ...props }) {
  return (
    <img
      {...imgProps(image, sizes)}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: image.position ?? 'center' }}
      className={`object-cover ${className}`}
      {...props}
    />
  )
}
