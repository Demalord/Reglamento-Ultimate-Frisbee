import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GLOSARIO, slugify } from '../content/glosario'

export function Glosario() {
  const [params] = useSearchParams()
  const target = params.get('t')
  const [q, setQ] = useState('')

  const sorted = useMemo(() => [...GLOSARIO].sort((a, b) => a.term.localeCompare(b.term, 'es')), [])
  // Ordena por relevancia: nombre exacto > empieza por > contiene > solo en la definición.
  // Se compara en español y en inglés; los empates conservan el orden alfabético.
  const filtered = useMemo(() => {
    const k = slugify(q)
    if (!k) return sorted
    const score = (name: string) => {
      const n = slugify(name)
      if (n === k) return 0
      if (n.startsWith(k)) return 1
      if (n.split('-').some((w) => w.startsWith(k))) return 2
      if (n.includes(k)) return 3
      return Infinity
    }
    return sorted
      .map((g) => {
        const s = Math.min(score(g.term), score(g.en))
        return { g, s: s !== Infinity ? s : slugify(g.definition).includes(k) ? 4 : Infinity }
      })
      .filter((x) => x.s !== Infinity)
      .sort((a, b) => a.s - b.s)
      .map((x) => x.g)
  }, [q, sorted])

  // Llegando desde un término de una lección: baja hasta él y lo resalta
  useEffect(() => {
    if (!target) return
    const el = document.getElementById(`g-${target}`)
    if (el) {
      el.scrollIntoView({ block: 'center' })
      el.focus({ preventScroll: true })
    }
  }, [target])

  return (
    <div className="glosario">
      <h1>Glosario</h1>
      <p className="lede">
        Las definiciones del reglamento, con el término en inglés como se dice en la cancha.
      </p>

      <div className="search">
        <label htmlFor="glosario-q">Buscar un término</label>
        <input
          id="glosario-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="pull, marcador, fuera de límites…"
          autoComplete="off"
        />
      </div>

      <p className="muted" aria-live="polite">
        {filtered.length === sorted.length ? `${sorted.length} términos` : `${filtered.length} de ${sorted.length} términos`}
      </p>

      {filtered.length === 0 ? (
        <p>No hay términos con «{q}». Prueba con la palabra en inglés.</p>
      ) : (
        <dl className="glossary-list">
          {filtered.map((g) => (
            <div
              key={g.slug}
              id={`g-${g.slug}`}
              tabIndex={-1}
              className={`glossary-item ${target === g.slug ? 'is-target' : ''}`}
            >
              <dt>
                {g.term}
                {slugify(g.en) !== slugify(g.term) && <span className="term-en">{g.en}</span>}
              </dt>
              <dd>{g.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
