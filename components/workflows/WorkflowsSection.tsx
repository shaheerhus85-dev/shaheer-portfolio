import styles from "./WorkflowsSection.module.css";

const workflowSteps = [
  {
    number: "01",
    title: "Analyze the workflow",
    description:
      "Understand how the current process works, where decisions happen, and what information moves through the system."
  },
  {
    number: "02",
    title: "Identify bottlenecks",
    description:
      "Find repetitive tasks, manual handoffs, unclear ownership, and points where workflows slow down or become error-prone."
  },
  {
    number: "03",
    title: "Design the system",
    description:
      "Plan the logic, integrations, automation paths, and user flow before moving into implementation."
  },
  {
    number: "04",
    title: "Build & iterate",
    description:
      "Develop, test, improve, and refine until the workflow becomes practical, reliable, and maintainable."
  }
];

export default function WorkflowsSection() {
  return (
    <section id="workflows" className={styles.workflowsSection} aria-label="Workflows">
      <div className={styles.workflowsContainer}>
        <div className={styles.workflowsLeft}>
          <p data-reveal="text" className={styles.sectionLabel}>WORKFLOWS</p>

          <h2 data-reveal="heading" data-reveal-delay="1" className={styles.workflowsHeading}>
            Turning repetitive <br />
            processes into <br />
            reliable systems.
          </h2>

          <p data-reveal="text" data-reveal-delay="2" className={styles.workflowsCopy}>
            I use AI-assisted planning, development, and automation workflows to turn manual processes into practical
            digital systems.
          </p>
        </div>

        <div data-reveal-group className={styles.workflowsProcess}>
          {workflowSteps.map((step) => (
            <div
              data-reveal-item
              className={styles.workflowStep}
              key={step.number}
            >
              <span className={styles.workflowNumber}>{step.number}</span>

              <div>
                <h3 className={styles.workflowTitle}>{step.title}</h3>
                <p className={styles.workflowDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
