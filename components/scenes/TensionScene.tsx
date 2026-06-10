"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TensionScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section ref={sectionRef} className="flex h-screen w-screen items-center justify-center px-6">
      <motion.div
        className="w-full max-w-[800px] text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-headline font-bold leading-[1.05] tracking-tight text-[var(--color-surface)]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          Most businesses don&apos;t have a growth problem.
        </motion.h2>

        <motion.h3
          className="mt-2 text-headline font-bold leading-[1.05] tracking-tight text-[var(--color-text-muted)]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 }}
        >
          They have a systems problem.
        </motion.h3>

        <motion.p
          className="mx-auto mt-5 max-w-[760px] text-[16px] leading-relaxed text-[#737373]"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.36 }}
        >
          They&apos;re posting, responding, onboarding - but none of it compounds. Every week resets to zero.
        </motion.p>
      </motion.div>
    </section>
  );
}

