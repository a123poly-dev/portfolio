import { SOCIAL_ICONS } from "../Icons"
import type { TSocialIconName } from "../Icons"
import {
  BlobLayer,
  BlobRoll,
  blobHostClass,
  useBlobHover,
} from "../BlobHover"

import styles from "./IconButton.module.scss"

type TIconButtonProps = {
  /** Social icon to show (24 px artwork, drawn at 20 px) */
  icon: TSocialIconName
  /** Opens in a new tab */
  href: string
  /** Accessible name, read by screen readers */
  label: string
}

// Round 40 × 40 icon link with the nav's blob-fill hover (hero socials).
// The icon uses the text colour, so it follows light and dark themes.
export const IconButton = ({ icon, href, label }: TIconButtonProps) => {
  const ref = useBlobHover<HTMLAnchorElement>()
  const SocialIcon = SOCIAL_ICONS[icon]
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${blobHostClass} ${styles.iconButton}`}
    >
      <BlobLayer />
      <BlobRoll>
        <SocialIcon />
      </BlobRoll>
    </a>
  )
}
