// 檔案路徑：sanity/plugins/singletonGuard.ts
import {definePlugin} from 'sanity'

export const singletonGuard = definePlugin({
  name: 'singleton-guard',
  document: {
    // 禁止非管理者建立 siteSettings
    newDocumentOptions: (previousTemplates, {currentUser}) => {
      const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator')
      return previousTemplates.filter((templateItem) => templateItem.templateId !== 'siteSettings' || isAdmin)
    },
    // 禁止非管理者對 siteSettings 執行任何動作（包含開啟編輯、發佈、刪除、複製等）
    actions: (previousActions, {schemaType, currentUser}) => {
      const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator')
      if (schemaType === 'siteSettings' && !isAdmin) {
        return []
      }
      return previousActions
    },
  },
})


