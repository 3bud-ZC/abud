#!/bin/bash
# ============================================================
# سكريبت إعداد VPS الأول لمشروع ABUD Platform
# يُشغَّل مرة واحدة فقط على الـ VPS
# الأوامر: bash vps-setup.sh
# ============================================================
set -e

REPO_URL="https://github.com/3bud-ZC/abud.git"
APP_DIR="/home/abdullah/abud-platform"
DOMAIN="abud.fun"
APP_PORT=3000
NODE_VERSION="20"

echo "=========================================="
echo " ABUD Platform — إعداد VPS الأول"
echo "=========================================="

# ── 1. تحديث النظام ──────────────────────────────────────
echo ""
echo ">>> [1/9] تحديث حزم النظام..."
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y git curl wget unzip ufw

# ── 2. تثبيت Node.js ─────────────────────────────────────
echo ""
echo ">>> [2/9] تثبيت Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node: $(node -v) | npm: $(npm -v)"

# ── 3. تثبيت PM2 ─────────────────────────────────────────
echo ""
echo ">>> [3/9] تثبيت PM2..."
if ! command -v pm2 &>/dev/null; then
  sudo npm install -g pm2
fi
pm2 startup systemd -u abdullah --hp /home/abdullah || true

# ── 4. تثبيت Nginx ───────────────────────────────────────
echo ""
echo ">>> [4/9] تثبيت وإعداد Nginx..."
sudo apt-get install -y nginx
sudo systemctl enable nginx

# ── 5. استنساخ المشروع ───────────────────────────────────
echo ""
echo ">>> [5/9] استنساخ المشروع..."
if [ -d "$APP_DIR" ]; then
  echo "  المجلد موجود — تحديث..."
  cd $APP_DIR && git pull origin main
else
  git clone $REPO_URL $APP_DIR
fi
cd $APP_DIR

# ── 6. إعداد متغيرات البيئة ──────────────────────────────
echo ""
echo ">>> [6/9] إعداد ملف .env..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  # توليد SESSION_SECRET عشوائي
  SECRET=$(openssl rand -hex 32)
  sed -i "s|change-this-to-a-very-long-random-secret-minimum-32-characters|$SECRET|g" .env
  sed -i "s|http://localhost:3000|https://$DOMAIN|g" .env
  echo "  ✅ تم إنشاء .env — راجع القيم وعدّلها حسب الحاجة"
else
  echo "  .env موجود بالفعل — لم يتغير"
fi

# ── 7. تثبيت Dependencies والبناء ────────────────────────
echo ""
echo ">>> [7/9] تثبيت الـ dependencies والبناء..."
mkdir -p public/uploads
npm ci
npx prisma generate
npx prisma db push --force-reset
npm run build

# ── 8. تشغيل المشروع بـ PM2 ──────────────────────────────
echo ""
echo ">>> [8/9] تشغيل المشروع بـ PM2..."
pm2 start ecosystem.config.js --env production
pm2 save

# ── 9. إعداد Nginx وفتح البورتات ─────────────────────────
echo ""
echo ">>> [9/9] إعداد Nginx + Firewall + SSL..."

# نسخ nginx.conf
sudo cp $APP_DIR/nginx.conf /etc/nginx/sites-available/abud-platform
sudo ln -sf /etc/nginx/sites-available/abud-platform /etc/nginx/sites-enabled/abud-platform
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# SSL عبر Certbot
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN \
  --non-interactive --agree-tos \
  --email abed@abud.fun \
  --redirect || echo "⚠️  SSL يحتاج DNS يشير للـ IP أولاً"

# auto-renew
sudo systemctl enable certbot.timer

echo ""
echo "=========================================="
echo " ✅ تم الإعداد بنجاح!"
echo " 🌐 الموقع: https://$DOMAIN"
echo " 📊 PM2:    pm2 status"
echo " 📋 Logs:   pm2 logs abud-platform"
echo "=========================================="
