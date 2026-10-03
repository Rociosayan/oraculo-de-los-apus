// oxlint-disable react/only-export-components -- provider and hook intentionally share one context module
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'es' | 'en' | 'fr'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLanguage(): Language {
  const saved = localStorage.getItem('apus-language')
  if (saved === 'es' || saved === 'en' || saved === 'fr') return saved
  for (const locale of navigator.languages ?? [navigator.language]) {
    const code = locale.toLowerCase().split('-')[0]
    if (code === 'es' || code === 'en' || code === 'fr') return code
  }
  return 'es'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    localStorage.setItem('apus-language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
