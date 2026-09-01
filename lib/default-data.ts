import type { SiteData } from "./types";

// 常用 SVG 图标（24x24 viewBox，stroke=currentColor）
export const ICONS = {
  music:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  palette:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  smartphone:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
  zap:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  shield:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  globe:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  star:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  box:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  monitor:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  license:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  windows:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>',
  android:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341c-.5 0-.99-.07-1.46-.21-.28-.08-.47-.34-.47-.64 0-.39.32-.7.71-.62.65.18 1.33.27 2.02.27.39 0 .71.31.71.7 0 .35-.28.64-.63.64-.31 0-.62-.02-.89-.06zm-11.047 0c-.28 0-.58.04-.87.07-.32.05-.63-.25-.63-.6 0-.38.32-.69.71-.68.69.04 1.38-.08 2.03-.25.39-.11.71.18.71.57 0 .32-.24.59-.56.64-.44.1-.89.15-1.39.15zM12 3c-1.1 0-2.1.3-3 .8-.16-.09-.34-.16-.53-.22-.5-.16-1.03-.25-1.58-.25-.28 0-.5.22-.5.5 0 .24.17.44.4.49.37.08.73.21 1.07.39.09.05.17.11.25.17C6.27 6.02 5.5 7.43 5.5 9v5c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5V9c0-1.57-.77-2.98-1.97-3.84.11-.09.21-.18.31-.26.41-.37.75-.78 1.01-1.22.1-.17.04-.39-.13-.49-.17-.1-.39-.04-.49.13-.23.39-.52.75-.87 1.07-1.07-.65-2.31-1.02-3.65-1.02h.01zM7 11c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm10 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-7.5 6.5c-.55 0-1 .45-1 1v1.5c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5v-1.5c0-.55-.45-1-1-1h-1zm5 0c-.55 0-1 .45-1 1v1.5c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5v-1.5c0-.55-.45-1-1-1h-1z"/></svg>',
  apple:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.471 3.56-1.702z"/></svg>',
  linux:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.023-4.226.344-4.73 3.289-4.19 5.543.375 1.56 1.47 2.714 1.82 4.14.109.44.136.92.132 1.388-.038 4.052-.037 5.255 0 5.5.088.604.687 1.57 1.287 2.145 1.028.982 2.642 1.434 4.17 1.424 2.01-.013 3.823-.904 4.877-2.44.57-.82.887-1.743 1.01-2.703.235-1.827.23-10.135 0-11.95-.203-1.602-.802-2.915-1.85-4.137C17.656 1.63 16.06.194 13.61.039 13.22.014 12.858 0 12.504 0zm-2.42 3.265c.24 0 .48.03.71.086.53.13 1.04.366 1.51.72.37.273.86.752 1.12 1.23.19.355.29.75.29 1.164 0 .043-.003.083-.01.124-.43-.192-.894-.288-1.375-.285-1.378.01-2.533 1.115-2.567 2.49-.012.45.105.9.328 1.31.06.11.06.11.12.17.21.19.45.35.71.47-.15.16-.28.34-.38.53-.1.2-.18.4-.23.63-.05.22-.07.45-.06.68.02.67.34 1.31.86 1.83.47.47 1.09.78 1.75.87 0 0 .01 0 .01.003l.058.01c.028.004.058.006.087.007h.01c.1.005.2.008.298.01h.114l.177.002c.446 0 .9-.088 1.316-.258v-.002c.402-.165.762-.403 1.062-.705.3-.302.544-.665.71-1.07.082-.203.148-.413.196-.63.048-.215.075-.436.08-.658.015-.67-.208-1.31-.627-1.83-.418-.52-1.01-.902-1.682-1.08-.062-.016-.125-.027-.19-.034.1-.2.18-.41.24-.63.07-.25.11-.5.12-.76.02-1.31-.48-2.51-1.35-3.38-.67-.67-1.54-1.11-2.48-1.26-.3-.05-.6-.07-.9-.07zm4.845.024c.17.072.33.16.48.263.5.358.91.868 1.17 1.465.27.625.35 1.298.25 1.962-.05.33-.16.65-.31.94-.07.14-.15.28-.24.4.27.05.54.14.79.28.53.286.96.718 1.24 1.24.27.53.4 1.12.35 1.715-.02.3-.08.6-.17.88-.1.29-.24.57-.4.83.16.09.31.2.44.33.25.246.45.537.59.855.13.316.21.65.23.988.08 1.393-.38 2.745-1.24 3.72-.85.97-2.05 1.608-3.38 1.77-.06.01-.12.02-.19.02-.2 0-.4-.01-.6-.04-.6-.07-1.18-.24-1.7-.5-.26-.13-.5-.29-.72-.48-.22-.19-.42-.4-.59-.64-.17-.23-.32-.48-.44-.75-.12-.27-.2-.56-.25-.86-.05-.29-.06-.59-.03-.89.08-.82.35-1.58.77-2.22.43-.65 1.02-1.17 1.7-1.52.68-.35 1.42-.53 2.17-.52.43.01.86.07 1.27.2.4.12.78.3 1.12.52.34.22.64.48.89.78.25.3.45.64.59 1 .14.37.22.76.23 1.15 0 .38-.05.77-.15 1.14-.1.37-.25.72-.44 1.03-.19.32-.42.6-.69.84-.27.25-.58.45-.91.6-.33.15-.69.25-1.06.3-.37.04-.75.03-1.12-.02-.37-.05-.73-.15-1.06-.3-.33-.15-.63-.37-.88-.64-.25-.27-.46-.58-.62-.92-.16-.34-.27-.71-.32-1.1-.05-.38-.04-.78.03-1.16.07-.38.19-.75.35-1.08.16-.34.37-.63.62-.88.25-.25.54-.45.86-.6.32-.15.67-.25 1.03-.3.36-.04.73-.03 1.09.03.36.05.7.15 1.02.3.32.16.61.37.86.63.25.26.46.56.62.89.16.33.27.69.32 1.06.06.37.06.76.02 1.13zM7.338 8.68c.112-.003.227.012.338.043.275.078.515.246.687.466.172.22.268.492.272.774.003.282-.085.56-.247.79-.162.23-.392.4-.655.49-.263.09-.55.1-.82.028a1.534 1.534 0 0 1-.63-.284 1.462 1.462 0 0 1-.432-.58 1.42 1.42 0 0 1-.147-.68c.013-.483.23-.935.586-1.26.357-.325.822-.504 1.306-.557zm9.324.01c.26-.01.52.045.75.16.23.115.43.28.58.485.15.205.24.45.26.71.03.26-.02.52-.14.755-.12.235-.3.435-.52.585-.22.15-.48.24-.75.26-.27.02-.54-.04-.785-.17-.245-.13-.45-.33-.595-.575-.145-.245-.23-.53-.245-.82-.015-.29.03-.585.135-.855.105-.27.27-.5.485-.68.215-.18.47-.3.74-.35z"/></svg>',
};

// 网站默认内容数据（可在后台编辑）
export const defaultSiteData: SiteData = {
  nav: {
    brand: "XingTone",
    brandSub: "Music",
    links: [
      { label: "功能", href: "#features" },
      { label: "界面", href: "#screenshots" },
      { label: "下载", href: "#download" },
      { label: "关于", href: "#about" },
    ],
    starLabel: "Star",
    starHref: "https://github.com/XT-Music",
    starCount: "2.3k",
    ctaLabel: "下载",
    ctaHref: "#download",
  },
  hero: {
    tag: "Next.js · 全平台 · 开源免费",
    title: "XingTone:\n星瞳音乐播放器",
    titleGradient: "为音乐而生",
    subtitle:
      "现代化的开源音乐播放器，支持 Web、桌面端与移动端。沉浸歌词、主题定制、本地缓存与无损音质，一切尽在掌握。",
    primaryBtnLabel: "立即体验",
    primaryBtnHref: "#download",
    primaryBtnVersion: "v1.5.0",
    secondaryBtnLabel: "查看源码",
    secondaryBtnHref: "https://github.com/XT-Music",
    platforms: ["Web", "Windows", "macOS", "Linux", "Android", "iOS"],
    heroImage: "",
    floatTagLeft: "沉浸式 · 下载即用",
    floatTagRight: "全平台同步",
    visualSongs: [
      { title: "星瞳之梦", artist: "XingTone Music" },
      { title: "夜空中最亮的星", artist: "逃跑计划" },
      { title: "海阔天空", artist: "Beyond" },
    ],
  },
  stats: [
    { icon: ICONS.star, value: "2.3k+", label: "GitHub Stars" },
    { icon: ICONS.box, value: "≈8MB", label: "安装包体积" },
    { icon: ICONS.monitor, value: "全平台", label: "Web · Desktop · Mobile" },
    { icon: ICONS.license, value: "MIT", label: "开源许可" },
  ],
  features: [
    {
      icon: ICONS.music,
      title: "沉浸播放",
      description:
        "全屏歌词、双语对照与细腻动效，保留听歌时的沉浸感。支持逐字歌词、翻译歌词与桌面歌词模式。",
    },
    {
      icon: ICONS.palette,
      title: "星瞳紫视觉",
      description:
        "以品牌紫为核心，适配亮暗模式与移动端手势。支持自定义主题色，打造专属音乐空间。",
    },
    {
      icon: ICONS.smartphone,
      title: "多端一致",
      description:
        "Web、iOS PWA、Android TWA、桌面客户端保持统一体验，数据同步无缝衔接。",
    },
    {
      icon: ICONS.zap,
      title: "流畅性能",
      description:
        "本地缓存、流式渲染与原生播放增强，降低等待感。秒开秒播，流畅无卡顿。",
    },
    {
      icon: ICONS.shield,
      title: "安全可靠",
      description:
        "认证、权限、输入校验与类型安全访问共同保障数据。隐私优先，数据自主掌控。",
    },
    {
      icon: ICONS.globe,
      title: "开放扩展",
      description:
        "REST API、模块化架构，便于持续迭代音乐管理能力。插件生态，功能无限扩展。",
    },
  ],
  screenshots: {
    sectionTitle: "打开即用，",
    sectionSubtitle: "所见即所得",
    tabs: [
      { id: "discover", label: "发现页" },
      { id: "library", label: "我的音乐" },
      { id: "player", label: "播放界面" },
      { id: "lyrics", label: "歌词页面" },
      { id: "settings", label: "设置" },
    ],
    activeTab: "discover",
    tabImages: {},
    sidebarItems: [
      { label: "发现音乐", active: true },
      { label: "每日推荐" },
      { label: "私人 FM" },
      { label: "歌单", active: false },
      { label: "我的音乐" },
      { label: "最近播放" },
      { label: "本地音乐" },
      { label: "下载管理" },
    ],
    songList: [
      { title: "星瞳之梦", artist: "XingTone Music", duration: "3:45" },
      { title: "夜空中最亮的星", artist: "逃跑计划", duration: "4:08" },
      { title: "海阔天空", artist: "Beyond", duration: "5:25" },
      { title: "晴天", artist: "周杰伦", duration: "4:29" },
      { title: "光年之外", artist: "邓紫棋", duration: "3:55" },
      { title: "起风了", artist: "买辣椒也用券", duration: "5:12" },
    ],
  },
  download: {
    sectionTitle: "选择你的平台，",
    sectionSubtitle: "即刻开始",
    version: "v1.5.0",
    mirrorToggle: true,
    platforms: [
      {
        name: "Windows",
        icon: ICONS.windows,
        arch: "x64",
        featured: true,
        downloads: [
          { label: "Windows 安装包", ext: ".exe", href: "#" },
          { label: "Windows 便携版", ext: ".zip", href: "#" },
        ],
        note: "基于 Electron 构建，支持 Windows 10 及以上",
      },
      {
        name: "Android",
        icon: ICONS.android,
        arch: "arm64-v8a",
        downloads: [
          { label: "Android APK", ext: ".apk", href: "#" },
        ],
        note: "支持 Android 8.0 及以上版本",
      },
    ],
  },
  footer: {
    brand: "XingTone Music",
    tagline:
      "现代化开源音乐播放器，沉浸歌词、星瞳紫视觉、多端一致体验。",
    columns: [
      {
        title: "项目",
        links: [
          { label: "源码仓库", href: "https://github.com/XT-Music" },
          { label: "问题反馈", href: "https://github.com/XT-Music" },
          { label: "版本下载", href: "#download" },
        ],
      },
      {
        title: "相关资源",
        links: [
          { label: "XT-Music 组织", href: "https://github.com/XT-Music" },
          { label: "官网后台", href: "/admin" },
        ],
      },
      {
        title: "法律",
        links: [
          { label: "用户协议", href: "/legal/user-agreement" },
          { label: "隐私与数据", href: "/legal/user-agreement" },
          { label: "免责声明", href: "/legal/disclaimer" },
          { label: "开源许可", href: "/legal/open-source" },
        ],
      },
    ],
    copyright: "© 2026 XingTone Music Contributors",
    bottomLinks: [
      { label: "GitHub", href: "https://github.com/XT-Music" },
      { label: "Built with Next.js", href: "https://nextjs.org" },
    ],
    // 法律条款已并入上方「法律」列与独立 /legal/* 页面，不再在底部重复展示
    legalLinks: [],
  },
};
