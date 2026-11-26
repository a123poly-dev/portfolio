import { useState, useEffect, useRef } from "react"
import { CV_URL } from "../../../constants/socials"
import {
  ROOT_PATH,
  MAIN_PAGE_WORKS,
} from "../../../constants/routePathConstants"

import { ButtonLink } from "@design-system/common/ButtonLink"
import { BurgerButton } from "@design-system/features/BurgerButton"
import styles from "./Navbar.module.scss"
import { MobileMenu } from "./MobileMenu"
import { CvMorphIcon } from "./CvMorphIcon"
import { LogoMark } from "./LogoMark"
import { ThemeToggle } from "@design-system/features/ThemeToggle"

// How long the CV icon stays a check before turning back into an arrow
const CV_CHECK_MS = 2000

type TNavbarProps = {
  isMainPage?: boolean
}

export const Navbar = ({ isMainPage = false }: TNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const [cvDone, setCvDone] = useState(false)
  const cvTimer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(cvTimer.current), [])

  const handleCvClick = () => {
    setCvDone(true)
    window.clearTimeout(cvTimer.current)
    cvTimer.current = window.setTimeout(() => setCvDone(false), CV_CHECK_MS)
  }

  useEffect(() => {
    if (!isOpen) return

    const close = () => setIsOpen(false)

    const handleClickOutside = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        close()
      }
    }

    window.addEventListener("scroll", close)
    document.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", close)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav ref={navRef} className={styles.menu}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <a href={ROOT_PATH} className={styles.logo}>
            <LogoMark />
          </a>

          {/* Desktop nav — hidden on mobile */}
          <ul className={styles.navList}>
            {isMainPage && (
              <li>
                <ButtonLink href={MAIN_PAGE_WORKS}>Works</ButtonLink>
              </li>
            )}
            <li>
              <ButtonLink
                href="https://www.linkedin.com/in/apolina/"
                isExternal
              >
                LinkedIn
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={CV_URL} isExternal onClick={handleCvClick}>
                CV Download
                <CvMorphIcon checked={cvDone} />
              </ButtonLink>
            </li>
          </ul>

          <div className={styles.actions}>
            <ThemeToggle />

            {/* Burger — visible on mobile only */}
            <div className={styles.burgerWrap}>
              <BurgerButton
                isOpen={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — always in DOM for CSS animation */}
      <MobileMenu
        isOpen={isOpen}
        handleLinkClick={handleLinkClick}
        isMainPage={isMainPage}
        cvUrl={CV_URL}
      />
    </nav>
  )
}
