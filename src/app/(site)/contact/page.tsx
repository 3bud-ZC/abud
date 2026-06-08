import Link from "next/link";
import { MessageSquare, Mail, MessageCircle, Briefcase, BookOpen, Folder, Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import ContactFormClient from "./ContactFormClient";
import { prisma } from "@/lib/prisma";

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

async function loadContactSettings() {
  const defaults = {
    siteEmail: "abed@abud.fun",
    whatsappNumber: "201080672974",
    telegramUrl: "https://t.me/abud_dev",
  };

  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["site_email", "whatsapp_number"] } },
      select: { key: true, value: true },
    });

    const map = rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});

    return {
      siteEmail: map.site_email || defaults.siteEmail,
      whatsappNumber: (map.whatsapp_number || defaults.whatsappNumber).replace(/\D/g, "") || defaults.whatsappNumber,
      telegramUrl: defaults.telegramUrl,
    };
  } catch {
    return defaults;
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const initialSubject = getParam(searchParams?.subject);
  const initialMessage = getParam(searchParams?.message);

  const { siteEmail, whatsappNumber, telegramUrl } = await loadContactSettings();

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحبًا، وصلت من abud.fun ومهتم أبدأ مشروع.")}`;
  const mailtoLink = `mailto:${siteEmail}?subject=${encodeURIComponent(initialSubject || "طلب مشروع جديد")}`;

  return (
    <div className="pt-20">
      <section className="relative py-20 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 mb-6">
              <MessageSquare className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400 text-xs font-medium">Contact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5">تواصل معي لبدء مشروعك</h1>
            <p className="text-[#a0a0b8] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              سواء محتاج موقع، نظام ERP، بوت تيليجرام، أو أداة AI، ابعتلي تفاصيل فكرتك.
            </p>
            <p className="text-[#c4b5fd] text-sm md:text-base mt-4">
              ابعت فكرة مشروعك وهرد عليك بخطة مبدئية وتكلفة تقريبية.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-4 pb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HolographicCard duration={5}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block p-5 h-full">
              <MessageCircle className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-bold mb-1">WhatsApp</h3>
              <p className="text-[#9ea0bf] text-sm">رد سريع للمشاريع العاجلة</p>
            </a>
          </HolographicCard>

          <HolographicCard duration={5.5}>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="block p-5 h-full">
              <Send className="w-6 h-6 text-sky-400 mb-3" />
              <h3 className="text-white font-bold mb-1">Telegram</h3>
              <p className="text-[#9ea0bf] text-sm">مناسب للتفاصيل والمتابعة</p>
            </a>
          </HolographicCard>

          <HolographicCard duration={6}>
            <a href={mailtoLink} className="block p-5 h-full">
              <Mail className="w-6 h-6 text-purple-300 mb-3" />
              <h3 className="text-white font-bold mb-1">Email</h3>
              <p className="text-[#9ea0bf] text-sm" dir="ltr">{siteEmail}</p>
            </a>
          </HolographicCard>

          <HolographicCard duration={6.5}>
            <Link href="/quote" className="block p-5 h-full">
              <Briefcase className="w-6 h-6 text-amber-300 mb-3" />
              <h3 className="text-white font-bold mb-1">طلب عرض سعر</h3>
              <p className="text-[#9ea0bf] text-sm">احسب نطاق تكلفة مشروعك</p>
            </Link>
          </HolographicCard>
        </div>
      </section>

      <section className="py-16 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={13} direction="vertical" />
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <AnimatedSection>
              <ContactFormClient
                initialSubject={initialSubject}
                initialMessage={initialMessage}
                fallbackEmail={siteEmail}
              />
            </AnimatedSection>
          </div>

          <div className="md:col-span-2 space-y-5">
            <AnimatedSection delay={0.1}>
              <HolographicCard duration={5}>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-sm mb-2">ملاحظة مهمة</h3>
                  <p className="text-[#a0a0b8] text-sm leading-relaxed">
                    لو الفورم لم يعمل لأي سبب، استخدم الروابط المباشرة بالأعلى (واتساب / تيليجرام / إيميل) — كلها تعمل فورًا.
                  </p>
                </div>
              </HolographicCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <HolographicCard duration={6}>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-sm mb-3">روابط مفيدة قبل التواصل</h3>
                  <div className="space-y-2">
                    <Link href="/services" className="btn-outline w-full justify-between text-xs inline-flex items-center">
                      <span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />الخدمات</span>
                      <span>→</span>
                    </Link>
                    <Link href="/portfolio" className="btn-outline w-full justify-between text-xs inline-flex items-center">
                      <span className="inline-flex items-center gap-1.5"><Folder className="w-3.5 h-3.5" />أعمالي</span>
                      <span>→</span>
                    </Link>
                    <Link href="/blog" className="btn-outline w-full justify-between text-xs inline-flex items-center">
                      <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />المدونة</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </HolographicCard>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
