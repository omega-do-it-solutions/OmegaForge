import type { Localized, SectionHeading } from '../types.ts'

type FaqContent = SectionHeading & {
  items: Array<{ question: string; answer: string }>
}

export const faqContent = {
  fa: {
    eyebrow: 'اگر جایی گیر کردید',
    title: 'پاسخ چند پرسش رایج',
    description:
      'اگر کار متوقف شد، متن کامل خطا را نگه دارید و در همان گفتگو برای دستیار بفرستید. معمولاً می‌تواند از همان‌جا ادامه بدهد.',
    items: [
      {
        question: 'چرا دکمهٔ کپی غیرفعال است؟',
        answer:
          'برای ساخت پروژهٔ جدید، نام پروژه و محل ذخیرهٔ آن را وارد کنید. وقتی هر دو خانه پر شوند، دکمهٔ کپی هم فعال می‌شود.',
      },
      {
        question: 'دستیار skill موردنظر را پیدا نمی‌کند. چه کنم؟',
        answer:
          'از آن بخواهید مطمئن شود پوشهٔ اصلی پروژهٔ clone‌شده را باز کرده و AGENTS.md را خوانده است. اگر هنوز skill را پیدا نمی‌کند، ممکن است پوشهٔ اشتباهی در VS Code باز باشد.',
      },
      {
        question: 'مسیر انتخاب‌شده از قبل پروژه دارد؛ چه کنم؟',
        answer:
          'نام یا پوشهٔ دیگری انتخاب کنید. دستیار عمداً در مسیری که فایل دارد ادامه نمی‌دهد، چون ممکن است فایل‌های قبلی شما را تغییر دهد.',
      },
      {
        question: 'clone یا به‌روزرسانی با خطا متوقف شد. حالا چه کنم؟',
        answer:
          'متن کامل خطا را در همان گفتگو بفرستید. از دستیار بخواهید قبل از هر اقدامی علت را توضیح دهد و راهی پیشنهاد کند که فایل‌های موجود را حذف یا بازنویسی نکند.',
      },
      {
        question: 'اگر دستیار سؤال فنی پرسید و جوابش را ندانستم چه کنم؟',
        answer:
          'صادقانه بگویید که پاسخ را نمی‌دانید یا نمی‌خواهید خودتان انتخاب کنید. از دستیار بخواهید گزینهٔ پیشنهادی خودش را با دلیل و به زبان ساده توضیح دهد.',
      },
    ],
  },
  en: {
    eyebrow: 'If you get stuck',
    title: 'Answers to common questions',
    description:
      'If the work stops, keep the full error message and send it in the same conversation. In most cases, the assistant can continue from there.',
    items: [
      {
        question: 'Why is the copy button disabled?',
        answer:
          'For a new project, enter both the project name and its location. The copy button becomes available when both fields are filled in.',
      },
      {
        question: 'My assistant cannot find the requested skill. What should I do?',
        answer:
          'Ask it to confirm that it opened the root of the cloned project and read AGENTS.md. If it still cannot find the skill, the wrong folder may be open in VS Code.',
      },
      {
        question: 'The selected location already contains a project. What should I do?',
        answer:
          'Choose a different name or folder. The assistant stops on purpose because continuing could overwrite or mix with files that are already there.',
      },
      {
        question: 'Clone or update stopped with an error. What should I do?',
        answer:
          'Paste the full error into the same conversation. Ask the assistant to explain the cause before taking action and to suggest a fix that does not delete or overwrite existing files.',
      },
      {
        question: 'What if the assistant asks a technical question I cannot answer?',
        answer:
          'Say that you do not know the answer or do not want to choose yourself. Ask the assistant to recommend an option and explain the tradeoff in plain language.',
      },
    ],
  },
} satisfies Localized<FaqContent>
