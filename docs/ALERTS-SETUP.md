# 🚨 دليل إعداد التنبيهات - Alert Setup Guide

## نظرة عامة

هذا الدليل يوضح كيفية إعداد نظام تنبيهات شامل لمراقبة ABUD Platform.

---

## 🎯 استراتيجية التنبيهات

### المستويات

1. **CRITICAL** 🔴 - يتطلب تدخل فوري
2. **WARNING** 🟡 - يحتاج مراجعة قريبة
3. **INFO** 🔵 - معلومات للمتابعة

---

## 📊 UptimeRobot - إعداد مفصل

### الخطوة 1: إنشاء الحساب

1. اذهب إلى [uptimerobot.com](https://uptimerobot.com)
2. سجل حساب جديد (مجاني)
3. تأكد من بريدك الإلكتروني

### الخطوة 2: إضافة Monitors

#### Monitor 1: Health Check (أساسي)

```
Monitor Type: HTTP(s)
Friendly Name: ABUD - Health Check
URL: https://abud.fun/api/health
Monitoring Interval: 5 minutes
Monitor Timeout: 30 seconds
Keyword: "healthy"
Keyword Type: Exists
Alert Contacts: [بريدك الإلكتروني]
```

**لماذا Keyword "healthy"؟**
- يتحقق أن الـ response يحتوي على كلمة "healthy"
- ليس فقط أن الموقع يرد، بل أنه يعمل بشكل صحيح

#### Monitor 2: Homepage Check

```
Monitor Type: HTTP(s)
Friendly Name: ABUD - Homepage
URL: https://abud.fun
Monitoring Interval: 5 minutes
Monitor Timeout: 30 seconds
Alert Contacts: [بريدك الإلكتروني]
```

#### Monitor 3: Readiness Check

```
Monitor Type: HTTP(s)
Friendly Name: ABUD - Ready
URL: https://abud.fun/api/ready
Monitoring Interval: 5 minutes
Monitor Timeout: 30 seconds
Keyword: "ready"
Keyword Type: Exists
Alert Contacts: [بريدك الإلكتروني]
```

### الخطوة 3: إعداد Alert Contacts

1. اذهب إلى `My Settings` → `Alert Contacts`
2. أضف:
   - **Email**: بريدك الأساسي
   - **SMS** (اختياري): رقم هاتفك
   - **Webhook** (متقدم): للتكامل مع Slack/Discord

### الخطوة 4: إعداد Status Page (اختياري)

1. اذهب إلى `Public Status Pages`
2. أنشئ صفحة جديدة
3. اختر Monitors للعرض
4. احصل على رابط عام: `https://stats.uptimerobot.com/xxxxx`

---

## 🎨 Better Stack (Uptime) - إعداد مفصل

### الخطوة 1: إنشاء الحساب

1. اذهب إلى [betterstack.com/uptime](https://betterstack.com/uptime)
2. سجل حساب جديد
3. اختر الخطة المجانية (تكفي للبداية)

### الخطوة 2: إضافة Monitors

#### Monitor 1: Health Check

```
Name: ABUD Health
URL: https://abud.fun/api/health
Check Frequency: 1 minute
Request Timeout: 30 seconds
Expected Status Code: 200
Expected Response: Contains "healthy"
Locations: Multiple (اختر 3+ مواقع)
```

#### Monitor 2: Performance Monitor

```
Name: ABUD Performance
URL: https://abud.fun
Check Frequency: 1 minute
Response Time Threshold: 2000ms (تنبيه إذا أبطأ)
```

### الخطوة 3: إعداد Incidents

1. اذهب إلى `Incidents` → `Escalation Policies`
2. أنشئ سياسة جديدة:
   ```
   Level 1: Email فوراً
   Level 2: SMS بعد 5 دقائق (إذا لم يُحل)
   Level 3: Phone Call بعد 15 دقيقة
   ```

### الخطوة 4: Status Page

1. أنشئ Status Page عامة
2. أضف Monitors
3. خصص الألوان والشعار
4. احصل على رابط: `https://status.abud.fun` (custom domain)

---

## 🔔 Pingdom - إعداد مفصل

### الخطوة 1: إنشاء الحساب

1. اذهب إلى [pingdom.com](https://www.pingdom.com)
2. سجل حساب (trial مجاني 14 يوم)

### الخطوة 2: إضافة Uptime Check

```
Name: ABUD Platform
URL: https://abud.fun/api/health
Check Interval: 1 minute
Check Locations: اختر 3+ مواقع عالمية
Alert When: Down for 1 minute
```

### الخطوة 3: Transaction Check (متقدم)

يمكنك إنشاء سيناريو كامل:
1. زيارة الصفحة الرئيسية
2. الذهاب لصفحة تسجيل الدخول
3. التحقق من وجود عناصر معينة

---

## 📱 إعداد Webhook للتكامل

### Slack Integration

1. **إنشاء Webhook في Slack**:
   ```
   1. اذهب إلى Slack Workspace
   2. Apps → Incoming Webhooks
   3. Add to Slack
   4. اختر القناة (#alerts)
   5. احصل على Webhook URL
   ```

2. **إضافة في UptimeRobot**:
   ```
   Alert Contact Type: Webhook
   Webhook URL: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   POST Value:
   {
     "text": "*ALERT*: *monitorFriendlyName* is *alertTypeFriendlyName*"
   }
   ```

### Discord Integration

1. **إنشاء Webhook في Discord**:
   ```
   1. Server Settings → Integrations
   2. Webhooks → New Webhook
   3. اختر القناة (#alerts)
   4. Copy Webhook URL
   ```

2. **إضافة في UptimeRobot**:
   ```
   Webhook URL: https://discord.com/api/webhooks/YOUR/WEBHOOK
   POST Value:
   {
     "content": "🚨 **ALERT**: **monitorFriendlyName** is **alertTypeFriendlyName**"
   }
   ```

---

## 🔍 Monitoring Checklist

### ما يجب مراقبته

- [x] **Uptime**: الموقع يعمل (200 OK)
- [x] **Health**: `/api/health` يعيد "healthy"
- [x] **Readiness**: `/api/ready` يعيد "ready"
- [x] **Performance**: Response time < 2s
- [x] **Database**: Database connectivity
- [x] **SSL**: Certificate expiry
- [ ] **Disk Space**: (يحتاج إعداد إضافي)
- [ ] **Memory**: (يحتاج إعداد إضافي)

---

## 📧 Alert Templates

### Email Alert Template

```
Subject: 🚨 ALERT: ABUD Platform - {STATUS}

Body:
Monitor: {MONITOR_NAME}
Status: {STATUS}
Time: {TIMESTAMP}
Duration: {DURATION}

Action Required:
1. Check https://abud.fun/api/health
2. SSH to VPS: ssh abdullah@72.62.39.204
3. Check PM2: pm2 status
4. Check logs: pm2 logs abud --lines 50

Quick Fix:
pm2 restart abud
```

### SMS Alert Template

```
🚨 ABUD DOWN
{MONITOR_NAME}
Check: https://abud.fun/api/health
```

---

## 🎯 Alert Rules

### CRITICAL Alerts (فوري)

```yaml
Conditions:
  - Health endpoint returns 503
  - Homepage returns 5xx
  - Database disconnected
  - Uptime < 99%

Actions:
  - Email فوراً
  - SMS بعد 2 دقيقة
  - Slack notification
```

### WARNING Alerts (خلال ساعة)

```yaml
Conditions:
  - Response time > 2s
  - Memory usage > 80%
  - Disk space > 80%
  - Error rate > 1%

Actions:
  - Email
  - Slack notification
```

### INFO Alerts (يومي)

```yaml
Conditions:
  - Daily uptime report
  - Performance summary
  - Error summary

Actions:
  - Email digest
```

---

## 🔧 Testing Alerts

### اختبار التنبيهات

```bash
# 1. إيقاف التطبيق مؤقتاً
ssh abdullah@72.62.39.204
pm2 stop abud

# 2. انتظر 1-2 دقيقة
# يجب أن تصلك تنبيهات

# 3. إعادة تشغيل التطبيق
pm2 start abud

# 4. تحقق من وصول تنبيه "UP"
```

---

## 📊 Monitoring Dashboard

### إنشاء Dashboard بسيط

يمكنك استخدام:
1. **UptimeRobot Status Page** (مجاني)
2. **Better Stack Status Page** (مجاني)
3. **Custom HTML Page** (متقدم)

### مثال Custom Status Page

```html
<!DOCTYPE html>
<html dir="rtl">
<head>
  <title>حالة ABUD Platform</title>
  <script>
    async function checkStatus() {
      const response = await fetch('https://abud.fun/api/health');
      const data = await response.json();
      document.getElementById('status').textContent = data.status;
      document.getElementById('uptime').textContent = data.checks.application.uptime;
    }
    setInterval(checkStatus, 60000); // كل دقيقة
    checkStatus();
  </script>
</head>
<body>
  <h1>حالة ABUD Platform</h1>
  <p>الحالة: <span id="status">...</span></p>
  <p>Uptime: <span id="uptime">...</span></p>
</body>
</html>
```

---

## 🚀 Next Steps

بعد إعداد التنبيهات:

1. ✅ اختبر جميع التنبيهات
2. ✅ راجع التنبيهات أسبوعياً
3. ✅ ضبط thresholds حسب الحاجة
4. ✅ أضف monitors إضافية حسب الحاجة
5. ✅ وثّق أي تغييرات

---

## 📞 جهات الاتصال للطوارئ

```
Primary: [بريدك الأساسي]
Secondary: [بريد بديل]
SMS: [رقم هاتفك]
Slack: #alerts
```

---

## 📚 موارد إضافية

- [UptimeRobot API Docs](https://uptimerobot.com/api/)
- [Better Stack Docs](https://betterstack.com/docs/)
- [Pingdom API](https://docs.pingdom.com/)

---

**آخر تحديث**: 2026-03-17  
**المسؤول**: Abdullah
