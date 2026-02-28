import cn from "classnames"
import { Link } from "react-router-dom"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { Project, TagColor } from "../WorksGrid/works-data"

import styles from "./WorkCard.module.scss"

const tagColorMap: Record<TagColor, string> = {
  blue: styles.tagBlue,
  orange: styles.tagOrange,
  green: styles.tagGreen,
  yellow: styles.tagYellow,
  purple: styles.tagPurple,
  red: styles.tagRed,
}

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
  project: Project
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
          <span
            key={tag.label}
            className={cn(styles.tag, tagColorMap[tag.color])}
          >
            {tag.label}
          </span>
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
