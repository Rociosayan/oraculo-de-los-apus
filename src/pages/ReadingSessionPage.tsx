import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSpreadById } from '../data/spreads'
import { ANDEAN_CARDS } from '../data/cards'
import type { DrawnCard, ReadingPhase, ReadingResult } from '../types'
import { createReadingId, drawReading } from '../lib/reading'
import { generarLectura } from '../lib/interpretacion'
import { LIMITE_PREGUNTA, requiereTiradaAccion } from '../lib/questionAnalysis'
import { downloadText, formatReadingAsText, shareReading } from '../lib/diary'
import { useDiary } from '../hooks/useDiary'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'
import { localizeSpread, positionLabel } from '../content/spreadsCopy'
import { localizeVisibleNarrative } from '../lib/localizeReading'
import { TarotCard } from '../components/cards/TarotCard'
import { NarrativePanel } from '../components/reading/NarrativePanel'
import { CardDetail } from '../components/reading/CardDetail'
import { Button } from '../components/ui/Button'
import { Panel, Section } from '../components/ui/Section'

/** Posición porcentual de cada carta del reloj (hora 1 a 12, sentido horario) */
function clockPosition(index: number, total: number): { left: string; top: string } {
  const hour = index + 1
  const angle = ((hour * (360 / total) - 90) * Math.PI) / 180
  const radius = 41
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${50 + radius * Math.sin(angle)}%`,
  }
}

export function ReadingSessionPage() {
  const { spreadId = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const spread = getSpreadById(spreadId)
  const { language } = useLanguage()
  const t = useCopy(language)
  const { saveReading } = useDiary()

  const initialQuestion = (location.state as { question?: string } | null)?.question ?? ''
  const [question, setQuestion] = useState(initialQuestion)
  const [phase, setPhase] = useState<ReadingPhase>('setup')
  const [drawn, setDrawn] = useState<DrawnCard[]>([])
  const [pickedSlots, setPickedSlots] = useState<number[]>([])
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showSpreadRecommendation, setShowSpreadRecommendation] = useState(false)
  const [confirmedSingleCard, setConfirmedSingleCard] = useState(false)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const reset = useCallback(() => {
    setPhase('setup')
    setDrawn([])
    setPickedSlots([])
    setSaved(false)
    setShowDetails(false)
    setShowSpreadRecommendation(false)
    setConfirmedSingleCard(false)
  }, [])

  const narrative = useMemo(() => {
    if (!spread || phase !== 'complete' || drawn.length === 0) return null
    return localizeVisibleNarrative(generarLectura(spread, question, drawn), drawn, language)
  }, [spread, phase, drawn, question, language])

  if (!spread) {
    return (
      <Section className="py-24 text-center">
        <p className="font-display text-2xl text-ivory">{t.missingSpread}</p>
        <div className="mt-6">
          <Link to="/lecturas">
            <Button variant="secondary">{t.seeReadings}</Button>
          </Link>
        </div>
      </Section>
    )
  }

  const view = localizeSpread(spread, language)
  const canStart = !spread.requiresQuestion || question.trim().length > 2
  const isClock = spread.layout === 'reloj'
  const fannedCount = Math.max(14, spread.cardCount + 6)

  function startShuffle() {
    if (!spread) return
    if (requiereTiradaAccion(spread.id, question) && !confirmedSingleCard) {
      setShowSpreadRecommendation(true)
      return
    }
    setPhase('shuffling')
    setDrawn(drawReading(spread, ANDEAN_CARDS))
    setTimeout(() => setPhase('selecting'), 1100)
  }

  function pickSlot(slotIndex: number) {
    if (!spread) return
    if (pickedSlots.includes(slotIndex)) return
    if (pickedSlots.length >= spread.cardCount) return
    const next = [...pickedSlots, slotIndex]
    setPickedSlots(next)
    if (next.length === spread.cardCount) {
      setTimeout(() => setPhase('revealing'), 500)
    }
  }

  /** Las cartas se voltean en orden: primero la 1, luego la 2… (en el reloj,
   *  eso equivale al sentido horario hasta cerrar el círculo). */
  function revealCard(index: number) {
    setDrawn((prev) => {
      const nextIndex = prev.findIndex((d) => !d.revealed)
      if (index !== nextIndex) return prev
      const next = prev.map((d, i) => (i === index ? { ...d, revealed: true } : d))
      if (next.every((d) => d.revealed)) {
        setTimeout(() => setPhase('complete'), 400)
      }
      return next
    })
  }

  function revealAll() {
    setDrawn((prev) => prev.map((d) => ({ ...d, revealed: true })))
    setTimeout(() => setPhase('complete'), 400)
  }

  function buildResult(): ReadingResult {
    return {
      id: createReadingId(),
      spreadId: spread!.id,
      spreadTitle: localizeSpread(spread!, language).title,
      question: question.trim(),
      cards: drawn,
      createdAt: new Date().toISOString(),
      narrative: narrative ?? generarLectura(spread!, question, drawn),
      userId: null,
    }
  }

  function handleSave() {
    const result = buildResult()
    saveReading(result)
    setSaved(true)
    setToast(t.toastSaved)
  }

  async function handleShare() {
    const result = buildResult()
    const outcome = await shareReading(result, language)
    setToast(
      outcome === 'shared'
        ? t.toastShared
        : outcome === 'copied'
          ? t.toastCopied
          : t.toastDownloaded,
    )
  }

  function handleDownload() {
    const result = buildResult()
    downloadText(formatReadingAsText(result, language), `lectura-apus-${result.id}.txt`)
    setToast(t.toastFile)
  }

  const revealedCount = drawn.filter((d) => d.revealed).length
  const nextToReveal = drawn.findIndex((d) => !d.revealed)

  return (
    <Section className="py-10 sm:py-14">
      <div className="mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
          {view.subtitle}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
          {view.title}
        </h1>
      </div>

      {/* Paso 1 — pregunta */}
      {phase === 'setup' && (
        <Panel className="animate-reveal mx-auto max-w-xl">
          <label
            htmlFor="pregunta"
            className="text-[11px] uppercase tracking-[0.2em] text-cyan-soft/80"
          >
            {spread.requiresQuestion ? t.yourQuestion : t.yourIntention}
          </label>
          <textarea
            id="pregunta"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value)
              setConfirmedSingleCard(false)
              setShowSpreadRecommendation(false)
            }}
            maxLength={LIMITE_PREGUNTA}
            rows={3}
            placeholder={t.questionPlaceholder}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-night/70 p-3.5 text-sm text-ivory outline-none transition placeholder:text-mist/40 focus:border-cyan-soft/50"
          />
          <p className="mt-2 text-xs text-mist/50">{t.questionHint}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={startShuffle} disabled={!canStart}>
              {t.shuffle}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/lecturas')}>
              {t.changeSpread}
            </Button>
          </div>
          {showSpreadRecommendation && requiereTiradaAccion(spread.id, question) && (
            <div role="dialog" aria-label={t.recommendAria} className="mt-5 rounded-xl border border-gold/25 bg-night/50 p-4">
              <p className="text-sm leading-relaxed text-ivory">
                {t.recommendAction}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="gold"
                  onClick={() => navigate('/lecturas/accion-tres', { state: { question: question.trim() } })}
                >
                  {t.useRecommended}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setConfirmedSingleCard(true)
                    setShowSpreadRecommendation(false)
                    setPhase('shuffling')
                    setDrawn(drawReading(spread, ANDEAN_CARDS))
                    setTimeout(() => setPhase('selecting'), 1100)
                  }}
                >
                  {t.continueOne}
                </Button>
              </div>
            </div>
          )}
        </Panel>
      )}

      {/* Paso 2 — barajar / seleccionar */}
      {(phase === 'shuffling' || phase === 'selecting') && (
        <div className="text-center">
          <p className="font-display text-lg text-mist/85">
            {phase === 'shuffling'
              ? t.shuffling
              : t.chooseCards
                  .replaceAll('{n}', String(spread.cardCount))
                  .replace('{unit}', spread.cardCount === 1 ? t.card : t.cards)
                  .replace('{picked}', String(pickedSlots.length))}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {Array.from({ length: fannedCount }).map((_, i) => {
              const picked = pickedSlots.includes(i)
              return (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    picked ? '-translate-y-4 opacity-40' : 'hover:-translate-y-3'
                  }`}
                  style={{ transitionDelay: `${i * 25}ms` }}
                >
                  <TarotCard
                    faceDown
                    size="sm"
                    shuffling={phase === 'shuffling'}
                    selected={picked}
                    onClick={phase === 'selecting' ? () => pickSlot(i) : undefined}
                  />
                </div>
              )
            })}
          </div>

          {phase === 'selecting' && (
            <div className="mt-8">
              <Button variant="ghost" onClick={reset}>
                {t.startOver}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Paso 3 — revelar */}
      {(phase === 'revealing' || phase === 'complete') && (
        <div>
          {question.trim() && (
            <p className="mb-6 text-center font-display text-lg italic text-mist/80">
              «{question.trim()}»
            </p>
          )}

          {phase === 'revealing' && (
            <p className="mb-6 text-center text-sm text-cyan-soft/80">
              {isClock ? t.flipClock : spread.layout === 'cruz' ? t.flipCross : t.flipOrder}
            </p>
          )}

          {isClock ? (
            /* Disposición circular: doce cartas como las horas de un reloj */
            <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[560px] md:max-w-[660px]">
              <div className="pointer-events-none absolute inset-[12%] rounded-full border border-cyan-soft/15" />
              <p className="pointer-events-none absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 text-center font-display text-xs italic text-mist/50 sm:text-sm">
                {t.clockName}
              </p>
              {drawn.map((d, i) => {
                const pos = clockPosition(i, drawn.length)
                const isNext = i === nextToReveal
                return (
                  <div
                    key={d.position.id}
                    className="animate-reveal absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  >
                    <span
                      className={`mb-1 text-[10px] tracking-[0.2em] ${
                        isNext && !d.revealed ? 'text-cyan-soft' : 'text-gold/60'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <TarotCard
                      card={d.card}
                      faceDown
                      revealed={d.revealed}
                      reversed={d.reversed}
                      size="xs"
                      onClick={
                        d.revealed || !isNext ? undefined : () => revealCard(i)
                      }
                    />
                  </div>
                )
              })}
            </div>
          ) : spread.layout === 'cruz' ? (
            <div className="mx-auto grid max-w-[690px] grid-cols-3 items-center justify-items-center gap-x-1 gap-y-5 sm:gap-x-4">
              {drawn.map((d, i) => {
                const isNext = i === nextToReveal
                const placement = ['col-start-2 row-start-1', 'col-start-1 row-start-2', 'col-start-2 row-start-2', 'col-start-3 row-start-2', 'col-start-2 row-start-3'][i]
                return <div key={d.position.id} className={`animate-reveal flex min-w-0 flex-col items-center ${placement}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className={`mb-1 text-[10px] tracking-[0.2em] ${isNext && !d.revealed ? 'text-cyan-soft' : 'text-gold/60'}`}>{i + 1}</span>
                  <TarotCard card={d.card} faceDown revealed={d.revealed} reversed={d.reversed} size="sm" label={positionLabel(spread, d.position.id, language)} onClick={d.revealed || !isNext ? undefined : () => revealCard(i)} />
                </div>
              })}
            </div>
          ) : (
            <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-6 sm:gap-x-6">
              {drawn.map((d, i) => {
                const isNext = i === nextToReveal
                return (
                  <div
                    key={d.position.id}
                    className="animate-reveal flex flex-col items-center"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span
                      className={`mb-1 text-[10px] tracking-[0.2em] ${
                        isNext && !d.revealed ? 'text-cyan-soft' : 'text-gold/60'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <TarotCard
                      card={d.card}
                      faceDown
                      revealed={d.revealed}
                      reversed={d.reversed}
                      size={drawn.length > 3 ? 'md' : 'lg'}
                      label={positionLabel(spread, d.position.id, language)}
                      onClick={
                        d.revealed || !isNext ? undefined : () => revealCard(i)
                      }
                    />
                    {!d.revealed && isNext && (
                      <p className="mt-2 text-center text-[11px] text-cyan-soft/70">
                        {t.tapToFlip}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {phase === 'revealing' && revealedCount < drawn.length && (
            <div className="mt-8 text-center">
              <Button variant="secondary" onClick={revealAll}>
                {t.flipAll}
              </Button>
            </div>
          )}

          {/* Interpretación encadenada */}
          {phase === 'complete' && narrative && (
            <div className="mt-12">
              <NarrativePanel narrative={narrative} cards={drawn} />

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  aria-expanded={showDetails}
                  className="mx-auto flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-mist transition hover:border-cyan-soft/40 hover:text-ivory"
                >
                  {showDetails ? t.hideDetails : t.showDetails}
                  <span
                    className={`transition-transform ${
                      showDetails ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>

                {showDetails && (
                  <div className="animate-reveal mt-5 grid gap-4 md:grid-cols-2">
                    {drawn.map((d) => (
                      <CardDetail
                        key={d.position.id}
                        drawn={d}
                        positionLabel={positionLabel(spread, d.position.id, language)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {phase === 'complete' && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button onClick={reset}>{t.repeat}</Button>
              <Button variant="gold" onClick={handleSave} disabled={saved}>
                {saved ? t.saved : t.save}
              </Button>
              <Button variant="secondary" onClick={handleShare}>
                {t.share}
              </Button>
              <Button variant="ghost" onClick={handleDownload}>
                {t.download}
              </Button>
            </div>
          )}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-soft/30 bg-indigo-night/95 px-5 py-2.5 text-sm text-ivory shadow-lg backdrop-blur">
          {toast}
        </div>
      )}
    </Section>
  )
}
