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

    // 網站設定（單例）- 暫時對所有使用者開放以解決展開問題
    S.listItem()
      .title('網站設定')
      .id('siteSettings')
      .child(
        S.document()
          .schemaType('siteSettings')
          .documentId('siteSettings')
          .title('網站設定')
      ),
  ])
}


