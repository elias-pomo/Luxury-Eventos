// Imagen del sitio: recibe una entrada de data/images.js y respeta su punto de enfoque.
export default function Photo({ image, alt = image.alt, className = '', ...props }) {
  return (
    <img
      src={image.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: image.position ?? 'center' }}
      className={`object-cover ${className}`}
      {...props}
    />
  )
}
