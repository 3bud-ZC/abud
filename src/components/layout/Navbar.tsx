"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import GlobalSearch, { useGlobalSearch } from "@/components/ui/GlobalSearch";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من أنا" },
  { href: "/services", label: "الخدمات" },
  { href: "/store", label: "المتجر" },
  { href: "/portfolio", label: "أعمالي" },
  { href: "/blog", label: "المدونة" },
  { href: "/resources", label: "المصادر" },
  { href: "/contact", label: "تواصل" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass bar */}
      <div
        className="transition-all duration-500"
        style={scrolled ? {
          background: "rgba(6,6,10,0.82)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.5)"
        } : {
          background: "transparent"
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #9333ea, #6d28d9)",
                  boxShadow: "0 0 0 1px rgba(147,51,234,0.4), 0 4px 12px rgba(147,51,234,0.3)"
                }}
              >
                <Zap className="w-4 h-4 text-white" fill="white" />
              </motion.div>
              <span className="font-black text-[1.1rem] tracking-[0.15em] text-white group-hover:text-purple-300 transition-colors duration-300">
                ABUD
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive ? "text-white" : "text-[#7070a0] hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(147,51,234,0.2)" }}
                        transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search + hamburger */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#606080] hover:text-white transition-all duration-200"
                style={{ background: "rgba(15,12,24,0.7)", border: "1px solid rgba(45,35,70,0.7)" }}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:block text-xs" style={{ color: "#404055" }}>Ctrl K</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg text-[#808090] hover:text-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="القائمة"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "rgba(6,6,10,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-white"
                          : "text-[#707090] hover:text-white"
                      )}
                      style={isActive ? {
                        background: "rgba(147,51,234,0.12)",
                        border: "1px solid rgba(147,51,234,0.2)"
                      } : {}}
                    >
                      {link.label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-3 pb-1">
                <Link href="/store" className="btn-primary w-full justify-center text-sm">
                  تصفح المتجر
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
