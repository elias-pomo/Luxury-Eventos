// Fotos adaptables: arma el src/srcset/sizes de una entrada de data/images.js o photos.js
// para que cada pantalla baje la versión que le corresponde (scripts/make-variants.mjs
// genera las chicas). `sizes` dice cuánto ancho ocupa la foto en pantalla; si no se
// indica, se asume el ancho completo.
import widths from '../data/imageWidths.json'

const SIZES_FULL = '100vw'

const parse = (src) => src.match(/^\/images\/([^/]+)\.webp$/)?.[1]

const candidates = (name, available) =>
  available.map((w, i) => {
    const url = i === available.length - 1 ? `/images/${name}.webp` : `/images/w/${name}-${w}.webp`
    return `${url} ${w}w`
  })

export const imgProps = (image, sizes = SIZES_FULL) => {
  const name = parse(image.src)
  const available = name && widths[name]
  if (!available || available.length < 2) return { src: image.src }
  return { src: image.src, srcSet: candidates(name, available).join(', '), sizes }
}

// Baja la foto antes de que aparezca (carruseles y portada), con el mismo tamaño que va a
// elegir el <img>, así al cambiar ya está en caché y decodificada.
export const preloadImage = (image, sizes) => {
  const { src, srcSet, sizes: s } = imgProps(image, sizes)
  const el = new Image()
  if (srcSet) {
    el.srcset = srcSet
    el.sizes = s
  }
  el.src = src
  return el.decode?.().catch(() => {})
}
