import { useEffect, useRef } from "react"

// Blob-fill hover, after ttm.supply's "Get started" button: two waves of
// circles grow from the edge the pointer enters and flood the pill, while the
// label rolls up to a copy of itself. Leaving plays the fill back 1.8x faster.
const TOTAL = 700
const OUT_SPEED = 1.8
const EASE = {
  out: "cubic-bezier(.33, 1, .68, 1)",
  inOut: "cubic-bezier(.65, 0, .35, 1)",
  roll: "cubic-bezier(.76, 0, .24, 1)",
}
// [blob, delay s, duration s, ease]
const STEPS: [string, number, number, keyof typeof EASE][] = [
  ["a1", 0, 0.42, "out"],
  ["a3", 0.04, 0.42, "out"],
  ["a2", 0.05, 0.42, "out"],
  ["a4", 0.09, 0.42, "out"],
  ["a5", 0.06, 0.55, "inOut"],
  ["b1", 0.14, 0.42, "out"],
  ["b3", 0.18, 0.42, "out"],
  ["b2", 0.19, 0.42, "out"],
  ["b4", 0.23, 0.42, "out"],
  ["b5", 0.2, 0.5, "inOut"],
]

export const BLOB_NAMES = STEPS.map(([name]) => name)

// Toggles data-filled on the host while it is filled, so hosts can restyle text.
export function useBlobHover<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T>(null)
  const disabledRef = useRef(disabled)
  disabledRef.current = disabled
  const leaveRef = useRef<() => void>(() => {})

  // A host that becomes disabled (e.g. the active filter) drops its fill
  useEffect(() => {
    if (disabled) leaveRef.current()
  }, [disabled])

  useEffect(() => {
    const btn = ref.current
    if (!btn || !btn.animate) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")

    let anims: Animation[] = []
    let rate = 1
    let shown = 0
    let rolling = false
    let touchTimer = 0
    let lastTouch = 0

    const time = () => {
      const t = anims[0]?.currentTime
      return typeof t === "number" ? Math.max(0, Math.min(TOTAL, t)) : 0
    }

    const build = () => {
      anims = STEPS.map(([name, delay, dur, ease]) => {
        const el = btn.querySelector<HTMLElement>(`[data-blob="${name}"]`)!
        const a = el.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)" },
            { transform: "translate(-50%, -50%) scale(1)" },
          ],
          {
            duration: dur * 1000,
            delay: delay * 1000,
            endDelay: TOTAL - (delay + dur) * 1000,
            easing: EASE[ease],
            fill: "both",
          },
        )
        a.pause()
        a.currentTime = 0
        return a
      })
      anims[0].onfinish = () => {
        if (rate < 0) {
          anims.forEach((a) => a.cancel())
          anims = []
        }
      }
    }

    const go = (r: number) => {
      if (!anims.length) {
        if (r < 0) return
        build()
      }
      const at = time()
      rate = r
      if ((r > 0 && at >= TOTAL) || (r < 0 && at <= 0)) return
      anims.forEach((a) => {
        a.playbackRate = r
        a.currentTime = at
        a.play()
      })
    }

    const roll = () => {
      const copies = btn.querySelectorAll<HTMLElement>("[data-roll] > span")
      if (copies.length !== 2 || rolling) return
      const cur = copies[shown]
      const next = copies[1 - shown]
      shown = 1 - shown
      const how: KeyframeAnimationOptions = {
        duration: 600,
        delay: 60,
        easing: EASE.roll,
        fill: "both",
      }
      rolling = true
      const out = cur.animate(
        [{ transform: "translateY(0%)" }, { transform: "translateY(-105%)" }],
        how,
      )
      next.animate(
        [{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
        how,
      )
      out.onfinish = () => {
        cur.style.transform = "translateY(105%)"
        next.style.transform = "translateY(0%)"
        cur
          .getAnimations()
          .concat(next.getAnimations())
          .forEach((a) => a.cancel())
        rolling = false
      }
    }

    // Blobs start on the edge nearest to where the pointer came in
    const origin = (e: PointerEvent | null, exact = false) => {
      const r = btn.getBoundingClientRect()
      if (!e || !r.width) {
        btn.style.setProperty("--bx", "0%")
        btn.style.setProperty("--by", "100%")
        return
      }
      let x = Math.min(r.width, Math.max(0, e.clientX - r.left))
      let y = Math.min(r.height, Math.max(0, e.clientY - r.top))
      if (!exact) {
        const edge = Math.min(x, r.width - x, y, r.height - y)
        if (edge === x) x = 0
        else if (edge === r.width - x) x = r.width
        else if (edge === y) y = 0
        else y = r.height
      }
      btn.style.setProperty("--bx", `${((x / r.width) * 100).toFixed(1)}%`)
      btn.style.setProperty("--by", `${((y / r.height) * 100).toFixed(1)}%`)
    }

    const enter = (e: PointerEvent | null, exact = false) => {
      if (disabledRef.current) return
      btn.toggleAttribute("data-filled", true)
      if (reduce.matches) return
      if (time() === 0) origin(e, exact)
      if (time() === 0 || rate < 0) roll()
      go(1)
    }

    const leave = () => {
      btn.removeAttribute("data-filled")
      if (reduce.matches) return
      go(-OUT_SPEED)
    }

    leaveRef.current = leave

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || Date.now() - lastTouch < 1000) return
      enter(e)
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || btn.matches(":focus-visible")) return
      leave()
    }
    // Touch: play the fill from the tap point, then let it drain
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return
      lastTouch = Date.now()
      enter(e, true)
      window.clearTimeout(touchTimer)
      touchTimer = window.setTimeout(leave, 450)
    }
    const onFocus = () => {
      if (btn.matches(":focus-visible")) enter(null)
    }
    const onBlur = () => {
      if (!btn.matches(":hover")) leave()
    }

    btn.addEventListener("pointerenter", onEnter)
    btn.addEventListener("pointerleave", onLeave)
    btn.addEventListener("pointerdown", onDown)
    btn.addEventListener("focus", onFocus)
    btn.addEventListener("blur", onBlur)
    return () => {
      window.clearTimeout(touchTimer)
      anims.forEach((a) => a.cancel())
      btn.removeEventListener("pointerenter", onEnter)
      btn.removeEventListener("pointerleave", onLeave)
      btn.removeEventListener("pointerdown", onDown)
      btn.removeEventListener("focus", onFocus)
      btn.removeEventListener("blur", onBlur)
    }
  }, [])

  return ref
}
