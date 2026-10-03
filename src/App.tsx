import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/AppLayout'
import { DiaryProvider } from './context/DiaryContext'
import { HomePage } from './pages/HomePage'
import { ReadingsPage } from './pages/ReadingsPage'
import { ReadingSessionPage } from './pages/ReadingSessionPage'
import { CardsPage } from './pages/CardsPage'
import { DiaryPage } from './pages/DiaryPage'
import { AboutPage } from './pages/AboutPage'
import { ShopPage } from './pages/ShopPage'
import { StoreHomePage } from './pages/StoreHomePage'
import { StoreCartPage } from './pages/StoreCartPage'
import { StoreCartProvider } from './context/StoreCartContext'
import { StoreAccessoriesPage, StoreClothingPage, StoreKitsPage } from './pages/StoreCategoryPages'
import { LanguageProvider } from './context/LanguageContext'
import { FortressPage } from './pages/FortressPage'
import { AdminCatalogPage } from './pages/AdminCatalogPage'

export default function App() {
  return (
    <LanguageProvider>
    <StoreCartProvider>
    <DiaryProvider>
      <HashRouter>
        <Routes>
          <Route path="fortaleza" element={<FortressPage />} />
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="lecturas" element={<ReadingsPage />} />
            <Route path="lecturas/:spreadId" element={<ReadingSessionPage />} />
            <Route path="cartas" element={<CardsPage />} />
            <Route path="tienda" element={<StoreHomePage />} />
            <Route path="tienda/ropa" element={<StoreClothingPage />} />
            <Route path="tienda/accesorios" element={<StoreAccessoriesPage />} />
            <Route path="tienda/kits" element={<StoreKitsPage />} />
            <Route path="tienda/espiritual" element={<ShopPage />} />
            <Route path="tienda/carrito" element={<StoreCartPage />} />
            <Route path="admin-tienda" element={<AdminCatalogPage />} />
            <Route path="diario" element={<DiaryPage />} />
            <Route path="acerca" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DiaryProvider>
    </StoreCartProvider>
    </LanguageProvider>
  )
}
