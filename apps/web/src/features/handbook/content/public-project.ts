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
      title: 'حریم خصوصی را درست در نظر بگیرید',
      description:
        'این راهنما ورودی‌های شما را ذخیره نمی‌کند. اما وقتی prompt را در یک دستیار هوش مصنوعی می‌گذارید، پردازش آن تابع سیاست حریم خصوصی همان سرویس است. هیچ رمز، کلید دسترسی یا دادهٔ حساس واقعی را وارد نکنید.',
    },
    contribution: {
      eyebrow: 'یک پروژهٔ عمومی',
      title: 'کمک کنید این راهنما بهتر شود.',
      description:
        'اگر جایی مبهم بود، ترجمه‌ای بهتر داشتید یا به مشکلی برخوردید، آن را در GitHub با ما در میان بگذارید.',
      reportAction: 'گزارش مشکل',
      suggestionAction: 'پیشنهاد برای متن',
      translationAction: 'کمک به ترجمه',
    },
    freshness: {
      manualVersion: 'راهنمای OmegaForge v0.1.0',
      forgeVersion: 'هماهنگ با OmegaForge v0.5.0',
      updated: 'آخرین بازبینی: اوت ۲۰۲۶',
      changelogAction: 'مشاهدهٔ تغییرات راهنما',
    },
  },
  en: {
    privacy: {
      title: 'Understand the privacy boundary',
      description:
        'This handbook does not store your entries. Once you paste a prompt into an AI assistant, its processing follows that service’s privacy policy. Never include passwords, access keys, or real sensitive data.',
    },
    contribution: {
      eyebrow: 'A public project',
      title: 'Help make this handbook better.',
      description:
        'If something is unclear, you have a better translation, or you find a problem, share it with us on GitHub.',
      reportAction: 'Report a problem',
      suggestionAction: 'Suggest clearer copy',
      translationAction: 'Contribute a translation',
    },
    freshness: {
      manualVersion: 'OmegaForge Manual v0.1.0',
      forgeVersion: 'Aligned with OmegaForge v0.5.0',
      updated: 'Last reviewed: August 2026',
      changelogAction: 'View manual changelog',
    },
  },
} satisfies Localized<PublicProjectContent>
