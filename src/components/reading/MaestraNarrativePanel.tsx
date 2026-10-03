import type { MaestraNarrative } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { useCopy } from '../../content/translations'
import { ChakanaMark } from '../atmosphere/CosmicBackground'

function Encabezado({ children }: { children: string }) {
  return (
    <div className="mt-8 flex items-center gap-3 first:mt-0">
      <span className="h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-gold/50" />
      <h3 className="text-[11px] uppercase tracking-[0.24em] text-gold-soft">{children}</h3>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  )
}

export function MaestraNarrativePanel({ narrative }: { narrative: MaestraNarrative }) {
  const { language } = useLanguage()
  const t = useCopy(language)

  return (
    <section className="animate-reveal relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/5 to-indigo-night/60 p-5 backdrop-blur-sm sm:p-8">
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
        <ChakanaMark className="h-32 w-32 text-gold" />
      </div>
      <header className="relative text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">{t.maestraCta}</p>
      </header>
      <div className="relative">
        <Encabezado>{t.hidden}</Encabezado>
        <p className="mt-4 border-l-2 border-electric/40 pl-4 text-sm leading-relaxed text-mist/90 sm:text-base">
          {narrative.oculto}
        </p>
        <Encabezado>{t.clearAnswer}</Encabezado>
        <p className="mt-4 font-display text-base italic leading-relaxed text-ivory sm:text-lg">
          {narrative.respuesta}
        </p>
        <Encabezado>{t.advice}</Encabezado>
        <div className="mt-4 rounded-xl border border-gold/25 bg-night/40 p-4">
          <p className="text-sm leading-relaxed text-ivory/90 sm:text-base">{narrative.consejo}</p>
        </div>
      </div>
    </section>
  )
}
