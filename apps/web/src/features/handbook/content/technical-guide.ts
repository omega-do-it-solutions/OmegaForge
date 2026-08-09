import type { Localized, SectionPoint } from '../types.ts'

type TechnicalGuideContent = {
  eyebrow: string
  title: string
  description: string
  traits: string[]
  flowTitle: string
  flowDescription: string
  flowItems: Array<{
    label: string
    title: string
    description: string
  }>
  contextTitle: string
  contextDescription: string
  contextSources: Array<{
    path: string
    title: string
    description: string
  }>
  controlTitle: string
  controlDescription: string
  controlItems: SectionPoint[]
}

export const technicalGuideContent = {
  fa: {
    eyebrow: 'جزئیات فنی',
    title: 'Forge چطور کار یک دستیار کدنویسی را هدایت می‌کند؟',
    description:
      'OmegaForge همراه برنامه اجرا نمی‌شود و وابستگی کد نیست. فایل‌های راهنمای آن در مخزن پروژه می‌مانند. دستیار پیش از تغییر کد، نیازمندی‌های محصول، معماری و قواعد اجرای کار را از همین فایل‌ها می‌خواند.',
    traits: ['قواعد کنار کد', 'هماهنگ با معماری', 'خروجی قابل بررسی'],
    flowTitle: 'وقتی یک تغییر می‌خواهید، چه اتفاقی می‌افتد؟',
    flowDescription:
      'دستیار مستقیم سراغ کد نمی‌رود. ابتدا درخواست را مشخص می‌کند، بخش مرتبط پروژه را می‌خواند، تغییر را در جای درست انجام می‌دهد و بعد نتیجه را بررسی می‌کند.',
    flowItems: [
      {
        label: 'تعریف کار',
        title: 'درخواست به یک کار مشخص تبدیل می‌شود',
        description: 'دستیار مشخص می‌کند چه رفتاری باید تغییر کند، چه محدودیتی وجود دارد و کار چه زمانی تمام است.',
      },
      {
        label: 'تحلیل',
        title: 'دستیار اول پروژه را می‌خواند',
        description: 'مستندات محصول، قواعد مهندسی، معماری، کد موجود و آزمون‌های مرتبط پیش از پیاده‌سازی بررسی می‌شوند.',
      },
      {
        label: 'پیاده‌سازی',
        title: 'تغییر در بخش درست پروژه انجام می‌شود',
        description: 'Forge راهنمای تخصصی مناسب را انتخاب می‌کند تا کد جدید در ماژول یا قابلیتی قرار بگیرد که مسئول همان رفتار است.',
      },
      {
        label: 'اعتبارسنجی',
        title: 'نتیجه پیش از تحویل بررسی می‌شود',
        description: 'بسته به نوع تغییر، آزمون‌ها، بررسی نوع‌ها و ساخت نهایی اجرا می‌شوند. هر محدودیت یا کار ناتمام هم در گزارش پایانی می‌آید.',
      },
    ],
    contextTitle: 'دستیار اول چه فایل‌هایی را می‌خواند؟',
    contextDescription: 'این چهار منبع به دستیار می‌گویند پروژه برای چه ساخته شده و کد چطور سازمان‌دهی شده است.',
    contextSources: [
      {
        path: 'docs/product.md',
        title: 'رفتار محصول',
        description: 'نیازها، کاربران و قواعد کسب‌وکار',
      },
      {
        path: 'AGENTS.md',
        title: 'قرارداد مهندسی',
        description: 'مرزهای معماری، معیارهای کیفیت و الزامات ایمنی',
      },
      {
        path: 'docs/ai/',
        title: 'پروفایل فنی',
        description: 'معماری و ساختار انتخاب‌شده',
      },
      {
        path: '.agents/skills/',
        title: 'رویهٔ اجرا',
        description: 'راهنمای تخصصی متناسب با نوع کار',
      },
    ],
    controlTitle: 'کجا هنوز تصمیم با شماست؟',
    controlDescription:
      'استفاده از Forge به معنای واگذار کردن همهٔ تصمیم‌ها نیست. تغییرات مهم همچنان باید دیده و در جای لازم تأیید شوند.',
    controlItems: [
      {
        title: 'تغییرات حساس',
        description: 'حذف فایل، بازنویسی داده یا یک تغییر مهم پیش از اجرا به شما اعلام می‌شود.',
      },
      {
        title: 'بازبینی کد',
        description: 'تغییرات، دلیل تصمیم‌ها و نتیجهٔ آزمون‌ها برای بازبینی شما قابل مشاهده می‌مانند.',
      },
      {
        title: 'انتشار نسخهٔ جدید',
        description: 'دستیار بدون درخواست صریح شما پروژه را منتشر نمی‌کند و به زیرساخت محیط عملیاتی دست نمی‌زند.',
      },
    ],
  },
  en: {
    eyebrow: 'Technical details',
    title: 'How does Forge guide an AI coding agent?',
    description:
      'OmegaForge does not ship with your application or run in production. Its guidance files stay in the project repository. Before changing code, the assistant reads those files to understand the product, the architecture, and the rules for the task.',
    traits: ['Rules live with the code', 'Respects the architecture', 'Produces reviewable work'],
    flowTitle: 'What happens when you request a change?',
    flowDescription:
      'The assistant does not jump straight into editing. It defines the task, reads the relevant part of the project, changes the right code, and checks the result.',
    flowItems: [
      {
        label: 'Scope',
        title: 'Turn the request into a defined task',
        description: 'The assistant identifies the expected behavior, important constraints, and what a finished result should look like.',
      },
      {
        label: 'Analysis',
        title: 'Read the project before editing it',
        description: 'Product documentation, engineering rules, architecture, existing code, and relevant tests are inspected first.',
      },
      {
        label: 'Implementation',
        title: 'Make the change in the right part of the codebase',
        description: 'Forge selects the relevant specialist guidance so new code stays with the feature or module that owns the behavior.',
      },
      {
        label: 'Validation',
        title: 'Check the result before handing it back',
        description: 'The assistant runs the relevant tests, type checks, and build, then reports anything that remains unresolved.',
      },
    ],
    contextTitle: 'What does the assistant read first?',
    contextDescription: 'These four sources explain what the project is for and how its code is organized.',
    contextSources: [
      {
        path: 'docs/product.md',
        title: 'Product behavior',
        description: 'Needs, users, and business rules',
      },
      {
        path: 'AGENTS.md',
        title: 'Engineering contract',
        description: 'Boundaries, quality, and safety',
      },
      {
        path: 'docs/ai/',
        title: 'Technical profile',
        description: 'Selected architecture and structure',
      },
      {
        path: '.agents/skills/',
        title: 'Execution procedure',
        description: 'Task-specific specialist guidance',
      },
    ],
    controlTitle: 'Which decisions still belong to you?',
    controlDescription:
      'Using Forge does not mean handing over every decision. Important changes remain visible and require approval where appropriate.',
    controlItems: [
      {
        title: 'Sensitive changes',
        description: 'Deleting files, rewriting data, and other high-impact changes are raised before they happen.',
      },
      {
        title: 'Code review',
        description: 'The diff, the reasons behind key decisions, and the results of checks remain available for review.',
      },
      {
        title: 'Releases and production',
        description: 'The assistant does not deploy the project or change production infrastructure unless you explicitly ask it to.',
      },
    ],
  },
} satisfies Localized<TechnicalGuideContent>
