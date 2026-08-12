import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/AppLayout'
import { DiaryProvider } from './context/DiaryContext'
import { HomePage } from './pages/HomePage'
import { ReadingsPage } from './pages/ReadingsPage'
import { ReadingSessionPage } from './pages/ReadingSessionPage'
import { CardsPage } from './pages/CardsPage'
import { DiaryPage } from './pages/DiaryPage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <DiaryProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="lecturas" element={<ReadingsPage />} />
            <Route path="lecturas/:spreadId" element={<ReadingSessionPage />} />
            <Route path="cartas" element={<CardsPage />} />
            <Route path="diario" element={<DiaryPage />} />
            <Route path="acerca" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DiaryProvider>
  )
}
