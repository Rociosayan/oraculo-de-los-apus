export function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <Stars />
      <Constellation />
      <Particles />
      <Mountains />
      <div className="absolute right-[8%] top-[18%] opacity-20 md:opacity-30">
        <ChakanaMark className="h-24 w-24 text-cyan-soft/40 md:h-32 md:w-32" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night/90" />
    </div>
  )
}

function Stars() {
  const stars = [
    [8, 12], [18, 8], [28, 18], [42, 6], [55, 14], [68, 9], [78, 20], [88, 11],
    [12, 28], [35, 32], [62, 26], [85, 34], [22, 42], [48, 38], [72, 44],
    [5, 55], [92, 48], [40, 12], [58, 52], [15, 70],
  ]
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {stars.map(([x, y], i) => (
        <circle
          key={i}
          cx={`${x}%`}
          cy={`${y}%`}
          r={i % 4 === 0 ? 1.4 : 0.8}
          className="animate-twinkle fill-ivory/80"
          style={{ animationDelay: `${(i % 7) * 0.35}s` }}
        />
      ))}
    </svg>
  )
}

function Constellation() {
  return (
    <svg
      className="absolute left-[10%] top-[10%] h-40 w-48 opacity-30 md:h-56 md:w-64"
      viewBox="0 0 200 160"
      fill="none"
    >
      <path
        d="M20 80 L60 40 L110 55 L150 25 L180 70"
        stroke="rgba(103,232,249,0.35)"
        strokeWidth="1"
      />
      {[
        [20, 80],
        [60, 40],
        [110, 55],
        [150, 25],
        [180, 70],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#67e8f9" opacity="0.7" />
      ))}
    </svg>
  )
}

function Particles() {
  const items = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div className="absolute inset-0">
      {items.map((i) => (
        <span
          key={i}
          className="absolute bottom-0 h-1 w-1 rounded-full bg-cyan-soft/50"
          style={{
            left: `${6 + i * 6.5}%`,
            animation: `particle-rise ${10 + (i % 5) * 2}s linear infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}

function Mountains() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full opacity-70"
      viewBox="0 0 1440 280"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#152047" />
          <stop offset="100%" stopColor="#030711" />
        </linearGradient>
        <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#030711" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mtn1)"
        d="M0 280V160L180 90l140 70 200-100 160 80 220-90 200 70 180-50 160 60v90H0z"
      />
      <path
        fill="url(#mtn2)"
        opacity="0.85"
        d="M0 280V200l120-40 160 50 180-70 140 45 200-55 160 40 220-35 140 30 120-20v55H0z"
      />
      <path
        d="M320 160l20-8 18 8"
        stroke="rgba(201,169,98,0.35)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M720 120l16-6 14 6"
        stroke="rgba(103,232,249,0.25)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

export function ChakanaMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M24 6h16v8h8v16h8v16h-8v8H24v-8h-8V30h-8V14h8V6z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="28" y="28" width="8" height="8" fill="#c9a962" opacity="0.8" />
    </svg>
  )
}
