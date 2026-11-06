# سان پرتو انرژی — وب‌سایت رسمی

وب‌سایت تک‌صفحه‌ای شرکت سان پرتو انرژی (SunParto Energy) — طراحی، تامین تجهیزات و اجرای سیستم‌های برق خورشیدی.
ساخته‌شده با React، Vite و Tailwind CSS.

## اجرا

```bash
npm install
npm run dev      # سرور توسعه روی پورت 3000
npm run build    # خروجی نهایی در dist/ (صفحه به‌صورت prerender ساخته می‌شود)
npm run preview  # پیش‌نمایش خروجی نهایی
npm run lint     # بررسی TypeScript
```

## ساختار

- `src/data/solarData.ts` — **تنها منبع داده‌ها** (اطلاعات شرکت، خدمات، پروژه‌ها، سوالات متداول، نظرات مشتریان)
- `content/site.ts` — نمای ساده‌ای از همان داده‌ها برای کامپوننت‌ها (این فایل را ویرایش نکنید)
- `src/components/` — بخش‌های صفحه
- `scripts/prerender.mjs` — در زمان build، HTML کامل صفحه را داخل `dist/index.html` قرار می‌دهد تا موتورهای جستجو بدون اجرای جاوااسکریپت محتوا را ببینند
- `public/` — لوگوها، آیکون‌ها، تصویر اشتراک‌گذاری (`og-image.png`)، `robots.txt` و `sitemap.xml`

موارد محتوایی باقی‌مانده در `CONTENT-TODO.md` ثبت شده‌اند.

## آمار بازدید (`/admin`)

داشبورد خصوصی آمار روی همان Cloudflare Worker اجرا می‌شود و داده‌ها در دیتابیس رایگان D1 ذخیره می‌شوند.

- `src/analytics/tracker.ts` — ثبت رویدادها در مرورگر. نام، شماره تلفن، محتوای فرم و IP ذخیره نمی‌شود.
- `worker/` — دریافت رویدادها (`/api/t`)، ورود مدیر، گزارش‌ها و صفحه داشبورد (`worker/dashboard.html`)
- رمز ورود، Secret با نام `ADMIN_PASSWORD` است: `npx wrangler secret put ADMIN_PASSWORD`
- برای حذف بازدید خودتان از آمار: یک بار `https://sunparto.ir/?notrack=1` را روی آن دستگاه باز کنید (`?notrack=0` برمی‌گرداند).
- اجرای محلی: `npm run build` و سپس `npm run worker:dev`، با رمز آزمایشی در فایل `.dev.vars`

