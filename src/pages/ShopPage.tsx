import type { Language } from '../context/LanguageContext'
import { useLanguage } from '../context/LanguageContext'
import { useCopy } from '../content/translations'
import { Panel, Section, SectionTitle } from '../components/ui/Section'

const WHATSAPP_URL = 'https://wa.me/qr/UQUCZ45EW6QZE1'

const shopCopy = {
  es: {
    heroLabel: 'Próximamente · productos andinos', heroTitle: 'Objetos que llevan los Andes contigo', heroText: 'Chompas, ponchos y pequeños tesoros. Esta imagen muestra una propuesta visual; los productos, precios y disponibilidad se anunciarán aquí.',
    exploreKits: 'Ver prendas', deliveryTitle: '¿Te vas de Cusco y olvidaste comprar tus recuerdos?', deliveryText: 'Estamos preparando entregas locales coordinadas para viajeros en Cusco. Antes de prometer una entrega, confirmaremos el producto, la dirección, el horario y el costo contigo.', deliverySteps: ['Elige los recuerdos que te interesan', 'Consulta disponibilidad y zona de entrega', 'Confirma el horario antes de pagar'], deliveryCta: 'Consultar entrega en Cusco', deliveryStatus: 'Servicio en preparación · sujeto a confirmación',
    featured: 'Edición principal', status: 'En preparación', grimoireTitle: 'Grimorio de la Maestra de la Luz',
    grimoireLead: 'Una biblioteca ritual para consultar con calma: preparaciones, baños, sahumerios y prácticas personales reunidas desde la experiencia de la autora.',
    grimoireIncludes: ['Edición digital en PDF', 'Recetas explicadas paso a paso', 'Precauciones y uso responsable', 'Actualizaciones de la primera edición'],
    grimoirePrice: 'Precio de lanzamiento · US$39', reserve: 'Consultar y reservar', noCharge: 'La consulta por WhatsApp no genera ningún cobro automático.',
    libraryEyebrow: 'Biblioteca de la montaña', libraryTitle: 'Fascículos para recorrer un tema a la vez', libraryText: 'Ediciones breves y prácticas que ampliarán el grimorio sin repetir su contenido.',
    bookletOneLabel: 'Fascículo I', bookletOneTitle: 'Herbolaria tradicional y bienestar', bookletOneText: 'Plantas, preparaciones cotidianas y cuidados para acercarse a la tradición con respeto, sin sustituir la orientación médica.',
    bookletTwoLabel: 'Fascículo II', bookletTwoTitle: 'El arte de preparar sahumerios', bookletTwoText: 'Ingredientes, combinaciones, intenciones y pautas de ventilación y seguridad para una práctica consciente.',
    comingSoon: 'Próximamente', collectionLabel: 'Colección completa', collectionTitle: 'Un camino de lectura, práctica y memoria', collectionText: 'El grimorio y los fascículos podrán adquirirse por separado o como una colección especial cuando las ediciones estén terminadas.', notify: 'Preguntar por la colección',
    personalEyebrow: 'Acompañamiento personal', personalTitle: 'Una lectura privada para tu momento presente', personalText: 'Sesión individual por videollamada de 60 minutos, con lectura profunda, espacio para preguntas y un resumen escrito posterior.', personalPrice: 'US$80', personalCta: 'Reservar una lectura',
    trustTitle: 'Una compra acompañada', trustItems: [['1', 'Conversa', 'Escríbenos por WhatsApp y cuéntanos qué producto o experiencia buscas.'], ['2', 'Confirma', 'Recibe personalmente los detalles, disponibilidad y forma de pago.'], ['3', 'Recibe', 'Coordinamos la sesión o la entrega digital directamente contigo.']],
  },
  en: {
    heroLabel: 'Coming soon · Andean products', heroTitle: 'Carry the Andes with you', heroText: 'Sweaters, ponchos and small treasures. This image is a visual concept; actual products, prices and availability will be announced here.',
    exploreKits: 'Explore clothing', deliveryTitle: 'Leaving Cusco and forgot to buy souvenirs?', deliveryText: 'We are preparing coordinated local deliveries for travelers in Cusco. We will confirm the item, address, time and delivery cost with you before promising delivery.', deliverySteps: ['Choose the souvenirs you like', 'Check availability and delivery area', 'Confirm a time before paying'], deliveryCta: 'Ask about delivery in Cusco', deliveryStatus: 'Service in preparation · confirmation required',
    featured: 'Main edition', status: 'In preparation', grimoireTitle: 'Maestra de la Luz Grimoire',
    grimoireLead: 'A ritual library to consult at your own pace: preparations, baths, herbal smoke blends and personal practices gathered from the author’s experience.',
    grimoireIncludes: ['Digital PDF edition', 'Step-by-step recipes', 'Precautions and responsible use', 'First-edition updates'],
    grimoirePrice: 'Launch price · US$39', reserve: 'Ask and reserve', noCharge: 'Contacting us on WhatsApp does not create an automatic charge.',
    libraryEyebrow: 'Library of the mountain', libraryTitle: 'Booklets to explore one subject at a time', libraryText: 'Short, practical editions that expand the grimoire without repeating its content.',
    bookletOneLabel: 'Booklet I', bookletOneTitle: 'Traditional herbal knowledge and wellbeing', bookletOneText: 'Plants, everyday preparations and precautions for approaching tradition respectfully, without replacing medical guidance.',
    bookletTwoLabel: 'Booklet II', bookletTwoTitle: 'The art of preparing herbal smoke blends', bookletTwoText: 'Ingredients, combinations, intentions, ventilation and safety guidance for a mindful practice.',
    comingSoon: 'Coming soon', collectionLabel: 'Complete collection', collectionTitle: 'A path of reading, practice and memory', collectionText: 'The grimoire and booklets will be available separately or as a special collection once the editions are complete.', notify: 'Ask about the collection',
    personalEyebrow: 'Personal guidance', personalTitle: 'A private reading for your present moment', personalText: 'A 60-minute individual video session with an in-depth reading, time for questions and a written summary afterward.', personalPrice: 'US$80', personalCta: 'Book a reading',
    trustTitle: 'A personally guided purchase', trustItems: [['1', 'Talk', 'Message us on WhatsApp and tell us which product or experience you seek.'], ['2', 'Confirm', 'Receive availability, details and payment information personally.'], ['3', 'Receive', 'We coordinate your session or digital delivery directly with you.']],
  },
  fr: {
    heroLabel: 'Bientôt · produits andins', heroTitle: 'Emportez les Andes avec vous', heroText: 'Pulls, ponchos et petits trésors. Cette image est un concept visuel ; les produits, prix et disponibilités seront annoncés ici.',
    exploreKits: 'Voir les vêtements', deliveryTitle: 'Vous quittez Cusco sans vos souvenirs ?', deliveryText: 'Nous préparons des livraisons locales coordonnées pour les voyageurs à Cusco. Nous confirmerons le produit, l’adresse, l’horaire et le coût avant toute promesse de livraison.', deliverySteps: ['Choisissez vos souvenirs', 'Vérifiez la disponibilité et la zone de livraison', 'Confirmez l’horaire avant de payer'], deliveryCta: 'Demander une livraison à Cusco', deliveryStatus: 'Service en préparation · confirmation requise',
    featured: 'Édition principale', status: 'En préparation', grimoireTitle: 'Grimoire de la Maestra de la Luz',
    grimoireLead: "Une bibliothèque rituelle à consulter avec calme : préparations, bains, fumigations et pratiques personnelles issues de l’expérience de l’auteure.",
    grimoireIncludes: ['Édition numérique PDF', 'Recettes pas à pas', 'Précautions et usage responsable', 'Mises à jour de la première édition'],
    grimoirePrice: 'Prix de lancement · 39 $US', reserve: 'Se renseigner et réserver', noCharge: "La prise de contact sur WhatsApp n’entraîne aucun paiement automatique.",
    libraryEyebrow: 'Bibliothèque de la montagne', libraryTitle: 'Des fascicules pour explorer un thème à la fois', libraryText: 'Des éditions courtes et pratiques qui prolongent le grimoire sans répéter son contenu.',
    bookletOneLabel: 'Fascicule I', bookletOneTitle: 'Herboristerie traditionnelle et bien-être', bookletOneText: "Plantes, préparations quotidiennes et précautions pour approcher la tradition avec respect, sans remplacer l’avis médical.",
    bookletTwoLabel: 'Fascicule II', bookletTwoTitle: 'L’art de préparer les fumigations', bookletTwoText: 'Ingrédients, associations, intentions, ventilation et sécurité pour une pratique consciente.',
    comingSoon: 'Prochainement', collectionLabel: 'Collection complète', collectionTitle: 'Un chemin de lecture, de pratique et de mémoire', collectionText: 'Le grimoire et les fascicules seront proposés séparément ou en collection spéciale lorsque les éditions seront terminées.', notify: 'Demander la collection',
    personalEyebrow: 'Accompagnement personnel', personalTitle: 'Un tirage privé pour votre moment présent', personalText: 'Une séance individuelle de 60 minutes en visioconférence, avec lecture approfondie, questions et résumé écrit.', personalPrice: '80 $US', personalCta: 'Réserver un tirage',
    trustTitle: 'Un achat accompagné', trustItems: [['1', 'Échangez', 'Écrivez-nous sur WhatsApp et indiquez le produit ou l’expérience recherchée.'], ['2', 'Confirmez', 'Recevez personnellement les détails, disponibilités et modalités de paiement.'], ['3', 'Recevez', 'Nous coordonnons directement avec vous la séance ou la livraison numérique.']],
  },
} satisfies Record<Language, Record<string, string | string[] | string[][]>>

function WhatsAppButton({ children, variant = 'cyan' }: { children: string; variant?: 'cyan' | 'gold' }) {
  const colors = variant === 'gold'
    ? 'border border-gold/45 bg-gold/10 text-gold-soft hover:bg-gold/20'
    : 'bg-gradient-to-r from-electric to-cyan-glow text-night shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:brightness-110'
  return <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] ${colors}`}>{children}</a>
}

function BookletCover({ kind, label }: { kind: 'herbs' | 'smoke'; label: string }) {
  const image = kind === 'herbs' ? '/images/coca-hoja.webp' : '/images/ausangate-noche.webp'
  return (
    <div className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-xl border border-gold/30 bg-indigo-night shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:w-40">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/10 via-night/35 to-night/95" />
      <div className="absolute inset-3 rounded-lg border border-gold/30" />
      <div className="absolute inset-x-4 bottom-5 text-center"><span className="text-[9px] uppercase tracking-[0.28em] text-gold-soft">{label}</span><div className="mx-auto mt-3 h-px w-10 bg-cyan-soft/60" /></div>
    </div>
  )
}

export function ShopPage() {
  const { language } = useLanguage()
  const t = useCopy(language)
  const s = shopCopy[language]
  const booklets = [
    { kind: 'herbs' as const, label: s.bookletOneLabel, title: s.bookletOneTitle, text: s.bookletOneText },
    { kind: 'smoke' as const, label: s.bookletTwoLabel, title: s.bookletTwoTitle, text: s.bookletTwoText },
  ]

  return (
    <>
      <Section className="py-12 sm:py-16">
        <SectionTitle eyebrow={t.shopEyebrow} title={t.shopTitle} subtitle={t.shopIntro} />
        <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-indigo-night/90 via-night-deep to-indigo-soft/25 shadow-[0_35px_100px_rgba(0,0,0,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-96 overflow-hidden lg:min-h-[590px]">
            <img src="/images/products/grimorio-concept-v1.webp" alt={s.grimoireTitle} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/10 lg:bg-gradient-to-r lg:from-transparent lg:to-night/70" />
            <span className="absolute left-5 top-5 rounded-full border border-gold/35 bg-night/80 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-gold-soft backdrop-blur">{s.status}</span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{s.featured}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ivory sm:text-5xl">{s.grimoireTitle}</h1>
            <p className="mt-5 text-sm leading-7 text-mist/75 sm:text-base">{s.grimoireLead}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">{s.grimoireIncludes.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-mist/80"><span className="mt-1 text-cyan-soft">✦</span><span>{item}</span></li>)}</ul>
            <p className="mt-8 font-display text-2xl text-gold-soft">{s.grimoirePrice}</p>
            <div className="mt-6"><WhatsAppButton>{s.reserve}</WhatsAppButton></div>
            <p className="mt-4 text-xs leading-relaxed text-mist/50">{s.noCharge}</p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <SectionTitle eyebrow={s.libraryEyebrow} title={s.libraryTitle} subtitle={s.libraryText} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          {booklets.map((booklet) => <Panel key={booklet.title} className="flex min-h-64 items-center gap-5 border-white/10 bg-indigo-night/45 sm:gap-7"><BookletCover kind={booklet.kind} label={booklet.label} /><div><span className="rounded-full border border-cyan-soft/20 bg-cyan-soft/5 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-cyan-soft">{s.comingSoon}</span><h2 className="mt-4 font-display text-2xl leading-tight text-ivory sm:text-3xl">{booklet.title}</h2><p className="mt-3 text-sm leading-relaxed text-mist/65">{booklet.text}</p></div></Panel>)}
        </div>
        <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-gold/25 bg-[radial-gradient(circle_at_top_right,rgba(201,169,98,0.12),transparent_38%),linear-gradient(135deg,rgba(11,18,41,0.9),rgba(3,7,17,0.95))] p-7 text-center sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{s.collectionLabel}</p><h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">{s.collectionTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist/70 sm:text-base">{s.collectionText}</p><div className="mt-7"><WhatsAppButton variant="gold">{s.notify}</WhatsAppButton></div>
        </div>
      </Section>

      <Section className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel className="border-cyan-soft/20 bg-electric/5 p-7 sm:p-9"><p className="text-[10px] uppercase tracking-[0.3em] text-cyan-soft">{s.personalEyebrow}</p><h2 className="mt-3 font-display text-3xl leading-tight text-ivory sm:text-4xl">{s.personalTitle}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-mist/70 sm:text-base">{s.personalText}</p><p className="mt-6 font-display text-3xl text-gold-soft">{s.personalPrice}</p><div className="mt-6"><WhatsAppButton>{s.personalCta}</WhatsAppButton></div></Panel>
          <Panel className="border-gold/20 bg-gold/5 p-7 sm:p-9"><h2 className="font-display text-3xl text-ivory">{s.trustTitle}</h2><ol className="mt-6 space-y-5">{s.trustItems.map(([number, title, text]) => <li key={number} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/35 font-display text-gold-soft">{number}</span><div><h3 className="font-display text-xl text-ivory">{title}</h3><p className="mt-1 text-xs leading-relaxed text-mist/60">{text}</p></div></li>)}</ol></Panel>
        </div>
        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-relaxed text-mist/55">{t.secure}</p><p className="mt-5 text-center text-sm tracking-wide text-cyan-soft/75">{t.hashtags}</p>
      </Section>
    </>
  )
}
