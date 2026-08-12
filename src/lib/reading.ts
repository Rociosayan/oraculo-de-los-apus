import type { AndeanCard, DrawnCard, SpreadDefinition } from '../types'
import { ANDEAN_CARDS } from '../data/cards'

export function shuffleDeck<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Extrae exactamente `spread.cardCount` cartas sin repetir,
 *  en el orden de las posiciones de la tirada. */
export function drawReading(
  spread: SpreadDefinition,
  deck: AndeanCard[] = ANDEAN_CARDS,
): DrawnCard[] {
  const shuffled = shuffleDeck(deck)
  return spread.positions.map((position, index) => ({
    card: shuffled[index],
    position,
    reversed: Math.random() < 0.42,
    revealed: false,
  }))
}

export function createReadingId(): string {
  return `lectura-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
