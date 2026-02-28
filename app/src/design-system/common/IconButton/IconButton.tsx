import { Icon } from "../Icons"
import type { TIconName } from "../Icons"
import styles from "./IconButton.module.scss"

type TIconButtonProps = {
  icon: TIconName
  href: string
  label: string
  size?: number
}

export const IconButton = ({
  icon,
  href,
  label,
  size = 24,
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
