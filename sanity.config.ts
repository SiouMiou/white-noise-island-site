import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: '白噪島 CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio', // 嵌入用在 /studio
  plugins: [deskTool(), visionTool()],
  schema: {types: schemaTypes},
})
