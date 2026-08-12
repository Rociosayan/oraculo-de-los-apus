import { Outlet } from 'react-router-dom'
import { CosmicBackground } from '../atmosphere/CosmicBackground'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CosmicBackground />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
