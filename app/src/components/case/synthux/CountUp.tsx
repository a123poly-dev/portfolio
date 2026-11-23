import { useEffect, useState } from "react"
import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import styles from "./Synthux.module.scss"

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

type TCountUpProps = {
  value: number
  // Matches the Figma hero motion: 1.8 s, cubic-out
  duration?: number
  suffix?: string
}

// Counts up from 0 when scrolled into view. Shows the final number at once
// when the visitor has reduced motion on. Screen readers get the final number.
export const CountUp = ({ value, duration = 1800, suffix = "" }: TCountUpProps) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setShown(Math.round(easeOutCubic(t) * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value, duration])

  const display = reduced ? value : shown

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {display.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className={styles.srOnly}>
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  )
}

export type TStat = {
  value: number
  suffix?: string
  label: string
}

type TStatGridProps = {
  items: TStat[]
}

// Real counts only. Each tile counts up when it scrolls into view.
export const StatGrid = ({ items }: TStatGridProps) => (
  <div className={styles.stats}>
    {items.map((item) => (
      <div key={item.label} className={styles.stat}>
        <span className={styles.statValue}>
          <CountUp value={item.value} suffix={item.suffix} />
        </span>
        <span className={styles.small}>{item.label}</span>
      </div>
    ))}
  </div>
)
