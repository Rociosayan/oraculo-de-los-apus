import { useState } from 'react'
import type { DrawnCard, MaestraNarrative, MaestraReadingStatus, ReadingResult } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { useCopy } from '../../content/translations'
import {
  buildPriorContext,
  MaestraRequestError,
  requestMaestraReading,
  toMaestraRequest,
} from '../../lib/maestra/requestMaestraReading'
import { Button } from '../ui/Button'
import { MaestraNarrativePanel } from './MaestraNarrativePanel'

interface MaestraReadingSectionProps {
  question: string
  spreadType: string
  drawn: DrawnCard[]
  diaryEntries: ReadingResult[]
}

export function MaestraReadingSection({
  question,
  spreadType,
  drawn,
  diaryEntries,
}: MaestraReadingSectionProps) {
  const { language } = useLanguage()
  const t = useCopy(language)
  const [status, setStatus] = useState<MaestraReadingStatus>('idle')
  const [narrative, setNarrative] = useState<MaestraNarrative | null>(null)
  const [error, setError] = useState<string | null>(null)

  function messageFor(error: unknown): string {
    if (error instanceof MaestraRequestError) {
      if (error.code === 'NO_API_KEY') return t.maestraNoKey
      if (error.code === 'DAILY_LIMIT') return t.maestraLimit
    }
    return t.maestraError
  }

  async function requestReading() {
    setStatus('loading')
    setError(null)
    try {
      const payload = toMaestraRequest(
        question,
        spreadType,
        drawn,
        language,
        buildPriorContext(diaryEntries),
      )
      const result = await requestMaestraReading(payload)
      setNarrative(result)
      setStatus('success')
    } catch (err) {
      setError(messageFor(err))
      setStatus('error')
    }
  }

  return (
    <div className="mt-10">
      {status === 'idle' && (
        <div className="text-center">
          <Button variant="gold" onClick={() => void requestReading()}>
            {t.maestraCta}
          </Button>
        </div>
      )}

      {status === 'loading' && (
        <p className="text-center text-sm text-gold-soft" role="status" aria-live="polite">
          {t.maestraLoading}
        </p>
      )}

      {status === 'error' && (
        <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-night/40 p-4 text-center">
          <p className="text-sm leading-relaxed text-mist/85">{error}</p>
          <div className="mt-4">
            <Button variant="gold" onClick={() => void requestReading()}>
              {t.retry}
            </Button>
          </div>
        </div>
      )}

      {status === 'success' && narrative && <MaestraNarrativePanel narrative={narrative} />}
    </div>
  )
}
