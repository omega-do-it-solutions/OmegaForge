import type { Localized, SectionHeading } from '../types.ts'

type PublicProjectContent = {
  privacy: {
    title: string
    description: string
  }
  contribution: SectionHeading & {
    reportAction: string
    suggestionAction: string
    translationAction: string
  }
  freshness: {
    manualVersion: string
    forgeVersion: string
    updated: string
    changelogAction: string
  }
}

export const publicProjectContent = {
  fa: {
    privacy: {
      title: 'اطلاعات حساس را در پرامپت نگذارید',
      description:
        'این سایت چیزی که می‌نویسید را ذخیره نمی‌کند. اما پس از آنکه پرامپت را در Codex، Claude یا سرویس دیگری می‌گذارید، قواعد حریم خصوصی همان سرویس اعمال می‌شود. رمز، کلید دسترسی و دادهٔ واقعی مشتریان را وارد نکنید.',
    },
    contribution: {
      eyebrow: 'یک پروژهٔ عمومی',
      title: 'اگر مشکلی دیدید، به ما خبر بدهید',
      description:
        'متن نامفهوم، مشکل فنی یا ترجمهٔ بهتری پیدا کردید؟ یک issue در GitHub باز کنید تا پیگیری‌اش کنیم.',
      reportAction: 'گزارش مشکل',
      suggestionAction: 'پیشنهاد برای متن',
      translationAction: 'کمک به ترجمه',
    },
    freshness: {
      manualVersion: 'راهنمای OmegaForge v0.2.0',
      forgeVersion: 'هماهنگ با OmegaForge v0.5.0',
      updated: 'آخرین بازبینی: اوت ۲۰۲۶',
      changelogAction: 'مشاهدهٔ تغییرات راهنما',
    },
  },
  en: {
    privacy: {
      title: 'Keep sensitive information out of your prompts',
      description:
        'This site does not store what you enter. After you paste a prompt into Codex, Claude, or another service, that service’s privacy policy applies. Do not include passwords, access keys, or real customer data.',
    },
    contribution: {
      eyebrow: 'A public project',
      title: 'Tell us when something needs fixing',
      description:
        'Found unclear wording, a technical problem, or a better translation? Open a GitHub issue so we can follow it up.',
      reportAction: 'Report a problem',
      suggestionAction: 'Suggest clearer copy',
      translationAction: 'Contribute a translation',
    },
    freshness: {
      manualVersion: 'OmegaForge Manual v0.2.0',
      forgeVersion: 'Aligned with OmegaForge v0.5.0',
      updated: 'Last reviewed: August 2026',
      changelogAction: 'View manual changelog',
    },
  },
} satisfies Localized<PublicProjectContent>
