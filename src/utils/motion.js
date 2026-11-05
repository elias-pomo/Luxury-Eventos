// Tokens de movimiento del sitio: una sola curva y una escala de duraciones.
// En CSS la misma curva está como `ease-luxe` (index.css → --ease-luxe).

// Curva "de lujo": arranca rápido y se asienta suave.
export const ease = [0.22, 1, 0.36, 1]

// Duraciones en segundos (motion). fast: respuestas a un toque · base: entradas de
// elementos · slow: revelados grandes · cinematic: fotos y zooms lentos.
export const duration = { fast: 0.25, base: 0.5, slow: 0.9, cinematic: 1.3 }

// Transiciones listas para usar.
export const transition = {
  fast: { duration: duration.fast, ease },
  base: { duration: duration.base, ease },
  slow: { duration: duration.slow, ease },
}
