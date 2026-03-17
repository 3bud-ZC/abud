# 🔄 Backup Scripts - ABUD Platform

## 📁 الملفات

```
scripts/backup/
├── backup-db.sh          # Database backup
├── backup-uploads.sh     # User files backup
├── backup-config.sh      # Configuration backup
├── run-backup.sh         # Master script (runs all)
└── README.md            # هذا الملف
```

## 🚀 الاستخدام السريع

### تشغيل النسخ الاحتياطي الكامل

```bash
cd /home/abdullah/abud
bash scripts/backup/run-backup.sh
```

### تشغيل نسخ احتياطي منفصل

```bash
# Database فقط
bash scripts/backup/backup-db.sh

# Uploads فقط
bash scripts/backup/backup-uploads.sh

# Config فقط
bash scripts/backup/backup-config.sh
```

## 📍 مواقع النسخ الاحتياطية

```
/home/abdullah/backups/
├── database/          # Database dumps (.sql.gz)
├── uploads/           # User files (.tar.gz)
├── config/            # Config files (.tar.gz)
└── logs/              # Backup logs
```

## ⏰ Cron Job (تلقائي)

```bash
# إضافة للـ crontab
crontab -e

# أضف هذا السطر (backup يومي الساعة 2 صباحاً)
0 2 * * * /bin/bash /home/abdullah/abud/scripts/backup/run-backup.sh >> /home/abdullah/backups/logs/cron.log 2>&1
```

## 📋 سياسة الاحتفاظ

- **Database**: آخر 7 أيام
- **Uploads**: آخر 7 أيام  
- **Config**: آخر 14 يوم
- **Logs**: آخر 30 يوم

## 🔍 فحص النسخ

```bash
# عرض آخر 5 نسخ
ls -lt /home/abdullah/backups/database/*.sql.gz | head -5

# فحص الحجم الإجمالي
du -sh /home/abdullah/backups/*

# قراءة آخر log
tail -50 /home/abdullah/backups/logs/backup_*.log | tail -1
```

## 📖 التوثيق الكامل

راجع `docs/BACKUP-RECOVERY.md` للتوثيق الشامل حول:
- كيفية الاستعادة
- خطوات Recovery بعد Crash
- RTO/RPO
- Checklist بعد الاستعادة

## ⚠️ ملاحظات مهمة

1. السكربتات تحتاج صلاحيات sudo لـ PostgreSQL
2. تأكد من وجود مساحة كافية في `/home/abdullah/backups/`
3. النسخ القديمة تُحذف تلقائياً حسب retention policy
4. راجع الـ logs بانتظام للتأكد من نجاح الـ backups

## 🆘 في حالة الطوارئ

```bash
# استعادة Database
gunzip -c /home/abdullah/backups/database/abud_db_YYYYMMDD_HHMMSS.sql.gz | sudo -u postgres psql abud_platform

# استعادة Uploads
tar -xzf /home/abdullah/backups/uploads/abud_uploads_YYYYMMDD_HHMMSS.tar.gz -C /home/abdullah/abud/public/

# استعادة Config
tar -xzf /home/abdullah/backups/config/abud_config_YYYYMMDD_HHMMSS.tar.gz -C /tmp/
cp /tmp/config/.env /home/abdullah/abud/.env
```

---

**للمزيد من المعلومات**: راجع `docs/BACKUP-RECOVERY.md`
