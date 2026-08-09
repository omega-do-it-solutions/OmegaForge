import type { Localized, SectionHeading, SectionPoint } from '../types.ts'

type JourneyContent = SectionHeading & {
  items: SectionPoint[]
}

export const journeyContent = {
  fa: {
    eyebrow: 'بعد از ارسال prompt',
    title: 'از یک ایدهٔ ساده تا یک پروژهٔ بررسی‌شده',
    description:
      'دستیار قرار نیست بی‌خبر شروع به ساخت کند. OmegaForge مسیر همکاری و نقاط تأیید را روشن نگه می‌دارد.',
    items: [
      {
        title: 'ایده‌تان را توضیح می‌دهید',
        description: 'دستیار با پرسش‌های کوتاه هدف، کاربران و رفتار محصول را روشن می‌کند.',
      },
      {
        title: 'پیشنهاد را مرور می‌کنید',
        description:
          'ساختار پیشنهادی و فایل‌هایی که قرار است تغییر کنند به زبان ساده نمایش داده می‌شوند.',
      },
      {
        title: 'شروع کار را تأیید می‌کنید',
        description:
          'تغییرات مهم فقط بعد از تأیید لازم انجام می‌شوند و کنترل در دست شما می‌ماند.',
      },
      {
        title: 'یک نتیجهٔ بررسی‌شده می‌گیرید',
        description:
          'دستیار کار انجام‌شده، آزمون‌ها و هر محدودیت باقی‌مانده را کوتاه گزارش می‌کند.',
      },
    ],
  },
  en: {
    eyebrow: 'After you send the prompt',
    title: 'From a plain idea to a verified project',
    description:
      'Your assistant should not begin building without context. OmegaForge keeps the collaboration path and approval points clear.',
    items: [
      {
        title: 'You describe the idea',
        description:
          'Your assistant asks short questions to clarify the product goal, users, and behavior.',
      },
      {
        title: 'You review the proposal',
        description:
          'The recommended structure and intended file changes are presented in plain language.',
      },
      {
        title: 'You approve the start',
        description:
          'Important changes happen only after the required approval, so you remain in control.',
      },
      {
        title: 'You receive a verified result',
        description:
          'Your assistant briefly reports the completed work, checks, and any remaining constraints.',
      },
    ],
  },
} satisfies Localized<JourneyContent>
