import type { ReactNode } from "react"
import cn from "classnames"

import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import styles from "./MarkerText.module.scss"

type TMarkProps = {
  children: ReactNode
  // Wait before the pen starts, in ms
  delay?: number
}

// A marker highlight that draws itself left to right, line by line, once the
// phrase is mostly in view. Idea from Marker Text by Kokonut UI (MIT), rebuilt
// in SCSS without Tailwind. Reduced motion shows the mark already drawn.
export const Mark = ({ children, delay = 0 }: TMarkProps) => {
  const { ref, inView } = useInView<HTMLElement>(0.6)
  const reduced = usePrefersReducedMotion()

  return (
    <mark
      ref={ref}
      className={cn(styles.mark, (inView || reduced) && styles.drawn, reduced && styles.still)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </mark>
  )
}
