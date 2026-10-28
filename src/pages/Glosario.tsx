import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GLOSARIO, slugify } from '../content/glosario'

export function Glosario() {
  const [params] = useSearchParams()
  const target = params.get('t')
  const [q, setQ] = useState('')

  const sorted = useMemo(() => [...GLOSARIO].sort((a, b) => a.term.localeCompare(b.term, 'es')), [])
  const filtered = useMemo(() => {
    const k = slugify(q)
    if (!k) return sorted
    return sorted.filter((g) => slugify(`${g.term} ${g.en} ${g.definition}`).includes(k))
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
