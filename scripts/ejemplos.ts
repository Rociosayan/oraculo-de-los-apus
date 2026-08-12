/** Genera dos lecturas de ejemplo (amor de 7 cartas y reloj de 12)
 *  y las imprime con su conteo de palabras. Uso: npx tsx scripts/ejemplos.ts */
import { getSpreadById } from '../src/data/spreads'
import { getCardById } from '../src/data/cards'
import {
  contarPalabras,
  generarLectura,
  narrativaToText,
} from '../src/lib/interpretacion'
import type { DrawnCard } from '../src/types'

function tirada(spreadId: string, ids: number[], reversed: boolean[] = []): DrawnCard[] {
  const s = getSpreadById(spreadId)!
  return s.positions.map((position, i) => ({
    card: getCardById(ids[i])!,
    position,
    reversed: reversed[i] ?? false,
    revealed: true,
  }))
}

// Ejemplo 1: amor, 7 cartas
const amorSpread = getSpreadById('amor')!
const amorCards = tirada(
  'amor',
  [4, 2, 8, 12, 15, 7, 11],
  [false, false, false, false, true, false, false],
)
const amor = generarLectura(amorSpread, '¿Volveremos a estar juntos?', amorCards)

// Ejemplo 2: reloj de las sombras, 12 cartas (dos indicadoras: Supay y Uku Pacha)
const relojSpread = getSpreadById('reloj-sombras')!
const relojCards = tirada('reloj-sombras', [10, 15, 12, 5, 6, 1, 16, 0, 13, 14, 19, 21])
const reloj = generarLectura(
  relojSpread,
  '¿La mala racha que atravieso tiene un origen oculto?',
  relojCards,
)

const sep = '\n' + '='.repeat(72) + '\n'
console.log(sep + 'EJEMPLO 1 · AMOR Y RELACIONES (7 CARTAS)' + sep)
console.log(narrativaToText(amor))
console.log(
  `\n[Palabras: ${contarPalabras([...amor.relato, amor.oculto, amor.respuesta, amor.consejo].join(' '))}]`,
)
console.log(sep + 'EJEMPLO 2 · EL RELOJ DE LAS SOMBRAS (12 CARTAS)' + sep)
console.log(narrativaToText(reloj))
console.log(
  `\n[Palabras: ${contarPalabras([...reloj.relato, reloj.oculto, reloj.respuesta, reloj.consejo].join(' '))}]`,
)
