import type { IconType } from "react-icons";
import { SiGithub, SiNextdotjs, SiOpenai, SiTypescript } from "react-icons/si";
import styles from "./LabGithubSection.module.css";

type ArchiveRow = {
  number: string;
  title: string;
  description: string;
  meta?: string;
  href?: string;
  Icon: IconType;
};

const ARCHIVE_ROWS: ArchiveRow[] = [
  {
    number: "01",
    title: "GitHub Profile",
    description: "Public code, experiments, and ongoing practice.",
    meta: "github.com/shaheerhus85-dev",
    href: "https://github.com/shaheerhus85-dev",
    Icon: SiGithub
  },
  {
    number: "02",
    title: "Portfolio Iterations",
    description: "Design, frontend, animation, and interaction refinements.",
    Icon: SiNextdotjs
  },
  {
    number: "03",
    title: "Workflow Experiments",
    description: "Automation logic, integrations, and process-based builds.",
    Icon: SiTypescript
  },
  {
    number: "04",
    title: "AI System Tests",
    description: "Small experiments around AI workflows, assistants, and system behavior.",
    Icon: SiOpenai
  }
];

export default function LabGithubSection() {
  return (
    <section id="github" className={styles.section} aria-label="GitHub exploration archive">
      <div className={styles.shell}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <p data-reveal="text" className={styles.label}>GITHUB</p>
            <h2 data-reveal="heading" data-reveal-delay="1" className={styles.headline}>
              Building in public
              <br />
              through visible
              <br />
              iterations.
            </h2>
            <p data-reveal="text" data-reveal-delay="2" className={styles.copy}>
              GitHub is where I keep a visible trail of experiments, interface iterations, workflow tests, and
              technical practice.
            </p>
          </div>

          <div data-reveal-group className={styles.archiveRows} role="list">
            {ARCHIVE_ROWS.map(({ Icon, ...row }) => {
              const content = (
                <>
                  <span className={styles.rowNumber}>{row.number}</span>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Icon className={styles.icon} />
                  </span>
                  <span className={styles.rowContent}>
                    <span className={styles.rowTitle}>{row.title}</span>
                    {row.meta ? <span className={styles.rowMeta}>{row.meta}</span> : null}
                    <span className={styles.rowDesc}>{row.description}</span>
                  </span>
                </>
              );

              if (row.href) {
                return (
                  <a
                    key={row.number}
                    href={row.href}
                    target="_blank"
                    rel="noreferrer"
                    data-reveal-item
                    className={styles.archiveRow}
                    role="listitem"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={row.number}
                  data-reveal-item
                  className={styles.archiveRow}
                  role="listitem"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
