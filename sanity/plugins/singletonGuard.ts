// 檔案路徑：sanity/plugins/singletonGuard.ts
import {definePlugin} from 'sanity'

export const singletonGuard = definePlugin({
  name: 'singleton-guard',
  // 暫時停用所有限制以解決展開問題
  // document: {
  //   newDocumentOptions: (prev, {currentUser}) => {
  //     const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator')
  //     return prev.filter((t) => t.templateId !== 'siteSettings' || isAdmin)
  //   },
  //   actions: (prev, {schemaType, currentUser}) => {
  //     const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator')
  //     if (schemaType === 'siteSettings' && !isAdmin) {
  //       // 讓非管理者看不到發佈/刪除/複製等危險操作
  //       return []
  //     }
  //     return prev
  //   },
  // },
})


