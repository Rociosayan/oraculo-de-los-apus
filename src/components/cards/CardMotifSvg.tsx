import type { CardMotif } from '../../types'

const stroke = 'currentColor'

/** Símbolos SVG lineales por carta */
export function CardMotifSvg({
  motif,
  className = 'h-full w-full',
}: {
  motif: CardMotif
  className?: string
}) {
  const common = {
    viewBox: '0 0 64 64',
    fill: 'none' as const,
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true as const,
  }

  switch (motif) {
    case 'chaski':
      return (
        <svg {...common}>
          <path d="M12 42l8-22h6l4 12 4-12h6l8 22" />
          <path d="M20 42v10h24V42" />
          <circle cx="32" cy="12" r="4" />
        </svg>
      )
    case 'paqo':
      return (
        <svg {...common}>
          <path d="M32 6v14" />
          <path d="M22 20h20l6 10H16l6-10z" />
          <path d="M20 30v22h24V30" />
          <path d="M28 52v6h8v-6" />
        </svg>
      )
    case 'quilla':
      return (
        <svg {...common}>
          <path d="M38 14a16 16 0 1 0 0 36 14 14 0 0 1 0-36z" />
          <circle cx="42" cy="22" r="1.5" fill={stroke} stroke="none" />
        </svg>
      )
    case 'pachamama':
      return (
        <svg {...common}>
          <path d="M8 50h48" />
          <path d="M14 50c4-18 10-30 18-38 8 8 14 20 18 38" />
          <path d="M24 50c2-12 5-20 8-26 3 6 6 14 8 26" />
          <circle cx="32" cy="20" r="3" />
        </svg>
      )
    case 'apu':
      return (
        <svg {...common}>
          <path d="M6 52L32 10l26 42H6z" />
          <path d="M20 52l12-22 12 22" />
          <circle cx="32" cy="28" r="2.5" fill={stroke} stroke="none" />
        </svg>
      )
    case 'amauta':
      return (
        <svg {...common}>
          <circle cx="32" cy="16" r="8" />
          <path d="M18 56v-8c0-8 6-14 14-14h0c8 0 14 6 14 14v8" />
          <path d="M16 28h8M40 28h8" />
        </svg>
      )
    case 'yanantin':
      return (
        <svg {...common}>
          <circle cx="22" cy="32" r="12" />
          <circle cx="42" cy="32" r="12" />
          <path d="M22 32h20" strokeDasharray="3 3" />
        </svg>
      )
    case 'qhapaqnan':
      return (
        <svg {...common}>
          <path d="M8 48h10l8-18 8 12 8-22 14 28" />
          <circle cx="52" cy="14" r="3" />
        </svg>
      )
    case 'puma':
      return (
        <svg {...common}>
          <path d="M10 40c4-2 8-10 14-12 2-6 8-10 14-8 4 0 8 2 10 6 4 2 8 8 8 14H10z" />
          <path d="M18 40v8M28 40v10M38 40v8M46 40v6" />
          <path d="M48 26c4-2 8-2 10 2" />
        </svg>
      )
    case 'ermita':
      return (
        <svg {...common}>
          <path d="M32 58V28" />
          <path d="M32 28c-8 0-12-8-8-14 6 2 10 2 16 0 4 6 0 14-8 14z" />
          <circle cx="32" cy="12" r="3" fill={stroke} stroke="none" />
        </svg>
      )
    case 'pachakuti':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" />
          <path d="M32 14v36M14 32h36" />
          <path d="M20 20l24 24M44 20L20 44" />
        </svg>
      )
    case 'ayni':
      return (
        <svg {...common}>
          <path d="M16 28c0-8 6-14 16-14s16 6 16 14c0 10-16 22-16 22S16 38 16 28z" />
          <path d="M24 32h16M32 24v16" />
        </svg>
      )
    case 'ukupacha':
      return (
        <svg {...common}>
          <path d="M12 14h40v8H20v8h32v8H20v8h32v8H12V14z" />
        </svg>
      )
    case 'mallki':
      return (
        <svg {...common}>
          <path d="M32 58V30" />
          <path d="M32 42c-8-4-12-12-12-20 0 0 8 4 12 4s12-4 12-4c0 8-4 16-12 20z" />
          <circle cx="32" cy="18" r="4" />
          <path d="M18 58h28" />
        </svg>
      )
    case 'qocha':
      return (
        <svg {...common}>
          <path d="M8 26c8 8 16-8 24 0s16-8 24 0" />
          <path d="M8 38c8 8 16-8 24 0s16-8 24 0" />
          <path d="M8 50c8 8 16-8 24 0s16-8 24 0" />
          <path d="M32 10v12" />
        </svg>
      )
    case 'supay':
      return (
        <svg {...common}>
          <path d="M20 10h24v16c0 12-8 20-12 24-4-4-12-12-12-24V10z" />
          <path d="M26 24h12M28 32h8" />
          <path d="M24 52h16" />
        </svg>
      )
    case 'illapa':
      return (
        <svg {...common}>
          <path d="M36 6L18 32h14L22 58l26-30H36L44 6z" />
        </svg>
      )
    case 'chaska':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="5" />
          <path d="M32 8v12M32 44v12M8 32h12M44 32h12M14 14l8 8M42 42l8 8M50 14l-8 8M22 42l-8 8" />
        </svg>
      )
    case 'amaru':
      return (
        <svg {...common}>
          <path d="M10 44c8-16 12-8 20-20 6-8 14-8 18 0 4 10-2 18-10 18-10 0-12-12-4-16 6-3 12 2 10 8" />
          <circle cx="48" cy="26" r="2" fill={stroke} stroke="none" />
        </svg>
      )
    case 'inti':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="10" />
          <path d="M32 6v8M32 50v8M6 32h8M50 32h8M12 12l6 6M46 46l6 6M52 12l-6 6M18 46l-6 6" />
        </svg>
      )
    case 'kuntur':
      return (
        <svg {...common}>
          <path d="M6 36c12-4 20-16 26-24 6 8 14 20 26 24" />
          <path d="M32 12v28" />
          <path d="M24 40c2 6 6 10 8 12 2-2 6-6 8-12" />
        </svg>
      )
    case 'chakana':
      return (
        <svg {...common}>
          <path d="M24 6h16v8h8v16h8v16h-8v8H24v-8h-8V30h-8V14h8V6z" />
          <rect x="28" y="28" width="8" height="8" fill={stroke} stroke="none" />
        </svg>
      )
    default:
      return null
  }
}
