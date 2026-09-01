"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteData } from "@/lib/types";
import { ICONS, defaultSiteData as DEFAULT_SITE_DATA } from "@/lib/default-data";

type TabKey =
  | "nav"
  | "hero"
  | "stats"
  | "features"
  | "screenshots"
  | "download"
  | "footer";

const TAB_GROUPS: {
  label: string;
  tabs: { key: TabKey; label: string; icon: string }[];
}[] = [
  {
    label: "首屏",
    tabs: [
      {
        key: "hero",
        label: "Hero 主视觉",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      },
      {
        key: "nav",
        label: "导航栏",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>',
      },
    ],
  },
  {
    label: "内容",
    tabs: [
      {
        key: "features",
        label: "功能特性",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      },
      {
        key: "screenshots",
        label: "界面展示",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
      },
      {
        key: "stats",
        label: "数据统计",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      },
    ],
  },
  {
    label: "转化",
    tabs: [
      {
        key: "download",
        label: "下载区",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
      },
      {
        key: "footer",
        label: "页脚",
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
      },
    ],
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [dirty, setDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    hero: false,
    nav: false,
    stats: true,
    features: true,
    screenshots: true,
    download: true,
    footer: true,
  });

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const [iconPicker, setIconPicker] = useState<{
    open: boolean;
    onSelect: (svg: string) => void;
  } | null>(null);

  useEffect(() => {
    // 检查登录状态
    if (typeof window !== "undefined") {
      const authed = localStorage.getItem("admin-auth");
      if (!authed) {
        router.push("/admin");
      }
    }
    // 加载数据
    fetch("/api/site")
      .then((r) => r.json())
      .then((res) => {
        // 接口返回 { success, data }，仅把内层站点数据写入 state
        if (res && res.success && res.data) {
          setData(res.data as SiteData);
        } else {
          setData(JSON.parse(JSON.stringify(DEFAULT_SITE_DATA)));
        }
      })
      .catch(() => {
        setData(JSON.parse(JSON.stringify(DEFAULT_SITE_DATA)));
      });
  }, [router]);

  const handleSave = async (showToast = true) => {
    if (!data) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        setDirty(false);
        setLastSaved(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        if (showToast) {
          setToast("保存成功！");
          setTimeout(() => setToast(""), 2500);
        }
      } else {
        const err = await res.json();
        setToast(err.error || "保存失败");
        setTimeout(() => setToast(""), 3000);
      }
    } catch {
      setToast("网络错误");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  // 自动保存（防抖 800ms）
  const triggerAutoSave = () => {
    setDirty(true);
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave(false);
    }, 800);
  };

  // 重置为默认值
  const handleReset = () => {
    if (!confirm("确定要重置为默认数据吗？此操作不可撤销。")) return;
    setData(JSON.parse(JSON.stringify(DEFAULT_SITE_DATA)));
    triggerAutoSave();
    setToast("已重置为默认值");
    setTimeout(() => setToast(""), 2000);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin-auth");
    }
    router.push("/admin");
  };

  if (!data) {
    return (
      <div className="admin-dashboard">
        <div className="admin-main">
          <div className="admin-content" style={{ textAlign: "center", paddingTop: 100 }}>
            加载中...
          </div>
        </div>
      </div>
    );
  }

  const updateField = (section: keyof SiteData, field: string, value: any) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field]: value,
        },
      };
    });
    triggerAutoSave();
  };

  const updateArrayItem = (
    section: keyof SiteData,
    index: number,
    field: string,
    value: any
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      const arr = [...((prev[section] as any[]) || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
    triggerAutoSave();
  };

  const addArrayItem = (section: keyof SiteData, template: any) => {
    setData((prev) => {
      if (!prev) return prev;
      const arr = [...((prev[section] as any[]) || []), template];
      return { ...prev, [section]: arr };
    });
    triggerAutoSave();
  };

  const removeArrayItem = (section: keyof SiteData, index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const arr = [...((prev[section] as any[]) || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: arr };
    });
    triggerAutoSave();
  };

  return (
    <div className="admin-dashboard">
      {/* 侧边栏 */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span
            className="brand-mark"
          >
            <img src="/icons/logo.png" alt="XingTone Logo" />
          </span>
          <span>内容管理</span>
        </div>
        <nav className="admin-sidebar-nav">
          {TAB_GROUPS.map((group, gi) => (
            <div key={gi} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {group.tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`admin-nav-item ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span
                    className="nav-icon"
                    dangerouslySetInnerHTML={{ __html: tab.icon }}
                  />
                  {tab.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="save-status">
            {saving ? (
              <span className="status-saving">保存中…</span>
            ) : dirty ? (
              <span className="status-dirty">有未保存更改</span>
            ) : lastSaved ? (
              <span className="status-saved">已自动保存 · {lastSaved}</span>
            ) : (
              <span className="status-idle">全部已保存</span>
            )}
          </div>
          <button className="admin-btn save-btn" onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "保存中..." : "立即保存"}
          </button>
          <button
            className="admin-btn admin-btn-secondary reset-btn"
            onClick={handleReset}
            disabled={saving}
          >
            重置为默认
          </button>
          <a href="/" target="_blank" className="view-site-link">
            ← 查看网站
          </a>
        </div>
      </aside>

      {/* 主内容 */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>{TAB_GROUPS.flatMap((g) => g.tabs).find((t) => t.key === activeTab)?.label} 编辑</h2>
          <div className="admin-header-actions">
            <button
              className="admin-btn admin-btn-secondary"
              style={{ width: "auto", padding: "10px 18px", fontSize: 14 }}
              onClick={handleLogout}
            >
              退出登录
            </button>
          </div>
        </header>

        <div className="admin-content">
          {/* Nav 编辑 */}
          {activeTab === "nav" && (
            <>
              {/* 品牌设置 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">品牌设置</div>
                    <div className="subsection-desc">导航栏品牌名称与副标题</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>品牌名称</label>
                    <input
                      type="text"
                      value={data.nav.brand}
                      onChange={(e) => updateField("nav", "brand", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>品牌副标</label>
                    <input
                      type="text"
                      value={data.nav.brandSub || ""}
                      onChange={(e) => updateField("nav", "brandSub", e.target.value)}
                      placeholder="可选"
                    />
                  </div>
                </div>
              </div>

              {/* 导航链接 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">导航链接</div>
                    <div className="subsection-desc">管理顶部导航菜单链接</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.nav.links.map((link, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content" style={{ flexDirection: "row", gap: 12 }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>文字</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...data.nav.links];
                              newLinks[i] = { ...link, label: e.target.value };
                              updateField("nav", "links", newLinks);
                            }}
                          />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>链接</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...data.nav.links];
                              newLinks[i] = { ...link, href: e.target.value };
                              updateField("nav", "links", newLinks);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const newLinks = [...data.nav.links];
                          newLinks.splice(i, 1);
                          updateField("nav", "links", newLinks);
                        }}
                      >
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const newLinks = [...data.nav.links, { label: "新链接", href: "#" }];
                      updateField("nav", "links", newLinks);
                    }}
                  >
                    + 添加导航链接
                  </button>
                </div>
              </div>

              {/* 更多设置（折叠） */}
              <div className={`collapsible-card ${collapsed.nav ? "" : "open"}`}>
                <button
                  className="collapsible-trigger"
                  onClick={() => toggleCollapse("nav")}
                >
                  <span className="trigger-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1c0 .56.3 1.07.77 1.35"/>
                    </svg>
                    更多设置
                  </span>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="collapsible-body">
                  <div className="collapsible-body-inner">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Star 按钮标签</label>
                        <input
                          type="text"
                          value={data.nav.starLabel}
                          onChange={(e) => updateField("nav", "starLabel", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Star 数量</label>
                        <input
                          type="text"
                          value={data.nav.starCount}
                          onChange={(e) => updateField("nav", "starCount", e.target.value)}
                        />
                      </div>
                      <div className="form-group full">
                        <label>Star 链接</label>
                        <input
                          type="text"
                          value={data.nav.starHref}
                          onChange={(e) => updateField("nav", "starHref", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>CTA 按钮文字</label>
                        <input
                          type="text"
                          value={data.nav.ctaLabel}
                          onChange={(e) => updateField("nav", "ctaLabel", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>CTA 按钮链接</label>
                        <input
                          type="text"
                          value={data.nav.ctaHref}
                          onChange={(e) => updateField("nav", "ctaHref", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Hero 编辑 */}
          {activeTab === "hero" && (
            <>
              {/* 文案内容 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">文案内容</div>
                    <div className="subsection-desc">首屏标题、描述和按钮文案</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>标签文字</label>
                    <input
                      type="text"
                      value={data.hero.tag}
                      onChange={(e) => updateField("hero", "tag", e.target.value)}
                    />
                  </div>
                  <div className="form-group full">
                    <label>主标题（换行分隔多行）</label>
                    <textarea
                      value={data.hero.title}
                      onChange={(e) => updateField("hero", "title", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>渐变文字</label>
                    <input
                      type="text"
                      value={data.hero.titleGradient}
                      onChange={(e) => updateField("hero", "titleGradient", e.target.value)}
                    />
                  </div>
                  <div className="form-group full">
                    <label>副标题描述</label>
                    <textarea
                      value={data.hero.subtitle}
                      onChange={(e) => updateField("hero", "subtitle", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* 按钮设置 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">按钮</div>
                    <div className="subsection-desc">主按钮与副按钮配置</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>主按钮文字</label>
                    <input
                      type="text"
                      value={data.hero.primaryBtnLabel}
                      onChange={(e) => updateField("hero", "primaryBtnLabel", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>主按钮链接</label>
                    <input
                      type="text"
                      value={data.hero.primaryBtnHref}
                      onChange={(e) => updateField("hero", "primaryBtnHref", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>副按钮文字</label>
                    <input
                      type="text"
                      value={data.hero.secondaryBtnLabel}
                      onChange={(e) => updateField("hero", "secondaryBtnLabel", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>副按钮链接</label>
                    <input
                      type="text"
                      value={data.hero.secondaryBtnHref}
                      onChange={(e) => updateField("hero", "secondaryBtnHref", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 图片上传 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">右侧图片</div>
                    <div className="subsection-desc">填写图片链接（图床 URL）替换默认播放器 mockup</div>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 12 }}>
                  <label>图片链接</label>
                  <input
                    type="text"
                    placeholder="https://example.com/hero.png（留空使用默认 mockup）"
                    value={data.hero.heroImage || ""}
                    onChange={(e) =>
                      updateField("hero", "heroImage", e.target.value.trim())
                    }
                  />
                  {data.hero.heroImage && (
                    <div className="image-preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={data.hero.heroImage} alt="Hero 预览" />
                      <button
                        className="remove-image-btn"
                        onClick={() => updateField("hero", "heroImage", "")}
                      >
                        移除图片
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 更多设置（折叠） */}
              <div className={`collapsible-card ${collapsed.hero ? "" : "open"}`}>
                <button
                  className="collapsible-trigger"
                  onClick={() => toggleCollapse("hero")}
                >
                  <span className="trigger-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1c0 .56.3 1.07.77 1.35"/>
                    </svg>
                    更多设置
                  </span>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="collapsible-body">
                  <div className="collapsible-body-inner">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>主按钮版本号</label>
                        <input
                          type="text"
                          value={data.hero.primaryBtnVersion || ""}
                          onChange={(e) => updateField("hero", "primaryBtnVersion", e.target.value)}
                          placeholder="可选"
                        />
                      </div>
                      <div className="form-group">
                        <label>平台标签（逗号分隔）</label>
                        <input
                          type="text"
                          value={data.hero.platforms.join(", ")}
                          onChange={(e) => {
                            const arr = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            updateField("hero", "platforms", arr);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>左上角浮动标签</label>
                        <input
                          type="text"
                          value={data.hero.floatTagLeft || ""}
                          onChange={(e) => updateField("hero", "floatTagLeft", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>右下角浮动标签</label>
                        <input
                          type="text"
                          value={data.hero.floatTagRight || ""}
                          onChange={(e) => updateField("hero", "floatTagRight", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Stats 编辑 */}
          {activeTab === "stats" && (
            <>
              {/* 统计项目 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">统计项目</div>
                    <div className="subsection-desc">展示关键数据指标，图标字段填 SVG 代码字符串</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.stats.map((stat, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content">
                        <div style={{ display: "flex", gap: 12 }}>
                          <div
                            className="form-group"
                            style={{ width: 80, margin: 0, flexShrink: 0 }}
                          >
                            <label>图标预览</label>
                            <div
                              className="icon-preview"
                              onClick={() =>
                                setIconPicker({
                                  open: true,
                                  onSelect: (svg) =>
                                    updateArrayItem("stats", i, "icon", svg),
                                })
                              }
                              style={{ cursor: "pointer" }}
                              title="点击选择图标"
                              dangerouslySetInnerHTML={{ __html: stat.icon }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>数值</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateArrayItem("stats", i, "value", e.target.value)}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 2, margin: 0 }}>
                            <label>标签</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateArrayItem("stats", i, "label", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>图标 SVG 代码</label>
                          <textarea
                            value={stat.icon}
                            onChange={(e) =>
                              updateArrayItem("stats", i, "icon", e.target.value)
                            }
                            rows={2}
                            style={{ fontFamily: "monospace", fontSize: 12 }}
                          />
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeArrayItem("stats", i)}>
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() =>
                      addArrayItem("stats", {
                        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
                        value: "0",
                        label: "新指标",
                      })
                    }
                  >
                    + 添加统计项
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Features 编辑 */}
          {activeTab === "features" && (
            <>
              {/* 功能列表 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">功能列表</div>
                    <div className="subsection-desc">展示产品核心功能和亮点，图标字段填 SVG 代码字符串</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.features.map((f, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content">
                        <div style={{ display: "flex", gap: 12 }}>
                          <div
                            className="form-group"
                            style={{ width: 100, margin: 0, flexShrink: 0 }}
                          >
                            <label>图标预览</label>
                            <div
                              className="icon-preview"
                              onClick={() =>
                                setIconPicker({
                                  open: true,
                                  onSelect: (svg) =>
                                    updateArrayItem("features", i, "icon", svg),
                                })
                              }
                              style={{ cursor: "pointer" }}
                              title="点击选择图标"
                              dangerouslySetInnerHTML={{ __html: f.icon }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>标题</label>
                            <input
                              type="text"
                              value={f.title}
                              onChange={(e) =>
                                updateArrayItem("features", i, "title", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>图标 SVG 代码</label>
                          <textarea
                            value={f.icon}
                            onChange={(e) =>
                              updateArrayItem("features", i, "icon", e.target.value)
                            }
                            rows={3}
                            style={{ fontFamily: "monospace", fontSize: 12 }}
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>描述</label>
                          <textarea
                            value={f.description}
                            onChange={(e) =>
                              updateArrayItem("features", i, "description", e.target.value)
                            }
                            rows={2}
                          />
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeArrayItem("features", i)}>
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() =>
                      addArrayItem("features", {
                        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
                        title: "新功能",
                        description: "功能描述",
                      })
                    }
                  >
                    + 添加功能特性
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Screenshots 编辑 */}
          {activeTab === "screenshots" && (
            <>
              {/* 标题设置 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">标题设置</div>
                    <div className="subsection-desc">界面展示区的标题文案</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>标题前半</label>
                    <input
                      type="text"
                      value={data.screenshots.sectionTitle}
                      onChange={(e) =>
                        updateField("screenshots", "sectionTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>标题后半（渐变）</label>
                    <input
                      type="text"
                      value={data.screenshots.sectionSubtitle}
                      onChange={(e) =>
                        updateField("screenshots", "sectionSubtitle", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Tab 标签 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">Tab 标签与截图</div>
                    <div className="subsection-desc">每个 Tab 可上传对应截图，未上传时显示默认模拟界面</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.screenshots.tabs.map((tab, i) => {
                    const img =
                      data.screenshots.tabImages && data.screenshots.tabImages[tab.id];
                    return (
                      <div key={i} className="list-editor-item">
                        <div className="item-content" style={{ flexDirection: "row", gap: 12 }}>
                          <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>ID</label>
                            <input
                              type="text"
                              value={tab.id}
                              onChange={(e) => {
                                const newTabs = [...data.screenshots.tabs];
                                const oldId = tab.id;
                                const newId = e.target.value;
                                newTabs[i] = { ...tab, id: newId };
                                const newTabImages = { ...(data.screenshots.tabImages || {}) };
                                if (oldId !== newId && newTabImages[oldId]) {
                                  newTabImages[newId] = newTabImages[oldId];
                                  delete newTabImages[oldId];
                                }
                                updateField("screenshots", "tabs", newTabs);
                                updateField("screenshots", "tabImages", newTabImages);
                              }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 2, margin: 0 }}>
                            <label>标签名</label>
                            <input
                              type="text"
                              value={tab.label}
                              onChange={(e) => {
                                const newTabs = [...data.screenshots.tabs];
                                newTabs[i] = { ...tab, label: e.target.value };
                                updateField("screenshots", "tabs", newTabs);
                              }}
                            />
                          </div>
                        </div>
                        <div className="screenshot-upload">
                          <div className="form-group">
                            <label>截图链接</label>
                            <input
                              type="text"
                              placeholder="https://example.com/shot.png"
                              value={img || ""}
                              onChange={(e) => {
                                const newTabImages = {
                                  ...(data.screenshots.tabImages || {}),
                                  [tab.id]: e.target.value.trim(),
                                };
                                updateField("screenshots", "tabImages", newTabImages);
                              }}
                            />
                          </div>
                          {img && (
                            <div className="screenshot-upload-preview">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img} alt={tab.label} />
                              <button
                                className="remove-image-btn"
                                onClick={() => {
                                  const newTabImages = {
                                    ...(data.screenshots.tabImages || {}),
                                  };
                                  delete newTabImages[tab.id];
                                  updateField("screenshots", "tabImages", newTabImages);
                                }}
                              >
                                移除
                              </button>
                            </div>
                          )}
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => {
                            const newTabs = [...data.screenshots.tabs];
                            const newTabImages = {
                              ...(data.screenshots.tabImages || {}),
                            };
                            delete newTabImages[tab.id];
                            newTabs.splice(i, 1);
                            updateField("screenshots", "tabs", newTabs);
                            updateField("screenshots", "tabImages", newTabImages);
                          }}
                        >
                          删除
                        </button>
                      </div>
                    );
                  })}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const newTabs = [
                        ...data.screenshots.tabs,
                        { id: "new-tab", label: "新标签" },
                      ];
                      updateField("screenshots", "tabs", newTabs);
                    }}
                  >
                    + 添加 Tab
                  </button>
                </div>
              </div>

              {/* 更多设置（折叠） */}
              <div className={`collapsible-card ${collapsed.screenshots ? "" : "open"}`}>
                <button
                  className="collapsible-trigger"
                  onClick={() => toggleCollapse("screenshots")}
                >
                  <span className="trigger-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1c0 .56.3 1.07.77 1.35"/>
                    </svg>
                    更多设置
                  </span>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="collapsible-body">
                  <div className="collapsible-body-inner">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>默认 Tab</label>
                        <input
                          type="text"
                          value={data.screenshots.activeTab}
                          onChange={(e) => updateField("screenshots", "activeTab", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Download 编辑 */}
          {activeTab === "download" && (
            <>
              {/* 标题设置 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">标题设置</div>
                    <div className="subsection-desc">下载区的标题文案</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>标题前半</label>
                    <input
                      type="text"
                      value={data.download.sectionTitle}
                      onChange={(e) =>
                        updateField("download", "sectionTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>标题后半（渐变）</label>
                    <input
                      type="text"
                      value={data.download.sectionSubtitle}
                      onChange={(e) =>
                        updateField("download", "sectionSubtitle", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 版本信息 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">版本信息</div>
                    <div className="subsection-desc">当前版本号和镜像源开关</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>当前版本</label>
                    <input
                      type="text"
                      value={data.download.version}
                      onChange={(e) => updateField("download", "version", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 下载平台 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">下载平台</div>
                    <div className="subsection-desc">配置各平台下载项，图标字段填 SVG 代码字符串</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.download.platforms.map((p, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content">
                        <div style={{ display: "flex", gap: 12 }}>
                          <div
                            className="form-group"
                            style={{ width: 80, margin: 0, flexShrink: 0 }}
                          >
                            <label>图标预览</label>
                            <div
                              className="icon-preview"
                              onClick={() => {
                                const arr = [...data.download.platforms];
                                setIconPicker({
                                  open: true,
                                  onSelect: (svg) => {
                                    const newArr = [...arr];
                                    newArr[i] = { ...newArr[i], icon: svg };
                                    updateField("download", "platforms", newArr);
                                  },
                                });
                              }}
                              style={{ cursor: "pointer" }}
                              title="点击选择图标"
                              dangerouslySetInnerHTML={{ __html: p.icon }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>平台名</label>
                            <input
                              type="text"
                              value={p.name}
                              onChange={(e) => {
                                const arr = [...data.download.platforms];
                                arr[i] = { ...p, name: e.target.value };
                                updateField("download", "platforms", arr);
                              }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>架构</label>
                            <input
                              type="text"
                              value={p.arch}
                              onChange={(e) => {
                                const arr = [...data.download.platforms];
                                arr[i] = { ...p, arch: e.target.value };
                                updateField("download", "platforms", arr);
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>图标 SVG 代码</label>
                          <textarea
                            value={p.icon}
                            onChange={(e) => {
                              const arr = [...data.download.platforms];
                              arr[i] = { ...p, icon: e.target.value };
                              updateField("download", "platforms", arr);
                            }}
                            rows={2}
                            style={{ fontFamily: "monospace", fontSize: 12 }}
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>备注</label>
                          <input
                            type="text"
                            value={p.note || ""}
                            onChange={(e) => {
                              const arr = [...data.download.platforms];
                              arr[i] = { ...p, note: e.target.value };
                              updateField("download", "platforms", arr);
                            }}
                            placeholder="可选"
                          />
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const arr = [...data.download.platforms];
                          arr.splice(i, 1);
                          updateField("download", "platforms", arr);
                        }}
                      >
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const arr = [
                        ...data.download.platforms,
                        {
                          name: "新平台",
                          icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
                          arch: "x64",
                          downloads: [
                            { label: "安装包", ext: ".exe", href: "#" },
                          ],
                        },
                      ];
                      updateField("download", "platforms", arr);
                    }}
                  >
                    + 添加平台
                  </button>
                </div>
              </div>

              {/* 更多设置（折叠） */}
              <div className={`collapsible-card ${collapsed.download ? "" : "open"}`}>
                <button
                  className="collapsible-trigger"
                  onClick={() => toggleCollapse("download")}
                >
                  <span className="trigger-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1c0 .56.3 1.07.77 1.35"/>
                    </svg>
                    更多设置
                  </span>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="collapsible-body">
                  <div className="collapsible-body-inner">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>镜像源切换</label>
                        <div style={{ display: "flex", alignItems: "center", height: 38 }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={data.download.mirrorToggle}
                              onChange={(e) =>
                                updateField("download", "mirrorToggle", e.target.checked)
                              }
                              style={{ width: 16, height: 16 }}
                            />
                            <span style={{ fontSize: 13, color: "var(--text-dim)" }}>启用镜像源切换按钮</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer 编辑 */}
          {activeTab === "footer" && (
            <>
              {/* 品牌信息 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">品牌信息</div>
                    <div className="subsection-desc">页脚品牌名称和标语</div>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>品牌名称</label>
                    <input
                      type="text"
                      value={data.footer.brand}
                      onChange={(e) => updateField("footer", "brand", e.target.value)}
                    />
                  </div>
                  <div className="form-group full">
                    <label>品牌标语</label>
                    <textarea
                      value={data.footer.tagline}
                      onChange={(e) => updateField("footer", "tagline", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* 链接列 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">链接列</div>
                    <div className="subsection-desc">页脚的多列链接列表（项目、资源、法律等）</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.footer.columns.map((col, ci) => (
                    <div key={ci} className="list-editor-item">
                      <div className="item-content">
                        <div className="form-group" style={{ margin: 0 }}>
                          <label>列标题</label>
                          <input
                            type="text"
                            value={col.title}
                            onChange={(e) => {
                              const arr = [...data.footer.columns];
                              arr[ci] = { ...col, title: e.target.value };
                              updateField("footer", "columns", arr);
                            }}
                          />
                        </div>
                        <div className="list-editor" style={{ marginTop: 8 }}>
                          {col.links.map((link, li) => (
                            <div
                              key={li}
                              style={{
                                display: "flex",
                                gap: 10,
                                padding: "8px 12px",
                                background: "var(--bg)",
                                borderRadius: 8,
                                border: "1px solid var(--border)",
                              }}
                            >
                              <input
                                type="text"
                                value={link.label}
                                placeholder="文字"
                                onChange={(e) => {
                                  const cols = [...data.footer.columns];
                                  const newLinks = [...cols[ci].links];
                                  newLinks[li] = { ...link, label: e.target.value };
                                  cols[ci] = { ...cols[ci], links: newLinks };
                                  updateField("footer", "columns", cols);
                                }}
                                style={{
                                  flex: 1,
                                  padding: "6px 10px",
                                  fontSize: 13,
                                  background: "var(--bg-soft)",
                                  border: "1px solid var(--border)",
                                  borderRadius: 6,
                                  color: "var(--text)",
                                }}
                              />
                              <input
                                type="text"
                                value={link.href}
                                placeholder="链接"
                                onChange={(e) => {
                                  const cols = [...data.footer.columns];
                                  const newLinks = [...cols[ci].links];
                                  newLinks[li] = { ...link, href: e.target.value };
                                  cols[ci] = { ...cols[ci], links: newLinks };
                                  updateField("footer", "columns", cols);
                                }}
                                style={{
                                  flex: 2,
                                  padding: "6px 10px",
                                  fontSize: 13,
                                  background: "var(--bg-soft)",
                                  border: "1px solid var(--border)",
                                  borderRadius: 6,
                                  color: "var(--text)",
                                }}
                              />
                              <button
                                onClick={() => {
                                  const cols = [...data.footer.columns];
                                  const newLinks = [...cols[ci].links];
                                  newLinks.splice(li, 1);
                                  cols[ci] = { ...cols[ci], links: newLinks };
                                  updateField("footer", "columns", cols);
                                }}
                                style={{
                                  padding: "6px 10px",
                                  fontSize: 11,
                                  color: "var(--danger)",
                                  background: "rgba(248,113,113,0.1)",
                                  border: "1px solid rgba(248,113,113,0.2)",
                                  borderRadius: 6,
                                  cursor: "pointer",
                                }}
                              >
                                删
                              </button>
                            </div>
                          ))}
                          <button
                            className="add-btn"
                            style={{ fontSize: 12, padding: "6px 12px" }}
                            onClick={() => {
                              const cols = [...data.footer.columns];
                              cols[ci] = {
                                ...cols[ci],
                                links: [...cols[ci].links, { label: "新链接", href: "#" }],
                              };
                              updateField("footer", "columns", cols);
                            }}
                          >
                            + 添加链接
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const arr = [...data.footer.columns];
                          arr.splice(ci, 1);
                          updateField("footer", "columns", arr);
                        }}
                      >
                        删除列
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const arr = [
                        ...data.footer.columns,
                        { title: "新列", links: [{ label: "链接 1", href: "#" }] },
                      ];
                      updateField("footer", "columns", arr);
                    }}
                  >
                    + 添加列
                  </button>
                </div>
              </div>

              {/* 底部链接 */}
              <div className="subsection-card">
                <div className="subsection-header">
                  <div
                    className="subsection-icon"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
                    }}
                  />
                  <div>
                    <div className="subsection-title">底部链接</div>
                    <div className="subsection-desc">页脚最底部的链接与法律条款链接</div>
                  </div>
                </div>
                <div className="list-editor">
                  {data.footer.bottomLinks.map((link, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content" style={{ flexDirection: "row", gap: 12 }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>文字</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const arr = [...data.footer.bottomLinks];
                              arr[i] = { ...link, label: e.target.value };
                              updateField("footer", "bottomLinks", arr);
                            }}
                          />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>链接</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const arr = [...data.footer.bottomLinks];
                              arr[i] = { ...link, href: e.target.value };
                              updateField("footer", "bottomLinks", arr);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const arr = [...data.footer.bottomLinks];
                          arr.splice(i, 1);
                          updateField("footer", "bottomLinks", arr);
                        }}
                      >
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const arr = [...data.footer.bottomLinks, { label: "新链接", href: "#" }];
                      updateField("footer", "bottomLinks", arr);
                    }}
                  >
                    + 添加底部链接
                  </button>
                </div>

                <div style={{ height: 16 }} />
                <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 8 }}>
                  条款链接
                </div>
                <div className="list-editor">
                  {data.footer.legalLinks.map((link, i) => (
                    <div key={i} className="list-editor-item">
                      <div className="item-content" style={{ flexDirection: "row", gap: 12 }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>文字</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const arr = [...data.footer.legalLinks];
                              arr[i] = { ...link, label: e.target.value };
                              updateField("footer", "legalLinks", arr);
                            }}
                          />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                          <label>链接</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const arr = [...data.footer.legalLinks];
                              arr[i] = { ...link, href: e.target.value };
                              updateField("footer", "legalLinks", arr);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const arr = [...data.footer.legalLinks];
                          arr.splice(i, 1);
                          updateField("footer", "legalLinks", arr);
                        }}
                      >
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-btn"
                    onClick={() => {
                      const arr = [...data.footer.legalLinks, { label: "新条款", href: "#" }];
                      updateField("footer", "legalLinks", arr);
                    }}
                  >
                    + 添加条款链接
                  </button>
                </div>
              </div>

              {/* 更多设置（折叠） */}
              <div className={`collapsible-card ${collapsed.footer ? "" : "open"}`}>
                <button
                  className="collapsible-trigger"
                  onClick={() => toggleCollapse("footer")}
                >
                  <span className="trigger-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1c0 .56.3 1.07.77 1.35"/>
                    </svg>
                    更多设置
                  </span>
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="collapsible-body">
                  <div className="collapsible-body-inner">
                    <div className="form-grid">
                      <div className="form-group full">
                        <label>版权信息</label>
                        <input
                          type="text"
                          value={data.footer.copyright}
                          onChange={(e) => updateField("footer", "copyright", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 图标选择器弹窗 */}
      {iconPicker?.open && (
        <div
          className="modal-overlay"
          onClick={() => setIconPicker(null)}
        >
          <div
            className="modal-content icon-picker-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>选择图标</h3>
              <button
                className="modal-close"
                onClick={() => setIconPicker(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="icon-picker-grid">
              {Object.entries(ICONS).map(([name, svg]) => (
                <button
                  key={name}
                  className="icon-picker-item"
                  onClick={() => {
                    iconPicker.onSelect(svg);
                    setIconPicker(null);
                  }}
                  title={name}
                >
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <p className="icon-picker-hint">
              点击图标即可选中。也可在下方 textarea 中自定义 SVG 代码。
            </p>
          </div>
        </div>
      )}

      {/* 保存成功提示 */}
      {toast && <div className="save-toast">{toast}</div>}
    </div>
  );
}
