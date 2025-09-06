// app/page.tsx
import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.client'
import {formatTWT} from '@/lib/formatDate'

export const revalidate = 60 // ISR：每 60 秒背景再生

type NewsItem = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
}

export default async function Home() {
  let items: NewsItem[] = []
  
  try {
    items = await sanityClient.fetch<NewsItem[]>(
      `*[_type == "news" && defined(publishedAt) && publishedAt <= now()]
       | order(publishedAt desc){
         _id, title, slug, publishedAt, excerpt
       }[0...20]`
    )
  } catch (error) {
    console.error('Failed to fetch news items:', error)
    // 如果 Sanity 連線失敗，顯示空狀態而不是崩潰
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">白噪島</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">最新消息與資訊</p>
      </header>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">目前沒有最新消息</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            請檢查 Sanity 環境變數設定
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8">
          {items.map(n => (
            <article key={n._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Link href={`/news/${n.slug.current}`} className="block">
                  {n.title}
                </Link>
              </h2>
              <time className="text-sm text-gray-500 dark:text-gray-400 block mb-3" dateTime={n.publishedAt}>
                {formatTWT(n.publishedAt)}
              </time>
              {n.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {n.excerpt}
                </p>
              )}
              <Link 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors" 
                href={`/news/${n.slug.current}`}
              >
                繼續閱讀
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
