import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

type TDecisionBlockProps = {
  title: string
  options: ReactNode[]
  choice: ReactNode
  why: ReactNode
  cost: ReactNode
}

// Every decision in a case is written as options, choice, why and cost.
export const DecisionBlock = ({
  title,
  options,
  choice,
  why,
  cost,
}: TDecisionBlockProps) => (
  <Reveal>
    <article className={styles.decision}>
      <h3 className={styles.subheading}>{title}</h3>
      <div className={`${styles.decisionGrid} ${styles.body}`}>
        <div>
          <span className={styles.decisionLabel}>Options</span>
          <ul>
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className={styles.decisionLabel}>Choice</span>
          <p className={styles.decisionChoice}>{choice}</p>
        </div>
        <div>
          <span className={styles.decisionLabel}>Why</span>
          <p>{why}</p>
        </div>
        <div>
          <span className={styles.decisionLabel}>Cost</span>
          <p>{cost}</p>
        </div>
      </div>
    </article>
  </Reveal>
)
