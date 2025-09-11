// 檔案路徑：app/news/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {Metadata} from 'next'
import {sanityClient} from '../../../lib/sanity.client'
import {urlFor} from '../../../lib/sanity.image'
import {formatTWT} from '../../../lib/formatDate'
import {ptComponents} from '../../../lib/portableText'
import {getSiteSettings} from '../../../lib/siteSettings'
import type { SiteSettings } from '../../../lib/siteSettings'

export const revalidate = 60

type NewsDetail = {
  title: string
  publishedAt: string
  excerpt?: string
  coverImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  body?: Array<{
    _type: string
    [key: string]: unknown
  }>
}

export async function generateStaticParams() {
  try {
    const slugs: {slug: {current: string}}[] = await sanityClient.fetch(
      `*[_type == "news" && defined(slug.current)]{slug}`
    )
    return slugs.map(s => ({slug: s.slug.current}))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

// SEO metadata 生成
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  
  try {
    const data = await sanityClient.fetch<NewsDetail | null>(
      `*[_type == "news" && slug.current == $slug][0]{
        title, excerpt, coverImage
      }`,
      {slug}
    )

    if (!data) {
      return {
        title: '頁面不存在 | 白噪島',
        description: '您要找的頁面不存在或已被移除。',
      }
    }

    const title = `${data.title} | 白噪島`
    const description = data.excerpt || data.title
    const ogImage = data.coverImage 
      ? urlFor(data.coverImage).width(1200).height(630).fit('crop').url()
      : undefined

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
        type: 'article',
        siteName: '白噪島',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: '白噪島',
      description: '白噪島官方網站',
    }
  }
}

export default async function NewsPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  let data: NewsDetail | null = null
  let siteSettings: SiteSettings | null = null
  
  try {
    const [newsData, settingsData] = await Promise.all([
      sanityClient.fetch<NewsDetail | null>(
        `*[_type == "news" && slug.current == $slug][0]{
          title, publishedAt, excerpt, coverImage, 
          body[]{
            ...,
            _type == "image" => {
              ...,
              asset->,
              alt,
              caption
            }
          }
        }`,
        {slug}
      ),
      getSiteSettings()
    ])
    data = newsData
    siteSettings = settingsData
  } catch (error) {
    console.error('Failed to fetch news detail:', error)
    return notFound()
  }

  if (!data) return notFound()

  return (
    <main className="min-h-screen" style={{ background: '#FAFBFF' }}>
      <div className="mx-auto max-w-[720px] px-4 py-12">
        <header className="mb-6">
          <h1 className="text-[36px] leading-tight tracking-tight font-semibold text-[#1f2937]">
            {data.title}
          </h1>
          <time className="mt-2 block text-[14px] text-[#6b7280]" dateTime={data.publishedAt}>
            {formatTWT(data.publishedAt)}
          </time>
        </header>

        {(data.coverImage || siteSettings?.defaultCoverImage) && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
            <div className="relative w-full" style={{ aspectRatio: '1200/630' }}>
              <Image
                src={data.coverImage 
                  ? urlFor(data.coverImage).width(1200).height(630).fit('crop').url()
                  : urlFor(siteSettings!.defaultCoverImage!).width(1200).height(630).fit('crop').url()
                }
                alt={data.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none"
              />
            </div>
          </div>
        )}

        {data.excerpt && (
          <div className="my-6 p-4 bg-white rounded-xl border border-[var(--line)]">
            <p className="text-[18px] leading-[1.8] text-[#1f2937]">
              {data.excerpt}
            </p>
          </div>
        )}

        {data.body && (
          <article className="max-w-none">
            <PortableText value={data.body} components={ptComponents} />
          </article>
        )}

        <nav className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-[14px]">
            <Link 
              href="/news" 
              className="text-[var(--brand)] hover:underline transition-[color,opacity]"
            >
              ← 返回最新消息
            </Link>
            <Link 
              href="/news" 
              className="text-[var(--brand)] hover:underline transition-[color,opacity]"
            >
              下一則 →
            </Link>
          </div>
        </nav>
      </div>
    </main>
  )
}