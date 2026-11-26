import type { ReactNode } from "react"
import styles from "./BlobHover.module.scss"
import { BLOB_NAMES } from "./useBlobHover"

// Put <BlobLayer /> and <BlobRoll> inside an element with blobHostClass,
// and pass that element useBlobHover()'s ref.
export const blobHostClass = styles.host

export const BlobLayer = () => (
  <span className={styles.blobs} aria-hidden="true">
    {BLOB_NAMES.map((name) => (
      <i key={name} data-blob={name} className={styles[name]} />
    ))}
  </span>
)

// The label (text or icon) and a hidden copy that rolls in from below
export const BlobRoll = ({ children }: { children: ReactNode }) => (
  <span className={styles.roll} data-roll>
    <span>{children}</span>
    <span aria-hidden="true">{children}</span>
  </span>
)
