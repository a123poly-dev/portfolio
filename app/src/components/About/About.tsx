import cn from "classnames"
import { useScrollReveal } from "../../hooks/useScrollReveal"

import styles from "./About.module.scss"

// Reuse tag styles from WorkCard
import tagStyles from "../WorkCard/WorkCard.module.scss"

type TTagItem = {
  label: string
  className: string
}

const skills: TTagItem[] = [
  { label: "Product design", className: tagStyles.tagGreen },
  { label: "Research", className: tagStyles.tagGreen },
  { label: "UX", className: tagStyles.tagGreen },
  { label: "UI", className: tagStyles.tagRed },
  { label: "HIG", className: tagStyles.tagBlue },
  { label: "Material design", className: tagStyles.tagBlue },
  { label: "Graphic Design", className: tagStyles.tagRed },
  { label: "Prototyping", className: tagStyles.tagPurple },
  { label: "Animation", className: tagStyles.tagPurple },
  { label: "B2B", className: tagStyles.tagOrange },
  { label: "B2C", className: tagStyles.tagOrange },
]

const tools: TTagItem[] = [
  { label: "Figma", className: tagStyles.tagPurple },
  { label: "Adobe Cloud", className: tagStyles.tagPurple },
  { label: "Miro", className: tagStyles.tagGreen },
  { label: "Git", className: tagStyles.tagBlue },
  { label: "HTML", className: tagStyles.tagBlue },
  { label: "CSS", className: tagStyles.tagBlue },
]

export const About = () => {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div ref={ref} className={cn(styles.grid, "scroll-reveal")}>
          <div className={styles.titleCell}>
            <h1 className={styles.sectionTitle}>About</h1>
          </div>

          <div className={styles.experienceCell}>
            <h3 className={styles.heading}>Experience &amp;Skills</h3>
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
                    <span
                      key={s.label}
                      className={`${tagStyles.tag} ${s.className}`}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.label}>Tools:</div>
                <div className={styles.tagsWrap}>
                  {tools.map((t) => (
                    <span
                      key={t.label}
                      className={`${tagStyles.tag} ${t.className}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.educationCell}>
            <h3 className={styles.heading}>Education</h3>
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
                <a
                  href="https://www.linkedin.com/in/apolina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cb9aec0cc054f9d6fca108_linkedin.svg"
                    loading="lazy"
                    width={24}
                    alt="LinkedIn"
                    className={styles.socialIcon}
                  />
                </a>
                <a
                  href="https://t.me/aapoly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cb9aec0600ba0b41696831_tg.svg"
                    loading="lazy"
                    width={24}
                    alt="Telegram"
                  />
                </a>
                <a
                  href="https://www.instagram.com/polinakzz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cb9aec59802924663c8c4b_ig.svg"
                    loading="lazy"
                    width={24}
                    alt="Instagram"
                  />
                </a>
              </div>
            </div>
            <div className={styles.cvBlock}>
              <div className={styles.label}>CV:</div>
              <div className={styles.cvInner}>
                <img
                  src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cba1f12dc64ae8780ec6f6_drive.svg"
                  loading="lazy"
                  alt=""
                />
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
