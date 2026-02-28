import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { Footer } from "../components/Footer/Footer"
import { VideoEmbed } from "../components/case/VideoEmbed"

import caseStyles from "../components/case/case.module.scss"
import styles from "./TaxiPage.module.scss"

export const TaxiPage = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.documentElement.dataset.theme = "dark"
    return () => {
      document.documentElement.dataset.theme = "light"
    }
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero intro */}
      <div className={styles.heroStack}>
        <div className={styles.heroTitle}>
          <p className={styles.label}>2020</p>
          <h1 className={styles.h2White}>
            Concept of Sitimobil Assist for driver app taxi
          </h1>
        </div>
        <div>
          <p className={styles.label}>Challenge</p>
          <p className={styles.paragraphWhite}>
            Navigating the bustling streets as a taxi driver can be daunting,
            whether you&apos;re just starting out or a professional. The lack of
            readily available information makes it difficult to analyze the
            dynamic city landscape. Time, experience, and painstaking efforts
            are required to gather the necessary insightstyles.
          </p>
        </div>
        <div>
          <p className={styles.label}>Inspiration</p>
          <p className={styles.paragraphWhite}>
            Imagine a solution that empowers taxi drivers with a trusted
            companion—an integrated voice assistant within the aggregator
            platform. This magical assistant comes to life at your command,
            eagerly awaiting to offer invaluable guidance and support. Through
            its intelligent capabilities, it opens the gateway to a treasure
            trove of analytical data. From hotspots of high demand to areas of
            potential customer surges, the assistant becomes the driver&apos;s
            navigational ally.
          </p>
        </div>
      </div>

      {/* Gradient text statement */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        <span className={caseStyles.gradientPurple}>
          Welcome to a new era of driving, where knowledge and support are just
          a voice command away.
        </span>
      </div>

      {/* About concept — image left, text right */}
      <div className={styles.heroSection}>
        <div className={styles.heroFlex}>
          <div className={styles.heroSplit}>
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a97685c8b96cd400e1aaad_Frame%2034064.png"
              alt="About concept"
              loading="lazy"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroSplit}>
            <h2 className={styles.h4White}>About concept</h2>
            <p className={styles.paragraphWhite}>
              Sitimobil Assist is an intelligent driver assistant integrated
              into the Sitimobil app. This feature provides drivers with
              personalized recommendations and valuable information based on the
              analysis of their preferences, driving behavior, and external
              factorstyles. The assistant helps the taxi driver not to waste his
              time. Gives tips on when they should take a break, warn that it
              will rain soon and there will be an increased taxi ride
              coefficient, etc. Answering questions and building a route.
            </p>
          </div>
        </div>
      </div>

      {/* Easy to run — text left, image right */}
      <div className={styles.heroSection}>
        <div className={styles.heroFlex}>
          <div className={styles.heroSplit}>
            <h2 className={styles.h4White}>Easy to run</h2>
            <p className={styles.paragraphWhite}>
              The assistant can be activated either by voice command or by
              pressing a dedicated button. This convenient feature ensures that
              taxi drivers can access the assistant without being distracted
              from the road.
            </p>
          </div>
          <div className={styles.heroSplit}>
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a976853bb2957738a84f8e_Frame%2034064-1.png"
              alt="Easy to run"
              loading="lazy"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      {/* Recommendations — image left, text right */}
      <div className={styles.heroSection}>
        <div className={styles.heroFlex}>
          <div className={styles.heroSplit}>
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a97685e6d7f48c1fceb256_Frame%2034064-2.png"
              alt="Recommendations"
              loading="lazy"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroSplit}>
            <h2 className={styles.h4White}>Recommendations</h2>
            <p className={styles.paragraphWhite}>
              The Assistant collects data and help the driver with widgets to
              optimise their performance.
            </p>
            <p className={styles.paragraphWhite} style={{ marginTop: "16px" }}>
              It discreetly reminds you to take breaks, ensuring your
              well-being. The card contains statistics for the shift, on the
              week and month level. The assistant shows you informed about the
              weather and local events, providing a heads-up on potential spikes
              in demand.
            </p>
            <p className={styles.paragraphWhite} style={{ marginTop: "16px" }}>
              If the taxi driver is not driving he or she can study the section
              with articles where information is collected on how to improve the
              rating. Elevate your expertise and become a true maestro of the
              taxi realm.
            </p>
          </div>
        </div>
      </div>

      {/* Demand forecast — text left, image right */}
      <div className={styles.heroSection}>
        <div className={styles.heroFlex}>
          <div className={styles.heroSplit}>
            <h2 className={styles.h4White}>Demand forecast</h2>
            <p className={styles.paragraphWhite}>
              Assistant uses analytical algorithms to predict peak demand in
              specific time intervals and areastyles. On the map it provides
              drivers with information about the most promising locations and
              times to increase the number of orderstyles.
            </p>
          </div>
          <div className={styles.heroSplit}>
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a9d24737b580eded798cf2_Frame%2034064.png"
              alt="Demand forecast"
              loading="lazy"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      {/* Prototype video */}
      <div className={styles.prototypeSection}>
        <h2 className={styles.headingWhite}>
          Let&apos;s see the prototype of app
        </h2>
        <div className={styles.videoWrapper}>
          <VideoEmbed vimeoId="919276369" width={500} height={727} />
        </div>
        <br />
        <a
          href="https://www.figma.com/proto/u42zHC3f8mUYhgMDA33oI6/Citimobil%2Fdriver-(eng)?page-id=38%3A591&type=design&node-id=200-4325&viewport=-743%2C354%2C0.28&t=syKfSkOaHzNxaKJr-1&scaling=scale-down&starting-point-node-id=200%3A4325&mode=design"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkWhite}
        >
          Prototype link in Figma
        </a>
      </div>

      {/* Kiitos dark version */}
      <div className={styles.kiitosSection}>
        <div className={styles.heroFlex}>
          <div className={styles.heroSplit}>
            <h1 className={styles.kiitosTitle}>Kiitos!*</h1>
            <p className={styles.kiitosSubtitle}>*Thanks</p>
          </div>
          <div className={styles.heroSplit}>
            <img
              src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a9768448fbf45c6d1c7d34_sticker%201.png"
              alt="Sticker"
              loading="lazy"
              className={styles.sticker}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
