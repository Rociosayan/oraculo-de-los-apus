import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'
import { Panel, Section, SectionTitle } from '../components/ui/Section'

const WHATSAPP_URL = 'https://wa.me/qr/UQUCZ45EW6QZE1'

export function ShopPage() {
  const { language } = useLanguage()
  const t = useCopy(language)

  const products = [
    { label: t.readingName, description: t.readingDesc, price: t.readingPrice, cta: t.readingCta, accent: 'cyan' },
    { label: t.grimoireName, description: t.grimoireDesc, price: t.grimoirePrice, cta: t.grimoireCta, accent: 'gold' },
  ]

  return (
    <Section className="py-12 pb-24 sm:py-16">
      <SectionTitle eyebrow={t.shopEyebrow} title={t.shopTitle} subtitle={t.shopIntro} />
      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {products.map((product) => (
          <Panel key={product.label} className={product.accent === 'gold' ? 'border-gold/30 bg-gold/5' : 'border-cyan-soft/25 bg-electric/5'}>
            <p className={`text-[10px] uppercase tracking-[0.25em] ${product.accent === 'gold' ? 'text-gold' : 'text-cyan-soft'}`}>Cusco · Perú</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">{product.label}</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist/75">{product.description}</p>
            <p className="mt-6 font-display text-2xl text-gold-soft">{product.price}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-electric to-cyan-glow px-6 py-3 text-sm font-semibold text-night shadow-[0_0_30px_rgba(34,211,238,0.2)] transition hover:scale-[1.02]">
              {product.cta}
            </a>
          </Panel>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-relaxed text-mist/60">{t.secure}</p>
      <p className="mt-5 text-center text-sm tracking-wide text-cyan-soft/75">{t.hashtags}</p>
    </Section>
  )
}
