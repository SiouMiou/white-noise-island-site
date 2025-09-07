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
  
  try {
    data = await sanityClient.fetch<NewsDetail | null>(
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
    )
  } catch (error) {
    console.error('Failed to fetch news detail:', error)
    return notFound()
  }

  if (!data) return notFound()

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {data.title}
        </h1>
        <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={data.publishedAt}>
          {formatTWT(data.publishedAt)}
        </time>
      </header>

      {data.coverImage && (
        <div className="my-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(data.coverImage).width(1200).height(630).fit('crop').url()}
            alt={data.title}
            width={1200}
            height={630}
            priority
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {data.excerpt && (
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
          <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
            {data.excerpt}
          </p>
        </div>
      )}

      {data.body && (
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <PortableText value={data.body} components={ptComponents} />
        </article>
      )}

      <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          回到首頁
        </Link>
      </nav>
    </main>
  )
}