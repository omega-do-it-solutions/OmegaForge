import type { Language } from '../features/handbook/types.ts'

export type ThemePreference = 'light' | 'dark'

export type PreferenceStorage = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export const preferenceKeys = {
  language: 'omega-forge.handbook.language',
  theme: 'omega-forge.handbook.theme',
} as const

export function getBrowserPreferenceStorage(): PreferenceStorage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readLanguagePreference(storage: PreferenceStorage | null): Language | null {
  try {
    const language = storage?.getItem(preferenceKeys.language)

    return language === 'fa' || language === 'en' ? language : null
  } catch {
    return null
  }
}

export function readThemePreference(storage: PreferenceStorage | null): ThemePreference | null {
  try {
    const theme = storage?.getItem(preferenceKeys.theme)

    return theme === 'light' || theme === 'dark' ? theme : null
  } catch {
    return null
  }
}

export function saveLanguagePreference(
  storage: PreferenceStorage | null,
  language: Language,
): void {
  try {
    storage?.setItem(preferenceKeys.language, language)
  } catch {
    // The current selection still works when browser storage is unavailable.
  }
}

export function saveThemePreference(
  storage: PreferenceStorage | null,
  theme: ThemePreference,
): void {
  try {
    storage?.setItem(preferenceKeys.theme, theme)
  } catch {
    // The current selection still works when browser storage is unavailable.
  }
}
