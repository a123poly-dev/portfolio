import cn from "classnames"

import styles from "./Tag.module.scss"

export type TTagColor = "blue" | "orange" | "green" | "yellow" | "purple" | "red"

type TTagProps = {
  label: string
  color: TTagColor
  href?: string
}

const tagColorMap: Record<TTagColor, string> = {
  blue: styles.tagBlue,
  orange: styles.tagOrange,
  green: styles.tagGreen,
  yellow: styles.tagYellow,
  purple: styles.tagPurple,
  red: styles.tagRed,
}

export const Tag = ({ label, color, href }: TTagProps) => {
  const className = cn(href ? styles.tagLink : styles.tag, tagColorMap[color])

  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }

  return <span className={className}>{label}</span>
}
