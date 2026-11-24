import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { Reveal } from "./Reveal"
import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import styles from "./FlowPlayer.module.scss"

export type TFlowStep = {
  label: string
  src: string
  alt: string
  // How long the step stays on screen during autoplay
  ms: number
}

type TFlowPlayerProps = {
  steps: TFlowStep[]
  width: number
  height: number
  caption?: ReactNode
}

// A flow played as a sequence of approved screens. Each step tab fills up while
// its screen is shown, then the next screen fades in. Picking a step stops the
// autoplay. Reduced motion: no autoplay, no fades.
export const FlowPlayer = ({ steps, width, height, caption }: TFlowPlayerProps) => {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reduced = usePrefersReducedMotion()
  const playing = inView && !reduced && !touched

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % steps.length),
      steps[active].ms,
    )
    return () => window.clearTimeout(timer)
  }, [playing, active, steps])

  return (
    <Reveal>
      <figure className={styles.figure}>
        <div ref={ref} className={styles.stage} style={{ aspectRatio: `${width} / ${height}` }}>
          {steps.map((step, index) => (
            <img
              key={step.src}
              src={step.src}
              alt={index === active ? step.alt : ""}
              aria-hidden={index !== active}
              width={width}
              height={height}
              loading="lazy"
              className={styles.screen}
              style={{ opacity: index === active ? 1 : 0 }}
            />
          ))}
        </div>

        <ol className={styles.steps} aria-label="Flow steps">
          {steps.map((step, index) => (
            <li key={step.src}>
              <button
                type="button"
                className={styles.step}
                aria-current={index === active ? "step" : undefined}
                onClick={() => {
                  setTouched(true)
                  setActive(index)
                }}
              >
                <span
                  className={styles.bar}
                  data-state={
                    index < active ? "done" : index === active ? (playing ? "playing" : "done") : "todo"
                  }
                  style={{ "--flow-ms": `${step.ms}ms` } as CSSProperties}
                  key={`${index}-${active}-${playing}`}
                />
                <span className={styles.stepLabel}>
                  {index + 1}. {step.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}
