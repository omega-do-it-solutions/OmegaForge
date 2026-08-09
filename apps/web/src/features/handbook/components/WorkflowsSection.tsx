import { ArrowDown, Sparkle, Wrench } from '@phosphor-icons/react'
import { lazy, Suspense, useRef, useState, type KeyboardEvent } from 'react'
import { workflowsContent } from '../content/workflows.ts'
import type { Language } from '../types.ts'
import { PromptCard } from './PromptCard.tsx'

type WorkflowsSectionProps = {
  language: Language
}

const workflowIcons = [
  <Sparkle key="create" size={26} weight="fill" />,
  <ArrowDown key="update" size={26} weight="bold" />,
  <Wrench key="maintain" size={26} weight="bold" />,
]

const TechnicalGuide = lazy(() => import('./TechnicalGuide.tsx'))

type WorkflowView = 'guided' | 'technical'

export default function WorkflowsSection({ language }: WorkflowsSectionProps) {
  const content = workflowsContent[language]
  const [activeView, setActiveView] = useState<WorkflowView>('guided')
  const [hasOpenedTechnical, setHasOpenedTechnical] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tabs = [
    { id: 'guided' as const, label: content.tabs.guided },
    { id: 'technical' as const, label: content.tabs.technical },
  ]

  function selectView(view: WorkflowView) {
    setActiveView(view)
    if (view === 'technical') setHasOpenedTechnical(true)
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1
    if (nextIndex === undefined) return

    event.preventDefault()
    selectView(tabs[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section id="workflows" className="scroll-mt-28 pt-24 sm:pt-32">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
        </div>
        <p className="max-w-sm leading-7 text-base-content/65">{content.description}</p>
      </div>

      <div className="tabs tabs-box w-full sm:w-fit" role="tablist" aria-label={content.tabs.ariaLabel}>
        {tabs.map((tab, index) => {
          const isActive = activeView === tab.id

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              id={`workflow-tab-${tab.id}`}
              type="button"
              role="tab"
              className={`tab flex-1 gap-2 sm:flex-none ${isActive ? 'tab-active' : ''}`}
              aria-selected={isActive}
              aria-controls={`workflow-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectView(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        id="workflow-panel-guided"
        role="tabpanel"
        aria-labelledby="workflow-tab-guided"
        className="mt-3 space-y-5"
        hidden={activeView !== 'guided'}
      >
        {content.prompts.map((prompt, index) => (
          <PromptCard
            key={`${language}-${prompt.id}`}
            icon={workflowIcons[index]}
            prompt={prompt}
            ui={content.promptCard}
          />
        ))}
      </div>

      <div
        id="workflow-panel-technical"
        role="tabpanel"
        aria-labelledby="workflow-tab-technical"
        className="mt-3"
        hidden={activeView !== 'technical'}
      >
        {hasOpenedTechnical && (
          <Suspense
            fallback={(
              <div
                aria-hidden="true"
                className="min-h-96 animate-pulse rounded-box bg-base-200/40"
              />
            )}
          >
            <TechnicalGuide language={language} />
          </Suspense>
        )}
      </div>
    </section>
  )
}
