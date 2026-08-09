import { useLayoutEffect, useState } from 'react'
import { HandbookPage } from '../features/handbook/HandbookPage.tsx'
import { shellContent } from '../features/handbook/content/shell.ts'
import type { Language } from '../features/handbook/types.ts'
import {
  getBrowserPreferenceStorage,
  readLanguagePreference,
  readThemePreference,
  saveLanguagePreference,
  saveThemePreference,
} from './preferences.ts'

function prefersDarkTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialTheme() {
  const storedTheme = readThemePreference(getBrowserPreferenceStorage())

  return storedTheme ? storedTheme === 'dark' : prefersDarkTheme()
}

function getInitialLanguage(): Language {
  return readLanguagePreference(getBrowserPreferenceStorage()) ?? 'fa'
}

export function App() {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isDark
      ? 'omega-forge-handbook-dark'
      : 'omega-forge-handbook'
    saveThemePreference(getBrowserPreferenceStorage(), isDark ? 'dark' : 'light')
  }, [isDark])

  useLayoutEffect(() => {
    const content = shellContent[language]

    document.documentElement.lang = language
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
    document.title = content.metadata.title
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', content.metadata.description)
    saveLanguagePreference(getBrowserPreferenceStorage(), language)
  }, [language])

  return (
    <HandbookPage
      isDark={isDark}
      language={language}
      onChangeLanguage={setLanguage}
      onToggleTheme={() => setIsDark((value) => !value)}
    />
  )
}
