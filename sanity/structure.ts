// 檔案路徑：sanity/structure.ts
import type {StructureResolver} from 'sanity/desk'

export const structure: StructureResolver = (S, {currentUser}) => {
  const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator')

  return S.list().id('content').title('內容').items([
    // 最新消息
    S.listItem()
      .id('news')
      .title('最新消息')
      .schemaType('news')
      .child(S.documentTypeList('news').title('最新消息')),

    // 網站設定 - 改為列表形式，像最新消息一樣
    S.listItem()
      .id('siteSettings')
      .title('網站設定')
      .schemaType('siteSettings')
      .child(S.documentTypeList('siteSettings').title('網站設定')),
  ])
}


