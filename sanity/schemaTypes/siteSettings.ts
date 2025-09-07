// 檔案路徑：sanity/schemaTypes/siteSettings.ts
import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: '網站設定',
  type: 'document',
  icon: CogIcon,
  // 暫時移除 readOnly 限制以解決展開問題
  // readOnly: ({currentUser}) => {
  //   const isAdmin = currentUser?.roles?.some((r: any) => r?.name === 'administrator' || r?.name === 'admin')
  //   return !isAdmin
  // },
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
      name: 'favicon',
      title: '網站圖標 (Favicon)',
      type: 'file',
      description: '建議上傳 32x32 以上的PNG 或 ICO，支援 .ico/.png/.svg',
      options: {
        accept: '.ico,.png,.svg,image/png,image/svg+xml,image/x-icon,image/vnd.microsoft.icon'
      }
    }),
    defineField({
      name: 'useSvgAnimation',
      title: '使用 SVG 動畫 LOGO',
      type: 'boolean',
      description: '啟用後會顯示 SVG 動畫 LOGO，而不是上傳的圖片',
      initialValue: true,
    }),
    defineField({
      name: 'logo',
      title: '品牌 LOGO 圖片',
      type: 'image',
      description: '建議 1200x360px 或 16:9 比例，支援 PNG/JPG/SVG',
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
      ],
      hidden: ({document}) => document?.useSvgAnimation === true,
    }),
    defineField({
      name: 'defaultCoverImage',
      title: '預設封面圖片',
      type: 'image',
      description: '建議 1200x630px 或 16:9 比例，當文章沒有封面圖時使用',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'ogImage',
      title: '社群分享圖片',
      type: 'image',
      description: '建議 1200x630px 或 16:9 比例，在社群媒體分享時顯示',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt 文字',
          type: 'string',
          description: '圖片的替代文字，用於無障礙和 SEO'
        }
      ]
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
