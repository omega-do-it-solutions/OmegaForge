import { ArrowSquareOut } from '@phosphor-icons/react'
import { aboutContent } from '../content/about.ts'
import type { Language } from '../types.ts'

type AboutSectionProps = {
  language: Language
}

export default function AboutSection({ language }: AboutSectionProps) {
  const content = aboutContent[language]

  return (
    <section
      id="about"
      className="glass-panel mt-24 scroll-mt-28 overflow-hidden rounded-box p-6 sm:mt-32 sm:p-10 lg:p-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="space-y-5">
          <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
          <p className="leading-8 text-base-content/70">{content.introduction}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.omegado.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary gap-2"
            >
              {content.websiteAction}
              <ArrowSquareOut size={18} weight="bold" />
            </a>
            <a
              href="https://github.com/omega-do-it-solutions/OmegaForge"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost gap-2"
            >
              {content.repositoryAction}
              <ArrowSquareOut size={18} weight="bold" />
            </a>
          </div>
        </div>

        <ol className="divide-y divide-base-content/10 not-last:border-y border-base-content/10">
          {content.points.map((point) => (
            <li key={point.title} className="py-6">
              <h3 className="text-xl font-bold">{point.title}</h3>
              <p className="mt-2 leading-7 text-base-content/65">{point.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
