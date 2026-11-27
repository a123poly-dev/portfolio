import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

import styles from "./Synthux.module.scss"

type TCaseFigureProps = {
  src: string
  alt: string
  /** Pixel size of the export. Keeps the aspect ratio so nothing jumps or crops. */
  width: number
  height: number
  caption?: ReactNode
  /** Load at once (for the cover). Other images load lazily. */
  priority?: boolean
}

export const CaseFigure = ({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: TCaseFigureProps) => (
  <Reveal>
    <figure className={styles.figure}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={styles.image}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  </Reveal>
)
