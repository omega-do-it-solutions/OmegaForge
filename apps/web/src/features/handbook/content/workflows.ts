import type {
  HandbookPrompt,
  Localized,
  PromptCardContent,
  SectionHeading,
} from '../types.ts'

type WorkflowsContent = SectionHeading & {
  tabs: {
    ariaLabel: string
    guided: string
    technical: string
  }
  promptCard: PromptCardContent
  prompts: HandbookPrompt[]
}

const persianPrompts: HandbookPrompt[] = [
  {
    id: 'create',
    label: 'پروژهٔ جدید',
    title: 'یک پروژه را از ابتدا راه بیندازید',
    description:
      'نام پروژه و محل ذخیرهٔ آن را وارد کنید. بعد متن آماده را برای دستیار بفرستید تا OmegaForge را در یک پوشهٔ تازه دریافت کند و مرحله‌به‌مرحله پروژه را با شما بسازد.',
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

پیش از هر کاری، مسیر نهایی [مسیر دلخواه روی کامپیوتر من]/[نام جدید پروژه] را بررسی کن. اگر این مسیر از قبل وجود دارد یا پروژهٔ دیگری در آن است، دست نگه دار و از من یک مسیر دیگر بخواه.

اگر مسیر خالی است، مخزن زیر را در همان‌جا clone کن. فقط روی نسخهٔ clone‌شده کار کن و مخزن اصلی OmegaForge را تغییر نده:
https://github.com/omega-do-it-solutions/OmegaForge

بعد از clone موفق، پوشهٔ پروژه را در VS Code باز کن و از همان پوشه ادامه بده. سپس از skill product-details استفاده کن، با پرسش‌های کوتاه و ساده اطلاعات محصول را از من بگیر و docs/product.md را کامل کن.

وقتی product.md کامل شد، از skill bootstrap-project استفاده کن و ساختار و فناوری‌های مناسب را پیشنهاد بده. پیش از ساختن یا تغییر دادن فایل‌ها، فهرست دقیق کارهایی را که می‌خواهی انجام دهی نشانم بده و برای شروع منتظر تأیید من بمان.

پاسخ‌هایت را کوتاه و روشن و به همان زبانی که در گفتگو استفاده می‌کنم بنویس.`,
  },
  {
    id: 'update',
    label: 'نسخهٔ جدید Forge',
    title: 'راهنماهای Forge را به‌روز کنید',
    description:
      'اگر پروژه‌تان با نسخهٔ قدیمی Forge ساخته شده، این متن فقط راهنماهای فنی Forge را به‌روز می‌کند و به کد محصول دست نمی‌زند.',
    skills: 'update-stack',
    prompt: `این پروژه قبلاً با OmegaForge ساخته شده است. از skill update-stack استفاده کن تا فقط فایل‌های متعلق به OmegaForge، شامل راهنماها، skillها و وضعیت foundation، با نسخهٔ جدید هماهنگ شوند.

کد محصول، وابستگی‌ها، زیرساخت، تنظیمات اجرا، داده‌ها و نیازمندی‌های محصول را تغییر نده. پیش از اعمال تغییرات، تفاوت‌ها را بررسی کن. اگر برای ادامه به نسخه یا منبع معتبری نیاز داری، از من بپرس.

در پایان، کوتاه بگو چه چیزی به‌روز شد، چه فایل‌هایی تغییر کردند و آیا اختلافی باقی مانده است. پاسخ را به همان زبانی که در گفتگو استفاده می‌کنم بنویس.`,
  },
  {
    id: 'maintain',
    label: 'نگه‌داری پروژه',
    title: 'قابلیتی اضافه کنید یا مشکلی را برطرف کنید',
    description:
      'کاری را که می‌خواهید به زبان ساده بنویسید. دستیار مستندات پروژه را می‌خواند، راهنمای مناسب Forge را پیدا می‌کند و نتیجه را بررسی می‌کند.',
    skills: 'relevant OmegaForge skill',
    prompt: `این پروژه با OmegaForge ساخته شده است. می‌خواهم این کار را انجام دهم:

[هدف یا مشکل خود را اینجا به زبان ساده بنویسید]

ابتدا پروژه و docs/product.md را بخوان. بعد مناسب‌ترین skill OmegaForge را برای این کار انتخاب کن و قواعدش را دنبال کن. اگر تغییر مهمی به تأیید من نیاز دارد، قبل از اجرا از من بپرس. در پایان، کوتاه توضیح بده چه چیزی تغییر کرده و چطور درست کار کردنش را بررسی کرده‌ای. پاسخ را به همان زبانی که در گفتگو استفاده می‌کنم بنویس.`,
  },
]

const englishPrompts: HandbookPrompt[] = [
  {
    id: 'create',
    label: 'New project',
    title: 'Set up a project from scratch',
    description:
      'Enter a name and choose where to save the project. Then send the prepared text to your assistant. It will download OmegaForge into a new folder and build the project with you, one decision at a time.',
    skills: 'git clone  →  product-details  +  bootstrap-project',
    fields: [
      {
        id: 'projectName',
        label: 'New project name',
        placeholder: 'For example, sales-dashboard',
        promptPlaceholder: '[new project name]',
        direction: 'auto',
      },
      {
        id: 'parentPath',
        label: 'Project parent path',
        placeholder: 'For example, C:\\Projects or /Users/name/Projects',
        promptPlaceholder: '[preferred location on my computer]',
        direction: 'ltr',
      },
    ],
    prompt: `I want to create a new project with OmegaForge.

Project name: [new project name]
Project parent path: [preferred location on my computer]

Before doing anything else, check the final path [preferred location on my computer]/[new project name]. If it already exists or contains another project, stop and ask me for a different location.

If the path is empty, clone this repository there. Work only on the cloned copy and do not change the original OmegaForge repository:
https://github.com/omega-do-it-solutions/OmegaForge

After the clone succeeds, open the new project folder in VS Code and continue from that folder. Then use the product-details skill. Ask me short, straightforward questions and use my answers to complete docs/product.md.

When product.md is complete, use the bootstrap-project skill and recommend a suitable structure and technology stack. Before creating or changing files, show me exactly what you plan to do and wait for my approval to begin.

Keep your replies short and clear, and use the same language I use in our conversation.`,
  },
  {
    id: 'update',
    label: 'New Forge version',
    title: 'Update the Forge guidance',
    description:
      'Use this when the project was built with an older Forge version. It updates Forge’s built-in task guidance without changing the product code.',
    skills: 'update-stack',
    prompt: `This project was created with OmegaForge. Use the update-stack skill to bring only the OmegaForge-owned files—its guidance, skills, and foundation state—up to date.

Do not change product code, dependencies, infrastructure, runtime configuration, data, or product requirements. Review the differences before applying them. If you need a trusted source or a specific version, ask me.

At the end, tell me what was updated, which files changed, and whether any conflicts remain. Keep the answer brief and use the same language I use in our conversation.`,
  },
  {
    id: 'maintain',
    label: 'Maintain a project',
    title: 'Add a feature or fix a problem',
    description:
      'Describe what you want in your own words. Your assistant reads the project, finds the relevant Forge guidance, makes the change, and checks the result.',
    skills: 'relevant OmegaForge skill',
    prompt: `This project was created with OmegaForge. I want to do the following:

[Describe your goal or problem here in plain language]

First read the project and docs/product.md. Then choose the most appropriate OmegaForge skill for this work and follow its rules. If an important change needs my approval, ask before making it. At the end, briefly tell me what changed and how you checked that it works. Use the same language I use in our conversation.`,
  },
]

export const workflowsContent = {
  fa: {
    eyebrow: 'متن‌های آماده',
    title: 'امروز می‌خواهید چه کاری انجام دهید؟',
    description:
      'برای شروع سریع، یکی از پرامپت‌های آماده را انتخاب کنید. اگر می‌خواهید جزئیات فنی را ببینید، تب دوم را باز کنید.',
    tabs: {
      ariaLabel: 'انتخاب نوع راهنمای OmegaForge',
      guided: 'پرامپت‌های آماده',
      technical: 'جزئیات فنی',
    },
    promptCard: {
      fieldsLegend: 'اطلاعات لازم برای آماده کردن پرامپت',
      fieldsTitle: 'نام و محل پروژه را وارد کنید',
      fieldsDescription: 'این اطلاعات فقط به متن زیر اضافه می‌شوند و در این سایت ذخیره نمی‌شوند.',
      skillsLabel: 'راهنماهای فنی مورد استفاده',
      copy: 'کپی کردن پرامپت',
      copied: 'کپی شد',
      missingFields: (labels) => `ابتدا ${labels.join(' و ')} را وارد کنید.`,
      copyFailed: 'کپی خودکار انجام نشد؛ متن را انتخاب و کپی کنید.',
    },
    prompts: persianPrompts,
  },
  en: {
    eyebrow: 'Ready-made prompts',
    title: 'What would you like to do today?',
    description:
      'Choose a prepared prompt to get started quickly. If you want the engineering details, open the second tab.',
    tabs: {
      ariaLabel: 'Choose an OmegaForge guide',
      guided: 'Ready-made prompts',
      technical: 'Technical details',
    },
    promptCard: {
      fieldsLegend: 'Details needed to prepare the prompt',
      fieldsTitle: 'Enter the project name and location',
      fieldsDescription: 'These details are added to the text below. This site does not store them.',
      skillsLabel: 'TECHNICAL GUIDANCE USED',
      copy: 'Copy prompt',
      copied: 'Copied',
      missingFields: (labels) => `Enter ${labels.join(' and ')} first.`,
      copyFailed: 'The copy button did not work. Select the text and copy it manually.',
    },
    prompts: englishPrompts,
  },
} satisfies Localized<WorkflowsContent>
