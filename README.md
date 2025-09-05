# 白噪島官方網站

這是一個使用 Next.js 和 Sanity CMS 建構的現代化新聞網站。

## 技術棧

- **前端框架**: Next.js 15 (App Router)
- **內容管理**: Sanity CMS
- **樣式**: Tailwind CSS
- **字體**: Geist Sans & Geist Mono
- **部署**: Vercel

## 功能特色

- 📱 響應式設計，支援各種裝置
- 🌙 深色模式支援
- ⚡ 靜態生成 (SSG) 和增量靜態再生 (ISR)
- 🖼️ 圖片優化和 CDN 快取
- 🔍 SEO 優化
- 📝 豐富的文字編輯器支援
- 🎨 現代化 UI 設計

## 環境設定

建立 `.env.local` 檔案並設定以下環境變數：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

## 開發

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 內容管理

Sanity Studio 位於 `/studio` 路徑，用於管理網站內容。

## 部署

最簡單的部署方式是使用 [Vercel Platform](https://vercel.com/new)。

## 專案結構

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   ├── page.tsx           # 首頁
│   ├── news/[slug]/       # 新聞詳情頁
│   ├── studio/            # Sanity Studio
│   ├── loading.tsx        # 載入狀態
│   ├── error.tsx          # 錯誤處理
│   └── not-found.tsx      # 404 頁面
├── lib/                   # 工具函數
│   ├── sanity.client.ts   # Sanity 客戶端
│   └── sanity.image.ts    # 圖片處理
├── sanity/                # Sanity 設定
│   └── schemaTypes/       # 內容模型
└── public/                # 靜態資源
```

## 開發指南

- 使用 TypeScript 進行型別安全
- 遵循 Next.js App Router 最佳實踐
- 使用 Tailwind CSS 進行樣式設計
- 保持程式碼整潔和可讀性
