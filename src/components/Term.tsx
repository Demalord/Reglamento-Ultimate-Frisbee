import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { findTerm } from '../content/glosario'

/**
 * Término del glosario dentro del texto. Al tocarlo abre la definición
 * como una hoja fija abajo de la pantalla (nunca se sale del viewport,
 * funciona igual en celular y escritorio). Se cierra con Esc o tocando afuera.
 */
export function Term({ termKey, label }: { termKey: string; label: string }) {
  const entry = findTerm(termKey)
  const [open, setOpen] = useState(false)
  const id = useId()
  const btnRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!sheetRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    closeRef.current?.focus({ preventScroll: true }) // el foco entra a la definición
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (!entry) {
    if (import.meta.env.DEV) console.warn(`Término sin definición en el glosario: "${termKey}"`)
    return <>{label}</>
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="term"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      {open &&
        createPortal(
        <div ref={sheetRef} id={id} className="term-sheet" role="dialog" aria-label={`Definición: ${entry.term}`}>
          <div className="term-sheet-head">
            <strong>{entry.term}</strong>
            {entry.en !== entry.term && <span className="term-en">{entry.en}</span>}
            <button
              ref={closeRef}
              type="button"
              className="term-close"
              aria-label="Cerrar definición"
              onClick={() => {
                setOpen(false)
                btnRef.current?.focus({ preventScroll: true })
              }}
            >
              ×
            </button>
          </div>
          <p>{entry.definition}</p>
          <Link to={`/glosario?t=${entry.slug}`} onClick={() => setOpen(false)}>
            Ver en el glosario
          </Link>
        </div>,
          document.body,
        )}
    </>
  )
}
