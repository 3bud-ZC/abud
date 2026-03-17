#!/bin/bash

#######################################
# Database Backup Script
# ABUD Platform - PostgreSQL Backup
#######################################

set -e  # Exit on error

# Configuration
DB_NAME="abud_platform"
DB_USER="abud_user"
BACKUP_DIR="/home/abdullah/backups/database"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="abud_db_${TIMESTAMP}.sql.gz"
RETENTION_DAYS=7

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Database Backup Started ===${NC}"
echo "Timestamp: $(date)"
echo "Database: ${DB_NAME}"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Check if PostgreSQL is running
if ! systemctl is-active --quiet postgresql; then
    echo -e "${RED}ERROR: PostgreSQL is not running${NC}"
    exit 1
fi

# Perform database dump
echo -e "${YELLOW}Creating database dump...${NC}"
if sudo -u postgres pg_dump "${DB_NAME}" | gzip > "${BACKUP_DIR}/${BACKUP_FILE}"; then
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully${NC}"
    echo "File: ${BACKUP_FILE}"
    echo "Size: ${BACKUP_SIZE}"
    echo "Location: ${BACKUP_DIR}/${BACKUP_FILE}"
else
    echo -e "${RED}✗ Backup failed${NC}"
    exit 1
fi

# Verify backup file exists and is not empty
if [ ! -s "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
    echo -e "${RED}ERROR: Backup file is empty or doesn't exist${NC}"
    exit 1
fi

# Clean up old backups (keep last RETENTION_DAYS days)
echo -e "${YELLOW}Cleaning up old backups...${NC}"
find "${BACKUP_DIR}" -name "abud_db_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete
REMAINING_BACKUPS=$(find "${BACKUP_DIR}" -name "abud_db_*.sql.gz" -type f | wc -l)
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo "Remaining backups: ${REMAINING_BACKUPS}"

# Create metadata file
METADATA_FILE="${BACKUP_DIR}/${BACKUP_FILE}.meta"
cat > "${METADATA_FILE}" << EOF
Backup Date: $(date)
Database: ${DB_NAME}
Backup File: ${BACKUP_FILE}
Size: ${BACKUP_SIZE}
Status: Success
EOF

echo -e "${GREEN}=== Database Backup Completed ===${NC}"
echo ""

exit 0
