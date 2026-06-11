"use client";

import { motion } from "framer-motion";
import SystemStackLogoSlider from "@/components/about/SystemStackLogoSlider";
import styles from "./AboutScene.module.css";

export default function AboutScene() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.72, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>ABOUT</p>

        <h2 className={styles.heading}>
          <span>Building intelligent systems,</span>
          <span>not just interfaces.</span>
        </h2>

        <p className={styles.lead}>
          I&apos;m Shaheer Hussain Jafri, an AI engineer focused on creating scalable automation systems and
          high-performance digital products.
        </p>

        <p className={styles.support}>
          My work combines AI, backend logic, and modern frontend development to solve real-world problems with
          clarity and efficiency.
        </p>

        <ul className={styles.focusList}>
          <li>AI automation systems</li>
          <li>Workflow optimization</li>
          <li>Full-stack development</li>
          <li>Performance-driven design</li>
        </ul>
      </motion.div>

      <SystemStackLogoSlider />
    </section>
  );
}
