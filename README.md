# راهنمای داخلی OmegaForge

این مخزن در شاخهٔ `manual` یک وب‌سایت ساده و فارسی‌زبان برای همکاران غیر فنی
است. راهنما به آن‌ها کمک می‌کند برای ساخت، به‌روزرسانی و نگه‌داری پروژه‌های
ساخته‌شده با OmegaForge، دستور مناسب را کپی و در Codex یا Claude وارد کنند.

وب‌سایت هیچ حساب کاربری، پایگاه داده، فایل آپلودی یا اتصال مستقیم به سرویس‌های
هوش مصنوعی ندارد.

## پیش‌نیازها

- Node.js 20.19 یا جدیدتر
- pnpm 11.11 یا جدیدتر

## اجرای محلی

```sh
pnpm install
pnpm dev
```

سپس وب‌سایت را در `http://localhost:5173` باز کنید.

## بررسی و ساخت

```sh
pnpm lint
pnpm typecheck
pnpm check
pnpm build
pnpm --filter @omega-forge/handbook preview
```

خروجی استاتیک تولیدشده در `apps/web/dist` قرار می‌گیرد. دستور `preview` فقط برای
بررسی محلی خروجی تولید است و سرویس تولید نیست.

## پیکربندی محلی

یک `.env.example` در ریشهٔ مخزن وجود دارد. برای توسعهٔ محلی، در صورت نبودن فایل
`.env`، آن را از نمونه بسازید:

```sh
cp .env.example .env
```

وب‌سایت راهنما متغیر محیطی یا راز مخصوص به خود ندارد. مقادیر موجود در `.env`
فقط برای پروفایل اختیاری SeaweedFS در قالب OmegaForge هستند؛ راهنمای فعلی از آن
استفاده نمی‌کند. `.env` را commit نکنید.

## استقرار

Cloudflare Pages باید به مخزن GitHub متصل شود و شاخهٔ `manual` را به‌عنوان
Production branch دریافت کند. در تنظیمات پروژه این مقادیر را وارد کنید:

```text
Root directory: /
Build command: pnpm install --frozen-lockfile && pnpm check && pnpm build
Build output directory: apps/web/dist
```

پس از هر push به `manual`، Cloudflare Pages ساخت و انتشار نسخهٔ جدید را انجام
می‌دهد. اتصال زیردامنه و مجوزهای Cloudflare یک کار عملیاتی جداگانه است و هیچ
کلید یا رازی در این مخزن نگه‌داری نمی‌شود.

## نگه‌داری محتوا

`main` منبع قالب OmegaForge است و با `manual` ادغام نمی‌شود. هنگام تغییر قواعد
یا skillهای OmegaForge در `main`، محتوای فارسی و promptهای شاخهٔ `manual` را
متناسب با آن به‌روزرسانی کنید.
