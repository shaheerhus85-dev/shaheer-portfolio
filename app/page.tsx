"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero, { type HeroStateKey } from "@/components/hero/Hero";
import SiteFooter from "@/components/footer/SiteFooter";
import LabGithubSection from "@/components/lab/LabGithubSection";
import LabPrototypingSection from "@/components/lab/LabPrototypingSection";
import { MethodsSection } from "@/components/methods-section";
import { ProblemsSection } from "@/components/problems-section";
import { useLenis } from "@/components/providers/LenisProvider";
import ScrollRevealProvider from "@/components/providers/ScrollRevealProvider";
import { StackToolsSection } from "@/components/stack";
import { WorkflowsSection } from "@/components/workflows";

const ABOUT_PROOF_ITEMS = [
  {
    number: "01",
    lines: ["AI-assisted", "build workflow"]
  },
  {
    number: "02",
    lines: ["Automation-first", "thinking"]
  },
  {
    number: "03",
    lines: ["Web products", "and interfaces"]
  },
  {
    number: "04",
    lines: ["Learning in public", "through GitHub"]
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
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: "https://wa.me/92339140860",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M5.15 18.85 6.1 15.4a7.2 7.2 0 1 1 2.65 2.54l-3.6.91Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          d="M9.3 8.55c.16-.36.34-.38.52-.38h.42c.13 0 .31.04.47.36.16.34.55 1.34.6 1.44.05.11.08.24 0 .39-.08.16-.13.24-.25.38-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.03 1.34 1.66.92.82 1.69 1.07 1.94 1.19.24.12.38.1.52-.06.16-.18.6-.7.76-.94.16-.24.32-.2.54-.12.23.08 1.43.67 1.68.79.24.12.41.18.47.28.06.1.06.59-.14 1.15-.2.56-1.16 1.07-1.62 1.11-.42.04-.96.06-1.55-.1-.36-.1-.82-.26-1.41-.52-2.48-1.08-4.1-3.57-4.22-3.74-.12-.16-1.01-1.34-1.01-2.56 0-1.22.64-1.82.87-2.06Z"
          fill="currentColor"
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

export default function HomePage() {
  const [activeStateKey, setActiveStateKey] = useState<HeroStateKey>("identity");
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!pendingHash) {
      return;
    }

    let innerFrame = 0;

    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(pendingHash);

        if (target) {
          if (lenis) {
            lenis.scrollTo(target, {
              duration: 1.15,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              offset: 0,
            });
          } else {
            target.scrollIntoView({ block: "start", behavior: "auto" });
          }
        }

        ScrollTrigger.refresh();
        setPendingHash(null);
      });
    });

    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [activeStateKey, lenis, pendingHash]);

  const handleSectionNavigate = (stateKey: HeroStateKey, href: string) => {
    setActiveStateKey(stateKey);
    setPendingHash(href);
  };

  const renderAboutSection = () => (
    <>
      <section id="about" className="flex h-screen min-h-[720px] items-center overflow-hidden border-t border-[var(--border-subtle)] bg-[#050505] scroll-mt-6 max-[900px]:h-auto max-[900px]:min-h-screen max-[900px]:overflow-visible max-[900px]:py-24 max-[600px]:py-20">
        <div className="mx-auto flex w-[calc(100%_-_96px)] max-w-[1200px] flex-col max-[600px]:w-[calc(100%_-_32px)]">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(340px,0.52fr)] items-center gap-[clamp(56px,7vw,96px)] max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div>
              <p data-reveal="text" className="mb-[clamp(24px,3.4vh,38px)] text-[10px] font-medium uppercase tracking-[0.24em] text-[rgba(236,232,227,0.56)]">ABOUT</p>
              <h2 data-reveal="heading" data-reveal-delay="1" className="max-w-[780px] text-[clamp(48px,5.25vw,74px)] font-extrabold leading-[1.05] tracking-[-0.044em] text-[#ece8e3] max-[900px]:max-w-[720px] max-[900px]:text-[clamp(42px,9vw,62px)] max-[900px]:leading-[1.04] max-[600px]:text-[clamp(38px,12vw,52px)] max-[600px]:leading-[1.06] max-[600px]:tracking-[-0.038em]">
                I&rsquo;m Shaheer Hussain<br />
                Jafri, building<br />
                AI-assisted systems<br />
                for practical workflows.
              </h2>
            </div>

            <div className="max-w-[460px] justify-self-end self-center max-[900px]:max-w-[560px] max-[900px]:justify-self-start">
              <p data-reveal="text" data-reveal-delay="2" className="text-[clamp(15px,1.05vw,17px)] font-normal leading-[1.65] text-[rgba(236,232,227,0.62)]">
                I use AI tools, full-stack development, and workflow thinking to turn repeated manual work into cleaner digital systems — from automation flows and internal tools to fast, modern web interfaces.
              </p>
            </div>
          </div>

          <div data-reveal-group className="mt-[clamp(36px,5vh,58px)] grid grid-cols-4 gap-7 max-[900px]:mt-12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-5">
            {ABOUT_PROOF_ITEMS.map((item) => (
              <div key={item.number} data-reveal-item className="border-t border-[rgba(255,255,255,0.12)] pt-3.5">
                <span className="mb-3.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-[rgba(236,232,227,0.42)]">
                  {item.number}
                </span>
                <span className="block text-[11px] font-medium uppercase leading-[1.55] tracking-[0.16em] text-[rgba(236,232,227,0.58)]">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderContactSection = () => (
    <>
      <section id="contact" className="min-h-screen border-t border-[var(--border-subtle)] scroll-mt-6">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
          <p data-reveal="text" className="text-[10px] font-medium uppercase tracking-[0.24em] text-[rgba(236,232,227,0.56)]">CONTACT</p>
          <div className="mt-[clamp(22px,3vh,34px)] grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.85fr)] lg:items-center lg:gap-[clamp(72px,10vw,150px)]">
            <h2 data-reveal="heading" data-reveal-delay="1" className="max-w-[720px] text-[clamp(46px,5.1vw,72px)] font-extrabold leading-[0.96] tracking-[-0.052em] text-[#ece8e3] max-[900px]:text-[clamp(42px,9vw,62px)] max-[900px]:leading-[0.98] max-[600px]:text-[clamp(38px,12vw,52px)] max-[600px]:leading-[1] max-[600px]:tracking-[-0.045em]">
              Let&apos;s build systems that move faster.
            </h2>
            <div data-reveal-group className="grid gap-0">
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
                    <div
                      key={item.label}
                      data-reveal-item
                      className="grid grid-cols-[44px_minmax(0,1fr)] gap-0 border-t border-[rgba(255,255,255,0.12)] py-[18px] last:border-b last:border-[rgba(255,255,255,0.12)]"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={item.label === "WhatsApp" ? "Open WhatsApp chat" : `${item.label}: ${item.value}`}
                    data-reveal-item
                    className="grid cursor-pointer grid-cols-[44px_minmax(0,1fr)] gap-0 border-t border-[rgba(255,255,255,0.12)] py-[18px] transition-[border-color,opacity] duration-300 hover:border-[rgba(255,255,255,0.22)] hover:opacity-80 focus-visible:border-[rgba(255,255,255,0.24)] focus-visible:outline-none last:border-b last:border-[rgba(255,255,255,0.12)]"
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

  const renderActiveStateSections = () => (
    <>
      {activeStateKey === "identity" && (
        <>
          {renderAboutSection()}
          {renderContactSection()}
        </>
      )}

      {activeStateKey === "aiEngineering" && (
        <>
          <StackToolsSection />
          <WorkflowsSection />
        </>
      )}

      {activeStateKey === "systems" && (
        <>
          <ProblemsSection />
          <MethodsSection />
        </>
      )}

      {activeStateKey === "lab" && (
        <>
          <LabPrototypingSection />
          <LabGithubSection />
        </>
      )}
    </>
  );

  return (
    <ScrollRevealProvider refreshKey={activeStateKey}>
      <main className="min-h-screen w-full overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] [scrollbar-gutter:stable]">
        <Hero
          activeStateKey={activeStateKey}
          onStateChange={setActiveStateKey}
          onSectionNavigate={handleSectionNavigate}
        />

        {renderActiveStateSections()}

        <SiteFooter activeState={activeStateKey} onNavigate={handleSectionNavigate} />
      </main>
    </ScrollRevealProvider>
  );
}
