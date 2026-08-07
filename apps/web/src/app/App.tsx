import { useEffect, useState } from 'react'
import { HandbookPage } from '../features/handbook/HandbookPage.tsx'

function prefersDarkTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function App() {
  const [isDark, setIsDark] = useState(prefersDarkTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = isDark
      ? 'omega-forge-handbook-dark'
      : 'omega-forge-handbook'
  }, [isDark])

  return <HandbookPage isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />
}
