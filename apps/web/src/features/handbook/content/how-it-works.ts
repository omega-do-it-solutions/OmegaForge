import type { Localized, SectionHeading } from '../types.ts'

type HowItWorksContent = SectionHeading & {
  steps: Array<{ number: string; title: string; description: string }>
}

export const howItWorksContent = {
  fa: {
    eyebrow: 'شروع کار',
    title: 'یک مسیر را انتخاب کنید و متن آماده را بفرستید',
    description:
      'خود صفحه فارسی و انگلیسی است، اما گفتگو با دستیار محدود به این دو زبان نیست. پرامپت را کپی کنید و ادامهٔ گفتگو را به هر زبانی که برایتان راحت‌تر است انجام دهید.',
    steps: [
      {
        number: '۱',
        title: 'کاری را که می‌خواهید انجام دهید انتخاب کنید',
        description: 'پروژهٔ جدید، به‌روزرسانی Forge یا تغییر یک پروژهٔ موجود.',
      },
      {
        number: '۲',
        title: 'متن آماده را کپی کنید',
        description: 'اگر در حال ساخت پروژه هستید، ابتدا نام و محل ذخیرهٔ آن را وارد کنید.',
      },
      {
        number: '۳',
        title: 'آن را برای دستیار بفرستید',
        description: 'از اینجا به بعد، می‌توانید پاسخ سؤال‌های دستیار را به زبان دلخواهتان بدهید.',
      },
    ],
  },
  en: {
    eyebrow: 'Getting started',
    title: 'Choose a task and send the prepared prompt',
    description:
      'The page is available in Persian and English, but your conversation with the assistant is not limited to those languages. Copy the prompt and continue in whichever language is most comfortable for you.',
    steps: [
      {
        number: '1',
        title: 'Choose what you want to do',
        description: 'Start a project, update Forge, or change an existing project.',
      },
      {
        number: '2',
        title: 'Copy the prepared text',
        description: 'If you are starting a project, enter its name and location first.',
      },
      {
        number: '3',
        title: 'Send it to your assistant',
        description: 'From there, answer the assistant’s questions in whichever language you prefer.',
      },
    ],
  },
} satisfies Localized<HowItWorksContent>
