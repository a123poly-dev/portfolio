import { Navbar } from "@design-system/features/Navbar"
import { Header } from "@design-system/features/Header"
import { WorksGrid } from "../components/WorksGrid/WorksGrid"
import { Footer } from "@design-system/features/Footer"

import styles from "./HomePage.module.scss"

export const HomePage = () => (
  <div className={styles.home}>
    <Navbar isMainPage />
    <Header />
    <div className={styles.belowHero}>
      <WorksGrid />
      <Footer />
    </div>
  </div>
)
