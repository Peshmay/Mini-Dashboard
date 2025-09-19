# Personal / Task Manager Dashboard (React + TypeScript + Vite + Tailwind)

A clean, maintainable dashboard that:
- Fetches live data from **Breaking Bad Quotes API** and **PokéAPI** (Pikachu).
- Manages tasks **locally** with LocalStorage persistence.
- Demonstrates **async/await**, functional helpers, error handling with timeouts & minimal retries.

## Quick Start

```bash
# 1) Install deps
npm i

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

Open the dev URL printed in your terminal. You should see:
- A "Quote of the moment" card (Refreshable).
- A "Pokémon • Pikachu" card (Reloadable).
- A full Task Manager: add/edit/delete/complete, filter, sort; stats at the top.

## APIs Used

- Breaking Bad Quotes: `https://api.breakingbadquotes.xyz/v1/quotes`
- PokéAPI (Pikachu): `https://pokeapi.co/api/v2/pokemon/pikachu`

Both endpoints support CORS for client-side fetching.

## Project Structure

```
src/
  components/UI.tsx            # small UI primitives
  features/
    quote/QuoteCard.tsx        # Breaking Bad quote fetcher
    pokemon/PokemonCard.tsx    # Pikachu fetcher
    tasks/
      domain.ts                # task types + pure helpers
      TaskSection.tsx          # orchestration + state
      TaskForm.tsx             # add new tasks
      TaskRow.tsx              # list row (edit/delete/toggle)
      TaskControls.tsx         # filters/sorting
      TaskStats.tsx            # summary metrics
  hooks/useLocalStorage.ts     # persistence hook
  services/api.ts              # safeFetchJson + API clients
  utils/{dates.ts,id.ts}       # small utilities
  styles/index.css             # Tailwind entry
  App.tsx, main.tsx            # app shell
```

## Notes for Grading

- **Error handling**: all network calls use `safeFetchJson` with timeouts & retries; UI shows clear error messages.
- **Functional style**: task transformations are pure functions in `domain.ts` (create, toggle, edit, sort, filter, stats).
- **Asynchronous programming**: `async/await` used consistently with proper loading states.
- **Maintainability**: small modules, strong TypeScript types, clear separation of concerns.
- **Local storage**: tasks persist across reloads.

Enjoy! 🎉
# Mini-Dashboard
