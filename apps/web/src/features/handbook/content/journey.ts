import type { Localized, SectionHeading, SectionPoint } from '../types.ts'

type JourneyContent = SectionHeading & {
  items: SectionPoint[]
}

export const journeyContent = {
  fa: {
    eyebrow: 'بعد از فرستادن پرامپت',
    title: 'دستیار چطور کار را پیش می‌برد؟',
    description:
      'پیش از آنکه فایلی تغییر کند، موضوع را با شما روشن می‌کند و برای تغییرات مهم تأیید می‌گیرد.',
    items: [
      {
        title: 'چند سؤال کوتاه از شما می‌پرسد',
        description: 'با پاسخ‌های شما، هدف پروژه، کاربران و کاری که باید انجام شود مشخص می‌شود.',
      },
      {
        title: 'می‌گوید چه کاری می‌خواهد انجام دهد',
        description:
          'روش پیشنهادی، انتخاب‌های فنی و فایل‌هایی که قرار است تغییر کنند پیش از شروع به شما نشان داده می‌شوند.',
      },
      {
        title: 'در جای لازم از شما تأیید می‌گیرد',
        description:
          'تصمیم‌های حساس، تغییرات تخریب‌گر و شروع ساخت پروژه بدون تأیید شما انجام نمی‌شوند.',
      },
      {
        title: 'در پایان، نتیجه را خلاصه می‌کند',
        description:
          'می‌گوید چه چیزی تغییر کرده، چطور آن را بررسی کرده و آیا کار ناتمام یا محدودیتی باقی مانده است.',
      },
    ],
  },
  en: {
    eyebrow: 'After you send the prompt',
    title: 'What will the assistant do next?',
    description:
      'Before changing files, it clarifies the request with you and asks for approval where it matters.',
    items: [
      {
        title: 'It asks a few short questions',
        description:
          'Your answers establish the project goal, its users, and what the result should do.',
      },
      {
        title: 'It tells you what it plans to do',
        description:
          'You see the proposed approach, technical choices, and intended file changes before work begins.',
      },
      {
        title: 'It asks for approval when needed',
        description:
          'Sensitive decisions, destructive actions, and project scaffolding do not proceed without your approval.',
      },
      {
        title: 'It summarizes the result',
        description:
          'At the end, it tells you what changed, how it checked the work, and whether anything remains unresolved.',
      },
    ],
  },
} satisfies Localized<JourneyContent>
