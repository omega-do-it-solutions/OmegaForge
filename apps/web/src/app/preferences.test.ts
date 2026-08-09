import { describe, expect, it } from 'vitest'
import {
  preferenceKeys,
  readLanguagePreference,
  readThemePreference,
  saveLanguagePreference,
  saveThemePreference,
  type PreferenceStorage,
} from './preferences.ts'

function createStorage(initialValues: Record<string, string> = {}) {
  const values = new Map(Object.entries(initialValues))
  const storage: PreferenceStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }

  return { storage, values }
}

describe('handbook preferences', () => {
  it('restores and saves the selected language and theme', () => {
    const { storage, values } = createStorage({
      [preferenceKeys.language]: 'en',
      [preferenceKeys.theme]: 'light',
    })

    expect(readLanguagePreference(storage)).toBe('en')
    expect(readThemePreference(storage)).toBe('light')

    saveLanguagePreference(storage, 'fa')
    saveThemePreference(storage, 'dark')

    expect(values.get(preferenceKeys.language)).toBe('fa')
    expect(values.get(preferenceKeys.theme)).toBe('dark')
  })

  it('ignores invalid or unavailable stored preferences', () => {
    const invalidStorage = createStorage({
      [preferenceKeys.language]: 'de',
      [preferenceKeys.theme]: 'system',
    }).storage
    const unavailableStorage: PreferenceStorage = {
      getItem: () => {
        throw new Error('Storage unavailable')
      },
      setItem: () => {
        throw new Error('Storage unavailable')
      },
    }

    expect(readLanguagePreference(invalidStorage)).toBeNull()
    expect(readThemePreference(invalidStorage)).toBeNull()
    expect(readLanguagePreference(unavailableStorage)).toBeNull()
    expect(readThemePreference(unavailableStorage)).toBeNull()
    expect(() => saveLanguagePreference(unavailableStorage, 'en')).not.toThrow()
    expect(() => saveThemePreference(unavailableStorage, 'light')).not.toThrow()
  })
})
