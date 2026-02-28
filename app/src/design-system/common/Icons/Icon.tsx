import linkedinIcon from "./assets/linkedin.svg"
import tgIcon from "./assets/tg.svg"
import igIcon from "./assets/ig.svg"
import drive from "./assets/drive.svg"

const icons = {
  linkedin: linkedinIcon,
  telegram: tgIcon,
  instagram: igIcon,
  drive: drive,
} as const

export type TIconName = keyof typeof icons

const iconSizes = {
  sm: 18,
  md: 24,
  lg: 40,
} as const

export type TIconSize = keyof typeof iconSizes

type TIconProps = {
  name: TIconName
  size?: TIconSize
  className?: string
}

export const Icon = ({ name, size = "md", className }: TIconProps) => (
  <img
    src={icons[name]}
    width={iconSizes[size]}
    height={iconSizes[size]}
    alt={name}
    className={className}
  />
)
