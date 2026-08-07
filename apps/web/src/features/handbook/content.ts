export type PromptField = {
  id: string
  label: string
  placeholder: string
  promptPlaceholder: string
  direction?: 'auto' | 'ltr'
}

export type PromptValues = Record<string, string>

export type HandbookPrompt = {
  id: 'create' | 'update' | 'maintain'
  number: string
  label: string
  title: string
  description: string
  skills: string
  prompt: string
  fields?: PromptField[]
}

export function renderPrompt(prompt: HandbookPrompt, values: PromptValues): string {
  return (prompt.fields ?? []).reduce((preparedPrompt, field) => {
    const value = values[field.id]?.trim()

    return value
      ? preparedPrompt.replaceAll(field.promptPlaceholder, value)
      : preparedPrompt
  }, prompt.prompt)
}

export const handbookPrompts: HandbookPrompt[] = [
  {
    id: 'create',
    number: '۰۱',
    label: 'شروع یک پروژه',
    title: 'پروژهٔ جدید بسازید',
    description:
      'نام و مسیر پروژهٔ جدید را وارد کنید؛ prompt آماده می‌شود تا دستیار قالب Forge را clone، در VS Code باز و پایهٔ پروژه را آماده کند.',
    skills: 'git clone  →  product-details  +  bootstrap-project',
    fields: [
      {
        id: 'projectName',
        label: 'نام جدید پروژه',
        placeholder: 'مثلاً sales-dashboard',
        promptPlaceholder: '[نام جدید پروژه]',
        direction: 'auto',
      },
      {
        id: 'parentPath',
        label: 'مسیر والد پروژه',
        placeholder: 'مثلاً C:\\Projects یا /Users/name/Projects',
        promptPlaceholder: '[مسیر دلخواه روی کامپیوتر من]',
        direction: 'ltr',
      },
    ],
    prompt: `می‌خواهم با OmegaForge یک پروژهٔ جدید بسازم.

نام پروژه: [نام جدید پروژه]
مسیر والد پروژه: [مسیر دلخواه روی کامپیوتر من]

ابتدا بررسی کن که مسیر نهایی [مسیر دلخواه روی کامپیوتر من]/[نام جدید پروژه] وجود ندارد یا پروژهٔ دیگری در آن نیست. اگر مسیر اشغال است، قبل از هر اقدامی از من مسیر دیگری بخواه.

سپس repository زیر را در همان مسیر نهایی clone کن؛ فقط روی نسخهٔ clone‌شده کار کن و repository اصلی OmegaForge را تغییر نده:
https://github.com/omega-do-it-solutions/OmegaForge

بعد از clone موفق، پوشهٔ پروژهٔ جدید را در VS Code باز کن و از همان پوشه کار را ادامه بده. فقط پس از این مرحله، از skill product-details استفاده کن و با پرسش‌های کوتاه، اطلاعات محصول را در docs/product.md کامل کن.

بعد از کامل شدن product.md، از skill bootstrap-project استفاده کن تا مناسب‌ترین ساختار و فناوری‌ها را پیشنهاد بدهی. قبل از ساخت یا تغییر فایل‌ها، فهرست دقیق تغییرات را به من نشان بده و برای شروع منتظر تأیید من بمان.

من فنی نیستم؛ لطفاً همه‌چیز را ساده و به فارسی توضیح بده.`,
  },
  {
    id: 'update',
    number: '۰۲',
    label: 'به‌روزرسانی Forge',
    title: 'پایهٔ پروژه را به‌روز کنید',
    description:
      'برای هم‌راستا کردن قواعد و راهنمایی‌های داخلی پروژه با نسخهٔ جدید OmegaForge، بدون دست‌زدن به کد مخصوص محصول.',
    skills: 'update-stack',
    prompt: `این پروژه قبلاً با OmegaForge ساخته شده است. لطفاً از skill update-stack استفاده کن تا فقط بخش‌های متعلق به OmegaForge، شامل راهنماها، skillها و وضعیت foundation، با نسخهٔ جدید هماهنگ شوند.

کد محصول، وابستگی‌ها، زیرساخت، تنظیمات اجرا، داده‌ها و نیازمندی‌های محصول را تغییر نده. ابتدا تفاوت‌ها را بررسی کن و اگر منبع یا نسخهٔ مورداعتماد لازم است، از من بپرس.

من فنی نیستم؛ نتیجه را کوتاه و به فارسی بگو.`,
  },
  {
    id: 'maintain',
    number: '۰۳',
    label: 'نگه‌داری پروژه',
    title: 'یک تغییر را با خیال راحت انجام دهید',
    description:
      'هدف‌تان را با زبان ساده بنویسید؛ دستیار skill مناسب Forge را انتخاب می‌کند و طبق قواعد آن، کار را انجام می‌دهد.',
    skills: 'relevant OmegaForge skill',
    prompt: `این پروژه با OmegaForge ساخته شده است. می‌خواهم این کار را انجام دهم:

[هدف یا مشکل خود را اینجا به زبان ساده بنویسید]

لطفاً ابتدا پروژه و docs/product.md را بررسی کن، سپس مناسب‌ترین skill OmegaForge را برای این کار انتخاب و طبق قوانین همان skill عمل کن. اگر تغییر مهمی نیاز به تأیید من دارد، فقط همان تأیید لازم را به فارسی از من بگیر. در پایان، نتیجه و روش بررسی انجام‌شده را کوتاه و قابل‌فهم بگو.`,
  },
]

export const navItems = [
  { href: '#start', label: 'شروع' },
  { href: '#workflows', label: 'مسیرها' },
  { href: '#how-it-works', label: 'روش استفاده' },
]
