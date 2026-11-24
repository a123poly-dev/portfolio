import cn from "classnames"
import { Link } from "react-router-dom"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { Heading } from "@design-system/common/Heading"
import { Tag } from "@design-system/common/Tag"
import type { TProject } from "../WorksGrid/works-data"

import styles from "./WorkCard.module.scss"

const coverClassMap: Record<string, string> = {
  pulkovoCover: styles.pulkovoCover,
  okeyAppCover: styles.okeyAppCover,
  pbhCover: styles.pbhCover,
  taxiCover: styles.taxiCover,
  okeySiteCover: styles.okeySiteCover,
  aiCover: styles.aiCover,
  synthuxEndToEndCover: styles.synthuxEndToEndCover,
  synthuxDesignSystemCover: styles.synthuxDesignSystemCover,
  synthuxAiProcessCover: styles.synthuxAiProcessCover,
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
      <div className={cn(styles.cover, coverSizeClass)}>
        <div
          className={cn(
            styles.coverImage,
            coverClassMap[project.coverClass] ?? "",
          )}
        />
        <span className={styles.arrow} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 14L14 6M14 6H7M14 6V13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <Tag key={tag.label} label={tag.label} color={tag.color} />
        ))}
      </div>
      <div className={styles.date}>{project.date}</div>
      <Heading
        type={isSmall ? "heading-h5" : "heading-h4"}
        as="h4"
        className={styles.title}
      >
        {project.title}
      </Heading>
    </div>
  )

if (project.externalLink) {
  return (
    <a
      href={project.externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      {content}
    </a>
  )
}

  return (
    <Link to={project.link} className={styles.card}>
      {content}
    </Link>
  )
}
