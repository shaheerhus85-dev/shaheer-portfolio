"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styles from "./ClarityScene.module.css";

type ClarityCard = {
  title: string;
  text: string;
};

const cards: ClarityCard[] = [
  {
    title: "Content Without Structure",
    text: "You post consistently, but your content isn't connected to a clear system. Every post resets momentum instead of compounding growth.",
  },
  {
    title: "Attention Without Conversion",
    text: "Views and engagement increase, but they don't turn into clients. There's no system guiding users toward action.",
  },
  {
    title: "Manual Workflows",
    text: "Content creation, posting, and engagement are handled manually. This slows growth and makes scaling impossible.",
  },
  {
    title: "No Growth Infrastructure",
    text: "Without automation, funnels, and systems, your business depends on effort instead of predictable results.",
  },
];

export default function ClarityScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const pinnedEl = pinnedRef.current;
    const stackEl = stackRef.current;
    const activeCards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!sectionEl || !pinnedEl || !stackEl || activeCards.length !== 4) return;

    const currentIndexRef = { value: 0 };

    const setCardInstant = (index: number) => {
      activeCards.forEach((card, cardIndex) => {
        const isActive = cardIndex === index;
        gsap.set(card, {
          zIndex: isActive ? 10 : 1,
          scale: isActive ? 1 : 0.92,
          y: isActive ? 0 : 42,
          z: isActive ? 0 : -120,
          rotationX: isActive ? 0 : 10,
          rotationY: isActive ? 0 : -4,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
        });
      });
      currentIndexRef.value = index;
    };

    const animateToIndex = (nextIndex: number) => {
      const currentIndex = currentIndexRef.value;
      if (nextIndex === currentIndex) return;

      if (Math.abs(nextIndex - currentIndex) > 1) {
        setCardInstant(nextIndex);
        return;
      }

      const currentCard = activeCards[currentIndex];
      const nextCard = activeCards[nextIndex];

      activeCards.forEach((card, idx) => {
        if (idx !== currentIndex && idx !== nextIndex) {
          gsap.killTweensOf(card);
          gsap.set(card, {
            opacity: 0,
            pointerEvents: "none",
            zIndex: 1,
            scale: 0.92,
            y: 42,
            z: -120,
            rotationX: 10,
            rotationY: -4,
          });
        }
      });

      gsap.killTweensOf(currentCard);
      gsap.killTweensOf(nextCard);

      gsap.set(nextCard, {
        zIndex: 10,
        opacity: 0,
        scale: 0.9,
        y: 70,
        z: -150,
        rotationX: 12,
        rotationY: -6,
        pointerEvents: "none",
      });
      gsap.set(currentCard, { zIndex: 9, pointerEvents: "none" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", force3D: true } });
      tl.to(currentCard, { duration: 0.42, scale: 0.95, y: -72, z: 36, rotationX: -6, rotationY: 3, opacity: 0 }, 0).to(
        nextCard,
        { duration: 0.56, scale: 1, y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, pointerEvents: "auto" },
        0.08
      );

      currentIndexRef.value = nextIndex;
    };

    setCardInstant(0);
    gsap.set(stackEl, { opacity: 1 });

    const onEngineScroll = (event: Event) => {
      const custom = event as CustomEvent<{ scrollX: number; viewportWidth: number }>;
      const scrollX = custom.detail?.scrollX ?? 0;
      const viewportWidth = custom.detail?.viewportWidth ?? window.innerWidth;

      const sectionStart = sectionEl.offsetLeft;
      const sectionBudget = Math.max(viewportWidth, sectionEl.offsetWidth - viewportWidth);
      const relative = scrollX - sectionStart;
      const pinX = Math.min(sectionBudget, Math.max(0, relative));
      const progress = Math.min(1, Math.max(0, relative / sectionBudget));
      const nextIndex = Math.min(activeCards.length - 1, Math.floor(progress * activeCards.length));

      pinnedEl.style.transform = `translate3d(${pinX}px, 0, 0)`;
      animateToIndex(nextIndex);
    };

    window.addEventListener("engine:scroll", onEngineScroll as EventListener);

    return () => {
      window.removeEventListener("engine:scroll", onEngineScroll as EventListener);
      activeCards.forEach((card) => gsap.killTweensOf(card));
      gsap.killTweensOf(stackEl);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={pinnedRef} className={styles.pinnedShell}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <Eyebrow>SYSTEM GAPS</Eyebrow>
            <h2 className={styles.heading}>Where growth leaks out</h2>
            <span className={styles.line} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.right}>
          <div ref={stackRef} className={styles.stack}>
            {cards.map((card, index) => (
              <div
                key={card.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
