"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Crop, Upload, X } from "lucide-react";

const PREVIEW_SIZE = 280;
const OUTPUT_SIZE = 900;

interface Props {
  value?: string;
  onUploaded: (url: string) => void;
}

export default function ImageCropUploader({ value, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState<string>("profile");
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    return () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    };
  }, [sourceUrl]);

  const hasSource = !!sourceUrl && naturalSize.width > 0 && naturalSize.height > 0;

  const previewStyle = useMemo(() => {
    if (!hasSource) return {};
    const baseScale = Math.max(PREVIEW_SIZE / naturalSize.width, PREVIEW_SIZE / naturalSize.height);
    const scale = baseScale * zoom;
    return {
      width: naturalSize.width,
      height: naturalSize.height,
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
      transformOrigin: "center center",
    };
  }, [hasSource, naturalSize.height, naturalSize.width, offsetX, offsetY, zoom]);

  async function handleSelect(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("اختر ملف صورة فقط");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      setSourceUrl(url);
      setSourceName(file.name.replace(/\.[^.]+$/, "") || "profile");
      setNaturalSize({ width: img.width, height: img.height });
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error("تعذر قراءة الصورة");
    };
    img.src = url;
  }

  async function uploadCropped() {
    if (!sourceUrl || !hasSource) return;
    setUploading(true);
    try {
      const img = new Image();
      img.src = sourceUrl;
      await img.decode();

      const baseScale = Math.max(PREVIEW_SIZE / naturalSize.width, PREVIEW_SIZE / naturalSize.height);
      const scale = baseScale * zoom;
      const ratio = OUTPUT_SIZE / PREVIEW_SIZE;

      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas_failed");

      ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
      ctx.translate(OUTPUT_SIZE / 2 + offsetX * ratio, OUTPUT_SIZE / 2 + offsetY * ratio);
      ctx.scale(scale * ratio, scale * ratio);
      ctx.drawImage(img, -naturalSize.width / 2, -naturalSize.height / 2, naturalSize.width, naturalSize.height);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/webp", 0.92);
      });
      if (!blob) throw new Error("blob_failed");

      const file = new File([blob], `${sourceName}-${Date.now()}.webp`, { type: "image/webp" });
      const form = new FormData();
      form.append("file", file);
      form.append("context", "image");

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) throw new Error(data?.error || "upload_failed");

      onUploaded(data.url);
      setSourceUrl(null);
      setNaturalSize({ width: 0, height: 0 });
      toast.success("تم قص ورفع الصورة بنجاح");
    } catch {
      toast.error("فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-outline text-sm gap-2 inline-flex items-center"
          disabled={uploading}
        >
          <Upload className="w-4 h-4" />
          اختيار صورة
        </button>
        {hasSource && (
          <>
            <button
              type="button"
              onClick={() => void uploadCropped()}
              className="btn-primary text-sm gap-2 inline-flex items-center"
              disabled={uploading}
            >
              <Crop className="w-4 h-4" />
              {uploading ? "جاري الرفع..." : "قص ورفع"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (sourceUrl) URL.revokeObjectURL(sourceUrl);
                setSourceUrl(null);
                setNaturalSize({ width: 0, height: 0 });
              }}
              className="btn-outline text-sm gap-2 inline-flex items-center"
              disabled={uploading}
            >
              <X className="w-4 h-4" />
              إلغاء
            </button>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => void handleSelect(e.target.files?.[0])}
      />

      {hasSource && sourceUrl && (
        <div className="space-y-3 rounded-2xl border border-[#1a1a2e] bg-[#090914] p-4">
          <div
            className="mx-auto relative overflow-hidden rounded-xl border border-purple-600/30 bg-[#0f0f1a]"
            style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
          >
            <img src={sourceUrl} alt="preview" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={previewStyle} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <label className="space-y-1">
              <span className="text-[#a0a0b8] text-xs">تكبير</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[#a0a0b8] text-xs">تحريك أفقي</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={offsetX}
                onChange={(e) => setOffsetX(parseInt(e.target.value, 10))}
                className="w-full accent-purple-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[#a0a0b8] text-xs">تحريك رأسي</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={offsetY}
                onChange={(e) => setOffsetY(parseInt(e.target.value, 10))}
                className="w-full accent-purple-500"
              />
            </label>
          </div>
        </div>
      )}

      {value && !hasSource && (
        <div className="flex items-center gap-2">
          <img src={value} alt="current profile" className="w-16 h-16 rounded-xl object-cover border border-[#1a1a2e]" />
          <span className="text-xs text-[#8080a0] break-all" dir="ltr">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}

