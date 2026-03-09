export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudySection = {
  heading: string;
  body: string;
  image?: CaseStudyImage;
  images?: CaseStudyImage[];
  isFullBleed?: boolean;
};

export type CaseStudy = {
  id: number;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  tags: string[];
  heroSrc: string;
  heroAlt: string;
  overview: string;
  sections: CaseStudySection[];
  outcomes: { label: string; value: string }[];
};

export const CASE_STUDIES: Record<number, CaseStudy> = {
  1: {
    id: 1,
    title: "AI Search Redesign",
    subtitle: "Redesigning the core search experience to surface faster, smarter answers",
    role: "Lead Product Designer",
    year: "2024",
    tags: ["AI", "Search", "UX Research", "SaaS"],
    heroSrc: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1400&q=80",
    heroAlt: "AI Search Redesign hero",
    overview:
      "Users were struggling to quickly find answers in a complex SaaS tool with thousands of data points. Search results were unranked, unexplained, and required multiple clicks to evaluate. This project set out to rethink the experience from the ground up.",
    sections: [
      {
        heading: "The Problem",
        body: "Power users were spending an average of 4+ minutes per search session to find actionable information. Exit surveys cited 'hard to find what I need' as a top-3 frustration. The underlying search index was solid — the problem was entirely in how results were surfaced and communicated.",
      },
      {
        heading: "Research & Discovery",
        body: "Over six weeks, we ran contextual inquiry sessions with 12 users across 3 customer segments. We mapped over 40 distinct search jobs-to-be-done, then clustered them into 5 primary intent types: lookup, comparison, exploration, monitoring, and troubleshooting.",
        image: {
          src: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=1200&q=80",
          alt: "Research wall with sticky notes",
          caption: "Affinity mapping session — 40+ user intents clustered into 5 primary categories",
        },
      },
      {
        heading: "Design Iterations",
        body: "We prototyped three approaches: a summarized results card, an intent-scoped filter system, and a conversational refinement flow. Usability testing showed users strongly preferred the summary card paired with intent filters — they wanted to feel understood, not interrogated.",
        images: [
          {
            src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
            alt: "Wireframe iteration 1",
            caption: "Early wireframe — summarized card concept",
          },
          {
            src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
            alt: "Wireframe iteration 2",
            caption: "Refined filter system with intent chips",
          },
        ],
      },
      {
        heading: "The Solution",
        body: "The final design introduced AI-generated result summaries at the top of each results page, contextual intent filters that adapted based on query type, and a progressive disclosure pattern that kept results scannable without sacrificing depth.",
        image: {
          src: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=1200&q=80",
          alt: "Final design mockup",
          caption: "Final high-fidelity design — AI summary card with adaptive intent filters",
        },
        isFullBleed: true,
      },
    ],
    outcomes: [
      { label: "Time-to-answer", value: "↓ 34%" },
      { label: "Search satisfaction score", value: "↑ 28 pts" },
      { label: "Zero-result exits", value: "↓ 41%" },
    ],
  },

  2: {
    id: 2,
    title: "Subscription Upgrade Flow",
    subtitle: "Redesigning a freemium-to-paid funnel to convert without feeling coercive",
    role: "Senior Product Designer",
    year: "2023",
    tags: ["Monetization", "Conversion", "JTBD Research"],
    heroSrc: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1400&q=80",
    heroAlt: "Subscription Upgrade Flow hero",
    overview:
      "A SaaS product with 200K free users was converting at under 2%. The upgrade flow was a single modal with a pricing table — no context, no timing logic, no alignment to the user's current task. This project rebuilt the upgrade experience from the user's job-to-be-done outward.",
    sections: [
      {
        heading: "The Problem",
        body: "The existing upgrade prompt appeared randomly and interrupted users mid-task. It had a single CTA and no explanation of why upgrading was relevant to what the user was doing. Users reported feeling 'spammed' in NPS comments.",
      },
      {
        heading: "Research & Discovery",
        body: "We conducted 18 JTBD interviews with both converted and churned free users to understand upgrade triggers. We found 4 primary upgrade moments: hitting a limit mid-task, seeing a locked feature that would solve a current problem, sharing work with a stakeholder, and onboarding a new team member.",
        image: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
          alt: "Research insights board",
          caption: "4 upgrade trigger moments mapped from JTBD interviews",
        },
      },
      {
        heading: "Design Solution",
        body: "We designed a contextual upgrade system with four distinct prompt templates, each mapped to a specific trigger moment. Each prompt explained the 'why now' clearly, showed what the user would unlock, and offered a frictionless one-click upgrade path.",
        images: [
          {
            src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            alt: "Upgrade prompt design",
            caption: "Contextual prompt — limit-hit trigger",
          },
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            alt: "Pricing page redesign",
            caption: "Redesigned pricing page — benefit-led layout",
          },
        ],
      },
    ],
    outcomes: [
      { label: "Paid conversions", value: "↑ 22%" },
      { label: "Upgrade prompt dismissal rate", value: "↓ 35%" },
      { label: "NPS mentions of 'pushy'", value: "↓ 60%" },
    ],
  },

  3: {
    id: 3,
    title: "Design System",
    subtitle: "Building a cross-platform component library used by 6 product teams",
    role: "Design Systems Lead",
    year: "2023",
    tags: ["Design Systems", "Figma", "Tokens", "Accessibility"],
    heroSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
    heroAlt: "Design System hero",
    overview:
      "Six product teams were building independently, leading to inconsistent UI patterns, duplicated work, and accessibility gaps. This project established a shared design language — tokens, components, documentation, and a Figma library synced to the codebase.",
    sections: [
      {
        heading: "The Problem",
        body: "A design audit revealed 14 different button styles, 9 modal patterns, and 6 color systems in production. New engineers were rebuilding common components from scratch. Design reviews were spent on inconsistencies rather than user experience improvements.",
      },
      {
        heading: "Process",
        body: "We audited all six products, identified the 80% of UI patterns shared across teams, and ran working sessions with each team's designer and lead engineer to define a shared token architecture. We then built a Figma library in parallel with a coded component library, keeping them in sync via a token pipeline.",
        image: {
          src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
          alt: "Design system documentation",
          caption:
            "Component documentation — each component includes usage guidelines, do/don't examples, and accessibility notes",
        },
      },
      {
        heading: "The System",
        body: "The system shipped with 60+ components, a full token set (color, spacing, typography, radius, shadow), accessibility documentation for each component, and a contribution model that lets teams propose new components through a structured RFC process.",
        image: {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
          alt: "Component library overview",
          caption: "Figma component library — organized by category with all variants documented",
        },
        isFullBleed: true,
      },
    ],
    outcomes: [
      { label: "Teams adopted system", value: "6 / 6" },
      { label: "Design review time on inconsistencies", value: "↓ 70%" },
      { label: "New component build time", value: "↓ 4 days avg" },
    ],
  },

  4: {
    id: 4,
    title: "Onboarding Overhaul",
    subtitle: "Cutting time-to-first-value from 8 minutes to under 2 through progressive disclosure",
    role: "Product Designer",
    year: "2023",
    tags: ["Onboarding", "B2B", "Analytics", "UX Research"],
    heroSrc: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1400&q=80",
    heroAlt: "Onboarding Overhaul hero",
    overview:
      "New users of a B2B analytics tool were abandoning onboarding at a 68% rate before reaching their first meaningful data view. The existing flow front-loaded 12 setup steps before showing any value. This project rebuilt the first-run experience around a single core outcome.",
    sections: [
      {
        heading: "The Problem",
        body: "The onboarding flow was designed around product capabilities, not user goals. Users were asked to configure integrations, set up teams, and define settings before they had any sense of what value they were working toward. Drop-off data showed 68% left before completing step 4.",
      },
      {
        heading: "Research & Discovery",
        body: "We ran 10 moderated onboarding sessions with first-time users and found a consistent pattern: users wanted to see their own data as quickly as possible. Everything else felt like friction. We mapped the minimum path to 'first aha moment' and redesigned around that.",
        image: {
          src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
          alt: "User journey mapping session",
          caption: "Journey map showing the 'first aha moment' path — stripped from 12 steps to 3",
        },
      },
      {
        heading: "Design Solution",
        body: "We redesigned the flow with progressive disclosure: 3 steps to first value, everything else deferred to in-product contextual prompts. Tooltips, empty states, and ambient guidance replaced the upfront setup wizard entirely.",
        image: {
          src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
          alt: "Redesigned onboarding flow",
          caption: "Redesigned flow — 3 steps to a populated dashboard using sample data",
        },
        isFullBleed: true,
      },
    ],
    outcomes: [
      { label: "Time-to-first-value", value: "8m → <2m" },
      { label: "Onboarding completion rate", value: "↑ 54%" },
      { label: "Day-7 retention", value: "↑ 19%" },
    ],
  },

  5: {
    id: 5,
    title: "Project Five",
    subtitle: "Brief description of the project and its core challenge",
    role: "Product Designer",
    year: "2024",
    tags: ["Tag One", "Tag Two", "Tag Three"],
    heroSrc: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&q=80",
    heroAlt: "Project Five hero",
    overview:
      "Overview paragraph — describe the context, the user problem, and why this project mattered. 2–3 sentences that set the stage for what follows.",
    sections: [
      {
        heading: "The Problem",
        body: "Describe the core problem you were solving. Be specific about the user pain and the business context. What was broken, and why did it matter?",
      },
      {
        heading: "Research & Discovery",
        body: "Describe your research methods and key findings. What did you learn that shaped your approach? Include data points or quotes where possible.",
        image: {
          src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
          alt: "Research visual placeholder",
          caption: "Replace with a research artifact, user quote, or affinity map",
        },
      },
      {
        heading: "Design Solution",
        body: "Describe the solution you designed. What were the key design decisions? What tradeoffs did you make, and why?",
        image: {
          src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
          alt: "Solution visual placeholder",
          caption: "Replace with a high-fidelity mockup or prototype screenshot",
        },
        isFullBleed: true,
      },
    ],
    outcomes: [
      { label: "Metric one", value: "Value" },
      { label: "Metric two", value: "Value" },
    ],
  },

  6: {
    id: 6,
    title: "Project Six",
    subtitle: "Brief description of the project and its core challenge",
    role: "Product Designer",
    year: "2024",
    tags: ["Tag One", "Tag Two", "Tag Three"],
    heroSrc: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1400&q=80",
    heroAlt: "Project Six hero",
    overview:
      "Overview paragraph — describe the context, the user problem, and why this project mattered. 2–3 sentences that set the stage for what follows.",
    sections: [
      {
        heading: "The Problem",
        body: "Describe the core problem you were solving. Be specific about the user pain and the business context. What was broken, and why did it matter?",
      },
      {
        heading: "Research & Discovery",
        body: "Describe your research methods and key findings. What did you learn that shaped your approach? Include data points or quotes where possible.",
        image: {
          src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80",
          alt: "Research visual placeholder",
          caption: "Replace with a research artifact, user quote, or affinity map",
        },
      },
      {
        heading: "Design Solution",
        body: "Describe the solution you designed. What were the key design decisions? What tradeoffs did you make, and why?",
        image: {
          src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=80",
          alt: "Solution visual placeholder",
          caption: "Replace with a high-fidelity mockup or prototype screenshot",
        },
        isFullBleed: true,
      },
    ],
    outcomes: [
      { label: "Metric one", value: "Value" },
      { label: "Metric two", value: "Value" },
    ],
  },
};
