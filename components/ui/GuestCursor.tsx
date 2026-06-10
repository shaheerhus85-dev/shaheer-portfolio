"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GuestCursor.module.css";

export default function GuestCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(media.matches);
    apply();

    const onChange = () => apply();
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      setX(current.x);
      setY(current.y);
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX + 16, y: event.clientY + 12 };
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    rafRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`${styles.cursorBadge} ${visible ? styles.visible : ""}`}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      aria-hidden
    >
      <span className={styles.dot} />
      <span className={styles.label}>Guest</span>
    </div>
  );
}
