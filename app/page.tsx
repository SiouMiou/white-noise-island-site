// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import {sanityClient} from '../lib/sanity.client'
import {urlFor} from '../lib/sanity.image'
import {formatTWT} from '../lib/formatDate'
import {getSiteSettings} from '../lib/siteSettings'
import BannerCarousel from '../components/BannerCarousel'

export const revalidate = 60 // ISR：每 60 秒再驗證

type NewsDoc = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  coverImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

const latestNewsQuery = `*[_type == "news" && defined(slug.current) && publishedAt <= now()] 
  | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage
  }`

export default async function HomePage() {
  let news: NewsDoc[] = []
  let siteSettings = null
  
  try {
    [news, siteSettings] = await Promise.all([
      sanityClient.fetch<NewsDoc[]>(latestNewsQuery),
      getSiteSettings()
    ])
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }

  const banners = (news ?? [])
    .filter(n => n.coverImage)
    .slice(0, 3)
    .map(n => ({
      title: n.title,
      href: `/news/${n.slug.current}`,
      imageUrl: urlFor(n.coverImage!).width(1600).height(700).fit('crop').auto('format').url(),
    }))

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 站點導覽（簡易） */}
      <header className="sticky top-0 z-50 border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <span className="sr-only">{siteSettings?.title || '白噪島'}</span>
            {siteSettings?.favicon ? (
              <Image 
                src={urlFor(siteSettings.favicon).width(24).height(24).url()} 
                alt="" 
                width={24} 
                height={24} 
              />
            ) : (
              <Image src="/favicon.ico" alt="" width={24} height={24} />
            )}
            <span>{siteSettings?.title || '白噪島'}</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/news" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">最新消息</Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">關於我們</Link>
            <Link href="/members" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">成員介紹</Link>
            <Link href="/recruit" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">招募</Link>
          </nav>
        </div>
      </header>

      {/* 1) 首屏：大型 GIF LOGO 動畫 */}
      <section className="relative isolate">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 shadow-lg">
            {/* 品牌 LOGO 動畫 */}
            <div className="relative h-[220px] sm:h-[300px] md:h-[360px]">
              {siteSettings?.logo ? (
                <Image
                  src={urlFor(siteSettings.logo).width(1200).height(360).fit('crop').url()}
                  alt={siteSettings.logo.alt || `${siteSettings.title} LOGO`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">請在 Sanity 後台設定 LOGO</span>
                </div>
              )}
            </div>
            <div className="border-t px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
              {siteSettings?.description || '以日系簡約風格呈現的企劃官網'}
            </div>
          </div>
        </div>
      </section>

      {/* 2) 最新活動 Banner 輪播（自動播放） */}
      {banners.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <BannerCarousel items={banners} intervalMs={5000} />
        </section>
      )}

      {/* 3) 最新消息（精簡列表） */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">最新消息</h2>
          <Link href="/news" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            查看全部
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {(news ?? []).map((item) => {
            const cover = item.coverImage
              ? urlFor(item.coverImage).width(800).height(450).fit('crop').auto('format').url()
              : null

            return (
              <li key={item._id} className="group overflow-hidden rounded-xl border bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
                <Link href={`/news/${item.slug.current}`} className="block">
                  {cover && (
                    <div className="relative h-44 w-full">
                      <Image
                        src={cover}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="space-y-2 p-4">
                    {item.publishedAt && (
                      <time className="block text-xs text-gray-500 dark:text-gray-400" dateTime={item.publishedAt}>
                        {formatTWT(item.publishedAt)}
                      </time>
                    )}
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 底部社群／聯絡（簡易） */}
      <footer className="border-t bg-white dark:bg-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-6">
            <Link 
              href={`mailto:${siteSettings?.contactEmail || 'hello@example.com'}`} 
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              聯絡我們
            </Link>
            {siteSettings?.socialLinks?.twitter && (
              <Link href={siteSettings.socialLinks.twitter} className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</Link>
            )}
            {siteSettings?.socialLinks?.youtube && (
              <Link href={siteSettings.socialLinks.youtube} className="hover:text-gray-900 dark:hover:text-white transition-colors">YouTube</Link>
            )}
            {siteSettings?.socialLinks?.instagram && (
              <Link href={siteSettings.socialLinks.instagram} className="hover:text-gray-900 dark:hover:text-white transition-colors">Instagram</Link>
            )}
          </div>
          <div className="mt-3">© {new Date().getFullYear()} {siteSettings?.title || '白噪島'}</div>
        </div>
      </footer>
    </main>
  )
}
