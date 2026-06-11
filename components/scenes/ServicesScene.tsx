"use client";

import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SceneCard from "@/components/ui/SceneCard";
import TechChip from "@/components/ui/TechChip";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { motion } from "framer-motion";
import styles from "./ServicesScene.module.css";

const serviceTracks = [
  {
    number: "01",
    title: "AI Content Systems",
    description:
      "Automated content pipelines that research, draft, schedule, and repurpose across platforms without manual input every cycle.",
    tech: ["Make.com", "OpenAI API", "Airtable", "Buffer"],
  },
  {
    number: "02",
    title: "Business Automation",
    description:
      "End-to-end workflow automation covering lead capture, onboarding, follow-up, and reporting so operations scale without added headcount.",
    tech: ["n8n", "Zapier", "HubSpot", "Notion"],
  },
  {
    number: "03",
    title: "AI-Assisted Dev",
    description:
      "Custom internal tools, API integrations, and lightweight apps built faster using AI-assisted development for teams that need solutions, not agencies.",
    tech: ["Python", "Next.js", "Claude API", "Supabase"],
  },
];

export default function ServicesScene() {
  return (
    <section className={styles.scene}>
      <motion.div className={styles.panel} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.25 }}>
        <motion.div variants={fadeInUp}>
          <Eyebrow>What I build</Eyebrow>
          <h2 className={`text-headline ${styles.heading}`}>Three service tracks</h2>
        </motion.div>

        <motion.div className={styles.columns} variants={staggerContainer}>
          {serviceTracks.map((track) => (
            <motion.div key={track.number} variants={fadeInUp}>
              <SceneCard className={styles.column}>
              <p className={styles.number}>{track.number}</p>
              <h3 className={styles.title}>{track.title}</h3>
              <p className={styles.description}>{track.description}</p>
              <div className={styles.tags}>
                {track.tech.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
              </SceneCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className={styles.footerRow} variants={fadeInUp}>
          <p className={styles.footerText}>Want to see the work?</p>
          <Button variant="ghost" href="https://github.com" target="_blank" rel="noreferrer">
            View GitHub -&gt;
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
