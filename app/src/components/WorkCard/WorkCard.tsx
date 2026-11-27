import cn from "classnames"
import { Link } from "react-router-dom"
import { ArrowUpRightIcon } from "@design-system/common/Icons"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { TProject } from "../WorksGrid/works-data"

import styles from "./WorkCard.module.scss"

const coverClassMap: Record<string, string> = {
  pulkovoCover: styles.pulkovoCover,
  okeyAppCover: styles.okeyAppCover,
  pbhCover: styles.pbhCover,
  aiCover: styles.aiCover,
  synthuxEndToEndCover: styles.synthuxEndToEndCover,
  synthuxDesignSystemCover: styles.synthuxDesignSystemCover,
  synthuxAiProcessCover: styles.synthuxAiProcessCover,
}

const coverSizeClassMap: Record<TProject["cover"], string> = {
  tall: styles.coverTall,
  compact: styles.coverCompact,
  regular: styles.coverRegular,
}

type TWorkCardProps = {
  project: TProject
  // Place in the grid, from 1, for analytics
  position?: number
}

// Image-only card. The meta line, title and arrow sit in a white glass panel that
// slides up on hover (Figma 290:54602); on touch screens it is always shown.
export const WorkCard = ({ project, position }: TWorkCardProps) => {
  const trackProps = {
    "data-track": "case_card_click",
    "data-track-case": project.id,
    "data-track-position": position,
    "data-track-group": project.id.startsWith("synthux") ? "synthux" : "older",
  }
  const ref = useScrollReveal<HTMLDivElement>()

  const content = (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        styles.cover,
        coverSizeClassMap[project.cover],
      )}
    >
      <div
        className={cn(styles.coverImage, coverClassMap[project.coverClass])}
      />
      <div className={styles.panel}>
        <div className={styles.meta}>
          {project.meta.map((item, i) => (
            <span key={item} className={styles.metaItem}>
              {i > 0 && (
                <span className={styles.metaDot} aria-hidden="true">
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRightIcon />
        </span>
      </div>
    </div>
  )

  if (project.externalLink) {
    return (
      <a
        href={project.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        {...trackProps}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={project.link} className={styles.card} {...trackProps}>
      {content}
    </Link>
  )
}
