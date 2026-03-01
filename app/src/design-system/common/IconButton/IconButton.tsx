import { Icon } from "../Icons"
import type { TIconName, TIconSize } from "../Icons"

import styles from "./IconButton.module.scss"

type TIconButtonProps = {
  icon: TIconName
  href: string
  label: string
  size?: TIconSize
}

export const IconButton = ({
  icon,
  href,
  label,
  size = "md",
}: TIconButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.iconButton}
    aria-label={label}
  >
    <Icon name={icon} size={size} />
  </a>
)
