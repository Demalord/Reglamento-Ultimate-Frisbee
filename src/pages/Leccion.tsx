import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { Blocks } from '../components/Blocks'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'
import { getLessonContent } from '../content'
import type { Question } from '../content/types'
import { getModule, rulesLabel } from '../content/manifest'
import { lessonStatus } from '../lib/progress'

/** Cuántas preguntas de control hay por lección antes de reiniciar el módulo. */
export const MAX_ATTEMPTS = 3

/**
 * Lección guiada (staged disclosure):
 *   pasos que se revelan con "Continuar" → pregunta de control → completar.
 * Pregunta de control: 3 preguntas distintas. Si falla una, pasa a la siguiente;
 * si falla las 3, debe repetir el módulo completo. Los fallos se guardan en
 * Firestore, así que recargar no los reinicia.
 * Si la lección ya está completada, se muestra todo en modo práctica, sin penalización.
 */

/** Monta una instancia nueva por lección, así el estado arranca limpio. */
export function Leccion() {
  const { lessonId } = useParams()
  return <LeccionView key={lessonId} />
}

function LeccionView() {
  const { moduleId, lessonId } = useParams()
  const mod = getModule(Number(moduleId))
  const { done, isAdmin, completeLesson } = useAuth()
  const navigate = useNavigate()

  const content = lessonId ? getLessonContent(lessonId) : undefined
  const totalSteps = content?.steps.length ?? 0
  const alreadyDone = !!lessonId && done.has(lessonId)

  // revealed: cuántos pasos se ven; totalSteps + 1 = también la pregunta.
  // Lección ya completada → todo visible para repasar.
  const [revealed, setRevealed] = useState(() => (alreadyDone ? totalSteps + 1 : 1))
  const [passed, setPassed] = useState(alreadyDone)
  const [saving, setSaving] = useState(false)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const idx = mod?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  const lesson = mod && idx >= 0 ? mod.lessons[idx] : null
  if (!mod || !lesson) return <Navigate to="/" replace />
  if (lessonStatus(lesson, done, isAdmin) === 'locked') return <Navigate to={`/modulo/${mod.id}`} replace />

  const nextInModule = mod.lessons[idx + 1]
  const nextPath = nextInModule ? `/modulo/${mod.id}/leccion/${nextInModule.id}` : `/modulo/${mod.id}`
  const nextLabel = nextInModule ? 'Siguiente lección' : 'Volver al módulo'

  const reveal = () => {
    const n = revealed + 1
    setRevealed(n)
    // Mueve el foco al nuevo paso (teclado y lectores de pantalla) y lo muestra
    requestAnimationFrame(() => {
      const el = stepRefs.current[n - 1]
      el?.focus({ preventScroll: true })
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const finish = async () => {
    setSaving(true)
    try {
      await completeLesson(lesson.id)
      navigate(nextPath)
    } finally {
      setSaving(false)
    }
  }

  // ── Lección sin contenido todavía (módulos en preparación) ──
  if (!content) {
    return (
      <article className="leccion">
        <LessonBar moduleId={mod.id} value={idx + 1} max={mod.lessons.length} />
        <h1>{lesson.title}</h1>
        <p className="muted">{rulesLabel(lesson.rules)}</p>
        <div className="notice">
          <p style={{ marginBottom: 0 }}>Esta lección está en preparación.</p>
        </div>
        {isAdmin && !alreadyDone && (
          <div className="leccion-actions">
            <button type="button" className="btn btn-secondary" onClick={finish} disabled={saving}>
              Marcar como completada (admin)
            </button>
          </div>
        )}
      </article>
    )
  }

  const showQuestion = revealed > totalSteps

  return (
    <article className="leccion">
      <LessonBar moduleId={mod.id} value={Math.min(revealed, totalSteps + 1)} max={totalSteps + 1} label="Avance de la lección" />

      <header className="leccion-head">
        <p className="leccion-kicker">
          Lección {idx + 1} de {mod.lessons.length}. {rulesLabel(lesson.rules)}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lede">{content.intro}</p>
      </header>

      <ol className="steps">
        {content.steps.slice(0, revealed).map((step, i) => (
          <li key={i} className="step">
            <section aria-labelledby={`step-${i}`}>
              <h2
                id={`step-${i}`}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                tabIndex={-1}
                className="step-title"
              >
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                {step.title}
              </h2>
              <div className="step-body">
                <Blocks blocks={step.blocks} />
              </div>
            </section>
          </li>
        ))}
      </ol>

      {!showQuestion && (
        <div className="leccion-actions">
          <button type="button" className="btn btn-primary" onClick={reveal}>
            {revealed === totalSteps ? 'Ir a la pregunta' : 'Continuar'}
          </button>
          <span className="muted step-count" aria-hidden="true">
            Paso {revealed} de {totalSteps}
          </span>
        </div>
      )}

      {showQuestion && (
        <div
          className="checkpoint"
          ref={(el) => {
            stepRefs.current[totalSteps] = el
          }}
          tabIndex={-1}
        >
          <Checkpoint
            lessonId={lesson.id}
            moduleId={mod.id}
            moduleLessonIds={mod.lessons.map((l) => l.id)}
            questions={content.checkpoints}
            practice={alreadyDone}
            onPassed={() => setPassed(true)}
          />
        </div>
      )}

      {showQuestion && (passed || alreadyDone) && (
        <div className="leccion-actions">
          {alreadyDone ? (
            <Link className="btn btn-primary" to={nextPath}>
              {nextLabel}
            </Link>
          ) : (
            <button type="button" className="btn btn-primary" onClick={finish} disabled={saving}>
              {saving ? 'Guardando…' : 'Completar lección'}
            </button>
          )}
        </div>
      )}
    </article>
  )
}

function LessonBar({ moduleId, value, max, label = 'Lección dentro del módulo' }: { moduleId: number; value: number; max: number; label?: string }) {
  return (
    <div className="leccion-bar">
      <Link to={`/modulo/${moduleId}`} className="back-link">
        Módulo {moduleId}
      </Link>
      <ProgressBar value={value} max={max} label={label} />
    </div>
  )
}

interface CheckpointProps {
  lessonId: string
  moduleId: number
  moduleLessonIds: string[]
  questions: Question[]
  practice: boolean
  onPassed: () => void
}

function Checkpoint({ lessonId, moduleId, moduleLessonIds, questions, practice, onPassed }: CheckpointProps) {
  const { failedChecks, recordFailedCheck, resetModule } = useAuth()
  const navigate = useNavigate()
  const fails = practice ? 0 : failedChecks(lessonId)

  // Pregunta que se está mostrando. Arranca en la que toca según los fallos guardados.
  const [shown, setShown] = useState(() => Math.min(fails, MAX_ATTEMPTS - 1))
  // Resultado de la pregunta mostrada: null (sin responder), true o false
  const [result, setResult] = useState<boolean | null>(null)
  const [resetting, setResetting] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)

  const failedOut = !practice && fails >= MAX_ATTEMPTS

  const onAnswered = async (ok: boolean) => {
    setResult(ok)
    if (ok) {
      onPassed()
      return
    }
    if (!practice) await recordFailedCheck(lessonId)
  }

  const nextQuestion = () => {
    setShown((n) => (practice ? (n + 1) % questions.length : n + 1))
    setResult(null)
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }))
  }

  const restartModule = async () => {
    setResetting(true)
    try {
      await resetModule(moduleId, moduleLessonIds)
      navigate(`/modulo/${moduleId}`)
    } finally {
      setResetting(false)
    }
  }

  // ── Falló las tres: tiene que repetir el módulo ──
  if (failedOut && result === null) {
    return (
      <div className="failed-out" role="alert">
        <span className="brush">Hay que repetir el módulo</span>
        <h2>Fallaste las {MAX_ATTEMPTS} preguntas de esta lección</h2>
        <p>
          Para seguir, vuelve a recorrer el módulo {moduleId} desde la primera lección. Así llegas a la siguiente con
          las bases claras.
        </p>
        <button type="button" className="btn btn-primary" onClick={restartModule} disabled={resetting}>
          {resetting ? 'Reiniciando…' : `Repetir el módulo ${moduleId}`}
        </button>
      </div>
    )
  }

  const attempt = shown + 1
  const lastChance = !practice && attempt === MAX_ATTEMPTS

  return (
    <div className="checkpoint-wrap">
      <div ref={headingRef} tabIndex={-1} className="attempts" aria-live="polite">
        {practice ? (
          <span>Modo práctica: sin penalización.</span>
        ) : (
          <>
            <span className="attempts-dots" aria-hidden="true">
              {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (
                <span
                  key={i}
                  className={`attempt-dot ${i < fails ? 'is-used' : ''} ${i === shown && result === null ? 'is-current' : ''}`}
                />
              ))}
            </span>
            <span>
              Pregunta {attempt} de {MAX_ATTEMPTS}
              {lastChance && result === null ? '. Es la última: si fallas, repites el módulo.' : '.'}
            </span>
          </>
        )}
      </div>

      <QuestionCard
        key={`${lessonId}-${shown}`}
        heading="Pregunta de control"
        question={questions[shown]}
        allowRetry={false}
        onAnswered={onAnswered}
      />

      {result === false && (
        <div className="leccion-actions">
          {practice || fails < MAX_ATTEMPTS ? (
            <button type="button" className="btn btn-primary" onClick={nextQuestion}>
              Otra pregunta
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setResult(null)}>
              Continuar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
