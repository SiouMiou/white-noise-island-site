// 檔案路徑：sanity/schemaTypes/siteSettings.ts
import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: '網站設定',
  type: 'document',
  icon: CogIcon,
  // 非管理者僅可讀
  readOnly: ({currentUser}) => !currentUser?.roles?.some((r: any) => r.name === 'administrator'),
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
      description: '首頁展示的 LOGO 圖片 (當不使用 SVG 動畫時)',
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
