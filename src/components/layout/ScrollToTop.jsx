import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Vuelve al inicio de la página en cada cambio de ruta. Si la URL trae un ancla
// (ej: /galeria#candy-bar), baja hasta esa sección. Como las páginas se cargan
// recién al visitarlas, la sección puede tardar un momento en existir: se reintenta.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer
    const find = () => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView({ behavior: 'instant' })
      else if (tries++ < 20) timer = setTimeout(find, 100)
    }
    find()
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}
