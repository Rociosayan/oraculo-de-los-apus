import { useState } from 'react'
import { ANDEAN_CARDS } from '../data/cards'
import type { AndeanCard } from '../types'
import { TarotCard } from '../components/cards/TarotCard'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { CardMotifSvg } from '../components/cards/CardMotifSvg'
import { cardImageSrc } from '../data/cardImages'

export function CardsPage() {
  const [selected, setSelected] = useState<AndeanCard | null>(null)

  return (
    <Section className="py-12 sm:py-16">
      <SectionTitle
        eyebrow="El mazo completo"
        title="Las 22 cartas andinas"
        subtitle="Arcanos mayores reinterpretados con respeto desde los símbolos de los Andes. Toca una carta para leer su mensaje."
      />

      <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {ANDEAN_CARDS.map((card) => (
          <TarotCard
            key={card.id}
            card={card}
            faceDown={false}
            size="gallery"
            onClick={() => setSelected(card)}
            className="w-full transition duration-300 hover:-translate-y-1"
          />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-night/80 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <Panel className="animate-reveal max-h-[88vh] w-full max-w-2xl overflow-y-auto border-cyan-soft/25 bg-indigo-night/95">
            <div
              className="sm:flex sm:items-start sm:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ilustración ampliada */}
              <img
                src={cardImageSrc(selected.id)}
                alt={`${selected.name}, ${selected.symbol}`}
                className="mx-auto h-auto w-52 shrink-0 rounded-xl border-2 border-gold/50 object-cover shadow-[0_0_28px_rgba(59,130,246,0.25)] sm:mx-0 sm:w-60"
              />

              <div className="mt-5 sm:mt-0 sm:flex-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">
                  {selected.id} · {selected.arcanaRef}
                </p>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-3xl text-ivory">
                    {selected.name}
                  </h3>
                  <div className="h-7 w-7 shrink-0 text-cyan-soft">
                    <CardMotifSvg motif={selected.motif} />
                  </div>
                </div>
                <p className="text-base text-mist/80">{selected.symbol}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-electric/15 px-3 py-1 text-[11px] text-cyan-soft"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-mist/60">
                  Símbolos andinos: {selected.simbolosAndinos.join(', ')}
                </p>

                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    Significado general
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoGeneral}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    En el amor
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoAmor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    En el trabajo y el dinero
                  </dt>
                  <dd className="mt-1 text-mist/85">
                    {selected.significadoTrabajoDinero}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    En lo espiritual
                  </dt>
                  <dd className="mt-1 text-mist/85">
                    {selected.significadoEspiritual}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    Su sombra
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoSombra}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    Mensaje andino
                  </dt>
                  <dd className="mt-1 font-display text-base italic text-ivory/90">
                    {selected.andeanMessage}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    Consejo práctico
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.consejoPractico}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    Preguntas de reflexión
                  </dt>
                  <dd className="mt-1">
                    <ul className="list-inside list-disc space-y-1 text-mist/85">
                      {selected.preguntasDeReflexion.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full rounded-full border border-white/15 py-2.5 text-sm text-mist transition hover:bg-white/5"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Panel>
        </div>
      )}
    </Section>
  )
}
