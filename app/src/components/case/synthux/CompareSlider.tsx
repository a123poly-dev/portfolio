import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { Reveal } from "./Reveal"
import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import styles from "./Synthux.module.scss"

type TImage = {
  src: string
  alt: string
  label: string
}

type TCompareSliderProps = {
  before: TImage
  after: TImage
  // Pixel size of the exports. Both images must have the same size.
  width: number
  height: number
  caption?: ReactNode
}

// Drag, tap or use arrow keys to compare two approved screens.
// On first view the handle sweeps once to show it can move (skipped with reduced motion).
export const CompareSlider = ({
  before,
  after,
  width,
  height,
  caption,
}: TCompareSliderProps) => {
  const [position, setPosition] = useState(50)
  const [touched, setTouched] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>(0.5)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!inView || reduced || touched) return

    const keyframes = [50, 30, 70, 50]
    const duration = 1600
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const segment = Math.min(Math.floor(t * 3), 2)
      const local = t * 3 - segment
      const eased = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2
      const from = keyframes[segment]
      const to = keyframes[segment + 1]
      setPosition(from + (to - from) * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // Run the sweep only once, when it first comes into view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  return (
    <Reveal>
      <figure data-demo="compare_slider" className={styles.figure}>
        <div
          ref={ref}
          className={styles.compare}
          style={{ "--sx-pos": `${position}%` } as CSSProperties}
        >
          <img src={before.src} alt={before.alt} width={width} height={height} loading="lazy" />
          <div className={styles.compareAfter}>
            <img src={after.src} alt={after.alt} width={width} height={height} loading="lazy" />
          </div>
          <span className={`${styles.compareTag} ${styles.compareTagBefore}`}>{before.label}</span>
          <span className={`${styles.compareTag} ${styles.compareTagAfter}`}>{after.label}</span>
          <div className={styles.compareHandle} aria-hidden="true" />
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(position)}
            onChange={(event) => {
              setTouched(true)
              setPosition(Number(event.target.value))
            }}
            onPointerDown={() => setTouched(true)}
            className={styles.compareRange}
            aria-label={`Compare ${before.label} and ${after.label}`}
            aria-valuetext={`${Math.round(position)}% ${before.label}`}
          />
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}
