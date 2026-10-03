import type { Language } from '../context/LanguageContext'
import type { DrawnCard, ReadingNarrative } from '../types'
import { localizedCardFields } from '../content/cardCopy'

const disclaimer: Record<Language, string> = {
  es: 'Esta lectura interpreta símbolos y es orientativa: úsala como herramienta de reflexión. No sustituye asesoramiento profesional médico, psicológico, legal ni financiero.',
  en: 'This reading interprets symbols and is meant for reflection. It does not replace medical, psychological, legal or financial advice.',
  fr: 'Cette lecture interprète des symboles et sert à la réflexion. Elle ne remplace aucun avis médical, psychologique, juridique ou financier.',
}

function lastCard(cards: DrawnCard[]): DrawnCard {
  return cards[cards.length - 1]
}

function hiddenCard(cards: DrawnCard[]): DrawnCard {
  const hiddenLenses = new Set(['oculto', 'factor-oculto', 'origen-oculto', 'miedo'])
  return cards.find((d) => hiddenLenses.has(d.position.lens)) ?? cards[0]
}

function adviceCard(cards: DrawnCard[]): DrawnCard {
  return (
    cards.find((d) => d.position.lens === 'accion') ??
    cards.find((d) => d.position.lens === 'sintesis') ??
    lastCard(cards)
  )
}

export function localizeVisibleNarrative(
  narrative: ReadingNarrative,
  cards: DrawnCard[],
  language: Language,
): ReadingNarrative {
  if (language === 'es' || cards.length === 0) {
    return { ...narrative, advertencia: disclaimer.es }
  }

  const hidden = hiddenCard(cards).card
  const seal = lastCard(cards).card
  const guide = adviceCard(cards).card
  const hiddenLoc = localizedCardFields(hidden, language)
  const sealLoc = localizedCardFields(seal, language)
  const guideLoc = localizedCardFields(guide, language)

  if (language === 'en') {
    return {
      ...narrative,
      titulo: `What ${seal.name} says`,
      oculto: `What remains unspoken gathers around ${hidden.name}. ${hiddenLoc.andeanMessage}`,
      respuesta: `${seal.name} closes the spread. ${sealLoc.meaning}`,
      consejo: guideLoc.advice,
      advertencia: disclaimer.en,
    }
  }

  return {
    ...narrative,
    titulo: `Ce que dit ${seal.name}`,
    oculto: `Ce qui n’est pas dit se rassemble autour de ${hidden.name}. ${hiddenLoc.andeanMessage}`,
    respuesta: `${seal.name} ferme le tirage. ${sealLoc.meaning}`,
    consejo: guideLoc.advice,
    advertencia: disclaimer.fr,
  }
}
