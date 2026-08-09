import {
  ChatCircleText,
  CheckCircle,
  Checks,
  FileText,
  FlowArrow,
  ShieldCheck,
  Wrench,
  type Icon,
} from '@phosphor-icons/react'
import { technicalGuideContent } from '../content/technical-guide.ts'
import type { Language } from '../types.ts'

type TechnicalGuideProps = {
  language: Language
}

const flowIcons: Icon[] = [ChatCircleText, FileText, Wrench, Checks]

export default function TechnicalGuide({ language }: TechnicalGuideProps) {
  const content = technicalGuideContent[language]

  return (
    <div className="glass-panel overflow-hidden rounded-box">
      <header className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 lg:p-12">
        <div className="max-w-2xl">
          <div className="grid size-12 place-items-center rounded-box bg-primary text-primary-content shadow-lg shadow-primary/20">
            <FlowArrow size={25} weight="bold" />
          </div>
          <p className="mt-6 text-sm font-bold tracking-wide text-primary">{content.eyebrow}</p>
          <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            {content.title}
          </h3>
        </div>

        <div className="max-w-2xl lg:pb-1">
          <p className="text-lg leading-9 text-base-content/72">{content.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={content.eyebrow}>
            {content.traits.map((trait) => (
              <li key={trait} className="badge badge-outline badge-lg border-primary/30 text-primary">
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section
        aria-labelledby="technical-flow-title"
        className="border-y border-base-content/10 bg-base-200/35 px-7 py-10 sm:px-10 lg:px-12 lg:py-12"
      >
        <div className="max-w-3xl">
          <h4 id="technical-flow-title" className="text-2xl font-black tracking-[-0.03em]">
            {content.flowTitle}
          </h4>
          <p className="mt-3 max-w-2xl leading-8 text-base-content/65">{content.flowDescription}</p>
        </div>

        <ol className="mt-9 grid gap-y-8 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4 xl:gap-x-0">
          {content.flowItems.map((item, index) => {
            const FlowIcon = flowIcons[index]
            const isFirst = index === 0
            const isLast = index === content.flowItems.length - 1

            return (
              <li
                key={item.title}
                className={`min-w-0 ${isFirst ? '' : 'xl:border-s xl:border-base-content/10 xl:ps-6'} ${isLast ? '' : 'xl:pe-6'}`}
              >
                <div className="flex items-center gap-3 text-primary">
                  <FlowIcon className="shrink-0" size={22} weight="bold" />
                  <span className="text-xs font-black uppercase tracking-[0.12em]">{item.label}</span>
                </div>
                <h5 className="mt-4 text-base font-bold leading-7">{item.title}</h5>
                <p className="mt-2 text-sm leading-7 text-base-content/62">{item.description}</p>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <section aria-labelledby="technical-context-title" className="p-7 sm:p-10 lg:p-12">
          <h4 id="technical-context-title" className="text-2xl font-black tracking-[-0.03em]">
            {content.contextTitle}
          </h4>
          <p className="mt-3 leading-8 text-base-content/65">{content.contextDescription}</p>

          <div className="mt-7 overflow-x-auto">
            <table className="table">
              <caption className="sr-only">{content.contextTitle}</caption>
              <tbody>
                {content.contextSources.map((source) => (
                  <tr key={source.path} className="border-base-content/10">
                    <th className="w-36 ps-0 align-top font-normal">
                      <code
                        className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary"
                        dir="ltr"
                      >
                        {source.path}
                      </code>
                    </th>
                    <td className="pe-0">
                      <p className="font-bold">{source.title}</p>
                      <p className="mt-1 text-sm leading-6 text-base-content/58">{source.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="technical-control-title"
          className="border-t border-base-content/10 bg-primary/[0.055] p-7 sm:p-10 lg:border-s lg:border-t-0 lg:p-12"
        >
          <ShieldCheck className="text-primary" size={30} weight="fill" />
          <h4 id="technical-control-title" className="mt-5 text-2xl font-black tracking-[-0.03em]">
            {content.controlTitle}
          </h4>
          <p className="mt-3 leading-8 text-base-content/68">{content.controlDescription}</p>

          <ul className="mt-8 space-y-6">
            {content.controlItems.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <CheckCircle className="mt-1 shrink-0 text-primary" size={21} weight="fill" />
                <div>
                  <h5 className="font-bold">{item.title}</h5>
                  <p className="mt-1 text-sm leading-7 text-base-content/62">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
