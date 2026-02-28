import { Navbar } from "../components/Navbar/Navbar"
import { Header } from "../components/Header/Header"
import { WorksGrid } from "../components/WorksGrid/WorksGrid"
import { About } from "../components/About/About"
import { Footer } from "../components/Footer/Footer"

export const HomePage = () => (
  <>
    <Navbar isMainPage />
    <Header />
    <WorksGrid />
    <About />
    <Footer />
  </>
)
