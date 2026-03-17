# 🔄 دليل النسخ الاحتياطي والاستعادة - ABUD Platform

## 📋 نظرة عامة

هذا الدليل يوضح كيفية إنشاء نسخ احتياطية واستعادة ABUD Platform في حالة الطوارئ.

---

## 🎯 استراتيجية النسخ الاحتياطي

### ما يتم نسخه احتياطياً

| المكون | المحتوى | التكرار | الأهمية | الحجم المتوقع |
|--------|---------|---------|---------|---------------|
| **Database** | جميع البيانات (طلبات، منتجات، مستخدمين) | يومي | 🔴 CRITICAL | < 100MB |
| **Uploads** | الصور والملفات المرفوعة | يومي | 🟠 HIGH | متغير |
| **Config** | .env, nginx, PM2 configs | يومي | 🟡 MEDIUM | < 1MB |
| **Code** | الكود المصدري | تلقائي | ✅ في Git | N/A |

### سياسة الاحتفاظ (Retention Policy)

```
Database Backups:  آخر 7 أيام
Uploads Backups:   آخر 7 أيام
Config Backups:    آخر 14 يوم
Logs:              آخر 30 يوم
```

### مواقع النسخ الاحتياطية

```
الموقع الرئيسي: /home/abdullah/backups/
├── database/          # Database dumps
├── uploads/           # User files
├── config/            # Configuration files
└── logs/              # Backup logs
```

---

## 🚀 تشغيل النسخ الاحتياطي

### الطريقة 1: النسخ الكامل (موصى به)

```bash
# اتصل بالـ VPS
ssh abdullah@72.62.39.204

# انتقل لمجلد المشروع
cd /home/abdullah/abud

# شغّل النسخ الاحتياطي الكامل
bash scripts/backup/run-backup.sh
```

**النتيجة المتوقعة**:
```
╔════════════════════════════════════════╗
║   ABUD Platform - Master Backup       ║
╚════════════════════════════════════════╝

[1/3] Database Backup
✓ backup-db.sh completed successfully

[2/3] Uploads Backup
✓ backup-uploads.sh completed successfully

[3/3] Config Backup
✓ backup-config.sh completed successfully

╔════════════════════════════════════════╗
║          Backup Summary                ║
╚════════════════════════════════════════╝

Total backups: 3
Successful: 3
Failed: 0

Backup Sizes:
  Database: 2.5M
  Uploads:  15M
  Config:   120K
  Total:    18M

✓ All backups completed successfully!
```

### الطريقة 2: نسخ احتياطي منفصل

```bash
# Database فقط
bash scripts/backup/backup-db.sh

# Uploads فقط
bash scripts/backup/backup-uploads.sh

# Config فقط
bash scripts/backup/backup-config.sh
```

---

## 🔍 فحص النسخ الاحتياطية

### عرض النسخ المتوفرة

```bash
# عرض جميع النسخ
ls -lh /home/abdullah/backups/database/
ls -lh /home/abdullah/backups/uploads/
ls -lh /home/abdullah/backups/config/

# عرض آخر 5 نسخ من Database
ls -lt /home/abdullah/backups/database/*.sql.gz | head -5

# فحص حجم النسخ الاحتياطية
du -sh /home/abdullah/backups/*
```

### قراءة Metadata

```bash
# عرض معلومات آخر backup
cat /home/abdullah/backups/database/*.meta | tail -20
```

### فحص Logs

```bash
# عرض آخر log
tail -50 /home/abdullah/backups/logs/backup_*.log | tail -1

# البحث عن أخطاء
grep -i "error\|failed" /home/abdullah/backups/logs/backup_*.log
```

---

## 🔄 استعادة Database

### السيناريو 1: استعادة كاملة

**متى تستخدمها**: عند فقد كامل للبيانات أو database corruption

```bash
# 1. اتصل بالـ VPS
ssh abdullah@72.62.39.204

# 2. أوقف التطبيق
pm2 stop abud

# 3. اختر النسخة الاحتياطية
ls -lt /home/abdullah/backups/database/*.sql.gz | head -5

# 4. استعد Database (استبدل YYYYMMDD_HHMMSS بالتاريخ المطلوب)
BACKUP_FILE="/home/abdullah/backups/database/abud_db_YYYYMMDD_HHMMSS.sql.gz"

# 5. احذف Database القديم وأنشئ واحد جديد
sudo -u postgres psql << EOF
DROP DATABASE IF EXISTS abud_platform;
CREATE DATABASE abud_platform;
GRANT ALL PRIVILEGES ON DATABASE abud_platform TO abud_user;
EOF

# 6. استعد البيانات
gunzip -c "${BACKUP_FILE}" | sudo -u postgres psql abud_platform

# 7. تحقق من الاستعادة
sudo -u postgres psql -d abud_platform -c "\dt"
sudo -u postgres psql -d abud_platform -c "SELECT COUNT(*) FROM \"Product\";"

# 8. أعد تشغيل التطبيق
pm2 start abud

# 9. تحقق من عمل التطبيق
curl http://localhost:3000/api/health
```

### السيناريو 2: استعادة جدول واحد فقط

**متى تستخدمها**: عند حذف بيانات من جدول معين بالخطأ

```bash
# 1. استخرج الـ backup
BACKUP_FILE="/home/abdullah/backups/database/abud_db_YYYYMMDD_HHMMSS.sql.gz"
gunzip -c "${BACKUP_FILE}" > /tmp/restore.sql

# 2. استخرج الجدول المطلوب فقط (مثال: Product)
grep -A 1000 "CREATE TABLE.*Product" /tmp/restore.sql > /tmp/product_only.sql

# 3. استعد الجدول
sudo -u postgres psql abud_platform < /tmp/product_only.sql

# 4. نظف
rm /tmp/restore.sql /tmp/product_only.sql
```

---

## 📁 استعادة Uploads

### استعادة كاملة

```bash
# 1. أوقف التطبيق (اختياري لكن موصى به)
pm2 stop abud

# 2. احتفظ بنسخة من الملفات الحالية (احتياط)
mv /home/abdullah/abud/public/uploads /home/abdullah/abud/public/uploads.old

# 3. اختر النسخة الاحتياطية
ls -lt /home/abdullah/backups/uploads/*.tar.gz | head -5

# 4. استعد الملفات
BACKUP_FILE="/home/abdullah/backups/uploads/abud_uploads_YYYYMMDD_HHMMSS.tar.gz"
tar -xzf "${BACKUP_FILE}" -C /home/abdullah/abud/public/

# 5. تحقق من الاستعادة
ls -lh /home/abdullah/abud/public/uploads/

# 6. أعد تشغيل التطبيق
pm2 start abud

# 7. احذف النسخة القديمة إذا كان كل شيء يعمل
rm -rf /home/abdullah/abud/public/uploads.old
```

### استعادة ملف واحد

```bash
# 1. استخرج الملف المطلوب فقط
BACKUP_FILE="/home/abdullah/backups/uploads/abud_uploads_YYYYMMDD_HHMMSS.tar.gz"
tar -xzf "${BACKUP_FILE}" uploads/FILENAME.jpg -C /tmp/

# 2. انقل الملف للموقع الصحيح
cp /tmp/uploads/FILENAME.jpg /home/abdullah/abud/public/uploads/

# 3. نظف
rm -rf /tmp/uploads
```

---

## ⚙️ استعادة Config Files

### استعادة .env

```bash
# 1. استخرج النسخة الاحتياطية
BACKUP_FILE="/home/abdullah/backups/config/abud_config_YYYYMMDD_HHMMSS.tar.gz"
tar -xzf "${BACKUP_FILE}" -C /tmp/

# 2. راجع الملف قبل الاستعادة
cat /tmp/config/.env

# 3. استعد الملف
cp /tmp/config/.env /home/abdullah/abud/.env

# 4. أعد تشغيل التطبيق
pm2 restart abud

# 5. نظف
rm -rf /tmp/config
```

### استعادة Nginx Config

```bash
# 1. استخرج النسخة الاحتياطية
tar -xzf "${BACKUP_FILE}" -C /tmp/

# 2. استعد nginx config
sudo cp /tmp/config/nginx-site.conf /etc/nginx/sites-available/abud.fun

# 3. اختبر الإعدادات
sudo nginx -t

# 4. أعد تحميل Nginx
sudo systemctl reload nginx

# 5. نظف
rm -rf /tmp/config
```

---

## 🚨 خطوات Recovery بعد Crash كامل

### السيناريو: VPS جديد أو فقد كامل للبيانات

```bash
# ═══════════════════════════════════════
# STEP 1: إعداد VPS الجديد
# ═══════════════════════════════════════

# 1. تحديث النظام
sudo apt update && sudo apt upgrade -y

# 2. تثبيت المتطلبات
sudo apt install -y nodejs npm postgresql nginx git

# 3. تثبيت PM2
sudo npm install -g pm2

# ═══════════════════════════════════════
# STEP 2: استنساخ المشروع من GitHub
# ═══════════════════════════════════════

cd /home/abdullah
git clone https://github.com/3bud-ZC/abud.git
cd abud
npm install

# ═══════════════════════════════════════
# STEP 3: استعادة Config Files
# ═══════════════════════════════════════

# انقل النسخ الاحتياطية للسيرفر الجديد (من جهازك المحلي)
# scp -r /path/to/backups abdullah@NEW_IP:/home/abdullah/

# استعد .env
tar -xzf /home/abdullah/backups/config/abud_config_LATEST.tar.gz -C /tmp/
cp /tmp/config/.env /home/abdullah/abud/.env

# استعد nginx config
sudo cp /tmp/config/nginx-site.conf /etc/nginx/sites-available/abud.fun
sudo ln -s /etc/nginx/sites-available/abud.fun /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# ═══════════════════════════════════════
# STEP 4: إعداد PostgreSQL
# ═══════════════════════════════════════

# أنشئ Database و User
sudo -u postgres psql << EOF
CREATE DATABASE abud_platform;
CREATE USER abud_user WITH PASSWORD 'SecurePass2026';
GRANT ALL PRIVILEGES ON DATABASE abud_platform TO abud_user;
ALTER DATABASE abud_platform OWNER TO abud_user;
EOF

# ═══════════════════════════════════════
# STEP 5: استعادة Database
# ═══════════════════════════════════════

BACKUP_FILE="/home/abdullah/backups/database/abud_db_LATEST.sql.gz"
gunzip -c "${BACKUP_FILE}" | sudo -u postgres psql abud_platform

# تحقق
sudo -u postgres psql -d abud_platform -c "\dt"

# ═══════════════════════════════════════
# STEP 6: استعادة Uploads
# ═══════════════════════════════════════

BACKUP_FILE="/home/abdullah/backups/uploads/abud_uploads_LATEST.tar.gz"
tar -xzf "${BACKUP_FILE}" -C /home/abdullah/abud/public/

# ═══════════════════════════════════════
# STEP 7: بناء وتشغيل التطبيق
# ═══════════════════════════════════════

cd /home/abdullah/abud
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# ═══════════════════════════════════════
# STEP 8: التحقق النهائي
# ═══════════════════════════════════════

# فحص التطبيق
curl http://localhost:3000/api/health

# فحص Database
sudo -u postgres psql -d abud_platform -c "SELECT COUNT(*) FROM \"Product\";"

# فحص Uploads
ls -lh /home/abdullah/abud/public/uploads/

# فحص Nginx
curl -I https://abud.fun

echo "✓ Recovery completed successfully!"
```

---

## ⏱️ RTO/RPO

### Recovery Time Objective (RTO)

**الوقت المستهدف للاستعادة الكاملة**:

| السيناريو | RTO المستهدف | الخطوات |
|-----------|--------------|---------|
| **Database فقط** | 5-10 دقائق | استعادة من backup + restart |
| **Uploads فقط** | 2-5 دقائق | استخراج tar.gz + restart |
| **Config فقط** | 2-3 دقائق | نسخ ملفات + restart |
| **Recovery كامل** | 30-60 دقيقة | إعداد VPS جديد + استعادة كل شيء |

### Recovery Point Objective (RPO)

**الحد الأقصى لفقد البيانات المقبول**:

```
RPO: 24 ساعة (backup يومي)

معنى ذلك:
- في أسوأ الحالات، قد نفقد بيانات آخر 24 ساعة
- إذا حدث crash الساعة 10 صباحاً
- آخر backup كان الساعة 2 صباحاً
- نفقد 8 ساعات من البيانات
```

**لتحسين RPO**:
- يمكن زيادة تكرار الـ backup (كل 6 ساعات مثلاً)
- أو استخدام database replication

---

## 📋 Checklist بعد الاستعادة

### ✅ قائمة التحقق

```
□ Database متصل ويعمل
□ جميع الجداول موجودة
□ عدد السجلات صحيح (قارن مع backup metadata)
□ Uploads folder موجود وفيه ملفات
□ .env file موجود وصحيح
□ SESSION_SECRET موجود
□ PM2 يعمل والتطبيق online
□ /api/health يعيد "healthy"
□ /api/ready يعيد "ready"
□ Nginx يعمل ويوجه للتطبيق
□ SSL certificate صالح
□ يمكن تسجيل الدخول للـ admin panel
□ يمكن رفع ملفات جديدة
□ يمكن إنشاء طلب جديد
□ Logs تعمل بشكل صحيح
```

### أوامر التحقق السريع

```bash
# 1. فحص التطبيق
pm2 status
curl http://localhost:3000/api/health

# 2. فحص Database
sudo -u postgres psql -d abud_platform -c "\dt"
sudo -u postgres psql -d abud_platform -c "SELECT COUNT(*) FROM \"AdminUser\";"
sudo -u postgres psql -d abud_platform -c "SELECT COUNT(*) FROM \"Product\";"
sudo -u postgres psql -d abud_platform -c "SELECT COUNT(*) FROM \"Order\";"

# 3. فحص Uploads
ls -lh /home/abdullah/abud/public/uploads/ | wc -l

# 4. فحص Nginx
sudo nginx -t
sudo systemctl status nginx
curl -I https://abud.fun

# 5. فحص Logs
pm2 logs abud --lines 20
```

---

## 🔐 تحذيرات مهمة

### ⚠️ قبل Restore

1. **احتفظ بنسخة من البيانات الحالية** قبل الاستعادة
2. **أوقف التطبيق** قبل استعادة Database
3. **تحقق من تاريخ الـ backup** - تأكد أنك تستعيد النسخة الصحيحة
4. **اختبر في بيئة منفصلة** إن أمكن
5. **أبلغ المستخدمين** إذا كان الموقع سيكون offline

### ⚠️ أثناء Restore

1. **لا تقاطع العملية** - دع الاستعادة تكتمل
2. **راقب الـ logs** للتأكد من عدم وجود أخطاء
3. **تحقق من المساحة** - تأكد أن القرص لا يمتلئ

### ⚠️ بعد Restore

1. **اختبر كل شيء** قبل إعلان النجاح
2. **راجع الـ logs** للتأكد من عدم وجود أخطاء
3. **أنشئ backup جديد فوراً** بعد الاستعادة الناجحة

---

## 🔄 Cron Job - النسخ الاحتياطي التلقائي

### إعداد Cron

```bash
# 1. افتح crontab
crontab -e

# 2. أضف السطر التالي (backup يومي الساعة 2 صباحاً)
0 2 * * * /bin/bash /home/abdullah/abud/scripts/backup/run-backup.sh >> /home/abdullah/backups/logs/cron.log 2>&1

# 3. احفظ واخرج

# 4. تحقق من Cron
crontab -l
```

### شرح Cron Syntax

```
0 2 * * *  = كل يوم الساعة 2:00 صباحاً

الصيغة: minute hour day month weekday

أمثلة أخرى:
0 */6 * * *  = كل 6 ساعات
0 2,14 * * * = الساعة 2 صباحاً و 2 ظهراً
0 2 * * 0    = كل أحد الساعة 2 صباحاً
```

### اختبار Cron

```bash
# شغّل الـ backup يدوياً لاختبار
/bin/bash /home/abdullah/abud/scripts/backup/run-backup.sh

# راجع cron log
tail -50 /home/abdullah/backups/logs/cron.log

# راجع system cron log
sudo grep CRON /var/log/syslog | tail -20
```

---

## 📊 مراقبة النسخ الاحتياطية

### فحص آخر backup

```bash
# عرض آخر backup لكل نوع
ls -lt /home/abdullah/backups/database/*.sql.gz | head -1
ls -lt /home/abdullah/backups/uploads/*.tar.gz | head -1
ls -lt /home/abdullah/backups/config/*.tar.gz | head -1

# عرض تاريخ آخر backup
stat -c '%y' /home/abdullah/backups/database/*.sql.gz | sort | tail -1
```

### إنشاء تنبيه بسيط

```bash
# سكربت للتحقق من آخر backup (يمكن إضافته لـ cron)
#!/bin/bash
LAST_BACKUP=$(find /home/abdullah/backups/database -name "*.sql.gz" -mtime -1 | wc -l)
if [ $LAST_BACKUP -eq 0 ]; then
    echo "WARNING: No backup in last 24 hours!" | mail -s "Backup Alert" your@email.com
fi
```

---

## 🌐 نقل النسخ الاحتياطية خارج السيرفر

### الطريقة 1: SCP (يدوي)

```bash
# من جهازك المحلي
scp -r abdullah@72.62.39.204:/home/abdullah/backups/ ./local-backups/
```

### الطريقة 2: rsync (موصى به)

```bash
# من جهازك المحلي - نسخ تزايدي
rsync -avz --progress abdullah@72.62.39.204:/home/abdullah/backups/ ./local-backups/
```

### الطريقة 3: Cloud Storage (مستقبلي)

**يمكن إضافة integration مع**:
- AWS S3
- Backblaze B2
- Google Cloud Storage
- DigitalOcean Spaces

---

## 📚 موارد إضافية

- [PostgreSQL Backup Documentation](https://www.postgresql.org/docs/current/backup.html)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Backup Best Practices](https://nginx.org/en/docs/)

---

**آخر تحديث**: 2026-03-17  
**الإصدار**: 1.0.0  
**المسؤول**: Abdullah
