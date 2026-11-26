import { useEffect, useRef } from "react"

// 16px download icon (Figma 314:58120) that morphs into a check.
// Same idea as benji.org/morphing-icons-with-claude: the icon is a fixed set of
// SVG lines, and only their end points move. Lines the check doesn't need shrink
// to a point and fade out.

type TLine = [x1: number, y1: number, x2: number, y2: number, opacity: number]

// Tray bar, arrow shaft, left and right arrow head (Figma geometry)
const DOWNLOAD: TLine[] = [
  [4, 14, 12, 14, 1],
  [8, 2, 8, 11.333, 1],
  [4.667, 8, 8, 11.333, 1],
  [11.333, 8, 8, 11.333, 1],
]

// The arrow head becomes the check; the bar and shaft collapse into its corner
const CHECK: TLine[] = [
  [6.5, 11.5, 6.5, 11.5, 0],
  [6.5, 11.5, 6.5, 11.5, 0],
  [3.5, 8.5, 6.5, 11.5, 1],
  [12.5, 4.5, 6.5, 11.5, 1],
]

const DURATION = 420
// Fast start, soft landing with no overshoot
const ease = (t: number) => 1 - Math.pow(1 - t, 4)

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const apply = (els: (SVGLineElement | null)[], lines: TLine[]) => {
  lines.forEach(([x1, y1, x2, y2, o], i) => {
    const el = els[i]
    if (!el) return
    el.setAttribute("x1", String(x1))
    el.setAttribute("y1", String(y1))
    el.setAttribute("x2", String(x2))
    el.setAttribute("y2", String(y2))
    el.setAttribute("opacity", String(o))
  })
}

export const DownloadMorphIcon = ({ checked }: { checked: boolean }) => {
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  // Where the lines are right now, so a morph can start mid-way
  const current = useRef<TLine[]>(DOWNLOAD.map((l) => [...l] as TLine))
  const frame = useRef(0)

  useEffect(() => {
    const target = checked ? CHECK : DOWNLOAD
    cancelAnimationFrame(frame.current)

    if (reducedMotion()) {
      current.current = target.map((l) => [...l] as TLine)
      apply(lineRefs.current, current.current)
      return
    }

    const from = current.current.map((l) => [...l] as TLine)
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      const k = ease(t)
      current.current = from.map(
        (l, i) => l.map((v, j) => v + (target[i][j] - v) * k) as TLine,
      )
      apply(lineRefs.current, current.current)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame.current)
  }, [checked])

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {DOWNLOAD.map(([x1, y1, x2, y2, o], i) => (
        <line
          key={i}
          ref={(el) => {
            lineRefs.current[i] = el
          }}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          opacity={o}
        />
      ))}
    </svg>
  )
}
