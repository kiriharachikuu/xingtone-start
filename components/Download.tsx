"use client";

import type { DownloadConfig } from "@/lib/types";
import type { AppVersionsPayload, AppVersionSummary } from "@/lib/app-versions";
import { formatFileSize } from "@/lib/app-versions";
import { useState } from "react";

type Props = {
  data: DownloadConfig;
  /** 后端 /public/app-versions 真实版本数据；为空时回退静态数据 */
  versions?: AppVersionsPayload | null;
};

/** 平台卡片名 → 后端平台数据（Windows → pc，Android → android） */
function matchVersion(
  name: string,
  versions?: AppVersionsPayload | null
): AppVersionSummary | null {
  if (!versions) return null;
  const key = name.toLowerCase();
  if (key.includes("win")) return versions.pc;
  if (key.includes("android")) return versions.android;
  return null;
}

export function Download({ data, versions }: Props) {
  const [mirror, setMirror] = useState(data.mirrorToggle);
  // 顶部"当前版本"优先显示后台最新平台版本号，无则回退静态配置
  const latestVersion =
    versions?.pc?.version ?? versions?.android?.version ?? null;

  return (
    <section id="download" className="download-section">
      <div className="container">
        <div className="section-header">
          <h2>
            {data.sectionTitle}
            <span className="gradient-text">{data.sectionSubtitle}</span>
          </h2>
          <div className="version-row">
            <span>
              当前版本{" "}
              <span className="ver-pill">
                {latestVersion ? `v${latestVersion}` : data.version}
              </span>
            </span>
            <button className="mirror-toggle" onClick={() => setMirror(!mirror)}>
              <span className={`toggle-dot ${mirror ? "on" : ""}`} />
              使用 GitHub 镜像
            </button>
          </div>
        </div>

        <div className="download-grid">
          {data.platforms.map((platform, i) => {
            // 后台已发布该平台版本时，主下载链接替换为真实地址并显示版本角标
            const v = matchVersion(platform.name, versions);
            const downloads =
              v && v.downloadUrl
                ? platform.downloads.map((dl, j) =>
                    j === 0 ? { ...dl, href: v.downloadUrl } : dl
                  )
                : platform.downloads;
            return (
              <div
                key={i}
                className={`download-card ${platform.featured ? "featured" : ""}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <div
                      className="card-icon"
                      dangerouslySetInnerHTML={{ __html: platform.icon }}
                    />
                    <h3>{platform.name}</h3>
                  </div>
                  <span className="arch-badge">
                    {v
                      ? `v${v.version} · ${formatFileSize(v.fileSize)}`
                      : platform.arch}
                  </span>
                </div>

                <div className="download-links">
                  {downloads.map((dl, j) => (
                    <a
                      key={j}
                      href={dl.href}
                      className="download-link-row"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="link-label">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        {dl.label}
                      </span>
                      <span className="link-ext">{dl.ext}</span>
                    </a>
                  ))}
                </div>

                {platform.note && <div className="card-note">{platform.note}</div>}
              </div>
            );
          })}
        </div>

        <div className="download-more">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15.9-.25 1.86-.37 2.82-.37.96 0 1.92.13 2.82.37 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.2.65.78.54 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5z" />
            </svg>
            前往 GitHub Releases
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .download-section { padding: 110px 0; }
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 48px;
        }
        h2 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.25;
        }
        .gradient-text {
          background: var(--grad);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .version-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          font-size: 14.5px;
          color: var(--text-dim);
          flex-wrap: wrap;
        }
        .ver-pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-soft);
          background: rgba(139, 0, 255, 0.15);
          border-radius: 999px;
          margin-left: 4px;
        }
        .mirror-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          font-size: 13px;
          color: var(--text-dim);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font);
          transition: all 0.2s ease;
        }
        .mirror-toggle:hover {
          color: var(--text);
          border-color: var(--border-strong);
        }
        .toggle-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--text-faint);
          transition: background 0.2s ease;
        }
        .toggle-dot.on { background: var(--accent-soft); }
        .download-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .download-card {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: all 0.25s ease;
        }
        .download-card:hover {
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
        }
        .download-card.featured {
          border-color: rgba(139, 0, 255, 0.3);
          background: rgba(139, 0, 255, 0.05);
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .card-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-card-hover);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
        }
        .card-icon :global(svg) {
          width: 20px;
          height: 20px;
        }
        h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }
        .arch-badge {
          font-size: 12px;
          color: var(--text-faint);
          padding: 3px 8px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
        }
        .download-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .download-link-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all 0.2s ease;
          text-decoration: none;
          color: var(--text);
        }
        .download-link-row:hover {
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
        }
        .link-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text);
        }
        .link-ext {
          font-size: 12px;
          color: var(--text-faint);
          font-family: var(--mono);
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
        }
        .card-note {
          font-size: 12px;
          color: var(--text-faint);
          margin-top: 12px;
          text-align: center;
        }
        .download-more { text-align: center; margin-top: 32px; }
        .download-more a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-dim);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .download-more a:hover {
          color: var(--text);
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
        }
        @media (max-width: 1024px) { .download-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .download-section { padding: 72px 0; }
          h2 { font-size: 28px; }
        }
      `}</style>
    </section>
  );
}
