"use client";

import { type MouseEvent, useState } from "react";
import dynamic from "next/dynamic";
import type { HeroStateKey } from "@/components/hero/Hero";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import styles from "./SiteFooter.module.css";

const STATE_PARTICLE_CONFIG: Record<HeroStateKey, { defaultWord: string; autoWords: string[] }> = {
  identity: {
    defaultWord: "CONTACT",
    autoWords: ["CONTACT", "EMAIL", "WHATSAPP", "GITHUB", "ABOUT"],
  },
  aiEngineering: {
    defaultWord: "AI SYSTEMS",
    autoWords: ["AI SYSTEMS", "STACK", "WORKFLOWS", "AUTOMATION"],
  },
  systems: {
    defaultWord: "SYSTEMS",
    autoWords: ["SYSTEMS", "PROBLEMS", "METHODS", "PROCESS"],
  },
  lab: {
    defaultWord: "PROTOTYPES",
    autoWords: ["PROTOTYPES", "GITHUB", "LAB", "EXPERIMENTS"],
  },
};

const ParticleWordFooter = dynamic(() => import("./ParticleWordFooter"), {
  ssr: false,
  loading: () => null,
});

const CONTACT_ROWS = [
  {
    label: "Email",
    value: "shaheerhus85@gmail.com",
    href: "mailto:shaheerhus85@gmail.com",
    particleText: "EMAIL",
    Icon: MdOutlineEmail,
  },
  {
    label: "WhatsApp",
    value: "WhatsApp",
    href: "https://wa.me/92339140860",
    external: true,
    ariaLabel: "Open WhatsApp chat",
    particleText: "WHATSAPP",
    Icon: SiWhatsapp,
    iconTone: "whatsapp",
  },
  {
    label: "GitHub",
    value: "github.com/shaheerhus85-dev",
    href: "https://github.com/shaheerhus85-dev",
    external: true,
    particleText: "GITHUB",
    Icon: SiGithub,
  },
  {
    label: "Location",
    value: "Karachi, Pakistan",
    particleText: "LOCATION",
    Icon: HiOutlineMapPin,
  },
];

const NAV_ROWS: {
  label: string;
  href: string;
  state: HeroStateKey;
  particleText: string;
}[] = [
  { label: "About", href: "#about", state: "identity", particleText: "ABOUT" },
  { label: "AI Engineering", href: "#stack", state: "aiEngineering", particleText: "AI SYSTEMS" },
  { label: "Systems", href: "#problems", state: "systems", particleText: "SYSTEMS" },
  { label: "Lab", href: "#prototypes", state: "lab", particleText: "LAB" },
  { label: "Contact", href: "#contact", state: "identity", particleText: "CONTACT" },
];

type SiteFooterProps = {
  activeState?: HeroStateKey;
  onNavigate?: (stateKey: HeroStateKey, href: string) => void;
};

export default function SiteFooter({ activeState = "identity", onNavigate }: SiteFooterProps) {
  const [hoverWord, setHoverWord] = useState<string | null>(null);
  const stateConfig = STATE_PARTICLE_CONFIG[activeState] ?? STATE_PARTICLE_CONFIG.identity;

  const handleFooterNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    stateKey: HeroStateKey,
    href: string,
  ) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(stateKey, href);
    }
  };

  const clearHoverWord = () => setHoverWord(null);

  return (
    <footer id="site-footer" className={styles.footer}>
      <div data-reveal="text" className={styles.footerTop}>
        <div className={styles.footerIdentity}>
          <strong>SHAHEER HUSSAIN JAFRI</strong>
          <span>AI Systems Builder</span>
        </div>

        <div className={styles.footerStatus}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Available for work</span>
          <a
            href="#contact"
            onClick={(event) => handleFooterNavigate(event, "identity", "#contact")}
          >
            Contact
          </a>
        </div>
      </div>

      <div data-reveal="text" data-reveal-delay="1" className={styles.particleStage}>
        <ParticleWordFooter
          key={activeState}
          activeWord={hoverWord}
          autoWords={stateConfig.autoWords}
          defaultWord={stateConfig.defaultWord}
        />
      </div>

      <div className={styles.footerGrid}>
        <section data-reveal="text" data-reveal-delay="2" className={styles.footerColumn}>
          <h2 className={styles.columnTitle}>Contact</h2>
          <ul data-reveal-group className={styles.rowList}>
            {CONTACT_ROWS.map((row) => {
              const Icon = row.Icon;
              const content = (
                <>
                  <span
                    className={`${styles.rowIcon} ${
                      row.iconTone === "whatsapp" ? styles.whatsappIcon : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                  <span className={styles.rowLabel}>{row.label}</span>
                  <span className={styles.rowValue}>{row.value}</span>
                  {row.href ? (
                    <span className={styles.rowArrow} aria-hidden="true">
                      <FiArrowUpRight />
                    </span>
                  ) : (
                    <span className={styles.rowArrowPlaceholder} aria-hidden="true" />
                  )}
                </>
              );

              return (
                <li
                  key={row.label}
                  data-reveal-item
                  onPointerEnter={() => setHoverWord(row.particleText)}
                  onPointerLeave={clearHoverWord}
                >
                  {row.href ? (
                    <a
                      className={`${styles.footerRow} ${styles.contactRow}`}
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noopener noreferrer" : undefined}
                      aria-label={
                        row.ariaLabel ?? (row.external ? `${row.label}: ${row.value}` : undefined)
                      }
                      onFocus={() => setHoverWord(row.particleText)}
                      onBlur={clearHoverWord}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className={`${styles.footerRow} ${styles.contactRow}`}
                      tabIndex={0}
                      onFocus={() => setHoverWord(row.particleText)}
                      onBlur={clearHoverWord}
                    >
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section data-reveal="text" data-reveal-delay="3" className={styles.footerColumn}>
          <h2 className={styles.columnTitle}>Navigation</h2>
          <ul data-reveal-group className={styles.rowList}>
            {NAV_ROWS.map((row, index) => (
              <li
                key={row.label}
                data-reveal-item
                onPointerEnter={() => setHoverWord(row.particleText)}
                onPointerLeave={clearHoverWord}
              >
                <a
                  className={`${styles.footerRow} ${styles.navRow} ${
                    activeState === row.state && row.label !== "Contact" ? styles.navRowActive : ""
                  }`}
                  href={row.href}
                  onFocus={() => setHoverWord(row.particleText)}
                  onBlur={clearHoverWord}
                  onClick={(event) => handleFooterNavigate(event, row.state, row.href)}
                >
                  <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.rowValue}>{row.label}</span>
                  <span className={styles.rowArrow} aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}
