import type { ReadingResult } from '../types'
import { narrativaToText } from './interpretacion'

const STORAGE_KEY = 'oraculo-apus-diario-v2'

/** Persistencia local — lista para migrar a base de datos / usuario autenticado */
export function loadDiary(): ReadingResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ReadingResult[]
    if (!Array.isArray(parsed)) return []
    // Descarta lecturas guardadas con un formato anterior
    return parsed.filter((e) => e && Array.isArray(e.cards) && e.narrative)
  } catch {
    return []
  }
}

export function saveDiary(entries: ReadingResult[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function addDiaryEntry(entry: ReadingResult): ReadingResult[] {
  const current = loadDiary()
  const next = [entry, ...current].slice(0, 100)
  saveDiary(next)
  return next
}

export function removeDiaryEntry(id: string): ReadingResult[] {
  const next = loadDiary().filter((e) => e.id !== id)
  saveDiary(next)
  return next
}

export function formatReadingAsText(entry: ReadingResult): string {
  const date = new Date(entry.createdAt).toLocaleString('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
  let text = `ORÁCULO DE LOS APUS\n${'='.repeat(28)}\n\n`
  text += `Fecha: ${date}\n`
  text += `Tirada: ${entry.spreadTitle}\n\n`

  text += `${narrativaToText(entry.narrative)}\n\n`

  text += `CARTAS Y POSICIONES\n${'-'.repeat(28)}\n`
  entry.cards.forEach((d, i) => {
    const orient = d.reversed ? 'Invertida' : 'Al derecho'
    text += `\nCarta ${i + 1} — ${d.position.label}\n`
    text += `${d.card.name} (${d.card.symbol}) — ${orient}\n`
    text += `Mensaje andino: ${d.card.andeanMessage}\n`
  })
  text += '\n'

  return text
}

export async function shareReading(entry: ReadingResult): Promise<'shared' | 'copied' | 'downloaded'> {
  const text = formatReadingAsText(entry)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Oráculo de los Apus',
        text,
      })
      return 'shared'
    } catch {
      /* usuario canceló o no disponible */
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    downloadText(text, `lectura-apus-${entry.id}.txt`)
    return 'downloaded'
  }
}

export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
