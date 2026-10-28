import { Link } from 'react-router-dom'
import { ProgressBar } from '../../components/ProgressBar'
import { MODULES, TOTAL_LESSONS } from '../../content/manifest'
import { formatDay } from '../../lib/quizzes'
import { countAllLessons } from '../../lib/progress'
import { useAdminData } from './useAdminData'

export function AdminHome() {
  const { students, quizzes, schedule, byModule, loading, error } = useAdminData()

  if (error) return <p className="form-error" role="alert">{error}</p>
  if (loading || !students || !quizzes || !schedule) {
    return <p className="muted" role="status">Cargando panel…</p>
  }

  const n = students.length
  const openQuizzes = MODULES.filter((m) => quizzes[m.id]?.active)
  const avgLessons = n ? Math.round(students.reduce((s, u) => s + countAllLessons(new Set(u.completedLessons)), 0) / n) : 0

  return (
    <div className="admin">
      <h1>Panel del equipo</h1>

      <dl className="kpis">
        <div className="kpi">
          <dt>Estudiantes</dt>
          <dd>{n}</dd>
        </div>
        <div className="kpi">
          <dt>Lecciones en promedio</dt>
          <dd>
            {avgLessons}
            <small>/{TOTAL_LESSONS}</small>
          </dd>
        </div>
        <div className="kpi">
          <dt>Quiz abierto</dt>
          <dd>
            {openQuizzes.length === 0
              ? 'Ninguno'
              : openQuizzes.map((m) => (
                  <span key={m.id} className="kpi-line">
                    M{m.id}: {Object.keys(byModule[m.id] ?? {}).filter((uid) => students.some((s) => s.uid === uid)).length}/{n}
                  </span>
                ))}
          </dd>
        </div>
      </dl>

      <section className="admin-section" aria-labelledby="admin-quizzes">
        <h2 id="admin-quizzes">Quizzes</h2>
        <ul className="admin-quiz-list">
          {MODULES.map((m) => {
            const q = quizzes[m.id]
            const s = schedule[m.id]
            const presented = Object.keys(byModule[m.id] ?? {}).filter((uid) => students.some((st) => st.uid === uid)).length
            const state = q?.active ? 'open' : q ? 'closed' : 'idle'
            return (
              <li key={m.id}>
                <Link to={`/admin/quiz/${m.id}`} className="admin-quiz-item">
                  <span className="admin-quiz-num" aria-hidden="true">{m.id}</span>
                  <span className="admin-quiz-body">
                    <span className="admin-quiz-title">{m.title}</span>
                    <span className="admin-quiz-meta">
                      <span className={`status-pill is-${state}`}>
                        {state === 'open' ? '● Abierto' : state === 'closed' ? 'Cerrado' : 'Sin activar'}
                      </span>{' '}
                      {presented}/{n} lo presentaron
                      {s?.opensOn && !q?.active ? `. Anunciado para el ${formatDay(s.opensOn)}` : ''}
                    </span>
                  </span>
                  <span className="admin-quiz-cta" aria-hidden="true">Gestionar</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="admin-section" aria-labelledby="admin-team">
        <h2 id="admin-team">Estudiantes</h2>
        <div className="table-wrap">
          <table className="table">
            <caption className="sr-only">Progreso y puntaje de quizzes por estudiante</caption>
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Lecciones</th>
                {MODULES.map((m) => (
                  <th scope="col" key={m.id} className="num">
                    <abbr title={`Quiz del módulo ${m.id}: ${m.title}`}>Q{m.id}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan={2 + MODULES.length} className="muted">
                    Aún nadie ha entrado. Comparte el enlace con el equipo.
                  </td>
                </tr>
              )}
              {students.map((u) => {
                const done = new Set(u.completedLessons)
                return (
                  <tr key={u.uid}>
                    <th scope="row">
                      <Link to={`/admin/estudiante/${u.uid}`}>{u.name}</Link>
                      <span className="cell-sub">{u.email}</span>
                    </th>
                    <td className="cell-progress">
                      <ProgressBar value={countAllLessons(done)} max={TOTAL_LESSONS} label={`Lecciones de ${u.name}`} />
                    </td>
                    {MODULES.map((m) => {
                      const r = byModule[m.id]?.[u.uid]
                      const pending = quizzes[m.id]?.active && !r
                      return (
                        <td key={m.id} className="num" data-label={`Quiz ${m.id}`}>
                          {r ? `${r.score}/${r.total}` : pending ? <span className="cell-pending">pend.</span> : <span className="muted">—</span>}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
