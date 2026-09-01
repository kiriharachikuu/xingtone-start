import { getSiteData } from "@/lib/site-data";
import { fetchAppVersions } from "@/lib/app-versions";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { Screenshots } from "@/components/Screenshots";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

// 动态渲染：每次请求实时读取 EdgeOne Blob（强一致），后台保存后立即生效。
// 不使用 ISR/revalidatePath —— 后者在 EdgeOne 上为实验性功能，会导致后台修改不刷新。
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getSiteData();
  // 后台发布的真实版本数据；后端不可用时返回 null，Download 回退静态数据
  const appVersions = await fetchAppVersions();

  return (
    <>
      <Navbar data={data.nav} />
      <main id="top">
        <Hero data={data.hero} />
        <Stats items={data.stats} />
        <Features
          title="无需任何设置，打开即听"
          subtitle="现代化音乐体验，从这里开始"
          features={data.features}
        />
        <Screenshots data={data.screenshots} />
        <Download data={data.download} versions={appVersions} />
      </main>
      <Footer data={data.footer} />
    </>
  );
}
