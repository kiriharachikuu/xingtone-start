"use client";

import { useState } from "react";
import type { ScreenshotsConfig } from "@/lib/types";

type Props = {
  data: ScreenshotsConfig;
};

export function Screenshots({ data }: Props) {
  const [activeTab, setActiveTab] = useState(data.activeTab);

  return (
    <section id="screenshots" className="screenshots-section">
      <div className="container">
        <div className="section-header">
          <h2>
            {data.sectionTitle}
            <span className="gradient-text">{data.sectionSubtitle}</span>
          </h2>
          <p>快速浏览应用界面 — 发现、歌单、播放、歌词与设置，一目了然。</p>
        </div>

        <div className="tabs">
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="screenshot-frame">
          {data.tabImages && data.tabImages[activeTab] ? (
            <div className="screenshot-custom-image">
              <img src={data.tabImages[activeTab]} alt={activeTab} />
            </div>
          ) : (
            <>
              <div className="frame-header">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="frame-tabs">
                  <span className="frame-tab active">音乐库</span>
                  <span className="frame-tab">播放列表</span>
                </div>
              </div>

              <div className="frame-body">
                <div className="screenshot-sidebar">
                  {data.sidebarItems.map((item, i) => (
                    <div
                      key={i}
                      className={`sidebar-item ${item.active ? "active" : ""}`}
                    >
                      <span className="sidebar-dot" />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="screenshot-main">
                  <div className="screenshot-section-title">每日推荐</div>
                  <div className="song-list">
                    {data.songList.map((song, i) => (
                      <div key={i} className="song-item">
                        <div className="song-cover" />
                        <div className="song-text">
                          <div className="song-name">{song.title}</div>
                          <div className="song-artist">{song.artist}</div>
                        </div>
                        <div className="song-duration">{song.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="screenshot-caption">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                XingTone Desktop · {activeTab}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .screenshots-section {
          padding: 110px 0;
          background: var(--bg-soft);
        }
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 40px;
        }
        h2 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.25;
        }
        .gradient-text {
          background: var(--grad);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-size: 16px;
          color: var(--text-dim);
          line-height: 1.7;
        }
        .tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .tab {
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-dim);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font);
        }
        .tab:hover {
          color: var(--text);
          border-color: var(--border-strong);
        }
        .tab.active {
          color: white;
          background: var(--grad-btn);
          border-color: transparent;
        }
        .screenshot-frame {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.5);
        }
        .screenshot-custom-image {
          width: 100%;
          display: flex;
        }
        .screenshot-custom-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .frame-header {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border);
          gap: 16px;
        }
        .window-dots {
          display: flex;
          gap: 6px;
        }
        .window-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.6;
        }
        .window-dots span:nth-child(1) {
          background: #ff5f57;
        }
        .window-dots span:nth-child(2) {
          background: #febc2e;
        }
        .window-dots span:nth-child(3) {
          background: #28c840;
        }
        .frame-tabs {
          display: flex;
          gap: 4px;
        }
        .frame-tab {
          padding: 4px 12px;
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg-card);
          border-radius: 6px;
        }
        .frame-tab.active {
          color: var(--text);
          background: rgba(139, 0, 255, 0.15);
        }
        .frame-body {
          display: flex;
          min-height: 400px;
        }
        .screenshot-sidebar {
          width: 200px;
          padding: 16px 10px;
          background: rgba(255, 255, 255, 0.01);
          border-right: 1px solid var(--border);
          flex-shrink: 0;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          font-size: 13px;
          color: var(--text-dim);
          border-radius: 8px;
          margin-bottom: 2px;
        }
        .sidebar-item.active {
          color: var(--text);
          background: rgba(139, 0, 255, 0.12);
        }
        .sidebar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-soft);
          opacity: 0.4;
        }
        .sidebar-item.active .sidebar-dot {
          opacity: 1;
        }
        .screenshot-main {
          flex: 1;
          padding: 24px;
        }
        .screenshot-section-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 16px;
        }
        .song-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .song-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
        }
        .song-cover {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: var(--grad-btn);
          flex-shrink: 0;
        }
        .song-text {
          flex: 1;
          min-width: 0;
        }
        .song-name {
          font-size: 13px;
          color: var(--text);
          margin-bottom: 2px;
        }
        .song-artist {
          font-size: 11.5px;
          color: var(--text-faint);
        }
        .song-duration {
          font-size: 12px;
          color: var(--text-faint);
          font-variant-numeric: tabular-nums;
        }
        .screenshot-caption {
          position: absolute;
          bottom: 16px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 12.5px;
          color: var(--text-dim);
          background: rgba(5, 6, 11, 0.7);
          backdrop-filter: blur(8px);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .screenshots-section {
            padding: 72px 0;
          }
          h2 {
            font-size: 28px;
          }
          .screenshot-sidebar {
            display: none;
          }
          .frame-body {
            min-height: 320px;
          }
        }
      `}</style>
    </section>
  );
}
