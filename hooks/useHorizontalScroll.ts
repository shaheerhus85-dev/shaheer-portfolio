"use client";

import { type RefObject, useEffect } from "react";

type HorizontalScrollOptions = {
  enabled?: boolean;
  wheelSpeed?: number;
  touchSpeed?: number;
};

export default function useHorizontalScroll(
  containerRef: RefObject<HTMLElement | null>,
  options: HorizontalScrollOptions = {}
) {
  const { enabled = true, wheelSpeed = 1, touchSpeed = 1 } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let touchStartX = 0;
    let touchStartY = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0 && event.deltaX === 0) {
        return;
      }

      event.preventDefault();
      container.scrollLeft += (event.deltaY + event.deltaX) * wheelSpeed;
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        event.preventDefault();
        container.scrollLeft += deltaY * touchSpeed;
      } else {
        container.scrollLeft += deltaX * touchSpeed;
      }

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = previousOverflow;
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [containerRef, enabled, wheelSpeed, touchSpeed]);
}

