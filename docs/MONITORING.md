# 📊 دليل المراقبة والصيانة - ABUD Platform

## 🎯 نظرة عامة

هذا الدليل يوضح كيفية مراقبة وصيانة تطبيق ABUD Platform في بيئة الإنتاج.

---

## 🏥 فحص صحة التطبيق

### 1. Health Check Endpoint

**الرابط**: `https://abud.fun/api/health`

**الاستخدام**:
```bash
curl https://abud.fun/api/health
```

**الاستجابة المتوقعة** (عند النجاح):
```json
{
  "status": "healthy",
  "timestamp": "2026-03-17T12:00:00.000Z",
  "checks": {
    "database": {
      "status": "connected",
      "latency": "15ms"
    },
    "application": {
      "status": "running",
      "uptime": "3600s",
      "memory": {
        "used": "120MB",
        "total": "150MB"
      }
    }
  },
  "environment": "production",
  "version": "1.0.0",
  "responseTime": "20ms"
}
```

**الاستجابة عند الفشل** (503):
```json
{
  "status": "unhealthy",
  "checks": {
    "database": {
      "status": "disconnected",
      "error": "Connection timeout"
    }
  }
}
```

### 2. Readiness Check Endpoint

**الرابط**: `https://abud.fun/api/ready`

**الاستخدام**: للتحقق من جاهزية التطبيق لاستقبال الطلبات
```bash
curl https://abud.fun/api/ready
```

---

## 📝 قراءة ومراجعة Logs

### 1. فحص Logs عبر PM2

**عرض آخر 50 سطر من الـ logs**:
```bash
pm2 logs abud --lines 50
```

**عرض الـ logs بشكل مباشر (live)**:
```bash
pm2 logs abud
```

**عرض error logs فقط**:
```bash
pm2 logs abud --err
```

**عرض output logs فقط**:
```bash
pm2 logs abud --out
```

**مسح الـ logs القديمة**:
```bash
pm2 flush abud
```

### 2. قراءة Log Files مباشرة

**Error logs**:
```bash
tail -f /home/abdullah/.pm2/logs/abud-error.log
```

**Output logs**:
```bash
tail -f /home/abdullah/.pm2/logs/abud-out.log
```

**آخر 100 سطر**:
```bash
tail -n 100 /home/abdullah/.pm2/logs/abud-error.log
```

**البحث في الـ logs**:
```bash
grep "error" /home/abdullah/.pm2/logs/abud-error.log
grep "Auth failure" /home/abdullah/.pm2/logs/abud-out.log
```

### 3. فهم Log Format

الـ logs تتبع الصيغة التالية:
```
[2026-03-17T12:00:00.000Z] [INFO] Auth attempt | {"email":"admin@abud.com"}
[2026-03-17T12:00:01.000Z] [WARN] Rate limit hit | {"endpoint":"contact","ip":"1.2.3.4"}
[2026-03-17T12:00:02.000Z] [ERROR] API POST /api/upload - Failed | {"error":{"message":"..."}}
```

**المستويات**:
- `INFO`: معلومات عامة
- `WARN`: تحذيرات (مثل rate limiting)
- `ERROR`: أخطاء تحتاج انتباه

---

## 🔧 أوامر PM2 المهمة

### حالة التطبيق

```bash
# عرض حالة التطبيق
pm2 status

# عرض معلومات تفصيلية
pm2 show abud

# عرض استهلاك الموارد
pm2 monit
```

### إدارة التطبيق

```bash
# إعادة تشغيل التطبيق
pm2 restart abud

# إيقاف التطبيق
pm2 stop abud

# بدء التطبيق
pm2 start abud

# إعادة تحميل بدون downtime (graceful reload)
pm2 reload abud

# حفظ الحالة الحالية
pm2 save
```

### معلومات متقدمة

```bash
# عرض environment variables
pm2 env 0

# عرض metadata
pm2 describe abud

# عرض استهلاك CPU والذاكرة
pm2 list
```

---

## 🗄️ فحص قاعدة البيانات

### 1. الاتصال بـ PostgreSQL

```bash
# الدخول إلى PostgreSQL
sudo -u postgres psql

# الاتصال بقاعدة البيانات
\c abud_platform

# عرض الجداول
\dt

# الخروج
\q
```

### 2. فحص Database Connectivity

```bash
# من داخل مجلد المشروع
cd /home/abdullah/abud
npx prisma db pull
```

### 3. فحص Database Size

```bash
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('abud_platform'));"
```

---

## 🌐 فحص Nginx

### حالة Nginx

```bash
# فحص حالة Nginx
sudo systemctl status nginx

# إعادة تشغيل Nginx
sudo systemctl restart nginx

# إعادة تحميل الإعدادات
sudo systemctl reload nginx

# فحص الإعدادات
sudo nginx -t
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Logs خاصة بـ abud.fun
sudo tail -f /var/log/nginx/abud.fun.access.log
sudo tail -f /var/log/nginx/abud.fun.error.log
```

---

## 🚨 خطوات سريعة عند Downtime

### 1. فحص سريع

```bash
# 1. فحص حالة PM2
pm2 status

# 2. فحص الـ logs
pm2 logs abud --lines 50 --err

# 3. فحص Nginx
sudo systemctl status nginx

# 4. فحص Database
sudo systemctl status postgresql
```

### 2. إعادة تشغيل سريعة

```bash
# إعادة تشغيل التطبيق
pm2 restart abud

# إعادة تشغيل Nginx
sudo systemctl restart nginx

# إعادة تشغيل PostgreSQL (إذا لزم)
sudo systemctl restart postgresql
```

### 3. فحص الاتصال

```bash
# فحص health endpoint
curl https://abud.fun/api/health

# فحص الصفحة الرئيسية
curl -I https://abud.fun
```

---

## 📊 إعداد المراقبة الخارجية

### UptimeRobot Setup

1. **إنشاء حساب**: [uptimerobot.com](https://uptimerobot.com)

2. **إضافة Monitor جديد**:
   - Monitor Type: `HTTP(s)`
   - Friendly Name: `ABUD Platform - Health Check`
   - URL: `https://abud.fun/api/health`
   - Monitoring Interval: `5 minutes`
   - Monitor Timeout: `30 seconds`

3. **إعداد Alerts**:
   - Alert Contacts: أضف بريدك الإلكتروني
   - Alert When: `Down`
   - Alert After: `1 check` (فوري)

4. **Status Page** (اختياري):
   - يمكنك إنشاء صفحة حالة عامة للموقع

### Better Stack (Logtail) Setup

1. **إنشاء حساب**: [betterstack.com](https://betterstack.com)

2. **إضافة Uptime Monitor**:
   - URL: `https://abud.fun/api/health`
   - Check Interval: `1 minute`
   - Expected Status Code: `200`

3. **إعداد Heartbeat** (اختياري):
   - يمكنك إضافة heartbeat endpoint للتحقق الدوري

### Pingdom Setup

1. **إنشاء حساب**: [pingdom.com](https://pingdom.com)

2. **إضافة Uptime Check**:
   - Name: `ABUD Platform`
   - URL: `https://abud.fun/api/health`
   - Check Interval: `1 minute`

3. **Response Time Monitoring**:
   - سيتم قياس response time تلقائياً

---

## 🔍 أوامر تشخيص مفيدة

### استهلاك الموارد

```bash
# استهلاك CPU والذاكرة
top

# استهلاك القرص
df -h

# استهلاك الذاكرة
free -h

# العمليات الخاصة بـ Node.js
ps aux | grep node
```

### الشبكة

```bash
# فحص البورت 3000
sudo netstat -tulpn | grep 3000

# فحص البورت 80 و 443
sudo netstat -tulpn | grep nginx

# فحص الاتصالات النشطة
ss -s
```

### Application Metrics

```bash
# عدد الطلبات في آخر ساعة (من Nginx logs)
sudo grep "$(date '+%d/%b/%Y:%H')" /var/log/nginx/access.log | wc -l

# أكثر الـ endpoints استخداماً
sudo awk '{print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10

# Status codes distribution
sudo awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
```

---

## 📈 Metrics المهمة للمراقبة

### 1. Application Health
- ✅ `/api/health` يعيد 200
- ✅ Database latency < 100ms
- ✅ Memory usage < 80%
- ✅ Uptime > 99.9%

### 2. Performance
- ✅ Response time < 500ms
- ✅ Database queries < 50ms
- ✅ Error rate < 1%

### 3. Security
- ⚠️ Rate limit hits (تحذيرات)
- ⚠️ Auth failures (محاولات فاشلة)
- ⚠️ Upload failures (ملفات مرفوضة)

---

## 🔐 Security Monitoring

### مراقبة محاولات الاختراق

```bash
# محاولات تسجيل دخول فاشلة
grep "Auth failure" /home/abdullah/.pm2/logs/abud-out.log

# Rate limiting hits
grep "Rate limit hit" /home/abdullah/.pm2/logs/abud-out.log

# Upload failures
grep "Upload failure" /home/abdullah/.pm2/logs/abud-out.log
```

---

## 📋 Checklist يومي

- [ ] فحص `pm2 status` - التطبيق يعمل
- [ ] فحص `/api/health` - يعيد healthy
- [ ] مراجعة error logs - لا أخطاء حرجة
- [ ] فحص disk space - أقل من 80%
- [ ] فحص memory usage - أقل من 80%

## 📋 Checklist أسبوعي

- [ ] مراجعة logs بالكامل
- [ ] فحص database size
- [ ] تنظيف old logs (إذا لزم)
- [ ] فحص SSL certificate expiry
- [ ] مراجعة rate limiting patterns

---

## 🆘 جهات الاتصال للطوارئ

- **VPS Provider**: DigitalOcean / Vultr / etc.
- **Domain Registrar**: Namecheap / GoDaddy / etc.
- **Database Backups**: [موقع النسخ الاحتياطية]

---

## 📚 موارد إضافية

- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Monitoring](https://www.postgresql.org/docs/current/monitoring.html)

---

**آخر تحديث**: 2026-03-17  
**الإصدار**: 1.0.0
