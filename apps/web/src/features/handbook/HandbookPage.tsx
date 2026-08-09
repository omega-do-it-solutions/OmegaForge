import {
  ArrowDown,
  GithubLogo,
  Moon,
  ShieldCheck,
  Sparkle,
  Sun,
} from '@phosphor-icons/react'
import { lazy, Suspense } from 'react'
import { shellContent } from './content/shell.ts'
import type { Language } from './types.ts'
import { useActiveSection, type HandbookSectionId } from './useActiveSection.ts'

type HandbookPageProps = {
  isDark: boolean
  language: Language
  onChangeLanguage: (language: Language) => void
  onToggleTheme: () => void
}

const ReadinessSection = lazy(() => import('./components/ReadinessSection.tsx'))
const WorkflowsSection = lazy(() => import('./components/WorkflowsSection.tsx'))
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection.tsx'))
const JourneySection = lazy(() => import('./components/JourneySection.tsx'))
const AboutSection = lazy(() => import('./components/AboutSection.tsx'))
const FaqSection = lazy(() => import('./components/FaqSection.tsx'))
const PublicProjectSection = lazy(() => import('./components/PublicProjectSection.tsx'))

function SectionFallback({ id }: { id?: string }) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className="mt-24 min-h-56 scroll-mt-28 animate-pulse rounded-box bg-base-200/30 sm:mt-32"
    />
  )
}

export function HandbookPage({
  isDark,
  language,
  onChangeLanguage,
  onToggleTheme,
}: HandbookPageProps) {
  const content = shellContent[language]
  const { activeSection, activateSection } = useActiveSection()

  return (
    <div
      lang={language}
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="handbook-canvas relative isolate min-h-svh overflow-x-clip text-base-content transition-colors duration-300"
    >
      <div aria-hidden="true" className="ai-orb ai-orb-primary -right-20 top-[5%] size-56 sm:size-72" />
      <div
        aria-hidden="true"
        className="ai-orb ai-orb-secondary -left-20 top-[32%] size-48 sm:size-64"
      />
      <div aria-hidden="true" className="ai-orb ai-orb-primary -right-24 top-[60%] size-52 sm:size-68" />
      <div
        aria-hidden="true"
        className="ai-orb ai-orb-secondary -left-16 top-[84%] size-44 sm:size-60"
      />

      <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
        <nav
          aria-label={content.navigation.ariaLabel}
          className="glass-panel mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-box px-4 py-3 sm:px-5"
        >
          <a
            href="#start"
            className="flex items-center gap-2 font-bold text-base-content"
            onClick={() => activateSection('start')}
          >
            <span className="grid size-9 place-items-center rounded-box bg-primary text-primary-content">
              <Sparkle size={20} weight="fill" />
            </span>
            <span>OmegaForge</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {content.navigation.items.map((item) => {
              const sectionId = item.href.slice(1) as HandbookSectionId
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`btn btn-sm transition-colors ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => activateSection(sectionId)}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="join"
              role="group"
              aria-label={content.controls.languageLabel}
            >
              <button
                type="button"
                className={`btn btn-outline btn-xs join-item ${language === 'fa' ? 'btn-primary' : ''}`}
                aria-label={content.controls.persianLabel}
                aria-pressed={language === 'fa'}
                onClick={() => onChangeLanguage('fa')}
              >
                FA
              </button>
              <button
                type="button"
                className={`btn btn-outline btn-xs join-item ${language === 'en' ? 'btn-primary' : ''}`}
                aria-label={content.controls.englishLabel}
                aria-pressed={language === 'en'}
                onClick={() => onChangeLanguage('en')}
              >
                EN
              </button>
            </div>

            <a
              href="https://github.com/omega-do-it-solutions/OmegaForge"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-square btn-sm"
              aria-label={content.controls.githubLabel}
              title={content.controls.githubLabel}
            >
              <GithubLogo size={21} weight="fill" />
            </a>

            <button
              type="button"
              className="btn btn-ghost btn-square btn-sm"
              aria-label={isDark ? content.controls.enableLight : content.controls.enableDark}
              aria-pressed={isDark}
              onClick={onToggleTheme}
            >
              {isDark ? <Sun size={21} weight="bold" /> : <Moon size={21} weight="fill" />}
            </button>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:pb-24">
        <section
          id="start"
          className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
        >
          <div className="space-y-7">
            <div className="glass-panel-subtle inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-base-content/75">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_1rem] shadow-primary" />
              {content.hero.badge}
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[1.1] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {content.hero.title}
                <span className="ai-gradient-text mt-2 block">{content.hero.accent}</span>
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-base-content/70 sm:text-xl">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#workflows" className="btn btn-primary gap-2 shadow-lg shadow-primary/25">
                {content.hero.primaryAction}
                <ArrowDown size={18} weight="bold" />
              </a>
              <a href="#getting-ready" className="btn btn-ghost">
                {content.hero.secondaryAction}
              </a>
            </div>
          </div>

          <aside className="glass-panel rounded-box p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-base-content/10 pb-5">
              <div>
                <p className="text-sm font-medium text-primary">{content.overview.eyebrow}</p>
                <h2 className="mt-1 text-2xl font-bold">{content.overview.title}</h2>
              </div>
              <div className="grid size-12 place-items-center rounded-box bg-secondary text-secondary-content">
                <ShieldCheck size={26} weight="fill" />
              </div>
            </div>
            <ol className="mt-5 space-y-4">
              {content.overview.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-base-content/75">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <Suspense fallback={<SectionFallback id="getting-ready" />}>
          <ReadinessSection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback id="workflows" />}>
          <WorkflowsSection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback id="how-it-works" />}>
          <HowItWorksSection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <JourneySection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback id="about" />}>
          <AboutSection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback id="faq" />}>
          <FaqSection language={language} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <PublicProjectSection language={language} />
        </Suspense>
      </main>

      <footer className="relative border-t border-base-content/10 px-4 py-8 text-center text-sm text-base-content/60 sm:px-6">
        {content.footer}
      </footer>
    </div>
  )
}
