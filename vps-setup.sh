#!/bin/bash
# ============================================================
# سكريبت استبدال الموقع القديم على abud.fun بـ ABUD Platform
# يُشغَّل مرة واحدة فقط على الـ VPS
# الأوامر: bash vps-setup.sh
# ============================================================
set -e

REPO_URL="https://github.com/3bud-ZC/abud.git"
APP_DIR="/home/abdullah/abud-platform"
DOMAIN="abud.fun"
APP_PORT=3000
NODE_VERSION="20"
BACKUP_DIR="/home/abdullah/backups/$(date +%Y%m%d_%H%M%S)"

echo "=========================================="
echo " ABUD Platform — استبدال الموقع على $DOMAIN"
echo "=========================================="

# ── 0. نسخة احتياطية من الموقع القديم ────────────────────
echo ""
echo ">>> [0/10] نسخة احتياطية من الموقع القديم..."
mkdir -p "$BACKUP_DIR"

# backup nginx configs القديمة
sudo cp -r /etc/nginx/sites-available/ "$BACKUP_DIR/nginx-sites-available/" 2>/dev/null || true
sudo cp -r /etc/nginx/sites-enabled/  "$BACKUP_DIR/nginx-sites-enabled/"  2>/dev/null || true
echo "  ✅ Nginx configs محفوظة في $BACKUP_DIR"

# backup الـ database القديمة لو موجودة
if [ -f "/home/abdullah/abud-private/data/dev.db" ]; then
  cp "/home/abdullah/abud-private/data/dev.db" "$BACKUP_DIR/old-database.db" 2>/dev/null || true
  echo "  ✅ قاعدة البيانات القديمة محفوظة"
fi

# ── 1. إيقاف الموقع القديم بشكل آمن ─────────────────────
echo ""
echo ">>> [1/10] إيقاف الموقع القديم على $DOMAIN..."

# إيقاف أي PM2 processes قديمة
pm2 list 2>/dev/null && pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true
echo "  ✅ PM2 processes قديمة أُوقفت"

# إيقاف أي process على البورت 3000
fuser -k ${APP_PORT}/tcp 2>/dev/null || true
echo "  ✅ البورت $APP_PORT تم تحريره"

# إزالة الـ nginx config القديمة للدومين
sudo rm -f /etc/nginx/sites-enabled/default
sudo rm -f /etc/nginx/sites-enabled/*abud*
sudo rm -f /etc/nginx/sites-available/*abud*
echo "  ✅ Nginx config القديمة أُزيلت"

# ── 2. تحديث النظام ──────────────────────────────────────
echo ""
echo ">>> [2/10] تحديث حزم النظام..."
sudo apt-get update -y
sudo apt-get install -y git curl wget unzip ufw openssl

# ── 3. تثبيت Node.js ─────────────────────────────────────
echo ""
echo ">>> [3/10] تثبيت / تحديث Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null || [[ "$(node -v)" != *"v${NODE_VERSION}"* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "  Node: $(node -v) | npm: $(npm -v)"

# ── 4. تثبيت PM2 ─────────────────────────────────────────
echo ""
echo ">>> [4/10] تثبيت PM2..."
if ! command -v pm2 &>/dev/null; then
  sudo npm install -g pm2
fi
# تفعيل pm2 عند الـ boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u abdullah --hp /home/abdullah 2>/dev/null || true
echo "  ✅ PM2 جاهز"

# ── 5. تثبيت Nginx ───────────────────────────────────────
echo ""
echo ">>> [5/10] تثبيت / إعداد Nginx..."
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# ── 6. استنساخ / تحديث المشروع ──────────────────────────
echo ""
echo ">>> [6/10] تحميل المشروع الجديد..."
if [ -d "$APP_DIR/.git" ]; then
  echo "  المشروع موجود — سحب آخر تحديث..."
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/main
else
  echo "  استنساخ المشروع لأول مرة..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi
mkdir -p public/uploads
echo "  ✅ الكود محدّث"

# ── 7. إعداد ملف .env ────────────────────────────────────
echo ""
echo ">>> [7/10] إعداد ملف .env..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  SECRET=$(openssl rand -hex 32)
  sed -i "s|change-this-to-a-very-long-random-secret-minimum-32-characters|$SECRET|g" .env
  sed -i "s|http://localhost:3000|https://$DOMAIN|g" .env
  sed -i "s|admin@abud.com|abed@abud.fun|g" .env
  echo "  ✅ .env أُنشئ تلقائيًا — راجعه إذا أردت تعديلاً"
else
  echo "  .env موجود — لم يتغير"
fi

# ── 8. تثبيت Dependencies وبناء المشروع ──────────────────
echo ""
echo ">>> [8/10] تثبيت الـ dependencies والبناء..."
npm ci --omit=dev
npx prisma generate
npx prisma db push
npm run build
echo "  ✅ البناء اكتمل"

# ── 9. تشغيل المشروع بـ PM2 ──────────────────────────────
echo ""
echo ">>> [9/10] تشغيل الموقع الجديد بـ PM2..."
pm2 start ecosystem.config.js --env production
pm2 save
echo "  ✅ PM2 يشغّل abud-platform على البورت $APP_PORT"

# ── 10. إعداد Nginx + SSL ────────────────────────────────
echo ""
echo ">>> [10/10] إعداد Nginx + SSL لـ $DOMAIN..."

# نسخ الـ nginx config الجديدة (بدون SSL أولاً — Certbot يضيفه)
cat > /tmp/abud-platform-http.conf << 'NGINXCONF'
server {
    listen 80;
    server_name abud.fun www.abud.fun;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
NGINXCONF

sudo cp /tmp/abud-platform-http.conf /etc/nginx/sites-available/abud-platform
sudo ln -sf /etc/nginx/sites-available/abud-platform /etc/nginx/sites-enabled/abud-platform
sudo nginx -t && sudo systemctl reload nginx
echo "  ✅ Nginx يعمل على HTTP"

# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# SSL عبر Certbot
sudo apt-get install -y certbot python3-certbot-nginx
echo "  جاري الحصول على شهادة SSL..."
sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos \
  --email abed@abud.fun \
  --redirect 2>&1 || {
    echo "  ⚠️  SSL لم يُفعَّل — تأكد أن DNS يشير لـ IP: $(curl -s ifconfig.me)"
    echo "  ثم شغّل: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  }

sudo systemctl enable certbot.timer 2>/dev/null || true

echo ""
echo "=========================================="
echo " ✅ الموقع الجديد يعمل على $DOMAIN"
echo ""
echo " 🌐 https://$DOMAIN"
echo " 📊 حالة PM2:  pm2 status"
echo " 📋 Logs:      pm2 logs abud-platform"
echo " 🔄 إعادة تشغيل: pm2 restart abud-platform"
echo " 💾 Backup في: $BACKUP_DIR"
echo "=========================================="
