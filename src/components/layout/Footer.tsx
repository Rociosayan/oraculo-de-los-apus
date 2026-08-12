const INSTAGRAM_URL = 'https://www.instagram.com/maestradelaluz_guiaespiritual?igsh=Y2l2MXFiYml5dzNn&igsi=Y2l2MXFiYml5dzNn'
const THREADS_URL = 'https://www.threads.com/@maestradelaluz_guiaespiritual'
const WHATSAPP_URL = 'https://wa.me/qr/UQUCZ45EW6QZE1'
const MAESTRA_IMAGE_URL = `${import.meta.env.BASE_URL}images/maestra-de-la-luz.png?v=20260812`

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" strokeLinejoin="round" />
      <path d="M9 8.1c.3-.3.6-.2.8.2l.7 1.6c.1.3 0 .5-.2.8l-.5.5c.7 1.4 1.8 2.4 3.2 3l.5-.6c.2-.3.5-.3.8-.2l1.5.7c.4.2.5.5.3.9-.5 1-1.4 1.4-2.5 1.2-3.7-.7-6.2-3.2-6.8-6.7-.2-.9.3-1.8 1.2-2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
    </svg>
  )
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M17.8 8.6c-.8-3-3-4.6-5.9-4.6-3.8 0-6.4 2.8-6.4 8s2.6 8 6.7 8c3.4 0 5.8-1.8 5.8-4.7 0-2.6-1.9-4.2-5-4.2-2.5 0-4.1 1.2-4.1 3 0 1.5 1.2 2.5 2.9 2.5 2.8 0 4.7-2.3 4.7-5.7 0-1.1-.1-2.1-.4-3" strokeLinecap="round" />
    </svg>
  )
}

export function Footer() {
  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp para una sesión personalizada"
        title="Sesión personalizada por WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition duration-300 hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#73e69a] focus:ring-offset-2 focus:ring-offset-night sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      >
        <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-night-deep/95 px-3 py-2 text-xs text-ivory shadow-lg group-hover:block sm:text-sm">
          Sesión personalizada
        </span>
        <span className="scale-125 sm:scale-150"><WhatsAppIcon /></span>
      </a>

      <footer className="relative z-10 mt-auto border-t border-white/5 bg-night-deep/80">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-3xl items-center gap-6 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-indigo-soft/35 via-indigo-soft/20 to-gold/5 px-5 py-6 text-center shadow-[0_20px_60px_rgba(10,15,45,0.35)] sm:grid-cols-[180px_1fr] sm:px-7 sm:text-left">
          <div className="relative mx-auto h-40 w-40 sm:h-44 sm:w-44">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-gold/60 via-cyan-soft/25 to-electric/40 blur-md" />
            <img
              src={MAESTRA_IMAGE_URL}
              alt="Imagen representativa de Maestra de la Luz"
              className="relative h-full w-full rounded-full border-2 border-gold/45 object-cover shadow-xl"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold/70">Atención personalizada</p>
            <h2 className="mt-2 font-display text-xl text-ivory sm:text-2xl">¿Deseas una sesión con la Maestra de la Luz?</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist/70">
              Consulta disponibilidad, modalidad y formas de pago para recibir una lectura personal.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#55d982]/45 bg-[#25D366]/15 px-4 py-2 text-sm text-[#73e69a] transition hover:border-[#73e69a]/70 hover:bg-[#25D366]/20">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm text-gold-soft transition hover:border-gold/60 hover:bg-gold/15">
              <InstagramIcon /> Instagram
            </a>
            <a href={THREADS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-soft/30 bg-cyan-soft/5 px-4 py-2 text-sm text-cyan-soft transition hover:border-cyan-soft/55 hover:bg-cyan-soft/10">
              <ThreadsIcon /> Threads
            </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-relaxed text-mist/60 sm:text-sm">
          Las lecturas del Oráculo de los Apus son orientativas y con fines de reflexión y entretenimiento.
          No sustituyen asesoramiento profesional médico, psicológico, legal o financiero.
        </p>
        <p className="mt-4 text-center font-display text-sm tracking-wide text-gold/50">Oráculo de los Apus</p>
      </div>
      </footer>
    </>
  )
}
