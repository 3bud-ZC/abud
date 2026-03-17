#!/bin/bash

#######################################
# Uploads Backup Script
# ABUD Platform - User Files Backup
#######################################

set -e  # Exit on error

# Configuration
APP_DIR="/home/abdullah/abud"
UPLOADS_DIR="${APP_DIR}/public/uploads"
BACKUP_DIR="/home/abdullah/backups/uploads"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="abud_uploads_${TIMESTAMP}.tar.gz"
RETENTION_DAYS=7

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Uploads Backup Started ===${NC}"
echo "Timestamp: $(date)"
echo "Source: ${UPLOADS_DIR}"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Check if uploads directory exists
if [ ! -d "${UPLOADS_DIR}" ]; then
    echo -e "${YELLOW}WARNING: Uploads directory doesn't exist yet${NC}"
    echo "Creating empty backup marker..."
    mkdir -p "${UPLOADS_DIR}"
fi

# Count files to backup
FILE_COUNT=$(find "${UPLOADS_DIR}" -type f 2>/dev/null | wc -l)
echo "Files to backup: ${FILE_COUNT}"

# Create tar.gz backup
echo -e "${YELLOW}Creating compressed archive...${NC}"
if tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" -C "${APP_DIR}/public" uploads 2>/dev/null; then
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "File: ${BACKUP_FILE}"
    echo "Size: ${BACKUP_SIZE}"
    echo "Location: ${BACKUP_DIR}/${BACKUP_FILE}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi

# Verify backup file exists
if [ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
    echo -e "${RED}ERROR: Backup file doesn't exist${NC}"
    exit 1
fi

# Clean up old backups (keep last RETENTION_DAYS days)
echo -e "${YELLOW}Cleaning up old backups...${NC}"
find "${BACKUP_DIR}" -name "abud_uploads_*.tar.gz" -type f -mtime +${RETENTION_DAYS} -delete
REMAINING_BACKUPS=$(find "${BACKUP_DIR}" -name "abud_uploads_*.tar.gz" -type f | wc -l)
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo "Remaining backups: ${REMAINING_BACKUPS}"

# Create metadata file
METADATA_FILE="${BACKUP_DIR}/${BACKUP_FILE}.meta"
cat > "${METADATA_FILE}" << EOF
Backup Date: $(date)
Source: ${UPLOADS_DIR}
Backup File: ${BACKUP_FILE}
File Count: ${FILE_COUNT}
Size: ${BACKUP_SIZE}
Status: Success
EOF

echo -e "${GREEN}=== Uploads Backup Completed ===${NC}"
echo ""

exit 0
