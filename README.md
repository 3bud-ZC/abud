# ABUD Platform

منصة شخصية/تجارية مبنية بـ Next.js (App Router) وتضم:
- الموقع العام: الرئيسية، من أنا، الخدمات، الأعمال، المدونة، الموارد، تواصل.
- لوحة إدارة: تسجيل دخول، إعدادات، مدونة، بورتفوليو، خدمات، رسائل، نشرة بريدية.
- API داخلي لهذه الأقسام.

## المتطلبات
- Node.js 18+
- PostgreSQL
- npm

## تشغيل محلي سريع
1. `npm install`
2. انسخ `.env.example` إلى `.env` واضبط القيم.
3. جهّز قاعدة البيانات:
   - `npm run db:generate`
   - `npm run db:push`
   - `npm run db:seed`
4. شغّل المشروع: `npm run dev`

## متغيرات بيئة مهمة
- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

ملاحظة أمان: `ADMIN_PASSWORD` يجب أن تكون قوية (12+ وتحتوي حرف كبير/صغير ورقم ورمز).

## أوامر مفيدة
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
- `npm run db:seed-admin`

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Framer Motion

## النشر
يوجد workflow للنشر في:
- `.github/workflows/deploy.yml`
