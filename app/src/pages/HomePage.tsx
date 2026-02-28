import { Navbar } from "@design-system/features/Navbar"
import { Header } from "@design-system/features/Header"
import { WorksGrid } from "../components/WorksGrid/WorksGrid"
import { About } from "../components/About/About"
import { Footer } from "@design-system/features/Footer"

export const HomePage = () => (
  <>
    <Navbar isMainPage />
    <Header />
    <WorksGrid />
    <About />
    <Footer />
  </>
)
