import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./styles/global.scss"
import { HomePage } from "./pages/HomePage"
import { PulkovoPage } from "./pages/PulkovoPage"
import { OkeyAppPage } from "./pages/OkeyAppPage"
import { OkeySitePage } from "./pages/OkeySitePage"
import { YaCallsPage } from "./pages/YaCallsPage"
import { TaxiPage } from "./pages/TaxiPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import { ConsentNotice } from "@design-system/features/ConsentNotice"
import { useAnalytics } from "./analytics/useAnalytics"
import { SynthuxEndToEndPage } from "./pages/synthux/SynthuxEndToEndPage"
import { SynthuxDesignSystemPage } from "./pages/synthux/SynthuxDesignSystemPage"
import { SynthuxAiProcessPage } from "./pages/synthux/SynthuxAiProcessPage"
import { SynthuxPreviewPage } from "./pages/synthux/SynthuxPreviewPage"
import { isCaseVisible, isPreviewVisible } from "./constants/synthuxCases"
import {
  ROOT_PATH,
  PULKOVO_PATH,
  OKEY_APP_PATH,
  OKEY_SITE_PATH,
  YA_CALLS_PATH,
  TAXI_PATH,
  PRIVACY_PATH,
  SYNTHUX_END_TO_END_PATH,
  SYNTHUX_DESIGN_SYSTEM_PATH,
  SYNTHUX_AI_PROCESS_PATH,
  SYNTHUX_PREVIEW_PATH,
} from "./constants/routePathConstants"

// Page views and click events; needs the router, so it sits inside it
const Analytics = () => {
  useAnalytics()
  return null
}

// Vercel Speed Insights: page-load timings (Core Web Vitals) per route.
// No cookies and nothing that identifies a visitor, so it runs without consent;
// it is listed on the /privacy page. Reports only from Vercel deployments.
const Performance = () => {
  const { pathname } = useLocation()
  return <SpeedInsights route={pathname} />
}

const App = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <Performance />
      <ConsentNotice />
      <Routes>
        <Route path={ROOT_PATH} element={<HomePage />} />
        <Route path={PULKOVO_PATH} element={<PulkovoPage />} />
        <Route path={OKEY_APP_PATH} element={<OkeyAppPage />} />
        <Route path={OKEY_SITE_PATH} element={<OkeySitePage />} />
        <Route path={YA_CALLS_PATH} element={<YaCallsPage />} />
        <Route path={TAXI_PATH} element={<TaxiPage />} />
        <Route path={PRIVACY_PATH} element={<PrivacyPage />} />
        {isCaseVisible("endToEnd") && (
          <Route path={SYNTHUX_END_TO_END_PATH} element={<SynthuxEndToEndPage />} />
        )}
        {isCaseVisible("designSystem") && (
          <Route path={SYNTHUX_DESIGN_SYSTEM_PATH} element={<SynthuxDesignSystemPage />} />
        )}
        {isCaseVisible("aiProcess") && (
          <Route path={SYNTHUX_AI_PROCESS_PATH} element={<SynthuxAiProcessPage />} />
        )}
        {isPreviewVisible() && (
          <Route path={SYNTHUX_PREVIEW_PATH} element={<SynthuxPreviewPage />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
