---
title: '深度定制指南'
description: '从站点信息、首页内容、评论系统到配色、排版、代码块语法与部署——把主题完全调成你的样子。'
publishDate: 2026-08-16
updatedDate: 2026-08-17
tags: [主题, 文档]
heroImage:
  src: ../../assets/cover-demo.png
  alt: '演示封面'
---

主题的几乎一切定制都收拢在几个文件里。本文按"配置 → 样式 → 内容 → 部署"的顺序完整过一遍。

## 1. 站点信息：`src/site-config.ts`

```ts title="site-config.ts"
site: {
  title: "Hansen's ink",   // 站点标题（浏览器标签、页头品牌）
  author: 'Hansen W.',      // 作者名（首页与页脚版权）
  description: '……',        // 站点描述（meta description）
  lang: 'en',               // html lang 与 RSS language
  favicon: '/favicon/favicon.ico',
  avatar: '/avatar.png',    // 首页头像（public/ 下）
  ogImage: '/og-card.svg',  // 社交分享卡片
  palette: 'fresh',         // 默认配色 'ink' | 'fresh'
  titleDelimiter: ' · '     // 标题分隔符
}
```

## 2. 页头与导航

```ts title="site-config.ts"
header: {
  menu: [
    { title: 'Blog', link: '/blog' },
    { title: 'Tags', link: '/tags' },
    { title: 'Links', link: '/links' },
    { title: 'About', link: '/about' }
  ]
}
```

菜单项在桌面端内联展示，移动端自动变成顶栏下方的横向滚动条。当前页会高亮（带 `aria-current`）。

## 3. 页脚

```ts title="site-config.ts"
footer: {
  copyright: '© 2020 - 2026 Hansen W.',   // 自定义版权行；不写则默认 © 年份 作者
  links: [{ title: 'RSS', url: '/rss.xml' }],  // 版权行后的链接
  social: {
    github: { label: 'GitHub', url: 'https://github.com/willimt' }
    // 支持 github/gitlab/rss/mail/x/weibo
  }
}
```

## 4. 首页内容：配置驱动

首页完全由 `home` 配置块驱动，**填了内容分区就出现，清空就消失**：

```ts title="site-config.ts"
home: {
  hero: {
    tagline: 'Developer / Designer / Photographer', // 名字上方的小字
    location: 'China / QingDao',                    // 位置徽标
    about: '一段关于你的介绍……',
    buttons: [{ title: 'More about me', link: '/about' }]
  },
  recentPosts: 5,                                   // 0 隐藏文章区
  education: [
    { school: '某大学', major: '专业', degree: '学历', date: 'Aug 2021 - Jul 2024' }
  ],
  skills: [
    { title: 'Program', items: ['Python', 'Java', 'C'] }
  ],
  showTags: false,      // 首页是否显示标签云
  showFriends: false    // 首页是否显示友链预览
}
```

## 5. 评论系统（Waline）

主题的评论和浏览量共用一个 **Waline** 服务器（自部署、无平台绑定）。部署方法：

1. 按 [Waline 官方文档](https://waline.js.org/guide/get-started/) 部署到 Vercel + LeanCloud（或自托管），拿到形如 `https://your-waline.vercel.app/` 的服务器地址
2. 填进 `site-config.ts`：

```ts title="site-config.ts"
comment: {
  provider: 'waline',
  server: 'https://your-waline.vercel.app/'   // 填上即启用评论
}
```

评论框会出现在文章末尾。`server` 留空则整块隐藏。

### 文章浏览量

同一 Waline 服务器还提供浏览量：把地址填进 `pageview.server`，文章页的 meta 行就会显示当前文章的浏览量：

```ts title="site-config.ts"
pageview: {
  server: 'https://你的-waline-服务器/' // 留空则隐藏
}
```

实现原理：向 `{server}/article` 发送 POST（`{path, type: 'time', action: 'inc'}`）计数并取回最新值——这是 Waline 3 的计数语义（v2 是 GET 计数，组件会自动回退兼容），无额外依赖；请求失败时显示 0。没有 Waline 的话也可以用不蒜子（busuanzi）之类的服务，自行接入即可。

### 全站访问量

`pageview.siteWide`（默认 `true`）开启时，页脚会显示"**total visits**"全站总访问量：每个页面每被打开一次就 +1，数据同样来自 Waline 服务器（固定虚拟路径 `/site-pv`），与文章阅读量互不干扰。不需要时设 `siteWide: false` 即可。

## 6. 搜索开关

```ts title="site-config.ts"
search: {
  enabled: true
}
```

关闭后顶栏的搜索入口和 `/search` 页内容都会消失（搜索索引也不再生成）。

## 7. 配色与字体：`src/assets/styles/tokens.css`

两套配色的全部颜色都在这里，直接改 HSL 三元组即可调出你自己的色板：

```css title="tokens.css"
:root {
  /* ink · 浅色 */
  --paper: 42 35% 97%;
  --accent: 22 46% 44%; /* 强调色，改这一个就能换整体气质 */
}
.fresh {
  /* fresh · 浅色 */
  --paper: 212 28% 97%;
  --accent: 213 30% 45%;
}
.dark {
  /* ink 深色 */
}
.fresh.dark {
  /* fresh 深色 */
}
```

字体栈也在这里（`--font-serif/--font-sans/--font-mono`），想换字体改这三行即可。

## 8. 排版与组件：`uno.config.ts`

- `theme.colors`：把 token 映射成工具类（`bg-paper`、`text-ink`…）
- `shortcuts`：`paper-card`（卡片）、`chip`（胶囊）、`link-ink`（链接）、`icon-link`（图标按钮）
- `presetTypography`：正文排版的全部细节（标题、链接动效、列表标记、引用块、表格…）

## 9. 代码块语法

代码块支持标题、高亮和 diff 标记：

````markdown
```bash title="deploy.sh"
git pull --ff-only            # [!code highlight]
systemctl restart my-app      # [!code ++]
rm -rf /var/cache             # [!code --]
```
````

- `title="文件名"`：显示标题条
- `[!code highlight]`：高亮该行
- `[!code ++]` / `[!code --]`：标记新增 / 删除行
- 超过 15 行自动折叠；右上角悬停出复制按钮

## 10. 写文章

Frontmatter 字段详见[安装与使用](../getting-started/)。补充几个技巧：

- `draft: true`：草稿只通过 URL 访问，不进列表和搜索
- `heroImage: { src: ../../assets/cover.png, alt: '…' }`：文章封面。必须是相对文章文件的本地资源，构建时会被 sharp 压缩并生成响应式尺寸（不会布局抖动）
- 正文支持：标题锚点（悬停显示 `#`）、表格、引用、脚注、图片圆角投影；正文里的图片自动懒加载、点击可放大（lightbox）
- 数学公式：行内 `$E = mc^2$`、独立公式 `$$...$$`，KaTeX 渲染，自动适配暗色模式（长公式可横向滚动）

## 11. 部署细节

- 把 `astro.config.ts` 的 `site` 改成真实域名（sitemap / canonical / RSS 依赖它）
- `pnpm build` 输出纯静态 `dist/`，任意平台可托管
- 备案/ICP 之类的页脚文字写在 `footer.links` 里即可

## 12. 移除演示内容清单

- `src/content/blog/` 下的示例文章（welcome / features / getting-started / customize / markdown-guide）可全部删除
- `public/avatar.png`、`public/favicon/`、`public/og-card.svg` 换成你的
- `site-config.ts` 里的演示配置改为你的信息

## 常见问题

**改了颜色没生效？**

确认改的是 `tokens.css` 里的 HSL 三元组（空格分隔，不是逗号），并重新 `pnpm dev` 或构建。

**头像显示不出来？**

`site.avatar` 必须是 `public/` 目录下的真实路径（如 `/avatar.png`），放 `src/` 下拿不到。

**评论框不出现？**

`comment.server` 为空即关闭。按 Waline 文档部署好服务器后把地址填进 `comment.server`（和 `pageview.server`）再构建。

**想加新的页面类型？**

复制 `src/pages/` 下已有的页面（如 `links/index.astro`）改内容，再在 `header.menu` 加一行导航。

**如何让默认就是雾霾蓝？**

`site.palette: 'fresh'`。访问者之后也能在顶栏自由切换，选择会记住。
