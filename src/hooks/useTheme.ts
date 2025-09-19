import React from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ptm.theme'

export function useTheme() {
  const getInitial = (): Theme => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  const [theme, setTheme] = React.useState<Theme>(getInitial)

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const toggle = React.useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, setTheme, toggle }
}
