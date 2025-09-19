import React from 'react'
import { Button } from './UI'
import { useTheme } from '../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme()

  return (
    <Button onClick={toggle} className="bg-white/70 dark:bg-slate-900/60 border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </Button>
  )
}
