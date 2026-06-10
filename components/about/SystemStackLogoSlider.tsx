import styles from "./SystemStackLogoSlider.module.css";

type StackLogo = {
  alt: string;
  src: string;
  className?: string;
};

const STACK_LOGOS: StackLogo[] = [
  { alt: "OpenAI", src: "https://cdn.simpleicons.org/openai/74AA9C" },
  { alt: "Claude", src: "https://cdn.simpleicons.org/anthropic/D4A373" },
  { alt: "Gemini", src: "https://cdn.simpleicons.org/googlegemini/8E75FF" },
  { alt: "Grok", src: "https://cdn.simpleicons.org/xai/F3F3F3" },
  { alt: "GitHub Copilot", src: "https://cdn.simpleicons.org/githubcopilot/4C8EFF" },
  { alt: "OpenAI Codex", src: "https://cdn.simpleicons.org/openai/9ACCB7" },
  { alt: "LangChain", src: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { alt: "Linear", src: "https://cdn.simpleicons.org/linear/FFFFFF" },
  { alt: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { alt: "Python", src: "https://cdn.simpleicons.org/python/3776AB" },
  { alt: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { alt: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { alt: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { alt: "Supabase", src: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  { alt: "Vercel", src: "https://cdn.simpleicons.org/vercel/FFFFFF" }
];

function LogoRow({ logos, hidden }: { logos: StackLogo[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className={styles.logoRow}>
      {logos.map((logo) => (
        <li key={`${hidden ? "clone" : "base"}-${logo.alt}`} className="list-none">
          <span className="group flex h-11 w-auto min-w-max items-center justify-center opacity-85 transition-opacity duration-300 hover:opacity-100">
            <img
              src={logo.src}
              alt={logo.alt}
              className={`h-8 w-auto shrink-0 object-contain transition duration-300 ease-out group-hover:scale-105 group-hover:brightness-110 ${logo.className ?? ""}`}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function SystemStackLogoSlider() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-5 sm:px-6 lg:px-8">
      <div className="relative h-[96px] rounded-2xl border border-[rgba(232,216,201,0.08)] bg-[var(--bg-base)]/95">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#0B0B0B] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#0B0B0B] to-transparent sm:w-24" />

        <div className={`${styles.marquee} h-full`}>
          <div className={styles.glowSweep} />
          <div className={`${styles.marqueeTrack} h-full items-center`}>
            <LogoRow logos={STACK_LOGOS} />
            <LogoRow logos={STACK_LOGOS} hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
