import type { Localized, SectionHeading, SectionPoint } from '../types.ts'

type ReadinessContent = SectionHeading & {
  items: SectionPoint[]
}

export const readinessContent = {
  fa: {
    eyebrow: 'پیش از شروع',
    title: 'برای یک شروع بی‌دردسر آماده شوید.',
    description: 'چند آمادگی ساده کمک می‌کند دستیار از همان ابتدا در مسیر درست و امن کار کند.',
    items: [
      {
        title: 'یک دستیار برنامه‌نویسی محلی',
        description:
          'از دستیاری استفاده کنید که روی کامپیوتر شما به فایل‌ها و پوشهٔ پروژه دسترسی دارد؛ یک چت معمولی مرورگر کافی نیست.',
      },
      {
        title: 'VS Code آماده',
        description:
          'VS Code را نصب داشته باشید تا دستیار بتواند پروژه را در محیط مناسب باز کند و کار را از همان‌جا ادامه دهد.',
      },
      {
        title: 'یک مسیر خالی برای پروژه',
        description:
          'نام و پوشه‌ای را انتخاب کنید که پروژهٔ دیگری در آن نیست. prompt پیش از هر تغییری این موضوع را دوباره بررسی می‌کند.',
      },
      {
        title: 'بدون اطلاعات محرمانه',
        description:
          'رمز عبور، API key، کلید دسترسی یا دادهٔ واقعی مشتریان را داخل promptها قرار ندهید.',
      },
    ],
  },
  en: {
    eyebrow: 'Before you begin',
    title: 'Set yourself up for a smooth start.',
    description:
      'A few simple preparations help your assistant work safely and in the right place from the beginning.',
    items: [
      {
        title: 'A local coding assistant',
        description:
          'Use an assistant that can access files and the project folder on your computer. A regular browser chat is not enough.',
      },
      {
        title: 'VS Code ready',
        description:
          'Have VS Code installed so your assistant can open the project in the right environment and continue from there.',
      },
      {
        title: 'An empty project location',
        description:
          'Choose a name and folder that do not already contain another project. The prompt checks again before making changes.',
      },
      {
        title: 'No confidential information',
        description:
          'Do not include passwords, API keys, access tokens, or real customer data in your prompts.',
      },
    ],
  },
} satisfies Localized<ReadinessContent>
