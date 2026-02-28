import cn from "classnames"
import styles from "./ButtonLink.module.scss"

type TButtonLinkProps = {
  href: string
  children: React.ReactNode
  isExternal?: boolean
  className?: string
}

export const ButtonLink = ({
  href,
  children,
  isExternal = false,
  className,
}: TButtonLinkProps) => (
  <a
    href={href}
    className={cn(styles.buttonLink, className)}
    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
  >
    {children}
  </a>
)
