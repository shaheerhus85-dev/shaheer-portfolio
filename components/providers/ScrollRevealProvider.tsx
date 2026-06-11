"use client";

import { type ReactNode, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./LenisProvider";

type ScrollRevealProviderProps = {
  children: ReactNode;
  refreshKey?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const REVEAL_SELECTOR = "[data-reveal], [data-reveal-item]";

function getRevealDelay(element: HTMLElement) {
  const delay = Number(element.dataset.revealDelay ?? 0);
  return Number.isFinite(delay) ? delay * 0.08 : 0;
}

function getRevealVars(element: HTMLElement) {
  if (element.dataset.reveal === "heading") {
    return {
      duration: 0.9,
      ease: "power4.out",
      y: 48,
    };
  }

  return {
    duration: 0.85,
    ease: "power3.out",
    y: 34,
  };
}

function forceRevealVisible() {
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
    element.classList.add("is-visible");
    gsap.set(element, { clearProps: "opacity,transform" });
  });
}

export default function ScrollRevealProvider({ children, refreshKey }: ScrollRevealProviderProps) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !lenis) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let context: gsap.Context | null = null;
    let setupFrame = 0;

    root.classList.add("reveal-ready");

    const clearAnimations = () => {
      if (context) {
        context.revert();
        context = null;
      }
    };

    const buildReveals = () => {
      clearAnimations();

      if (reducedMotion.matches) {
        forceRevealVisible();
        ScrollTrigger.refresh();
        return;
      }

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        element.classList.remove("is-visible");
      });

      context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));

          if (items.length === 0) {
            return;
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              invalidateOnRefresh: true,
              once: true,
            },
            onComplete: () => {
              items.forEach((item) => item.classList.add("is-visible"));
            },
          });

          timeline.fromTo(
            items,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
            },
          );
        });

        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          const revealVars = getRevealVars(element);

          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: revealVars.y,
            },
            {
              opacity: 1,
              y: 0,
              delay: getRevealDelay(element),
              duration: revealVars.duration,
              ease: revealVars.ease,
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                invalidateOnRefresh: true,
                once: true,
              },
              onComplete: () => {
                element.classList.add("is-visible");
              },
            },
          );
        });
      }, document.body);

      ScrollTrigger.refresh();
    };

    const setupReveals = () => {
      window.cancelAnimationFrame(setupFrame);
      setupFrame = window.requestAnimationFrame(buildReveals);
    };

    setupReveals();
    reducedMotion.addEventListener("change", setupReveals);

    return () => {
      reducedMotion.removeEventListener("change", setupReveals);
      window.cancelAnimationFrame(setupFrame);
      clearAnimations();
      root.classList.remove("reveal-ready");
    };
  }, [lenis, refreshKey]);

  return <>{children}</>;
}
