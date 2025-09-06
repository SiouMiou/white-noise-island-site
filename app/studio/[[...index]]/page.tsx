// app/studio/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  // 檢查必要的環境變數
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Studio 設定錯誤</h1>
          <p className="text-gray-600 mb-4">
            請檢查 Sanity 環境變數設定：
          </p>
          <ul className="text-left text-sm text-gray-500 space-y-1">
            <li>• NEXT_PUBLIC_SANITY_PROJECT_ID</li>
            <li>• NEXT_PUBLIC_SANITY_DATASET</li>
            <li>• NEXT_PUBLIC_SANITY_API_VERSION</li>
          </ul>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
