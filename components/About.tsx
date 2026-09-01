"use client";

type Fact = {
  title: string;
  desc: string;
  icon: string;
};

const facts: Fact[] = [
  {
    title: "粉丝自发 · 非商用",
    desc: "XingTone 由星瞳粉丝自发开发与维护，完全开源、无商业运营，与腾讯及星瞳官方无合作、授权或隶属关系。",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  },
  {
    title: "全平台一致体验",
    desc: "覆盖 Web、Windows、macOS、Linux、Android 与 iOS，界面、收藏与歌单多端同步，打开即听。",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  },
  {
    title: "开源 · 社区共建",
    desc: "全部代码托管于 GitHub，欢迎 Star、提交 Issue 与 Pull Request，和我们一起把播放器做得更好。",
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15.9-.25 1.86-.37 2.82-.37.96 0 1.92.13 2.82.37 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.2.65.78.54 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5z"/></svg>',
  },
  {
    title: "合规与免责",
    desc: "平台仅提供播放与管理能力，不抓取、存储或分发版权音源，所有内容由用户自主上传，详见法律条款。",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
];

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="about-kicker">
            <span className="dot" />
            关于项目
          </span>
          <h2>
            为热爱而生的 <span className="gradient-text">开源音乐播放器</span>
          </h2>
          <p>
            XingTone 是一个现代化、跨平台的开源音乐管理工具。我们相信好的音乐体验应当自由、透明、可被拥有——这也是项目全部代码开源的原因。
          </p>
        </div>

        <div className="about-grid">
          {facts.map((f) => (
            <div key={f.title} className="about-card">
              <div
                className="about-icon"
                dangerouslySetInnerHTML={{ __html: f.icon }}
              />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <a
            href="https://github.com/XT-Music"
            target="_blank"
            rel="noopener noreferrer"
            className="about-btn about-btn-primary"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15.9-.25 1.86-.37 2.82-.37.96 0 1.92.13 2.82.37 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.2.65.78.54 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5z" />
            </svg>
            访问源码仓库
          </a>
          <a href="/legal/user-agreement" className="about-btn about-btn-ghost">
            阅读用户协议
          </a>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 110px 0;
          position: relative;
        }
        .about-section::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 0, 255, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }
        .container {
          position: relative;
          z-index: 1;
        }
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 56px;
        }
        .about-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-dim);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-soft);
          box-shadow: 0 0 8px var(--accent-soft);
        }
        h2 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.25;
        }
        .gradient-text {
          background: var(--grad);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-header p {
          font-size: 16px;
          color: var(--text-dim);
          line-height: 1.8;
          margin: 0;
        }
        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .about-card {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: all 0.25s ease;
        }
        .about-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }
        .about-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          border: 1px solid rgba(168, 85, 247, 0.35);
          background: rgba(139, 0, 255, 0.08);
          margin-bottom: 20px;
          color: var(--accent-soft);
          box-shadow: rgba(255, 255, 255, 0.08) 0px 1px 0px 0px inset;
        }
        .about-icon :global(svg) {
          width: 22px;
          height: 22px;
        }
        .about-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }
        .about-card p {
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--text-dim);
          margin: 0;
        }
        .about-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .about-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 26px;
          font-size: 15.5px;
          font-weight: 600;
          border-radius: 14px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font);
          text-decoration: none;
        }
        .about-btn-primary {
          background: var(--grad-btn);
          color: white;
          box-shadow:
            rgba(139, 0, 255, 0.5) 0px 8px 28px -8px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
        }
        .about-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: rgba(139, 0, 255, 0.6) 0px 12px 36px -8px;
        }
        .about-btn-ghost {
          background: var(--bg-card);
          color: var(--text);
          border-color: var(--border);
        }
        .about-btn-ghost:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-strong);
        }
        @media (max-width: 768px) {
          .about-section {
            padding: 72px 0;
          }
          h2 {
            font-size: 28px;
          }
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
