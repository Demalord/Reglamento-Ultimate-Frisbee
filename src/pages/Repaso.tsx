import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'
import { getReview } from '../content'
import { getModule, MODULES } from '../content/manifest'
import { reviewId, reviewStatus } from '../lib/progress'

/**
 * Repaso del módulo: preguntas sin nota, una a la vez, con feedback.
 * Al terminarlo se desbloquea el siguiente módulo.
 */
export function Repaso() {
  const { moduleId } = useParams()
  const mod = getModule(Number(moduleId))
  const { done, isAdmin, completeLesson } = useAuth()
  const navigate = useNavigate()
  const review = mod ? getReview(mod.id) : undefined

  const [current, setCurrent] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const [saving, setSaving] = useState(false)
  const focusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    focusRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [current, finished])

  if (!mod) return <Navigate to="/" replace />
  if (reviewStatus(mod, done, isAdmin) === 'locked') return <Navigate to={`/modulo/${mod.id}`} replace />

  const alreadyDone = done.has(reviewId(mod.id))
  const nextModule = MODULES.find((m) => m.id === mod.id + 1)

  if (!review) {
    return (
      <article className="leccion">
        <Link to={`/modulo/${mod.id}`} className="back-link">Módulo {mod.id}</Link>
        <h1>Repaso del módulo {mod.id}</h1>
        <div className="notice"><p style={{ marginBottom: 0 }}>Este repaso está en preparación.</p></div>
      </article>
    )
  }

  const total = review.questions.length
  const q = review.questions[current]
  const answeredCurrent = results.length > current
  const score = results.filter(Boolean).length

  const goNext = () => {
    if (current + 1 < total) setCurrent(current + 1)
    else setFinished(true)
  }

  const finish = async () => {
    setSaving(true)
    try {
      if (!alreadyDone) await completeLesson(reviewId(mod.id))
      navigate(nextModule ? `/modulo/${nextModule.id}` : '/')
    } finally {
      setSaving(false)
    }
  }

  if (finished) {
    const failedLessons = [
      ...new Set(review.questions.filter((_, i) => !results[i]).map((qq) => qq.lessonId).filter(Boolean)),
    ] as string[]
    return (
      <article className="leccion">
        <div ref={focusRef} tabIndex={-1} className="review-summary">
          <span className="brush">Repaso terminado</span>
          <h1>
            Acertaste {score} de {total}
          </h1>
          <p className="lede">
            {score === total
              ? 'Perfecto. Tienes este módulo dominado.'
              : 'El repaso no tiene nota: sirve para ver qué vale la pena volver a leer.'}
          </p>
          {failedLessons.length > 0 && (
            <>
              <h2 className="review-sub">Vale la pena repasar</h2>
              <ul className="review-links">
                {failedLessons.map((id) => {
                  const l = mod.lessons.find((x) => x.id === id)
                  return l ? (
                    <li key={id}>
                      <Link to={`/modulo/${mod.id}/leccion/${id}`}>{l.title}</Link>
                    </li>
                  ) : null
                })}
              </ul>
            </>
          )}
        </div>
        <div className="leccion-actions">
          <button type="button" className="btn btn-primary" onClick={finish} disabled={saving}>
            {saving ? 'Guardando…' : nextModule ? `Ir al módulo ${nextModule.id}` : 'Volver a la cancha'}
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className="leccion">
      <div className="leccion-bar">
        <Link to={`/modulo/${mod.id}`} className="back-link">Módulo {mod.id}</Link>
        <ProgressBar value={results.length} max={total} label="Preguntas respondidas" />
      </div>

      <header className="leccion-head">
        <p className="leccion-kicker">Repaso del módulo {mod.id}. Sin nota.</p>
        <h1>{mod.title}</h1>
      </header>

      <div ref={focusRef} tabIndex={-1} className="checkpoint">
        <QuestionCard
          key={current}
          heading={`Pregunta ${current + 1} de ${total}`}
          question={q}
          allowRetry={false}
          onAnswered={(ok) => setResults((r) => [...r, ok])}
        />
      </div>

      {answeredCurrent && (
        <div className="leccion-actions">
          <button type="button" className="btn btn-primary" onClick={goNext}>
            {current + 1 < total ? 'Siguiente pregunta' : 'Ver resultado'}
          </button>
        </div>
      )}
    </article>
  )
}
