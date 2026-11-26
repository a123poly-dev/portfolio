import { EASE, STEPS, TOTAL } from "../../common/BlobHover/useBlobHover"

// Full-screen version of the blob-fill hover: on a theme switch, two waves of
// circles grow out of the toggle (light purple, then the new page colour) until
// they cover the viewport. The theme flips under the cover, which then fades.

const PURPLE = "#eadcff"
const FADE = 220

// Blob size and offset as fractions of `base`, where the last blob of each
// wave is 3 × base wide (same proportions as BlobHover.module.scss).
const SHAPES: Record<string, [w: number, dx: number, dy: number]> = {
  a1: [0.46, 0, 0],
  a2: [0.38, 0.11, 0.12],
  a3: [0.32, -0.09, -0.14],
  a4: [0.28, 0.19, -0.05],
  a5: [3, 0, 0],
  b1: [0.48, 0, 0],
  b2: [0.4, -0.11, 0.14],
  b3: [0.34, 0.1, -0.15],
  b4: [0.3, -0.19, 0.04],
  b5: [3, 0, 0],
}

let current: { cancel: () => void } | null = null

export function playThemeFill(opts: {
  x: number
  y: number
  color: string
  onCovered: () => void
}) {
  // A new click takes over: drop the running cover where it is
  current?.cancel()

  const { x, y, color, onCovered } = opts
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const layer = document.createElement("div")
  layer.setAttribute("aria-hidden", "true")
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483000",
    overflow: "hidden",
    pointerEvents: "none",
    contain: "strict",
  })
  document.body.appendChild(layer)

  let done = false
  let timer = 0
  const finish = () => {
    if (done) return
    done = true
    window.clearTimeout(timer)
    layer.remove()
    if (current === handle) current = null
  }
  const handle = {
    cancel: () => {
      if (!covered) onCovered()
      covered = true
      finish()
    },
  }
  current = handle

  let covered = false
  const cover = () => {
    if (done || covered) return
    covered = true
    onCovered()
    const fade = layer.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: FADE,
      easing: "ease-out",
      fill: "forwards",
    })
    fade.onfinish = finish
  }

  if (reduce || !layer.animate) {
    // No blobs: a quick fade to the new page colour and back
    layer.style.background = color
    if (!layer.animate) {
      cover()
      finish()
      return
    }
    const fadeIn = layer.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 150,
      easing: "ease-out",
      fill: "forwards",
    })
    fadeIn.onfinish = cover
    return
  }

  // The last blob must reach the farthest corner from the toggle
  const w = window.innerWidth
  const h = window.innerHeight
  const reach = Math.hypot(Math.max(x, w - x), Math.max(y, h - y))
  const base = (reach * 2) / 3 + 8

  for (const [name, delay, dur, ease] of STEPS) {
    const [size, dx, dy] = SHAPES[name]
    const d = size * base
    const blob = document.createElement("i")
    Object.assign(blob.style, {
      position: "absolute",
      left: `${x + dx * base}px`,
      top: `${y + dy * base}px`,
      width: `${d}px`,
      height: `${d}px`,
      borderRadius: "50%",
      background: name.startsWith("a") ? PURPLE : color,
      transform: "translate(-50%, -50%) scale(0)",
      willChange: "transform",
    })
    layer.appendChild(blob)
    blob.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)" },
        { transform: "translate(-50%, -50%) scale(1)" },
      ],
      {
        duration: dur * 1000,
        delay: delay * 1000,
        easing: EASE[ease],
        fill: "both",
      },
    )
  }
  timer = window.setTimeout(cover, TOTAL)
}
