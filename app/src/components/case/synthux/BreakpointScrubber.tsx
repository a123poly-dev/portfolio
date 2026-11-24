import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { Reveal } from "./Reveal"
import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import styles from "./BreakpointScrubber.module.scss"

export type TBreakpoint = {
  // Screen width in px; the window is drawn at this width relative to the widest one
  width: number
  label: string
  src: string
  alt: string
}

type TBreakpointScrubberProps = {
  items: TBreakpoint[]
  // Shared aspect ratio of the exports, e.g. 16 / 10
  ratio: number
  caption?: ReactNode
}

const STEP_MS = 2400

// One screen at several widths. The window resizes to each width in turn,
// the way the Figma breakpoint scrubber does. Tabs let people pick a width;
// picking one stops the autoplay. Reduced motion: no autoplay, no transitions.
export const BreakpointScrubber = ({ items, ratio, caption }: TBreakpointScrubberProps) => {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reduced = usePrefersReducedMotion()
  const widest = Math.max(...items.map((item) => item.width))

  useEffect(() => {
    if (!inView || reduced || touched) return
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % items.length),
      STEP_MS,
    )
    return () => window.clearInterval(timer)
  }, [inView, reduced, touched, items.length])

  const current = items[active]

  return (
    <Reveal>
      <figure className={styles.figure}>
        <div ref={ref} className={styles.stage} style={{ aspectRatio: `${ratio}` }}>
          <div
            className={styles.window}
            style={{ "--bp-w": `${(current.width / widest) * 100}%` } as CSSProperties}
          >
            {items.map((item, index) => (
              <img
                key={item.width}
                src={item.src}
                alt={index === active ? item.alt : ""}
                aria-hidden={index !== active}
                loading="lazy"
                className={styles.screen}
                style={{ opacity: index === active ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        <div className={styles.tabs} role="group" aria-label="Screen width">
          {items.map((item, index) => (
            <button
              key={item.width}
              type="button"
              className={styles.tab}
              aria-pressed={index === active}
              onClick={() => {
                setTouched(true)
                setActive(index)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}
