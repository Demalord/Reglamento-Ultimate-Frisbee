import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { BarList, ScoreRing } from '../components/Charts'
import { RichText } from '../components/RichText'
import { getModule } from '../content/manifest'
import { PASS_RATIO, useMyResults, type ResultDoc } from '../lib/quizzes'

export function QuizResult() {
  const { moduleId } = useParams()
  const m = Number(moduleId)
  const mod = getModule(m)
  const { user } = useAuth()
  const results = useMyResults(user?.uid)

  if (!mod) return <Navigate to="/" replace />
  if (results === null) {
    return (
      <div className="center-screen" role="status">
        <span className="spinner" aria-hidden="true" />
        <span className="sr-only">Cargando resultado…</span>
      </div>
    )
  }
  const result = results[m]
  if (!result) return <Navigate to={`/quiz/${m}`} replace />
  return <ResultView result={result} />
}

/** Vista de un resultado. La usa el estudiante y también el admin en el detalle por estudiante. */
export function ResultView({ result, adminView = false }: { result: ResultDoc; adminView?: boolean }) {
  const mod = getModule(result.moduleId)!
  const passed = result.total > 0 && result.score / result.total >= PASS_RATIO
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adminView) headRef.current?.focus({ preventScroll: true })
  }, [adminView])

  const bars = mod.lessons
    .filter((l) => result.byLesson[l.id])
    .map((l) => {
      const [ok, tot] = result.byLesson[l.id]
      return { key: l.id, label: l.title, value: ok, max: tot, flag: ok / tot < PASS_RATIO }
    })
  const toReview = bars.filter((b) => b.flag)

  return (
    <article className="leccion quiz-result">
      {!adminView && <Link to="/" className="back-link">Volver a la cancha</Link>}

      <div ref={headRef} tabIndex={-1} className="result-head">
        <span className="brush">Quiz del módulo {mod.id}</span>
        <h1>{mod.title}</h1>
      </div>

      <div className="result-hero">
        <ScoreRing score={result.score} total={result.total} passed={passed} />
        <div className="result-status">
          <p className={`status-pill ${passed ? 'is-pass' : 'is-low'}`}>
            <span aria-hidden="true">{passed ? '✓' : '!'}</span> {passed ? 'Aprobado' : 'Por reforzar'}
          </p>
          <p className="muted">
            {passed
              ? 'Buen trabajo. Revisa abajo los temas donde fallaste alguna.'
              : `Para aprobar se necesita al menos el ${Math.round(PASS_RATIO * 100)} %. Abajo están los temas para repasar.`}
          </p>
          {result.timedOut && <p className="muted">Se envió automáticamente porque se acabó el tiempo.</p>}
        </div>
      </div>

      {bars.length > 0 && (
        <section className="result-section" aria-labelledby="por-tema">
          <h2 id="por-tema">Por tema</h2>
          <BarList data={bars} caption="Aciertos por lección" />
        </section>
      )}

      {toReview.length > 0 && !adminView && (
        <section className="result-section" aria-labelledby="repasar">
          <h2 id="repasar">Vale la pena repasar</h2>
          <ul className="review-links">
            {toReview.map((b) => (
              <li key={b.key}>
                <Link to={`/modulo/${mod.id}/leccion/${b.key}`}>{b.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <details className="answers">
        <summary>{adminView ? 'Ver respuestas' : 'Ver mis respuestas'}</summary>
        <ol className="answer-list">
          {result.answers.map((a, i) => (
            <li key={i} className={`answer ${a.correct ? 'is-ok' : 'is-bad'}`}>
              <p className="answer-q">
                <span className="answer-icon" aria-hidden="true">{a.correct ? '✓' : '✗'}</span>
                <span className="sr-only">{a.correct ? 'Correcta: ' : 'Incorrecta: '}</span>
                <RichText text={a.prompt} plain />
              </p>
              {!a.correct && (
                <p className="answer-line">
                  <span className="muted">{adminView ? 'Respondió:' : 'Respondiste:'}</span> {a.selected ?? 'Sin responder'}
                </p>
              )}
              <p className="answer-line">
                <span className="muted">Respuesta correcta:</span> <strong>{a.correctAnswer}</strong>
              </p>
              <p className="answer-exp">
                <RichText text={a.explanation} /> <span className="feedback-rule">Regla {a.ruleRef}</span>
              </p>
            </li>
          ))}
        </ol>
      </details>
    </article>
  )
}
