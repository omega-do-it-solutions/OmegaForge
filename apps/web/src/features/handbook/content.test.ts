import { describe, expect, it } from 'vitest'
import { handbookPrompts, renderPrompt } from './content.ts'

describe('project-creation prompt', () => {
  it('starts from a newly cloned OmegaForge repository before invoking Forge skills', () => {
    const createPrompt = handbookPrompts.find((prompt) => prompt.id === 'create')

    expect(createPrompt?.prompt).toContain('https://github.com/omega-do-it-solutions/OmegaForge')
    expect(createPrompt?.prompt).toContain('مسیر نهایی')
    expect(createPrompt?.prompt).toContain('VS Code')
    expect(createPrompt?.prompt).toContain('product-details')
    expect(createPrompt?.prompt).toContain('bootstrap-project')
  })

  it('prepares the copied prompt from the project name and target path fields', () => {
    const createPrompt = handbookPrompts.find((prompt) => prompt.id === 'create')

    expect(createPrompt?.fields?.map((field) => field.id)).toEqual(['projectName', 'parentPath'])

    const preparedPrompt = renderPrompt(createPrompt!, {
      projectName: 'sales-dashboard',
      parentPath: '/Projects',
    })

    expect(preparedPrompt).toContain('نام پروژه: sales-dashboard')
    expect(preparedPrompt).toContain('مسیر والد پروژه: /Projects')
    expect(preparedPrompt).toContain('مسیر نهایی /Projects/sales-dashboard')
    expect(preparedPrompt).not.toContain('[نام جدید پروژه]')
    expect(preparedPrompt).not.toContain('[مسیر دلخواه روی کامپیوتر من]')
  })
})
