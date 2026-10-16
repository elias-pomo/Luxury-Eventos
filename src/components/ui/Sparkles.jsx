// Destellos dorados que suben flotando. Posiciones fijas (sin azar en cada render)
// y animación solo con CSS, que es barata incluso en celulares. Los últimos se
// ocultan en pantallas chicas.
const sparkles = [
  { left: 6, size: 5, delay: 0, time: 9, dx: 14, rise: 220 },
  { left: 14, size: 3, delay: 3.2, time: 8, dx: -10, rise: 180 },
  { left: 23, size: 4, delay: 6.1, time: 10, dx: 18, rise: 260 },
  { left: 31, size: 6, delay: 1.4, time: 11, dx: -16, rise: 240 },
  { left: 42, size: 3, delay: 4.6, time: 8.5, dx: 8, rise: 200 },
  { left: 52, size: 5, delay: 2.2, time: 9.5, dx: -12, rise: 230 },
  { left: 61, size: 4, delay: 7.3, time: 10.5, dx: 16, rise: 250 },
  { left: 70, size: 6, delay: 0.8, time: 12, dx: -18, rise: 280 },
  { left: 78, size: 3, delay: 5.4, time: 8, dx: 10, rise: 190 },
  { left: 86, size: 5, delay: 3.8, time: 9, dx: -14, rise: 210 },
  { left: 93, size: 4, delay: 6.9, time: 10, dx: 12, rise: 240 },
  { left: 37, size: 3, delay: 8.2, time: 9, dx: -8, rise: 170 },
]

export default function Sparkles({ className = '', count = sparkles.length }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparkles.slice(0, count).map(({ left, size, delay, time, dx, rise }, i) => (
        <span
          key={i}
          className={`sparkle absolute bottom-0 rotate-45 rounded-[1px] bg-gold-light opacity-0 shadow-[0_0_10px_2px_rgb(227_203_143/0.7)] ${i > 6 ? 'hidden sm:block' : ''}`}
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            '--dx': `${dx}px`,
            '--rise': `${rise}px`,
            animation: `float-up ${time}s ease-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
