import { useState, type FormEvent } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const labels = {
  es: { title: 'Pregunta por nuestros servicios', intro: 'Consulta el precio de una lectura, qué incluye o cómo reservar.', placeholder: '¿Cuánto cuesta una lectura?', send: 'Preguntar', loading: 'Consultando…', error: 'No pudimos responder ahora. Escríbenos por WhatsApp.', info: 'Información automática', ai: 'Respuesta de la IA' },
  en: { title: 'Ask about our services', intro: 'Ask about reading prices, what is included or how to book.', placeholder: 'How much is a reading?', send: 'Ask', loading: 'Checking…', error: 'We could not answer now. Please contact us on WhatsApp.', info: 'Automatic information', ai: 'AI answer' },
  fr: { title: 'Questions sur nos services', intro: 'Demandez le prix, le contenu ou comment réserver.', placeholder: 'Combien coûte un tirage ?', send: 'Demander', loading: 'Recherche…', error: 'Impossible de répondre actuellement. Contactez-nous sur WhatsApp.', info: 'Information automatique', ai: 'Réponse de l’IA' },
}

export function ServicesAssistant() {
  const { language } = useLanguage()
  const t = labels[language]
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [mode, setMode] = useState<'ai' | 'information'>('information')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!question.trim() || loading) return
    setLoading(true)
    setAnswer('')
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim(), language }),
      })
      if (!response.ok) throw new Error('SERVICE_UNAVAILABLE')
      const data: { answer: string; mode: 'ai' | 'information' } = await response.json()
      setAnswer(data.answer)
      setMode(data.mode)
    } catch {
      setAnswer(t.error)
      setMode('information')
    } finally {
      setLoading(false)
    }
  }

  return <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-soft/25 bg-indigo-night/80 p-6 shadow-xl sm:p-9">
    <h2 className="font-display text-3xl text-ivory">{t.title}</h2>
    <p className="mt-2 text-sm text-mist/75">{t.intro}</p>
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label htmlFor="services-question" className="sr-only">{t.title}</label>
      <input id="services-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={500} placeholder={t.placeholder} className="min-w-0 flex-1 rounded-full border border-white/20 bg-night px-5 py-3 text-ivory outline-none focus:border-cyan-soft" />
      <button type="submit" disabled={loading || !question.trim()} className="rounded-full bg-cyan-soft px-6 py-3 font-semibold text-night transition hover:brightness-110 disabled:opacity-50">{loading ? t.loading : t.send}</button>
    </form>
    {answer && <div className="mt-5 rounded-2xl border border-gold/25 bg-night/70 p-5" role="status"><p className="mb-2 text-xs uppercase tracking-widest text-gold-soft">{mode === 'ai' ? t.ai : t.info}</p><p className="whitespace-pre-wrap text-sm leading-7 text-mist">{answer}</p></div>}
  </div>
}
