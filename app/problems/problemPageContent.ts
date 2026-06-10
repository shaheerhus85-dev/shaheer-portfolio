export type ProblemSlug =
  | "content-without-structure"
  | "attention-without-conversion"
  | "manual-workflows"
  | "missing-growth-infrastructure";

export type ProblemPageData = {
  slug: ProblemSlug;
  kicker: string;
  title: string;
  subtitle: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  symptoms: string[];
  solution: string[];
  outcome: string;
};

export const PROBLEM_PAGES: Record<ProblemSlug, ProblemPageData> = {
  "content-without-structure": {
    slug: "content-without-structure",
    kicker: "Strategy gap",
    title: "Content Without Structure",
    subtitle:
      "Ideas are posted daily, but the market never builds one clear belief about what you do and why you matter.",
    primaryMetric: "01",
    primaryMetricLabel: "Core Issue",
    symptoms: [
      "Positioning shifts every week, so audience trust never compounds.",
      "Topics perform in isolation but fail to build a coherent narrative.",
      "CTA intent changes post-to-post, so leads stay unqualified."
    ],
    solution: [
      "Define one market belief and one authority narrative.",
      "Design pillar-based content architecture with sequencing.",
      "Attach each content stream to one conversion objective."
    ],
    outcome:
      "Your content starts compounding: stronger recognition, clearer authority, and higher intent inbound conversations."
  },
  "attention-without-conversion": {
    slug: "attention-without-conversion",
    kicker: "Conversion gap",
    title: "Attention Without Conversion",
    subtitle:
      "Reach looks healthy, but the business layer is weak. Views and engagement are not turning into qualified calls.",
    primaryMetric: "02",
    primaryMetricLabel: "Core Issue",
    symptoms: [
      "High engagement with low call bookings.",
      "Offer fit and CTA language are mismatched.",
      "No clear bridge between content and sales process."
    ],
    solution: [
      "Rebuild offer narrative and conversion intent mapping.",
      "Create CTA ladders by awareness and readiness level.",
      "Install a qualification flow before calendar booking."
    ],
    outcome:
      "Attention starts translating into pipeline with clearer buyer intent, better lead quality, and more predictable booking flow."
  },
  "manual-workflows": {
    slug: "manual-workflows",
    kicker: "Ops gap",
    title: "Manual Workflows",
    subtitle:
      "Delivery and follow-up depend on your daily energy. Execution is strong, but capacity is capped by manual effort.",
    primaryMetric: "03",
    primaryMetricLabel: "Core Issue",
    symptoms: [
      "Repeated tasks consume creative and strategic time.",
      "Client updates, reporting, and follow-ups are inconsistent.",
      "Workload spikes reduce output quality and response speed."
    ],
    solution: [
      "Map recurring tasks into automation-ready workflows.",
      "Implement event-based triggers and async status systems.",
      "Add operational safeguards and fallback logic."
    ],
    outcome:
      "Execution becomes stable and scalable. You regain focus for strategy while systems handle repetitive operations."
  },
  "missing-growth-infrastructure": {
    slug: "missing-growth-infrastructure",
    kicker: "Systems gap",
    title: "Missing Growth Infrastructure",
    subtitle:
      "Tools exist, but they operate in silos. Data and context break at every handoff, slowing growth and decision-making.",
    primaryMetric: "04",
    primaryMetricLabel: "Core Issue",
    symptoms: [
      "CRM, content, and outreach workflows are disconnected.",
      "Manual syncing causes delayed follow-up and lost context.",
      "No unified performance visibility across systems."
    ],
    solution: [
      "Connect core systems with shared data events.",
      "Create end-to-end automation across acquisition to delivery.",
      "Standardize reporting views for weekly decision loops."
    ],
    outcome:
      "Your stack behaves like one system: faster response cycles, less leakage, and a growth engine that can actually compound."
  }
};
