"use client";

import { RefObject, useEffect, useState } from "react";

type StackScrollState = {
  activeIndex: number;
  progress: number;
};

export default function useStackScroll(sectionRef: RefObject<HTMLElement | null>, cardCount: number): StackScrollState {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || cardCount <= 0) return;

    let rafId: number | null = null;
    let lastIndex = -1;

    const updateCards = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const sectionTop = sectionEl.offsetTop;
      const scrollBudget = Math.max(1, (cardCount - 1) * window.innerHeight);
      const raw = (window.scrollY - sectionTop) / scrollBudget;
      const nextProgress = Math.min(1, Math.max(0, raw));
      const nextIndex = Math.min(cardCount - 1, Math.floor(nextProgress * cardCount));

      setProgress(nextProgress);
      if (nextIndex !== lastIndex) {
        lastIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateCards();
        rafId = null;
      });
    };

    updateCards();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [cardCount, sectionRef]);

  return { activeIndex, progress };
}
