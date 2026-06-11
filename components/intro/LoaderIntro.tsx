"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LoaderIntro.module.css";

type LoaderIntroProps = {
  onComplete?: () => void;
};

const DURATION_MS = 3900;
const HOLD_MS = 350;

export default function LoaderIntro({ onComplete }: LoaderIntroProps) {
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const linear = Math.min(1, Math.max(0, elapsed / DURATION_MS));
      const nextProgress = linear;
      const nextCount = Math.round(linear * 100);

      setProgress(nextProgress);
      setCount(nextCount);

      if (nextProgress < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        onComplete?.();
      }, HOLD_MS);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  const digits = String(count).padStart(3, "0").split("");
  const digitCellClasses = [styles.digitColumn0, styles.digitColumn1, styles.digitColumn2];

  return (
    <div className={styles.container}>
      <div className={styles.loaderStack}>
        <div className={styles.numberStage} aria-hidden>
          <div className={styles.numberFrame}>
            {digits.map((digit, idx) => (
              <span key={`${idx}-${digit}`} className={`${styles.digitColumn} ${digitCellClasses[idx] ?? ""}`}>
                <span className={styles.digitInner}>{digit}</span>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <span className={styles.progressFill} style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
