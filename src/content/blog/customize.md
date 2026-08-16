---
title: '如何自定义这个主题'
description: '从配色、字体到评论系统：astro-theme-ink 的全部定制入口，一篇文章讲清楚。'
publishDate: 2026-08-16
tags: [主题, 配置]
heroImage: '/og-card.svg'
---

astro-theme-ink 把几乎所有的定制入口都收拢在了两三个文件里。本文带你逐个认识它们。

## 1. 站点信息：`src/site-config.ts`

标题、作者、导航菜单、页脚、友链、评论都在这里：

```ts
export const config: Config = {
  site: {
    title: 'Astro Theme Ink',
    author: 'Ink Lab',
    description: 'A warm, paper-feel personal blog theme — ink on paper.',
    lang: 'zh-CN',
    avatar: '/avatar.svg', // 首页头像（public/ 下）
    ogImage: '/og-card.svg' // 社交分享卡片
  },
  header: { menu: [...] },
  footer: { ... },
  comment: { repo: '', ... } // 填上 Giscus 仓库信息即启用评论
}
```

> 修改头像：把图片放进 `public/`，再把 `site.avatar` 改成它的路径即可。

## 2. 配色与字体：`src/assets/styles/tokens.css`

主题的"纸感"来自这组 CSS 变量：

```css
:root {
  --paper: 42 35% 97%; /* 米白纸面 */
  --ink: 30 14% 13%; /* 暖墨文字 */
  --accent: 22 46% 44%; /* 赭石强调色 */
  --radius: 0.5rem;
}
.dark {
  /* 暗色覆盖同名的变量 */
}
```

想换成冷色调或别的品牌色，改这三个数就够了 —— 全站都会跟着变。

## 3. 排版与组件：`uno.config.ts`

UnoCSS 的主题映射（`bg-paper`、`text-ink` 这些工具类）、`shortcuts`（`paper-card`、`chip`）、以及正文排版 `presetTypography` 的定制都在这里。例如行内代码的"纸片"样式：

```ts
':not(pre) > code': {
  padding: '0.18em 0.42em',
  'background-color': 'hsl(var(--wash) / 1)',
  border: '1px solid hsl(var(--line) / 1)',
  'border-radius': '0.35em'
}
```

## 4. 写一篇文章

在 `src/content/blog/` 下新建 Markdown 文件，可选 `heroImage` 封面图（放在 `public/`）：

```markdown
---
title: '文章标题'
description: '一句话摘要'
publishDate: 2026-08-16
tags: [标签]
heroImage: '/covers/my-cover.png' # 可选封面
draft: false
---

正文……
```

## 5. 开启评论（Giscus）

1. 到 [giscus.app](https://giscus.app) 按引导配置你的仓库；
2. 把 `repo`、`repoId`、`category`、`categoryId` 填进 `site-config.ts` 的 `comment` 字段；
3. 重新构建即可，评论框会自动出现在文章末尾。

## 完

## 常见问题

**为什么我改了颜色但没生效？**

确认你改的是 `src/assets/styles/tokens.css` 里的 HSL 三元组（如 `--accent: 22 46% 44%`），而不是注释掉的旧值；改完重新运行 `pnpm dev` 或重新构建。注意三元组中间用空格分隔，不是逗号。

**头像显示不出来？**

`site.avatar` 必须是 `public/` 目录下的路径（如 `/avatar.svg`），并且文件真实存在。放在 `src/` 下是拿不到的。

**评论框不出现？**

`comment.repo` 为空时评论功能是关闭的。去 [giscus.app](https://giscus.app) 完成配置，把 `repo`、`repoId`、`category`、`categoryId` 四项都填上再构建。

**想加新的页面类型？**

主题的页面都在 `src/pages/` 下，复制一个已有的页面（如 `links/index.astro`）改内容即可；导航入口在 `site-config.ts` 的 `header.menu` 里加一行。

**如何切换清新淡雅配色？**

主题内置两套配色：默认的暖调「墨色」（ink）和冷调薄荷「清新」（fresh）。点顶栏的调色板按钮即可切换并记住选择；也可以把 `site-config.ts` 里的 `site.palette` 改成 `'fresh'`，作为新访客看到的默认配色。两套配色的变量都定义在 `src/assets/styles/tokens.css`，直接改数值就能调出你自己的色板。

## 完

以上就是全部定制入口。剩下的就是你的内容了 —— 祝你写作愉快。
