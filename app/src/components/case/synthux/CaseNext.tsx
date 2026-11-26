import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

export type TNextCase = {
  to: string
  eyebrow: string
  title: string
  lead: string
}

type TCaseNextProps = {
  items: TNextCase[]
}

// Links to the other SynthUX cases at the end of a case.
export const CaseNext = ({ items }: TCaseNextProps) => {
  if (items.length === 0) return null

  return (
    <div className={styles.next}>
      {items.map((item, index) => (
        <Reveal key={item.to} delay={index * 120}>
          <Link
            to={item.to}
            className={styles.nextCard}
            data-track="next_case_click"
            data-track-from={location.pathname.replace(/^\//, "")}
            data-track-to={item.to.replace(/^\//, "")}
          >
            <span className={styles.label}>{item.eyebrow}</span>
            <span className={styles.subheading}>{item.title}</span>
            <span className={styles.small}>{item.lead}</span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
