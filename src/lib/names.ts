// Nombres como los entrega Google: a veces todo en mayúsculas ("JULIAN DAVID SARMIENTO")
// o todo en minúsculas. Se pasan a formato normal ("Julian David Sarmiento").
// Si el nombre ya trae mayúsculas y minúsculas mezcladas, se respeta tal cual.

const PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e', 'da', 'do', 'dos', 'van', 'von'])

export function formatName(raw: string | null | undefined): string {
  const name = (raw ?? '').trim().replace(/\s+/g, ' ')
  if (!name) return ''
  const mixed = name !== name.toLocaleUpperCase('es') && name !== name.toLocaleLowerCase('es')
  if (mixed) return name
  return name
    .toLocaleLowerCase('es')
    .split(' ')
    .map((w, i) => (i > 0 && PARTICLES.has(w) ? w : w.replace(/(^|[-'])(\p{L})/gu, (_, sep, c) => sep + c.toLocaleUpperCase('es'))))
    .join(' ')
}

export const firstName = (raw: string | null | undefined) => formatName(raw).split(' ')[0] ?? ''
