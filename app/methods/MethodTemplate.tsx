import Link from "next/link";
import { METHOD_PAGES, type MethodSlug } from "./methodPageContent";
import styles from "../problems/problemPage.module.css";

type MethodTemplateProps = {
  slug: MethodSlug;
};

export default function MethodTemplate({ slug }: MethodTemplateProps) {
  const page = METHOD_PAGES[slug];

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
            <h2 className={styles.blockTitle}>Signals</h2>
            <ul className={styles.list}>
              {page.signals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.blockCard}>
            <h2 className={styles.blockTitle}>Execution Process</h2>
            <ul className={styles.list}>
              {page.process.map((item) => (
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
          <Link href={`/?scene=method`} className={styles.ghostBtn}>
            Back to Method
          </Link>
          <Link href="/" className={styles.primaryBtn}>
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
