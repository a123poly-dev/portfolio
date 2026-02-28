import type { PropsWithChildren, ReactNode } from "react"
import { Heading } from "../Heading"

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
        <Heading type="heading-h2" as="h2" className={styles.title}>{title}</Heading>
        {coverClassName && (
          <div className={`${styles.cover} ${coverClassName}`} />
        )}
        {children}
      </div>
    </section>
  )
}
