import {createClient} from 'next-sanity'

// 檢查必要的環境變數
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing required Sanity environment variables')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // 公開讀取可開啟快取（搭配 ISR）
})
