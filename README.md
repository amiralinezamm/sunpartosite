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
