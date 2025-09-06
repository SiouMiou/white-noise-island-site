import {PortableTextComponents} from '@portabletext/react'
import {urlFor} from './sanity.image'
import Image from 'next/image'

// PortableText 自訂組件，用於渲染內文中的圖片和其他元素
export const ptComponents: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset) return null
      
      const src = urlFor(value).width(1200).fit('max').auto('format').url()
      const alt = value.alt || value.caption || '內文圖片'
      
      return (
        <div className="my-8 rounded-lg overflow-hidden shadow-md">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
          {value.caption && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 px-4 pb-2">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    // 自訂標題樣式
    h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-medium mt-5 mb-2">{children}</h3>,
    h4: ({children}) => <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>,
    // 自訂段落樣式
    normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
    // 引用樣式
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // 連結樣式
    link: ({children, value}) => (
      <a 
        href={value.href} 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    // 強調樣式
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    // 有序列表
    number: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
    // 無序列表
    bullet: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
  },
  listItem: {
    // 列表項目
    number: ({children}) => <li className="mb-1">{children}</li>,
    bullet: ({children}) => <li className="mb-1">{children}</li>,
  },
}
