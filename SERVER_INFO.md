# Server Configuration

## Primary VPS Server

### Connection Details
- **IP Address**: 161.35.54.6
- **SSH User**: root
- **SSH Port**: 22 (default)
- **OS**: Ubuntu
- **Access**: `ssh root@161.35.54.6`

### Server Stack
- **Web Server**: Nginx (reverse proxy)
- **Process Manager**: PM2 (for Node.js apps)
- **Database**: PostgreSQL (local installation)
- **Node.js**: Version 20.x
- **SSL**: Let's Encrypt (Certbot)

### Application Paths
- **Default App Path**: `/var/www/<app_name>`
- **This App Path**: `/var/www/abud-platform`
- **Logs Directory**: `/var/www/abud-platform/logs/`
- **Nginx Config**: `/etc/nginx/sites-available/abud-platform`

### Domain Configuration
- **Domain Pattern**: `<app_name>.abud.fun`
- **This App Domain**: `abud-platform.abud.fun`
- **DNS**: A record pointing to 161.35.54.6

---

## Quick Access Commands

### SSH Connection
```bash
ssh root@161.35.54.6
```

### Application Management
```bash
# Navigate to app directory
cd /var/www/abud-platform

# View PM2 processes
pm2 list

# View logs
pm2 logs abud-platform
pm2 logs abud-platform --lines 100

# Restart application
pm2 restart abud-platform

# Reload application (zero-downtime)
pm2 reload abud-platform

# Stop application
pm2 stop abud-platform
```

### Deployment
```bash
# Manual deployment
cd /var/www/abud-platform
git pull origin main
npm ci --omit=dev
npx prisma generate
npm run build
pm2 reload abud-platform
```

### Nginx Management
```bash
# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View Nginx status
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Database Management
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# List databases
sudo -u postgres psql -l

# Backup database
pg_dump -U postgres abud_platform > backup_$(date +%Y%m%d).sql

# Restore database
psql -U postgres abud_platform < backup_20260531.sql
```

---

## GitHub Actions Secrets

For automated deployment via GitHub Actions, configure these secrets in your repository:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `VPS_HOST` | `161.35.54.6` | Server IP address |
| `VPS_USER` | `root` | SSH username |
| `VPS_SSH_KEY` | `<private_key>` | SSH private key for authentication |
| `VPS_PORT` | `22` | SSH port (optional, defaults to 22) |

### How to Add Secrets
1. Go to your GitHub repository
2. Navigate to: Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with the values above

---

## Security Notes

- ✅ SSH key authentication is recommended over password
- ✅ UFW firewall should be enabled (ports 22, 80, 443)
- ✅ SSL certificates should be auto-renewed via Certbot
- ✅ Regular backups should be scheduled
- ⚠️ Never commit sensitive credentials to the repository
- ⚠️ Keep `.env` file secure and never expose it publicly

---

## Monitoring & Maintenance

### Health Checks
```bash
# Check if app is running
curl http://localhost:3000/api/health

# Check public URL
curl https://abud-platform.abud.fun/api/health

# Check disk space
df -h

# Check memory usage
free -h

# Check PM2 status
pm2 status
```

### Log Rotation
PM2 automatically handles log rotation with the following settings:
- Max log size: 10MB
- Retention: 7 days

### Backup Schedule
Recommended backup schedule:
- **Database**: Daily at 2 AM
- **Application files**: Weekly
- **Environment variables**: After each change

---

## Troubleshooting

### App Not Starting
```bash
# Check PM2 logs
pm2 logs abud-platform --err

# Check if port 3000 is in use
netstat -tlnp | grep 3000

# Restart PM2
pm2 restart abud-platform
```

### Nginx 502 Bad Gateway
```bash
# Check if app is running
pm2 list

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Restart both services
pm2 restart abud-platform
systemctl restart nginx
```

### Database Connection Issues
```bash
# Check PostgreSQL status
systemctl status postgresql

# Restart PostgreSQL
systemctl restart postgresql

# Check database URL in .env
cat /var/www/abud-platform/.env | grep DATABASE_URL
```

---

## Contact & Support

For server-related issues or questions:
- Check logs first: `pm2 logs abud-platform`
- Review Nginx logs: `/var/log/nginx/error.log`
- Check GitHub Actions for deployment issues

---

**Last Updated**: 2026-05-31
**Server Status**: Active ✅
**Domain Status**: Configured ✅
**SSL Status**: To be configured 🔄
