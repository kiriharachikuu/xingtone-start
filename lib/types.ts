// 网站内容数据类型定义

export type SiteData = {
  nav: NavConfig;
  hero: HeroConfig;
  stats: StatItem[];
  features: FeatureItem[];
  screenshots: ScreenshotsConfig;
  download: DownloadConfig;
  footer: FooterConfig;
};

export type NavConfig = {
  brand: string;
  brandSub?: string;
  links: { label: string; href: string }[];
  starLabel: string;
  starHref: string;
  starCount: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HeroConfig = {
  tag: string;
  title: string;
  titleGradient: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnHref: string;
  primaryBtnVersion?: string;
  secondaryBtnLabel: string;
  secondaryBtnHref: string;
  platforms: string[];
  /** Hero 右侧展示图（base64 或 URL），留空则显示默认播放器 mockup */
  heroImage: string;
  /** 左上角浮动标签 */
  floatTagLeft: string;
  /** 右下角浮动标签 */
  floatTagRight: string;
  /** 默认 mockup 中展示的歌曲列表 */
  visualSongs: { title: string; artist: string }[];
};

export type StatItem = {
  /** SVG 图标代码（字符串形式的 svg innerHTML） */
  icon: string;
  value: string;
  label: string;
};

export type FeatureItem = {
  /** SVG 图标代码 */
  icon: string;
  title: string;
  description: string;
};

export type ScreenshotsConfig = {
  sectionTitle: string;
  sectionSubtitle: string;
  tabs: { id: string; label: string }[];
  activeTab: string;
  /** 各 tab 对应的截图图片（base64 或 URL），留空则显示默认界面模拟 */
  tabImages: Record<string, string>;
  /** 默认模拟界面的侧边栏菜单项 */
  sidebarItems: { label: string; active?: boolean }[];
  /** 默认模拟界面的歌曲列表 */
  songList: { title: string; artist: string; duration: string }[];
};

export type DownloadConfig = {
  sectionTitle: string;
  sectionSubtitle: string;
  version: string;
  mirrorToggle: boolean;
  platforms: DownloadPlatform[];
};

export type DownloadPlatform = {
  name: string;
  /** SVG 图标代码 */
  icon: string;
  arch: string;
  featured?: boolean;
  downloads: { label: string; ext: string; href: string }[];
  note?: string;
};

export type FooterConfig = {
  brand: string;
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  bottomLinks: { label: string; href: string }[];
  /** 条款链接（服务条款、隐私政策等） */
  legalLinks: { label: string; href: string }[];
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};
