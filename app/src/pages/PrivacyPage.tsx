import { CaseLayout } from "../components/case/CaseLayout"
import { openConsentSettings } from "../analytics/consent"
import styles from "./PrivacyPage.module.scss"

// Plain-language privacy note for the data notice (see design-system/features/ConsentNotice)
export const PrivacyPage = () => (
  <CaseLayout>
    <article className={styles.page}>
      <h1 className={styles.title}>Privacy</h1>
      <p className={styles.lead}>
        This is a personal portfolio. I count visits and clicks to learn which
        work people read, and only after you agree.
      </p>

      <h2 className={styles.heading}>What runs, and when</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Tools</th>
            <th>What it collects</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essential</td>
            <td>Your browser&apos;s storage</td>
            <td>Your theme and your privacy choice. Always on, never sent anywhere.</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Yandex Metrica, Varioqub</td>
            <td>
              Pages you open, how far you scroll, which links and demos you use,
              your rough location, device and browser. Off until you agree.
            </td>
          </tr>
          <tr>
            <td>Session recordings</td>
            <td>Hotjar, Metrica Webvisor</td>
            <td>
              Anonymous replays of mouse moves, clicks and scrolls, and heatmaps.
              Text you type is masked. Off until you agree.
            </td>
          </tr>
          <tr>
            <td>Performance</td>
            <td>Vercel Speed Insights</td>
            <td>
              How fast each page loads on your device. No cookies and nothing
              that identifies you, so it is always on.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.heading}>Your choice</h2>
      <p className={styles.body}>
        Your answer is kept for 12 months, then I ask again. You can change it
        at any time, and turning a category off stops it and clears its
        cookies.
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={openConsentSettings}
      >
        Change privacy settings
      </button>

      <h2 className={styles.heading}>Who sees the data</h2>
      <p className={styles.body}>
        Only me, in the Yandex Metrica and Hotjar dashboards. Each service keeps
        its data under its own policy:{" "}
        <a href="https://yandex.com/legal/confidential/" target="_blank" rel="noopener noreferrer">
          Yandex
        </a>
        ,{" "}
        <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer">
          Hotjar
        </a>
        . Questions:{" "}
        <a href="https://www.linkedin.com/in/apolina/" target="_blank" rel="noopener noreferrer">
          write to me on LinkedIn
        </a>
        .
      </p>
    </article>
  </CaseLayout>
)
