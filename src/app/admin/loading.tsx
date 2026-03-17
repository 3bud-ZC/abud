export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p className="text-gray-700 font-medium">جاري تحميل لوحة التحكم...</p>
      </div>
    </div>
  );
}
