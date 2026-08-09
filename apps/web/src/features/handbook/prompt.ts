import type { HandbookPrompt, PromptValues } from './types.ts'

export function renderPrompt(prompt: HandbookPrompt, values: PromptValues): string {
  return (prompt.fields ?? []).reduce((preparedPrompt, field) => {
    const value = values[field.id]?.trim()

    return value
      ? preparedPrompt.replaceAll(field.promptPlaceholder, value)
      : preparedPrompt
  }, prompt.prompt)
}
