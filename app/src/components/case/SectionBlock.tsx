import type { PropsWithChildren } from "react"
import styles from "./SectionBlock.module.scss"

type TSectionBlockProps = {
  className?: string
} & PropsWithChildren

export const SectionBlock = ({ children, className }: TSectionBlockProps) => {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.container}>{children}</div>
    </section>
  )
}
