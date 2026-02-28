import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/global.scss"
import { HomePage } from "./pages/HomePage"
import { PulkovoPage } from "./pages/PulkovoPage"
import { OkeyAppPage } from "./pages/OkeyAppPage"
import { OkeySitePage } from "./pages/OkeySitePage"
import { YaCallsPage } from "./pages/YaCallsPage"
import { TaxiPage } from "./pages/TaxiPage"
import {
  ROOT_PATH,
  PULKOVO_PATH,
  OKEY_APP_PATH,
  OKEY_SITE_PATH,
  YA_CALLS_PATH,
  TAXI_PATH,
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
