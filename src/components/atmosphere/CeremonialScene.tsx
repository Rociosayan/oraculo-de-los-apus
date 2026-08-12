import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const PUBLIC_BASE = import.meta.env.BASE_URL
const ASSET_VERSION = '20260812'
const AUSANGATE_SRC = `${PUBLIC_BASE}images/ausangate-noche.webp?v=${ASSET_VERSION}`
const PAQO_VIDEO_WEBM = `${PUBLIC_BASE}media/paqo-ceremonia.webm`
const PAQO_VIDEO_MP4 = `${PUBLIC_BASE}media/paqo-ceremonia.mp4`
const PAQO_IMAGE_SRC = `${PUBLIC_BASE}images/paqo-pututo.webp?v=${ASSET_VERSION}`
const PUTUTU_AUDIO_SRC = `${PUBLIC_BASE}audio/pututo.mp3`

/**
 * Sincronización con el video ceremonial (8-10 s):
 * 0-2 s respiración · 2-5 s levanta y toca el pututu ·
 * 8-10 s crece la luz tras el Ausangate.
 */
const VIDEO_CUES = {
  sound: 2.4,
  tremor: 3.2,
  message: 7.8,
}

type Phase = 'idle' | 'calling' | 'message'

interface Star {
  /** radio orbital normalizado respecto al centro (cima del Ausangate) */
  r: number
  angle: number
  size: number
  twinkle: number
  color: string
}

/** Constelaciones andinas: puntos normalizados (x, y) y segmentos que las unen. */
const CONSTELLATIONS: {
  name: string
  points: [number, number][]
  lines: [number, number][]
}[] = [
  {
    name: 'cruz-del-sur',
    points: [
      [0.82, 0.08],
      [0.82, 0.28],
      [0.75, 0.17],
      [0.9, 0.17],
      [0.85, 0.23],
    ],
    lines: [
      [0, 1],
      [2, 3],
    ],
  },
]

function playSynthPututu() {
  const Ctx = window.AudioContext
  if (!Ctx) return
  const ctx = new Ctx()
  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.5, now + 0.7)
  master.gain.setValueAtTime(0.5, now + 2.4)
  master.gain.exponentialRampToValueAtTime(0.0001, now + 4.8)

  const lowpass = ctx.createBiquadFilter()
  lowpass.type = 'lowpass'
  lowpass.frequency.value = 620

  const fundamental = ctx.createOscillator()
  fundamental.type = 'sine'
  fundamental.frequency.setValueAtTime(104, now)
  fundamental.frequency.linearRampToValueAtTime(112, now + 1.6)
  fundamental.frequency.linearRampToValueAtTime(108, now + 4)

  const harmonic = ctx.createOscillator()
  harmonic.type = 'triangle'
  harmonic.frequency.setValueAtTime(208, now)
  harmonic.frequency.linearRampToValueAtTime(224, now + 1.6)
  const harmonicGain = ctx.createGain()
  harmonicGain.gain.value = 0.22

  fundamental.connect(lowpass)
  harmonic.connect(harmonicGain)
  harmonicGain.connect(lowpass)
  lowpass.connect(master)
  master.connect(ctx.destination)

  fundamental.start(now)
  harmonic.start(now)
  fundamental.stop(now + 5)
  harmonic.stop(now + 5)
  window.setTimeout(() => void ctx.close(), 5500)
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5z" />
      {muted ? (
        <path d="m15.5 9.5 5 5m0-5-5 5" />
      ) : (
        <>
          <path d="M15.5 9.5a4 4 0 0 1 0 5" />
          <path d="M18 7a8 8 0 0 1 0 10" />
        </>
      )}
    </svg>
  )
}

export function CeremonialScene({ className = '' }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [soundOn, setSoundOn] = useState(true)
  const [tremor, setTremor] = useState(false)
  const [webmMissing, setWebmMissing] = useState(true)
  const [mp4Missing, setMp4Missing] = useState(true)
  const [audioMissing, setAudioMissing] = useState(false)

  /** Solo hay video ceremonial si existe al menos uno de los dos formatos. */
  const videoMissing = webmMissing && mp4Missing

  const phaseRef = useRef<Phase>('idle')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mountainRef = useRef<HTMLImageElement>(null)
  const paqoWrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timersRef = useRef<number[]>([])
  const starSpeedRef = useRef(0.05)

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Detección de archivos multimedia opcionales
  useEffect(() => {
    const check = async (url: string, onResult: (exists: boolean) => void) => {
      try {
        const res = await fetch(url, { method: 'HEAD' })
        const type = res.headers.get('content-type') ?? ''
        onResult(res.ok && !type.includes('text/html'))
      } catch {
        onResult(false)
      }
    }
    void check(PAQO_VIDEO_WEBM, (ok) => setWebmMissing(!ok))
    void check(PAQO_VIDEO_MP4, (ok) => setMp4Missing(!ok))
    void check(PUTUTU_AUDIO_SRC, (ok) => setAudioMissing(!ok))
  }, [])

  // Campo de estrellas orbitando alrededor del Ausangate
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const palette = ['#e6efff', '#9fd8ff', '#67e8f9', '#e8d5a3']
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      r: 0.12 + Math.random() * 0.85,
      angle: Math.random() * Math.PI * 2,
      size: 0.4 + Math.random() * 1.2,
      twinkle: Math.random() * Math.PI * 2,
      color:
        Math.random() < 0.12
          ? palette[3]
          : palette[Math.floor(Math.random() * 3)],
    }))

    let raf = 0
    let last = performance.now()
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      ctx.clearRect(0, 0, width, height)

      // velocidad objetivo según fase: pausada en reposo, circular durante el llamado
      const target =
        phaseRef.current === 'calling'
          ? 0.55
          : phaseRef.current === 'message'
            ? 0.12
            : 0.05
      starSpeedRef.current += (target - starSpeedRef.current) * dt * 1.5

      const cx = width * 0.5
      const cy = height * 0.58
      const scale = Math.max(width, height) * 0.52

      for (const s of stars) {
        if (!reducedMotion) s.angle += starSpeedRef.current * dt * (0.4 + s.r)
        const x = cx + Math.cos(s.angle) * s.r * scale
        const y = cy + Math.sin(s.angle) * s.r * scale * 0.72
        if (y > height || y < 0 || x < 0 || x > width) continue
        const tw = 0.55 + 0.45 * Math.sin(now / 900 + s.twinkle)
        ctx.globalAlpha = tw * 0.9
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Venus: estrella guía, más luminosa y cálida que el resto del firmamento.
      const venusX = width * 0.12
      const venusY = height * 0.12
      const venusPulse = 0.88 + 0.12 * Math.sin(now / 850)
      const venusGlow = ctx.createRadialGradient(venusX, venusY, 0, venusX, venusY, 25)
      venusGlow.addColorStop(0, `rgba(255, 249, 220, ${venusPulse})`)
      venusGlow.addColorStop(0.18, 'rgba(245, 208, 128, 0.75)')
      venusGlow.addColorStop(1, 'rgba(245, 208, 128, 0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = venusGlow
      ctx.beginPath()
      ctx.arc(venusX, venusY, 25, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 235, 180, 0.78)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(venusX - 13, venusY)
      ctx.lineTo(venusX + 13, venusY)
      ctx.moveTo(venusX, venusY - 13)
      ctx.lineTo(venusX, venusY + 13)
      ctx.stroke()
      ctx.fillStyle = '#fff8df'
      ctx.beginPath()
      ctx.arc(venusX, venusY, 2.8, 0, Math.PI * 2)
      ctx.fill()

      // constelaciones andinas
      ctx.globalAlpha = 1
      for (const c of CONSTELLATIONS) {
        const isSouthernCross = c.name === 'cruz-del-sur'
        ctx.strokeStyle = isSouthernCross
          ? 'rgba(203, 230, 255, 0.32)'
          : 'rgba(103, 232, 249, 0.14)'
        ctx.lineWidth = isSouthernCross ? 1.1 : 0.8
        for (const [a, b] of c.lines) {
          ctx.beginPath()
          ctx.moveTo(c.points[a][0] * width, c.points[a][1] * height)
          ctx.lineTo(c.points[b][0] * width, c.points[b][1] * height)
          ctx.stroke()
        }
        c.points.forEach(([px, py], i) => {
          const tw = 0.6 + 0.4 * Math.sin(now / 1100 + i * 1.7)
          ctx.globalAlpha = tw
          ctx.fillStyle = isSouthernCross ? '#f4f7ff' : '#cbe6ff'
          ctx.beginPath()
          ctx.arc(px * width, py * height, isSouthernCross ? 2 : 1.4, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  // Parallax suave con el mouse
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translate3d(${x * -8}px, ${y * -4}px, 0) scale(1.06)`
      }
      if (paqoWrapRef.current) {
        paqoWrapRef.current.style.transform = `translate3d(${x * 10}px, ${y * 5}px, 0)`
      }
    },
    [reducedMotion]
  )

  const playPututu = useCallback(() => {
    if (!soundOn) return
    if (audioMissing) {
      playSynthPututu()
      return
    }
    const audio = new Audio(PUTUTU_AUDIO_SRC)
    audio.volume = 0.85
    void audio.play().catch(() => playSynthPututu())
  }, [soundOn, audioMissing])

  /** Marcas ya disparadas durante la reproducción del video ceremonial. */
  const cueFlagsRef = useRef({
    sound: false,
    tremor: false,
    message: false,
  })

  /** Sincroniza sonido, vibración y mensaje con el tiempo del video. */
  const handleVideoTime = useCallback(() => {
    const video = videoRef.current
    if (!video || phaseRef.current !== 'calling') return
    const t = video.currentTime
    const cues = cueFlagsRef.current

    if (!cues.sound && t >= VIDEO_CUES.sound) {
      cues.sound = true
      playPututu()
    }
    if (!cues.tremor && t >= VIDEO_CUES.tremor) {
      cues.tremor = true
      setTremor(true)
      timersRef.current.push(window.setTimeout(() => setTremor(false), 1000))
    }
    if (!cues.message && t >= VIDEO_CUES.message) {
      cues.message = true
      setPhase('message')
    }
  }, [playPututu])

  /** Si el video termina antes de disparar la marca del mensaje, lo muestra igual. */
  const handleVideoEnded = useCallback(() => {
    if (!cueFlagsRef.current.message) {
      cueFlagsRef.current.message = true
      setPhase('message')
    }
  }, [])

  const startCeremony = useCallback(() => {
    if (phaseRef.current !== 'idle') return
    setPhase('calling')

    if (reducedMotion) {
      playPututu()
      setPhase('message')
      return
    }

    // Con video ceremonial: la línea de tiempo la marca el propio video.
    if (!videoMissing && videoRef.current) {
      cueFlagsRef.current = {
        sound: false,
        tremor: false,
        message: false,
      }
      void videoRef.current.play().catch(() => undefined)
      return
    }

    // Sin video: secuencia temporizada sobre la fotografía estática.
    const t = (fn: () => void, ms: number) =>
      timersRef.current.push(window.setTimeout(fn, ms))

    t(playPututu, 600)
    t(() => setTremor(true), 1200)
    t(() => setTremor(false), 2200)
    t(() => setPhase('message'), 6200)
  }, [reducedMotion, playPututu, videoMissing])

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout)
    },
    []
  )

  return (
    <>
      {/* Atenuación general de la página durante el llamado */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 bg-night transition-opacity duration-1000 ${
          phase === 'calling' ? 'opacity-45' : 'opacity-0'
        }`}
      />

      <div
        className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/5 ${
          tremor ? 'animate-tremor' : ''
        } ${className}`}
        onPointerMove={handlePointerMove}
      >
        {/* Capa 1: cielo */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#01030a_0%,#050b1f_38%,#0b1229_70%,#0d1633_100%)]" />

        {/* Capa 2: estrellas y constelaciones */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Capa 3: resplandor detrás de la montaña */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-[16%] h-[55%] transition-opacity duration-[1800ms] ${
            phase === 'idle' ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 62%, rgba(59,130,246,0.4), rgba(34,211,238,0.18) 45%, transparent 72%), radial-gradient(ellipse 32% 24% at 50% 58%, rgba(201,169,98,0.28), transparent 70%)',
          }}
        />

        {/* Capa 4: Apu Ausangate */}
        <img
          ref={mountainRef}
          src={AUSANGATE_SRC}
          alt="Apu Ausangate nevado bajo el cielo nocturno"
          draggable={false}
          className="absolute inset-x-0 bottom-0 h-[78%] w-full select-none object-cover object-[center_38%] transition-transform duration-300 ease-out will-change-transform [mask-image:linear-gradient(to_top,black_78%,transparent_100%)]"
          style={{ transform: 'scale(1.06)' }}
        />

        {/* Capa 5: neblina en la base de la montaña */}
        <div
          aria-hidden
          className="animate-mist-a absolute inset-x-[-10%] bottom-[8%] h-[26%] opacity-60 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse 45% 60% at 30% 55%, rgba(199,210,254,0.16), transparent 70%), radial-gradient(ellipse 50% 55% at 72% 45%, rgba(148,190,255,0.12), transparent 72%)',
          }}
        />
        <div
          aria-hidden
          className="animate-mist-b absolute inset-x-[-10%] bottom-0 h-[20%] opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 60%, rgba(180,200,255,0.14), transparent 75%)',
          }}
        />

        {/* Capa 6: el paqo (video ceremonial o fotografía) */}
        <div
          ref={paqoWrapRef}
          className="absolute inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-out will-change-transform"
        >
          <div
            className={`group relative flex h-full items-end ${
              !reducedMotion && phase === 'idle' ? 'animate-breath' : ''
            }`}
          >
            {/* halo azul y dorado al pasar el cursor */}
            <div
              aria-hidden
              className={`absolute inset-x-[-15%] bottom-0 top-[8%] rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${
                phase !== 'idle' ? 'opacity-90' : ''
              }`}
              style={{
                background:
                  'radial-gradient(ellipse 50% 55% at 50% 55%, rgba(59,130,246,0.32), rgba(34,211,238,0.14) 55%, transparent 75%), radial-gradient(ellipse 30% 30% at 50% 70%, rgba(201,169,98,0.16), transparent 75%)',
              }}
            />
            {!videoMissing ? (
              <video
                ref={videoRef}
                poster={PAQO_IMAGE_SRC}
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={handleVideoTime}
                onEnded={handleVideoEnded}
                className="relative h-[380px] select-none object-contain sm:h-[460px] md:h-[520px] [mask-image:radial-gradient(ellipse_62%_78%_at_50%_42%,black_55%,transparent_98%)]"
              >
                {!webmMissing && (
                  <source src={PAQO_VIDEO_WEBM} type="video/webm" />
                )}
                {!mp4Missing && <source src={PAQO_VIDEO_MP4} type="video/mp4" />}
              </video>
            ) : (
              <img
                src={PAQO_IMAGE_SRC}
                alt="Paqo andino sosteniendo un pututu"
                draggable={false}
                className="relative h-[380px] select-none object-contain sm:h-[460px] md:h-[520px] [mask-image:radial-gradient(ellipse_62%_78%_at_50%_42%,black_55%,transparent_98%)]"
              />
            )}
          </div>
        </div>

        {/* Zona clicable sobre el paqo */}
        {phase === 'idle' && (
          <button
            type="button"
            onClick={startCeremony}
            aria-label="Tocar al paqo para que llame a los apus"
            className="absolute bottom-0 left-1/2 z-20 h-[75%] w-[min(60%,420px)] -translate-x-1/2 cursor-pointer rounded-t-[45%] transition-transform duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-soft/70 active:scale-[1.015]"
          />
        )}

        {/* Texto guía en reposo */}
        {phase === 'idle' && (
          <p className="pointer-events-none absolute inset-x-0 bottom-4 z-20 text-center text-[11px] uppercase tracking-[0.35em] text-cyan-soft/75">
            Toca al paqo para que llame a los apus
          </p>
        )}

        {/* Mensaje ceremonial */}
        {phase === 'message' && (
          <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-4 bg-gradient-to-t from-night via-night/85 to-transparent px-6 pb-8 pt-20 text-center sm:pb-10">
            <h2
              className="animate-emerge font-display text-2xl italic text-ivory sm:text-4xl"
              style={{ textShadow: '0 0 24px rgba(103,232,249,0.35)' }}
            >
              Es hora de que los Apus te hablen.
            </h2>
            <p
              className="animate-emerge mx-auto max-w-xl text-sm leading-relaxed text-mist/90 sm:text-base"
              style={{ animationDelay: '0.9s' }}
            >
              Respira profundamente, formula tu pregunta y permite que la
              sabiduría de las montañas encuentre el camino hacia ti.
            </p>
            <div
              className="animate-emerge"
              style={{ animationDelay: '1.8s' }}
            >
              <Link
                to="/lecturas"
                className="animate-glow-breathe inline-block rounded-full border border-cyan-soft/50 bg-gradient-to-r from-electric/30 via-cyan-glow/25 to-gold/25 px-7 py-3 font-medium text-ivory backdrop-blur-sm transition hover:border-gold/60"
              >
                Escuchar el mensaje de los Apus
              </Link>
            </div>
          </div>
        )}

        {/* Control de sonido */}
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Silenciar el sonido' : 'Activar el sonido'}
          className="absolute right-3 top-3 z-30 rounded-full border border-white/15 bg-night/60 p-2 text-mist/80 backdrop-blur-sm transition hover:border-cyan-soft/40 hover:text-cyan-soft"
        >
          <SpeakerIcon muted={!soundOn} />
        </button>

      </div>
    </>
  )
}
