"use client";

import type { HeroConfig } from "@/lib/types";

type Props = {
  data: HeroConfig;
};

export function Hero({ data }: Props) {
  const titleLines = data.title.split("\n").filter(Boolean);

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="dot" />
            {data.tag}
          </div>

          <h1>
            {titleLines.map((line, i) => (
              <span key={i} className="hero-title-line">
                {line}
              </span>
            ))}
            <span className="gradient-text">{data.titleGradient}</span>
          </h1>

          <p>{data.subtitle}</p>

          <div className="hero-cta">
            <a href={data.primaryBtnHref} className="btn btn-primary btn-lg">
              {data.primaryBtnLabel}
              {data.primaryBtnVersion && (
                <span className="ver-pill-light">
                  {data.primaryBtnVersion}
                </span>
              )}
            </a>
            <a
              href={data.secondaryBtnHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15.9-.25 1.86-.37 2.82-.37.96 0 1.92.13 2.82.37 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.2.65.78.54 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5z" />
              </svg>
              {data.secondaryBtnLabel}
            </a>
          </div>

          <div className="hero-platforms">
            {data.platforms.map((p) => (
              <span key={p}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          {data.heroImage ? (
            // 自定义上传图片
            <div className="hero-custom-image">
              <img src={data.heroImage} alt="产品预览" />
            </div>
          ) : (
            // 默认播放器 mockup
            <div className="hero-mockup">
              <div className="mockup-header">
                <span className="mockup-dot" />
                <span className="mockup-dot" />
                <span className="mockup-dot" />
                <span className="mockup-title">正在播放</span>
              </div>
              <div className="mockup-body">
                {data.visualSongs?.map((song, i) => (
                  <div key={i} className="mockup-row">
                    <div className="mockup-cover" />
                    <div className="mockup-song-info">
                      <div className="mockup-song-title">{song.title}</div>
                      <div className="mockup-song-artist">{song.artist}</div>
                    </div>
                    {i === 0 ? (
                      <div className="mockup-play-btn">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    ) : (
                      <div style={{ width: 32 }} />
                    )}
                  </div>
                ))}
                <div className="mockup-progress">
                  <div className="mockup-progress-bar" />
                </div>
              </div>
            </div>
          )}

          <div className="float-tag top-left">
            <span className="float-dot" />
            {data.floatTagLeft || "沉浸式 · 下载即用"}
          </div>
          <div className="float-tag bottom-right">
            <span className="float-dot success" />
            {data.floatTagRight || "全平台同步"}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: 160px 0 96px;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 0, 255, 0.15) 0%,
            rgba(217, 70, 239, 0.08) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .hero-tag {
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
          margin-bottom: 24px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-soft);
        }
        h1 {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.14;
          letter-spacing: -1.6px;
          color: var(--text);
          margin-bottom: 20px;
        }
        .hero-title-line {
          display: block;
        }
        .gradient-text {
          display: block;
          background: var(--grad);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-size: 18px;
          line-height: 1.7;
          color: var(--text-dim);
          margin-bottom: 32px;
          max-width: 520px;
        }
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 14px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font);
          white-space: nowrap;
          text-decoration: none;
        }
        .btn-primary {
          background: var(--grad-btn);
          color: white;
          box-shadow:
            rgba(139, 0, 255, 0.55) 0px 8px 28px -8px,
            rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow:
            rgba(139, 0, 255, 0.65) 0px 12px 36px -8px,
            rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset;
        }
        .btn-ghost {
          background: var(--bg-card);
          color: var(--text);
          border-color: var(--border);
        }
        .btn-ghost:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-strong);
        }
        .btn-lg {
          padding: 16px 32px;
          font-size: 17px;
          border-radius: 16px;
        }
        .ver-pill-light {
          padding: 2px 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
        }
        .hero-platforms {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13.5px;
          color: var(--text-faint);
          flex-wrap: wrap;
        }
        .hero-platforms span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 右侧视觉 */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-custom-image {
          position: relative;
          width: 100%;
          max-width: 520px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow:
            0 25px 80px -20px rgba(139, 0, 255, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        .hero-custom-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .hero-mockup {
          position: relative;
          width: 100%;
          max-width: 520px;
          border-radius: var(--radius-lg);
          background: linear-gradient(
            135deg,
            rgba(139, 0, 255, 0.1),
            rgba(217, 70, 239, 0.05)
          );
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow:
            0 25px 80px -20px rgba(139, 0, 255, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        .mockup-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border);
        }
        .mockup-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-faint);
          opacity: 0.5;
        }
        .mockup-dot:nth-child(1) { background: #ff5f57; }
        .mockup-dot:nth-child(2) { background: #febc2e; }
        .mockup-dot:nth-child(3) { background: #28c840; }
        .mockup-title {
          margin-left: 12px;
          font-size: 12px;
          color: var(--text-faint);
        }
        .mockup-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mockup-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 10px;
        }
        .mockup-cover {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--grad-btn);
          flex-shrink: 0;
        }
        .mockup-song-info {
          flex: 1;
          min-width: 0;
        }
        .mockup-song-title {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mockup-song-artist {
          font-size: 11.5px;
          color: var(--text-faint);
          margin-top: 2px;
        }
        .mockup-play-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--grad-btn);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .mockup-progress {
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 4px;
        }
        .mockup-progress-bar {
          height: 100%;
          width: 65%;
          background: var(--grad-btn);
          border-radius: 2px;
        }
        .float-tag {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text);
          background: rgba(5, 6, 11, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: 10px;
          white-space: nowrap;
        }
        .float-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-soft);
        }
        .float-dot.success {
          background: var(--success);
        }
        .top-left { top: 16px; left: -10px; }
        .bottom-right { bottom: 20px; right: -10px; }

        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 48px;
          }
          p { margin-left: auto; margin-right: auto; }
          .hero-cta,
          .hero-platforms { justify-content: center; }
        }
        @media (max-width: 768px) {
          .hero { padding: 120px 0 64px; }
          h1 { font-size: 42px; letter-spacing: -1px; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 36px; }
        }
      `}</style>
    </section>
  );
}
