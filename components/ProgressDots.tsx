"use client";

import styles from "./ProgressDots.module.css";

type ProgressDotsProps = {
  count: number;
  activeIndex: number;
};

export default function ProgressDots({ count, activeIndex }: ProgressDotsProps) {
  return (
    <div className={styles.dots} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span key={`dot-${index}`} className={index === activeIndex ? styles.dotActive : styles.dotInactive} />
      ))}
    </div>
  );
}
