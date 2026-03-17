#!/bin/bash

# سكريبت إصلاح شامل للنشر على VPS
# تشغيل: bash fix-deployment.sh

set -e

PROJECT_PATH="/home/abdullah/abud"
PROJECT_NAME="abud"

echo "🔧 بدء عملية الإصلاح الشاملة..."

cd $PROJECT_PATH

echo "📥 سحب آخر التحديثات من GitHub..."
git pull origin main

echo "📦 تثبيت التبعيات..."
npm install

echo "🗄️ تحديث Prisma Client..."
npx prisma generate

echo "🌱 إعادة إنشاء بيانات الأدمن..."
npx prisma db push --accept-data-loss
npx prisma db seed

echo "🏗️ بناء المشروع..."
npm run build

echo "🔄 إعادة تشغيل PM2..."
pm2 restart $PROJECT_NAME
pm2 save

echo "✅ تم الإصلاح بنجاح!"
echo ""
echo "📊 حالة التطبيق:"
pm2 status

echo ""
echo "🔐 بيانات الدخول:"
echo "   البريد: admin@abud.com"
echo "   كلمة المرور: admin123456"
echo "   الرابط: https://abud.fun/admin/login"

echo ""
echo "📝 للتحقق من السجلات:"
echo "   pm2 logs $PROJECT_NAME"
