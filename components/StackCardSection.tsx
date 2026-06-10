"use client";

import CardStack from "@/components/CardStack";
import ProgressDots from "@/components/ProgressDots";
import type { StackCard } from "@/data/types";
import useStackScroll from "@/hooks/useStackScroll";
import { useRef } from "react";
import styles from "./StackCardSection.module.css";

type StackCardSectionProps = {
  eyebrow: string;
  headline: string;
  cards: StackCard[];
};

export default function StackCardSection({ eyebrow, headline, cards }: StackCardSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { activeIndex } = useStackScroll(sectionRef, cards.length);

  return (
    <section ref={sectionRef} className={styles.section} style={{ height: `${cards.length * 100}vh` }}>
      <div className={styles.stickyShell}>
        <div className={styles.leftPanel}>
          <div className={styles.leftInner}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.headline}>{headline}</h2>
            <ProgressDots count={cards.length} activeIndex={activeIndex} />
          </div>
        </div>

        <div className={styles.rightPanel}>
          <CardStack cards={cards} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
