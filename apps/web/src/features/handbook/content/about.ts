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
    eyebrow: 'دربارهٔ ما و این پروژه',
    title: 'چرا OmegaForge را ساختیم؟',
    introduction:
      'ما Omega Do هستیم؛ یک تیم دیجیتال مستقر در وین که در طراحی بصری، توسعهٔ وب و اپلیکیشن و عامل‌ها و اتوماسیون‌های هوش مصنوعی کار می‌کنیم. OmegaForge تجربهٔ فنی ما را به یک foundation عمومی تبدیل می‌کند؛ برای کسی که نمی‌خواهد درگیر جزئیات مهندسی شود و برای متخصصی که می‌خواهد AI را به‌عنوان یک همکار منظم در workstation خود به کار بگیرد.',
    points: [
      {
        title: 'مسئله‌ای که دیدیم',
        description:
          'صاحبان ایده و مهندسان هر دو زمان زیادی را صرف ساختن دوبارهٔ context، قواعد، ساختار پروژه و روش نگه‌داری برای عامل‌های AI می‌کنند؛ این دانش باید همراه repository باقی بماند.',
      },
      {
        title: 'چرا یک prompt کافی نبود',
        description:
          'هوش مصنوعی می‌تواند کد بنویسد، اما یک پروژهٔ قابل‌اعتماد به حافظهٔ محصول، مرزهای مهندسی، بررسی کیفیت و مسیر امن برای تغییرات بعدی هم نیاز دارد.',
      },
      {
        title: 'راهی که انتخاب کردیم',
        description:
          'OmegaForge این تجربه را در یک قالب عمومی، مجموعه‌ای از skillهای تخصصی و قواعد قابل‌بررسی قرار می‌دهد؛ شما هدف را می‌گویید و دستیار جزئیات فنی را مدیریت می‌کند.',
      },
    ],
    websiteAction: 'آشنایی با Omega Do',
    repositoryAction: 'مشاهدهٔ repository',
  },
  en: {
    eyebrow: 'About us and this project',
    title: 'Why did we build OmegaForge?',
    introduction:
      'We are Omega Do, a Vienna-based digital team working across visual design, web and app development, and AI agents and automation. OmegaForge turns our engineering experience into a public foundation—for someone who does not want to manage engineering details and for a specialist who wants AI to operate as a disciplined teammate in their workstation.',
    points: [
      {
        title: 'The problem we saw',
        description:
          'Product owners and engineers both spend too much time rebuilding context, rules, project structure, and maintenance practices for AI agents. That knowledge should remain with the repository.',
      },
      {
        title: 'Why one prompt was not enough',
        description:
          'AI can write code, but a dependable project also needs durable product context, engineering boundaries, quality checks, and a safe path for future changes.',
      },
      {
        title: 'The path we chose',
        description:
          'OmegaForge turns that experience into a public template, specialized skills, and reviewable rules. You describe the goal; your assistant manages the technical details.',
      },
    ],
    websiteAction: 'Meet Omega Do',
    repositoryAction: 'View the repository',
  },
} satisfies Localized<AboutContent>
