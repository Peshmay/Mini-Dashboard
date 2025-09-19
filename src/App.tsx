import React from 'react'
import { QuoteCard } from './features/quote/QuoteCard'
import { PokemonCard } from './features/pokemon/PokemonCard'
import { TaskSection } from './features/tasks/TaskSection'
import { ThemeToggle } from './components/ThemeToggle'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950 text-gray-900 dark:text-gray-100">
      <header className="max-w-5xl mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Personal / Task Manager Dashboard</h1>
        <div className="flex items-center gap-2">
         
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-12 grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <QuoteCard />
          <PokemonCard />
        </div>
        <TaskSection />
      </main>

      <footer className="max-w-5xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Built with ♥ using async/await, functional utilities, and careful error handling. Data persisted locally.
      </footer>
    </div>
  )
}
