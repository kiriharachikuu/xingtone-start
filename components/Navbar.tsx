"use client";

import type { NavConfig } from "@/lib/types";

type Props = {
  data: NavConfig;
};

export function Navbar({ data }: Props) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="nav-logo">
          <span className="brand-mark">
            <img src="/icons/logo.png" alt="XingTone Logo" />
          </span>
          <span>
            {data.brand}
            {data.brandSub && (
              <span className="brand-sub">{data.brandSub}</span>
            )}
          </span>
        </a>

        <div className="nav-links">
          {data.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a
            href={data.starHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-star"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.796L19.336 24 12 19.897 4.664 24 6 15.546 0 9.75l8.332-1.595z" />
            </svg>
            {data.starLabel}
            <span className="star-count">{data.starCount}</span>
          </a>
          <a href={data.ctaHref} className="btn btn-primary btn-sm">
            {data.ctaLabel}
          </a>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-h);
          z-index: 50;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(5, 6, 11, 0.7);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 17.5px;
          letter-spacing: -0.3px;
          color: var(--text);
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
        .brand-sub {
          color: var(--accent-soft);
          margin-left: 4px;
          font-weight: 500;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nav-links a {
          padding: 8px 14px;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-dim);
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .nav-links a:hover {
          color: var(--text);
          background: var(--bg-card);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-star {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-dim);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .nav-star:hover {
          color: var(--text);
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
        }
        .star-count {
          padding: 1px 6px;
          font-size: 12.5px;
          color: var(--text);
          background: rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          font-weight: 600;
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
        .btn-sm {
          padding: 8px 14px;
          font-size: 14.5px;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .nav-star {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
