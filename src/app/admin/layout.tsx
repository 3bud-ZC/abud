"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Layers, Briefcase,
  MessageSquare, Settings, LogOut, Menu, X,
  ChevronLeft, Terminal, Mail
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "المدونة", icon: BookOpen },
  { href: "/admin/portfolio", label: "البورتفوليو", icon: Layers },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/admin/newsletter", label: "المشتركون", icon: Mail },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("تم تسجيل الخروج");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#050508] flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-40 w-64 bg-[#080810] border-l border-[#1a1a2e] flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-[#1a1a2e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-black text-sm">ABUD Admin</div>
              <div className="text-[#606080] text-xs">لوحة التحكم</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-purple-600 text-white"
                    : "text-[#a0a0b8] hover:bg-[#1a1a2e] hover:text-white"
                }`}>
                <Icon className="w-4 h-4" />
                {label}
                {active && <ChevronLeft className="w-3 h-3 mr-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1a1a2e]">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[#a0a0b8] hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:mr-64 min-h-screen flex flex-col">
        <header className="h-14 bg-[#080810] border-b border-[#1a1a2e] flex items-center justify-between px-5 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[#a0a0b8] hover:text-white">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-[#606080] text-sm">
            {navItems.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))?.label || ""}
          </div>
          <Link href="/" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            عرض الموقع
          </Link>
        </header>
        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
