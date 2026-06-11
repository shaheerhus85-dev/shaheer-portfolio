import styles from "./ProblemsSection.module.css";

const problemRows = [
  {
    number: "01",
    title: "Manual work without structure",
    description: "Tasks depend on memory, repeated messages, and manual follow-ups."
  },
  {
    number: "02",
    title: "Tools that do not communicate",
    description: "Information gets trapped across apps, spreadsheets, forms, and inboxes."
  },
  {
    number: "03",
    title: "Content without conversion",
    description: "Attention exists, but there is no workflow that turns it into action."
  },
  {
    number: "04",
    title: "Ideas that never become systems",
    description: "Good ideas stay scattered because there is no process to build, test, and repeat."
  }
];

export default function ProblemsSection() {
  return (
    <section id="problems" className={styles.problemsSection} aria-label="Problems">
      <div className={styles.problemsContainer}>
        <div className={styles.problemsLeft}>
          <p data-reveal="text" className={styles.sectionLabel}>PROBLEMS</p>

          <h2 data-reveal="heading" data-reveal-delay="1" className={styles.problemsHeading}>
            Business systems break <br />
            when work stays scattered.
          </h2>

          <p data-reveal="text" data-reveal-delay="2" className={styles.problemsCopy}>
            I look for repeated friction, unclear ownership, manual handoffs, and disconnected workflows before
            designing a cleaner operating system.
          </p>
        </div>

        <div data-reveal-group className={styles.problemsList}>
          {problemRows.map((row) => (
            <div
              className={styles.problemRow}
              data-reveal-item
              key={row.number}
            >
              <span className={styles.problemNumber}>{row.number}</span>

              <div className={styles.problemContent}>
                <h3 className={styles.problemTitle}>{row.title}</h3>
                <p className={styles.problemDescription}>{row.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
