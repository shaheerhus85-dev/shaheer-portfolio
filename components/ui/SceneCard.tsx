import type { HTMLAttributes } from "react";
import styles from "./SceneCard.module.css";

type SceneCardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "strong";
};

export default function SceneCard({ className, tone = "default", ...props }: SceneCardProps) {
  const toneClass = tone === "strong" ? styles.strong : "";
  return <div className={[styles.card, toneClass, className].filter(Boolean).join(" ")} {...props} />;
}
