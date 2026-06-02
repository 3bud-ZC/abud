#!/bin/bash

# Portfolio Update Script for ABUD Platform
# This script pulls latest changes and updates portfolio data

set -e

PROJECT_PATH="/home/abdullah/abud"
PROJECT_NAME="abud"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔄 Starting portfolio update...${NC}"

# Navigate to project directory
cd $PROJECT_PATH

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

# Install dependencies if needed
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npx prisma generate

# Push schema changes if any
echo -e "${YELLOW}🗄️ Pushing database schema...${NC}"
npx prisma db push

# Update portfolio data
echo -e "${GREEN}🎨 Updating portfolio projects...${NC}"
npm run db:seed-portfolio

# Build the project
echo -e "${YELLOW}🏗️ Building project...${NC}"
npm run build

# Restart PM2
echo -e "${YELLOW}🔄 Restarting application...${NC}"
pm2 restart $PROJECT_NAME

# Show status
echo -e "${GREEN}✅ Portfolio update completed!${NC}"
pm2 status
pm2 logs $PROJECT_NAME --lines 10 --nostream
