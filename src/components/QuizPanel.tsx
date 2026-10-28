import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { MODULES } from '../content/manifest'
import { formatDay, todayIso, useActiveQuizzes, useMyResults, useSchedule } from '../lib/quizzes'

/**
 * Quizzes para el estudiante: abiertos, anunciados y presentados.
 * Si no hay nada que mostrar, no renderiza nada (los quizzes son invisibles hasta que el admin los activa).
 * Con moduleId muestra solo el de ese módulo.
 */
export function QuizPanel({ moduleId }: { moduleId?: number }) {
  const { user } = useAuth()
  const active = useActiveQuizzes()
  const schedule = useSchedule()
  const results = useMyResults(user?.uid)
  if (!active || !schedule || !results) return null

  const today = todayIso()
  const mods = MODULES.filter((m) => moduleId === undefined || m.id === moduleId)

  const items = mods
    .map((m) => {
      const quiz = active.find((q) => q.moduleId === m.id)
      const result = results[m.id]
      const sched = schedule[m.id]
      if (result) return { m, kind: 'done' as const, result }
      if (quiz) return { m, kind: 'open' as const, quiz }
      if (sched?.opensOn && sched.opensOn >= today) return { m, kind: 'soon' as const, sched }
      return null
    })
    .filter((x) => x !== null)

  if (items.length === 0) return null

  return (
    <section className={`quiz-panel ${moduleId ? 'is-inline' : ''}`} aria-labelledby={`quiz-panel-${moduleId ?? 'all'}`}>
      {!moduleId && <h2 id={`quiz-panel-${moduleId ?? 'all'}`}>Quizzes</h2>}
      {moduleId && <h2 id={`quiz-panel-${moduleId}`} className="sr-only">Quiz del módulo</h2>}
      <ul className="quiz-cards">
        {items.map((it) => (
          <li key={it.m.id} className={`quiz-card is-${it.kind}`}>
            <span className="quiz-card-kicker">Quiz del módulo {it.m.id}</span>
            <span className="quiz-card-title">{it.m.title}</span>

            {it.kind === 'open' && (
              <>
                <span className="quiz-card-meta">
                  <span className="status-pill is-open"><span aria-hidden="true">●</span> Abierto</span>{' '}
                  {it.quiz.questions.length} preguntas{it.quiz.timeLimitMin ? `, ${it.quiz.timeLimitMin} minutos` : ''}. Un intento.
                </span>
                <Link to={`/quiz/${it.m.id}`} className="btn btn-primary">Presentar quiz</Link>
              </>
            )}

            {it.kind === 'soon' && (
              <>
                <span className="quiz-card-meta">
                  Se abre el <strong>{formatDay(it.sched.opensOn)}</strong>.{it.sched.note ? ` ${it.sched.note}` : ''}
                </span>
                <Link to={`/modulo/${it.m.id}`} className="btn btn-secondary">Repasar el módulo</Link>
              </>
            )}

            {it.kind === 'done' && (
              <>
                <span className="quiz-card-meta">
                  Lo presentaste: <strong>{it.result.score}/{it.result.total}</strong>
                </span>
                <Link to={`/quiz/${it.m.id}/resultado`} className="btn btn-secondary">Ver resultado</Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
