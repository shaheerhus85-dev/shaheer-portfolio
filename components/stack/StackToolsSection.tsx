"use client";

import type { CSSProperties, ComponentType } from "react";
import {
  SiClaude,
  SiCss,
  SiFigma,
  SiFramer,
  SiGithub,
  SiGithubcopilot,
  SiGooglegemini,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiLinear,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiReact,
  SiResend,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiWebgl
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import styles from "./StackToolsSection.module.css";

interface StackIconProps {
  className?: string;
  style?: CSSProperties;
}

interface Tool {
  name: string;
  icon: ComponentType<StackIconProps>;
  color: string;
}

interface ToolRowProps {
  title: string;
  items: Tool[];
  duration: string;
  reverse?: boolean;
  isLast?: boolean;
}

function CursorMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 4.8 26.4 15.9l-8.1 2.2 5.2 7.9-4.1 2.7-5.1-7.7-5.4 6.3L6 4.8Z" fill="currentColor" />
      <path d="m11 11.7 2 10.2 2.8-3.3 1.1-1.3 1.7-.5 3.6-1-11.2-4.1Z" fill="#050505" opacity="0.82" />
    </svg>
  );
}

function GrokMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 6h5.1l5.4 7.2L21.9 6H27l-8 10.2L27.5 26h-5.2l-5.9-6.9-5.7 6.9H5.5l8.5-10L6 6Z" fill="currentColor" />
    </svg>
  );
}

function MidjourneyMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M15.6 4.4v18.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16.2 6.4c4.9 2 7.9 5.8 9.1 11.5-4.2-1-7.2-3.6-9.1-7.9V6.4Z" fill="currentColor" />
      <path d="M14.9 8.7c-4.7 2-7.4 5.4-8.2 10.3 3.7-.8 6.4-3 8.2-6.7V8.7Z" fill="currentColor" opacity="0.72" />
      <path d="M5.3 23.8h21.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function R3fMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 4 26.4 10v12L16 28 5.6 22V10L16 4Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 4v12l10.4-6M16 16 5.6 10M16 16v12" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DreiMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="9" cy="16" r="4.2" fill="currentColor" />
      <circle cx="16" cy="16" r="4.2" fill="currentColor" opacity="0.78" />
      <circle cx="23" cy="16" r="4.2" fill="currentColor" opacity="0.56" />
    </svg>
  );
}

function LenisMark({ className, style }: StackIconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M5 20c4.2-9.2 8.6 9.2 13 0s5.9-9.2 9 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path d="M5 12h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.42" />
    </svg>
  );
}

const aiTools: Tool[] = [
  { name: "Claude", icon: SiClaude, color: "#D97757" },
  { name: "GPT-5.5", icon: SiOpenai, color: "#10A37F" },
  { name: "OpenAI", icon: SiOpenai, color: "#10A37F" },
  { name: "Gemini", icon: SiGooglegemini, color: "#8E75FF" },
  { name: "Grok", icon: GrokMark, color: "#F4F4F4" },
  { name: "Cursor", icon: CursorMark, color: "#FFFFFF" },
  { name: "Codex", icon: SiOpenai, color: "#74AA9C" },
  { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#7C3AED" },
  { name: "Midjourney", icon: MidjourneyMark, color: "#FFFFFF" }
];

const webTools: Tool[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#663399" }
];

const motionTools: Tool[] = [
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
  { name: "React Three Fiber", icon: R3fMark, color: "#61DAFB" },
  { name: "Drei", icon: DreiMark, color: "#F4F4F4" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Framer Motion", icon: SiFramer, color: "#EC38BC" },
  { name: "Lenis", icon: LenisMark, color: "#F4F4F4" },
  { name: "WebGL", icon: SiWebgl, color: "#990000" }
];

const workflowTools: Tool[] = [
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Resend", icon: SiResend, color: "#ffffff" },
  { name: "Linear", icon: SiLinear, color: "#5E6AD2" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Figma", icon: SiFigma, color: "#A259FF" }
];

function ToolRow({ title, items, duration, reverse = false, isLast = false }: ToolRowProps) {
  const direction = reverse ? "right" : "left";
  const repeatedItems = [...items, ...items];

  return (
    <div className={`${styles.stackToolRow} ${isLast ? styles.isLast : ""}`}>
      <div className={styles.stackToolLabel}>{title}</div>

      <div className={styles.stackMarqueeViewport}>
        <div
          className={`${styles.stackMarqueeTrack} stackMarqueeTrackGlobal ${
            direction === "left" ? "stackMarqueeLeftGlobal" : "stackMarqueeRightGlobal"
          }`}
          style={{ "--stack-marquee-duration": duration } as CSSProperties}
        >
          {repeatedItems.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div key={`${tool.name}-${index}`} className={styles.stackToolItem}>
                <Icon className={styles.stackToolIcon} style={{ color: tool.color }} />
                <span className={styles.stackToolName}>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function StackToolsSection() {
  return (
    <section id="stack" className={styles.stackSection} aria-label="Stack and tools">
      <div className={styles.stackGlow} aria-hidden="true" />

      <div className={styles.stackShell}>
        <div className={styles.stackHeader}>
          <span data-reveal="text" className={styles.stackEyebrow}>STACK</span>
          <h2 data-reveal="heading" data-reveal-delay="1" className={styles.stackHeading}>Stack &amp; Tools</h2>
          <p data-reveal="text" data-reveal-delay="2" className={styles.stackSubheading}>
            A curated ecosystem of AI, design, development, and deployment tools I use to build practical digital systems.
          </p>
        </div>

        <div data-reveal="text" data-reveal-delay="3" className={styles.stackMarqueeArea}>
          <ToolRow title="AI TOOLS" items={aiTools} duration="60s" reverse={false} />
          <ToolRow title="WEB DEVELOPMENT" items={webTools} duration="70s" reverse={true} />
          <ToolRow title="MOTION / 3D / FRONTEND" items={motionTools} duration="65s" reverse={false} />
          <ToolRow title="WORKFLOW & DEPLOYMENT" items={workflowTools} duration="75s" reverse={true} isLast={true} />
        </div>
      </div>
    </section>
  );
}
