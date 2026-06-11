import type { HTMLAttributes } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

export default function Eyebrow({ className, ...props }: EyebrowProps) {
  return <p className={[styles.eyebrow, className].filter(Boolean).join(" ")} {...props} />;
}
