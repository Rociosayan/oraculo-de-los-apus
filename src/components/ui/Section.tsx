import type { ReactNode } from 'react'

export function Section({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </section>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-cyan-soft/70">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-mist/75 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function Panel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-indigo-night/40 p-5 backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}
