export type Language = 'fa' | 'en'

export type Localized<T> = Record<Language, T>

export type SectionHeading = {
  eyebrow: string
  title: string
  description: string
}

export type SectionPoint = {
  title: string
  description: string
}

export type PromptField = {
  id: string
  label: string
  placeholder: string
  promptPlaceholder: string
  direction?: 'auto' | 'ltr'
}

export type PromptValues = Record<string, string>

export type HandbookPrompt = {
  id: 'create' | 'update' | 'maintain'
  label: string
  title: string
  description: string
  skills: string
  prompt: string
  fields?: PromptField[]
}

export type PromptCardContent = {
  fieldsLegend: string
  fieldsTitle: string
  fieldsDescription: string
  skillsLabel: string
  copy: string
  copied: string
  missingFields: (labels: string[]) => string
  copyFailed: string
}
