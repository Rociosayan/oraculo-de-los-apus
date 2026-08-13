import { Link } from 'react-router-dom'
import { ANDEAN_CARDS } from '../data/cards'
import { SPREADS } from '../data/spreads'
import { TarotCard } from '../components/cards/TarotCard'
import { CeremonialScene } from '../components/atmosphere/CeremonialScene'
import { Button } from '../components/ui/Button'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'

const featured = [21, 19, 20, 2, 9]

export function HomePage() {
  const { language } = useLanguage()
  const t = useCopy(language)
  return <>
    <section className="relative overflow-hidden px-4 pt-10 pb-6 sm:px-6">
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-cyan-soft/70">{t.heroEyebrow}</p>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"><span className="text-gradient">{t.heroTitle}</span></h1>
        <p className="mx-auto mt-5 max-w-xl font-display text-xl italic leading-relaxed text-mist/90 sm:text-2xl">{t.heroText}</p>
      </div>
      <CeremonialScene className="mt-6 h-[480px] sm:h-[560px] md:h-[640px]" />
      <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/lecturas"><Button className="px-7 py-3 text-base">{t.start}</Button></Link>
        <Link to="/cartas"><Button variant="secondary" className="px-6 py-3">{t.explore}</Button></Link>
        <Link to="/tienda"><Button variant="gold" className="px-6 py-3">{t.shop}</Button></Link>
      </div>
    </section>
    <Section className="py-16 sm:py-20">
      <SectionTitle eyebrow={t.origin} title={t.what} subtitle={t.whatText} />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">{t.worlds.map(([title, text]) => <Panel key={title} className="animate-reveal"><h3 className="font-display text-xl text-cyan-soft">{title}</h3><p className="mt-2 text-sm leading-relaxed text-mist/75">{text}</p></Panel>)}</div>
    </Section>
    <Section className="py-10 sm:py-14">
      <Panel className="relative overflow-hidden border-gold/30 bg-gradient-to-br from-indigo-soft/45 via-night/70 to-gold/10 px-6 py-10 text-center sm:px-12">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-glow/10 blur-3xl" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.offerEyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-ivory sm:text-5xl">{t.offerTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist/75 sm:text-base">{t.offerText}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/tienda"><Button>{t.buyReading}</Button></Link><Link to="/tienda"><Button variant="gold">{t.discoverGrimoire}</Button></Link></div>
        <p className="mt-6 text-xs tracking-wide text-cyan-soft/65">{t.hashtags}</p>
      </Panel>
    </Section>
    <Section className="py-12 sm:py-16">
      <SectionTitle eyebrow={t.deck} title={t.deckTitle} subtitle={t.deckText} />
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">{featured.map((id, i) => { const card = ANDEAN_CARDS[id]; return <div key={card.id} className="animate-float" style={{animationDelay:`${i*.4}s`}}><TarotCard card={card} faceDown={false} size="md" /></div> })}</div>
      <div className="mt-8 text-center"><Link to="/cartas"><Button variant="gold">{t.viewCards}</Button></Link></div>
    </Section>
    <Section className="py-12 pb-24 sm:py-16">
      <SectionTitle eyebrow={t.readings} title={t.readingsTitle} subtitle={t.readingsText} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{SPREADS.map((spread) => <Link key={spread.id} to={`/lecturas/${spread.id}`}><Panel className="h-full transition duration-300 hover:border-cyan-soft/40 hover:bg-indigo-soft/40"><p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">{spread.subtitle}</p><h3 className="mt-2 font-display text-2xl text-ivory">{spread.title}</h3><p className="mt-2 text-sm leading-relaxed text-mist/70">{spread.description}</p><p className="mt-4 text-xs text-cyan-soft">{spread.cardCount} {spread.cardCount === 1 ? t.card : t.cards} →</p></Panel></Link>)}</div>
    </Section>
  </>
}
