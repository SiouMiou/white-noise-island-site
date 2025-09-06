import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: '網站設定',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: '網站標題',
      type: 'string',
      initialValue: '白噪島',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '網站描述',
      type: 'text',
      rows: 3,
      initialValue: '以日系簡約風格呈現的企劃官網'
    }),
    defineField({
      name: 'logo',
      title: '品牌 LOGO 動畫',
      type: 'image',
      description: '首頁展示的大型 LOGO 動畫 (建議 GIF 格式)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt 文字',
          type: 'string',
          description: 'LOGO 的替代文字'
        }
      ]
    }),
    defineField({
      name: 'favicon',
      title: '網站圖標 (Favicon)',
      type: 'image',
      description: '瀏覽器標籤頁顯示的小圖標',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'defaultCoverImage',
      title: '預設封面圖片',
      type: 'image',
      description: '當文章沒有封面圖時使用的預設圖片',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'ogImage',
      title: '社群分享圖片',
      type: 'image',
      description: '在社群媒體分享時顯示的圖片',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'contactEmail',
      title: '聯絡信箱',
      type: 'string',
      initialValue: 'hello@example.com'
    }),
    defineField({
      name: 'socialLinks',
      title: '社群連結',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
})
