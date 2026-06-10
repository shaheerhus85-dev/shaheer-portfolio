"use client";

import dynamic from "next/dynamic";
import BackgroundMarquee from "./BackgroundMarquee";
import styles from "./Hero.module.css";

export type HeroStateKey = "identity" | "aiEngineering" | "systems" | "lab";

type HeroState = {
  key: HeroStateKey;
  label: string;
  subLinks: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  backgroundText: string;
  modelPath: string;
};

type HeroProps = {
  activeStateKey: HeroStateKey;
  onStateChange: (stateKey: HeroStateKey) => void;
  onSectionNavigate: (stateKey: HeroStateKey, href: string) => void;
};

const MODEL_PATH = "/models/im-signature.glb";

const HeroSignature3D = dynamic(() => import("./HeroSignature3D"), {
  ssr: false,
  loading: () => null,
});

const HERO_STATES: HeroState[] = [
  {
    key: "identity",
    label: "SHAHEER HUSSAIN JAFRI",
    subLinks: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    backgroundText: "SHAHEER HUSSAIN JAFRI",
    modelPath: MODEL_PATH,
  },
  {
    key: "aiEngineering",
    label: "AI ENGINEERING",
    subLinks: [
      { label: "Stack", href: "#stack" },
      { label: "Workflows", href: "#workflows" },
    ],
    backgroundText: "AI ENGINEERING SYSTEMS",
    modelPath: MODEL_PATH,
  },
  {
    key: "systems",
    label: "SYSTEMS",
    subLinks: [
      { label: "Problems", href: "#problems" },
      { label: "Methods", href: "#methods" },
    ],
    backgroundText: "BUSINESS SYSTEMS",
    modelPath: MODEL_PATH,
  },
  {
    key: "lab",
    label: "LAB",
    subLinks: [
      { label: "Prototypes", href: "#prototypes" },
      { label: "GitHub", href: "#github" },
    ],
    backgroundText: "BUILD LAB",
    modelPath: MODEL_PATH,
  },
];

export default function Hero({ activeStateKey, onStateChange, onSectionNavigate }: HeroProps) {
  const activeState = HERO_STATES.find((state) => state.key === activeStateKey) ?? HERO_STATES[0];

  return (
    <section className={styles.heroSection} aria-label="Premium Hero">
      <BackgroundMarquee text={activeState.backgroundText} />
      <HeroSignature3D modelPath={activeState.modelPath} />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 min-h-[136px] border-b border-[var(--line)] px-[clamp(24px,3.6vw,52px)] py-7">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:items-start md:justify-between">
          {HERO_STATES.map((state) => {
            const isActive = activeStateKey === state.key;

            return (
              <div
                key={state.key}
                className={`pointer-events-auto flex min-w-0 flex-col items-start gap-y-1 text-left transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 md:basis-1/4 ${
                  isActive ? "opacity-100" : "opacity-100"
                }`}
                onFocusCapture={() => onStateChange(state.key)}
                onMouseEnter={() => onStateChange(state.key)}
                onPointerDown={() => onStateChange(state.key)}
              >
                <span
                  className={`font-['Inter_Tight',sans-serif] text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-[0.04em] transition-colors duration-300 ${
                    isActive ? "text-[var(--text)]" : "text-[var(--text-soft)]"
                  }`}
                >
                  {state.label}
                </span>
                {state.subLinks.map((link) => (
                  <a
                    key={`${state.key}-${link.label}`}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    onClick={(event) => {
                      if (link.external) {
                        return;
                      }

                      event.preventDefault();
                      onSectionNavigate(state.key, link.href);
                    }}
                    className={`text-[0.6875rem] leading-[1.3] transition-colors duration-300 hover:text-[var(--text)] focus-visible:text-[var(--text)] ${
                      isActive ? "text-[var(--text-soft)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </header>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 grid grid-cols-12 items-end gap-x-[clamp(24px,3vw,52px)] gap-y-6 px-[clamp(24px,3.6vw,52px)] max-md:bottom-6">
        <div className={`pointer-events-auto col-span-12 md:col-span-4 ${styles.ctaGroup}`}>
          <a
            href="mailto:shaheerhus85@gmail.com"
            className={styles.primaryCta}
          >
            <span className="!text-[#050505]">
              Build My System
            </span>
          </a>
          <a
            href="https://github.com/shaheerhus85-dev"
            target="_blank"
            rel="noreferrer"
            className={`group ${styles.secondaryCta}`}
          >
            View GitHub
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]">-&gt;</span>
          </a>
        </div>

        <div className={`col-span-12 md:col-span-4 md:col-start-9 ${styles.bottomInfo}`}>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>
              Availability
            </p>
            <p className={styles.availabilityValue}>
              Available for work
              <span className={styles.availabilityDot} />
            </p>
          </div>
          <div className={`${styles.infoBlock} ${styles.locationBlock}`}>
            <p className={styles.infoLabel}>
              Location
            </p>
            <p className={styles.infoValue}>Karachi, Pakistan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
