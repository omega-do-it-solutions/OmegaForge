import { CheckCircle } from '@phosphor-icons/react'
import { readinessContent } from '../content/readiness.ts'
import type { Language } from '../types.ts'

type ReadinessSectionProps = {
  language: Language
}

export default function ReadinessSection({ language }: ReadinessSectionProps) {
  const content = readinessContent[language]

  return (
    <section
      id="getting-ready"
      className="glass-panel mt-24 scroll-mt-28 rounded-box p-6 sm:mt-32 sm:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <div className="max-w-xl space-y-3">
          <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
          <p className="leading-8 text-base-content/70">{content.description}</p>
        </div>

        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {content.items.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <CheckCircle className="mt-1 shrink-0 text-primary" size={22} weight="fill" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-7 text-base-content/65">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
