"use client";

import { motion } from "framer-motion";
import SceneCard from "@/components/ui/SceneCard";

const gaps = [
  {
    id: "01 / Strategy gap",
    title: "Content Without Structure",
    description:
      "Ideas get posted, but the market never forms one clear belief about what you actually do."
  },
  {
    id: "02 / Ops gap",
    title: "Manual Execution Ceiling",
    description:
      "You're the bottleneck. Every deliverable, every follow-up, every report depends on you showing up."
  },
  {
    id: "03 / Systems gap",
    title: "Disconnected Tools",
    description:
      "CRM, content calendar, outreach - they don't talk to each other. Every handoff costs time and context."
  }
];

export default function DiagnosisScene() {
  return (
    <section className="flex h-screen w-screen items-center justify-center px-8 py-14">
      <div className="w-full max-w-[1280px]">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">Three system gaps</p>
        <h2 className="mt-3 text-[36px] font-bold leading-[1.08] tracking-tight text-[var(--color-surface)]">Where growth leaks out</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {gaps.map((gap) => (
            <motion.div
              key={gap.id}
              whileHover={{
                y: -4,
                borderColor: "var(--color-border-hover)"
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="h-full"
            >
              <SceneCard className="flex h-full min-h-[280px] flex-col gap-3 transition-colors duration-200">
                <p className="text-sm tracking-tight text-[var(--color-text-secondary)]">{gap.id}</p>
                <h3 className="text-title font-bold leading-[1.1] tracking-tight text-[var(--color-surface)]">{gap.title}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{gap.description}</p>
              </SceneCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

