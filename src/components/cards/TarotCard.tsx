import { useState } from 'react'
import type { AndeanCard } from '../../types'
import { CardMotifSvg } from './CardMotifSvg'
import { CARD_BACK_SRC, cardImageSrc } from '../../data/cardImages'

interface TarotCardProps {
  card?: AndeanCard
  faceDown?: boolean
  revealed?: boolean
  reversed?: boolean
  selected?: boolean
  shuffling?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'gallery'
  onClick?: () => void
  label?: string
  className?: string
}

const sizes = {
  xs: 'w-[68px] h-[106px] sm:w-[88px] sm:h-[138px] md:w-[104px] md:h-[162px]',
  sm: 'w-[108px] h-[168px] sm:w-[118px] sm:h-[182px]',
  md: 'w-[120px] h-[190px] sm:w-[140px] sm:h-[220px]',
  lg: 'w-[150px] h-[240px] sm:w-[170px] sm:h-[270px]',
  /* Tamaño fluido para la galería: ocupa la columna y conserva proporción tarot */
  gallery: 'w-full max-w-[280px] aspect-[2/3]',
}

const nameSizes = {
  xs: 'text-[8px] leading-[1.15] sm:text-[9px]',
  sm: 'text-[10px] leading-[1.15]',
  md: 'text-xs leading-tight sm:text-sm',
  lg: 'text-sm leading-tight sm:text-base',
  gallery: 'text-sm leading-tight sm:text-lg',
}

const symbolSizes = {
  xs: 'text-[7px] sm:text-[8px]',
  sm: 'text-[8px] sm:text-[9px]',
  md: 'text-[8px] sm:text-[9px]',
  lg: 'text-[9px] sm:text-[10px]',
  gallery: 'text-[10px] sm:text-xs',
}

/** Esquina ornamental inspirada en la greca escalonada de los textiles andinos. */
function TextileCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`pointer-events-none absolute h-3.5 w-3.5 text-gold/70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M1 19V9h4V5h4V1h10" />
    </svg>
  )
}

export function TarotCard({
  card,
  faceDown = true,
  revealed = false,
  reversed = false,
  selected = false,
  shuffling = false,
  size = 'md',
  onClick,
  label,
  className = '',
}: TarotCardProps) {
  const showFront = revealed || !faceDown
  const [frontError, setFrontError] = useState(false)
  const [backError, setBackError] = useState(false)

  const frontSrc = card ? cardImageSrc(card.id) : undefined

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <p className="max-w-[140px] text-center text-[10px] uppercase tracking-[0.18em] text-cyan-soft/80 sm:text-xs">
          {label}
        </p>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        aria-label={
          showFront && card
            ? `${card.name}${reversed ? ' invertida' : ''}`
            : 'Carta boca abajo'
        }
        className={`card-perspective group relative ${sizes[size]} ${
          onClick ? 'cursor-pointer hover:scale-[1.03]' : 'cursor-default'
        } ${shuffling ? 'animate-shuffle' : ''} ${
          selected ? 'scale-[1.04]' : ''
        } transition-transform duration-300`}
      >
        <div
          className={`preserve-3d relative h-full w-full transition-transform duration-700 ease-out ${
            showFront ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Reverso: chakana, estrellas y montañas */}
          <div className="backface-hidden absolute inset-0 overflow-hidden rounded-xl border border-gold/35 bg-indigo-night shadow-xl shadow-electric/10">
            {!backError ? (
              <img
                src={CARD_BACK_SRC}
                alt=""
                draggable={false}
                onError={() => setBackError(true)}
                className="absolute inset-0 h-full w-full select-none object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
                <p className="text-[9px] leading-snug text-mist/60">
                  Ilustración pendiente
                </p>
                <p className="break-all text-[8px] text-mist/40">
                  /images/cartas/reverso.webp
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-soft/15" />
          </div>

          {/* Frente: ilustración estilo Guamán Poma */}
          <div
            className={`backface-hidden absolute inset-0 overflow-hidden rounded-xl border border-gold/60 bg-indigo-night shadow-xl transition-shadow duration-300 [transform:rotateY(180deg)] ${
              selected ? 'glow-cyan' : ''
            } ${
              onClick
                ? 'group-hover:shadow-[0_0_18px_rgba(59,130,246,0.35),0_0_38px_rgba(201,169,98,0.22)]'
                : ''
            }`}
          >
            {card && (
              <>
                {frontSrc && !frontError ? (
                  <img
                    src={frontSrc}
                    alt={`${card.name}, ${card.symbol}`}
                    draggable={false}
                    onError={() => setFrontError(true)}
                    className={`absolute inset-0 h-full w-full select-none object-cover transition-transform duration-500 ${
                      reversed ? 'rotate-180' : ''
                    }`}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                    <p className="text-[9px] leading-snug text-mist/60">
                      Ilustración pendiente
                    </p>
                    <p className="break-all text-[8px] text-mist/40">
                      {frontSrc}
                    </p>
                  </div>
                )}

                {/* Marco textil interior */}
                <div className="pointer-events-none absolute inset-[3px] rounded-lg border border-gold/50" />
                <TextileCorner className="left-[5px] top-[5px]" />
                <TextileCorner className="right-[5px] top-[5px] rotate-90" />
                <TextileCorner className="bottom-[5px] right-[5px] rotate-180" />
                <TextileCorner className="bottom-[5px] left-[5px] -rotate-90" />

                {/* Número */}
                <span
                  className={`absolute left-1/2 top-1.5 -translate-x-1/2 rounded-full border border-gold/60 bg-night/80 px-2 py-px tracking-[0.2em] text-gold-soft ${
                    size === 'gallery' ? 'text-[11px]' : 'text-[9px]'
                  }`}
                >
                  {card.id}
                </span>

                {/* Placa inferior: símbolo y nombre */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-gradient-to-t from-night via-night/85 to-transparent px-2 pb-2.5 pt-8 text-center">
                  <div
                    className={`mb-0.5 text-cyan-soft/90 ${
                      size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
                    }`}
                  >
                    <CardMotifSvg motif={card.motif} />
                  </div>
                  <p
                    className={`font-display text-balance break-words text-ivory ${nameSizes[size]}`}
                  >
                    {card.name}
                  </p>
                  <p
                    className={`mt-0.5 text-balance break-words leading-tight text-mist/85 ${symbolSizes[size]}`}
                  >
                    {card.symbol}
                  </p>
                  {reversed && (
                    <span className="mt-1 rounded-full border border-electric/40 bg-night/60 px-2 py-0.5 text-[8px] tracking-wider text-electric-bright uppercase">
                      Invertida
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}
