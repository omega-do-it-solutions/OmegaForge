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
    eyebrow: 'برای engineering workstation',
    title: 'یک مدل اجرایی برای همکاری جدی با عامل AI',
    description:
      'Forge وابستگی runtime نیست. context، قراردادهای مهندسی و skillها داخل repository نسخه‌بندی می‌شوند تا عامل با معماری واقعی پروژه کار کند و خروجی قابل بازبینی تحویل دهد.',
    traits: ['Stack-aware', 'Feature-sized', 'Verifiable'],
    flowTitle: 'از outcome تا diff بررسی‌شده',
    flowDescription:
      'هر درخواست از یک مسیر قابل دنبال‌کردن عبور می‌کند؛ context و شواهد همراه کد باقی می‌مانند، نه فقط در حافظهٔ گفتگو.',
    flowItems: [
      {
        label: 'هدف',
        title: 'Outcome را تعریف می‌کنید',
        description: 'رفتار مورد انتظار، محدودیت‌ها و معیار پایان را می‌نویسید.',
      },
      {
        label: 'Context',
        title: 'عامل پروژه را می‌خواند',
        description: 'محصول، قرارداد مهندسی، کد و آزمون‌های موجود بررسی می‌شوند.',
      },
      {
        label: 'اجرا',
        title: 'Skill درست مسیر را هدایت می‌کند',
        description: 'تغییر در boundary مالک رفتار و به‌اندازهٔ یک slice کامل انجام می‌شود.',
      },
      {
        label: 'شواهد',
        title: 'Diff و verification تحویل می‌گیرید',
        description: 'تغییر، آزمون‌ها، تصمیم‌ها و محدودیت‌های باقی‌مانده روشن گزارش می‌شوند.',
      },
    ],
    contextTitle: 'عامل چه چیزی را می‌خواند؟',
    contextDescription: 'چهار منبع کوچک، context پایدار پروژه را می‌سازند.',
    contextSources: [
      {
        path: 'docs/product.md',
        title: 'رفتار محصول',
        description: 'نیازها، کاربران و قواعد کسب‌وکار',
      },
      {
        path: 'AGENTS.md',
        title: 'قرارداد مهندسی',
        description: 'boundaryها، کیفیت و ایمنی',
      },
      {
        path: 'docs/ai/',
        title: 'پروفایل فنی',
        description: 'معماری و ساختار انتخاب‌شده',
      },
      {
        path: '.agents/skills/',
        title: 'رویهٔ اجرا',
        description: 'راهنمای تخصصی متناسب با task',
      },
    ],
    controlTitle: 'چه چیزی در کنترل شما می‌ماند؟',
    controlDescription:
      'Forge سرعت را بالا می‌برد، اما مسئولیت مهندسی را پنهان یا حذف نمی‌کند.',
    controlItems: [
      {
        title: 'Approvalهای مهم',
        description: 'تغییرات حساس و destructive پیش از اجرا متوقف می‌شوند.',
      },
      {
        title: 'Review و امنیت',
        description: 'diff، تصمیم‌ها و failure pathها برای بررسی شما قابل مشاهده‌اند.',
      },
      {
        title: 'Release و production',
        description: 'استقرار و عملیات production همچنان authorization صریح می‌خواهند.',
      },
    ],
  },
  en: {
    eyebrow: 'For the engineering workstation',
    title: 'An operating model for serious AI collaboration',
    description:
      'Forge is not a runtime dependency. Context, engineering contracts, and skills are versioned inside the repository so the agent works with the real architecture and returns reviewable evidence.',
    traits: ['Stack-aware', 'Feature-sized', 'Verifiable'],
    flowTitle: 'From outcome to reviewed diff',
    flowDescription:
      'Every request moves through a traceable path. Context and evidence remain with the code instead of living only in chat memory.',
    flowItems: [
      {
        label: 'Intent',
        title: 'You define the outcome',
        description: 'State the expected behavior, constraints, and definition of done.',
      },
      {
        label: 'Context',
        title: 'The agent reads the project',
        description: 'Product intent, the engineering contract, existing code, and tests are inspected.',
      },
      {
        label: 'Execution',
        title: 'The right skill guides the work',
        description: 'The change lands with its behavior owner as one complete vertical slice.',
      },
      {
        label: 'Evidence',
        title: 'You receive a diff and verification',
        description: 'Changes, checks, decisions, and remaining constraints are reported clearly.',
      },
    ],
    contextTitle: 'What does the agent read?',
    contextDescription: 'Four small sources create durable project context.',
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
    controlTitle: 'What remains under your control?',
    controlDescription:
      'Forge increases speed without hiding or removing engineering responsibility.',
    controlItems: [
      {
        title: 'Important approvals',
        description: 'Sensitive and destructive changes stop before execution.',
      },
      {
        title: 'Review and security',
        description: 'Diffs, decisions, and failure paths remain visible for review.',
      },
      {
        title: 'Release and production',
        description: 'Deployment and production operations still require explicit authorization.',
      },
    ],
  },
} satisfies Localized<TechnicalGuideContent>
