# 🚀 نشر ABUD على Vercel + ربط دومين Hostinger

دليل خطوة بخطوة لنشر المنصة مجاناً 100% وربطها بدومينك من Hostinger.

---

## 🧱 المعمارية المجانية

| المكوّن | المنصة | الخطة | الكلفة |
|---|---|---|---|
| استضافة Next.js | **Vercel** | Hobby | مجاني |
| قاعدة البيانات | **Neon (PostgreSQL)** | Free | مجاني (3GB) |
| الدومين | **Hostinger** | عندك بالفعل | — |
| SSL / HTTPS | Vercel | تلقائي | مجاني |
| CDN عالمي | Vercel Edge | تلقائي | مجاني |

---

## 1️⃣ إنشاء قاعدة بيانات على Neon

1. ادخل على [https://neon.tech](https://neon.tech) → **Sign up with GitHub**
2. أنشئ مشروع جديد:
   - **Project name:** `abud-platform`
   - **Postgres version:** أحدث إصدار
   - **Region:** اختر أقرب منطقة (مثلاً `EU - Frankfurt` لمصر)
3. بعد الإنشاء، انسخ **Connection string** بصيغة:
   ```
   postgresql://USER:PASSWORD@ep-xxxx.eu-central-1.aws.neon.tech/abud?sslmode=require
   ```
4. احفظه — هتحتاجه في خطوتين قادمتين.

---

## 2️⃣ تجهيز قاعدة البيانات محلياً

```powershell
# 1) عدّل .env محلياً وضع DATABASE_URL الجديد من Neon
# 2) ادفع الـ schema لقاعدة البيانات (سيُنشئ كل الجداول)
npx prisma db push

# 3) (اختياري) شغّل seed لإنشاء الأدمن والمحتوى الأولي
npm run db:seed
```

---

## 3️⃣ توليد SESSION_SECRET قوي

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

انسخ الناتج — هيكون `SESSION_SECRET` في Vercel.

---

## 4️⃣ رفع الكود على GitHub

```powershell
git add .
git commit -m "feat: production-ready deployment config"
git push origin main
```

---

## 5️⃣ النشر على Vercel

1. ادخل [https://vercel.com](https://vercel.com) → **Sign in with GitHub**
2. اضغط **Add New → Project**
3. اختر repository: `3bud-ZC/abud`
4. **Framework Preset:** `Next.js` (يكتشفه تلقائياً)
5. وسّع **Environment Variables** وأضف:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | (من Neon) |
   | `SESSION_SECRET` | (من خطوة 3) |
   | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |
   | `ADMIN_EMAIL` | بريدك |
   | `ADMIN_PASSWORD` | كلمة سر قوية |
   | `AI_MODEL_API_KEY` | (اختياري) |
   | `AI_MODEL_PROVIDER` | `openai` (اختياري) |
   | `NEXT_PUBLIC_GA_ID` | `G-GDL5PDTR63` (اختياري) |

6. اضغط **Deploy** — هياخد ~3 دقايق.
7. بعد الإنتهاء، الموقع شغّال على رابط مثل: `https://abud-xxxx.vercel.app`

---

## 6️⃣ ربط دومين Hostinger

### في Vercel:
1. ادخل **Project → Settings → Domains**
2. اكتب دومينك (`yourdomain.com`) واضغط **Add**
3. Vercel هيظهرلك **DNS records** اللي محتاج تضيفها:
   ```
   Type: A      Name: @       Value: 76.76.21.21
   Type: CNAME  Name: www     Value: cname.vercel-dns.com
   ```

### في Hostinger:
1. ادخل [hpanel.hostinger.com](https://hpanel.hostinger.com) → **Domains** → دومينك → **DNS / Nameservers**
2. **احذف** أي A record موجود لـ `@`
3. أضف الـ records اللي طلبها Vercel:
   - **A record:** Name `@`, Points to `76.76.21.21`, TTL `3600`
   - **CNAME:** Name `www`, Points to `cname.vercel-dns.com`, TTL `3600`
4. احفظ.

### الانتظار:
- DNS propagation عادةً ~10-30 دقيقة (قد تصل لساعتين).
- ارجع Vercel وستشوف الدومين بـ ✅ مع HTTPS تلقائي.

---

## 7️⃣ تحديث NEXT_PUBLIC_SITE_URL

بعد ما الدومين يشتغل، رجّع Vercel:
- **Settings → Environment Variables**
- عدّل `NEXT_PUBLIC_SITE_URL` لـ `https://yourdomain.com`
- **Deployments → Redeploy** آخر deployment

---

## 🔄 النشر التلقائي بعد كل تعديل

من بعد كل ما تعمل تعديل محلياً:
```powershell
git add .
git commit -m "describe your change"
git push
```

Vercel هيعمل deploy تلقائي خلال دقيقتين.

---

## ⚠️ ملاحظات مهمة

1. **رفع الملفات (uploads)**: على Vercel، الـ filesystem **read-only**. أي رفع ملفات (إثبات دفع، صور) لن يعمل.
   - **الحل**: استخدم خدمة تخزين خارجية لاحقاً مثل Cloudinary أو UploadThing (مجاني للحجم البسيط).

2. **حدود Vercel Free Plan**:
   - 100GB bandwidth/شهر — كافي لمئات آلاف الزيارات
   - Serverless Function timeout: 10 ثواني (Hobby) — كافي للـ APIs العادية
   - Build time: 45 دقيقة/شهر — كافي جداً

3. **حدود Neon Free**:
   - 0.5GB storage + 3GB transfer — كافي لمدونة شخصية وportfolio
   - DB ينام بعد 5 دقايق من عدم الاستخدام (يصحى تلقائياً عند أول request — تأخير ~1 ثانية)

4. **Backups**: Neon فيه auto-backups يومية حتى في الـ Free plan.

---

## 🆘 لو حصلت مشكلة

| المشكلة | الحل |
|---|---|
| Build فشل بسبب Prisma | تأكد إن `DATABASE_URL` متضاف في Vercel env vars |
| الموقع شغال بس بدون بيانات | شغّل `npx prisma db push` محلياً للـ Neon URL |
| الدومين مش راضي يربط | استنى 2 ساعة، أو نظّف DNS cache: `ipconfig /flushdns` |
| HTTPS مش ظاهر | غالباً DNS لسه مش متبدل — استنى |
| Function timeout | الـ free plan حد 10s؛ لو محتاج أكتر، رقّي للـ Pro |

---

## 🎉 خلاص

دلوقتي عندك:
- ✅ موقع شغال على دومينك بـ HTTPS
- ✅ نشر تلقائي مع كل push
- ✅ قاعدة بيانات سحابية مجانية
- ✅ CDN عالمي لسرعة فائقة
- ✅ كل ده **مجاناً 100%**
