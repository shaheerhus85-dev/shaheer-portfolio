"use client";

import BackgroundMarquee from "./BackgroundMarquee";
import HeroSignature3D from "./HeroSignature3D";
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

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 min-h-[136px] border-b border-neutral-700/20 px-[clamp(24px,3.6vw,52px)] py-7">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:items-start md:justify-between">
          {HERO_STATES.map((state) => {
            const isActive = activeStateKey === state.key;

            return (
              <div
                key={state.key}
                className={`pointer-events-auto flex min-w-0 flex-col items-start gap-y-1 text-left transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 md:basis-1/4 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
                onFocusCapture={() => onStateChange(state.key)}
                onMouseEnter={() => onStateChange(state.key)}
                onPointerDown={() => onStateChange(state.key)}
              >
                <span
                  className={`font-['Inter_Tight',sans-serif] text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-[0.04em] transition-colors duration-300 ${
                    isActive ? "text-[rgba(255,255,255,0.95)]" : "text-[rgba(255,255,255,0.55)]"
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
                    className={`text-[0.6875rem] leading-[1.3] transition-colors duration-300 hover:text-[rgba(255,255,255,0.95)] focus-visible:text-[rgba(255,255,255,0.95)] ${
                      isActive ? "text-[rgba(255,255,255,0.95)]" : "text-[rgba(255,255,255,0.55)]"
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
        <div className="pointer-events-auto col-span-12 flex flex-wrap items-center justify-center gap-4 md:col-span-4 md:justify-start">
          <a
            href="mailto:shaheerhus85@gmail.com"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#f8f8f4] px-6 text-[11px] font-semibold uppercase tracking-[0.1em] !text-[#0a0a0a] opacity-100 shadow-[0_0_22px_rgba(255,255,255,0.14)] transition hover:scale-[1.03]"
          >
            <span className="!text-[#0a0a0a] opacity-100">
              Build My System
            </span>
          </a>
          <a
            href="https://github.com/shaheerhus85-dev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-100 transition hover:text-white"
          >
            View GitHub -&gt;
          </a>
        </div>

        <div className="col-span-12 flex flex-col items-center gap-4 md:col-span-4 md:col-start-9 md:flex-row md:items-end md:justify-end md:gap-10">
          <div className="text-center md:text-left">
            <p className="mb-[6px] text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              Availability
            </p>
            <p className="flex items-center justify-center gap-2 text-[12px] font-medium tracking-wide text-neutral-200 md:justify-start">
              Available for work
              <span className="inline-block size-1.5 rounded-full bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.65)]" />
            </p>
          </div>
          <div className="md:text-right">
            <p className="mb-[6px] text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              Location
            </p>
            <p className="text-[12px] font-medium tracking-wide text-neutral-200">Karachi, Pakistan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
