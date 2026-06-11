"use client";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { motion } from "framer-motion";
import styles from "./ContactScene.module.css";

export default function ContactScene() {
  return (
    <section className={styles.scene}>
      <motion.div className={styles.panel} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.35 }}>
        <motion.div variants={fadeInUp}>
          <Eyebrow>Ready to build</Eyebrow>
          <h2 className={styles.heading}>
            Your system
            <br />
            starts here.
          </h2>
        </motion.div>

        <motion.p className={styles.subtext} variants={fadeInUp}>
          Tell me what's broken. I'll tell you how to fix it - with a system, not more effort.
        </motion.p>

        <motion.div className={styles.actions} variants={fadeInUp}>
          <Button variant="primary" size="lg">
            Build My System
          </Button>
          <Button variant="link" href="https://github.com" target="_blank" rel="noreferrer">
            or view GitHub -&gt;
          </Button>
        </motion.div>

        <motion.div className={styles.contactBlock} variants={fadeInUp}>
          <span className={styles.divider} aria-hidden="true" />
          <p className={styles.contactLine}>Shaheerhus85@gmail.com · 03158536783</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
