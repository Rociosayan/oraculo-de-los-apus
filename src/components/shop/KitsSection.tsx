import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { ANDEAN_KITS, individualTotalPen, kitTotalPen, type KitCategory } from '../../data/kits'
import { TEXTILE_PRODUCTS, type TextileProduct } from '../../data/textileCatalog'

const labels = {
  es: { eyebrow: 'Colección de muestra', title: 'Elige un kit o explora cada pieza', intro: 'Abre cualquier kit para ver qué incluye y comparar el precio del conjunto con los precios individuales.', all: 'Todos', souvenirs: 'Recuerdos', clothing: 'Ropa andina', kit: 'Kit', separately: 'Por separado', save: 'Diferencia', view: 'Ver artículos y precios', each: 'cada uno', image: 'Imagen conceptual', note: 'Precios e imágenes referenciales. Aún no se aceptan pedidos de estos kits; confirmaremos productos, tallas, disponibilidad y entrega en Cusco antes de activarlos.' },
  en: { eyebrow: 'Sample collection', title: 'Choose a kit or explore each piece', intro: 'Open a kit to see what it contains and compare its bundle price with individual prices.', all: 'All', souvenirs: 'Souvenirs', clothing: 'Andean clothing', kit: 'Kit', separately: 'Separately', save: 'Difference', view: 'See items and prices', each: 'each', image: 'Concept image', note: 'Prices and images are illustrative. Orders for these kits are not available yet; products, sizes, availability and delivery in Cusco will be confirmed before launch.' },
  fr: { eyebrow: 'Collection de démonstration', title: 'Choisissez un kit ou découvrez chaque pièce', intro: 'Ouvrez un kit pour voir son contenu et comparer le prix du lot aux prix individuels.', all: 'Tous', souvenirs: 'Souvenirs', clothing: 'Vêtements andins', kit: 'Kit', separately: 'Séparément', save: 'Différence', view: 'Voir les articles et les prix', each: 'l’unité', image: 'Image conceptuelle', note: 'Prix et images indicatifs. Les commandes ne sont pas encore ouvertes ; les produits, tailles, disponibilités et livraisons à Cusco seront confirmés avant le lancement.' },
}

export function KitsSection() {
  const { language } = useLanguage()
  const t = labels[language]
  const [filter, setFilter] = useState<KitCategory | 'all'>('all')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [products, setProducts] = useState<TextileProduct[]>(TEXTILE_PRODUCTS)
  useEffect(() => { void fetch('/api/catalog').then((response) => response.json()).then((data: { products?: TextileProduct[]; exchangeRatePenPerUsd?: number | null }) => { if (typeof data.exchangeRatePenPerUsd === 'number' && data.exchangeRatePenPerUsd > 0) setExchangeRate(data.exchangeRatePenPerUsd); if (Array.isArray(data.products) && data.products.length) setProducts(data.products) }).catch(() => {}) }, [])
  const kits = filter === 'all' ? ANDEAN_KITS : ANDEAN_KITS.filter((kit) => kit.category === filter)
  const pending = language === 'es' ? 'Por confirmar' : language === 'fr' ? 'À confirmer' : 'To confirm'

  return <section id="kits" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.24em] text-gold-soft">{t.eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">{t.title}</h2>
      <p className="mt-4 text-sm leading-7 text-mist/75">{t.intro}</p>
    </div>
    <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label={t.title}>
      {([['all', t.all], ['recuerdos', t.souvenirs], ['ropa', t.clothing]] as const).map(([value, label]) =>
        <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value}
          className={`rounded-full border px-4 py-2 text-sm transition ${filter === value ? 'border-[#c9a962] bg-[#f5ede0] text-[#532b22]' : 'border-white/15 text-mist hover:border-gold/50'}`}>{label}</button>,
      )}
    </div>
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {kits.map((kit) => {
        const separate = individualTotalPen(kit)
        const kitPrice = kitTotalPen(kit)
        return <article key={kit.id} className="overflow-hidden rounded-3xl border border-[#c9a962]/30 bg-[#f7f0e5] text-[#3a241c] shadow-[0_20px_50px_rgba(0,0,0,.2)]">
          <div className="grid sm:grid-cols-[42%_1fr]">
            <div className="relative"><img src={kit.image} alt="" loading="lazy" className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto" /><span className="absolute bottom-3 left-3 rounded-full bg-[#3a241c]/85 px-3 py-1 text-[10px] font-semibold text-white">{t.image}</span></div>
            <div className="flex flex-col p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80614a]">{kit.collection === 'premium' ? 'Alpaca Premium' : kit.category === 'ropa' ? t.clothing : t.souvenirs}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">{kit.name}</h3>
              <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2">
                <div><p className="text-xs text-[#765b4b]">{t.kit}</p><p className="font-display text-3xl font-bold text-[#a51f31]">{kitPrice === null ? pending : `S/ ${kitPrice}`}</p>{kitPrice !== null && exchangeRate && <p className="text-xs text-[#765b4b]">≈ US$ {(kitPrice / exchangeRate).toFixed(2)}</p>}</div>
                <div><p className="text-xs text-[#765b4b]">{t.separately}</p><p className="font-display text-2xl text-[#4d5c37]">{separate === null ? pending : `S/ ${separate}`}</p></div>
              </div>
              {kitPrice !== null && separate !== null && <p className="mt-2 text-xs font-semibold text-[#4d5c37]">{t.save}: S/ {separate - kitPrice}</p>}
            </div>
          </div>
          <details className="group border-t border-[#b69b7e]/35 px-5 py-4 sm:px-6">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[#a51f31] marker:hidden">{t.view} <span className="float-right transition group-open:rotate-180" aria-hidden="true">⌄</span></summary>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {kit.items.map((item, index) => {
                const textile = products.find((product) => product.id === item.textileProductId)
                return <li key={`${item.name}-${index}`} className="overflow-hidden rounded-2xl border border-[#b69b7e]/30 bg-white/70">
                  <div className="flex gap-3 p-3"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#e8d8c8]"><img src={textile?.photos[0] ?? kit.image} alt="" loading="lazy" className="h-full w-full object-cover" /></div><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#8b6754]">{t.image}</p><p className="mt-1 text-sm font-semibold leading-5">{item.quantity} × {item.name}</p><p className="mt-1 text-xs text-[#6d594b]">{item.individualPricePen === null ? pending : `S/ ${item.individualPricePen} ${t.each}`}</p></div></div>
                  {textile && <div className="border-t border-[#b69b7e]/25 px-3 py-2"><label className="text-xs text-[#6d594b]">{language === 'es' ? 'Talla · largo · color' : language === 'fr' ? 'Taille · longueur · couleur' : 'Size · length · color'}<select disabled={!textile.variants.length} defaultValue="" className="mt-1 w-full rounded-lg border border-[#b69b7e]/45 bg-white px-2 py-2 text-xs disabled:opacity-60"><option value="">{textile.variants.length ? (language === 'es' ? 'Elige una variante' : language === 'fr' ? 'Choisir une variante' : 'Choose a variant') : pending}</option>{textile.variants.filter((variant) => variant.available && (variant.stock ?? 0) > 0).map((variant) => <option key={variant.id} value={variant.id}>{[variant.size, variant.length, variant.color].filter(Boolean).join(' · ')}{variant.salePricePen ? ` · S/ ${variant.salePricePen}` : ''}</option>)}</select></label></div>}
                </li>
              })}
            </ul>
          </details>
        </article>
      })}
    </div>
    <p className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 px-5 py-4 text-xs leading-6 text-mist/70">{t.note} {exchangeRate ? (language === 'es' ? `Conversión USD referencial a S/ ${exchangeRate} por dólar.` : language === 'fr' ? `Conversion USD indicative à S/ ${exchangeRate} par dollar.` : `Indicative USD conversion at S/ ${exchangeRate} per dollar.`) : (language === 'es' ? 'Equivalente en USD pendiente de configurar.' : language === 'fr' ? 'Équivalent en USD à configurer.' : 'USD equivalent pending configuration.')}</p>
  </section>
}
