import linkedinIcon from "./assets/linkedin.svg"
import tgIcon from "./assets/tg.svg"
import igIcon from "./assets/ig.svg"

const icons = {
  linkedin: linkedinIcon,
  telegram: tgIcon,
  instagram: igIcon,
} as const

export type TIconName = keyof typeof icons

type TIconProps = {
  name: TIconName
  size?: number
  className?: string
}

export const Icon = ({ name, size = 24, className }: TIconProps) => (
  <img
    src={icons[name]}
    width={size}
    height={size}
    alt={name}
    className={className}
  />
)
