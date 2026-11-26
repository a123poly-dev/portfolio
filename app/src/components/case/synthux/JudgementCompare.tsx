import { useEffect, useId, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { Reveal } from "./Reveal"

import styles from "./JudgementCompare.module.scss"

export type TJudgementPin = {
  n: number
  // Centre of the badge, in % of the screen image (from the Figma frame)
  x: number
  y: number
}

export type TJudgementScreen = {
  src: string
  alt: string
  width: number
  height: number
  pins: TJudgementPin[]
}

export type TJudgementNote = {
  n: number
  title: string
  text: string
}

type TSide = "ai" | "mine"

type TJudgementCompareProps = {
  label: string
  ai: TJudgementScreen
  mine: TJudgementScreen
  notes: TJudgementNote[]
  caption?: string
}

const SIDE_LABEL: Record<TSide, string> = {
  ai: "AI version",
  mine: "My version",
}

// Two screens side by side, AI first and mine second. Numbered badges open a short
// note in a popover. The eye button hides the badges. On a phone a switch shows
// one screen at a time.
export const JudgementCompare = ({
  label,
  ai,
  mine,
  notes,
  caption,
}: TJudgementCompareProps) => {
  const id = useId()
  const [showPins, setShowPins] = useState(true)
  const [phoneSide, setPhoneSide] = useState<TSide>("ai")
  const [open, setOpen] = useState<{ side: TSide; n: number } | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Close on Escape (focus goes back to the badge) and on a click outside
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      const pin = rootRef.current?.querySelector<HTMLButtonElement>(
        `[data-pin="${open.side}-${open.n}"]`,
      )
      setOpen(null)
      pin?.focus()
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${styles.pinWrap}`)) setOpen(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  const renderScreen = (side: TSide, screen: TJudgementScreen) => (
    <div
      className={styles.col}
      data-side={side}
      data-phone-hidden={phoneSide !== side || undefined}
    >
      <span className={styles.sideLabel} data-side={side}>
        {SIDE_LABEL[side]}
      </span>
      <div className={styles.screen}>
        <img
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
        {showPins &&
          screen.pins.map((pin) => {
            const note = notes.find((item) => item.n === pin.n)
            if (!note) return null
            const isOpen = open?.side === side && open.n === pin.n
            const popId = `${id}-${side}-${pin.n}`
            const style = {
              "--x": `${pin.x}%`,
              "--y": `${pin.y}%`,
            } as CSSProperties
            const alignX = pin.x < 30 ? "start" : pin.x > 70 ? "end" : "center"
            const alignY = pin.y > 65 ? "above" : "below"
            return (
              <div key={pin.n} className={styles.pinWrap} style={style}>
                <button
                  type="button"
                  className={styles.pin}
                  data-side={side}
                  data-pin={`${side}-${pin.n}`}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? popId : undefined}
                  aria-label={`${pin.n}. ${note.title}`}
                  onClick={() =>
                    setOpen(isOpen ? null : { side, n: pin.n })
                  }
                >
                  {pin.n}
                </button>
                {isOpen && (
                  <div
                    id={popId}
                    role="dialog"
                    aria-label={note.title}
                    className={styles.popover}
                    data-x={alignX}
                    data-y={alignY}
                  >
                    <strong className={styles.popTitle}>{note.title}</strong>
                    <p className={styles.popText}>{note.text}</p>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )

  return (
    <Reveal>
      <div className={styles.root} ref={rootRef}>
        <div className={styles.toolbar}>
          <span className={styles.label}>{label}</span>
          <div className={styles.tools}>
            <div
              className={styles.switch}
              role="group"
              aria-label="Which version to show"
            >
              {(["ai", "mine"] as TSide[]).map((side) => (
                <button
                  key={side}
                  type="button"
                  aria-pressed={phoneSide === side}
                  onClick={() => {
                    setPhoneSide(side)
                    setOpen(null)
                  }}
                >
                  {side === "ai" ? "AI" : "Mine"}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.eye}
              aria-pressed={!showPins}
              aria-label={showPins ? "Hide numbers" : "Show numbers"}
              title={showPins ? "Hide numbers" : "Show numbers"}
              onClick={() => {
                setShowPins((value) => !value)
                setOpen(null)
              }}
            >
              {showPins ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
        </div>
        <div className={styles.grid}>
          {renderScreen("ai", ai)}
          {renderScreen("mine", mine)}
        </div>
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>
    </Reveal>
  )
}

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3 3.9M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
