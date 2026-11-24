import avatar from "./assets/avatar-hero.webp"
import warningIcon from "./assets/triangle-warning.svg"
import { HERO_SOCIAL_ICONS, HERO_SOCIALS } from "./socialIcons"

import styles from "./Header.module.scss"

export const Header = () => (
  <section className={styles.header}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.banner} role="status">
          <img src={warningIcon} width={16} height={16} alt="" />
          <span>Portfolio under construction, but all cases available</span>
        </div>

        <h1 className={styles.title}>
          <span>Hey,</span>
          <span className={styles.switcher} aria-hidden="true">
            <img
              src={avatar}
              width={64}
              height={64}
              alt=""
              className={styles.avatar}
            />
          </span>
          <span>I&apos;m Polina&nbsp;—</span>
        </h1>

        <p className={styles.subtitle}>
          a holistic product designer who speaks code and data. From research to
          shipped, measured product.
        </p>

        <div className={styles.socials}>
          {HERO_SOCIALS.map((social) => {
            const SocialIcon = HERO_SOCIAL_ICONS[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={styles.socialLink}
              >
                <SocialIcon />
              </a>
            )
          })}
        </div>

        <div className={styles.location}>Helsinki</div>
      </div>
    </div>
  </section>
)
