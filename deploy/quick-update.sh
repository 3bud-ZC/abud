#!/bin/bash

# Quick Update Script for ABUD Platform
# Use this script to quickly update your production site

set -e

PROJECT_PATH="/home/abdullah/abud"
PROJECT_NAME="abud"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔄 Starting quick update...${NC}"

# Navigate to project directory
cd $PROJECT_PATH

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

# Install new dependencies (if any)
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Run database migrations (if any)
echo -e "${YELLOW}🗄️ Running database migrations...${NC}"
npx prisma generate
npx prisma db push

# Build the project
echo -e "${YELLOW}🏗️ Building project...${NC}"
npm run build

# Restart PM2
echo -e "${YELLOW}🔄 Restarting application...${NC}"
pm2 restart $PROJECT_NAME

# Show status
echo -e "${GREEN}✅ Update completed!${NC}"
pm2 status
