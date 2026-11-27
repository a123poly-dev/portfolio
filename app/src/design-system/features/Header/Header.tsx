import { Mark, MarkerText } from "../../../components/case/synthux/MarkerText"
import avatar from "./assets/avatar-hero.webp"
import { HERO_SOCIALS } from "./socialIcons"
import { HelsinkiTime } from "./HelsinkiTime"

import type { CSSProperties } from "react"
import { IconButton } from "@design-system/common/IconButton"

import styles from "./Header.module.scss"

// Same purple marks as the Case 1 page: underline at full ink, marker at 20%
const PURPLE = "#9453ff" // --accent; MarkerText draws SVG, which needs a plain value

// Soft enter: each block starts 100 ms after the one before (global .animate-enter);
// title words add 80 ms each on top of the title's own slot.
const enter = (stagger: number, delayMs = 0) => ({
  className: "animate-enter",
  style: { "--stagger": stagger, "--delay": `${delayMs}ms` } as CSSProperties,
})

export const Header = () => (
  <section className={styles.header}>
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span
            className={`${styles.hey} animate-enter`}
            style={enter(1).style}
          >
            Hey,
          </span>
          <span
            className={`${styles.switcher} animate-enter`}
            style={enter(1, 80).style}
            aria-hidden="true"
          >
            <img
              src={avatar}
              width={64}
              height={64}
              alt=""
              className={styles.avatar}
            />
          </span>
          <span {...enter(1, 160)}>I&apos;m&nbsp;</span>
          <span {...enter(1, 240)}>Polina&nbsp;—</span>
        </h1>

        <div {...enter(2, 240)}>
          <MarkerText as="p" className={styles.subtitle}>
            a{" "}
            <Mark type="underline" color={PURPLE} opacity={1}>
              holistic product designer
            </Mark>{" "}
            who speaks{" "}
            <Mark color={PURPLE} opacity={0.2}>
              code and data
            </Mark>
            . From research to shipped, measured product.
          </MarkerText>
        </div>

        <div
          className={`${styles.socials} animate-enter`}
          data-place="hero"
          style={enter(3, 240).style}
        >
          {HERO_SOCIALS.map((social) => (
            <IconButton
              key={social.label}
              icon={social.icon}
              href={social.href}
              label={social.label}
            />
          ))}
        </div>

        <div
          className={`${styles.location} animate-enter`}
          style={enter(4, 240).style}
        >
          <HelsinkiTime /> – Helsinki, Finland
        </div>
      </div>
    </div>
  </section>
)
