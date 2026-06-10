import styles from "./TechChip.module.css";

type TechChipProps = {
  label: string;
};

const ICON_SLUGS: Record<string, string> = {
  "Make.com": "make",
  "n8n": "n8n",
  "OpenAI API": "openai",
  Airtable: "airtable",
  Buffer: "buffer",
  Zapier: "zapier",
  HubSpot: "hubspot",
  Notion: "notion",
  Python: "python",
  "Next.js": "nextdotjs",
  "Claude API": "anthropic",
  Supabase: "supabase",
};

export default function TechChip({ label }: TechChipProps) {
  const slug = ICON_SLUGS[label];

  return (
    <span className={styles.chip}>
      {slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/808080`}
          alt=""
          width={12}
          height={12}
          className={styles.logo}
          loading="lazy"
        />
      ) : null}
      <span>{label}</span>
    </span>
  );
}
