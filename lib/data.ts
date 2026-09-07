export const nav = [
  { label: "Solutions", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  index: string;
  id: string;
  name: string;
  short: string;
  description: string;
  points: string[];
  color: string;
};

export const services: Service[] = [
  {
    index: "01",
    id: "erp",
    name: "ERP Systems",
    short: "Enterprise resource planning",
    description:
      "A single operating core for your business — finance, operations, procurement, and reporting unified into one live system of record.",
    points: ["Multi-branch operations", "Real-time reporting", "Role-based access", "Custom workflow engine"],
    color: "#c6ff5e",
  },
  {
    index: "02",
    id: "accounting",
    name: "Accounting",
    short: "Financial infrastructure",
    description:
      "Compliant, auditable accounting software built for accuracy at speed — ledgers, invoicing, tax handling, and reconciliation without the spreadsheets.",
    points: ["General ledger & AP/AR", "Tax & compliance ready", "Bank reconciliation", "Multi-currency support"],
    color: "#4dd8ff",
  },
  {
    index: "03",
    id: "stock",
    name: "Stock & Inventory",
    short: "Inventory intelligence",
    description:
      "Track every unit from warehouse to shelf. Live stock levels, automated reordering, and full traceability across every location you operate.",
    points: ["Real-time stock tracking", "Barcode & RFID ready", "Automated reorder rules", "Warehouse transfers"],
    color: "#ff7a3d",
  },
  {
    index: "04",
    id: "pos",
    name: "Point of Sale",
    short: "Retail & checkout systems",
    description:
      "Fast, offline-capable POS built for the counter — engineered for high-volume checkout, loyalty programs, and instant sync with inventory.",
    points: ["Offline-first design", "Loyalty & promotions", "Hardware integrations", "Instant inventory sync"],
    color: "#c6ff5e",
  },
  {
    index: "05",
    id: "mobile",
    name: "Mobile Apps",
    short: "iOS & Android products",
    description:
      "Native-grade mobile applications engineered for performance — from customer-facing apps to internal field tools your team relies on daily.",
    points: ["iOS & Android native", "Offline-first architecture", "Push & real-time sync", "App store deployment"],
    color: "#4dd8ff",
  },
  {
    index: "06",
    id: "web",
    name: "Websites",
    short: "Web platforms & portals",
    description:
      "High-performance websites and web applications — from marketing sites that convert to complex customer portals that scale.",
    points: ["Marketing & e-commerce", "Custom web portals", "Headless architecture", "SEO & performance tuned"],
    color: "#ff7a3d",
  },
];

export type CaseStudy = {
  index: string;
  name: string;
  category: string;
  description: string;
  results: { label: string; value: string }[];
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    name: "Project Meridian",
    category: "ERP · Retail Group",
    description:
      "A unified ERP core replacing six disconnected legacy tools across a 40-branch retail operation — inventory, finance, and staffing in one place.",
    results: [
      { label: "Reporting time", value: "-82%" },
      { label: "Branches live", value: "40" },
      { label: "Manual entry", value: "-91%" },
    ],
    tags: ["ERP", "Multi-branch", "Reporting"],
  },
  {
    index: "02",
    name: "Ledger Atlas",
    category: "Accounting · Financial Services",
    description:
      "Rebuilt a compliance-critical accounting platform from the ground up — audit trails, multi-entity ledgers, and automated tax handling.",
    results: [
      { label: "Close cycle", value: "-65%" },
      { label: "Entities managed", value: "120+" },
      { label: "Audit findings", value: "0" },
    ],
    tags: ["Accounting", "Compliance", "Multi-entity"],
  },
  {
    index: "03",
    name: "Counter One",
    category: "POS + Stock · Hospitality Chain",
    description:
      "An offline-first POS synced in real time with a central stock engine across 120 locations, keeping checkout fast even when the network isn't.",
    results: [
      { label: "Checkout speed", value: "1.2s" },
      { label: "Uptime", value: "99.98%" },
      { label: "Stock accuracy", value: "+37%" },
    ],
    tags: ["POS", "Stock", "Offline-first"],
  },
  {
    index: "04",
    name: "Fieldwork",
    category: "Mobile · Logistics",
    description:
      "A native field-operations app for a logistics fleet — route management, proof of delivery, and live sync built for patchy connectivity.",
    results: [
      { label: "Delivery accuracy", value: "+44%" },
      { label: "Active devices", value: "3,200" },
      { label: "Crash-free rate", value: "99.9%" },
    ],
    tags: ["Mobile", "Logistics", "Offline sync"],
  },
];

export const process = [
  {
    index: "01",
    title: "Discover",
    description:
      "We map your operations end to end — workflows, bottlenecks, stakeholders — before a single line of code is written.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "System architecture and interface design happen together, so what we build is both technically sound and genuinely usable.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Engineering in focused sprints with visible progress — you see working software early and often, not at the finish line.",
  },
  {
    index: "04",
    title: "Launch",
    description:
      "Careful, staged rollouts with real training and real support — go-live is a milestone we plan for, not a cliff edge.",
  },
  {
    index: "05",
    title: "Scale",
    description:
      "Systems that grow with you. We stay on as your infrastructure, your traffic, and your ambitions expand.",
  },
];

export const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "React Native", "Flutter", "AWS", "Docker",
  "GraphQL", "Redis",
];

export const stats = [
  { value: 120, suffix: "+", label: "Systems shipped" },
  { value: 9, suffix: "", label: "Years in operation" },
  { value: 40, suffix: "M+", label: "Transactions processed / yr" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export const testimonials = [
  {
    quote:
      "Soft Plus Systems replaced four disconnected tools with one platform our whole team actually understands. The transition was the smoothest system change we've been through.",
    name: "Placeholder Name",
    role: "Chief Operating Officer, Retail Group",
  },
  {
    quote:
      "Our checkout speed and stock accuracy both improved the same month we launched. It's rare that a system change pays for itself that fast.",
    name: "Placeholder Name",
    role: "Head of Operations, Hospitality Chain",
  },
  {
    quote:
      "They didn't just build what we asked for — they questioned our process, and the software that came out the other side was better for it.",
    name: "Placeholder Name",
    role: "Finance Director, Financial Services",
  },
  {
    quote:
      "The mobile app for our field team has been running for two years without a single day of meaningful downtime. That reliability is the whole product.",
    name: "Placeholder Name",
    role: "VP Logistics, Distribution Network",
  },
];

export const trustedBy = [
  "MERIDIAN GROUP", "ATLAS FINANCIAL", "COUNTER ONE", "FIELDWORK LOGISTICS",
  "NORTHBAY RETAIL", "LEDGER & CO", "PORTLINE HOLDINGS", "VANTAGE TRADE",
];

export const footerNav = {
  solutions: services.map((s) => ({ label: s.name, href: `#services` })),
  company: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};
