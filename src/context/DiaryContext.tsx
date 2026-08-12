import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { ReadingResult } from '../types'
import { addDiaryEntry, loadDiary, removeDiaryEntry } from '../lib/diary'
import { DiaryContext } from './diary-context'

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ReadingResult[]>(() => loadDiary())
  /** null = anónimo; listo para conectar con un AuthProvider */
  const userId = null

  const saveReading = useCallback((entry: ReadingResult) => {
    setEntries(addDiaryEntry({ ...entry, userId }))
  }, [])

  const deleteReading = useCallback((id: string) => {
    setEntries(removeDiaryEntry(id))
  }, [])

  const value = useMemo(
    () => ({ entries, saveReading, deleteReading, userId }),
    [entries, saveReading, deleteReading],
  )

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>
}
