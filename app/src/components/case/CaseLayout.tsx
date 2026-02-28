import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Navbar } from "@design-system/features/Navbar/Navbar"
import { KiitosSection } from "./KiitosSection"
import { Footer } from "@design-system/features/Footer"

export const CaseLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <KiitosSection />
      <Footer />
    </>
  )
}
