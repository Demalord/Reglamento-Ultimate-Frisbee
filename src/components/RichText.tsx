import { Fragment } from 'react'
import { Term } from './Term'

/**
 * Formato en línea mínimo y seguro (sin innerHTML):
 *   **negrita**   [[término]]   [[slug|texto]]
 */
const TOKEN = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g

/** plain: los términos se muestran como texto (para opciones de pregunta, donde un botón interno marcaría la opción). */
export function RichText({ text, plain = false }: { text: string; plain?: boolean }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const [key, label] = part.slice(2, -2).split('|')
          const shown = (label ?? key).trim()
          return plain ? <Fragment key={i}>{shown}</Fragment> : <Term key={i} termKey={key.trim()} label={shown} />
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
