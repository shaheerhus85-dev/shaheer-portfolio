"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiFigma,
  SiFramer,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiLinear,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Hero, { type HeroStateKey } from "@/components/hero/Hero";
import styles from "./page.module.css";

type SimpleStateSection = {
  id: string;
  label: string;
  heading: string;
  copy: string;
  rows: string[];
  href?: string;
};

type ReactIconTool = {
  type: "react";
  Icon: IconType;
  colorClassName: string;
};

type ImageIconTool = {
  type: "image";
  src: string;
};

type StackToolIcon = ReactIconTool | ImageIconTool;

type StackTool = {
  name: string;
  href: string;
  icon: StackToolIcon;
};

type StackToolRow = {
  title: string;
  direction: "left" | "right";
  items: StackTool[];
};

const ABOUT_PROOF_ITEMS = [
  {
    number: "01",
    text: "AI-assisted build workflow"
  },
  {
    number: "02",
    text: "Automation-first thinking"
  },
  {
    number: "03",
    text: "Web products and interfaces"
  },
  {
    number: "04",
    text: "Learning in public through GitHub"
  }
];

const STACK_ROWS: StackToolRow[] = [
  {
    title: "AI TOOLS",
    direction: "left",
    items: [
      { name: "Claude", href: "https://claude.ai", icon: { type: "react", Icon: SiClaude, colorClassName: "text-[#D97757]" } },
      { name: "GPT-5.5", href: "https://openai.com", icon: { type: "image", src: "/icons/gpt-55.svg" } },
      { name: "Cursor", href: "https://cursor.com", icon: { type: "image", src: "/icons/cursor.svg" } },
      { name: "Codex", href: "https://openai.com/codex", icon: { type: "image", src: "/icons/codex.svg" } },
      { name: "Midjourney", href: "https://www.midjourney.com", icon: { type: "image", src: "/icons/midjourney.svg" } }
    ]
  },
  {
    title: "WEB DEVELOPMENT",
    direction: "right",
    items: [
      { name: "Next.js", href: "https://nextjs.org", icon: { type: "react", Icon: SiNextdotjs, colorClassName: "text-white" } },
      { name: "React", href: "https://react.dev", icon: { type: "react", Icon: SiReact, colorClassName: "text-[#61DAFB]" } },
      { name: "Three.js", href: "https://threejs.org", icon: { type: "react", Icon: SiThreedotjs, colorClassName: "text-white" } },
      { name: "Framer Motion", href: "https://motion.dev", icon: { type: "react", Icon: SiFramer, colorClassName: "text-[#FF4DE1]" } },
      { name: "Tailwind CSS", href: "https://tailwindcss.com", icon: { type: "react", Icon: SiTailwindcss, colorClassName: "text-[#38BDF8]" } },
      { name: "HTML/CSS", href: "https://developer.mozilla.org/en-US/docs/Web", icon: { type: "react", Icon: SiHtml5, colorClassName: "text-[#E34F26]" } }
    ]
  },
  {
    title: "WORKFLOW & DEPLOYMENT",
    direction: "left",
    items: [
      { name: "Linear", href: "https://linear.app", icon: { type: "react", Icon: SiLinear, colorClassName: "text-[#5E6AD2]" } },
      { name: "GitHub", href: "https://github.com", icon: { type: "react", Icon: SiGithub, colorClassName: "text-white" } },
      { name: "Vercel", href: "https://vercel.com", icon: { type: "react", Icon: SiVercel, colorClassName: "text-white" } },
      { name: "VS Code", href: "https://code.visualstudio.com", icon: { type: "react", Icon: VscVscode, colorClassName: "text-[#007ACC]" } },
      { name: "Figma", href: "https://figma.com", icon: { type: "react", Icon: SiFigma, colorClassName: "text-[#A259FF]" } }
    ]
  },
  {
    title: "CURRENTLY LEARNING",
    direction: "right",
    items: [
      { name: "React Three Fiber", href: "https://r3f.docs.pmnd.rs", icon: { type: "image", src: "/icons/r3f.svg" } },
      { name: "GSAP", href: "https://gsap.com", icon: { type: "react", Icon: SiGreensock, colorClassName: "text-[#88CE02]" } },
      { name: "TypeScript", href: "https://www.typescriptlang.org", icon: { type: "react", Icon: SiTypescript, colorClassName: "text-[#3178C6]" } }
    ]
  }
];

const WORKFLOW_STEPS = [
  "Understand the manual process",
  "Map the repetitive steps",
  "Connect tools, APIs, and logic",
  "Build, test, and improve"
];

const SYSTEM_SECTIONS: SimpleStateSection[] = [
  {
    id: "problems",
    label: "PROBLEMS",
    heading: "Business systems break when work stays scattered.",
    copy: "I look for repeated friction, unclear ownership, and manual handoffs before designing a cleaner operating flow.",
    rows: ["Manual work without structure", "Tools that do not communicate", "Ideas that never become systems"]
  },
  {
    id: "methods",
    label: "METHODS",
    heading: "A practical method for turning pressure into process.",
    copy: "The method is simple: clarify the work, shape the system, build the interface, then improve what the data reveals.",
    rows: ["Audit the workflow", "Architect the system", "Build and hand over"]
  }
];

const LAB_SECTIONS: SimpleStateSection[] = [
  {
    id: "prototypes",
    label: "PROTOTYPES",
    heading: "Small builds that test useful ideas quickly.",
    copy: "The lab is where I explore interface ideas, automation patterns, and AI-assisted product concepts before they become polished systems.",
    rows: ["Interface experiments", "Automation prototypes", "AI-assisted product tests"]
  },
  {
    id: "github",
    label: "GITHUB",
    heading: "Learning in public through shipped experiments.",
    copy: "I use GitHub as a public trail of practice, iteration, and technical range.",
    rows: ["github.com/shaheerhus85-dev", "Portfolio iterations", "Workflow experiments"],
    href: "https://github.com/shaheerhus85-dev"
  }
];

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "shaheerhus85@gmail.com",
    href: "mailto:shaheerhus85@gmail.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M4 7.5h16v9H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4 8 8 5.4L20 8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  },
  {
    label: "GitHub",
    value: "github.com/shaheerhus85-dev",
    href: "https://github.com/shaheerhus85-dev",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M12 3.5a8.5 8.5 0 0 0-2.7 16.56c.43.08.58-.19.58-.41v-1.45c-2.36.51-2.86-1.01-2.86-1.01-.39-.98-.94-1.24-.94-1.24-.77-.53.06-.52.06-.52.85.06 1.3.88 1.3.88.76 1.29 1.98.92 2.46.7.08-.55.3-.92.54-1.13-1.88-.21-3.86-.94-3.86-4.2 0-.93.33-1.69.88-2.29-.09-.21-.38-1.08.08-2.25 0 0 .72-.23 2.34.87A8.13 8.13 0 0 1 12 7.72c.72 0 1.44.1 2.12.29 1.62-1.1 2.34-.87 2.34-.87.46 1.17.17 2.04.08 2.25.55.6.88 1.36.88 2.29 0 3.27-1.98 3.98-3.87 4.19.31.27.58.79.58 1.6v2.18c0 .22.15.49.59.41A8.5 8.5 0 0 0 12 3.5Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: "Phone",
    value: "0349-3632575",
    href: "tel:+923493632575",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M7.2 4.5 9.4 9l-1.55 1.2c.92 1.95 2.26 3.29 4.18 4.15l1.21-1.55 4.36 2.28-.45 3.07c-.1.64-.65 1.1-1.3 1.06C9.5 18.83 5.23 14.57 4.8 8.2c-.04-.65.43-1.22 1.07-1.31L7.2 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Location",
    value: "Karachi, Pakistan",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M12 21s6-5.55 6-11a6 6 0 0 0-12 0c0 5.45 6 11 6 11Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
];

function ToolLogoItem({ tool }: { tool: StackTool }) {
  let icon;

  if (tool.icon.type === "react") {
    const Icon = tool.icon.Icon;
    icon = <Icon aria-hidden="true" className={`${styles.toolLogoSvg} ${tool.icon.colorClassName}`} />;
  } else {
    icon = <img aria-hidden="true" alt="" className={styles.toolLogoImage} src={tool.icon.src} />;
  }

  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${tool.name}`}
      className={styles.toolWordmark}
    >
      <span className={styles.toolLogoMark}>{icon}</span>
      <span className={styles.toolName}>{tool.name}</span>
    </a>
  );
}

function ToolRow({ row }: { row: StackToolRow }) {
  const duplicatedItems = [...row.items, ...row.items];

  return (
    <div className={styles.stackRowWrap}>
      <p className={styles.stackRowLabel}>{row.title}</p>
      <div className={styles.marqueeRow} aria-label={row.title}>
        <ul className={`${styles.marqueeTrack} ${row.direction === "right" ? styles.marqueeTrackReverse : ""}`}>
          {duplicatedItems.map((tool, index) => (
            <li key={`${row.title}-${tool.name}-${index}`} className={styles.marqueeItem}>
              <ToolLogoItem tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeStateKey, setActiveStateKey] = useState<HeroStateKey>("identity");
  const [pendingHash, setPendingHash] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingHash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(pendingHash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingHash(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeStateKey, pendingHash]);

  const handleSectionNavigate = (stateKey: HeroStateKey, href: string) => {
    setActiveStateKey(stateKey);
    setPendingHash(href);
  };

  const renderIdentitySections = () => (
    <>
      <section id="about" className="min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="grid flex-1 gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(320px,0.38fr)] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">ABOUT</p>
              <h2 className="mt-8 max-w-[680px] text-[clamp(34px,4vw,64px)] font-black leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)]">
                I&rsquo;m Shaheer Hussain Jafri —<br className="hidden sm:block" />
                an AI-assisted developer building practical automation systems.
              </h2>
            </div>

            <div className="max-w-[420px] lg:justify-self-end lg:self-center">
              <p className="text-[clamp(16px,1.15vw,18px)] font-medium leading-[1.65] text-[var(--text-secondary)] opacity-[0.72]">
                I use AI tools, full-stack development, and workflow thinking to build websites, automations, and digital systems that reduce manual work and improve execution.
              </p>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_PROOF_ITEMS.map((item) => (
              <div key={item.number} className="border-t border-[var(--border-subtle)] pt-4">
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-60">
                  {item.number}
                </span>
                <span className="mt-3 block max-w-[18ch] text-[11px] font-medium uppercase leading-[1.45] tracking-[0.12em] text-[var(--text-secondary)] opacity-75 sm:text-[12px]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">CONTACT</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)] lg:items-center lg:gap-20">
            <h2 className="max-w-[720px] text-[clamp(42px,5.2vw,84px)] font-black leading-[1] tracking-[-0.04em] text-[var(--text-primary)]">
              Let&apos;s build systems that move faster.
            </h2>
            <div className="grid gap-5">
              {CONTACT_ITEMS.map((item) => {
                const content = (
                  <>
                    <span className="mt-1 text-[rgba(255,255,255,0.95)] opacity-70">{item.icon}</span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-70">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[15px] font-medium leading-[1.5] text-[var(--text-primary)] sm:text-[16px]">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                if (!item.href) {
                  return (
                    <div key={item.label} className="grid grid-cols-[18px_minmax(0,1fr)] gap-4 border-t border-[var(--border-subtle)] pt-5">
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="grid grid-cols-[18px_minmax(0,1fr)] gap-4 border-t border-[var(--border-subtle)] pt-5 transition-opacity duration-300 hover:opacity-70"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderAiEngineeringSections = () => (
    <>
      <section id="stack" className={`${styles.stackSection} min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6`}>
        <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-5 py-[72px] sm:px-8 lg:px-12">
          <div className={styles.stackHeader}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">STACK</p>
            <h2 className="mt-6 max-w-[760px] text-[clamp(44px,5vw,72px)] font-black leading-[1] tracking-[-0.04em] text-[var(--text-primary)]">
              Stack &amp; Tools
            </h2>
            <p className="mt-6 max-w-[620px] text-[clamp(16px,1.15vw,18px)] font-medium leading-[1.55] text-[var(--text-secondary)] opacity-[0.7]">
              A curated ecosystem of AI, design, development, and deployment tools I use to build practical digital systems.
            </p>
          </div>

          <div className={styles.stackToolsShell}>
            <div className={styles.stackGlow} aria-hidden="true" />
            <div className={styles.stackToolsGrid}>
              {STACK_ROWS.map((row) => (
                <ToolRow key={row.title} row={row} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workflows" className="min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">WORKFLOWS</p>
              <h2 className="mt-8 max-w-[680px] text-[clamp(34px,4vw,64px)] font-black leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)]">
                From manual work to structured automation.
              </h2>
              <p className="mt-8 max-w-[460px] text-[clamp(16px,1.15vw,18px)] font-medium leading-[1.65] text-[var(--text-secondary)] opacity-[0.72]">
                I use AI-assisted planning, code, and automation tools to turn scattered business tasks into repeatable digital workflows.
              </p>
            </div>

            <div className="grid">
              {WORKFLOW_STEPS.map((step, index) => (
                <div key={step} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 border-t border-[var(--border-subtle)] py-5 last:border-b last:border-[var(--border-subtle)]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium leading-[1.45] text-[var(--text-primary)] opacity-85 sm:text-[16px]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSimpleStateSections = (sections: SimpleStateSection[]) => (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6">
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(320px,0.42fr)] lg:items-center lg:gap-20">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">{section.label}</p>
                <h2 className="mt-8 max-w-[680px] text-[clamp(34px,4vw,64px)] font-black leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)]">
                  {section.heading}
                </h2>
                <p className="mt-8 max-w-[460px] text-[clamp(16px,1.15vw,18px)] font-medium leading-[1.65] text-[var(--text-secondary)] opacity-[0.72]">
                  {section.copy}
                </p>
              </div>

              <div className="grid">
                {section.rows.map((row, index) => {
                  const rowContent = (
                    <>
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-medium leading-[1.45] text-[var(--text-primary)] opacity-85 sm:text-[16px]">
                        {row}
                      </span>
                    </>
                  );

                  if (section.href && index === 0) {
                    return (
                      <a
                        key={row}
                        href={section.href}
                        target="_blank"
                        rel="noreferrer"
                        className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 border-t border-[var(--border-subtle)] py-5 transition-opacity duration-300 hover:opacity-70 last:border-b last:border-[var(--border-subtle)]"
                      >
                        {rowContent}
                      </a>
                    );
                  }

                  return (
                    <div key={row} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 border-t border-[var(--border-subtle)] py-5 last:border-b last:border-[var(--border-subtle)]">
                      {rowContent}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );

  const renderActiveSections = () => {
    if (activeStateKey === "aiEngineering") {
      return renderAiEngineeringSections();
    }

    if (activeStateKey === "systems") {
      return renderSimpleStateSections(SYSTEM_SECTIONS);
    }

    if (activeStateKey === "lab") {
      return renderSimpleStateSections(LAB_SECTIONS);
    }

    return renderIdentitySections();
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] [scrollbar-gutter:stable]">
      <Hero
        activeStateKey={activeStateKey}
        onStateChange={setActiveStateKey}
        onSectionNavigate={handleSectionNavigate}
      />

      {renderActiveSections()}

      <footer className="border-t border-[var(--border-subtle)] py-7 text-[11px] text-[var(--text-secondary)] sm:text-[12px]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Shaheer Hussain Jafri</span>
          <span>Designed &amp; built with AI</span>
          <span>Karachi, Pakistan</span>
        </div>
      </footer>
    </main>
  );
}
