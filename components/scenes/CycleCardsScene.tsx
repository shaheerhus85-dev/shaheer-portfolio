"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import styles from "./CycleCardsScene.module.css";

type CycleCardItem = {
  num: string;
  label: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

type CycleCardsSceneProps = {
  eyebrow: string;
  heading: string;
  cards: CycleCardItem[];
  activeIndex: number;
};

function getStateClass(diff: number) {
  if (diff === 0) return styles.active;
  if (diff === -1) return styles.behind1;
  if (diff === -2) return styles.behind2;
  if (diff === -3) return styles.behind3;
  return styles.hidden;
}

export default function CycleCardsScene({ eyebrow, heading, cards, activeIndex }: CycleCardsSceneProps) {
  return (
    <section className={styles.scene}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{heading}</h2>

          <div className={styles.dots} aria-hidden="true">
            {cards.map((_, index) => (
              <span key={`${eyebrow}-${index}`} className={index === activeIndex ? styles.dotActive : styles.dot} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.stackShell}>
          {cards.map((card, index) => {
            const diff = index - activeIndex;
            return (
              <article key={`${card.num}-${card.title}`} className={`${styles.card} ${getStateClass(diff)}`}>
                <div className={styles.metaRow}>
                  <span className={styles.num}>{card.num}</span>
                  <span className={styles.sep} aria-hidden="true" />
                  <span className={styles.label}>{card.label}</span>
                </div>

                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.body}>{card.body}</p>

                {card.href ? (
                  <a href={card.href} className={styles.cta}>
                    {card.cta ?? "View details"}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
