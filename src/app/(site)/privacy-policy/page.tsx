import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | ABUD",
  description: "سياسة الخصوصية لمنصة ABUD — كيف نجمع بياناتك ونستخدمها ونحميها.",
  alternates: { canonical: "https://abud.fun/privacy-policy" },
  openGraph: { url: "https://abud.fun/privacy-policy", title: "سياسة الخصوصية | ABUD" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.25)" }}>
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-3xl font-black text-white">سياسة الخصوصية</h1>
          </div>
          <p className="text-sm" style={{ color: "#505070" }}>آخر تحديث: مارس 2026</p>
        </div>

        <div className="space-y-8" style={{ color: "#9090b0", lineHeight: 1.85, fontSize: "0.95rem" }}>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. المعلومات التي نجمعها</h2>
            <p>نجمع المعلومات التي تقدمها طوعاً عند التسجيل أو إتمام الطلبات، وتشمل: الاسم، البريد الإلكتروني، وبيانات الدفع اللازمة لإتمام المعاملات. كما نجمع تلقائياً بيانات تقنية مثل عنوان IP ونوع المتصفح وصفحات الزيارة لتحسين تجربتك.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. كيف نستخدم معلوماتك</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>إتمام الطلبات وتسليم المنتجات الرقمية</li>
              <li>إرسال تحديثات الطلبات والفواتير</li>
              <li>إرسال النشرة البريدية (إن اشتركت فيها)</li>
              <li>تحليل استخدام الموقع لتحسين الخدمة</li>
              <li>الامتثال للمتطلبات القانونية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. حماية بياناتك</h2>
            <p>نستخدم بروتوكول HTTPS لتشفير جميع الاتصالات. لا نخزن بيانات بطاقات الدفع على خوادمنا — تُعالج المدفوعات عبر بوابات آمنة معتمدة. لا نبيع بياناتك لأي طرف ثالث.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. ملفات تعريف الارتباط (Cookies)</h2>
            <p>نستخدم cookies أساسية لضمان عمل الموقع بشكل صحيح، وcookies تحليلية (Google Analytics) لفهم أنماط الاستخدام. يمكنك تعطيل الcookies من إعدادات متصفحك في أي وقت.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. الاحتفاظ بالبيانات</h2>
            <p>نحتفظ ببياناتك طالما حسابك نشط أو لمدة ثلاث سنوات بعد آخر معاملة. يمكنك طلب حذف بياناتك في أي وقت بالتواصل معنا.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. حقوقك</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>حق الوصول إلى بياناتك الشخصية</li>
              <li>حق تصحيح البيانات غير الدقيقة</li>
              <li>حق طلب حذف بياناتك</li>
              <li>حق إلغاء الاشتراك في النشرة البريدية في أي وقت</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. التواصل معنا</h2>
            <p>لأي استفسارات تتعلق بالخصوصية، يرجى التواصل عبر: <a href="mailto:abed@abud.fun" className="text-purple-400 hover:underline">abed@abud.fun</a></p>
          </section>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              شروط الخدمة
            </Link>
            <Link href="/contact" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
