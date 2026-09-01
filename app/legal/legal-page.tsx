"use client";

import Link from "next/link";

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalPageProps {
  label: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

// 官网法律条款通用布局（样式使用站点全局 CSS 变量）
export function LegalPage({
  label,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          返回首页
        </Link>

        <header className="legal-hero">
          <p className="legal-kicker">{label}</p>
          <h1>{title}</h1>
          <p className="legal-desc">{description}</p>
          <p className="legal-updated">最后更新：{updatedAt}</p>
        </header>

        <div className="legal-sections">
          {sections.map((section) => (
            <article key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="legal-p">{p}</p>
              ))}
              {section.items && (
                <ul className="legal-list">
                  {section.items.map((item, i) => (
                    <li key={i} className="legal-item">{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 100vh;
          padding: 48px 0 80px;
          background: var(--bg);
        }
        .legal-container {
          max-width: 800px;
        }
        .legal-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-dim);
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.2s ease;
        }
        .legal-back:hover {
          color: var(--accent);
        }
        .legal-hero {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px;
          margin-bottom: 24px;
        }
        .legal-kicker {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-soft);
          margin-bottom: 12px;
        }
        .legal-hero h1 {
          font-size: 30px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 16px;
        }
        .legal-desc {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-dim);
          margin: 0;
        }
        .legal-updated {
          font-size: 13px;
          color: var(--text-faint);
          margin: 20px 0 0;
        }
        .legal-sections {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .legal-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
        }
        .legal-section h2 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 16px;
        }
        .legal-p {
          font-size: 14.5px;
          line-height: 1.9;
          color: var(--text-dim);
          margin: 0 0 12px;
        }
        .legal-p:last-child {
          margin-bottom: 0;
        }
        .legal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .legal-item {
          position: relative;
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--text-dim);
          padding-left: 18px;
        }
        .legal-item::before {
          content: "";
          position: absolute;
          left: 2px;
          top: 0.75em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
        @media (max-width: 600px) {
          .legal-hero,
          .legal-section {
            padding: 24px;
          }
          .legal-hero h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
