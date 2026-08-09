import { howItWorksContent } from '../content/how-it-works.ts'
import type { Language } from '../types.ts'

type HowItWorksSectionProps = {
  language: Language
}

export default function HowItWorksSection({ language }: HowItWorksSectionProps) {
  const content = howItWorksContent[language]

  return (
    <section id="how-it-works" className="mt-24 scroll-mt-28 sm:mt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="max-w-xl space-y-4 lg:sticky lg:top-32">
          <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
          <p className="leading-8 text-base-content/70">{content.description}</p>
        </div>

        <ol className="space-y-3">
          {content.steps.map((step) => (
            <li
              key={step.number}
              className="glass-panel-subtle flex items-start gap-5 rounded-box p-5 sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-box bg-primary/15 text-xl font-black text-primary">
                {step.number}
              </span>
              <div>
                <h3 className="font-bold text-base-content">{step.title}</h3>
                <p className="mt-2 leading-7 text-base-content/65">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
