import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BarList, ScoreHistogram } from '../../components/Charts'
import { getModule } from '../../content/manifest'
import { DEFAULT_TIME_LIMIT_MIN, QUIZ_BANK } from '../../content/quizBank'
import { activateQuiz, deactivateQuiz, formatDay, PASS_RATIO, resetAttempt, saveSchedule } from '../../lib/quizzes'
import { useAdminData } from './useAdminData'

export function AdminQuiz() {
  const { moduleId } = useParams()
  const m = Number(moduleId)
  const mod = getModule(m)
  const { students, quizzes, schedule, byModule, loading, error } = useAdminData()

  const [minutes, setMinutes] = useState(String(DEFAULT_TIME_LIMIT_MIN))
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  // Al cargar el calendario, llena el formulario con lo guardado
  const sched = schedule?.[m]
  useEffect(() => {
    if (!sched) return
    setDate(sched.opensOn ?? '')
    setNote(sched.note ?? '')
  }, [sched])

  if (!mod) return <Navigate to="/admin" replace />
  if (error) return <p className="form-error" role="alert">{error}</p>
  if (loading || !students || !quizzes || !schedule) return <p className="muted" role="status">Cargando quiz…</p>

  const quiz = quizzes[m]
  const bank = QUIZ_BANK[m] ?? []
  const results = Object.values(byModule[m] ?? {}).filter((r) => students.some((s) => s.uid === r.uid))
  const missing = students.filter((s) => !byModule[m]?.[s.uid])
  const avg = results.length ? results.reduce((s, r) => s + r.score / r.total, 0) / results.length : 0

  const run = async (label: string, fn: () => Promise<void>, done: string) => {
    setBusy(label)
    setMsg(null)
    try {
      await fn()
      setMsg(done)
    } catch (e) {
      console.error(e)
      setMsg('No se pudo guardar. Revisa tu conexión y las reglas de Firestore.')
    } finally {
      setBusy(null)
    }
  }

  const activate = () => {
    const mins = Number(minutes)
    const limit = Number.isFinite(mins) && mins > 0 ? Math.round(mins) : null
    if (!window.confirm(`¿Abrir el quiz del módulo ${m} para todo el equipo?`)) return
    run('activate', () => activateQuiz(m, `Quiz del módulo ${m}: ${mod.title}`, bank, limit), 'Quiz abierto. Ya aparece en el inicio de los estudiantes.')
  }
  const deactivate = () => {
    if (!window.confirm('¿Cerrar el quiz? Los estudiantes que no lo presentaron ya no podrán hacerlo.')) return
    run('deactivate', () => deactivateQuiz(m), 'Quiz cerrado. Los resultados se conservan.')
  }

  // Aciertos por pregunta (el orden de answers es el orden de las preguntas)
  const questions = quiz?.questions ?? bank
  const perQuestion = questions.map((q, i) => {
    const ok = results.filter((r) => r.answers[i]?.correct).length
    return { key: String(i), label: `${i + 1}. ${q.prompt}`, value: ok, max: results.length, flag: results.length > 0 && ok / results.length < PASS_RATIO }
  })

  const exportCsv = () => {
    const rows = [
      ['Estudiante', 'Correo', 'Puntaje', 'Total', 'Porcentaje', 'Fecha', 'Tiempo agotado'],
      ...students.map((s) => {
        const r = byModule[m]?.[s.uid]
        return r
          ? [s.name, s.email, r.score, r.total, `${Math.round((r.score / r.total) * 100)}%`, r.submittedAt?.toDate().toLocaleString('es-CO') ?? '', r.timedOut ? 'sí' : 'no']
          : [s.name, s.email, '', '', '', 'No presentó', '']
      }),
    ]
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `quiz-modulo-${m}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="admin">
      <Link to="/admin" className="back-link">Panel del equipo</Link>
      <h1>Quiz del módulo {m}</h1>
      <p className="lede">{mod.title}. {bank.length} preguntas.</p>

      <div aria-live="polite">{msg && <p className="admin-msg">{msg}</p>}</div>

      <section className="admin-card" aria-labelledby="estado">
        <h2 id="estado">Estado</h2>
        {quiz?.active ? (
          <>
            <p>
              <span className="status-pill is-open">● Abierto</span>{' '}
              {quiz.timeLimitMin ? `${quiz.timeLimitMin} minutos.` : 'Sin límite de tiempo.'} {results.length}/{students.length} lo presentaron.
            </p>
            <button type="button" className="btn btn-secondary" onClick={deactivate} disabled={busy !== null}>
              {busy === 'deactivate' ? 'Cerrando…' : 'Cerrar quiz'}
            </button>
          </>
        ) : (
          <>
            <p>
              <span className={`status-pill is-${quiz ? 'closed' : 'idle'}`}>{quiz ? 'Cerrado' : 'Sin activar'}</span>{' '}
              Mientras esté cerrado, los estudiantes no lo ven.
            </p>
            <div className="field-row">
              <label htmlFor="mins">Tiempo límite (minutos, 0 = sin límite)</label>
              <input id="mins" type="number" min={0} max={120} inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={activate} disabled={busy !== null || bank.length === 0}>
              {busy === 'activate' ? 'Abriendo…' : quiz ? 'Volver a abrir' : 'Abrir quiz'}
            </button>
          </>
        )}
      </section>

      <section className="admin-card" aria-labelledby="anuncio">
        <h2 id="anuncio">Anuncio</h2>
        <p className="muted">
          Los estudiantes ven la fecha en el inicio y en el módulo para prepararse. El quiz no se abre solo: lo abres tú ese día.
        </p>
        <div className="field-row">
          <label htmlFor="date">Fecha del quiz</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field-row">
          <label htmlFor="note">Nota para el equipo (opcional)</label>
          <input id="note" type="text" maxLength={140} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ej. repasen el conteo y los reinicios" />
        </div>
        <div className="leccion-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy !== null}
            onClick={() => run('sched', () => saveSchedule(m, date || null, note.trim()), date ? `Anunciado para el ${formatDay(date)}.` : 'Anuncio quitado.')}
          >
            {busy === 'sched' ? 'Guardando…' : 'Guardar anuncio'}
          </button>
          {sched?.opensOn && (
            <button type="button" className="btn btn-secondary" disabled={busy !== null} onClick={() => run('unsched', () => saveSchedule(m, null, ''), 'Anuncio quitado.')}>
              Quitar anuncio
            </button>
          )}
        </div>
      </section>

      <section className="admin-card" aria-labelledby="resultados">
        <div className="admin-card-head">
          <h2 id="resultados">Resultados</h2>
          <button type="button" className="btn btn-secondary" onClick={exportCsv} disabled={students.length === 0}>
            Exportar CSV
          </button>
        </div>
        {results.length === 0 ? (
          <p className="muted">Todavía nadie lo ha presentado.</p>
        ) : (
          <>
            <p>
              Promedio del equipo: <strong>{Math.round(avg * 100)} %</strong>. Aprobaron{' '}
              <strong>{results.filter((r) => r.score / r.total >= PASS_RATIO).length}</strong> de {results.length}.
            </p>
            <ScoreHistogram scores={results.map((r) => r.score)} total={questions.length} />

            <h3>Aciertos por pregunta</h3>
            <p className="muted">Las marcadas con ⚠ las acertó menos del {Math.round(PASS_RATIO * 100)} % del equipo: buen tema para el entrenamiento.</p>
            <BarList data={perQuestion} unit="pct" caption="Porcentaje del equipo que acertó cada pregunta" />
          </>
        )}

        <h3>Por estudiante</h3>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col" className="num">Puntaje</th>
                <th scope="col">Fecha</th>
                <th scope="col"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const r = byModule[m]?.[s.uid]
                return (
                  <tr key={s.uid}>
                    <th scope="row">
                      <Link to={`/admin/estudiante/${s.uid}`}>{s.name}</Link>
                    </th>
                    <td className="num" data-label="Puntaje">
                      {r ? `${r.score}/${r.total}` : <span className="muted">No presentó</span>}
                    </td>
                    <td data-label="Fecha" className="cell-date">
                      {r?.submittedAt ? r.submittedAt.toDate().toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                    <td className="cell-actions">
                      {r && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-small"
                          disabled={busy !== null}
                          onClick={() => {
                            if (!window.confirm(`¿Borrar el intento de ${s.name}? Podrá presentar el quiz otra vez si está abierto.`)) return
                            run(`reset-${s.uid}`, () => resetAttempt(s.uid, m), `Intento de ${s.name} borrado.`)
                          }}
                        >
                          Reiniciar intento
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {missing.length > 0 && results.length > 0 && (
          <p className="muted">
            Faltan: {missing.map((s) => s.name.split(' ')[0]).join(', ')}.
          </p>
        )}
      </section>
    </div>
  )
}
