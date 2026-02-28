import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import { HomePage } from './pages/HomePage'
import { PulkovoPage } from './pages/PulkovoPage'
import { OkeyAppPage } from './pages/OkeyAppPage'
import { OkeySitePage } from './pages/OkeySitePage'
import { YaCallsPage } from './pages/YaCallsPage'
import { TaxiPage } from './pages/TaxiPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pulkovo" element={<PulkovoPage />} />
        <Route path="/okey-app" element={<OkeyAppPage />} />
        <Route path="/okey-site" element={<OkeySitePage />} />
        <Route path="/ya-calls" element={<YaCallsPage />} />
        <Route path="/taxi" element={<TaxiPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
