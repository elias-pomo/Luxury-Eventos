// Genera las versiones chicas de cada foto de public/images para que el celular no
// baje la de 1600 px: public/images/w/<nombre>-480.webp y -800.webp (se ignoran en git).
// Corre solo antes de `npm run dev` y `npm run build`; solo rehace lo que cambió.
//
// También escribe src/data/imageWidths.json (nombre → anchos disponibles, el último es
// el de la foto original). `utils/img.js` lo usa para armar el srcset: una foto que no
// figura ahí se muestra con su src común.
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'public/images'
const OUT = path.join(SRC, 'w')
const MANIFEST = 'src/data/imageWidths.json'
const WIDTHS = [480, 800]
const QUALITY = 72
// Si la foto no es bastante más ancha que la versión, no vale la pena duplicarla.
const MIN_GAIN = 1.15

await mkdir(OUT, { recursive: true })

const mtime = async (file) => (await stat(file).catch(() => null))?.mtimeMs ?? 0
const manifest = {}
let made = 0

for (const file of (await readdir(SRC)).sort()) {
  if (!file.endsWith('.webp')) continue
  const name = file.slice(0, -'.webp'.length)
  const input = path.join(SRC, file)
  const { width } = await sharp(input).metadata()
  const widths = []

  for (const w of WIDTHS) {
    if (width < w * MIN_GAIN) continue
    const output = path.join(OUT, `${name}-${w}.webp`)
    if ((await mtime(output)) < (await mtime(input))) {
      await sharp(input).resize({ width: w }).webp({ quality: QUALITY }).toFile(output)
      made++
    }
    widths.push(w)
  }
  manifest[name] = [...widths, width]
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`)
console.log(`Versiones chicas: ${made} nuevas, ${Object.keys(manifest).length} fotos en total.`)
