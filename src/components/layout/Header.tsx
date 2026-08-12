import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChakanaMark } from '../atmosphere/CosmicBackground'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/lecturas', label: 'Lecturas' },
  { to: '/cartas', label: 'Cartas' },
  { to: '/diario', label: 'Mi diario' },
  { to: '/acerca', label: 'Acerca del oráculo' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-night/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <ChakanaMark className="h-8 w-8 text-cyan-soft transition group-hover:text-gold-soft" />
          <span className="font-display text-lg tracking-wide text-ivory sm:text-xl">
            Oráculo de los Apus
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-cyan-soft'
                    : 'text-mist/80 hover:bg-white/5 hover:text-ivory'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-mist lg:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-current mb-1" />
          <span className="block h-0.5 w-5 bg-current mb-1" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/5 bg-indigo-night/95 px-4 py-3 lg:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm ${
                      isActive ? 'bg-white/10 text-cyan-soft' : 'text-mist'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
