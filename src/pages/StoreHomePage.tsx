import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  es: { eyebrow: 'Cusco en tus manos', title: 'Elige lo que buscas en Cusco', intro: 'Explora prendas, accesorios y kits en páginas separadas. Las imágenes de ropa son referencias que podemos buscar por encargo; confirmaremos precio, material y disponibilidad antes de aceptar un pedido.', clothing: 'Ropa andina', clothingText: 'Ponchos, chompas y casacas para mujer y hombre.', accessories: 'Accesorios', accessoriesText: 'Chullos, chalinas y guantes. Fotografías y existencias pendientes.', kits: 'Kits y recuerdos', kitsText: 'Ideas para combinar piezas y recuerdos de Cusco.', spiritual: 'Libros y experiencias', spiritualText: 'Grimorio, fascículos y lecturas del oráculo.', view: 'Explorar', note: 'Los precios mostrados son orientativos. La tienda todavía no cobra en línea.' },
  en: { eyebrow: 'Cusco in your hands', title: 'Find what you want in Cusco', intro: 'Browse clothing, accessories and kits on separate pages. Clothing images are references for items we can look for on request; we confirm price, material and availability before accepting an order.', clothing: 'Andean clothing', clothingText: 'Ponchos, sweaters and jackets for women and men.', accessories: 'Accessories', accessoriesText: 'Hats, scarves and gloves. Photos and stock are pending.', kits: 'Kits and souvenirs', kitsText: 'Ideas for combining pieces and Cusco souvenirs.', spiritual: 'Books and experiences', spiritualText: 'Grimoire, booklets and oracle readings.', view: 'Explore', note: 'Displayed prices are indicative. Online payment is not yet available.' },
  fr: { eyebrow: 'Cusco entre vos mains', title: 'Trouvez votre souvenir de Cusco', intro: 'Vêtements, accessoires et kits sur des pages distinctes. Les images servent de références pour rechercher les articles sur demande ; prix, matières et disponibilité seront confirmés.', clothing: 'Vêtements andins', clothingText: 'Ponchos, pulls et vestes pour femmes et hommes.', accessories: 'Accessoires', accessoriesText: 'Bonnets, écharpes et gants. Photos et stock à confirmer.', kits: 'Kits et souvenirs', kitsText: 'Idées pour associer des pièces et souvenirs de Cusco.', spiritual: 'Livres et expériences', spiritualText: 'Grimoire, fascicules et tirages de l’oracle.', view: 'Découvrir', note: 'Prix indicatifs. Paiement en ligne indisponible pour le moment.' },
}

export function StoreHomePage() {
  const { language } = useLanguage()
  const t = copy[language]
  const sections = [
    { to: '/tienda/ropa', title: t.clothing, text: t.clothingText, image: '/images/products/referencia-poncho-hombre.png', position: 'center' },
    { to: '/tienda/accesorios', title: t.accessories, text: t.accessoriesText, image: null, position: 'center' },
    { to: '/tienda/kits', title: t.kits, text: t.kitsText, image: '/images/products/kit-pucara-concepto-v1.png', position: 'center' },
    { to: '/tienda/espiritual', title: t.spiritual, text: t.spiritualText, image: '/images/products/grimorio-concept-v1.webp', position: 'center' },
  ]
  return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <p className="text-xs uppercase tracking-[.25em] text-gold-soft">{t.eyebrow}</p><h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory sm:text-6xl">{t.title}</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-mist/80 sm:text-base">{t.intro}</p>
    <div className="mt-9 grid gap-5 sm:grid-cols-2">{sections.map((item) => <Link key={item.to} to={item.to} className="group overflow-hidden rounded-3xl border border-gold/25 bg-[#f7f0e5] text-[#3a241c] transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-48 overflow-hidden bg-[#e8d8c8] sm:h-64">{item.image ? <img src={item.image} alt="" className="h-full w-full object-cover object-center transition group-hover:scale-[1.03]" /> : <div className="flex h-full items-center justify-center px-8 text-center font-display text-3xl text-[#765b4b]">{t.accessories}</div>}</div><div className="p-6"><h2 className="font-display text-3xl">{item.title}</h2><p className="mt-2 min-h-12 text-sm text-[#6d594b]">{item.text}</p><span className="mt-5 inline-flex rounded-full bg-[#a51f31] px-5 py-2 text-sm font-semibold text-white">{t.view} →</span></div></Link>)}</div>
    <p className="mt-7 text-xs text-mist/65">{t.note}</p>
  </div>
}
