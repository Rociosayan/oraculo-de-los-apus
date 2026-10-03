import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChakanaMark } from '../components/atmosphere/CosmicBackground'
import { useLanguage, type Language } from '../context/LanguageContext'

type ChamberId = 'herbario' | 'aromas' | 'grimorio' | 'oraculo'

type Chamber = {
  id: ChamberId
  eyebrow: string
  title: string
  description: string
  action: string
  to: string
  position: string
  glyph: string
}

const copy: Record<Language, {
  eyebrow: string
  title: string
  intro: string
  enter: string
  back: string
  guide: string
  guideName: string
  hint: string
  close: string
  prototype: string
  chambers: Chamber[]
}> = {
  es: {
    eyebrow: 'Una experiencia del Oráculo de los Apus',
    title: 'La Fortaleza de los Apus',
    intro: 'Cruza el umbral. Cada recinto guarda una forma de escuchar la tierra, cuidar la intención y recordar tu propio camino.',
    enter: 'Cruzar el umbral',
    back: 'Volver al oráculo',
    guideName: 'El guardián de la fortaleza',
    guide: 'Camina sin prisa. Elige la puerta que hoy llame tu atención.',
    hint: 'Explora los símbolos luminosos',
    close: 'Cerrar',
    prototype: 'Prototipo · Primera estancia',
    chambers: [
      { id: 'herbario', eyebrow: 'Saberes de la tierra', title: 'Herbario de la Pachamama', description: 'Un futuro fascículo sobre plantas tradicionales, memoria cultural y prácticas cotidianas de bienestar, presentado con cuidado y sin promesas médicas.', action: 'Conocer el fascículo', to: '/tienda', position: 'left-[8%] top-[55%] sm:left-[13%] sm:top-[58%]', glyph: '✦' },
      { id: 'aromas', eyebrow: 'Fuego, resinas y memoria', title: 'Cámara de los Aromas', description: 'Aprende a combinar hierbas aromáticas y resinas para crear sahumerios conscientes, con indicaciones claras de ventilación y seguridad.', action: 'Descubrir los sahumerios', to: '/tienda', position: 'right-[8%] top-[55%] sm:right-[13%] sm:top-[58%]', glyph: '◌' },
      { id: 'grimorio', eyebrow: 'La biblioteca interior', title: 'El Grimorio Andino', description: 'Relatos, símbolos, ejercicios de reflexión y páginas para registrar los mensajes que encuentres durante tu recorrido.', action: 'Abrir la biblioteca', to: '/tienda', position: 'left-[37%] top-[44%] sm:left-[40%] sm:top-[50%]', glyph: '◇' },
      { id: 'oraculo', eyebrow: 'El recinto central', title: 'Templo del Oráculo', description: 'Formula tu pregunta, elige una tirada y permite que los arquetipos andinos te ayuden a contemplarla desde otra perspectiva.', action: 'Consultar el oráculo', to: '/lecturas', position: 'right-[37%] top-[44%] sm:right-[40%] sm:top-[50%]', glyph: '✧' },
    ],
  },
  en: {
    eyebrow: 'An Oracle of the Apus experience', title: 'The Fortress of the Apus',
    intro: 'Cross the threshold. Each chamber holds a way to listen to the earth, tend your intention, and remember your own path.',
    enter: 'Cross the threshold', back: 'Return to the oracle', guideName: 'Guardian of the fortress',
    guide: 'Walk slowly. Choose the doorway that calls to you today.', hint: 'Explore the glowing symbols', close: 'Close', prototype: 'Prototype · First chamber',
    chambers: [
      { id: 'herbario', eyebrow: 'Wisdom of the earth', title: 'Pachamama Herbarium', description: 'A future booklet about traditional plants, cultural memory, and everyday wellbeing practices, presented carefully and without medical promises.', action: 'Discover the booklet', to: '/tienda', position: 'left-[8%] top-[55%] sm:left-[13%] sm:top-[58%]', glyph: '✦' },
      { id: 'aromas', eyebrow: 'Fire, resins, and memory', title: 'Chamber of Aromas', description: 'Learn to combine aromatic herbs and resins for mindful incense, with clear ventilation and safety guidance.', action: 'Discover the incense', to: '/tienda', position: 'right-[8%] top-[55%] sm:right-[13%] sm:top-[58%]', glyph: '◌' },
      { id: 'grimorio', eyebrow: 'The inner library', title: 'The Andean Grimoire', description: 'Stories, symbols, reflective exercises, and pages to record the messages you encounter along the way.', action: 'Open the library', to: '/tienda', position: 'left-[37%] top-[44%] sm:left-[40%] sm:top-[50%]', glyph: '◇' },
      { id: 'oraculo', eyebrow: 'The central sanctuary', title: 'Temple of the Oracle', description: 'Ask your question, choose a spread, and let Andean archetypes help you contemplate it from another perspective.', action: 'Consult the oracle', to: '/lecturas', position: 'right-[37%] top-[44%] sm:right-[40%] sm:top-[50%]', glyph: '✧' },
    ],
  },
  fr: {
    eyebrow: "Une expérience de l'Oracle des Apus", title: 'La Forteresse des Apus',
    intro: "Franchissez le seuil. Chaque enceinte offre une manière d'écouter la terre, de prendre soin de votre intention et de retrouver votre chemin.",
    enter: 'Franchir le seuil', back: "Retourner à l'oracle", guideName: 'Gardien de la forteresse',
    guide: "Avancez sans hâte. Choisissez la porte qui vous appelle aujourd'hui.", hint: 'Explorez les symboles lumineux', close: 'Fermer', prototype: 'Prototype · Première enceinte',
    chambers: [
      { id: 'herbario', eyebrow: 'Savoirs de la terre', title: 'Herbier de la Pachamama', description: 'Un futur fascicule sur les plantes traditionnelles, la mémoire culturelle et les pratiques quotidiennes de bien-être, sans promesses médicales.', action: 'Découvrir le fascicule', to: '/tienda', position: 'left-[8%] top-[55%] sm:left-[13%] sm:top-[58%]', glyph: '✦' },
      { id: 'aromas', eyebrow: 'Feu, résines et mémoire', title: 'Chambre des Arômes', description: "Apprenez à associer herbes aromatiques et résines pour créer des fumigations conscientes, avec des conseils clairs d'aération et de sécurité.", action: 'Découvrir les fumigations', to: '/tienda', position: 'right-[8%] top-[55%] sm:right-[13%] sm:top-[58%]', glyph: '◌' },
      { id: 'grimorio', eyebrow: 'La bibliothèque intérieure', title: 'Le Grimoire Andin', description: 'Récits, symboles, exercices de réflexion et pages pour consigner les messages rencontrés pendant votre parcours.', action: 'Ouvrir la bibliothèque', to: '/tienda', position: 'left-[37%] top-[44%] sm:left-[40%] sm:top-[50%]', glyph: '◇' },
      { id: 'oraculo', eyebrow: 'Le sanctuaire central', title: "Temple de l'Oracle", description: "Formulez votre question, choisissez un tirage et laissez les archétypes andins vous aider à l'observer autrement.", action: "Consulter l'oracle", to: '/lecturas', position: 'right-[37%] top-[44%] sm:right-[40%] sm:top-[50%]', glyph: '✧' },
    ],
  },
}

export function FortressPage() {
  const { language } = useLanguage()
  const t = copy[language]
  const [entered, setEntered] = useState(false)
  const [activeId, setActiveId] = useState<ChamberId | null>(null)
  const active = t.chambers.find((chamber) => chamber.id === activeId)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="fortress-page relative min-h-[100svh] overflow-hidden bg-[#02050d] text-ivory">
      <img
        src={`${import.meta.env.BASE_URL}images/fortaleza/fortaleza-apus-patio-v1.webp`}
        alt="Patio nocturno de una fortaleza andina imaginaria"
        className={`absolute inset-0 h-full w-full object-cover transition duration-[1800ms] ${entered ? 'scale-105 opacity-100' : 'scale-100 opacity-70 blur-[1px]'}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,13,.28),rgba(2,5,13,.05)_45%,rgba(2,5,13,.8))]" />
      <div className="fortress-vignette absolute inset-0" />

      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-night/65 px-3 py-2 text-xs text-mist backdrop-blur-md transition hover:border-gold/50 hover:text-ivory sm:px-4 sm:text-sm">
          <span aria-hidden="true">←</span> {t.back}
        </Link>
        <span className="hidden rounded-full border border-gold/25 bg-night/55 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-gold-soft/75 backdrop-blur-md min-[430px]:block sm:text-[10px]">{t.prototype}</span>
      </header>

      {!entered ? (
        <section className="relative z-20 flex min-h-[100svh] items-center justify-center px-5 py-24 text-center">
          <div className="fortress-intro w-full min-w-0 max-w-3xl">
            <ChakanaMark className="mx-auto h-14 w-14 text-gold-soft drop-shadow-[0_0_22px_rgba(232,213,163,.6)] sm:h-16 sm:w-16" />
            <p className="mx-auto mt-6 w-[calc(100vw-2.5rem)] max-w-[19rem] whitespace-normal text-[9px] uppercase tracking-[0.27em] text-cyan-soft/80 sm:w-auto sm:max-w-none sm:text-xs sm:tracking-[0.34em]">{t.eyebrow}</p>
            <h1 className="mx-auto mt-3 w-[calc(100vw-2.5rem)] whitespace-normal font-display text-4xl leading-[0.95] text-ivory drop-shadow-2xl sm:w-auto sm:text-7xl md:text-8xl">{t.title}</h1>
            <p className="mx-auto mt-5 w-[calc(100vw-2.5rem)] max-w-2xl whitespace-normal font-display text-lg italic leading-relaxed text-mist sm:w-auto sm:text-2xl">{t.intro}</p>
            <button type="button" onClick={() => setEntered(true)} className="fortress-enter mt-8 rounded-full border border-gold/70 bg-night/55 px-7 py-3 text-sm uppercase tracking-[0.2em] text-gold-soft backdrop-blur-md transition hover:bg-gold/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-soft sm:px-9 sm:py-4">
              {t.enter} <span aria-hidden="true">✦</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="relative z-20 min-h-[100svh] animate-fortress-reveal" aria-label={t.title}>
          {t.chambers.map((chamber) => (
            <button
              key={chamber.id}
              type="button"
              onClick={() => setActiveId(chamber.id)}
              aria-label={chamber.title}
              className={`fortress-hotspot absolute ${chamber.position} z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/80 bg-night/55 font-display text-xl text-gold-soft shadow-[0_0_0_7px_rgba(201,169,98,.1),0_0_32px_rgba(232,213,163,.7)] backdrop-blur-sm transition hover:scale-110 hover:bg-gold/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-soft sm:h-14 sm:w-14 sm:text-2xl`}
            >
              {chamber.glyph}
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-5 z-20 mx-auto flex max-w-5xl items-end justify-between gap-4 px-4 sm:bottom-7 sm:px-6">
            <div className="max-w-sm rounded-2xl border border-white/12 bg-night/75 p-3.5 shadow-2xl backdrop-blur-xl sm:p-5">
              <div className="flex items-start gap-3">
                <ChakanaMark className="mt-0.5 h-8 w-8 shrink-0 text-cyan-soft" />
                <div><p className="text-[9px] uppercase tracking-[0.2em] text-gold/80 sm:text-[10px]">{t.guideName}</p><p className="mt-1 font-display text-base italic leading-snug text-mist sm:text-lg">“{t.guide}”</p></div>
              </div>
            </div>
            <p className="hidden rounded-full border border-white/10 bg-night/60 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-mist/70 backdrop-blur-md sm:block">{t.hint}</p>
          </div>
        </section>
      )}

      {active && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-night/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="fortress-dialog-title" onClick={() => setActiveId(null)}>
          <article className="animate-fortress-panel relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-gold/35 bg-[linear-gradient(145deg,rgba(11,18,41,.97),rgba(3,7,17,.98))] p-6 shadow-[0_25px_100px_rgba(0,0,0,.75)] sm:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <button type="button" onClick={() => setActiveId(null)} className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist/70 hover:text-ivory" aria-label={t.close}>×</button>
            <span className="font-display text-4xl text-gold-soft" aria-hidden="true">{active.glyph}</span>
            <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-cyan-soft/75">{active.eyebrow}</p>
            <h2 id="fortress-dialog-title" className="mt-2 font-display text-3xl text-ivory sm:text-4xl">{active.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist/75 sm:text-base">{active.description}</p>
            <Link to={active.to} className="mt-7 inline-flex rounded-full border border-gold/55 bg-gold/10 px-5 py-2.5 text-sm text-gold-soft transition hover:bg-gold/20">{active.action} <span className="ml-2" aria-hidden="true">→</span></Link>
          </article>
        </div>
      )}
    </main>
  )
}
