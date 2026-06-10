export type MethodSlug = "audit" | "architect" | "build" | "hand-over";

export type MethodPageData = {
  slug: MethodSlug;
  kicker: string;
  title: string;
  subtitle: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  signals: string[];
  process: string[];
  outcome: string;
};

export const METHOD_PAGES: Record<MethodSlug, MethodPageData> = {
  audit: {
    slug: "audit",
    kicker: "Step 01",
    title: "Audit",
    subtitle:
      "We map your full workflow and identify where time, quality, and conversion leak before touching any tooling.",
    primaryMetric: "01",
    primaryMetricLabel: "Method Step",
    signals: [
      "Manual touchpoints are repeated across content, ops, and follow-up.",
      "Handoffs between tools create delays and context loss.",
      "You spend strategic hours solving avoidable operational work."
    ],
    process: [
      "Map all workflows from lead capture to delivery.",
      "Score each step by time cost, risk, and business impact.",
      "Prioritize automations that remove the biggest bottlenecks first."
    ],
    outcome: "You get a clear systems diagnosis with a focused roadmap for what to automate, simplify, and standardize."
  },
  architect: {
    slug: "architect",
    kicker: "Step 02",
    title: "Architect",
    subtitle:
      "Before implementation, we design the full operating logic: triggers, branches, safeguards, and edge-case handling.",
    primaryMetric: "02",
    primaryMetricLabel: "Method Step",
    signals: [
      "Current workflows break when exceptions occur.",
      "No shared logic exists across team members or tools.",
      "Execution quality depends too much on individual memory."
    ],
    process: [
      "Define system objectives, decision rules, and failure paths.",
      "Draft state diagrams for every major workflow branch.",
      "Convert business rules into implementation-ready logic specs."
    ],
    outcome: "You get a stable blueprint that makes implementation faster, cleaner, and resilient under real-world usage."
  },
  build: {
    slug: "build",
    kicker: "Step 03",
    title: "Build",
    subtitle:
      "We implement the architecture in Make, n8n, or custom code with clean modules and practical automation depth.",
    primaryMetric: "03",
    primaryMetricLabel: "Method Step",
    signals: [
      "Tool stack is underused or stitched together ad hoc.",
      "Automation attempts exist but are fragile and hard to maintain.",
      "Execution consistency drops when volume grows."
    ],
    process: [
      "Build core workflows with reusable modules and naming standards.",
      "Implement observability points for debugging and handoff safety.",
      "Deploy with fallback handling for edge cases and failures."
    ],
    outcome: "You get production-ready systems that remove repetitive execution load and keep output quality consistent."
  },
  "hand-over": {
    slug: "hand-over",
    kicker: "Step 04",
    title: "Hand Over",
    subtitle:
      "We finalize with documentation, async training, and operational ownership clarity so the system runs without dependency on you.",
    primaryMetric: "04",
    primaryMetricLabel: "Method Step",
    signals: [
      "Automations fail when only one person understands the setup.",
      "Team adoption is low due to missing process clarity.",
      "System updates become risky without documented ownership."
    ],
    process: [
      "Prepare runbooks, SOPs, and escalation paths for each workflow.",
      "Record async walkthroughs for daily operation and maintenance.",
      "Define ownership boundaries and update procedures."
    ],
    outcome: "You get a maintainable operating system that your team can run confidently without constant founder supervision."
  }
};
