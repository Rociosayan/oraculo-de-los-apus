import { useContext } from 'react'
import { DiaryContext } from '../context/diary-context'

export function useDiary() {
  const ctx = useContext(DiaryContext)
  if (!ctx) throw new Error('useDiary debe usarse dentro de DiaryProvider')
  return ctx
}
