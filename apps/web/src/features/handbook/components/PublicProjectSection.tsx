import {
  ArrowSquareOut,
  Bug,
  ChatCircleText,
  ClockCounterClockwise,
  ShieldCheck,
  Translate,
} from '@phosphor-icons/react'
import { publicProjectContent } from '../content/public-project.ts'
import type { Language } from '../types.ts'

type PublicProjectSectionProps = {
  language: Language
}

const repositoryUrl = 'https://github.com/omega-do-it-solutions/OmegaForge'

export default function PublicProjectSection({ language }: PublicProjectSectionProps) {
  const { contribution, freshness, privacy } = publicProjectContent[language]

  return (
    <section className="mt-24 sm:mt-32">
      <div className="grid items-stretch gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-box p-6 sm:p-8">
          <p className="text-sm font-bold tracking-wide text-primary">{contribution.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">{contribution.title}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-base-content/70">{contribution.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${repositoryUrl}/issues/new?title=Manual%20problem%3A%20`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary gap-2"
            >
              <Bug size={19} weight="bold" />
              {contribution.reportAction}
            </a>
            <a
              href={`${repositoryUrl}/issues/new?title=Manual%20copy%20suggestion%3A%20`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline gap-2"
            >
              <ChatCircleText size={19} weight="bold" />
              {contribution.suggestionAction}
            </a>
            <a
              href={`${repositoryUrl}/issues/new?title=Manual%20translation%3A%20`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost gap-2"
            >
              <Translate size={19} weight="bold" />
              {contribution.translationAction}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <aside className="alert flex-1 items-start border border-info/20 bg-info/10 text-base-content">
            <ShieldCheck className="mt-0.5 shrink-0 text-info" size={24} weight="fill" />
            <div>
              <h2 className="font-bold">{privacy.title}</h2>
              <p className="mt-2 leading-7 text-base-content/70">{privacy.description}</p>
            </div>
          </aside>

          <div className="glass-panel-subtle rounded-box p-5">
            <div className="flex items-start gap-3">
              <ClockCounterClockwise className="mt-0.5 shrink-0 text-primary" size={22} weight="bold" />
              <div className="flex-1">
                <p className="font-bold">{freshness.manualVersion}</p>
                <p className="mt-1 text-sm font-medium text-base-content/70">
                  {freshness.forgeVersion}
                </p>
                <p className="mt-1 text-sm text-base-content/60">{freshness.updated}</p>
                <a
                  href={`${repositoryUrl}/blob/manual/apps/web/CHANGELOG.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary mt-3 inline-flex items-center gap-1 text-sm font-bold"
                >
                  {freshness.changelogAction}
                  <ArrowSquareOut size={16} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
