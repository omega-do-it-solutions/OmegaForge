import {
  ArrowDown,
  CheckCircle,
  Moon,
  ShieldCheck,
  Sparkle,
  Sun,
  Wrench,
} from '@phosphor-icons/react'
import { PromptCard } from './components/PromptCard.tsx'
import { handbookPrompts, navItems } from './content.ts'

type HandbookPageProps = {
  isDark: boolean
  onToggleTheme: () => void
}

const workflowIcons = [
  <Sparkle key="create" size={26} weight="fill" />,
  <ArrowDown key="update" size={26} weight="bold" />,
  <Wrench key="maintain" size={26} weight="bold" />,
]

export function HandbookPage({ isDark, onToggleTheme }: HandbookPageProps) {
  return (
    <div className="handbook-canvas relative isolate min-h-svh overflow-x-clip text-base-content transition-colors duration-300">
      <div aria-hidden="true" className="ai-orb ai-orb-primary -right-24 top-28 size-72 sm:size-96" />
      <div
        aria-hidden="true"
        className="ai-orb ai-orb-secondary -left-20 top-[38rem] size-64 sm:size-80"
      />

      <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
        <nav
          aria-label="ناوبری راهنما"
          className="glass-panel mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-box px-4 py-3 sm:px-5"
        >
          <a href="#start" className="flex items-center gap-2 font-bold text-base-content">
            <span className="grid size-9 place-items-center rounded-box bg-primary text-primary-content">
              <Sparkle size={20} weight="fill" />
            </span>
            <span>OmegaForge</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="btn btn-ghost btn-sm">
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-square btn-sm"
            aria-label={isDark ? 'فعال کردن حالت روشن' : 'فعال کردن حالت تیره'}
            aria-pressed={isDark}
            onClick={onToggleTheme}
          >
            {isDark ? <Sun size={21} weight="bold" /> : <Moon size={21} weight="fill" />}
          </button>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:pb-24">
        <section id="start" className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-7">
            <div className="glass-panel-subtle inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-base-content/75">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_1rem] shadow-primary" />
              راهنمای فارسی برای تیم OmegaForge
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-[1.1] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                مسیر پروژه‌تان را با
                <span className="ai-gradient-text mt-2 block">هوش مصنوعی بسازید.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-base-content/70 sm:text-xl">
                لازم نیست دستورهای پیچیده بلد باشید. مسیر درست را انتخاب کنید، prompt
                فارسی را کپی کنید و آن را در Codex یا Claude وارد کنید.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#workflows" className="btn btn-primary gap-2 shadow-lg shadow-primary/25">
                انتخاب مسیر
                <ArrowDown size={18} weight="bold" />
              </a>
              <a href="#how-it-works" className="btn btn-ghost">
                روش استفاده
              </a>
            </div>
          </div>

          <aside className="glass-panel rounded-box p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-base-content/10 pb-5">
              <div>
                <p className="text-sm font-medium text-primary">دستیار شما</p>
                <h2 className="mt-1 text-2xl font-bold">سه کار، یک مسیر روشن</h2>
              </div>
              <div className="grid size-12 place-items-center rounded-box bg-secondary text-secondary-content">
                <ShieldCheck size={26} weight="fill" />
              </div>
            </div>
            <ol className="mt-5 space-y-4">
              {[
                'ساخت پایهٔ یک پروژهٔ جدید',
                'به‌روزرسانی امن قوانین Forge',
                'نگه‌داری و تغییر پروژهٔ موجود',
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-base-content/75">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section id="workflows" className="scroll-mt-28 pt-24 sm:pt-32">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-bold tracking-wide text-primary">مسیرهای آماده</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                برای هدف امروزتان، prompt درست را بردارید.
              </h2>
            </div>
            <p className="max-w-sm leading-7 text-base-content/65">
              هر prompt به دستیار می‌گوید از skill مناسب OmegaForge استفاده کند و قواعد
              همان skill را رعایت کند.
            </p>
          </div>

          <div className="space-y-5">
            {handbookPrompts.map((prompt, index) => (
              <PromptCard key={prompt.id} icon={workflowIcons[index]} prompt={prompt} />
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="glass-panel mt-24 scroll-mt-28 rounded-box p-6 sm:mt-32 sm:p-10"
        >
          <div className="space-y-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-bold tracking-wide text-primary">روش استفاده</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                ساده، مستقیم و فارسی
              </h2>
              <p className="leading-8 text-base-content/70">
                این سایت به هوش مصنوعی متصل نیست. شما کنترل کامل دارید: فقط متن را کپی
                می‌کنید و در دستیار مورد علاقه‌تان قرار می‌دهید.
              </p>
            </div>

            <ol className="space-y-3">
              {[
                ['۱', 'هدفتان را انتخاب کنید', 'ساخت، به‌روزرسانی یا نگه‌داری پروژه.'],
                ['۲', 'prompt را کپی کنید', 'دکمهٔ کپی را بزنید و متن را تغییر ندهید.'],
                ['۳', 'آن را وارد دستیار کنید', 'Codex یا Claude در کنار شما مسیر را ادامه می‌دهد.'],
              ].map(([number, title, description]) => (
                <li
                  key={number}
                  className="glass-panel-subtle flex items-start gap-5 rounded-box p-5 sm:p-6"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-box bg-primary/15 text-xl font-black text-primary">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-bold text-base-content">{title}</h3>
                    <p className="mt-2 leading-7 text-base-content/65">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="alert mt-6 border border-primary/20 bg-primary/10 text-base-content sm:mt-8">
          <CheckCircle size={24} weight="fill" className="text-primary" />
          <span>
            این راهنما همراه با OmegaForge به‌روز می‌شود تا promptها همواره با قواعد Forge
            هماهنگ بمانند.
          </span>
        </aside>
      </main>

      <footer className="relative border-t border-base-content/10 px-4 py-8 text-center text-sm text-base-content/60 sm:px-6">
        OmegaForge Manual · برای تیم داخلی
      </footer>
    </div>
  )
}
