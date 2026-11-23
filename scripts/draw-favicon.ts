// Draws the site's icon with Surfaces: a linocut "mark", the seed's first letter, P for
// "pogrobert", left standing in ink while the block round it is cut away in level strokes.
// A pale ink on the dark ground, in the calm mood, whose fewer and finer cuts let the P
// stand clear at sixteen pixels. The icon is cropped to the letter, so the P runs its full
// height. The files are written once and kept; run this again only to change the icon.
//
//   node scripts/draw-favicon.ts    writes public/favicon.png and public/apple-touch-icon.png
import { writeFileSync } from 'node:fs'
import { generate } from '@pogrobert/surfaces'
import { toPng } from '@pogrobert/surfaces/png'
import { Resvg } from '@resvg/resvg-js'

// Taller than wide: in a square, Surfaces sets the block so it runs off the top and cuts
// the head of the P; at this shape the whole block is in view.
const width = 1024
const height = 1600
const scene = generate({
  style: 'linocut',
  shape: 'mark',
  seed: 'pogrobert',
  color: '#e7e5e4',
  width,
  height,
  areas: [],
  theme: 'dark',
  mood: 'calm',
  // The finest grain, since the icon is seen at sixteen pixels.
  grain: 'smooth',
})
const art = Buffer.from(await toPng(scene)).toString('base64')

// Where the block landed, from its outline in the scene. The scene has its own units,
// which the PNG scales up to `width`.
const block = scene.layers.find((layer) => layer.id === 'block')
if (block?.kind !== 'clip' || block.shape.type !== 'polygon') throw new Error('The linocut has no block to crop to.')
const points = block.shape.points
const xs = points.filter((_, i) => i % 2 === 0)
const ys = points.filter((_, i) => i % 2 === 1)
const toPixels = width / scene.size.w
const left = Math.min(...xs) * toPixels
const right = Math.max(...xs) * toPixels
const top = Math.min(...ys) * toPixels
const bottom = Math.max(...ys) * toPixels

// The letter stands in the middle 70% of the block's height; a square a little taller than
// that, on the block's centre, shows the whole P with the cut field at its sides.
const side = (bottom - top) * 0.74
const x = (left + right) / 2 - side / 2
const y = (top + bottom) / 2 - side / 2

// The crop at a size, with its corners rounded or left square.
const icon = (size: number, round: boolean) =>
  new Resvg(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${x} ${y} ${side} ${side}">` +
      `<clipPath id="tile"><rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${round ? side * 0.24 : 0}"/></clipPath>` +
      `<g clip-path="url(#tile)"><image width="${width}" height="${height}" xlink:href="data:image/png;base64,${art}"/></g></svg>`,
    { fitTo: { mode: 'width', value: size } },
  )
    .render()
    .asPng()

// The tab's icon is a rounded tile. A phone's home screen rounds the corners itself, and
// fills any see-through ones with black, so that one is left square.
writeFileSync('public/favicon.png', icon(96, true))
writeFileSync('public/apple-touch-icon.png', icon(180, false))
