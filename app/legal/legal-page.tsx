import styles from "./legal.module.css";

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

// 官网法律条款通用布局（纯静态服务端组件，视觉与首页 Hero / 卡片风格统一）
export function LegalPage({
  label,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className={styles.legalPage}>
      <div className={`container ${styles.legalContainer}`}>
        <header className={styles.legalHero}>
          <span className={styles.legalKicker}>
            <span className={styles.dot} />
            {label}
          </span>
          <h1 className={styles.legalTitle}>{title}</h1>
          <p className={styles.legalDesc}>{description}</p>
          <p className={styles.legalUpdated}>最后更新：{updatedAt}</p>
        </header>

        <div className={styles.legalSections}>
          {sections.map((section) => (
            <article key={section.title} className={styles.legalSection}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className={styles.legalP}>{p}</p>
              ))}
              {section.items && (
                <ul className={styles.legalList}>
                  {section.items.map((item, i) => (
                    <li key={i} className={styles.legalItem}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
