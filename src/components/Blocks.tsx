import type { Block } from '../content/types'
import { RichText } from './RichText'

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            )
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul'
            return (
              <Tag key={i} className="block-list">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichText text={it} />
                  </li>
                ))}
              </Tag>
            )
          }
          case 'rule':
            return (
              <aside key={i} className="block-rule" aria-label={`Regla ${b.ref}`}>
                <span className="block-rule-ref">Regla {b.ref}</span>
                <p>
                  <RichText text={b.text} />
                </p>
              </aside>
            )
          case 'example':
            return (
              <aside key={i} className="block-example" aria-label="Ejemplo en la cancha">
                <span className="block-example-label">{b.title ?? 'En la cancha'}</span>
                <p>
                  <RichText text={b.text} />
                </p>
              </aside>
            )
          case 'key':
            return (
              <p key={i} className="block-key">
                <RichText text={b.text} />
              </p>
            )
        }
      })}
    </>
  )
}
