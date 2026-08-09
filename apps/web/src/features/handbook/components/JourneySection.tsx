import {
  ChatCircleText,
  Eye,
  RocketLaunch,
  SealCheck,
  type Icon,
} from '@phosphor-icons/react'
import { journeyContent } from '../content/journey.ts'
import type { Language } from '../types.ts'

type JourneySectionProps = {
  language: Language
}

const journeyIcons: Icon[] = [ChatCircleText, Eye, SealCheck, RocketLaunch]

export default function JourneySection({ language }: JourneySectionProps) {
  const content = journeyContent[language]

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <p className="text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
        <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{content.title}</h2>
        <p className="leading-8 text-base-content/70">{content.description}</p>
      </div>

      <div className="mt-10 grid border-y border-base-content/10 md:grid-cols-4">
        {content.items.map((item, index) => {
          const JourneyIcon = journeyIcons[index]

          return (
            <article
              key={item.title}
              className="border-t border-base-content/10 py-6 first:border-t-0 md:border-s md:border-t-0 md:px-6 md:first:border-s-0"
            >
              <span className="grid size-11 place-items-center rounded-box bg-primary/15 text-primary">
                <JourneyIcon size={24} weight="bold" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 leading-7 text-base-content/65">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
