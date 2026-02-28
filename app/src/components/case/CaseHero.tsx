import type { PropsWithChildren, ReactNode } from "react"

import styles from "./CaseHero.module.scss"

type TCaseHeroProps = {
  date: string
  title: ReactNode
  coverClassName?: string
} & PropsWithChildren

export const CaseHero = ({
  date,
  title,
  coverClassName,
  children,
}: TCaseHeroProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.date}>{date}</div>
        <h2 className={styles.title}>{title}</h2>
        {coverClassName && (
          <div className={`${styles.cover} ${coverClassName}`} />
        )}
        {children}
      </div>
    </section>
  )
}
