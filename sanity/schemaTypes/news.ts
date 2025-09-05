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
      options: {hotspot: true}
    }),
    defineField({
      name: 'body',
      title: '內文',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}]
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
