import type { Language } from '../context/LanguageContext'
import { copy } from '../content/translations'
import { localizedCardFields } from '../content/cardCopy'
import type { ReadingResult } from '../types'
import { narrativaToText } from './interpretacion'

const STORAGE_KEY = 'oraculo-apus-diario-v2'

const localeTag: Record<Language, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
}

const fileHead: Record<Language, { date: string; spread: string; cards: string; card: string; andean: string }> = {
  es: { date: 'Fecha', spread: 'Tirada', cards: 'CARTAS Y POSICIONES', card: 'Carta', andean: 'Mensaje andino' },
  en: { date: 'Date', spread: 'Spread', cards: 'CARDS AND POSITIONS', card: 'Card', andean: 'Andean message' },
  fr: { date: 'Date', spread: 'Tirage', cards: 'CARTES ET POSITIONS', card: 'Carte', andean: 'Message andin' },
}

/** Persistencia local — lista para migrar a base de datos / usuario autenticado */
export function loadDiary(): ReadingResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ReadingResult[]
    if (!Array.isArray(parsed)) return []
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

export function formatReadingAsText(entry: ReadingResult, language: Language = 'es'): string {
  const t = copy[language]
  const head = fileHead[language]
  const date = new Date(entry.createdAt).toLocaleString(localeTag[language], {
    dateStyle: 'long',
    timeStyle: 'short',
  })
  let text = `${t.heroTitle.toUpperCase()}\n${'='.repeat(28)}\n\n`
  text += `${head.date}: ${date}\n`
  text += `${head.spread}: ${entry.spreadTitle}\n\n`

  text += `${narrativaToText(entry.narrative, {
    question: language === 'en' ? 'Question' : language === 'fr' ? 'Question' : 'Pregunta',
    hidden: t.hidden,
    answer: t.clearAnswer,
    advice: t.advice,
  })}\n\n`

  text += `${head.cards}\n${'-'.repeat(28)}\n`
  entry.cards.forEach((d, i) => {
    const loc = localizedCardFields(d.card, language)
    const orient = d.reversed ? t.reversed : t.upright
    text += `\n${head.card} ${i + 1} — ${d.position.label}\n`
    text += `${d.card.name} (${d.card.symbol}) — ${orient}\n`
    text += `${head.andean}: ${loc.andeanMessage}\n`
  })
  text += '\n'

  return text
}

export async function shareReading(
  entry: ReadingResult,
  language: Language = 'es',
): Promise<'shared' | 'copied' | 'downloaded'> {
  const text = formatReadingAsText(entry, language)
  const t = copy[language]
  if (navigator.share) {
    try {
      await navigator.share({
        title: t.heroTitle,
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
