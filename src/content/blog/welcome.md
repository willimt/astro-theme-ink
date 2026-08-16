---
title: '欢迎使用 astro-theme-ink'
description: '一款温暖纸感风格的 Astro 博客主题：墨色文字落在米白纸上。'
publishDate: 2026-08-16
tags: [主题, Astro, UnoCSS]
---

欢迎来到 **astro-theme-ink** —— 一款温暖纸感风格的个人博客主题。

## 设计理念

墨落在纸上。全站只使用一种强调色（赭石色），其余全部交给灰阶分层与留白：

- 米白/奶油底色，暖墨色文字
- 衬线字体标题，营造"印刷页面"的感觉
- 克制的微交互：卡片悬停、箭头滑动、滚动渐隐

## 功能特性

- 📝 文章列表分页、标签、按年归档
- 🔍 内置轻量全文搜索（构建时生成索引，无外部依赖）
- 💬 Giscus 评论（可选）
- 📡 RSS 订阅
- 🌗 亮色 / 暗色 / 跟随系统 三种主题
- 📖 文章目录（桌面端侧栏）
- 🚀 纯静态输出，可部署到任意平台

## 快速开始

```bash
pnpm install
pnpm dev
```

构建并预览：

```bash
pnpm build
pnpm preview
```

## 写一篇文章

在 `src/content/blog/` 下新建一个 Markdown 文件即可：

```markdown
---
title: '文章标题'
description: '一句话摘要'
publishDate: 2026-08-16
tags: [标签一, 标签二]
---

这里是正文。
```

> 提示：`draft: true` 可以让文章只在 URL 下可见、不出现在列表中。

祝写作愉快。
