import { Link } from 'react-router-dom'
import { SPREADS } from '../data/spreads'
import { Panel, Section, SectionTitle } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'

export function ReadingsPage() {
  const { language } = useLanguage(); const t = useCopy(language)
  return <Section className="py-12 sm:py-16">
    <SectionTitle eyebrow={t.consultation} title={t.readingsPageTitle} subtitle={t.readingsPageText} />
    <div className="mt-10 grid gap-4 md:grid-cols-2">{SPREADS.map((spread) => <Panel key={spread.id} className="flex flex-col justify-between transition duration-300 hover:border-cyan-soft/40"><div><p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">{spread.subtitle}</p><h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{spread.title}</h3><p className="mt-3 text-sm leading-relaxed text-mist/75">{spread.description}</p><ul className="mt-4 flex flex-wrap gap-2">{spread.positions.map((p) => <li key={p.id} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-cyan-soft/80">{p.label}</li>)}</ul></div><div className="mt-6"><Link to={`/lecturas/${spread.id}`}><Button>{t.begin}</Button></Link></div></Panel>)}</div>
  </Section>
}
