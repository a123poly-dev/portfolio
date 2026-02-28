import cn from "classnames"
import { Link } from "react-router-dom"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { Tag } from "../Tag"
import type { TProject } from "../WorksGrid/works-data"

import styles from "./WorkCard.module.scss"

const coverClassMap: Record<string, string> = {
  pulkovoCover: styles.pulkovoCover,
  okeyAppCover: styles.okeyAppCover,
  pbhCover: styles.pbhCover,
  taxiCover: styles.taxiCover,
  okeySiteCover: styles.okeySiteCover,
  pbxyaCover: styles.pbxyaCover,
  gpnCover: styles.gpnCover,
}

type TWorkCardProps = {
  project: TProject
}

export const WorkCard = ({ project }: TWorkCardProps) => {
  const ref = useScrollReveal<HTMLDivElement>()

  const isSmall = project.size === "small"
  const coverSizeClass = isSmall ? styles.coverSmall : styles.coverLarge

  const content = (
    <div ref={ref} className="scroll-reveal">
      <div
        className={cn(
          styles.cover,
          coverSizeClass,
          coverClassMap[project.coverClass] ?? "",
        )}
      >
        {project.comingSoon ? (
          <div className={styles.comingSoonOverlay}>Coming soon</div>
        ) : (
          <div className={styles.overlay}>Let&apos;s see</div>
        )}
      </div>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <Tag key={tag.label} label={tag.label} color={tag.color} />
        ))}
      </div>
      <div className={styles.date}>{project.date}</div>
      <h4
        className={cn(styles.title, {
          [styles.titleSmall]: isSmall,
          [styles.titleLarge]: !isSmall,
        })}
      >
        {project.title}
      </h4>
    </div>
  )

  if (project.comingSoon) {
    return <div className={styles.card}>{content}</div>
  }

  return (
    <Link to={project.link} className={styles.card}>
      {content}
    </Link>
  )
}
