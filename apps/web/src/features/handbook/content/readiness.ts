import type { Localized, SectionHeading, SectionPoint } from '../types.ts'

type ReadinessContent = SectionHeading & {
  items: SectionPoint[]
}

export const readinessContent = {
  fa: {
    eyebrow: 'پیش از شروع',
    title: 'این چهار مورد را آماده کنید.',
    description: 'آماده کردنشان فقط چند دقیقه زمان می‌برد و جلوی بسیاری از اشتباه‌های ابتدای کار را می‌گیرد.',
    items: [
      {
        title: 'یک دستیار کدنویسی روی کامپیوترتان',
        description:
          'دستیار باید بتواند فایل‌های پروژه را بخواند و تغییر دهد. یک چت عادی در مرورگر این دسترسی را ندارد.',
      },
      {
        title: 'VS Code آماده',
        description:
          'اگر VS Code نصب نیست، پیش از شروع آن را نصب کنید. دستیار پوشهٔ پروژه را در همین برنامه باز می‌کند.',
      },
      {
        title: 'یک مسیر خالی برای پروژه',
        description:
          'نام و پوشه‌ای را انتخاب کنید که پروژهٔ دیگری در آن نیست. متن آماده از دستیار می‌خواهد پیش از شروع، خالی بودن مسیر را دوباره بررسی کند.',
      },
      {
        title: 'اطلاعات محرمانه را وارد نکنید',
        description:
          'رمز عبور، کلید API، توکن دسترسی یا دادهٔ واقعی مشتریان را در پرامپت ننویسید.',
      },
    ],
  },
  en: {
    eyebrow: 'Before you begin',
    title: 'Have these four things ready.',
    description:
      'They only take a few minutes to prepare and prevent most problems at the start.',
    items: [
      {
        title: 'A coding assistant on your computer',
        description:
          'The assistant must be able to read and change project files. A regular browser chat does not have that access.',
      },
      {
        title: 'VS Code ready',
        description:
          'Install VS Code before you begin. Your assistant will open the project folder there and continue from that folder.',
      },
      {
        title: 'An empty project location',
        description:
          'Choose a name and folder that do not already contain another project. The prepared prompt asks your assistant to check again before it starts.',
      },
      {
        title: 'Keep confidential information out',
        description:
          'Do not put passwords, API keys, access tokens, or real customer data in a prompt.',
      },
    ],
  },
} satisfies Localized<ReadinessContent>
