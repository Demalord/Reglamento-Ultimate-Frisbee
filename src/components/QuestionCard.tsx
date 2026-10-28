import { useId, useState } from 'react'
import type { Question } from '../content/types'
import { RichText } from './RichText'

interface Props {
  question: Question
  /** Se llama una sola vez, en el primer "Comprobar". */
  onAnswered?: (correct: boolean) => void
  /** Texto del encabezado (ej. "Pregunta de control", "Pregunta 2 de 6"). */
  heading: string
  /** Permite reintentar si falla (en lecciones sí, en el repaso no). */
  allowRetry?: boolean
}

/**
 * Pregunta de opción múltiple con feedback inmediato.
 * Radios nativos (teclado y lectores de pantalla funcionan solos),
 * feedback en aria-live, correcto/incorrecto con ícono + texto (no solo color).
 */
export function QuestionCard({ question, onAnswered, heading, allowRetry = true }: Props) {
  const name = useId()
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [reported, setReported] = useState(false)
  const isCorrect = selected === question.correct

  const check = () => {
    if (selected === null) return
    setChecked(true)
    if (!reported) {
      setReported(true)
      onAnswered?.(selected === question.correct)
    }
  }

  const retry = () => {
    setSelected(null)
    setChecked(false)
  }

  return (
    <section className="question" aria-labelledby={`${name}-legend`}>
      <fieldset disabled={checked}>
        <legend id={`${name}-legend`}>
          <span className="question-heading">{heading}</span>
          <span className="question-prompt">
            <RichText text={question.prompt} plain />
          </span>
        </legend>
        <div className="options">
          {question.options.map((opt, i) => {
            const state = !checked
              ? ''
              : i === question.correct
                ? 'is-correct'
                : i === selected
                  ? 'is-wrong'
                  : 'is-dim'
            return (
              <label key={i} className={`option ${selected === i ? 'is-selected' : ''} ${state}`}>
                <input
                  type="radio"
                  name={name}
                  value={i}
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span className="option-letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option-text">
                  <RichText text={opt} plain />
                </span>
                {checked && i === question.correct && <span className="sr-only"> (respuesta correcta)</span>}
                {checked && i === selected && i !== question.correct && <span className="sr-only"> (tu respuesta)</span>}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {checked && (
          <div className={`feedback ${isCorrect ? 'feedback-ok' : 'feedback-bad'}`}>
            <p className="feedback-title">
              <span aria-hidden="true">{isCorrect ? '✓' : '✗'}</span>{' '}
              {isCorrect ? '¡Correcto!' : `No es correcto. La respuesta es la ${String.fromCharCode(65 + question.correct)}.`}
            </p>
            <p>
              <RichText text={question.explanation} />
            </p>
            <p className="feedback-rule">Regla {question.ruleRef}</p>
          </div>
        )}
      </div>

      {!checked ? (
        <button type="button" className="btn btn-primary" onClick={check} disabled={selected === null}>
          Comprobar respuesta
        </button>
      ) : (
        !isCorrect &&
        allowRetry && (
          <button type="button" className="btn btn-secondary" onClick={retry}>
            Intentar otra vez
          </button>
        )
      )}
    </section>
  )
}
