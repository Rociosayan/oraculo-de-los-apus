import { Link } from 'react-router-dom'
import { useDiary } from '../hooks/useDiary'
import { downloadText, formatReadingAsText, shareReading } from '../lib/diary'
import { Button } from '../components/ui/Button'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { CardMotifSvg } from '../components/cards/CardMotifSvg'

export function DiaryPage() {
  const { entries, deleteReading } = useDiary()

  return (
    <Section className="py-12 sm:py-16">
      <SectionTitle
        eyebrow="Tu registro"
        title="Mi diario"
        subtitle="Las lecturas que guardas permanecen en este dispositivo. Podrás sincronizarlas cuando actives tu cuenta."
      />

      {entries.length === 0 ? (
        <Panel className="mx-auto mt-10 max-w-lg text-center">
          <p className="text-sm text-mist/75">
            Aún no has guardado ninguna lectura.
          </p>
          <div className="mt-5">
            <Link to="/lecturas">
              <Button>Iniciar una lectura</Button>
            </Link>
          </div>
        </Panel>
      ) : (
        <div className="mt-10 space-y-5">
          {entries.map((entry) => (
            <Panel key={entry.id} className="animate-reveal">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">
                    {new Date(entry.createdAt).toLocaleString('es-ES', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-ivory">
                    {entry.spreadTitle}
                  </h3>
                  {entry.question && (
                    <p className="mt-1 font-display text-sm italic text-mist/70">
                      «{entry.question}»
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => shareReading(entry)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist transition hover:bg-white/5"
                  >
                    Compartir
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadText(
                        formatReadingAsText(entry),
                        `lectura-apus-${entry.id}.txt`,
                      )
                    }
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist transition hover:bg-white/5"
                  >
                    Descargar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteReading(entry.id)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist/70 transition hover:border-electric/40 hover:text-electric-bright"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <p className="mt-3 font-display text-base text-gold-soft/90">
                {entry.narrative.titulo}
              </p>
              <p className="mt-2 border-l-2 border-cyan-soft/30 pl-3 text-sm leading-relaxed text-ivory/85">
                {entry.narrative.respuesta}
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {entry.cards.map((d) => (
                  <li
                    key={d.position.id}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-night/40 p-3"
                  >
                    <div
                      className={`h-8 w-8 shrink-0 text-cyan-soft ${
                        d.reversed ? 'rotate-180' : ''
                      }`}
                    >
                      <CardMotifSvg motif={d.card.motif} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-cyan-soft/70">
                        {d.position.label}
                      </p>
                      <p className="truncate text-sm text-ivory">{d.card.name}</p>
                      {d.reversed && (
                        <p className="text-[10px] text-electric-bright/80">
                          Invertida
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </Section>
  )
}
