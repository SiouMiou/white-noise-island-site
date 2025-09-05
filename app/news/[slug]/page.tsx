import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {sanityClient} from '@/lib/sanity.client'
import {urlFor} from '@/lib/sanity.image'

export const revalidate = 60

type NewsDetail = {
  title: string
  publishedAt: string
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
  const slugs: {slug: {current: string}}[] = await sanityClient.fetch(
    `*[_type == "news" && defined(slug.current)]{slug}`
  )
  return slugs.map(s => ({slug: s.slug.current}))
}

export default async function NewsPage({params}: {params: {slug: string}}) {
  const data = await sanityClient.fetch<NewsDetail | null>(
    `*[_type == "news" && slug.current == $slug][0]{
      title, publishedAt, coverImage, body
    }`,
    {slug: params.slug}
  )

  if (!data) return notFound()

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {data.title}
        </h1>
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(data.publishedAt).toLocaleString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
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

      {data.body && (
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <PortableText value={data.body} />
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
