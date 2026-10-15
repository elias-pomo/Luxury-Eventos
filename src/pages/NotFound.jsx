import Button from '../components/ui/Button'
import { usePageTitle } from '../utils/usePageTitle'
import { pageTitles } from '../config/site'

export default function NotFound() {
  usePageTitle(pageTitles.notFound)
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl text-gold-gradient">404</p>
      <h1 className="mt-4 text-4xl">Página no encontrada</h1>
      <p className="mt-3 text-muted">La página que buscás no existe o fue movida.</p>
      <Button to="/" className="mt-8">Volver al inicio</Button>
    </section>
  )
}
