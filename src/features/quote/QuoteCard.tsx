import React from 'react'
import { Section, Button } from '../../components/UI'
import { QuoteAPI } from '../../services/api'

export const QuoteCard: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [quote, setQuote] = React.useState<{ quote: string; author: string } | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true); setError(null)
    const r = await QuoteAPI.getOne()
    if (!('ok' in r) || !r.ok) setError((r as any).error)
    else setQuote(r.data)
    setLoading(false)
  }, [])

  React.useEffect(() => { load() }, [load])

  return (
    <Section title="Quote of the moment" right={<Button onClick={load} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</Button>}>
      {error && (
        <div className="p-3 rounded-xl bg-red-50/80 dark:bg-red-900/40 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-800 mb-2">
          Failed to load quote: {error}
        </div>
      )}
      {quote ? (
        <figure className="space-y-2 animate-fade">
          <blockquote className="text-lg md:text-xl">“{quote.quote}”</blockquote>
          <figcaption className="text-sm text-gray-600 dark:text-gray-300">— {quote.author}</figcaption>
        </figure>
      ) : !loading && !error ? (
        <p className="text-gray-500 dark:text-gray-400">No quote yet. Try refresh.</p>
      ) : null}
    </Section>
  )
}
