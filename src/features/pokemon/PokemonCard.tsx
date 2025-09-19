// src/features/pokemon/PokemonCard.tsx
import React from 'react'
import { Section, Button, Badge, TextInput } from '../../components/UI'
import { PokemonAPI, type Pokemon } from '../../services/api'

export const PokemonCard: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pkm, setPkm] = React.useState<Pokemon | null>(null)
  const [query, setQuery] = React.useState('pikachu')
  const [updatedAt, setUpdatedAt] = React.useState<string | null>(null)

  const load = React.useCallback(async (target?: string) => {
    setLoading(true); setError(null)
    const who = (target ?? query).trim().toLowerCase()
    const r = await PokemonAPI.get(who)
    if (!r.ok) {
      setError(r.error)
    } else {
      setPkm(r.data)
      setUpdatedAt(new Date().toLocaleTimeString())
    }
    setLoading(false)
  }, [query])

  React.useEffect(() => { load('pikachu') }, [load])

  return (
    <Section
      title="Pokémon"
      right={
        <div className="flex items-center gap-2">
          <TextInput
            placeholder="Name or ID (e.g., bulbasaur or 1)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-44"
          />
          <Button onClick={() => load()} disabled={loading}>
            {loading ? 'Loading…' : 'Load'}
          </Button>
            <Button
              onClick={async () => { await load(String(Math.floor(Math.random() * 898) + 1)) }}
              disabled={loading}
            >
              Random
            </Button>
        </div>
      }
    >
      {updatedAt && (
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">Updated {updatedAt}</div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50/80 dark:bg-red-900/40 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-800 mb-3">
          Couldn’t load Pokémon: {error}
        </div>
      )}

      {pkm ? (
        <div className="flex items-start gap-4 animate-fade">
          {pkm.sprites?.front_default && (
            <img
              src={pkm.sprites.front_default}
              alt={pkm.name}
              className="w-20 h-20 object-contain drop-shadow"
            />
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold capitalize">{pkm.name}</h3>
              <Badge tone="yellow">ID #{pkm.id}</Badge>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 flex gap-3 flex-wrap">
              <span>Types:</span>
              {pkm.types?.map(t => (
                <Badge key={t.type.name} tone="blue">{t.type.name}</Badge>
              ))}
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 flex gap-3 flex-wrap">
              <span>Abilities:</span>
              {pkm.abilities?.slice(0, 3).map(a => (
                <Badge key={a.ability.name} tone={a.is_hidden ? 'gray' : 'green'}>
                  {a.ability.name}{a.is_hidden ? ' (hidden)' : ''}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Height: {pkm.height / 10} m • Weight: {pkm.weight / 10} kg
            </div>
          </div>
        </div>
      ) : !loading && !error ? (
        <p className="text-gray-500 dark:text-gray-400">No data yet. Try Load or Random.</p>
      ) : null}
    </Section>
  )
}
