import cn from "classnames"
import {
  BlobLayer,
  BlobRoll,
  blobHostClass,
  useBlobHover,
} from "@design-system/common/BlobHover"
import styles from "./ButtonLink.module.scss"

type TButtonLinkProps = {
  href: string
  children: React.ReactNode
  isExternal?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const ButtonLink = ({
  href,
  children,
  isExternal = false,
  className,
  onClick,
}: TButtonLinkProps) => {
  const ref = useBlobHover<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={href}
      className={cn(blobHostClass, styles.buttonLink, className)}
      onClick={onClick}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <BlobLayer />
      <BlobRoll>
        <span className={styles.label}>{children}</span>
      </BlobRoll>
    </a>
  )
}
