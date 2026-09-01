"use client";

import type { StatItem } from "@/lib/types";

type Props = {
  items: StatItem[];
};

export function Stats({ items }: Props) {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {items.map((item, i) => (
            <div key={i} className="stat-card">
              {item.icon && (
                <div
                  className="stat-icon"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
              )}
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stats {
          padding: 20px 0 60px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(${Math.min(items.length, 4)}, 1fr);
          gap: 2px;
          background: var(--border);
          border-radius: var(--radius-lg);
          padding: 1px;
          overflow: hidden;
        }
        .stat-card {
          background: var(--bg-soft);
          padding: 28px 24px;
          text-align: center;
          transition: background 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .stat-card:hover {
          background: var(--bg-card-hover);
        }
        .stat-icon {
          width: 28px;
          height: 28px;
          color: var(--accent-soft);
          opacity: 0.9;
          margin-bottom: 4px;
        }
        .stat-icon :global(svg) {
          width: 100%;
          height: 100%;
        }
        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.5px;
        }
        .stat-label {
          font-size: 13.5px;
          color: var(--text-dim);
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
