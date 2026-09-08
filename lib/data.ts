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

export type MockupType =
  | "erp"
  | "accounting"
  | "stock"
  | "pos"
  | "mobile-medical"
  | "mobile-invoice"
  | "website-menu"
  | "website-feedback";

export type CaseStudy = {
  index: string;
  name: string;
  category: string;
  description: string;
  results: { label: string; value: string }[];
  tags: string[];
  type: MockupType;
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    name: "StackBooks",
    category: "ERP · Multi-Branch Retail",
    description:
      "A unified ERP core replacing six disconnected legacy tools across a 35-branch retail operation — inventory, finance, and staffing in one place.",
    results: [
      { label: "Reporting time", value: "-70%" },
      { label: "Branches live", value: "35" },
      { label: "Manual entry", value: "-88%" },
    ],
    tags: ["ERP", "Multi-branch", "Reporting"],
    type: "erp",
  },
  {
    index: "02",
    name: "EasyAccounting",
    category: "Accounting · Financial Services",
    description:
      "A compliance-critical accounting platform built from the ground up — audit trails, multi-entity ledgers, and automated tax handling.",
    results: [
      { label: "Close cycle", value: "-60%" },
      { label: "Clients onboarded", value: "150+" },
      { label: "Audit findings", value: "0" },
    ],
    tags: ["Accounting", "Compliance", "Multi-entity"],
    type: "accounting",
  },
  {
    index: "03",
    name: "DressDesk",
    category: "Stock & Inventory · Fashion Retail",
    description:
      "Real-time stock intelligence for a fashion retail chain — size and colour-level tracking, automated reordering, synced across every store.",
    results: [
      { label: "Stock accuracy", value: "+41%" },
      { label: "Stores synced", value: "18" },
      { label: "Stockouts", value: "-55%" },
    ],
    tags: ["Stock", "Retail", "Inventory"],
    type: "stock",
  },
  {
    index: "04",
    name: "EasyPOS",
    category: "Point of Sale · Retail Chains",
    description:
      "An offline-first POS built for high-volume checkout — instant inventory sync, loyalty built in, and receipts printing in a little over a second.",
    results: [
      { label: "Checkout speed", value: "1.1s" },
      { label: "Uptime", value: "99.99%" },
      { label: "Terminals deployed", value: "220+" },
    ],
    tags: ["POS", "Retail", "Offline-first"],
    type: "pos",
  },
  {
    index: "05",
    name: "SP Medical",
    category: "Mobile App · Healthcare",
    description:
      "A patient-facing mobile app for a healthcare network — appointment booking, records access, and reminders that actually cut no-shows.",
    results: [
      { label: "Patients booked", value: "12k+" },
      { label: "App rating", value: "4.8★" },
      { label: "No-shows", value: "-45%" },
    ],
    tags: ["Mobile", "Healthcare", "Booking"],
    type: "mobile-medical",
  },
  {
    index: "06",
    name: "EasyInvoicing",
    category: "Mobile App · Field Sales",
    description:
      "An invoicing app for field and sales teams — generate, send, and track invoices from a phone, synced straight to the books back at the office.",
    results: [
      { label: "Faster invoicing", value: "3x" },
      { label: "Invoices sent", value: "40k+" },
      { label: "On-time payment", value: "99.5%" },
    ],
    tags: ["Mobile", "Invoicing", "Field sales"],
    type: "mobile-invoice",
  },
  {
    index: "07",
    name: "SP Menus",
    category: "Website · Restaurants & Cafés",
    description:
      "Digital menu and ordering sites for restaurants and cafés — built to load instantly on a phone at the table and convert browsers into orders.",
    results: [
      { label: "Online orders", value: "+38%" },
      { label: "Menus live", value: "300+" },
      { label: "Avg. load time", value: "2.4s" },
    ],
    tags: ["Website", "Ordering", "Restaurants"],
    type: "website-menu",
  },
  {
    index: "08",
    name: "Feedback Apps",
    category: "Website · Customer Experience",
    description:
      "A lightweight feedback and survey platform embedded across client websites — built to turn casual visitors into measurable customer insight.",
    results: [
      { label: "Responses collected", value: "50k+" },
      { label: "Avg. rating", value: "4.6★" },
      { label: "Response rate", value: "+27%" },
    ],
    tags: ["Website", "Feedback", "Surveys"],
    type: "website-feedback",
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
