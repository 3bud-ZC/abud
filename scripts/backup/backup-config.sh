#!/bin/bash

#######################################
# Config Backup Script
# ABUD Platform - Configuration Files Backup
#######################################

set -e  # Exit on error

# Configuration
APP_DIR="/home/abdullah/abud"
BACKUP_DIR="/home/abdullah/backups/config"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="abud_config_${TIMESTAMP}.tar.gz"
RETENTION_DAYS=14  # Keep config backups longer

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Config Backup Started ===${NC}"
echo "Timestamp: $(date)"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Create temporary directory for collecting config files
TEMP_DIR=$(mktemp -d)
CONFIG_COLLECT_DIR="${TEMP_DIR}/config"
mkdir -p "${CONFIG_COLLECT_DIR}"

echo -e "${YELLOW}Collecting configuration files...${NC}"

# Backup .env file (critical)
if [ -f "${APP_DIR}/.env" ]; then
    cp "${APP_DIR}/.env" "${CONFIG_COLLECT_DIR}/.env"
    echo "✓ .env"
else
    echo -e "${YELLOW}⚠ .env not found${NC}"
fi

# Backup ecosystem.config.js (PM2 config)
if [ -f "${APP_DIR}/ecosystem.config.js" ]; then
    cp "${APP_DIR}/ecosystem.config.js" "${CONFIG_COLLECT_DIR}/ecosystem.config.js"
    echo "✓ ecosystem.config.js"
fi

# Backup nginx.conf if exists in project
if [ -f "${APP_DIR}/nginx.conf" ]; then
    cp "${APP_DIR}/nginx.conf" "${CONFIG_COLLECT_DIR}/nginx.conf"
    echo "✓ nginx.conf"
fi

# Backup actual nginx site config
if [ -f "/etc/nginx/sites-available/abud.fun" ]; then
    sudo cp "/etc/nginx/sites-available/abud.fun" "${CONFIG_COLLECT_DIR}/nginx-site.conf"
    sudo chown abdullah:abdullah "${CONFIG_COLLECT_DIR}/nginx-site.conf"
    echo "✓ nginx site config"
fi

# Backup package.json and package-lock.json (for dependencies reference)
if [ -f "${APP_DIR}/package.json" ]; then
    cp "${APP_DIR}/package.json" "${CONFIG_COLLECT_DIR}/package.json"
    echo "✓ package.json"
fi

if [ -f "${APP_DIR}/package-lock.json" ]; then
    cp "${APP_DIR}/package-lock.json" "${CONFIG_COLLECT_DIR}/package-lock.json"
    echo "✓ package-lock.json"
fi

# Create system info file
cat > "${CONFIG_COLLECT_DIR}/system-info.txt" << EOF
Backup Date: $(date)
Hostname: $(hostname)
OS: $(lsb_release -d | cut -f2)
Node Version: $(node --version 2>/dev/null || echo "N/A")
PM2 Version: $(pm2 --version 2>/dev/null || echo "N/A")
PostgreSQL Version: $(psql --version 2>/dev/null || echo "N/A")
Nginx Version: $(nginx -v 2>&1 | cut -d'/' -f2 || echo "N/A")
EOF

# Create archive
echo -e "${YELLOW}Creating compressed archive...${NC}"
if tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" -C "${TEMP_DIR}" config; then
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "File: ${BACKUP_FILE}"
    echo "Size: ${BACKUP_SIZE}"
    echo "Location: ${BACKUP_DIR}/${BACKUP_FILE}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    rm -rf "${TEMP_DIR}"
    exit 1
fi

# Cleanup temp directory
rm -rf "${TEMP_DIR}"

# Clean up old backups (keep last RETENTION_DAYS days)
echo -e "${YELLOW}Cleaning up old backups...${NC}"
find "${BACKUP_DIR}" -name "abud_config_*.tar.gz" -type f -mtime +${RETENTION_DAYS} -delete
REMAINING_BACKUPS=$(find "${BACKUP_DIR}" -name "abud_config_*.tar.gz" -type f | wc -l)
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo "Remaining backups: ${REMAINING_BACKUPS}"

# Create metadata file
METADATA_FILE="${BACKUP_DIR}/${BACKUP_FILE}.meta"
cat > "${METADATA_FILE}" << EOF
Backup Date: $(date)
Backup File: ${BACKUP_FILE}
Size: ${BACKUP_SIZE}
Status: Success
Contents: .env, ecosystem.config.js, nginx configs, package files, system info
EOF

echo -e "${GREEN}=== Config Backup Completed ===${NC}"
echo ""

exit 0
