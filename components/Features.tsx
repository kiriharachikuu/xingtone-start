"use client";

import type { FeatureItem } from "@/lib/types";

type Props = {
  title: string;
  subtitle: string;
  features: FeatureItem[];
};

export function Features({ title, subtitle, features }: Props) {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card">
              <div
                className="feature-icon"
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 110px 0;
        }
        .section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 56px;
        }
        h2 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.25;
        }
        h2 :global(.gradient-text) {
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
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .feature-card {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: all 0.25s ease;
        }
        .feature-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }
        .feature-icon {
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
        .feature-icon :global(svg) {
          width: 22px;
          height: 22px;
        }
        h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }
        .feature-card p {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--text-dim);
          text-align: left;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .features-section { padding: 72px 0; }
          h2 { font-size: 28px; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
