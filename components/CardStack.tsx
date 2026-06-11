import type { StackCard } from "@/data/types";
import GlassCard from "./GlassCard";
import styles from "./CardStack.module.css";

type CardStackProps = {
  cards: StackCard[];
  activeIndex: number;
};

function getStateClass(diff: number) {
  if (diff === 0) return styles.active;
  if (diff === -1) return styles.behind1;
  if (diff === -2) return styles.behind2;
  if (diff === -3) return styles.behind3;
  return styles.hidden;
}

export default function CardStack({ cards, activeIndex }: CardStackProps) {
  return (
    <div className={styles.stack}>
      {cards.map((card, index) => {
        const diff = index - activeIndex;
        return (
          <div key={`${card.num}-${card.title}`} className={`${styles.cardBase} ${getStateClass(diff)}`}>
            <GlassCard card={card} />
          </div>
        );
      })}
    </div>
  );
}
