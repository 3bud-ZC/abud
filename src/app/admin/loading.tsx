export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent mb-4" />
        <p className="text-[#a0a0b8] font-medium">جاري تحميل لوحة التحكم...</p>
      </div>
    </div>
  );
}
