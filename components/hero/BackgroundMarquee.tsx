import styles from "./BackgroundMarquee.module.css";

const TEXT = "SHAHEER HUSSAIN JAFRI";

type BackgroundMarqueeProps = {
  text?: string;
};

export default function BackgroundMarquee({
  text = TEXT,
}: BackgroundMarqueeProps) {
  const repeated = Array.from({ length: 4 }, (_, index) => (
    <span className={styles.phrase} key={`${text}-${index}`}>
      {text}
    </span>
  ));

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.rows}>
        <div className={`${styles.row} ${styles.rowOne}`}>
          <div className={styles.track}>{repeated}</div>
        </div>

        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.track}>{repeated}</div>
        </div>
      </div>
    </div>
  );
}
