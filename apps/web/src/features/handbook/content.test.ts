import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PublicProjectSection from './components/PublicProjectSection.tsx'
import WorkflowsSection from './components/WorkflowsSection.tsx'
import { aboutContent } from './content/about.ts'
import { faqContent } from './content/faq.ts'
import { howItWorksContent } from './content/how-it-works.ts'
import { journeyContent } from './content/journey.ts'
import { publicProjectContent } from './content/public-project.ts'
import { readinessContent } from './content/readiness.ts'
import { shellContent } from './content/shell.ts'
import { technicalGuideContent } from './content/technical-guide.ts'
import { workflowsContent } from './content/workflows.ts'
import { renderPrompt } from './prompt.ts'

describe('project-creation prompt', () => {
  it('starts from a newly cloned OmegaForge repository before invoking Forge skills', () => {
    const createPrompt = workflowsContent.fa.prompts.find((prompt) => prompt.id === 'create')

    expect(createPrompt?.prompt).toContain('https://github.com/omega-do-it-solutions/OmegaForge')
    expect(createPrompt?.prompt).toContain('مسیر نهایی')
    expect(createPrompt?.prompt).toContain('VS Code')
    expect(createPrompt?.prompt).toContain('product-details')
    expect(createPrompt?.prompt).toContain('bootstrap-project')
  })

  it('prepares the copied prompt from the project name and target path fields', () => {
    const createPrompt = workflowsContent.fa.prompts.find((prompt) => prompt.id === 'create')

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

  it('provides an equivalent English workflow and prepares its project details', () => {
    const createPrompt = workflowsContent.en.prompts.find((prompt) => prompt.id === 'create')

    expect(createPrompt?.prompt).toContain('product-details')
    expect(createPrompt?.prompt).toContain('bootstrap-project')
    expect(createPrompt?.prompt).toContain('wait for my approval')

    const preparedPrompt = renderPrompt(createPrompt!, {
      projectName: 'sales-dashboard',
      parentPath: '/Projects',
    })

    expect(preparedPrompt).toContain('Project name: sales-dashboard')
    expect(preparedPrompt).toContain('Project parent path: /Projects')
    expect(preparedPrompt).toContain('final path /Projects/sales-dashboard')
    expect(preparedPrompt).not.toContain('[new project name]')
    expect(preparedPrompt).not.toContain('[preferred location on my computer]')
  })
})

describe('localized handbook content', () => {
  it('offers complete Persian and English navigation, usage, and origin content', () => {
    for (const language of ['fa', 'en'] as const) {
      expect(shellContent[language].navigation.items.map((item) => item.href)).toEqual([
        '#start',
        '#workflows',
        '#how-it-works',
        '#about',
        '#faq',
      ])
      expect(readinessContent[language].items).toHaveLength(4)
      expect(howItWorksContent[language].steps).toHaveLength(3)
      expect(journeyContent[language].items).toHaveLength(4)
      expect(aboutContent[language].points).toHaveLength(3)
      expect(faqContent[language].items).toHaveLength(5)
      expect(publicProjectContent[language].privacy.description).toMatch(/ذخیره|store/)
      expect(publicProjectContent[language].freshness.manualVersion).toContain('v0.1.0')
      expect(publicProjectContent[language].freshness.forgeVersion).toContain('v0.5.0')
      expect(workflowsContent[language].prompts.map((prompt) => prompt.id)).toEqual([
        'create',
        'update',
        'maintain',
      ])
      expect(technicalGuideContent[language].traits).toHaveLength(3)
      expect(technicalGuideContent[language].flowItems).toHaveLength(4)
      expect(technicalGuideContent[language].contextSources).toHaveLength(4)
      expect(technicalGuideContent[language].controlItems).toHaveLength(3)
    }
  })

  it('presents a bilingual handbook without restricting the assistant conversation language', () => {
    expect(howItWorksContent.fa.title).toContain('زبان شما')
    expect(howItWorksContent.fa.description).toContain('محدودیت زبانی ندارد')
    expect(howItWorksContent.en.title).toContain('your language')
    expect(howItWorksContent.en.description).toContain('no language restriction')

    for (const prompt of workflowsContent.fa.prompts) {
      expect(prompt.prompt).toContain('همان زبانی که در گفتگو استفاده می‌کنم')
      expect(prompt.prompt).not.toContain('به فارسی')
      expect(prompt.prompt).not.toContain('من فنی نیستم')
    }

    for (const prompt of workflowsContent.en.prompts) {
      expect(prompt.prompt).toContain('same language I use in our conversation')
      expect(prompt.prompt).not.toMatch(/in English|plain English/)
      expect(prompt.prompt).not.toContain('I am not technical')
    }
  })

  it('offers an accessible guided and technical tab pair', () => {
    const markup = renderToStaticMarkup(createElement(WorkflowsSection, { language: 'en' }))

    expect(markup).toContain('role="tablist"')
    expect(markup.match(/role="tab"/g)).toHaveLength(2)
    expect(markup).toContain('aria-selected="true"')
    expect(markup).toContain('id="workflow-panel-guided"')
    expect(markup).toContain('id="workflow-panel-technical"')
  })

  it('keeps the manual release separate from its aligned Forge version', () => {
    const markup = renderToStaticMarkup(createElement(PublicProjectSection, { language: 'en' }))

    expect(markup).toContain('OmegaForge Manual v0.1.0')
    expect(markup).toContain('Aligned with OmegaForge v0.5.0')
    expect(markup).toContain('/blob/manual/apps/web/CHANGELOG.md')
    expect(markup).not.toContain('/blob/main/CHANGELOG.md')
  })
})
