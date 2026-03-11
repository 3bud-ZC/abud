import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الخدمة | ABUD",
  description: "شروط الخدمة لمنصة ABUD — القواعد والسياسات المنظِّمة لاستخدام الموقع وشراء المنتجات الرقمية.",
  alternates: { canonical: "https://abud.fun/terms" },
  openGraph: { url: "https://abud.fun/terms", title: "شروط الخدمة | ABUD" },
};

export default function TermsPage() {
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
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-3xl font-black text-white">شروط الخدمة</h1>
          </div>
          <p className="text-sm" style={{ color: "#505070" }}>آخر تحديث: مارس 2026</p>
        </div>

        <div className="space-y-8" style={{ color: "#9090b0", lineHeight: 1.85, fontSize: "0.95rem" }}>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. القبول بالشروط</h2>
            <p>باستخدامك لموقع ABUD (abud.fun) أو شرائك أي منتج أو خدمة منه، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام الموقع.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. المنتجات الرقمية</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>جميع المنتجات رقمية وتُسلَّم فوراً بعد تأكيد الدفع عبر البريد الإلكتروني.</li>
              <li>لا يُسمح بإعادة البيع أو إعادة توزيع أي منتج دون إذن كتابي صريح.</li>
              <li>لا يحق للمشتري المطالبة باسترداد المبلغ بعد تسليم الملفات الرقمية إلا في حالة وجود عطل تقني موثّق.</li>
              <li>الترخيص الممنوح للاستخدام الشخصي فقط، ما لم يُنص على خلاف ذلك في صفحة المنتج.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. الخدمات المخصصة</h2>
            <p>تخضع الخدمات المخصصة (تطوير المواقع، بوتات تيليجرام، إلخ) لعقد منفصل يُتفق عليه قبل بدء العمل. يتضمن العقد النطاق والمواعيد وآلية الدفع والتسليم.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. الدفع والفوترة</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>نقبل فودافون كاش، إنستاباي، وPayPal.</li>
              <li>الأسعار المعروضة نهائية وتشمل جميع الرسوم.</li>
              <li>في حالة فشل الدفع، لن يُسلَّم المنتج أو الخدمة حتى تأكيد الدفع.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. الملكية الفكرية</h2>
            <p>جميع المحتويات المنشورة على هذا الموقع — بما فيها المقالات والمنتجات والكود والتصاميم — هي ملكية ABUD المحمية بحقوق الملكية الفكرية. يُحظر نسخها أو إعادة نشرها دون إذن مسبق.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. تحديد المسؤولية</h2>
            <p>تُقدَّم المنتجات والمعلومات &quot;كما هي&quot; دون ضمانات من أي نوع. لن تكون ABUD مسؤولة عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام منتجاتنا أو خدماتنا.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. التغييرات على الشروط</h2>
            <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. سيُنشر إشعار بالتغييرات على هذه الصفحة مع تاريخ التحديث. الاستمرار في استخدام الموقع بعد التغييرات يعني قبولك لها.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. التواصل</h2>
            <p>لأي استفسارات تتعلق بهذه الشروط: <a href="mailto:abed@abud.fun" className="text-purple-400 hover:underline">abed@abud.fun</a></p>
          </section>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              سياسة الخصوصية
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
