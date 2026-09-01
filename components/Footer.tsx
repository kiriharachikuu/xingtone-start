"use client";

import type { FooterConfig } from "@/lib/types";

type Props = {
  data: FooterConfig;
};

export function Footer({ data }: Props) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <span className="brand-mark">
                <img src="/icons/logo.png" alt="XingTone Logo" />
              </span>
              {data.brand}
            </a>
            <p>{data.tagline}</p>
          </div>

          <div className="footer-links">
            {data.columns.map((col, i) => (
              <div key={i} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{data.copyright}</span>
          <div className="bottom-links">
            {data.bottomLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {data.legalLinks && data.legalLinks.length > 0 && (
          <div className="footer-legal">
            {data.legalLinks.map((link, i) => (
              <a key={i} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .footer {
          padding: 60px 0 40px;
          background: var(--bg-soft);
          border-top: 1px solid var(--border);
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 60px;
          margin-bottom: 48px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 17.5px;
          color: var(--text);
          text-decoration: none;
        }
        .brand-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--grad-btn);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .brand-mark :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .footer-brand p {
          font-size: 14.5px;
          color: var(--text-dim);
          line-height: 1.7;
          margin-top: 16px;
          max-width: 320px;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .footer-col h4 {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: 0.3px;
        }
        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-col a {
          font-size: 14px;
          color: var(--text-dim);
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .footer-col a:hover {
          color: var(--text);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 13px;
          color: var(--text-faint);
          flex-wrap: wrap;
          gap: 16px;
        }
        .bottom-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .bottom-links a {
          color: var(--text-faint);
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .bottom-links a:hover {
          color: var(--text-dim);
        }
        .footer-legal {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding-top: 16px;
          margin-top: 16px;
          border-top: 1px solid var(--border);
          font-size: 12.5px;
        }
        .footer-legal a {
          color: var(--text-faint);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-legal a:hover {
          color: var(--text-dim);
        }
        @media (max-width: 1024px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 768px) {
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
