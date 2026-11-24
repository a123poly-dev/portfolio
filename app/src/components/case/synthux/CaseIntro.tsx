import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

export type TCaseMeta = {
  label: string
  value: ReactNode
}

type TCaseIntroProps = {
  eyebrow: string
  title: string
  lead?: ReactNode
  meta?: TCaseMeta[]
  // Cover image or motion. Leave empty for a plain light cover.
  cover?: ReactNode
}

export const CaseIntro = ({
  eyebrow,
  title,
  lead,
  meta = [],
  cover,
}: TCaseIntroProps) => (
  <header className={styles.intro}>
    <div className={styles.container}>
      <Reveal className={styles.introText}>
        <span className={styles.label}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </Reveal>

      <Reveal delay={120} className={styles.cover}>
        {cover ?? <div className={styles.coverPlain} aria-hidden="true" />}
      </Reveal>

      {meta.length > 0 && (
        <Reveal delay={240}>
          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </div>
  </header>
)
