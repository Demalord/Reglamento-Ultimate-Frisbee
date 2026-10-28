import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { ProgressBar } from '../components/ProgressBar'
import { MODULES, TOTAL_LESSONS } from '../content/manifest'
import { countDone } from '../lib/progress'

interface Row {
  uid: string
  name: string
  email: string
  completedLessons: string[]
}

/**
 * Fase 1: lista del equipo con su progreso.
 * Fase 4 agrega columnas de quizzes, detalle por estudiante y gestión de quizzes.
 */
export function Admin() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDocs(query(collection(db, 'users'), orderBy('name')))
      .then((snap) =>
        setRows(
          snap.docs.map((d) => ({
            uid: d.id,
            name: d.get('name') ?? '',
            email: d.get('email') ?? '',
            completedLessons: d.get('completedLessons') ?? [],
          })),
        ),
      )
      .catch((e) => {
        console.error(e)
        setError('No se pudieron cargar los estudiantes. Revisa que tu correo esté en isAdmin() de firestore.rules.')
      })
  }, [])

  return (
    <div className="admin">
      <h1>Panel del equipo</h1>
      <p className="lede">Progreso de cada estudiante en las {TOTAL_LESSONS} lecciones.</p>

      {error && <p className="form-error" role="alert">{error}</p>}
      {!rows && !error && <p className="muted" role="status">Cargando estudiantes…</p>}

      {rows && (
        <div className="table-wrap">
          <table className="table">
            <caption className="sr-only">Progreso por estudiante</caption>
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Progreso</th>
                {MODULES.map((m) => (
                  <th scope="col" key={m.id} className="num">
                    <abbr title={m.title}>M{m.id}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={2 + MODULES.length} className="muted">
                    Aún nadie ha entrado. Comparte el enlace con el equipo.
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const done = new Set(r.completedLessons)
                return (
                  <tr key={r.uid}>
                    <th scope="row">
                      {r.name}
                      <span className="cell-sub">{r.email}</span>
                    </th>
                    <td className="cell-progress">
                      <ProgressBar value={done.size} max={TOTAL_LESSONS} label={`Progreso de ${r.name}`} />
                    </td>
                    {MODULES.map((m) => (
                      <td key={m.id} className="num" data-label={`Módulo ${m.id}`}>
                        {countDone(m, done)}/{m.lessons.length}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
