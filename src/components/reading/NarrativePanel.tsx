import type { DrawnCard, ReadingNarrative } from '../../types'
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

export function NarrativePanel({ narrative, cards }: { narrative: ReadingNarrative; cards: DrawnCard[] }) {
  return (
    <section className="animate-reveal relative overflow-hidden rounded-2xl border border-cyan-soft/25 bg-gradient-to-b from-indigo-soft/50 to-indigo-night/60 p-5 backdrop-blur-sm sm:p-8">
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
        <ChakanaMark className="h-32 w-32 text-cyan-soft" />
      </div>
      <header className="relative text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-soft/70">Interpretación de la lectura</p>
        <h2 className="mt-2 font-display text-2xl leading-snug text-ivory sm:text-3xl">{narrative.titulo}</h2>
        {narrative.pregunta && <p className="mt-2 font-display text-sm italic text-mist/75 sm:text-base">«{narrative.pregunta}»</p>}
      </header>
      <div className="relative mt-6 flex flex-wrap justify-center gap-2">
        {cards.map((d, i) => (
          <span key={d.position.id} className="rounded-full border border-white/10 bg-night/50 px-3 py-1 text-[11px] text-mist/80">
            <span className="text-gold/70">{i + 1}.</span>{' '}
            <span className="text-ivory/90">{d.card.name}</span>
            {d.reversed && <span className="text-electric-bright"> (inv.)</span>}
            <span className="text-mist/50"> · {d.position.label}</span>
          </span>
        ))}
      </div>
      <div className="relative">
        <Encabezado>El relato de la tirada</Encabezado>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist/90 sm:text-base">
          {narrative.relato.map((parrafo, i) => <p key={i}>{parrafo}</p>)}
        </div>
        <Encabezado>Lo que permanece oculto</Encabezado>
        <p className="mt-4 border-l-2 border-electric/40 pl-4 text-sm leading-relaxed text-mist/90 sm:text-base">{narrative.oculto}</p>
        <Encabezado>La respuesta más clara</Encabezado>
        <p className="mt-4 font-display text-base italic leading-relaxed text-ivory sm:text-lg">{narrative.respuesta}</p>
        <Encabezado>Consejo de los Apus</Encabezado>
        <div className="mt-4 rounded-xl border border-gold/25 bg-night/40 p-4">
          <p className="text-sm leading-relaxed text-ivory/90 sm:text-base">{narrative.consejo}</p>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-mist/55">{narrative.advertencia}</p>
      </div>
    </section>
  )
}
