import cn from "classnames"
import styles from "./CaseImage.module.scss"

type TCaseImageProps = {
  src: string
  alt?: string
  width?: number
  caption?: string
  className?: string
}

export const CaseImage = ({
  src,
  alt = "",
  width,
  caption,
  className,
}: TCaseImageProps) => (
  <figure className={cn(styles.figure, className)}>
    <img
      src={src}
      alt={alt}
      width={width}
      loading="lazy"
      className={styles.image}
    />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
)
