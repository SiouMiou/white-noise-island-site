// 檔案路徑：lib/sanity.image.ts
import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from './sanity.client'

const builder = imageUrlBuilder(sanityClient)

type SanityImageSource = {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export const urlFor = (source: SanityImageSource) => builder.image(source)
