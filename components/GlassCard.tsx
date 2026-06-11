import type { StackCard } from "@/data/types";
import styles from "./GlassCard.module.css";

type GlassCardProps = {
  card: StackCard;
};

export default function GlassCard({ card }: GlassCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.metaRow}>
        <span className={styles.number}>{card.num}</span>
        <span className={styles.separator} aria-hidden="true" />
        <span className={styles.label}>{card.label}</span>
      </div>

      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.body}>{card.body}</p>

      {card.href ? (
        <a href={card.href} className={styles.cta}>
          {card.cta ?? "View details"}
          <span aria-hidden="true">&#8594;</span>
        </a>
      ) : null}
    </article>
  );
}
