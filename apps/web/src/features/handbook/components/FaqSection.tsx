import { faqContent } from '../content/faq.ts'
import type { Language } from '../types.ts'

type FaqSectionProps = {
  language: Language
}

export default function FaqSection({ language }: FaqSectionProps) {
  const content = faqContent[language]

  return (
    <section id="faq" className="mt-24 scroll-mt-28 sm:mt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="max-w-xl space-y-3 lg:sticky lg:top-32">
          <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
          <p className="leading-8 text-base-content/70">{content.description}</p>
        </div>

        <div className="space-y-3">
          {content.items.map((item) => (
            <details
              key={item.question}
              className="collapse-arrow collapse border border-base-content/10 bg-base-100/50"
            >
              <summary className="collapse-title pe-12 text-lg font-bold">{item.question}</summary>
              <div className="collapse-content leading-8 text-base-content/70">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
