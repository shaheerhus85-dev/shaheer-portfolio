import Link from "next/link";
import { PROBLEM_PAGES, type ProblemSlug } from "./problemPageContent";
import styles from "./problemPage.module.css";

type ProblemTemplateProps = {
  slug: ProblemSlug;
};

export default function ProblemTemplate({ slug }: ProblemTemplateProps) {
  const page = PROBLEM_PAGES[slug];

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.hero}>
          <p className={styles.kicker}>{page.kicker}</p>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.subtitle}>{page.subtitle}</p>
        </div>

        <section className={styles.grid}>
          <article className={styles.metricCard}>
            <p className={styles.metricLabel}>{page.primaryMetricLabel}</p>
            <p className={styles.metricValue}>{page.primaryMetric}</p>
          </article>

          <article className={styles.blockCard}>
            <h2 className={styles.blockTitle}>Symptoms</h2>
            <ul className={styles.list}>
              {page.symptoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.blockCard}>
            <h2 className={styles.blockTitle}>System Fix</h2>
            <ul className={styles.list}>
              {page.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.outcomeCard}>
            <h2 className={styles.blockTitle}>Expected Outcome</h2>
            <p className={styles.outcomeText}>{page.outcome}</p>
          </article>
        </section>

        <div className={styles.actions}>
          <Link href={`/?scene=cards&card=${slug}`} className={styles.ghostBtn}>
            Back to Cards
          </Link>
          <Link href="/" className={styles.primaryBtn}>
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
