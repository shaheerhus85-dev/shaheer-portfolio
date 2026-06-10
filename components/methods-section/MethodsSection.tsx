import styles from "./MethodsSection.module.css";

const methodRows = [
  {
    number: "01",
    title: "Audit the workflow",
    description: "Understand the current process, tools, handoffs, and repeated friction.",
    result: "Clear view of the real process"
  },
  {
    number: "02",
    title: "Shape the system",
    description: "Turn scattered steps into clear logic, user flows, and automation paths.",
    result: "System logic before visual design"
  },
  {
    number: "03",
    title: "Build the interface",
    description: "Create the frontend, backend logic, integrations, and workflow touchpoints.",
    result: "Working product, not just screens"
  },
  {
    number: "04",
    title: "Improve the loop",
    description: "Test, refine, and simplify until the system becomes reliable and usable.",
    result: "Cleaner workflow after feedback"
  }
];

export default function MethodsSection() {
  return (
    <section id="methods" className={styles.methodsSection} aria-label="Methods">
      <div className={styles.methodsContainer}>
        <div className={styles.methodsLeft}>
          <p data-reveal="text" className={styles.sectionLabel}>METHODS</p>

          <h2 data-reveal="heading" data-reveal-delay="1" className={styles.methodsHeading}>
            A practical method <br />
            for turning friction <br />
            into systems.
          </h2>

          <p data-reveal="text" data-reveal-delay="2" className={styles.methodsCopy}>
            I start by understanding how work actually moves, then shape the logic, interface, and automation around the
            real process.
          </p>
        </div>

        <div data-reveal-group className={styles.methodsList}>
          {methodRows.map((row) => (
            <div
              className={styles.methodRow}
              data-reveal-item
              key={row.number}
            >
              <span className={styles.methodNumber}>{row.number}</span>

              <div className={styles.methodContent}>
                <h3 className={styles.methodTitle}>{row.title}</h3>
                <p className={styles.methodDescription}>{row.description}</p>
                <p className={styles.methodResult}>{row.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
