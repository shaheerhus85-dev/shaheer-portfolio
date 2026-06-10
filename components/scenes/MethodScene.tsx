"use client";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SceneCard from "@/components/ui/SceneCard";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { motion } from "framer-motion";
import styles from "./MethodScene.module.css";

const steps = [
  {
    step: "STEP 01",
    title: "Audit",
    body: "Map every manual touchpoint. Find where time is wasted and where value is leaking.",
    cta: "What I look for ->",
    href: "/methods/audit",
  },
  {
    step: "STEP 02",
    title: "Architect",
    body: "Design the system before touching any tool. Flows, triggers, logic, edge cases.",
    cta: "My process ->",
    href: "/methods/architect",
  },
  {
    step: "STEP 03",
    title: "Build",
    body: "Implement in Make, n8n, or custom code. No bloated stacks. Precision over complexity.",
    cta: "Tools I use ->",
    href: "/methods/build",
  },
  {
    step: "STEP 04",
    title: "Hand Over",
    body: "Full documentation, async training, and a system that runs without you supervising it.",
    cta: "What you get ->",
    href: "/methods/hand-over",
  },
];

export default function MethodScene() {
  return (
    <section className={styles.scene}>
      <div className={styles.panel}>
        <div className={styles.timeline} aria-hidden="true">
          <span className={styles.timelineDot} />
          <span className={styles.timelineDot} />
          <span className={styles.timelineDot} />
          <span className={styles.timelineDot} />
        </div>

        <motion.div className={styles.content} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.3 }}>
          <motion.div variants={fadeInUp}>
            <Eyebrow>How I work</Eyebrow>
            <h2 className={`text-headline ${styles.heading}`}>The system loop</h2>
          </motion.div>

          <motion.div className={styles.grid} variants={staggerContainer}>
            {steps.map((item, index) => (
              <motion.div key={item.step} variants={fadeInUp}>
                <SceneCard className={styles.card} tone={index === 3 ? "strong" : "default"}>
                  <p className={styles.step}>{item.step}</p>
                  <p className={styles.arrow}>-&gt;</p>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.body}>{item.body}</p>
                  <Button variant="subtle" size="sm" href={item.href} className={styles.cardCta}>
                    {item.cta}
                  </Button>
                </SceneCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
