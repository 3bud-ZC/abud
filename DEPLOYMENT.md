# 🚀 دليل النشر الكامل - منصة عبود

هذا الدليل يشرح كيفية نشر منصة عبود على VPS الخاص بك.

---

## 📋 المتطلبات الأساسية

### معلومات VPS
- **المزود**: Hostinger
- **نظام التشغيل**: Ubuntu 24.04 LTS
- **IP**: 72.62.39.204
- **المستخدم**: abdullah
- **المسار**: /home/abdullah/abud

### الدومينات
- **الدومين الرئيسي**: abud.fun
- **دومين VPS**: abud-vps.icu

---

## 🔧 خطوات النشر التلقائي

### 1. الاتصال بالـ VPS

```bash
ssh abdullah@72.62.39.204
```

### 2. تحميل سكريبت النشر

```bash
# تحميل السكريبت مباشرة من GitHub
wget https://raw.githubusercontent.com/3bud-ZC/abud/main/deploy/vps-setup.sh

# إعطاء صلاحيات التنفيذ
chmod +x vps-setup.sh

# تشغيل السكريبت
./vps-setup.sh
```

**هذا السكريبت سيقوم بـ:**
- ✅ تحديث النظام
- ✅ تثبيت Node.js, PostgreSQL, Nginx, Certbot
- ✅ استنساخ المشروع من GitHub
- ✅ إعداد قاعدة البيانات
- ✅ تثبيت المكتبات وبناء المشروع
- ✅ إعداد PM2 للتشغيل التلقائي
- ✅ إعداد Nginx كـ reverse proxy
- ✅ تفعيل HTTPS مع Let's Encrypt
- ✅ إعداد Firewall

---

## 📝 خطوات النشر اليدوي

إذا كنت تفضل التحكم الكامل، اتبع هذه الخطوات:

### 1. تحديث النظام

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. تثبيت Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 3. تثبيت PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

### 4. إعداد قاعدة البيانات

```bash
sudo -u postgres psql
```

في PostgreSQL shell:

```sql
CREATE DATABASE abud_platform;
CREATE USER abud_user WITH PASSWORD 'كلمة_مرور_قوية_هنا';
GRANT ALL PRIVILEGES ON DATABASE abud_platform TO abud_user;
ALTER DATABASE abud_platform OWNER TO abud_user;
\q
```

### 5. تثبيت PM2

```bash
sudo npm install -g pm2
```

### 6. استنساخ المشروع

```bash
cd /home/abdullah
git clone https://github.com/3bud-ZC/abud.git
cd abud
```

### 7. إنشاء ملف .env

```bash
nano .env
```

أضف المحتوى التالي:

```env
DATABASE_URL="postgresql://abud_user:كلمة_المرور@localhost:5432/abud_platform"
SESSION_SECRET="$(openssl rand -base64 32)"
NODE_ENV=production
NEXT_PUBLIC_SITE_URL="https://abud.fun"
UPLOAD_DIR="public/uploads"
PORT=3000
```

احفظ الملف (Ctrl+X, ثم Y, ثم Enter)

### 8. تثبيت المكتبات وبناء المشروع

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run build
```

### 9. تشغيل المشروع مع PM2

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup systemd -u abdullah --hp /home/abdullah
```

### 10. تثبيت وإعداد Nginx

```bash
sudo apt install -y nginx
```

إنشاء ملف الإعداد:

```bash
sudo nano /etc/nginx/sites-available/abud
```

أضف المحتوى التالي:

```nginx
server {
    listen 80;
    server_name abud.fun www.abud.fun abud-vps.icu www.abud-vps.icu;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 50M;
}
```

تفعيل الموقع:

```bash
sudo ln -s /etc/nginx/sites-available/abud /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 11. تثبيت SSL مع Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d abud.fun -d www.abud.fun -d abud-vps.icu -d www.abud-vps.icu
```

اتبع التعليمات وأدخل بريدك الإلكتروني.

### 12. إعداد Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

---

## 🔄 تحديث المشروع

عند إضافة تحديثات جديدة:

```bash
cd /home/abdullah/abud
git pull origin main
npm install
npm run build
pm2 restart abud
```

أو استخدم السكريبت السريع:

```bash
./deploy/quick-update.sh
```

---

## 📊 مراقبة المشروع

### عرض حالة PM2

```bash
pm2 status
```

### عرض السجلات

```bash
# جميع السجلات
pm2 logs abud

# آخر 100 سطر
pm2 logs abud --lines 100

# السجلات الحية
pm2 logs abud --raw
```

### إعادة تشغيل التطبيق

```bash
pm2 restart abud
```

### إيقاف التطبيق

```bash
pm2 stop abud
```

### حذف التطبيق من PM2

```bash
pm2 delete abud
```

---

## 🔍 استكشاف الأخطاء

### المشروع لا يعمل

```bash
# تحقق من حالة PM2
pm2 status

# تحقق من السجلات
pm2 logs abud --err

# تحقق من منفذ 3000
sudo netstat -tulpn | grep 3000
```

### Nginx لا يعمل

```bash
# تحقق من حالة Nginx
sudo systemctl status nginx

# اختبار إعدادات Nginx
sudo nginx -t

# عرض سجلات Nginx
sudo tail -f /var/log/nginx/error.log
```

### قاعدة البيانات لا تعمل

```bash
# تحقق من حالة PostgreSQL
sudo systemctl status postgresql

# الاتصال بقاعدة البيانات
psql -U abud_user -d abud_platform
```

### SSL لا يعمل

```bash
# تجديد الشهادات يدوياً
sudo certbot renew --dry-run

# تحقق من حالة التجديد التلقائي
sudo systemctl status certbot.timer
```

---

## 🛡️ الأمان

### تحديث كلمة مرور قاعدة البيانات

```bash
sudo -u postgres psql
ALTER USER abud_user WITH PASSWORD 'كلمة_مرور_جديدة_قوية';
\q
```

لا تنسى تحديث ملف `.env`!

### تحديث SESSION_SECRET

```bash
# توليد مفتاح جديد
openssl rand -base64 32

# تحديث ملف .env
nano /home/abdullah/abud/.env
```

### النسخ الاحتياطي لقاعدة البيانات

```bash
# إنشاء نسخة احتياطية
pg_dump -U abud_user abud_platform > backup_$(date +%Y%m%d).sql

# استعادة من نسخة احتياطية
psql -U abud_user abud_platform < backup_20260317.sql
```

---

## 📞 الدعم

إذا واجهت أي مشاكل:

1. تحقق من السجلات: `pm2 logs abud`
2. تحقق من حالة الخدمات: `pm2 status` و `sudo systemctl status nginx`
3. راجع قسم استكشاف الأخطاء أعلاه

---

## ✅ قائمة التحقق النهائية

- [ ] تم الاتصال بـ VPS بنجاح
- [ ] تم تثبيت جميع المتطلبات
- [ ] تم استنساخ المشروع
- [ ] تم إعداد قاعدة البيانات
- [ ] تم إنشاء ملف .env بشكل صحيح
- [ ] تم بناء المشروع بنجاح
- [ ] PM2 يعمل والتطبيق يعمل
- [ ] Nginx مُعد بشكل صحيح
- [ ] SSL مُفعل ويعمل
- [ ] الموقع يعمل على https://abud.fun
- [ ] الموقع يعمل على https://abud-vps.icu

---

**تم! موقعك الآن يعمل بنجاح 🎉**
