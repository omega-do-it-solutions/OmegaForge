import type { Localized, SectionHeading } from '../types.ts'

type HowItWorksContent = SectionHeading & {
  steps: Array<{ number: string; title: string; description: string }>
}

export const howItWorksContent = {
  fa: {
    eyebrow: 'روش استفاده',
    title: 'ساده، مستقیم و به زبان شما',
    description:
      'این راهنما برای خواندن به فارسی و انگلیسی ارائه شده است، اما OmegaForge محدودیت زبانی ندارد. prompt را کپی کنید، در دستیار مورد علاقه‌تان قرار دهید و گفتگو را به هر زبانی که راحت‌ترید ادامه دهید؛ دستیار به زبان شما پاسخ می‌دهد و Forge تصمیم‌های فنی را مدیریت می‌کند.',
    steps: [
      {
        number: '۱',
        title: 'هدفتان را انتخاب کنید',
        description: 'ساخت، به‌روزرسانی یا نگه‌داری پروژه.',
      },
      {
        number: '۲',
        title: 'prompt را کپی کنید',
        description: 'دکمهٔ کپی را بزنید و متن را تغییر ندهید.',
      },
      {
        number: '۳',
        title: 'آن را وارد دستیار کنید',
        description: 'با زبان دلخواهتان بنویسید؛ Codex یا Claude مسیر را به همان زبان با شما ادامه می‌دهد.',
      },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'Simple, direct, and in your language',
    description:
      'This handbook is presented in Persian and English, but OmegaForge has no language restriction. Copy the prompt, place it in your preferred assistant, and continue in whichever language feels natural; the assistant responds in your language while Forge handles the technical decisions.',
    steps: [
      {
        number: '1',
        title: 'Choose your goal',
        description: 'Create, update, or maintain a project.',
      },
      {
        number: '2',
        title: 'Copy the prompt',
        description: 'Use the copy button and keep the prepared instructions intact.',
      },
      {
        number: '3',
        title: 'Give it to your assistant',
        description: 'Write in your preferred language; Codex or Claude continues with you in it.',
      },
    ],
  },
} satisfies Localized<HowItWorksContent>
