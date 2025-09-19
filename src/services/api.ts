// src/services/api.ts
// Core fetch helpers + API clients (with cache-busting + flexible Pokémon fetch)

export type Result<T> = { ok: true; data: T } | { ok: false; error: string }

export const withTimeout = async <T,>(p: Promise<T>, ms = 8000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
    p.then(v => { clearTimeout(t); resolve(v); }, e => { clearTimeout(t); reject(e); });
  });
};

// UPDATED: add cache-buster + `cache: 'no-store'` so reloads are real network requests
export async function safeFetchJson<T>(url: string, opts?: RequestInit & { retries?: number }): Promise<Result<T>> {
  const { retries = 1, ...init } = opts || {};
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const bust = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;
      const res = await withTimeout(
        fetch(bust, {
          cache: 'no-store',
          ...init,
          headers: { 'Accept': 'application/json', ...(init?.headers || {}) },
        }),
        10000
      );
      if (!res.ok) return { ok: false, error: `HTTP ${res.status} ${res.statusText}` };
      const data = await res.json() as T;
      return { ok: true, data };
    } catch (e: any) {
      if (attempt === retries) return { ok: false, error: e?.message || 'Network error' };
      await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  return { ok: false, error: 'Unknown error' };
}

// ===== Types from external APIs =====
export type ApiQuote = { quote: string; author: string };

export type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { slot: number; type: { name: string } }[];
  abilities: { is_hidden: boolean; ability: { name: string } }[];
  height: number;
  weight: number;
};

// ===== APIs =====
export const QuoteAPI = {
  async getOne() {
    const r = await safeFetchJson<ApiQuote[]>(`https://api.breakingbadquotes.xyz/v1/quotes`, { retries: 1 });
    if (!r.ok) return r as Result<ApiQuote>;
    const first = r.data[0];
    if (!first) return { ok: false, error: 'Empty quote response' };
    return { ok: true, data: first };
  }
};

// UPDATED: flexible Pokémon client + random; keep getPikachu for backward compatibility
export const PokemonAPI = {
  async get(nameOrId: string | number) {
    return safeFetchJson<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`, { retries: 1 });
  },
  async getRandom() {
    // Gen1–8 range. Increase if you want newer gens.
    const id = Math.floor(Math.random() * 898) + 1;
    return this.get(id);
  },
  // Optional: keep this so existing components don’t break
  async getPikachu() {
    return this.get('pikachu');
  }
};
