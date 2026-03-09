"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Lock, Mail, Eye, EyeOff, Terminal } from "lucide-react";

const schema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "فشل تسجيل الدخول");
        return;
      }
      toast.success("مرحبًا بعودتك!");
      router.push("/admin");
    } catch {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(147,51,234,0.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600/15 border border-purple-600/25 mb-4">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-mono">admin.abud</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">تسجيل الدخول</h1>
          <p className="text-[#a0a0b8] text-sm">لوحة تحكم ABUD Platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-base p-8 space-y-5">
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606080]" />
              <input {...register("email")} type="email" placeholder="admin@abud.com" dir="ltr"
                className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 pr-10 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606080]" />
              <input {...register("password")} type={showPass ? "text" : "password"} placeholder="••••••••" dir="ltr"
                className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 pr-10 pl-10 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#606080] hover:text-white transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />جاري الدخول...</>
            ) : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
