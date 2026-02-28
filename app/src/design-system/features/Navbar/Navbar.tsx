import { useState, useEffect, useRef } from "react"
import {
  ROOT_PATH,
  MAIN_PAGE_WORKS,
  MAIN_PAGE_ABOUT,
} from "../../../constants/routePathConstants"

import { ButtonLink } from "@design-system/common/ButtonLink"
import { BurgerButton } from "@design-system/features/BurgerButton"
import styles from "./Navbar.module.scss"
import { MobileMenu } from "./MobileMenu"

type TNavbarProps = {
  isMainPage?: boolean
}

export const Navbar = ({ isMainPage = false }: TNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

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
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65ca4aabc8b3698a1fb75d27_logo.svg"
              width={138}
              alt="Polina's Portfolio"
              className={styles.logo}
            />
          </a>

          {/* Desktop nav — hidden on mobile */}
          <ul className={styles.navList}>
            {isMainPage && (
              <>
                <li>
                  <ButtonLink href={MAIN_PAGE_WORKS}>Works</ButtonLink>
                </li>
                <li>
                  <ButtonLink href={MAIN_PAGE_ABOUT}>About &amp;CV</ButtonLink>
                </li>
              </>
            )}
            <li>
              <ButtonLink
                href="https://www.linkedin.com/in/apolina/"
                isExternal
              >
                LinkedIn
              </ButtonLink>
            </li>
          </ul>

          {/* Burger — visible on mobile only */}
          <div className={styles.burgerWrap}>
            <BurgerButton
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu — always in DOM for CSS animation */}
      <MobileMenu
        isOpen={isOpen}
        handleLinkClick={handleLinkClick}
        isMainPage={isMainPage}
      />
    </nav>
  )
}
