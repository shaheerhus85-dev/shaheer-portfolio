"use client";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SceneCard from "@/components/ui/SceneCard";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { motion } from "framer-motion";
import styles from "./HookSection.module.css";

const cards = [
  {
    slug: "content-without-structure",
    step: "01 / Strategy gap",
    title: "Content Without Structure",
    body: "Ideas get posted, but the market never forms one clear belief about what you actually do.",
    href: "/problems/content-without-structure",
  },
  {
    slug: "attention-without-conversion",
    step: "02 / Ops gap",
    title: "Attention Without Conversion",
    body: "Reach grows, but views and engagement still fail to become booked calls or revenue.",
    href: "/problems/attention-without-conversion",
  },
  {
    slug: "manual-workflows",
    step: "03 / Execution gap",
    title: "Manual Workflows",
    body: "You're the bottleneck. Every deliverable and follow-up still depends on you showing up.",
    href: "/problems/manual-workflows",
  },
  {
    slug: "missing-growth-infrastructure",
    step: "04 / Systems gap",
    title: "Missing Growth Infrastructure",
    body: "CRM, content, outreach, and reporting do not talk to each other, so context leaks at every handoff.",
    href: "/problems/missing-growth-infrastructure",
  },
];

export default function HookSection() {
  return (
    <section className={styles.wrap} id="problem-cards">
      <section className={styles.tensionScene}>
        <div className={styles.inner}>
          <Eyebrow>The real problem</Eyebrow>
          <h2 className={`text-headline ${styles.tensionTitle}`}>
            Most businesses don't have a growth
            <span className={styles.bleedWord}> problem.</span>
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={`text-body ${styles.tensionBody}`}>
            They have a systems problem. They're posting, responding, onboarding - but none of it compounds. Every week
            resets to zero.
          </p>
        </div>
      </section>

      <section className={styles.diagnosisScene}>
        <motion.div className={styles.inner} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.3 }}>
          <motion.div variants={fadeInUp}>
            <Eyebrow>Three system gaps</Eyebrow>
            <h3 className={`text-headline ${styles.heading}`}>Where growth leaks out</h3>
          </motion.div>

          <motion.div className={styles.grid} variants={staggerContainer}>
            {cards.map((card, index) => (
              <motion.div key={card.slug} variants={fadeInUp}>
                <SceneCard className={`${styles.card} ${index < 2 ? styles.cardStrong : styles.cardRecessed}`}>
                  <p className={styles.step}>{card.step}</p>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <p className={styles.cardBody}>{card.body}</p>
                  <Button variant="subtle" size="sm" href={`${card.href}?card=${card.slug}`}>
                    View system -&gt;
                  </Button>
                </SceneCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
}

