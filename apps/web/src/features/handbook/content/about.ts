import type { Localized, SectionPoint } from '../types.ts'

type AboutContent = {
  eyebrow: string
  title: string
  introduction: string
  points: SectionPoint[]
  websiteAction: string
  repositoryAction: string
}

export const aboutContent = {
  fa: {
    eyebrow: 'دربارهٔ Omega Do و OmegaForge',
    title: 'چرا OmegaForge را ساختیم؟',
    introduction:
      'ما Omega Do هستیم، یک تیم دیجیتال در وین. روی طراحی، وب، اپلیکیشن و ابزارهای هوش مصنوعی کار می‌کنیم. OmegaForge از یک مشکل تکراری در پروژه‌های خودمان شروع شد: هر بار که یک دستیار جدید وارد پروژه می‌شد، باید همهٔ چیز را از ابتدا برایش توضیح می‌دادیم.',
    points: [
      {
        title: 'مشکل، فراموش شدن زمینهٔ پروژه بود',
        description:
          'هدف محصول، قواعد مهندسی و دلیل تصمیم‌ها فقط در چت می‌ماندند. با تمام شدن یا تعویض گفتگو، بخش مهمی از این اطلاعات هم از دست می‌رفت.',
      },
      {
        title: 'یک پرامپت برای یک پروژهٔ واقعی کافی نیست',
        description:
          'پروژه فقط با نوشتن کد تمام نمی‌شود. باید معلوم باشد هر بخش چرا وجود دارد، تغییرات چطور بررسی می‌شوند و کدام تصمیم‌ها به تأیید صاحب پروژه نیاز دارند.',
      },
      {
        title: 'اطلاعات مهم را کنار کد نگه داشتیم',
        description:
          'OmegaForge نیازمندی‌های محصول، قواعد مهندسی و راهنمای هر نوع کار را در فایل‌هایی نگه می‌دارد که همراه پروژه نسخه‌بندی می‌شوند. به این ترتیب، دستیار جدید هم می‌تواند کار را از جای درست ادامه دهد.',
      },
    ],
    websiteAction: 'آشنایی با Omega Do',
    repositoryAction: 'دیدن مخزن پروژه',
  },
  en: {
    eyebrow: 'About Omega Do and OmegaForge',
    title: 'Why did we build OmegaForge?',
    introduction:
      'We are Omega Do, a digital team in Vienna working on design, web and app development, and AI tools. OmegaForge started with a problem we kept running into on our own projects: every time a new assistant joined the work, we had to explain the whole project again.',
    points: [
      {
        title: 'Project context kept getting lost',
        description:
          'The product goal, engineering rules, and reasons behind earlier decisions lived in chat. When the conversation ended or changed, much of that useful context disappeared with it.',
      },
      {
        title: 'One prompt is not enough for a real project',
        description:
          'A project needs more than generated code. It also needs a clear structure, a way to check changes, and rules for decisions that should stay with the project owner.',
      },
      {
        title: 'We kept the important information beside the code',
        description:
          'OmegaForge stores product requirements, engineering rules, and task-specific guidance in versioned project files. That gives every new assistant a reliable place to start.',
      },
    ],
    websiteAction: 'Meet Omega Do',
    repositoryAction: 'View the project repository',
  },
} satisfies Localized<AboutContent>
