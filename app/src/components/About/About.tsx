import cn from "classnames"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { Heading } from "@design-system/common/Heading"
import { Tag } from "@design-system/common/Tag"
import { IconButton } from "@design-system/common/IconButton"
import { Icon } from "@design-system/common/Icons"
import photo from "./assets/photo_2.png"
import {
  SKILLS,
  TOOLS,
  SOCIAL_URLS,
  CV_DOWNLOAD_URL,
} from "./constants/constants"

import styles from "./About.module.scss"

export const About = () => {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div ref={ref} className={cn(styles.grid, "scroll-reveal")}>
          <div className={styles.titleCell}>
            <Heading type="heading-h1" className={styles.sectionTitle}>
              About
            </Heading>
          </div>

          <div className={styles.experienceCell}>
            <Heading type="heading-h3" className={styles.heading}>
              Experience &amp;Skills
            </Heading>
            <p className={styles.description}>
              I thrive on creating seamless user experiences that delight and
              engage. From mapping out user journeys to conducting user
              research, I&apos;m all about making sure every interaction feels
              intuitive and enjoyable.
            </p>
            <div className={styles.skillsContainer}>
              <div>
                <div className={styles.label}>Skills:</div>
                <div className={styles.tagsWrap}>
                  {SKILLS.map((skill) => (
                    <Tag
                      key={skill.label}
                      label={skill.label}
                      color={skill.color}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.label}>Tools:</div>
                <div className={styles.tagsWrap}>
                  {TOOLS.map((tool) => (
                    <Tag
                      key={tool.label}
                      label={tool.label}
                      color={tool.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.educationCell}>
            <Heading type="heading-h3" className={styles.heading}>
              Education
            </Heading>
            <div className={styles.label}>ITMO University</div>
            <div className={styles.educationList}>
              <p className={styles.educationText}>
                2014 – 2016 — ITMO University, Applied optics (Master&apos;s
                degree)
              </p>
              <p className={styles.educationText}>
                2010 – 2014 — ITMO University, Applied optics (Bachelor&apos;s
                degree)
              </p>
            </div>
          </div>

          <div className={styles.contactCell}>
            <div className={styles.photoBlock}>
              <img
                src={photo}
                loading="lazy"
                alt=""
                className={styles.photo}
                width={251}
              />
              <div className={styles.socials}>
                {SOCIAL_URLS.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={social.icon}
                    href={social.href}
                    label={social.label}
                  />
                ))}
              </div>
            </div>
            <div className={styles.cvBlock}>
              <div className={styles.label}>CV:</div>
              <div className={styles.cvInner}>
                <Icon name="drive" size="sm" />
                <a
                  href={CV_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cvLink}
                >
                  CV-Polina Abdula.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
