import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChakanaMark } from '../atmosphere/CosmicBackground'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useCopy } from '../../content/translations'

const routes = [
  { to: '/', end: true }, { to: '/lecturas' }, { to: '/cartas' },
  { to: '/tienda' }, { to: '/diario' }, { to: '/acerca' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = useCopy(language)

  const languagePicker = (compact = false) => (
    <div className={`flex items-center rounded-full border border-white/10 bg-night/50 p-1 ${compact ? 'self-start' : ''}`} aria-label="Language selector">
      {(['es', 'en', 'fr'] as Language[]).map((code) => (
        <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={language === code}
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition ${language === code ? 'bg-cyan-soft text-night' : 'text-mist/65 hover:text-ivory'}`}>
          {code}
        </button>
      ))}
    </div>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-night/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <ChakanaMark className="h-8 w-8 text-cyan-soft transition group-hover:text-gold-soft" />
          <span className="font-display text-lg tracking-wide text-ivory sm:text-xl">{t.heroTitle}</span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
          {routes.map((route, index) => (
            <NavLink key={route.to} to={route.to} end={route.end}
              className={({ isActive }) => `rounded-full px-3 py-1.5 text-sm transition ${isActive ? 'bg-white/10 text-cyan-soft' : 'text-mist/80 hover:bg-white/5 hover:text-ivory'}`}>
              {t.nav[index]}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">{languagePicker()}</div>
        <button type="button" className="rounded-lg border border-white/10 p-2 text-mist xl:hidden" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <span className="mb-1 block h-0.5 w-5 bg-current" /><span className="mb-1 block h-0.5 w-5 bg-current" /><span className="block h-0.5 w-5 bg-current" />
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/5 bg-indigo-night/95 px-4 py-3 xl:hidden" aria-label="Mobile">
          <div className="mb-3 sm:hidden">{languagePicker(true)}</div>
          <ul className="flex flex-col gap-1">
            {routes.map((route, index) => (
              <li key={route.to}><NavLink to={route.to} end={route.end} onClick={() => setOpen(false)}
                className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-sm ${isActive ? 'bg-white/10 text-cyan-soft' : 'text-mist'}`}>
                {t.nav[index]}
              </NavLink></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
