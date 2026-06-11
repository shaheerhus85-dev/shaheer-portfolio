"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const statItems = [
  { label: "Stack", value: "Make + n8n" },
  { label: "Model", value: "AI Powered" },
  { label: "Scope", value: "End-to-End" }
];

const nameLines = ["Shaheer", "Hussain", "Jafri"];

export default function HeroScene() {
  return (
    <section className="relative flex h-screen w-screen overflow-hidden bg-[var(--color-base)] text-[var(--color-text-primary)]">
      <motion.div
        className="flex h-full w-1/2 flex-col justify-between px-10 py-10 lg:px-14"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted,var(--color-text-muted))]">
            AI Systems Builder
          </p>

          <div>
            {nameLines.map((line, index) => (
              <motion.h1
                key={line}
                className="text-display font-bold leading-[0.94] tracking-tight text-[var(--color-surface)]"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + index * 0.1 }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <p className="max-w-[400px] text-base leading-relaxed text-[var(--text-secondary,var(--color-text-secondary))]">
            I build automation systems that turn scattered workflows into compounding growth engines.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {statItems.map((item) => (
              <div key={item.value} className="rounded-xl border border-[rgba(245,243,238,0.1)] bg-[rgba(245,243,238,0.02)] px-3 py-2.5">
                <p className="text-[12px] text-[var(--text-secondary,var(--color-text-secondary))]">{item.label}</p>
                <p className="text-[18px] font-bold leading-tight text-[var(--color-surface)]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button variant="primary">Build My System</Button>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[rgba(245,243,238,0.2)] px-5 py-2.5 text-sm text-[var(--color-surface)] transition-colors hover:border-[var(--color-surface)] hover:bg-[rgba(245,243,238,0.05)]"
            >
              View GitHub â†’
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="h-px w-14 bg-[var(--text-ghost,var(--color-text-ghost))]" />
          <p className="text-[11px] tracking-[0.08em] text-[var(--text-ghost,var(--color-text-ghost))]">
            Scroll to explore
          </p>
        </div>
      </motion.div>

      <motion.div
        className="relative h-full w-1/2"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/images/portrait.jpg"
          alt="Portrait of Shaheer Hussain Jafri"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-base)] via-[rgba(10,10,10,0.72)] to-transparent" />
      </motion.div>
    </section>
  );
}

