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

توضیحات را روشن و مختصر و به همان زبانی که در گفتگو استفاده می‌کنم ارائه بده.`,
  },
  {
    id: 'update',
    label: 'به‌روزرسانی Forge',
    title: 'پایهٔ پروژه را به‌روز کنید',
    description:
      'قواعد و راهنمایی‌های پایهٔ پروژه را با نسخهٔ جدید OmegaForge هم‌راستا کنید؛ بدون دست‌زدن به کد مخصوص محصول.',
    skills: 'update-stack',
    prompt: `این پروژه قبلاً با OmegaForge ساخته شده است. لطفاً از skill update-stack استفاده کن تا فقط بخش‌های متعلق به OmegaForge، شامل راهنماها، skillها و وضعیت foundation، با نسخهٔ جدید هماهنگ شوند.

کد محصول، وابستگی‌ها، زیرساخت، تنظیمات اجرا، داده‌ها و نیازمندی‌های محصول را تغییر نده. ابتدا تفاوت‌ها را بررسی کن و اگر منبع یا نسخهٔ مورداعتماد لازم است، از من بپرس.

نتیجه را روشن و کوتاه و به همان زبانی که در گفتگو استفاده می‌کنم بگو.`,
  },
  {
    id: 'maintain',
    label: 'نگه‌داری پروژه',
    title: 'یک تغییر را با خیال راحت انجام دهید',
    description:
      'هدف‌تان را با زبان ساده بنویسید؛ دستیار skill مناسب Forge را انتخاب می‌کند و طبق قواعد آن، کار را انجام می‌دهد.',
    skills: 'relevant OmegaForge skill',
    prompt: `این پروژه با OmegaForge ساخته شده است. می‌خواهم این کار را انجام دهم:

[هدف یا مشکل خود را اینجا به زبان ساده بنویسید]

لطفاً ابتدا پروژه و docs/product.md را بررسی کن، سپس مناسب‌ترین skill OmegaForge را برای این کار انتخاب و طبق قوانین همان skill عمل کن. اگر تغییر مهمی نیاز به تأیید من دارد، فقط همان تأیید لازم را به همان زبانی که در گفتگو استفاده می‌کنم از من بگیر. در پایان، نتیجه و روش بررسی انجام‌شده را کوتاه و قابل‌فهم و به همان زبان بگو.`,
  },
]

const englishPrompts: HandbookPrompt[] = [
  {
    id: 'create',
    label: 'Start a project',
    title: 'Create a new project',
    description:
      'Enter the new project name and location. The prepared prompt tells your assistant to clone Forge, open it in VS Code, and establish the project foundation.',
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

First, verify that the final path [preferred location on my computer]/[new project name] does not already exist or contain another project. If the path is occupied, ask me for another location before taking any action.

Then clone the repository below into that final path. Work only on the cloned copy and do not change the original OmegaForge repository:
https://github.com/omega-do-it-solutions/OmegaForge

After the clone succeeds, open the new project folder in VS Code and continue working from that folder. Only then use the product-details skill and ask short questions to complete the product brief in docs/product.md.

Once product.md is complete, use the bootstrap-project skill to recommend the most suitable structure and technologies. Before creating or changing files, show me the exact list of intended changes and wait for my approval to begin.

Keep explanations clear and concise, using the same language I use in our conversation.`,
  },
  {
    id: 'update',
    label: 'Update Forge',
    title: 'Update the project foundation',
    description:
      'Bring the project foundation and guidance in line with the latest OmegaForge version without touching product-specific code.',
    skills: 'update-stack',
    prompt: `This project was previously created with OmegaForge. Please use the update-stack skill to update only the OmegaForge-owned parts, including guidance, skills, and foundation state, to the newer version.

Do not change product code, dependencies, infrastructure, runtime configuration, data, or product requirements. Inspect the differences first, and ask me if you need a trusted source or version.

Summarize the result clearly and briefly, using the same language I use in our conversation.`,
  },
  {
    id: 'maintain',
    label: 'Maintain a project',
    title: 'Make a change with confidence',
    description:
      'Describe your goal in plain language. Your assistant selects the right Forge skill and completes the work according to its rules.',
    skills: 'relevant OmegaForge skill',
    prompt: `This project was created with OmegaForge. I want to do the following:

[Describe your goal or problem here in plain language]

First inspect the project and docs/product.md. Then choose the most appropriate OmegaForge skill for this work and follow that skill's rules. If an important change requires my approval, ask only for that required approval in the same language I use in our conversation. At the end, briefly explain the result and how it was verified in that same language.`,
  },
]

export const workflowsContent = {
  fa: {
    eyebrow: 'مسیرهای استفاده',
    title: 'برای هدف امروزتان، مسیر درست را انتخاب کنید.',
    description:
      'از promptهای آماده برای شروع سریع استفاده کنید یا مدل فنی Forge را برای کار در engineering workstation خود ببینید.',
    tabs: {
      ariaLabel: 'انتخاب نوع راهنمای OmegaForge',
      guided: 'promptهای آماده',
      technical: 'راهنمای فنی',
    },
    promptCard: {
      fieldsLegend: 'اطلاعات لازم برای آماده‌سازی prompt',
      fieldsTitle: 'اطلاعات پروژه را وارد کنید',
      fieldsDescription: 'این اطلاعات فقط در همین prompt استفاده می‌شود و جایی ذخیره نمی‌شود.',
      skillsLabel: 'SKILLهای مورد استفاده',
      copy: 'کپی کردن prompt',
      copied: 'کپی شد',
      missingFields: (labels) => `برای آماده شدن prompt، ${labels.join(' و ')} را وارد کنید.`,
      copyFailed: 'کپی خودکار انجام نشد؛ متن را انتخاب و کپی کنید.',
    },
    prompts: persianPrompts,
  },
  en: {
    eyebrow: 'Ways to use Forge',
    title: 'Choose the right path for today’s work.',
    description:
      'Use a prepared prompt for a fast start, or inspect Forge’s technical operating model for your engineering workstation.',
    tabs: {
      ariaLabel: 'Choose an OmegaForge guide',
      guided: 'Guided prompts',
      technical: 'Technical guide',
    },
    promptCard: {
      fieldsLegend: 'Information needed to prepare the prompt',
      fieldsTitle: 'Enter your project details',
      fieldsDescription: 'These details are used only in this prompt and are not stored anywhere.',
      skillsLabel: 'SKILLS USED',
      copy: 'Copy prompt',
      copied: 'Copied',
      missingFields: (labels) => `Enter ${labels.join(' and ')} to prepare the prompt.`,
      copyFailed: 'Automatic copy failed. Select the prompt text and copy it manually.',
    },
    prompts: englishPrompts,
  },
} satisfies Localized<WorkflowsContent>
