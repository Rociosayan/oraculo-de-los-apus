import { useState } from 'react'
import { ANDEAN_CARDS } from '../data/cards'
import type { AndeanCard } from '../types'
import { TarotCard } from '../components/cards/TarotCard'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { CardMotifSvg } from '../components/cards/CardMotifSvg'
import { cardImageSrc } from '../data/cardImages'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'
import { localizedCardFields } from '../content/cardCopy'

export function CardsPage() {
  const [selected, setSelected] = useState<AndeanCard | null>(null)
  const [group, setGroup] = useState('all')
  const { language } = useLanguage()
  const t = useCopy(language)

  return (
    <Section className="py-12 sm:py-16">
      <SectionTitle
        eyebrow={t.cardsEyebrow}
        title={t.cardsTitle}
        subtitle={t.cardsText}
      />

      <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-mist/75">
        {language === 'es' ? '22 arcanos mayores y 50 cartas originales organizadas en los caminos de Tierra, Agua, Fuego, Aire y Comunidad. Las 50 nuevas tienen arte simbólico provisional y textos pendientes de revisión con tu método de lectura.' : language === 'fr' ? '22 arcanes majeurs et 50 cartes originales réparties entre Terre, Eau, Feu, Air et Communauté. Leurs illustrations et interprétations restent provisoires.' : '22 Major Arcana and 50 original cards across Earth, Water, Fire, Air and Community. Their artwork and interpretations are provisional.'}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label={language === 'es' ? 'Filtrar cartas' : 'Filter cards'}>
        {(['all', 'major', 'Tierra', 'Agua', 'Fuego', 'Aire', 'Comunidad'] as const).map((value) => (
          <button key={value} type="button" onClick={() => setGroup(value)} aria-pressed={group === value} className={`rounded-full border px-4 py-2 text-sm transition ${group === value ? 'border-gold bg-gold/20 text-ivory' : 'border-white/20 text-mist hover:border-gold/60'}`}>
            {value === 'all' ? (language === 'es' ? 'Todas' : language === 'fr' ? 'Toutes' : 'All') : value === 'major' ? (language === 'es' ? 'Arcanos mayores' : language === 'fr' ? 'Arcanes majeurs' : 'Major Arcana') : value}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {ANDEAN_CARDS.filter((card) => group === 'all' || (group === 'major' ? card.id < 22 : card.arcanaRef === `Camino de ${group}`)).map((card) => (
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
              {cardImageSrc(selected.id) ? <img
                src={cardImageSrc(selected.id)}
                alt={`${selected.name}, ${selected.symbol}`}
                className="mx-auto h-auto w-52 shrink-0 rounded-xl border-2 border-gold/50 object-cover shadow-[0_0_28px_rgba(59,130,246,0.25)] sm:mx-0 sm:w-60"
              /> : <div className="mx-auto flex aspect-[2/3] w-52 shrink-0 flex-col items-center justify-center gap-5 rounded-xl border-2 border-gold/50 bg-[radial-gradient(circle,#254268,#0b1229_70%)] p-5 text-center shadow-[0_0_28px_rgba(59,130,246,0.25)] sm:mx-0 sm:w-60"><span className="font-display text-5xl text-gold-soft">✦</span><p className="font-display text-2xl text-ivory">{selected.name}</p><p className="text-sm text-cyan-soft">{selected.symbol}</p></div>}

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

                {(() => {
                  const loc = localizedCardFields(selected, language)
                  return (
                    <>
                <div className="mt-4 flex flex-wrap gap-2">
                  {loc.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-electric/15 px-3 py-1 text-[11px] text-cyan-soft"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-mist/60">
                  {t.andeanSymbols}: {selected.simbolosAndinos.join(', ')}
                </p>

                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                {language === 'es' ? (
                  <>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    {t.meaningGeneral}
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoGeneral}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    {t.meaningLove}
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoAmor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    {t.meaningWork}
                  </dt>
                  <dd className="mt-1 text-mist/85">
                    {selected.significadoTrabajoDinero}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    {t.meaningSpirit}
                  </dt>
                  <dd className="mt-1 text-mist/85">
                    {selected.significadoEspiritual}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    {t.meaningShadow}
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.significadoSombra}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    {t.andeanMsg}
                  </dt>
                  <dd className="mt-1 font-display text-base italic text-ivory/90">
                    {selected.andeanMessage}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    {t.practicalAdvice}
                  </dt>
                  <dd className="mt-1 text-mist/85">{selected.consejoPractico}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    {t.reflection}
                  </dt>
                  <dd className="mt-1">
                    <ul className="list-inside list-disc space-y-1 text-mist/85">
                      {selected.preguntasDeReflexion.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                  </>
                ) : (
                  <>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/70">
                    {t.meaningUpright}
                  </dt>
                  <dd className="mt-1 text-mist/85">{loc.meaning}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    {t.meaningReversed}
                  </dt>
                  <dd className="mt-1 text-mist/85">{loc.reversedMeaning}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    {t.andeanMsg}
                  </dt>
                  <dd className="mt-1 font-display text-base italic text-ivory/90">
                    {loc.andeanMessage}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-electric-bright/80">
                    {t.practicalAdvice}
                  </dt>
                  <dd className="mt-1 text-mist/85">{loc.advice}</dd>
                </div>
                  </>
                )}
                </dl>
                    </>
                  )
                })()}

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full rounded-full border border-white/15 py-2.5 text-sm text-mist transition hover:bg-white/5"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </Panel>
        </div>
      )}
    </Section>
  )
}
