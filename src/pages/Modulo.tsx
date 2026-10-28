import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { CheckIcon, LockIcon } from '../components/FieldMap'
import { ProgressBar } from '../components/ProgressBar'
import { getModule, rulesLabel } from '../content/manifest'
import { countDone, lessonStatus, lockReason, moduleStatus, reviewId, reviewStatus } from '../lib/progress'

export function Modulo() {
  const { moduleId } = useParams()
  const mod = getModule(Number(moduleId))
  const { done, isAdmin } = useAuth()

  if (!mod) return <Navigate to="/" replace />
  if (moduleStatus(mod, done, isAdmin) === 'locked') return <Navigate to="/" replace />

  const n = countDone(mod, done)

  return (
    <div className="modulo">
      <Link to="/" className="back-link">Volver a la cancha</Link>
      <header className="modulo-head">
        <span className="modulo-num" aria-hidden="true">{mod.id}</span>
        <div>
          <h1>
            <span className="sr-only">Módulo {mod.id}: </span>
            {mod.title}
          </h1>
          <p className="lede">{mod.summary}</p>
          <ProgressBar value={n} max={mod.lessons.length} label={`Progreso del módulo ${mod.id}`} />
        </div>
      </header>

      <ol className="lessons">
        {mod.lessons.map((l, i) => {
          const status = lessonStatus(l, done, isAdmin)
          const body = (
            <>
              <span className={`lesson-dot dot-${status}`} aria-hidden="true">
                {status === 'completed' ? <CheckIcon /> : status === 'locked' ? <LockIcon /> : i + 1}
              </span>
              <span className="lesson-body">
                <span className="lesson-title">{l.title}</span>
                <span className="lesson-meta">
                  {status === 'locked' ? lockReason(l) : `${rulesLabel(l.rules)}. Unos ${l.minutes} minutos.`}
                </span>
              </span>
              <span className="sr-only">
                {status === 'completed' && 'Completada'}
                {status === 'current' && 'Siguiente lección'}
                {status === 'locked' && 'Bloqueada'}
              </span>
            </>
          )
          return (
            <li key={l.id} className={`lesson lesson-${status}`}>
              {status === 'locked' ? (
                <div className="lesson-inner" aria-disabled="true">{body}</div>
              ) : (
                <Link to={`/modulo/${mod.id}/leccion/${l.id}`} className="lesson-inner">
                  {body}
                  {status === 'current' && <span className="lesson-cta" aria-hidden="true">Empezar</span>}
                </Link>
              )}
            </li>
          )
        })}
        <ReviewItem moduleId={mod.id} status={reviewStatus(mod, done, isAdmin)} />
      </ol>
    </div>
  )
}

function ReviewItem({ moduleId, status }: { moduleId: number; status: ReturnType<typeof reviewStatus> }) {
  const body = (
    <>
      <span className={`lesson-dot dot-${status} dot-review`} aria-hidden="true">
        {status === 'completed' ? <CheckIcon /> : status === 'locked' ? <LockIcon /> : '★'}
      </span>
      <span className="lesson-body">
        <span className="lesson-title">Repaso del módulo</span>
        <span className="lesson-meta">
          {status === 'locked'
            ? 'Completa todas las lecciones para desbloquear'
            : status === 'completed'
              ? 'Hecho. Puedes repetirlo cuando quieras.'
              : 'Preguntas sin nota. Al terminarlo se abre el siguiente módulo.'}
        </span>
      </span>
      <span className="sr-only">
        {status === 'completed' && 'Completado'}
        {status === 'current' && 'Siguiente paso'}
        {status === 'locked' && 'Bloqueado'}
      </span>
    </>
  )
  return (
    <li className={`lesson lesson-review lesson-${status}`} data-id={reviewId(moduleId)}>
      {status === 'locked' ? (
        <div className="lesson-inner" aria-disabled="true">{body}</div>
      ) : (
        <Link to={`/modulo/${moduleId}/repaso`} className="lesson-inner">
          {body}
          {status === 'current' && <span className="lesson-cta" aria-hidden="true">Empezar</span>}
        </Link>
      )}
    </li>
  )
}
