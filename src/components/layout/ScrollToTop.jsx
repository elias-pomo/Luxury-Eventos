import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Vuelve al inicio de la página en cada cambio de ruta. Si la URL trae un ancla
// (ej: /galeria#candy-bar), baja hasta esa sección.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
