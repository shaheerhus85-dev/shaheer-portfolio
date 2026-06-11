import styles from "./LabPrototypingSection.module.css";

const ROWS = [
  {
    number: "01",
    title: "Interface Experiments",
    description: "Motion systems, layouts, interactions, and user experience exploration.",
  },
  {
    number: "02",
    title: "Automation Concepts",
    description: "Workflow logic, integrations, and backend automation ideas.",
  },
  {
    number: "03",
    title: "AI Product Ideas",
    description: "Testing concepts, validating assumptions, and practical AI applications.",
  },
  {
    number: "04",
    title: "System Explorations",
    description: "Learning new tools, architectures, and execution frameworks.",
  },
];

export default function LabPrototypingSection() {
  return (
    <section
      id="prototypes"
      className={styles.section}
      aria-label="Lab — Prototyping"
    >
      <div className={styles.shell}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <p data-reveal="text" className={styles.label}>LAB</p>
            <h2 data-reveal="heading" data-reveal-delay="1" className={styles.headline}>
              Testing ideas before
              <br />
              they become real systems.
            </h2>
            <p data-reveal="text" data-reveal-delay="2" className={styles.copy}>
              The lab is where I explore interfaces, automation concepts, AI
              workflows, and system ideas before turning them into
              production-ready solutions.
            </p>
          </div>

          <div data-reveal-group className={styles.rows} role="list">
            {ROWS.map((row) => (
              <div
                key={row.number}
                data-reveal-item
                className={styles.row}
                role="listitem"
              >
                <span className={styles.rowNumber}>{row.number}</span>
                <div className={styles.rowContent}>
                  <span className={styles.rowTitle}>{row.title}</span>
                  <span className={styles.rowDesc}>{row.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
