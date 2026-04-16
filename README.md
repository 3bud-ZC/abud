# ABUD Platform

منصة رقمية متكاملة عربية أولى — متجر، مدونة، بورتفوليو، خدمات، لوحة تحكم.

**🚀 Deployed on Railway**

---

## المتطلبات

- Node.js 18+
- PostgreSQL (أو أي قاعدة بيانات تدعمها Prisma)
- npm أو pnpm

---

## الإعداد السريع

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env` وعدّل القيم:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@localhost:5432/abud_platform"
SESSION_SECRET="super-secret-key-min-32-chars-long-here"
UPLOAD_DIR="public/uploads"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. إعداد قاعدة البيانات

```bash
npm run db:generate   # توليد Prisma Client
npm run db:push       # رفع المخطط إلى قاعدة البيانات
npm run db:seed       # تهيئة البيانات الأولية
```

### 4. تشغيل التطبيق

```bash
npm run dev
```

افتح المتصفح على [http://localhost:3000](http://localhost:3000)

---

## بيانات الدخول الإدارية (بعد الـ seed)

| البيانات | القيمة |
|----------|--------|
| البريد | `admin@abud.com` |
| كلمة المرور | `admin123456` |
| رابط الإدارة | `/admin` |

> ⚠️ غيّر كلمة المرور فور أول تسجيل دخول.

---

## هيكل المشروع

```
src/
├── app/
│   ├── (site)/          # الصفحات العامة
│   │   ├── page.tsx         الرئيسية
│   │   ├── products/        المنتجات
│   │   ├── blog/            المدونة
│   │   ├── portfolio/       البورتفوليو
│   │   ├── services/        الخدمات
│   │   ├── contact/         التواصل
│   │   └── checkout/        الدفع
│   ├── admin/           # لوحة التحكم
│   │   ├── login/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── blog/
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── messages/
│   │   ├── payments/
│   │   └── settings/
│   └── api/             # API Routes
│       ├── auth/
│       ├── products/
│       ├── blog/
│       ├── portfolio/
│       ├── contact/
│       ├── orders/
│       ├── services/
│       ├── payments/
│       ├── settings/
│       └── upload/
├── lib/
│   ├── prisma.ts
│   ├── session.ts
│   └── utils.ts
└── middleware.ts
prisma/
├── schema.prisma
└── seed.ts
```

---

## أوامر مفيدة

```bash
npm run dev          # تشغيل بيئة التطوير
npm run build        # بناء الإنتاج
npm run db:studio    # فتح Prisma Studio
npm run db:seed      # تهيئة بيانات أولية
npm run db:reset     # إعادة تعيين قاعدة البيانات والـ seed
```

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **Next.js 14** | إطار العمل الرئيسي (App Router) |
| **TypeScript** | كتابة آمنة للكود |
| **Tailwind CSS** | التنسيق والتصميم |
| **Prisma ORM** | التعامل مع قاعدة البيانات |
| **PostgreSQL** | قاعدة البيانات |
| **Framer Motion** | الحركات والانتقالات |
| **JOSE** | JWT وإدارة الجلسات |
| **bcryptjs** | تشفير كلمات المرور |
| **Lucide React** | الأيقونات |
| **React Hook Form + Zod** | إدارة والتحقق من النماذج |
| **react-hot-toast** | إشعارات المستخدم |

---

## الترخيص

هذا المشروع خاص بـ ABUD Platform. جميع الحقوق محفوظة.
