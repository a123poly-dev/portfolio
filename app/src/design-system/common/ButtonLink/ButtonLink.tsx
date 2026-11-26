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
}

export const ButtonLink = ({
  href,
  children,
  isExternal = false,
  className,
}: TButtonLinkProps) => {
  const ref = useBlobHover<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={href}
      className={cn(blobHostClass, styles.buttonLink, className)}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <BlobLayer />
      <BlobRoll>{children}</BlobRoll>
    </a>
  )
}
