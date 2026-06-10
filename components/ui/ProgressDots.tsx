import styles from "./ProgressDots.module.css";

type ProgressDotsProps = {
  total: number;
  active: number;
};

export default function ProgressDots({ total, active }: ProgressDotsProps) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={index === active ? styles.dotActive : styles.dot} />
      ))}
    </div>
  );
}
