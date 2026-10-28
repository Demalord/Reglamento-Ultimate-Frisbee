import { useEffect, useState } from 'react'

/**
 * Gráficos de una sola serie, hechos con SVG/HTML (sin librerías).
 * - Un solo tono (navy) para magnitud; el estado aprobado/por reforzar va con ícono + texto.
 * - Los valores siempre en texto junto a la marca: nada depende solo del color.
 * - role="img" + aria-label con el dato completo para lectores de pantalla.
 */

/** Anillo con el puntaje en el centro. Se llena una sola vez al aparecer (respeta reduced-motion). */
export function ScoreRing({ score, total, passed }: { score: number; total: number; passed: boolean }) {
  const pct = total ? score / total : 0
  const r = 52
  const c = 2 * Math.PI * r
  const [drawn, setDrawn] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDrawn(pct)
      return
    }
    const id = requestAnimationFrame(() => setDrawn(pct))
    return () => cancelAnimationFrame(id)
  }, [pct])

  return (
    <div className="ring" role="img" aria-label={`Puntaje: ${score} de ${total}, ${Math.round(pct * 100)} por ciento`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="ring-track" />
        <circle
          cx="60"
          cy="60"
          r={r}
          className={`ring-value ${passed ? 'is-pass' : 'is-low'}`}
          strokeDasharray={`${c * drawn} ${c}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="ring-label" aria-hidden="true">
        <span className="ring-score">
          {score}/{total}
        </span>
        <span className="ring-pct">{Math.round(pct * 100)} %</span>
      </div>
    </div>
  )
}

export interface BarDatum {
  key: string
  label: string
  value: number
  max: number
  /** Marca visual de "por reforzar" (con ícono y texto, no solo color). */
  flag?: boolean
  href?: string
}

/** Barras horizontales con el valor en texto. Tooltip nativo + aria en cada fila. */
export function BarList({ data, unit = 'count', caption }: { data: BarDatum[]; unit?: 'count' | 'pct'; caption: string }) {
  return (
    <div className="barlist" role="table" aria-label={caption}>
      {data.map((d) => {
        const pct = d.max ? d.value / d.max : 0
        const text = unit === 'pct' ? `${Math.round(pct * 100)} %` : `${d.value}/${d.max}`
        return (
          <div className={`bar-row ${d.flag ? 'is-flag' : ''}`} role="row" key={d.key} title={`${d.label}: ${text}`}>
            <span className="bar-label" role="rowheader">
              {d.label}
            </span>
            <span className="bar-track" role="cell" aria-label={text}>
              <span className="bar-fill" style={{ width: `${Math.max(pct * 100, d.value > 0 ? 2 : 0)}%` }} />
            </span>
            <span className="bar-value" role="cell">
              {text}
              {d.flag && (
                <span className="bar-flag">
                  <span aria-hidden="true"> ⚠</span>
                  <span className="sr-only"> por reforzar</span>
                </span>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/** Histograma de puntajes 0…total, columnas verticales con el conteo encima. */
export function ScoreHistogram({ scores, total }: { scores: number[]; total: number }) {
  const buckets = Array.from({ length: total + 1 }, (_, s) => scores.filter((x) => x === s).length)
  const peak = Math.max(1, ...buckets)
  return (
    <figure className="histogram">
      <div
        className="hist-plot"
        role="img"
        aria-label={`Distribución de puntajes: ${buckets.map((n, s) => `${n} con ${s}`).filter((_, s) => buckets[s] > 0).join(', ') || 'sin resultados'}`}
      >
        {buckets.map((n, s) => (
          <div className="hist-col" key={s} title={`${n} ${n === 1 ? 'estudiante' : 'estudiantes'} con ${s}/${total}`}>
            <span className="hist-count" aria-hidden="true">{n > 0 ? n : ''}</span>
            <span className="hist-bar" style={{ height: `${(n / peak) * 100}%` }} />
            <span className="hist-x" aria-hidden="true">{s}</span>
          </div>
        ))}
      </div>
      <figcaption className="muted">Estudiantes por puntaje (de 0 a {total})</figcaption>
    </figure>
  )
}
