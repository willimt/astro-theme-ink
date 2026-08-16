---
title: '从零开始：安装与使用'
description: '环境准备、下载安装、跑起开发服务器、写第一篇文章、构建部署——完整的上手流程。'
publishDate: 2026-08-17
tags: [主题, 文档]
---

本文带你从零把 astro-theme-ink 跑起来，并完成第一篇文章和一次部署。

## 1. 环境准备

需要 Node.js 18+ 和包管理器（推荐 pnpm，npm/yarn/bun 也可以）：

```bash
node -v   # v18.0.0+
pnpm -v   # 推荐
```

## 2. 获取主题

把仓库 clone 到本地（或者直接下载 ZIP 解压）：

```bash
git clone <你的仓库地址> my-blog
cd my-blog
```

> 如果是从 GitHub 模板仓库创建，也可以直接用 "Use this template"。

## 3. 安装依赖并启动

```bash
pnpm install
pnpm dev
```

打开 http://localhost:4321 就能看到主题首页。开发模式下改文件会热更新。

## 4. 写第一篇文章

在 `src/content/blog/` 下新建一个 Markdown 文件，例如 `hello.md`：

```markdown
---
title: '你好，世界'
description: '我的第一篇文章。'
publishDate: 2026-08-17
tags: [随笔]
---

这里是正文。支持标准 Markdown 语法。
```

保存后刷新浏览器，文章就会出现在首页的"最近文章"和 `/blog` 列表里。

**Frontmatter 字段速查：**

| 字段          | 必填 | 说明                                                                                                     |
| ------------- | ---- | -------------------------------------------------------------------------------------------------------- |
| `title`       | ✅   | 标题（≤80 字）                                                                                           |
| `description` | ✅   | 一句话摘要（≤200 字）                                                                                    |
| `publishDate` | ✅   | 发布日期                                                                                                 |
| `updatedDate` | —    | 更新日期（显示"Updated"）                                                                                |
| `tags`        | —    | 标签数组                                                                                                 |
| `heroImage`   | —    | 封面图：`heroImage: { src: ../../assets/cover.png, alt: '…' }`（相对文章文件的本地资源，构建时自动压缩） |
| `draft`       | —    | `true` 时仅在 URL 可见，不进列表                                                                         |
| `comment`     | —    | 单篇关闭评论                                                                                             |

## 5. 配置个人信息

编辑 `src/site-config.ts`，把站点改成你的：

```ts
site: {
  title: "Hansen's ink",   // 站点标题
  author: 'Hansen W.',      // 作者名
  description: '……',
  lang: 'en',               // 语言
  avatar: '/avatar.png',    // 首页头像（放 public/）
  palette: 'fresh'          // 默认配色：'ink' 或 'fresh'
}
```

首页内容（简介、教育、技能等）改 `home` 配置块，评论在 `comment` 里填 Giscus 仓库信息。

## 6. 构建与部署

```bash
pnpm build      # 产物在 dist/
pnpm preview    # 本地预览构建结果
```

**重要**：部署前把 `astro.config.ts` 里的 `site: 'https://example.com'` 换成你的真实域名 —— sitemap、canonical 和 RSS 都依赖它。

纯静态产物可以部署到任何平台：

- **Vercel / Netlify**：连上仓库自动构建（build 命令 `pnpm build`，输出目录 `dist`）
- **Cloudflare Pages**：同上
- **GitHub Pages**：构建后把 `dist/` 内容推送到 pages 分支

## 7. 清理演示内容

把 `src/content/blog/` 下的示例文章删掉或改写，把 `public/avatar.png`、`favicon/` 换成你自己的，就完成了。

遇到问题？可以看[主题特色与特性](/blog/features)了解功能，或去[深度定制](/blog/customize)调整细节。
