"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import LoaderIntro from "@/components/intro/LoaderIntro";
import styles from "./HomeIntroGate.module.css";

type HomeIntroGateProps = {
  children: ReactNode;
};

type Stage = "loader_intro" | "hero_live";

const EXIT_MS = 650;

export default function HomeIntroGate({ children }: HomeIntroGateProps) {
  const [stage, setStage] = useState<Stage>("loader_intro");
  const [isExiting, setIsExiting] = useState(false);
  const timersRef = useRef<number[]>([]);

  const introVisible = stage === "loader_intro";

  const queueTimer = (cb: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((x) => x !== id);
      cb();
    }, ms);
    timersRef.current.push(id);
  };

  const handleComplete = () => {
    if (isExiting) return;
    setIsExiting(true);
    queueTimer(() => {
      setStage("hero_live");
      setIsExiting(false);
    }, EXIT_MS);
  };

  const overlayClass = useMemo(() => {
    if (!introVisible) return styles.overlayHidden;
    return isExiting ? `${styles.overlay} ${styles.overlayExit}` : styles.overlay;
  }, [introVisible, isExiting]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  return (
    <div>
      <div className={`${styles.appShell} ${stage === "hero_live" ? styles.appShellReady : ""}`}>{children}</div>

      {introVisible ? (
        <div className={overlayClass} aria-hidden={!introVisible}>
          <LoaderIntro onComplete={handleComplete} />
        </div>
      ) : null}
    </div>
  );
}
