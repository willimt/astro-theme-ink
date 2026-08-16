---
title: 'Markdown 语法速查'
description: '本文演示主题对常见 Markdown 语法的渲染效果：标题、引用、代码、表格等。'
publishDate: 2026-08-16
updatedDate: 2026-08-16
tags: [Markdown, 写作]
---

本文用来展示主题对 Markdown 的排版效果。

## 文本

**加粗**、_斜体_、`行内代码`，以及[链接](https://astro.build)。

## 引用

> 墨水有它的脾气：落在纸上之前，谁也不知道它会洇开多少。
>
> —— 佚名

## 代码块

```ts
// 一个简单的类型
interface Post {
  title: string
  description: string
  publishDate: Date
  tags: string[]
}
```

```bash
pnpm dev
```

## 列表

有序列表：

1. 打开终端
2. 安装依赖
3. 开始写作

无序列表：

- 温暖纸感配色
- 衬线标题
- 轻量搜索

## 表格

| 功能 | 状态 | 备注          |
| ---- | ---- | ------------- |
| RSS  | ✅   | 开箱即用      |
| 搜索 | ✅   | 本地索引      |
| 评论 | ⚙️   | 需配置 Giscus |

## 图片

图片会被居中显示并带上圆角：

![占位图片](https://picsum.photos/seed/ink/800/450)
