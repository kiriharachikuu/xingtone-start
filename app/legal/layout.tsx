import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { defaultSiteData } from "@/lib/default-data";

// 法律页共享布局：与首页同一套导航 + 页脚，视觉统一。
// 使用静态默认站点数据（不读 Blob），保证 /legal/* 可在构建时静态预渲染。
// 首页锚点（#features 等）在法律页需指向首页，统一改写为 /#xxx。
const legalNav = {
  ...defaultSiteData.nav,
  links: defaultSiteData.nav.links.map((l) =>
    l.href.startsWith("#") ? { ...l, href: `/${l.href}` } : l
  ),
  ctaHref: defaultSiteData.nav.ctaHref.startsWith("#")
    ? `/${defaultSiteData.nav.ctaHref}`
    : defaultSiteData.nav.ctaHref,
};

// 页脚中的首页锚点（#download 等）同样改写为 /#xxx
const legalFooter = {
  ...defaultSiteData.footer,
  columns: defaultSiteData.footer.columns.map((col) => ({
    ...col,
    links: col.links.map((l) =>
      l.href.startsWith("#") ? { ...l, href: `/${l.href}` } : l
    ),
  })),
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar data={legalNav} />
      <main>{children}</main>
      <Footer data={legalFooter} />
    </>
  );
}
