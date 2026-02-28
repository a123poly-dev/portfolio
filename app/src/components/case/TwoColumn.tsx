import type { ReactNode } from "react"

import styles from "./TwoColumn.module.scss"

type TTwoColumnProps = {
  left: ReactNode
  right: ReactNode
  className?: string
}

export const TwoColumn = ({ left, right, className }: TTwoColumnProps) => {
  return (
    <div className={`${styles.grid} ${className ?? ""}`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}
