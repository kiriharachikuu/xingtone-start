import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "开源许可 - XingTone",
  description: "XingTone 使用的开源软件与许可说明",
};

export default function OpenSourcePage() {
  return (
    <LegalPage
      label="XingTone Legal"
      title="开源许可"
      description="本页面说明 XingTone 项目自身的开源协议，以及项目开发、运行所使用的主要第三方开源组件与对应许可。"
      updatedAt="2026 年 8 月 8 日"
      sections={[
        {
          title: "1. 项目自身开源许可",
          paragraphs: [
            "XingTone 整体项目代码采用 MIT License 开源，您可以自由地使用、复制、修改、合并、发布、分发、再授权本项目代码。",
            "Copyright (c) 2026 XingTone Music Contributors",
            "使用本项目代码需保留原始版权声明与许可文本，项目按「现状」提供，不附带任何明示或暗示的担保。完整许可文本可查阅项目根目录 LICENSE 文件。",
          ],
        },
        {
          title: "2. 前端核心开源依赖",
          items: [
            "Next.js / React：Web 应用框架与组件渲染，MIT License",
            "TypeScript：静态类型检查，Apache License 2.0",
            "Tailwind CSS：样式系统，MIT License",
            "shadcn/ui / lucide-react：基础组件与图标库，MIT License / ISC License",
            "Zustand：客户端状态管理，MIT License",
            "Howler.js：浏览器音频播放，MIT License",
            "Framer Motion：交互动效，MIT License",
            "next-pwa / next-themes：PWA 能力与主题切换，MIT License",
          ],
        },
        {
          title: "3. 后端核心开源依赖",
          items: [
            "NestJS：后端服务框架，MIT License",
            "Prisma：数据库 ORM，Apache License 2.0",
            "better-sqlite3：SQLite 数据库驱动，MIT License",
            "Express：基础 Web 服务框架，MIT License",
            "AWS SDK for JavaScript：S3 对象存储接口，Apache License 2.0",
            "FFmpeg：音频转码工具，LGPL 2.1 / GPL 2.0 许可，作为系统级工具调用，未静态链接至项目代码",
          ],
        },
        {
          title: "4. 移动端与系统依赖",
          items: [
            "AndroidX / Media3 / OkHttp：Android TWA 原生增强、媒体播放与网络缓存，Apache License 2.0",
            "Bubblewrap：TWA 打包工具，Apache License 2.0",
            "iOS Safari PWA 能力遵循 Web 标准与苹果相关规范，本项目与苹果公司无任何关联",
          ],
        },
        {
          title: "5. 许可合规说明",
          paragraphs: [
            "所有第三方开源项目的版权、商标及许可权利归对应作者或组织所有，XingTone 严格遵循对应开源许可条款使用与分发。",
            "本页面仅列出项目直接依赖的主要开源项目，未完整覆盖全部间接依赖；间接依赖的许可信息以包管理器锁定文件及对应项目官方发布内容为准。",
            "如需查看任一组件的完整许可文本，可前往对应项目的官方代码仓库、npm / Maven 发布页面查阅。",
            "若您认为本项目存在开源许可使用不当的情况，可通过反馈渠道联系我们，我们将第一时间核实并修正。",
          ],
        },
      ]}
    />
  );
}
