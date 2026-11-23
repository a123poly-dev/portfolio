import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useInView } from "./useInView"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

import shellImg from "../../../pages/assets/synthux/case-1/hero/shell.png"
import loadingImg from "../../../pages/assets/synthux/case-1/hero/loading.png"
import maskImg from "../../../pages/assets/synthux/case-1/hero/mask.png"
import s1 from "../../../pages/assets/synthux/case-1/hero/s1-header.png"
import s2 from "../../../pages/assets/synthux/case-1/hero/s2-numbers.png"
import s3 from "../../../pages/assets/synthux/case-1/hero/s3-summary.png"
import s4 from "../../../pages/assets/synthux/case-1/hero/s4-issues.png"
import s5 from "../../../pages/assets/synthux/case-1/hero/s5-segments.png"

import styles from "./HeroReport.module.scss"

// Report hero, ported from the Figma motion (Hero / Report motion 21:2317)
// and the approved hi-fi: loading state L3, then Report 4.1.
// The screen is 1440 px wide; the hero shows its top 1100 px, like the other Report exports.
const SCREEN_W = 1440
const VIEW_H = 1100
const LOAD_MS = 2200
const STAGGER_MS = 120
const COUNT_MS = 1800
const COUNT_STAGGER_MS = 100

// Content column of the Report: x 288, 1088 wide. Slices of the loading state sit 56 px higher in its export.
const SECTIONS = [
  { src: s1, top: 96, height: 60 },
  { src: s2, top: 188, height: 146 },
  { src: s3, top: 366, height: 224 },
  { src: s4, top: 622, height: 428 },
  { src: s5, top: 1082, height: 256 },
]
const NUMBERS_INDEX = 1

type TValue = {
  left: number
  to: number
  format: (n: number) => string
}

const VALUES: TValue[] = [
  { left: 24, to: 7, format: (n) => `${n} of 10` },
  { left: 296.25, to: 68, format: (n) => `${n}` },
  { left: 568.5, to: 5, format: (n) => `${n}` },
  {
    left: 840.75,
    to: 260,
    format: (n) => `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, "0")}s`,
  },
]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

type TPhase = "idle" | "loading" | "loaded"

export const HeroReport = () => {
  const reduced = usePrefersReducedMotion()
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.3)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [phase, setPhase] = useState<TPhase>("idle")
  const [progress, setProgress] = useState<number[]>(VALUES.map(() => 0))
  const [run, setRun] = useState(0)

  // Scale the 1440 px screen to the width of the page
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / SCREEN_W),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Loading, then sections in reading order, then the numbers count up
  useEffect(() => {
    if (reduced) {
      setPhase("loaded")
      setProgress(VALUES.map(() => 1))
      return
    }
    if (!inView) return

    setPhase("loading")
    setProgress(VALUES.map(() => 0))

    let frame = 0
    const countStart = LOAD_MS + NUMBERS_INDEX * STAGGER_MS
    const loaded = window.setTimeout(() => setPhase("loaded"), LOAD_MS)
    const counting = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const next = VALUES.map((_, i) => {
          const t = (now - start - i * COUNT_STAGGER_MS) / COUNT_MS
          return easeOutCubic(Math.min(Math.max(t, 0), 1))
        })
        setProgress(next)
        if (next.some((p) => p < 1)) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, countStart)

    return () => {
      window.clearTimeout(loaded)
      window.clearTimeout(counting)
      cancelAnimationFrame(frame)
    }
  }, [inView, reduced, run])

  const isLoaded = phase === "loaded"

  return (
    <div ref={inViewRef} className={styles.hero}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        style={{ aspectRatio: `${SCREEN_W} / ${VIEW_H}` }}
        role="img"
        aria-label="SynthUX Report screen. A loading skeleton with a moving shimmer turns into the finished report: header, then the key numbers counting up to 7 of 10, 68, 5 and 4m 20s, then the summary, issues and segments."
      >
        <div
          className={styles.stage}
          style={{ transform: `scale(${scale})` } as CSSProperties}
          aria-hidden="true"
        >
          <img className={styles.shell} src={shellImg} alt="" width={1440} height={2178} />

          {SECTIONS.map((section, i) => {
            const delay = `${i * STAGGER_MS}ms`
            const offset = `-64px -${section.top - 56}px`
            return (
              <div key={`slice-${i}`}>
                <div
                  className={styles.slice}
                  style={{
                    top: section.top,
                    height: section.height,
                    backgroundImage: `url(${loadingImg})`,
                    backgroundPosition: offset,
                    opacity: isLoaded ? 0 : 1,
                    transitionDelay: delay,
                  }}
                >
                  <div
                    className={styles.skeleton}
                    style={{
                      maskImage: `url(${maskImg})`,
                      WebkitMaskImage: `url(${maskImg})`,
                      maskPosition: offset,
                      WebkitMaskPosition: offset,
                    }}
                  >
                    {!isLoaded && <div className={styles.band} />}
                  </div>
                </div>

                <div
                  className={styles.section}
                  style={{
                    top: section.top,
                    height: section.height,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "none" : "translateY(8px)",
                    transitionDelay: delay,
                  }}
                >
                  <img src={section.src} alt="" width={1088} height={section.height} />
                  {i === NUMBERS_INDEX &&
                    VALUES.map((value, k) => (
                      <span key={value.left} className={styles.value} style={{ left: value.left }}>
                        {value.format(Math.round(value.to * progress[k]))}
                      </span>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!reduced && (
        <button
          type="button"
          className={styles.replay}
          onClick={() => setRun((n) => n + 1)}
          disabled={phase === "loading"}
        >
          Replay
        </button>
      )}
    </div>
  )
}
