// 檔案路徑：lib/siteSettings.ts
import {sanityClient} from './sanity.client'

export type SiteSettings = {
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

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  useSvgAnimation,
  logo,
  favicon,
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
