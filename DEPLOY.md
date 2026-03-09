# ABUD Platform — VPS Deployment Guide

## Prerequisites
- Ubuntu 22.04 VPS (1GB+ RAM recommended)
- A domain name pointed to your VPS IP (A record)
- SSH access to your VPS

---

## Quick Deploy (Automated)

```bash
ssh root@YOUR_VPS_IP
git clone YOUR_REPO_URL /tmp/abud-setup
cd /tmp/abud-setup
bash deploy.sh
```

The script handles everything automatically. When it pauses to ask you to edit `.env`, see the **Environment Variables** section below.

---

## Manual Step-by-Step

### 1. Server Setup

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install essentials
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2
pm2 startup systemd -u root --hp /root
```

### 2. Clone & Configure

```bash
git clone YOUR_REPO_URL /var/www/abud-platform
cd /var/www/abud-platform
cp .env.example .env
nano .env
```

### 3. Environment Variables

Edit `/var/www/abud-platform/.env`:

```env
# Database (SQLite — file path on the server)
DATABASE_URL="file:./prisma/dev.db"

# Auth secret — generate with: openssl rand -base64 32
JWT_SECRET="your-super-secret-key-here"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Your domain
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"

# Admin credentials (set BEFORE first deploy)
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-password"

# Optional: Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your@gmail.com"
SMTP_PASS="your-app-password"
```

### 4. Install & Build

```bash
cd /var/www/abud-platform
npm ci
npx prisma db push
npx tsx prisma/seed.ts
npx tsx prisma/seed-coupons.ts
npx tsx prisma/seed-portfolio.ts
npx tsx prisma/seed-blog.ts
npm run build
```

### 5. Start with PM2

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 list
```

### 6. Nginx Configuration

```bash
# Copy and configure Nginx
sed 's/yourdomain.com/YOUR_DOMAIN/g' /var/www/abud-platform/nginx.conf \
  > /etc/nginx/sites-available/abud-platform

ln -s /etc/nginx/sites-available/abud-platform /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### 7. SSL with Let's Encrypt

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com \
  --non-interactive --agree-tos \
  --email admin@yourdomain.com \
  --redirect
```

SSL auto-renews via systemd timer. Verify: `certbot renew --dry-run`

### 8. Firewall

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

---

## Updates & Redeployment

```bash
cd /var/www/abud-platform
git pull origin main
npm ci
npx prisma db push
npm run build
pm2 reload abud-platform
```

---

## PM2 Management

```bash
pm2 list                      # Show all processes
pm2 logs abud-platform        # View live logs
pm2 logs abud-platform --lines 100   # Last 100 lines
pm2 reload abud-platform      # Zero-downtime reload
pm2 restart abud-platform     # Full restart
pm2 stop abud-platform        # Stop
pm2 monit                     # Live monitoring
```

---

## Database Backup & Restore

```bash
# Backup (SQLite)
cp /var/www/abud-platform/prisma/dev.db \
   /backups/abud-$(date +%Y%m%d-%H%M%S).db

# Automate with cron (daily at 2am)
crontab -e
# Add: 0 2 * * * cp /var/www/abud-platform/prisma/dev.db /backups/abud-$(date +\%Y\%m\%d).db

# Restore
cp /backups/abud-YYYYMMDD.db /var/www/abud-platform/prisma/dev.db
pm2 restart abud-platform
```

---

## Site URLs

| URL | Description |
|-----|-------------|
| `https://yourdomain.com` | Homepage |
| `https://yourdomain.com/store` | Digital Products Store |
| `https://yourdomain.com/services` | Services |
| `https://yourdomain.com/blog` | Blog |
| `https://yourdomain.com/portfolio` | Portfolio / Projects |
| `https://yourdomain.com/faq` | FAQ |
| `https://yourdomain.com/about` | About |
| `https://yourdomain.com/contact` | Contact |
| `https://yourdomain.com/admin` | Admin Dashboard |
| `https://yourdomain.com/sitemap.xml` | Sitemap |

---

## Admin Dashboard

Go to `https://yourdomain.com/admin` and log in with the credentials set in `.env`.

### Admin Pages
- **Orders** — View and manage all orders
- **Products** — Add, edit, deactivate digital products
- **Blog** — Create and manage blog posts
- **Portfolio** — Manage project showcase
- **Services** — Edit service offerings
- **Messages** — View contact form submissions
- **Payments** — Configure payment gateways (Vodafone Cash, InstaPay, PayPal)
- **Coupons** — Create/manage discount codes
- **Subscribers** — Newsletter and lead subscribers (export CSV)
- **Settings** — Site-wide settings

---

## Active Coupons (Seeded)

| Code | Discount | Limit |
|------|----------|-------|
| `WELCOME20` | 20% off | Unlimited |
| `FIRSTBUY10` | 10% off | 100 uses |
| `CYBER15` | 15% off | 50 uses |
| `AITOOLS25` | 25% off | 30 uses |
| `STUDENT30` | 30% off | 200 uses |

---

## Troubleshooting

**Site not loading after deploy:**
```bash
pm2 logs abud-platform --lines 50
systemctl status nginx
```

**Port 3000 not bound:**
```bash
pm2 restart abud-platform
netstat -tlnp | grep 3000
```

**Prisma errors after schema change:**
```bash
cd /var/www/abud-platform
npx prisma db push
pm2 restart abud-platform
```

**Nginx 502 Bad Gateway:**
```bash
# Check if Next.js is running on port 3000
curl http://127.0.0.1:3000
# If not, check PM2
pm2 restart abud-platform
```

**SSL renewal failed:**
```bash
certbot renew --force-renewal
systemctl reload nginx
```

---

## Security Checklist

- [ ] Change `JWT_SECRET` and `NEXTAUTH_SECRET` to strong random values
- [ ] Change default admin password immediately
- [ ] UFW firewall enabled (only 22, 80, 443 open)
- [ ] SSL certificate installed and HTTPS redirect active
- [ ] `DATABASE_URL` points to a file outside web root (or use `/var/www/abud-platform/prisma/`)
- [ ] Daily database backups configured
- [ ] PM2 startup configured so app survives reboots

---

## Architecture

```
[Browser]
    ↓ HTTPS
[Nginx — port 443]
    ↓ proxy_pass
[Next.js — port 3000 — managed by PM2]
    ↓ Prisma ORM
[SQLite Database — /prisma/dev.db]
```

For higher traffic, replace SQLite with PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/abud_platform"
```
Then run `npx prisma db push` and `npx tsx prisma/seed.ts`.
