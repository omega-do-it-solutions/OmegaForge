import type { Localized } from '../types.ts'

type ShellContent = {
  metadata: {
    title: string
    description: string
  }
  navigation: {
    ariaLabel: string
    items: Array<{ href: string; label: string }>
  }
  controls: {
    languageLabel: string
    persianLabel: string
    englishLabel: string
    githubLabel: string
    enableLight: string
    enableDark: string
  }
  hero: {
    badge: string
    title: string
    accent: string
    description: string
    primaryAction: string
    secondaryAction: string
  }
  overview: {
    eyebrow: string
    title: string
    items: string[]
  }
  footer: string
}

export const shellContent = {
  fa: {
    metadata: {
      title: 'راهنمای عمومی اُمگا فورج',
      description:
        'راهنمای فارسی و انگلیسی برای ساختن، به‌روز کردن و نگه‌داری پروژه‌های OmegaForge با یک دستیار کدنویسی',
    },
    navigation: {
      ariaLabel: 'ناوبری راهنما',
      items: [
        { href: '#start', label: 'شروع' },
        { href: '#workflows', label: 'مسیرها' },
        { href: '#how-it-works', label: 'روش استفاده' },
        { href: '#about', label: 'دربارهٔ ما' },
        { href: '#faq', label: 'پرسش‌ها' },
      ],
    },
    controls: {
      languageLabel: 'انتخاب زبان راهنما',
      persianLabel: 'نمایش راهنما به فارسی',
      englishLabel: 'نمایش راهنما به انگلیسی',
      githubLabel: 'مشاهدهٔ OmegaForge در GitHub',
      enableLight: 'فعال کردن حالت روشن',
      enableDark: 'فعال کردن حالت تیره',
    },
    hero: {
      badge: 'راهنمای کار با OmegaForge',
      title: 'ایده‌تان را به پروژه تبدیل کنید؛',
      accent: 'با کمک یک دستیار کدنویسی.',
      description:
        'این راهنما به شما می‌گوید برای ساختن یک پروژه، به‌روز کردن پایهٔ Forge یا انجام یک تغییر، چه متنی را به Codex یا Claude بدهید. اگر فردی فنی هستید، در بخش فنی هم می‌بینید Forge چطور دامنهٔ کار، معماری و بررسی نهایی را مدیریت می‌کند.',
      primaryAction: 'دیدن مسیرها',
      secondaryAction: 'چه چیزهایی لازم دارم؟',
    },
    overview: {
      eyebrow: 'انتخاب شما',
      title: 'با Forge چه کاری می‌خواهید انجام دهید؟',
      items: [
        'یک پروژهٔ جدید را از ابتدا راه بیندازید',
        'راهنماهای Forge را به‌روز کنید',
        'یک قابلیت اضافه کنید یا مشکلی را برطرف کنید',
      ],
    },
    footer: 'OmegaForge Manual · راهنمای کار با OmegaForge و دستیارهای کدنویسی',
  },
  en: {
    metadata: {
      title: 'OmegaForge Public Handbook',
      description:
        'A Persian and English guide to starting, updating, and maintaining OmegaForge projects with an AI coding assistant.',
    },
    navigation: {
      ariaLabel: 'Handbook navigation',
      items: [
        { href: '#start', label: 'Start' },
        { href: '#workflows', label: 'Paths' },
        { href: '#how-it-works', label: 'How it works' },
        { href: '#about', label: 'About us' },
        { href: '#faq', label: 'FAQ' },
      ],
    },
    controls: {
      languageLabel: 'Choose handbook language',
      persianLabel: 'Show the handbook in Persian',
      englishLabel: 'Show the handbook in English',
      githubLabel: 'View OmegaForge on GitHub',
      enableLight: 'Enable light mode',
      enableDark: 'Enable dark mode',
    },
    hero: {
      badge: 'A practical guide to OmegaForge',
      title: 'Turn your idea into a project;',
      accent: 'use an AI coding assistant to get there.',
      description:
        'This guide shows you what to give Codex or Claude when you want to start a project, update its Forge guidance, or make a change. If you are an engineer, the technical section also explains how Forge keeps the work scoped, consistent with the architecture, and properly checked.',
      primaryAction: 'See the options',
      secondaryAction: 'What do I need?',
    },
    overview: {
      eyebrow: 'Choose a task',
      title: 'What would you like to do with Forge?',
      items: [
        'Set up a new project from scratch',
        'Bring the Forge guidance up to date',
        'Add a feature or fix a problem in an existing project',
      ],
    },
    footer: 'OmegaForge Manual · A practical guide to Forge and AI coding assistants',
  },
} satisfies Localized<ShellContent>
