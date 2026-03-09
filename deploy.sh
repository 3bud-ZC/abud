#!/bin/bash
# =============================================================
#  ABUD Platform — VPS Deployment Script
#  Run on your VPS as root or a sudo user.
#  Usage:  bash deploy.sh
# =============================================================
set -e

APP_DIR="/var/www/abud-platform"
REPO_URL="YOUR_GIT_REPO_URL"   # Replace with your GitHub/GitLab URL
DOMAIN="yourdomain.com"         # Replace with your domain
NODE_VERSION="20"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     ABUD Platform — Auto Deploy Script  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── 1. System packages ──────────────────────────────────────
echo "📦 Installing system dependencies..."
apt-get update -q
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

# ── 2. Node.js ──────────────────────────────────────────────
echo "🟢 Installing Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
echo "   Node: $(node -v)  npm: $(npm -v)"

# ── 3. PM2 ──────────────────────────────────────────────────
echo "⚙️  Installing PM2..."
npm install -g pm2 2>/dev/null
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# ── 4. App directory ────────────────────────────────────────
echo "📂 Setting up app directory..."
mkdir -p "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
  echo "   Pulling latest changes..."
  cd "$APP_DIR" && git pull origin main
else
  echo "   Cloning repository..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ── 5. Environment ──────────────────────────────────────────
if [ ! -f "$APP_DIR/.env" ]; then
  echo ""
  echo "⚠️  No .env file found. Creating from .env.example..."
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  echo "   ➡  Edit $APP_DIR/.env before continuing!"
  echo "      Set: DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_SITE_URL"
  read -p "   Press ENTER after editing .env to continue..."
fi

# ── 6. Install dependencies + build ────────────────────────
echo "📦 Installing npm packages..."
cd "$APP_DIR"
npm ci --production=false

echo "🗄️  Running Prisma migrations..."
npx prisma db push

echo "🌱 Seeding database..."
npx tsx prisma/seed.ts              2>/dev/null || true
npx tsx prisma/seed-coupons.ts      2>/dev/null || true
npx tsx prisma/seed-portfolio.ts    2>/dev/null || true
npx tsx prisma/seed-blog.ts         2>/dev/null || true

echo "🏗️  Building Next.js application..."
npm run build

# ── 7. PM2 start / reload ───────────────────────────────────
echo "🚀 Starting/reloading PM2..."
if pm2 describe abud-platform &>/dev/null; then
  pm2 reload ecosystem.config.js --env production
else
  pm2 start ecosystem.config.js --env production
fi
pm2 save

# ── 8. Nginx config ─────────────────────────────────────────
echo "🌐 Configuring Nginx..."
NGINX_CONF="/etc/nginx/sites-available/abud-platform"
sed "s/yourdomain.com/$DOMAIN/g" "$APP_DIR/nginx.conf" > "$NGINX_CONF"
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/abud-platform
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── 9. Firewall ─────────────────────────────────────────────
echo "🔒 Configuring UFW firewall..."
ufw allow 22/tcp comment "SSH"
ufw allow 80/tcp comment "HTTP"
ufw allow 443/tcp comment "HTTPS"
ufw --force enable

# ── 10. SSL ─────────────────────────────────────────────────
echo "🔐 Installing SSL certificate (Let's Encrypt)..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos \
  --email "admin@$DOMAIN" \
  --redirect || echo "   ⚠ Certbot failed — ensure DNS is pointing to this server."

echo ""
echo "✅ Deployment complete!"
echo ""
echo "   🌍 Site:  https://$DOMAIN"
echo "   🔑 Admin: https://$DOMAIN/admin"
echo "   📋 Logs:  pm2 logs abud-platform"
echo "   🔄 Reload: pm2 reload abud-platform"
echo ""
