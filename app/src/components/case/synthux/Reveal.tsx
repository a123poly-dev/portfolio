import cn from "classnames"
import type { CSSProperties, PropsWithChildren } from "react"
import { useInView } from "./useInView"

import styles from "./Synthux.module.scss"

type TRevealProps = {
  // Delay in ms, for a gentle stagger between items
  delay?: number
  className?: string
} & PropsWithChildren

export const Reveal = ({ delay = 0, className, children }: TRevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(styles.reveal, inView && styles.isVisible, className)}
      style={{ "--sx-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
