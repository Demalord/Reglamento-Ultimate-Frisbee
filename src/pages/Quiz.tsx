import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { ProgressBar } from '../components/ProgressBar'
import { RichText } from '../components/RichText'
import { getModule } from '../content/manifest'
import { getQuiz, submitQuiz, useMyResults, type QuizDoc } from '../lib/quizzes'

// Estado del intento en curso, guardado en el navegador para sobrevivir a una recarga.
// El resultado definitivo va a Firestore; esto es solo una comodidad.
interface Draft {
  startedAt: number
  orders: number[][] // orden barajado de opciones por pregunta
  selections: (number | null)[] // índice ORIGINAL elegido por pregunta
  current: number
}

const draftKey = (uid: string, m: number) => `quiz-draft:${uid}:${m}`
function loadDraft(key: string): Draft | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Draft) : null
  } catch {
    return null
  }
}
function saveDraft(key: string, d: Draft | null) {
  try {
    if (d) localStorage.setItem(key, JSON.stringify(d))
    else localStorage.removeItem(key)
  } catch {
    /* sin almacenamiento: el intento sigue en memoria */
  }
}
function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const mmss = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function Quiz() {
  const { moduleId } = useParams()
  const m = Number(moduleId)
  const mod = getModule(m)
  const { user, profile } = useAuth()
  const results = useMyResults(user?.uid)
  const [quiz, setQuiz] = useState<QuizDoc | null | undefined>(undefined)

  useEffect(() => {
    getQuiz(m).then(setQuiz)
  }, [m])

  if (!mod || !user) return <Navigate to="/" replace />
  if (results === null || quiz === undefined) {
    return (
      <div className="center-screen" role="status">
        <span className="spinner" aria-hidden="true" />
        <span className="sr-only">Cargando quiz…</span>
      </div>
    )
  }
  if (results[m]) return <Navigate to={`/quiz/${m}/resultado`} replace />
  if (!quiz || !quiz.active) {
    return (
      <article className="leccion">
        <Link to="/" className="back-link">Volver a la cancha</Link>
        <h1>Este quiz no está disponible</h1>
        <p>El quiz del módulo {m} aún no está abierto o ya se cerró. Cuando el admin lo active aparecerá en el inicio.</p>
      </article>
    )
  }

  return <QuizRunner quiz={quiz} uid={user.uid} name={profile?.name ?? user.displayName ?? 'Sin nombre'} />
}

function QuizRunner({ quiz, uid, name }: { quiz: QuizDoc; uid: string; name: string }) {
  const navigate = useNavigate()
  const key = draftKey(uid, quiz.moduleId)
  const total = quiz.questions.length
  const limitMs = quiz.timeLimitMin ? quiz.timeLimitMin * 60_000 : null

  const [draft, setDraft] = useState<Draft | null>(() => loadDraft(key))
  const [reviewing, setReviewing] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const headRef = useRef<HTMLElement | null>(null)
  const setHead = (el: HTMLElement | null) => {
    headRef.current = el
  }
  const name_ = useId()

  const update = useCallback(
    (d: Draft | null) => {
      setDraft(d)
      saveDraft(key, d)
    },
    [key],
  )

  const remaining = draft && limitMs ? draft.startedAt + limitMs - now : null
  const timedOut = remaining !== null && remaining <= 0

  const send = useCallback(
    async (byTimeout: boolean) => {
      if (!draft || sending) return
      setSending(true)
      setError(null)
      try {
        await submitQuiz(uid, name, quiz, draft.selections, byTimeout)
        saveDraft(key, null)
        navigate(`/quiz/${quiz.moduleId}/resultado`, { replace: true })
      } catch (e) {
        console.error(e)
        setError('No se pudo enviar el quiz. Revisa tu conexión e inténtalo de nuevo; tus respuestas siguen guardadas.')
        setSending(false)
      }
    },
    [draft, sending, uid, name, quiz, key, navigate],
  )

  // Reloj: un tic por segundo mientras haya tiempo límite
  useEffect(() => {
    if (!draft || !limitMs) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [draft, limitMs])

  // Se acabó el tiempo → se envía solo, con lo que haya respondido
  useEffect(() => {
    if (timedOut && !sending && !error) void send(true)
  }, [timedOut, sending, error, send])

  useEffect(() => {
    headRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0 })
  }, [draft?.current, reviewing])

  const start = () =>
    update({
      startedAt: Date.now(),
      orders: quiz.questions.map((q) => shuffled(q.options.length)),
      selections: quiz.questions.map(() => null),
      current: 0,
    })

  const answered = useMemo(() => draft?.selections.filter((s) => s !== null).length ?? 0, [draft])

  // ── Antes de empezar ──
  if (!draft) {
    return (
      <article className="leccion">
        <Link to="/" className="back-link">Volver a la cancha</Link>
        <header className="leccion-head">
          <span className="brush">Quiz del módulo {quiz.moduleId}</span>
          <h1 ref={setHead} tabIndex={-1}>{quiz.title}</h1>
        </header>
        <ul className="quiz-rules">
          <li><strong>{total} preguntas</strong> de opción múltiple.</li>
          {quiz.timeLimitMin && <li><strong>{quiz.timeLimitMin} minutos</strong>. Si se acaba el tiempo, se envía con lo que hayas respondido.</li>}
          <li><strong>Un solo intento.</strong> Puedes moverte entre preguntas y cambiar respuestas antes de enviar.</li>
          <li>Las respuestas correctas y las explicaciones las ves al final.</li>
        </ul>
        <div className="leccion-actions">
          <button type="button" className="btn btn-primary" onClick={start}>Empezar quiz</button>
        </div>
      </article>
    )
  }

  const timer = remaining !== null && (
    <span className={`quiz-timer ${remaining < 60_000 ? 'is-low' : ''}`} aria-label={`Tiempo restante ${mmss(remaining)}`}>
      ⏱ {mmss(remaining)}
    </span>
  )

  // ── Revisión antes de enviar ──
  if (reviewing || timedOut) {
    const missing = total - answered
    return (
      <article className="leccion">
        <div className="quiz-bar">
          <ProgressBar value={answered} max={total} label="Preguntas respondidas" />
          {timer}
        </div>
        <h1 ref={setHead} tabIndex={-1}>{timedOut ? 'Se acabó el tiempo' : 'Revisa antes de enviar'}</h1>
        <p className="lede">
          {timedOut
            ? 'Estamos enviando tus respuestas.'
            : missing > 0
              ? `Te ${missing === 1 ? 'falta' : 'faltan'} ${missing} ${missing === 1 ? 'pregunta' : 'preguntas'} por responder. Las que dejes en blanco cuentan como incorrectas.`
              : 'Respondiste todas las preguntas.'}
        </p>
        <ol className="quiz-map" aria-label="Preguntas del quiz">
          {quiz.questions.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                className={`quiz-map-item ${draft.selections[i] !== null ? 'is-done' : ''}`}
                onClick={() => {
                  setReviewing(false)
                  update({ ...draft, current: i })
                }}
                disabled={timedOut}
                aria-label={`Pregunta ${i + 1}: ${draft.selections[i] !== null ? 'respondida' : 'sin responder'}`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <div aria-live="polite">{error && <p className="form-error">{error}</p>}</div>
        <div className="leccion-actions">
          <button type="button" className="btn btn-primary" onClick={() => send(timedOut)} disabled={sending}>
            {sending ? 'Enviando…' : error ? 'Reintentar envío' : 'Enviar quiz'}
          </button>
          {!timedOut && (
            <button type="button" className="btn btn-secondary" onClick={() => setReviewing(false)} disabled={sending}>
              Seguir revisando
            </button>
          )}
        </div>
      </article>
    )
  }

  // ── Pregunta actual ──
  const i = draft.current
  const q = quiz.questions[i]
  const order = draft.orders[i]
  const select = (orig: number) => {
    const selections = [...draft.selections]
    selections[i] = orig
    update({ ...draft, selections })
  }

  return (
    <article className="leccion">
      <div className="quiz-bar">
        <ProgressBar value={answered} max={total} label="Preguntas respondidas" />
        {timer}
      </div>

      <section className="question quiz-question" aria-labelledby={`${name_}-q`}>
        <fieldset>
          <legend id={`${name_}-q`}>
            <span className="question-heading" ref={setHead} tabIndex={-1}>
              Pregunta {i + 1} de {total}
            </span>
            <span className="question-prompt"><RichText text={q.prompt} plain /></span>
          </legend>
          <div className="options">
            {order.map((orig, pos) => (
              <label key={orig} className={`option ${draft.selections[i] === orig ? 'is-selected' : ''}`}>
                <input
                  type="radio"
                  name={`${name_}-${i}`}
                  checked={draft.selections[i] === orig}
                  onChange={() => select(orig)}
                />
                <span className="option-letter" aria-hidden="true">{String.fromCharCode(65 + pos)}</span>
                <span className="option-text"><RichText text={q.options[orig]} plain /></span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <div className="leccion-actions quiz-nav">
        {i > 0 && (
          <button type="button" className="btn btn-secondary" onClick={() => update({ ...draft, current: i - 1 })}>
            Anterior
          </button>
        )}
        {i < total - 1 ? (
          <button type="button" className="btn btn-primary" onClick={() => update({ ...draft, current: i + 1 })}>
            Siguiente
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setReviewing(true)}>
            Revisar y enviar
          </button>
        )}
      </div>
    </article>
  )
}
