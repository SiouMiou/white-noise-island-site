// 檔案路徑：lib/siteSettings.ts
import {sanityClient} from './sanity.client'

export type SiteSettings = {
  _id: string
  name: string
  title: string
  description?: string
  useSvgAnimation?: boolean
  logo?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  favicon?: {
    asset: {
      _ref: string
      _type: string
      url: string
    }
  }
  defaultCoverImage?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  ogImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  contactEmail?: string
  socialLinks?: {
    twitter?: string
    youtube?: string
    instagram?: string
  }
}

const siteSettingsQuery = `*[_type == "siteSettings"] | order(_createdAt desc)[0]{
  _id,
  name,
  title,
  description,
  useSvgAnimation,
  logo,
  favicon{asset->{_ref,_type,url}},
  defaultCoverImage,
  ogImage,
  contactEmail,
  socialLinks
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
    return settings
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return null
  }
}
