import { Link } from 'react-router-dom'
import { ANDEAN_CARDS } from '../data/cards'
import { SPREADS } from '../data/spreads'
import { TarotCard } from '../components/cards/TarotCard'
import { CeremonialScene } from '../components/atmosphere/CeremonialScene'
import { Button } from '../components/ui/Button'
import { Panel, Section, SectionTitle } from '../components/ui/Section'

const featured = [21, 19, 20, 2, 9]

export function HomePage() {
  return (
    <>
      {/* Hero con el paqo interactivo */}
      <section className="relative overflow-hidden px-4 pt-10 pb-6 sm:px-6">
        <div className="relative z-20 mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-cyan-soft/70">
            Tarot Andino
          </p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            <span className="text-gradient">Oráculo de los Apus</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-display text-xl italic leading-relaxed text-mist/90 sm:text-2xl">
            Escucha la sabiduría que desciende de las montañas
          </p>
        </div>

        <CeremonialScene className="mt-6 h-[480px] sm:h-[560px] md:h-[640px]" />

        <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/lecturas">
            <Button className="px-7 py-3 text-base">Iniciar una lectura</Button>
          </Link>
          <Link to="/cartas">
            <Button variant="secondary" className="px-6 py-3">
              Explorar las cartas
            </Button>
          </Link>
        </div>
      </section>

      {/* Qué es el Tarot Andino */}
      <Section className="py-16 sm:py-20">
        <SectionTitle
          eyebrow="El origen"
          title="¿Qué es el Tarot Andino?"
          subtitle="Un oráculo contemplativo que reinterpreta los 22 arcanos mayores desde la cosmovisión de los Andes: el cóndor, el puma y la serpiente; Pachamama, Inti y Mama Quilla; la chakana que une los tres mundos."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: 'Hanan Pacha',
              text: 'El mundo de arriba: visión, espíritu y aquello que te inspira desde la altura de los apus.',
            },
            {
              title: 'Kay Pacha',
              text: 'El mundo de aquí: la vida cotidiana, los vínculos y las decisiones que tomas hoy.',
            },
            {
              title: 'Uku Pacha',
              text: 'El mundo interior: raíces, memoria y todo lo que germina en silencio dentro de ti.',
            },
          ].map((item) => (
            <Panel key={item.title} className="animate-reveal">
              <h3 className="font-display text-xl text-cyan-soft">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">{item.text}</p>
            </Panel>
          ))}
        </div>
      </Section>

      {/* Cartas destacadas */}
      <Section className="py-12 sm:py-16">
        <SectionTitle
          eyebrow="El mazo"
          title="Símbolos que guardan la montaña"
          subtitle="Cada carta reúne un significado general, un mensaje andino y un consejo práctico."
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {featured.map((id, i) => {
            const card = ANDEAN_CARDS[id]
            return (
              <div
                key={card.id}
                className="animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <TarotCard card={card} faceDown={false} size="md" />
              </div>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link to="/cartas">
            <Button variant="gold">Ver las 22 cartas</Button>
          </Link>
        </div>
      </Section>

      {/* Tipos de lectura */}
      <Section className="py-12 pb-24 sm:py-16">
        <SectionTitle
          eyebrow="Lecturas"
          title="Elige cómo quieres consultar"
          subtitle="Desde un mensaje breve para el día hasta tiradas dedicadas al amor o a las decisiones materiales."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPREADS.map((spread) => (
            <Link key={spread.id} to={`/lecturas/${spread.id}`}>
              <Panel className="h-full transition duration-300 hover:border-cyan-soft/40 hover:bg-indigo-soft/40">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">
                  {spread.subtitle}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory">
                  {spread.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/70">
                  {spread.description}
                </p>
                <p className="mt-4 text-xs text-cyan-soft">
                  {spread.cardCount} {spread.cardCount === 1 ? 'carta' : 'cartas'} →
                </p>
              </Panel>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
