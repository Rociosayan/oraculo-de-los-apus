import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-electric to-cyan-glow text-night shadow-lg shadow-electric/25 hover:brightness-110',
  secondary:
    'border border-cyan-soft/40 bg-indigo-night/60 text-ivory hover:border-cyan-soft/70 hover:bg-indigo-soft/50',
  ghost: 'text-mist hover:text-ivory hover:bg-white/5',
  gold:
    'border border-gold/50 bg-gold/10 text-gold-soft hover:bg-gold/20 hover:border-gold',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-medium tracking-wide transition duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
