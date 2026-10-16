// Optimiza las fotos: convierte los .jpg/.png de public/images a .webp (lado mayor
// máx. 1600 px) y deja los originales en /fotos-originales, que no se publica.
//
// Uso:  npm run images
// Flujo para fotos nuevas: copiarlas a public/images como .jpg, correr el comando
// y referenciarlas como .webp en src/data/photos.js o images.js.
import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/images'
const BACKUP = 'fotos-originales'
const MAX = 1600

await mkdir(BACKUP, { recursive: true })

let before = 0
let after = 0

for (const name of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(name)) continue
  const input = path.join(SRC, name)
  const output = path.join(SRC, name.replace(/\.(jpe?g|png)$/i, '.webp'))
  const original = (await stat(input)).size

  await sharp(input)
    .rotate() // respeta la orientación EXIF
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)

  await rename(input, path.join(BACKUP, name))
  const optimized = (await stat(output)).size
  before += original
  after += optimized
  console.log(`${name} → ${path.basename(output)}  ${(original / 1024).toFixed(0)} kB → ${(optimized / 1024).toFixed(0)} kB`)
}

console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`)
