import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

type TDecisionBlockProps = {
  title: ReactNode
  options: ReactNode[]
  choice: ReactNode
  why: ReactNode
  cost: ReactNode
  // "pairs": two columns, Options + Choice on the left, Why + Cost on the right
  layout?: "grid" | "pairs"
}

// Every decision in a case is written as options, choice, why and cost.
export const DecisionBlock = ({
  title,
  options,
  choice,
  why,
  cost,
  layout = "grid",
}: TDecisionBlockProps) => {
  const optionsCell = (
    <div>
      <span className={styles.decisionLabel}>Options</span>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  )
  const choiceCell = (
    <div>
      <span className={styles.decisionLabel}>Choice</span>
      <p className={styles.decisionChoice}>{choice}</p>
    </div>
  )
  const whyCell = (
    <div>
      <span className={styles.decisionLabel}>Why</span>
      <p>{why}</p>
    </div>
  )
  const costCell = (
    <div>
      <span className={styles.decisionLabel}>Cost</span>
      <p>{cost}</p>
    </div>
  )

  return (
    <Reveal>
      <article className={styles.decision}>
        <h3 className={styles.subheading}>{title}</h3>
        {layout === "pairs" ? (
          <div className={`${styles.decisionPairs} ${styles.body}`}>
            <div>
              {optionsCell}
              {choiceCell}
            </div>
            <div>
              {whyCell}
              {costCell}
            </div>
          </div>
        ) : (
          <div className={`${styles.decisionGrid} ${styles.body}`}>
            {optionsCell}
            {choiceCell}
            {whyCell}
            {costCell}
          </div>
        )}
      </article>
    </Reveal>
  )
}
