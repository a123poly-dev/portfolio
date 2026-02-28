import cn from "classnames"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { Heading } from "@design-system/common/Heading"
import { Tag } from "@design-system/common/Tag"
import type { TTagColor } from "@design-system/common/Tag"
import { IconButton } from "@design-system/common/IconButton"
import { Icon } from "@design-system/common/Icons"

import styles from "./About.module.scss"

type TTagItem = {
  label: string
  color: TTagColor
}

const skills: TTagItem[] = [
  { label: "Product design", color: "green" },
  { label: "Research", color: "green" },
  { label: "UX", color: "green" },
  { label: "UI", color: "red" },
  { label: "HIG", color: "blue" },
  { label: "Material design", color: "blue" },
  { label: "Graphic Design", color: "red" },
  { label: "Prototyping", color: "purple" },
  { label: "Animation", color: "purple" },
  { label: "B2B", color: "orange" },
  { label: "B2C", color: "orange" },
]

const tools: TTagItem[] = [
  { label: "Figma", color: "purple" },
  { label: "Adobe Cloud", color: "purple" },
  { label: "Miro", color: "green" },
  { label: "Git", color: "blue" },
  { label: "HTML", color: "blue" },
  { label: "CSS", color: "blue" },
]

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
                  {skills.map((s) => (
                    <Tag key={s.label} label={s.label} color={s.color} />
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.label}>Tools:</div>
                <div className={styles.tagsWrap}>
                  {tools.map((t) => (
                    <Tag key={t.label} label={t.label} color={t.color} />
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
                src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cb9b9ede7072b7a60c5f87_photo_2.png"
                loading="lazy"
                alt=""
                className={styles.photo}
                width={251}
              />
              <div className={styles.socials}>
                <IconButton
                  icon="linkedin"
                  href="https://www.linkedin.com/in/apolina/"
                  label="LinkedIn"
                />
                <IconButton
                  icon="telegram"
                  href="https://t.me/aapoly"
                  label="Telegram"
                />
                <IconButton
                  icon="instagram"
                  href="https://www.instagram.com/polinakzz/"
                  label="Instagram"
                />
              </div>
            </div>
            <div className={styles.cvBlock}>
              <div className={styles.label}>CV:</div>
              <div className={styles.cvInner}>
                <Icon name="drive" size="sm" />
                <a
                  href="https://drive.google.com/file/d/1mGUrUfwG9Sgmn57VYVrz6PI0KoskK2LL/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cvLink}
                >
                  Polina_CV_2025.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
