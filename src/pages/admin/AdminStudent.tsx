import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProgressBar } from '../../components/ProgressBar'
import { MODULES, TOTAL_LESSONS } from '../../content/manifest'
import { resetAttempt } from '../../lib/quizzes'
import { countAllLessons, countDone, reviewId } from '../../lib/progress'
import { ResultView } from '../QuizResult'
import { useAdminData } from './useAdminData'

export function AdminStudent() {
  const { uid } = useParams()
  const { users, byModule, loading, error } = useAdminData()
  const [busy, setBusy] = useState(false)

  if (error) return <p className="form-error" role="alert">{error}</p>
  if (loading || !users) return <p className="muted" role="status">Cargando estudiante…</p>

  const u = users.find((x) => x.uid === uid)
  if (!u) {
    return (
      <div className="admin">
        <Link to="/admin" className="back-link">Panel del equipo</Link>
        <h1>Estudiante no encontrado</h1>
      </div>
    )
  }
  const done = new Set(u.completedLessons)
  const results = MODULES.map((m) => byModule[m.id]?.[u.uid]).filter((r) => r !== undefined)

  return (
    <div className="admin">
      <Link to="/admin" className="back-link">Panel del equipo</Link>
      <h1>{u.name}</h1>
      <p className="muted">{u.email}</p>

      <section className="admin-card" aria-labelledby="progreso">
        <h2 id="progreso">Progreso</h2>
        <ProgressBar value={countAllLessons(done)} max={TOTAL_LESSONS} label="Lecciones completadas" />
        <ul className="student-modules">
          {MODULES.map((m) => (
            <li key={m.id}>
              <span className="student-mod-title">
                {m.id}. {m.title}
              </span>
              <span className="muted">
                {countDone(m, done)}/{m.lessons.length} lecciones
                {done.has(reviewId(m.id)) ? '. Repaso hecho.' : '.'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section" aria-labelledby="quizzes-est">
        <h2 id="quizzes-est">Quizzes</h2>
        {results.length === 0 && <p className="muted">Aún no ha presentado ningún quiz.</p>}
        {results.map((r) => (
          <div key={r.moduleId} className="admin-card">
            <ResultView result={r} adminView />
            <button
              type="button"
              className="btn btn-secondary"
              disabled={busy}
              onClick={async () => {
                if (!window.confirm(`¿Borrar el intento del quiz ${r.moduleId}? Podrá presentarlo otra vez si está abierto.`)) return
                setBusy(true)
                try {
                  await resetAttempt(u.uid, r.moduleId)
                } finally {
                  setBusy(false)
                }
              }}
            >
              Reiniciar intento del quiz {r.moduleId}
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
