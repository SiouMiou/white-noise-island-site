// 檔案路徑：app/loading.tsx
// 全域 loading 組件
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">載入中...</p>
      </div>
    </div>
  )
}
