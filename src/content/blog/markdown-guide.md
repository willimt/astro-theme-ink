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
| 评论 | ⚙️   | 需配置 Waline |

## 图片

本地图片会被自动懒加载并居中、圆角展示；推荐用 HTML 标签写上宽高避免布局抖动：

<img src="../../og-card.svg" alt="占位图片" width="1200" height="630" loading="lazy" decoding="async" />

## 长代码块折叠

超过 15 行的代码块会自动折叠，点击底部的 "Show all" 展开：

```bash
# 一个很长的部署脚本示例（用于演示代码块折叠）
set -euo pipefail

APP_DIR="/opt/my-app"
BACKUP_DIR="/var/backups/my-app"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

backup() {
  log "Backing up $APP_DIR ..."
  mkdir -p "$BACKUP_DIR"
  tar -czf "$BACKUP_DIR/app-$(date +%Y%m%d%H%M%S).tar.gz" -C "$APP_DIR" .
  log "Backup done."
}

deploy() {
  log "Pulling latest code ..."
  cd "$APP_DIR" && git pull --ff-only
  log "Restarting service ..."
  systemctl restart my-app
  log "Service restarted."
}

main() {
  backup
  deploy
  log "All done. Exiting."
}

main "$@"
```
