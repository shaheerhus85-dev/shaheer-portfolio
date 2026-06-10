"use client";

import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./HorizontalEngine.module.css";

type HorizontalEngineProps = {
  children: ReactNode;
};

type ScrollEventDetail = {
  scrollX: number;
  maxScroll: number;
  viewportWidth: number;
};

export default function HorizontalEngine({ children }: HorizontalEngineProps) {
  const searchParams = useSearchParams();
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const manualYRef = useRef(0);
  const maxScrollRef = useRef(0);

  const dispatchScrollState = (x: number) => {
    window.dispatchEvent(
      new CustomEvent<ScrollEventDetail>("engine:scroll", {
        detail: {
          scrollX: x,
          maxScroll: maxScrollRef.current,
          viewportWidth: window.innerWidth,
        },
      })
    );
  };

  const resolveSceneOffset = () => {
    const scene = searchParams.get("scene");
    const viewport = window.innerWidth;

    if (scene === "contact") return 10 * viewport;
    if (scene === "method") return 6 * viewport;
    if (scene === "cards") return 1 * viewport;
    if (scene === "clarity") return 1 * viewport;

    return 0;
  };

  useEffect(() => {
    const track = trackRef.current;
    const spacer = spacerRef.current;
    if (!track || !spacer) return;

    const state = { x: 0 };
    const smoothTo = gsap.quickTo(state, "x", {
      duration: 0.65,
      ease: "power3.out",
      onUpdate: () => {
        track.style.transform = `translateX(-${state.x}px)`;
        dispatchScrollState(state.x);
      },
    });

    const clampAndMove = (next: number, immediate = false) => {
      manualYRef.current = Math.max(0, Math.min(maxScrollRef.current, next));

      if (immediate) {
        state.x = manualYRef.current;
        track.style.transform = `translateX(-${state.x}px)`;
        dispatchScrollState(state.x);
        return;
      }

      smoothTo(manualYRef.current);
    };

    const measure = () => {
      const totalScrollWidth = track.scrollWidth;
      maxScrollRef.current = Math.max(0, totalScrollWidth - window.innerWidth);
      spacer.style.height = `${totalScrollWidth}px`;
      clampAndMove(manualYRef.current, true);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      clampAndMove(manualYRef.current + event.deltaY);
    };

    let touchStartX = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const currentX = event.touches[0].clientX;
      const delta = touchStartX - currentX;
      touchStartX = currentX;
      clampAndMove(manualYRef.current + delta);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        clampAndMove(manualYRef.current + window.innerWidth * 0.18);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        clampAndMove(manualYRef.current - window.innerWidth * 0.18);
      }
    };

    measure();
    clampAndMove(resolveSceneOffset(), true);

    window.addEventListener("resize", measure);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      gsap.killTweensOf(state);
    };
  }, [searchParams]);

  return (
    <>
      <div id="scroll-spacer" ref={spacerRef} className={styles.spacer} aria-hidden="true" />
      <div id="viewport" className={styles.viewport}>
        <div id="track" ref={trackRef} className={styles.track}>
          {children}
        </div>
      </div>
    </>
  );
}

