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
        'راهنمای عمومی دوزبانهٔ اُمگا فورج برای ساخت و نگه‌داری پروژه با کمک هوش مصنوعی، برای کاربران با هر سطح تجربهٔ فنی',
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
      badge: 'راهنمای عمومی OmegaForge برای همه',
      title: 'پروژه‌تان را بسازید؛',
      accent: 'بدون دغدغهٔ فنی.',
      description:
        'چه اولین پروژه‌تان را شروع کنید و چه یک مهندس باتجربه باشید، هدف را انتخاب کنید و به زبان دلخواهتان با Codex یا Claude ادامه دهید؛ Forge ساخت، تغییر و نگه‌داری پروژه را در یک مسیر مهندسی روشن نگه می‌دارد.',
      primaryAction: 'انتخاب مسیر',
      secondaryAction: 'پیش از شروع',
    },
    overview: {
      eyebrow: 'دستیار پروژهٔ شما',
      title: 'سه کار، یک مسیر روشن',
      items: [
        'ساخت پایهٔ یک پروژهٔ جدید',
        'به‌روزرسانی امن قوانین Forge',
        'نگه‌داری و تغییر پروژهٔ موجود',
      ],
    },
    footer: 'OmegaForge Manual · راهنمای عمومی ساخت و نگه‌داری پروژه با هوش مصنوعی',
  },
  en: {
    metadata: {
      title: 'OmegaForge Public Handbook',
      description:
        'A public bilingual OmegaForge handbook for building and maintaining projects with AI assistance, for people at every level of technical experience.',
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
      badge: 'The public OmegaForge handbook',
      title: 'Build your project;',
      accent: 'skip the technical burden.',
      description:
        'Whether you are starting your first project or working as an experienced engineer, choose the goal and continue with Codex or Claude in your preferred language. Forge keeps building, changing, and maintaining the project on a clear engineering path.',
      primaryAction: 'Choose your path',
      secondaryAction: 'Before you begin',
    },
    overview: {
      eyebrow: 'Your project assistant',
      title: 'Three jobs, one clear path',
      items: [
        'Establish a new project foundation',
        'Safely update the Forge rules',
        'Maintain and change an existing project',
      ],
    },
    footer: 'OmegaForge Manual · A public guide to building and maintaining projects with AI',
  },
} satisfies Localized<ShellContent>
