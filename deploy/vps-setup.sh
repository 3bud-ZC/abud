#!/bin/bash

# VPS Deployment Script for ABUD Platform
# This script automates the deployment process on Ubuntu 24.04 LTS

set -e

echo "🚀 Starting ABUD Platform Deployment..."

# Variables
PROJECT_NAME="abud"
PROJECT_PATH="/home/abdullah/abud"
GITHUB_REPO="https://github.com/3bud-ZC/abud.git"
DOMAIN="abud.fun"
VPS_DOMAIN="abud-vps.icu"
NODE_VERSION="18"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Update system packages
print_message "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Step 2: Install required packages
print_message "Installing required packages..."
sudo apt install -y git curl wget build-essential nginx certbot python3-certbot-nginx postgresql postgresql-contrib

# Step 3: Install Node.js
print_message "Installing Node.js ${NODE_VERSION}..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Verify Node.js installation
node -v
npm -v

# Step 4: Install PM2
print_message "Installing PM2..."
sudo npm install -g pm2

# Step 5: Clone or update repository
if [ -d "$PROJECT_PATH" ]; then
    print_warning "Project directory exists. Pulling latest changes..."
    cd $PROJECT_PATH
    git pull origin main
else
    print_message "Cloning repository..."
    git clone $GITHUB_REPO $PROJECT_PATH
    cd $PROJECT_PATH
fi

# Step 6: Install project dependencies
print_message "Installing project dependencies..."
npm install

# Step 7: Setup PostgreSQL database
print_message "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE abud_platform;" 2>/dev/null || print_warning "Database already exists"
sudo -u postgres psql -c "CREATE USER abud_user WITH PASSWORD 'secure_password_here';" 2>/dev/null || print_warning "User already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE abud_platform TO abud_user;"
sudo -u postgres psql -c "ALTER DATABASE abud_platform OWNER TO abud_user;"

# Step 8: Create .env file
print_message "Creating production .env file..."
cat > $PROJECT_PATH/.env << EOF
# Database
DATABASE_URL="postgresql://abud_user:secure_password_here@localhost:5432/abud_platform"

# Session
SESSION_SECRET="$(openssl rand -base64 32)"

# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}"

# Upload
UPLOAD_DIR="public/uploads"

# Server
PORT=3000
EOF

# Step 9: Run database migrations
print_message "Running database migrations..."
npx prisma generate
npx prisma db push
npx prisma db seed

# Step 10: Build the project
print_message "Building the project..."
npm run build

# Step 11: Setup PM2
print_message "Setting up PM2 process..."
pm2 delete $PROJECT_NAME 2>/dev/null || true
pm2 start npm --name "$PROJECT_NAME" -- start
pm2 save
pm2 startup systemd -u abdullah --hp /home/abdullah

# Step 12: Configure Nginx
print_message "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/$PROJECT_NAME > /dev/null << 'NGINX_EOF'
# HTTP redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name abud.fun www.abud.fun abud-vps.icu www.abud-vps.icu;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server for abud.fun
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name abud.fun www.abud.fun;

    # SSL certificates (will be added by certbot)
    # ssl_certificate /etc/letsencrypt/live/abud.fun/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/abud.fun/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Client max body size
    client_max_body_size 50M;

    # Proxy to Next.js
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
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /uploads {
        alias /home/abdullah/abud/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}

# HTTPS server for abud-vps.icu
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name abud-vps.icu www.abud-vps.icu;

    # SSL certificates (will be added by certbot)
    # ssl_certificate /etc/letsencrypt/live/abud-vps.icu/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/abud-vps.icu/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy to Next.js
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
}
NGINX_EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Step 13: Setup SSL with Let's Encrypt
print_message "Setting up SSL certificates..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN -d $VPS_DOMAIN -d www.$VPS_DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN --redirect

# Step 14: Setup automatic SSL renewal
print_message "Setting up automatic SSL renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Step 15: Configure firewall
print_message "Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Final checks
print_message "Running final checks..."
pm2 status
sudo systemctl status nginx

print_message "✅ Deployment completed successfully!"
print_message "Your website should now be accessible at:"
print_message "  - https://${DOMAIN}"
print_message "  - https://${VPS_DOMAIN}"
print_message ""
print_message "Useful commands:"
print_message "  - View logs: pm2 logs $PROJECT_NAME"
print_message "  - Restart app: pm2 restart $PROJECT_NAME"
print_message "  - Update code: cd $PROJECT_PATH && git pull && npm install && npm run build && pm2 restart $PROJECT_NAME"
