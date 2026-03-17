#!/bin/bash

#######################################
# Master Backup Script
# ABUD Platform - Complete Backup
#######################################

set -e  # Exit on error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_ROOT="/home/abdullah/backups"
LOG_DIR="${BACKUP_ROOT}/logs"
LOG_FILE="${LOG_DIR}/backup_$(date +"%Y%m%d_%H%M%S").log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create log directory
mkdir -p "${LOG_DIR}"

# Function to log messages
log() {
    echo -e "$1" | tee -a "${LOG_FILE}"
}

# Function to run backup script
run_backup() {
    local script_name=$1
    local script_path="${SCRIPT_DIR}/${script_name}"
    
    log "${YELLOW}Running ${script_name}...${NC}"
    
    if [ ! -f "${script_path}" ]; then
        log "${RED}ERROR: Script not found: ${script_path}${NC}"
        return 1
    fi
    
    if bash "${script_path}" >> "${LOG_FILE}" 2>&1; then
        log "${GREEN}✓ ${script_name} completed successfully${NC}"
        return 0
    else
        log "${RED}✗ ${script_name} failed${NC}"
        return 1
    fi
}

# Start backup process
log ""
log "${BLUE}╔════════════════════════════════════════╗${NC}"
log "${BLUE}║   ABUD Platform - Master Backup       ║${NC}"
log "${BLUE}╔════════════════════════════════════════╗${NC}"
log ""
log "Started: $(date)"
log "Log file: ${LOG_FILE}"
log ""

# Track success/failure
TOTAL_BACKUPS=0
SUCCESSFUL_BACKUPS=0
FAILED_BACKUPS=0

# Run database backup
log "${BLUE}[1/3] Database Backup${NC}"
TOTAL_BACKUPS=$((TOTAL_BACKUPS + 1))
if run_backup "backup-db.sh"; then
    SUCCESSFUL_BACKUPS=$((SUCCESSFUL_BACKUPS + 1))
else
    FAILED_BACKUPS=$((FAILED_BACKUPS + 1))
fi
log ""

# Run uploads backup
log "${BLUE}[2/3] Uploads Backup${NC}"
TOTAL_BACKUPS=$((TOTAL_BACKUPS + 1))
if run_backup "backup-uploads.sh"; then
    SUCCESSFUL_BACKUPS=$((SUCCESSFUL_BACKUPS + 1))
else
    FAILED_BACKUPS=$((FAILED_BACKUPS + 1))
fi
log ""

# Run config backup
log "${BLUE}[3/3] Config Backup${NC}"
TOTAL_BACKUPS=$((TOTAL_BACKUPS + 1))
if run_backup "backup-config.sh"; then
    SUCCESSFUL_BACKUPS=$((SUCCESSFUL_BACKUPS + 1))
else
    FAILED_BACKUPS=$((FAILED_BACKUPS + 1))
fi
log ""

# Calculate disk usage
log "${YELLOW}Calculating backup sizes...${NC}"
DB_SIZE=$(du -sh "${BACKUP_ROOT}/database" 2>/dev/null | cut -f1 || echo "N/A")
UPLOADS_SIZE=$(du -sh "${BACKUP_ROOT}/uploads" 2>/dev/null | cut -f1 || echo "N/A")
CONFIG_SIZE=$(du -sh "${BACKUP_ROOT}/config" 2>/dev/null | cut -f1 || echo "N/A")
TOTAL_SIZE=$(du -sh "${BACKUP_ROOT}" 2>/dev/null | cut -f1 || echo "N/A")

# Summary
log ""
log "${BLUE}╔════════════════════════════════════════╗${NC}"
log "${BLUE}║          Backup Summary                ║${NC}"
log "${BLUE}╚════════════════════════════════════════╝${NC}"
log ""
log "Completed: $(date)"
log "Total backups: ${TOTAL_BACKUPS}"
log "Successful: ${GREEN}${SUCCESSFUL_BACKUPS}${NC}"
log "Failed: ${RED}${FAILED_BACKUPS}${NC}"
log ""
log "Backup Sizes:"
log "  Database: ${DB_SIZE}"
log "  Uploads:  ${UPLOADS_SIZE}"
log "  Config:   ${CONFIG_SIZE}"
log "  Total:    ${TOTAL_SIZE}"
log ""
log "Backup Location: ${BACKUP_ROOT}"
log "Log File: ${LOG_FILE}"
log ""

# Clean up old log files (keep last 30 days)
find "${LOG_DIR}" -name "backup_*.log" -type f -mtime +30 -delete 2>/dev/null || true

# Exit with appropriate code
if [ ${FAILED_BACKUPS} -eq 0 ]; then
    log "${GREEN}✓ All backups completed successfully!${NC}"
    log ""
    exit 0
else
    log "${RED}✗ Some backups failed. Check log for details.${NC}"
    log ""
    exit 1
fi
