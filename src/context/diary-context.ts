import { createContext } from 'react'
import type { ReadingResult } from '../types'

export interface DiaryContextValue {
  entries: ReadingResult[]
  saveReading: (entry: ReadingResult) => void
  deleteReading: (id: string) => void
  /** Reserva para autenticación futura */
  userId: string | null
}

export const DiaryContext = createContext<DiaryContextValue | null>(null)
