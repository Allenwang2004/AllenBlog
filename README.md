# AllenBlog

以 Next.js 12 + Contentlayer 打造的個人部落格 / 履歷網站，內容以 MDX 撰寫，並支援中／英雙語切換。

## 技術棧

- **框架**：Next.js 12（Pages Router，非 App Router）
- **內容管理**：[Contentlayer](https://www.contentlayer.dev/) — 將 `content/posts/*.mdx` 編譯為型別化的 `Post` 物件
- **樣式**：Tailwind CSS（`@tailwindcss/typography` 處理文章排版、`next-themes` 處理深色模式）
- **多語系**：`next-i18next`（UI 文案）+ Next.js 內建 `i18n` routing（`en` / `zh-TW`）
- **其他**：`kbar`（指令面板 / 搜尋）、`@giscus/react`（留言）、`resend`（Email 訂閱 API）、`next-sitemap`、RSS/Atom/JSON Feed 產生器

## 目錄結構

```
content/posts/           # 文章來源（.mdx），Contentlayer 於 build 時掃描
contentlayer.config.ts   # 定義 Post 的 schema（title、date、language...）
src/
  pages/                 # Next.js 路由
    index.tsx            # 首頁（文章列表）
    page/[page].tsx       # 文章分頁
    posts/[slug].tsx      # 單篇文章頁
    resume.tsx            # 履歷頁
    [...pathToRedirectFrom].tsx  # 舊網址轉址
    api/                  # API Routes（如 subscribe.ts）
  components/            # UI 元件（Header、Footer、PostBody、CommandPalette...）
  configs/               # 站台常數（siteConfigs、i18nConfigs、headerConfigs...）
  lib/                   # 工具函式（contentLayerAdapter、generateRSS、formatDate...）
  plugins/               # 自訂 rehype/remark 外掛（imageMetadata）
public/
  locales/{en,zh-TW}/    # next-i18next 的 UI 翻譯字串（json）
  resume.pdf             # 履歷 PDF（直接以 iframe 嵌入 resume 頁）
```

## 內容渲染流程

1. `content/posts/*.mdx` → Contentlayer（`contentlayer.config.ts`）在建置時解析 frontmatter 與內文，產生 `.contentlayer/generated` 內的型別化資料。
2. `src/lib/contentLayerAdapter.js` 匯出 `allPostsNewToOld`，供 `index.tsx`、`page/[page].tsx` 等頁面取用並依日期排序。
3. `posts/[slug].tsx` 用 `getStaticPaths`/`getStaticProps` 依 slug 取出單篇文章，交給 `PostLayout` + `PostBody` 渲染 MDX（含 rehype-slug、rehype-prism-plus 等外掛處理標題錨點與程式碼高亮）。

## 多語系設計（中文／英文如何分開）

專案裡「UI 文案」與「文章內容」是兩套獨立的多語系機制：

### 1. UI 文案（next-i18next）
- `next-i18next.config.js` 宣告 `locales: ['en', 'zh-TW']`，`defaultLocale: 'zh-TW'`。這組設定會被 `next.config.mjs` 讀入並傳給 Next.js 的內建 `i18n` router，因此網址會自動依語系加上前綴（如 `/en/...`，`zh-TW` 為預設不加前綴）。
- 各語系的介面字串放在 `public/locales/{locale}/*.json`（例如 `common.json`、`indexPage.json`），依 namespace 分檔。
- 每個頁面的 `getStaticProps` 會呼叫 `serverSideTranslations(locale, [...namespaces])`，把當前語系對應的翻譯 JSON 序列化進 props，頁面內再用 `useTranslation()` 的 `t()` 取字串（見 `index.tsx`、`resume.tsx`）。
- `LanguageSwitch.tsx` 元件透過 `next/link` 的 `locale` prop 切換 `en` ↔ `zh-TW`，並保留目前的 `pathname`/`query`，達成同頁切語系的效果。

### 2. 文章內容（Contentlayer `language` 欄位）
- `contentlayer.config.ts` 為 `Post` 定義了一個 `language` enum 欄位（選項來自 `src/configs/i18nConfigs.ts` 的 `LOCALES`，預設 `zh-TW`）。
- 每篇 `.mdx` 可在 frontmatter 標註 `language: en` 或 `language: zh-TW`，代表這篇文章本身是哪個語言撰寫的；沒標註則視為預設語系。
- 這是「內容層級」的語言標記，與 UI 文案的 i18n 路由是分開運作的兩套機制——即使網址切到 `/en`，實際顯示的文章列表目前仍是同一份 `allPostsNewToOld`（未依 `language` 過濾），語言欄位主要用於文章本身的中英文標示與未來擴充篩選之用。

### 3. 履歷頁（resume.tsx）
- 目前僅有單一版本（中文標題/描述寫死在 `resume.tsx`），透過 iframe 直接嵌入同一份 `public/resume.pdf`，並未依語系切換不同 PDF 或文案。

## 主要頁面

| 路徑 | 說明 |
|---|---|
| `/` | 首頁，顯示最新文章列表（`POSTS_PER_PAGE = 6`）與履歷連結 |
| `/page/[page]` | 文章分頁 |
| `/posts/[slug]` | 文章內頁 |
| `/resume` | 履歷頁（PDF 內嵌） |
| `/api/subscribe` | Email 訂閱 API（使用 Resend） |

## 開發指令

```bash
npm run dev         # 本機開發
npm run build       # build + 產生 sitemap
npm run lint        # ESLint 檢查
npm run format:fix  # Prettier 格式化
```
