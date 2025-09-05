// app/studio/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'   // ← 路徑是回到專案根目錄

export default function StudioPage() {
  return <NextStudio config={config} />
}
