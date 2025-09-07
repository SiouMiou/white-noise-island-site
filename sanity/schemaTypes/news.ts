// 檔案路徑：sanity/schemaTypes/news.ts
import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'news',
  title: '最新消息',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: '網址代稱 (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: '發布時間',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'coverImage',
      title: '首圖',
      type: 'image',
      description: '建議 1200x630px 或 16:9 比例，支援 PNG/JPG/WebP',
      options: {hotspot: true}
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          title: '內文圖片',
          description: '建議 800x600px 或 4:3 比例，支援 PNG/JPG/WebP',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt 文字',
              type: 'string',
              description: '圖片的替代文字，用於無障礙和 SEO'
            },
            {
              name: 'caption',
              title: '圖片說明',
              type: 'string',
              description: '圖片下方顯示的說明文字'
            }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', subtitle: 'publishedAt'},
    prepare({title, media, subtitle}) {
      const date = subtitle ? new Date(subtitle).toLocaleString() : ''
      return {title, media, subtitle: date}
    }
  }
})
