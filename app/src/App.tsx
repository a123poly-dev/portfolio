import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/global.scss"
import { HomePage } from "./pages/HomePage"
import { PulkovoPage } from "./pages/PulkovoPage"
import { OkeyAppPage } from "./pages/OkeyAppPage"
import { OkeySitePage } from "./pages/OkeySitePage"
import { YaCallsPage } from "./pages/YaCallsPage"
import { TaxiPage } from "./pages/TaxiPage"
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
  SYNTHUX_END_TO_END_PATH,
  SYNTHUX_DESIGN_SYSTEM_PATH,
  SYNTHUX_AI_PROCESS_PATH,
  SYNTHUX_PREVIEW_PATH,
} from "./constants/routePathConstants"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_PATH} element={<HomePage />} />
        <Route path={PULKOVO_PATH} element={<PulkovoPage />} />
        <Route path={OKEY_APP_PATH} element={<OkeyAppPage />} />
        <Route path={OKEY_SITE_PATH} element={<OkeySitePage />} />
        <Route path={YA_CALLS_PATH} element={<YaCallsPage />} />
        <Route path={TAXI_PATH} element={<TaxiPage />} />
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
