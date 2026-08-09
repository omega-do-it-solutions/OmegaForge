import type { Localized, SectionHeading } from '../types.ts'

type FaqContent = SectionHeading & {
  items: Array<{ question: string; answer: string }>
}

export const faqContent = {
  fa: {
    eyebrow: 'اگر چیزی طبق انتظار پیش نرفت',
    title: 'پرسش‌های رایج و راه‌حل‌های ساده',
    description:
      'در بیشتر مواقع لازم نیست خودتان مشکل فنی را حل کنید؛ کافی است دستیار را به مسیر درست برگردانید.',
    items: [
      {
        question: 'چرا دکمهٔ کپی غیرفعال است؟',
        answer:
          'برای ساخت پروژهٔ جدید، ابتدا نام پروژه و مسیر والد را وارد کنید. پس از کامل شدن هر دو فیلد، prompt آمادهٔ کپی می‌شود.',
      },
      {
        question: 'دستیار می‌گوید skill موردنظر را پیدا نمی‌کند؛ چه کنم؟',
        answer:
          'از دستیار بخواهید پوشهٔ clone‌شدهٔ OmegaForge را باز کند و AGENTS.md را دوباره بخواند. اگر skill همچنان پیدا نشد، مطمئن شوید در پوشهٔ اصلی همان پروژه کار می‌کند.',
      },
      {
        question: 'مسیر انتخاب‌شده از قبل پروژه دارد؛ چه کنم؟',
        answer:
          'نام یا پوشهٔ دیگری انتخاب کنید. prompt عمداً در مسیر اشغال‌شده ادامه نمی‌دهد تا فایل‌های موجود شما در خطر قرار نگیرند.',
      },
      {
        question: 'clone یا به‌روزرسانی با خطا متوقف شد؛ قدم بعدی چیست؟',
        answer:
          'متن کامل خطا را در همان گفتگو برای دستیار بفرستید و بخواهید بدون حذف یا بازنویسی فایل‌های موجود، علت را ساده توضیح دهد و امن‌ترین راه ادامه را پیشنهاد کند.',
      },
      {
        question: 'اگر دستیار سؤال فنی پرسید و جوابش را ندانستم چه کنم؟',
        answer:
          'بگویید فنی نیستید و از او بخواهید کوچک‌ترین انتخاب امن و مناسب محصول را پیشنهاد دهد، دلیلش را ساده بگوید و فقط در صورت نیاز واقعی تأیید شما را بگیرد.',
      },
    ],
  },
  en: {
    eyebrow: 'When something does not go as expected',
    title: 'Common questions, simple answers',
    description:
      'Most of the time, you do not need to solve the technical issue yourself. You only need to guide the assistant back to the right context.',
    items: [
      {
        question: 'Why is the copy button disabled?',
        answer:
          'For a new project, enter both the project name and parent path first. The prompt becomes available as soon as both fields are complete.',
      },
      {
        question: 'My assistant cannot find the requested skill. What should I do?',
        answer:
          'Ask it to open the cloned OmegaForge folder and read AGENTS.md again. If the skill is still missing, confirm that it is working from the root of that project.',
      },
      {
        question: 'The selected location already contains a project. What should I do?',
        answer:
          'Choose a different name or folder. The prompt intentionally stops in an occupied location so your existing files are not put at risk.',
      },
      {
        question: 'Clone or update stopped with an error. What comes next?',
        answer:
          'Paste the complete error into the same assistant conversation. Ask it to explain the cause plainly and recommend the safest next step without deleting or overwriting existing files.',
      },
      {
        question: 'What if the assistant asks a technical question I cannot answer?',
        answer:
          'Say that you are not technical and ask it to recommend the smallest safe choice for the product, explain the reason plainly, and request your approval only when genuinely required.',
      },
    ],
  },
} satisfies Localized<FaqContent>
