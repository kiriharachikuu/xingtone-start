# XingTone 官网（xingtone-site）

XingTone 音乐播放器的官方网站与内容管理后台，基于 **Next.js 15（App Router）+ React + TypeScript + Tailwind CSS** 构建，部署在 **腾讯云 EdgeOne Pages**。

官网内容（导航、首屏、功能、截图、下载区、页脚等）可通过内置后台在线编辑，无需改代码重新部署。

---

## ✨ 功能特性

- **官网展示**：首屏 Hero、数据统计、功能特性、界面截图、多平台下载区、页脚等完整落地页。
- **可视化后台**：访问 `/admin`，输入管理员密码即可在线编辑官网全部文案与图片，支持自动保存。
- **多端下载**：下载区自动从后端接口 `GET /api/public/app-versions` 拉取 Android / PC 最新正式版号；后端不可用时回退到静态默认数据。
- **EdgeOne 持久化**：后台内容使用 EdgeOne **Blob 存储**持久化，`getStore()` 即用即得、**无需控制台开通或审批**（区别于需人工审批的 KV），命名空间首次访问自动创建。
- **保存即时生效**：首页与接口为动态渲染，Blob 采用**强一致读取**，后台保存后前端立即可见。
- **服务端鉴权**：登录下发 httpOnly 会话 Cookie（由管理密码 HMAC 派生），保存接口服务端校验，未授权请求返回 401。
- **本地开发友好**：本地 `next dev` 自动回退到本地文件 `data/site.json` 存储，无需 EdgeOne 环境。

---

## 🧱 技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | Next.js 15（App Router）、React 19、TypeScript |
| 样式 | Tailwind CSS |
| 部署 | 腾讯云 EdgeOne Pages（Cloud Functions，Node.js 运行时） |
| 内容存储（生产） | EdgeOne Blob（`@edgeone/pages-blob`，强一致读取） |
| 内容存储（本地） | 本地文件 `data/site.json` |
| 版本数据源 | 后端 NestJS 服务 `GET /api/public/app-versions` |

---

## 📂 目录结构

```
xingtone-site/
├── app/
│   ├── page.tsx              # 官网首页（动态渲染，force-dynamic）
│   ├── layout.tsx            # 全局布局
│   ├── globals.css           # 全局样式
│   ├── admin/                # 内容管理后台
│   │   ├── page.tsx          #   登录页
│   │   └── dashboard/        #   内容编辑面板
│   └── api/
│       ├── site/route.ts           # GET    获取站点内容
│       └── admin/
│           ├── login/route.ts      # POST   管理员登录（下发会话 Cookie）
│           └── save/route.ts       # POST   保存站点内容（需登录）
├── components/               # 官网展示组件（Navbar/Hero/Stats/...）
├── lib/
│   ├── site-data.ts          # 存储层：EdgeOne Blob（生产）+ 本地文件（开发）
│   ├── app-versions.ts       # 拉取后端最新版本号
│   ├── default-data.ts       # 默认站点内容 + 图标库
│   └── types.ts              # 内容数据类型
├── data/site.json            # 本地开发存储（生产使用 Blob，不入版本库）
└── public/                   # 静态资源
```

---

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 构建 / 启动生产版本
npm run build
npm run start
```

本地开发时，内容读写自动使用 `data/site.json`（不依赖 EdgeOne）。

进入后台：浏览器打开 `/admin`，默认密码 `xingtone-admin`。

---

## ⚙️ 环境变量

在项目根目录创建 `.env.local`（参考 `.env.example`）：

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | 生产必填 | 后台管理员密码，**部署时务必修改**，默认 `xingtone-admin`。 |
| `XT_API_BASE` | 否 | 后端版本接口地址（末尾含 `/api`），默认 `https://xtmusicapi.chikuu.top/api`。 |
| `STORAGE_DRIVER` | 否 | 内容存储驱动：留空自动判断（生产用 Blob、本地用文件）；`blob` 强制 Blob；`fs` 强制本地文件。 |

> `.env`、`.env.local`、`.env.production` 与 `data/site.json` 均已加入 `.gitignore`，不会被提交。

---

## ☁️ 部署到 EdgeOne Pages

项目为标准 Next.js 全栈应用，EdgeOne Pages 会自动识别框架并部署：

- **构建命令**：`npm run build`
- **输出/发布目录**：`.next`（由 EdgeOne 自动处理 Next.js 适配）
- 首页与 `/api/*` 路由会作为 **Cloud Functions（Node.js 运行时）** 运行，`/admin` 等页面静态托管。

部署后在 EdgeOne 控制台配置环境变量：

1. `ADMIN_PASSWORD`：设置为强密码。
2. （可选）`XT_API_BASE`：如后端地址与默认不同时配置。

**Blob 存储无需任何控制台操作**：首次在后台保存内容时，`@edgeone/pages-blob` 会自动创建名为 `xingtone-site` 的命名空间并写入数据（免费版账户存储容量 1GB，官网配置 JSON 远小于此）。

部署完成后，访问 `/admin` 修改内容并保存，刷新首页即可看到最新内容。

---

## 🔐 安全说明

- 保存接口 `/api/admin/save` 必须携带登录后下发的 `admin_session` httpOnly Cookie，否则返回 401。
- 会话令牌由 `ADMIN_PASSWORD` 通过 HMAC-SHA256 派生，不暴露明文密码。
- **请务必在生产环境通过环境变量 `ADMIN_PASSWORD` 修改默认密码。**
