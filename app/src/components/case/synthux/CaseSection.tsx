import cn from "classnames"
import type { PropsWithChildren, ReactNode } from "react"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

type TCaseSectionProps = {
  // Kept for reference only. Section eyebrows are not shown.
  label?: string
  title?: ReactNode
  id?: string
  className?: string
} & PropsWithChildren

// A case section: heading, then content in a stack.
// Text blocks should be wrapped in CaseText to keep a readable line length.
export const CaseSection = ({
  title,
  id,
  className,
  children,
}: TCaseSectionProps) => (
  <section id={id} className={cn(styles.section, className)}>
    <div className={styles.container}>
      {title && (
        <Reveal className={cn(styles.sectionHead, styles.measure)}>
          <h2 className={styles.heading}>{title}</h2>
        </Reveal>
      )}
      <div className={styles.stack}>{children}</div>
    </div>
  </section>
)

type TCaseTextProps = {
  className?: string
} & PropsWithChildren

// Body text at a readable line length.
export const CaseText = ({ className, children }: TCaseTextProps) => (
  <Reveal className={cn(styles.body, styles.measure, className)}>
    {children}
  </Reveal>
)

type TCaseSplitProps = {
  left: ReactNode
  right: ReactNode
}

// Two columns when there is room, one when there is not.
export const CaseSplit = ({ left, right }: TCaseSplitProps) => (
  <div className={styles.split}>
    <Reveal>{left}</Reveal>
    <Reveal delay={120}>{right}</Reveal>
  </div>
)

type TCaseSectionPairProps = {
  items: { title: ReactNode; content: ReactNode }[]
}

// Two short sections side by side, each with its own heading. One column when narrow.
export const CaseSectionPair = ({ items }: TCaseSectionPairProps) => (
  <section className={styles.section}>
    <div className={cn(styles.container, styles.pair)}>
      {items.map((item, index) => (
        <Reveal key={index} delay={index * 120} className={styles.pairItem}>
          <h2 className={styles.heading}>{item.title}</h2>
          <div className={styles.body}>{item.content}</div>
        </Reveal>
      ))}
    </div>
  </section>
)
