// app/news/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

import { sanityClient } from '@/lib/sanity.client'
import { newsQuery, newsBySlugQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity.image'
import { formatDate } from '@/lib/formatDate'
// 若你有型別檔可開啟：
// import type { News } from '@/types/news'

export const revalidate = 60 // ISR：每 60 秒再驗證

type Params = { slug: string }

// 產靜態路徑（對應舊版 getStaticPaths）
export async function generateStaticParams() {
  const news: any[] = await sanityClient.fetch(newsQuery)
  return (news ?? [])
    .filter((n) => n?.slug?.current)
    .map((n) => ({ slug: n.slug.current as string }))
}

// SEO（可選）：依文章內容設定 <title>/<meta>
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const data: any = await sanityClient.fetch(newsBySlugQuery, { slug: params.slug })

  if (!data) {
    return {
      title: '未找到內容｜白噪島',
      description: '您尋找的文章不存在或已被移除。',
    }
  }

  const title = `${data.title} - 白噪島`
  const description = data.excerpt || data.title
  const ogImage =
    data.coverImage ? urlForImage(data.coverImage).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

// 頁面主體（對應舊版 getStaticProps + 頁面組件）
export default async function NewsDetailPage({ params }: { params: Params }) {
  const news: any = await sanityClient.fetch(newsBySlugQuery, { slug: params.slug })
  if (!news) {
    notFound()
  }

  const cover =
    news.coverImage ? urlForImage(news.coverImage).width(1200).height(630).url() : null

  return (
    <div className="news-detail mx-auto max-w-3xl px-6 py-10">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">{news.title}</h1>
          {news.publishedAt && (
            <time className="mt-2 block text-sm text-neutral-500" dateTime={news.publishedAt}>
              {formatDate(news.publishedAt)}
            </time>
          )}
        </header>

        {cover && (
          <div className="my-6 overflow-hidden rounded-lg">
            <Image
              src={cover}
              alt={news.title}
              width={1200}
              height={630}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {news.excerpt && (
          <div className="my-6 rounded-lg bg-neutral-100 p-4 text-base italic leading-7">
            {news.excerpt}
          </div>
        )}

        {news.body && (
          <div className="prose prose-neutral max-w-none">
            <PortableText value={news.body} />
          </div>
        )}
      </article>

      <div className="mt-10 border-t pt-6">
        <a href="/" className="font-medium text-blue-600 hover:underline">
          ← 返回首頁
        </a>
      </div>
    </div>
  )
}
