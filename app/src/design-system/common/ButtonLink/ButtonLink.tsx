import cn from "classnames"
import styles from "./ButtonLink.module.scss"
import { BLOB_NAMES, useBlobHover } from "./useBlobHover"

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
  const ref = useBlobHover<HTMLAnchorElement>(styles.filled)

  return (
    <a
      ref={ref}
      href={href}
      className={cn(styles.buttonLink, className)}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className={styles.blobs} aria-hidden="true">
        {BLOB_NAMES.map((name) => (
          <i key={name} data-blob={name} className={styles[name]} />
        ))}
      </span>
      <span className={styles.roll} data-roll>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </a>
  )
}
