import Link from 'next/link'

// 404 頁面
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          頁面不存在
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          抱歉，您要找的頁面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          回到首頁
        </Link>
      </div>
    </div>
  )
}
