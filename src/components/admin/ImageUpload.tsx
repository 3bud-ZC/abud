"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, placeholder = "ارفع صورة أو أدخل الرابط", className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("يرجى اختيار ملف صورة فقط");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يجب ألا يتجاوز 5 ميجابايت");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      onChange(data.url);
    } catch {
      alert("فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter");
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    if (url) onChange(url);
    setShowUrlInput(false);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {value ? (
        <div className="relative group">
          <img src={value} alt="Uploaded" className="w-full h-48 object-cover rounded-xl border border-[#1a1a2e]" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              title="تغيير الصورة"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChange("")}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="حذف الصورة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? "border-purple-600 bg-purple-600/10"
              : "border-[#1a1a2e] hover:border-[#2a2a3e]"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
              <span className="text-sm text-[#a0a0b8]">جاري الرفع...</span>
            </div>
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-[#3a3a4e] mx-auto mb-3" />
              <p className="text-sm text-[#a0a0b8] mb-4">{placeholder}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                >
                  اختر صورة
                </button>
                <button
                  onClick={() => setShowUrlInput(true)}
                  className="px-4 py-2 bg-[#1a1a2e] text-white text-sm rounded-lg hover:bg-[#2a2a3e] transition-colors"
                >
                  أدخل رابط
                </button>
              </div>
              <p className="text-xs text-[#606080] mt-3">أو اسحب وأفلت الصورة هنا</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
      />

      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            name="url"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            dir="ltr"
          />
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
            حفظ
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="px-4 py-2 bg-[#1a1a2e] text-white text-sm rounded-lg hover:bg-[#2a2a3e] transition-colors"
          >
            إلغاء
          </button>
        </form>
      )}
    </div>
  );
}
