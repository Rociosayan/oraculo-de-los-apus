import type { DrawnCard } from '../../types'
import { CardMotifSvg } from '../cards/CardMotifSvg'

export function CardDetail({ drawn }: { drawn: DrawnCard }) {
  const meaning = drawn.reversed
    ? drawn.card.reversedMeaning
    : drawn.card.meaning

  return (
    <article className="rounded-2xl border border-white/10 bg-indigo-night/40 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 shrink-0 text-cyan-soft ${
            drawn.reversed ? 'rotate-180' : ''
          }`}
        >
          <CardMotifSvg motif={drawn.card.motif} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">
            {drawn.position.label}
          </p>
          <h3 className="font-display text-xl text-ivory">
            {drawn.card.name}
            <span className="ml-2 text-xs text-mist/60">
              {drawn.card.symbol}
            </span>
          </h3>
          <span
            className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
              drawn.reversed
                ? 'border-electric/40 text-electric-bright'
                : 'border-cyan-soft/35 text-cyan-soft'
            }`}
          >
            {drawn.reversed ? 'Invertida' : 'Al derecho'}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mist/85">{meaning}</p>

      <p className="mt-3 border-l-2 border-gold/30 pl-3 font-display text-sm italic text-ivory/85">
        {drawn.card.andeanMessage}
      </p>
    </article>
  )
}
