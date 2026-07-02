// Single source of truth for portfolio content.
// Competitive stats (LC/GH/CF/CC counts, peaks, shipped projects) are derived at runtime — see derivePortfolioStats.js.

export const platformUsernames = {
  github: "Ojas-Srivastava05",
  leetcode: "Oju_Srivastava",
  codechef: "ojassrivastava",
  codeforces: "oju",
};

/** Env override (ms): `VITE_STATS_POLL_INTERVAL_MS`. Default 10m; min 60s to ease API rate limits. */
const POLL_MS_ENV =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_STATS_POLL_INTERVAL_MS != null
    ? Number(import.meta.env.VITE_STATS_POLL_INTERVAL_MS)
    : NaN;

/** Browser-side polling for platform APIs — same freshness goal as push/WebSocket without a custom server. */
export const STATS_POLL_INTERVAL_MS =
  Number.isFinite(POLL_MS_ENV) && POLL_MS_ENV >= 60_000 ? POLL_MS_ENV : 10 * 60 * 1000;

/** Academic CGPA — update here when transcripts change; also parsed by derivePortfolioStats. */
export const ACADEMIC_CGPA = 9.2;

export function formatCgpaDisplay(cgpa) {
  if (cgpa == null || Number.isNaN(cgpa)) return null;
  return Number(cgpa).toFixed(2);
}

/** Target internship cycle shown across hero, contact, and recruiter copy. */
export const INTERNSHIP_AVAILABILITY = "Summer 2027";

export const profile = {
  name: "Ojas Srivastava",
  role: "Software Engineer · Full-Stack & AI",
  location: "Surat, India",
  origin: "Prayagraj, India",
  email: "srivastavaojas454@gmail.com",
  phone: "+91-7424978046",
  resume: "/Ojas-Srivastava-Resume.pdf",
  available:
    "Seeking Software Engineering internships for Summer 2027 — Bengaluru, Hyderabad, Pune, or remote-friendly.",
};

export const navItems = [
  { name: "Home", id: "hero" },
  { name: "Proof", id: "brief" },
  { name: "About", id: "about" },
  { name: "Work", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Stats", id: "coding-stats" },
  { name: "Stack", id: "toolkit" },
  { name: "Contact", id: "contact" },
];

export const recruiterBrief = [
  {
    label: "Best fit",
    value: "Software Engineering internships",
    detail:
      "Backend systems, full-stack product work, and applied ML — someone who can own APIs, data pipelines, and ship deployable software.",
  },
  {
    label: "Proof",
    value: "8+ shipped builds",
    detail:
      "LogiFlow (GSC Top 106), Community Hero, Career Automation Stack, AirHelp, RangRiti, IFFCO production tooling, and more — all with source or live links.",
  },
  {
    label: "Signal",
    value: "LeetCode Knight · CGPA 9.20",
    detail:
      "LeetCode Knight (2048 peak, 637+ solved), Codeforces Specialist (1457), strong academics, and industry internship experience.",
  },
  {
    label: "Availability",
    value: "Summer 2027",
    detail:
      "Penultimate-year B.Tech AI student (graduating May 2028) — open to SDE, backend, full-stack, and AI engineering roles.",
  },
];

export const profileLinks = [
  {
    name: "GitHub",
    handle: "@Ojas-Srivastava05",
    href: "https://github.com/Ojas-Srivastava05",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "LinkedIn",
    handle: "ojas-srivastava05",
    href: "https://www.linkedin.com/in/ojas-srivastava05",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.865-3.058-1.865 0-2.151 1.455-2.151 2.963v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.839-1.562 3.036 0 3.6 2 3.6 4.59v5.605z'/%3E%3C/svg%3E",
  },
  {
    name: "LeetCode",
    handle: "@Oju_Srivastava",
    href: "https://leetcode.com/Oju_Srivastava",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
  },
  {
    name: "Codeforces",
    handle: "@oju",
    href: "https://codeforces.com/profile/oju",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
  },
];

export const socialLinks = [
  {
    name: "Email",
    href: "mailto:srivastavaojas454@gmail.com",
    icon: "https://cdn.simpleicons.org/gmail/EA4335",
  },
  {
    name: "GitHub",
    href: "https://github.com/Ojas-Srivastava05",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ojas-srivastava05",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.865-3.058-1.865 0-2.151 1.455-2.151 2.963v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.562 2.839-1.562 3.036 0 3.6 2 3.6 4.59v5.605z'/%3E%3C/svg%3E",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/Oju_Srivastava",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
  },
  {
    name: "Codeforces",
    href: "https://codeforces.com/profile/oju",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/ojassrivastava",
    icon: "https://cdn.simpleicons.org/codechef/FFFFFF",
  },
];

export const projects = [
  {
    title: "LogiFlow",
    subtitle: "Google Solution Challenge 2026 Global Top 106 · Neural Foundry",
    description:
      "A multi-modal logistics platform (road, rail, air, water) built for Google Solution Challenge 2026 — Global Top 106. Co-led as Technical Co-Lead & UI/UX Head; owned the railway pipeline with sub-second read paths, Gradient Boosting delay ML, Pareto ranking, and Gemini explainability.",
    image: "/logiflow-preview.png?v=1",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "Redis",
      "Scikit-learn",
      "Gemini",
      "Leaflet",
    ],
    github: "https://github.com/Ojas-Srivastava05/LogiFlow-Solution-Challenge-2026",
    live: "https://logi-flow-solution-challenge-2026.vercel.app/",
    category: "AI Systems",
    period: "Apr — Jun 2026",
    role: "Technical Co-Lead, UI/UX Head & Railway Pipeline Owner",
    impact: [
      "GSC Global Top 106",
      "100–400 ms hot paths",
      "580+ rail corridors",
    ],
    problem:
      "Logistics decisions break down when rail, road, air, and water options live in separate formats with unclear delay risk and no unified comparison surface.",
    solution:
      "Built parallel real-time pipelines per mode, trained Gradient Boosting on 15,650 train-days for delay prediction, and shipped a Next.js decision surface with Pareto ranking and LLM explanations.",
    outcomes: [
      "Reached Google Solution Challenge 2026 Global Top 106 with Neural Foundry.",
      "Engineered sub-second Supabase-first read paths (100–400 ms) across 580+ corridors and 9,526 stations.",
      "Validated pricing with a pytest suite — 100/100 IRCA tariff business-rule checks.",
    ],
    proof: "Google Solution Challenge 2026 Global Top 106 · live deployment · public source.",
    highlights: [
      "Railway pipeline owner",
      "Gradient Boosting delay ML",
      "Next.js design system",
    ],
    bullets: [
      "Owned the full Next.js web frontend — 7 pipeline surfaces, design system, Zustand state, Leaflet maps, and Vercel proxy.",
      "Built railway pipeline with Supabase geometry cascade, split caching, and 100–400 ms hot-path reads separate from heavy search compute.",
      "Trained Gradient Boosting delay models (MAE 22.7 min, 81% within 30 min CV) and added Pareto-based time/cost/risk ranking.",
      "Co-led technical delivery across modes with Gemini explainability and FastAPI + Redis backend on GCP Cloud Run.",
    ],
    featured: true,
    flagship: true,
  },
  {
    title: "AirHelp",
    subtitle: "AI airport companion — PowerMind Hackathon 2026",
    description:
      "An AI-powered airport companion built at PowerMind Hackathon 2026 — conversational backend with intent orchestration, RAG semantic search, A* indoor navigation on custom terminal graphs, WebSocket real-time alerts, and offline voice (Whisper STT + Piper TTS).",
    image: "/airhelp-preview.png?v=1",
    tech: [
      "FastAPI",
      "React",
      "WebSockets",
      "ChromaDB",
      "Sentence Transformers",
      "NetworkX",
      "RAG",
      "Ollama",
    ],
    github: "https://github.com/Ojas-Srivastava05/AirHelp-AI-Airport-Assistant",
    live: "https://github.com/Ojas-Srivastava05/AirHelp-AI-Airport-Assistant",
    category: "AI Systems",
    period: "2026 · Hackathon",
    role: "Graph navigation, RAG pipeline, voice & backend integration",
    impact: ["1–3s responses", "95%+ nav accuracy", "50–100 concurrent users"],
    problem:
      "Airport help desks are overloaded, and travelers need navigation, facility lookup, and document help without sending sensitive data to cloud services.",
    solution:
      "Shipped a FastAPI backend with A* pathfinding on custom walking graphs, ChromaDB RAG, WebSocket alerts, and local voice pipelines managed via lifespan events.",
    outcomes: [
      "Achieved 1–3s response latency with 50–100 concurrent users per instance.",
      "Delivered 95%+ navigation accuracy on custom Terminal 2 walking graphs.",
      "Kept speech and retrieval flows local for privacy with offline Piper TTS.",
    ],
    proof: "PowerMind Hackathon 2026 · public repository and implementation notes.",
    highlights: ["A* navigation engine", "WebSocket alerts", "RAG + voice pipeline"],
    bullets: [
      "Built A* indoor navigation on custom airport walking graphs with turn-by-turn directions and walk-time estimates.",
      "Integrated RAG pipeline (ChromaDB + Sentence Transformers) for semantic facility discovery with metadata filtering.",
      "Shipped WebSocket real-time alerts and FastAPI lifespan-managed voice services (Whisper STT + Piper TTS).",
      "Contributed to multi-layer memory architecture (persistent, ephemeral, turn-based) for context-aware conversations.",
    ],
    featured: true,
  },
  {
    title: "Community Hero",
    subtitle: "CIVICPULSE AI — Vibe2Ship 2026 · hyperlocal civic reporting",
    description:
      "A hyperlocal civic issue reporting PWA for Indian urban citizens — photograph potholes, water leaks, and streetlights; Gemini classifies in seconds; six agents route, verify, and track SLA deadlines with public impact dashboards.",
    image: "/community-hero-preview.png?v=1",
    tech: [
      "React",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Gemini",
      "Cloud Run",
      "Express",
      "Google Maps",
    ],
    github: "https://github.com/Ojas-Srivastava05/community-hero",
    live: "https://community-hero-987477089222.asia-south1.run.app",
    category: "AI Systems",
    period: "2026 · Vibe2Ship",
    role: "Solo builder — full-stack, AI agents, geo, deploy, and docs",
    impact: ["8 civic features", "6-agent pipeline", "Live on Cloud Run"],
    problem:
      "Citizens report civic issues through fragmented channels with no accountability, routing, or verifiable public tracking.",
    solution:
      "Built a mobile-first PWA on Google Cloud: AI categorization, geo-tagged reports, community upvotes, SLA timelines, analytics dashboards, and a civic assistant.",
    outcomes: [
      "Shipped all eight Vibe2Ship example features with a 6-agent orchestration pipeline.",
      "Deployed production app on Cloud Run (asia-south1) with Firebase Auth, Firestore, and Gemini Vision.",
      "Added gamification, hotspot analytics, Open311 export, and admin resolution workflows.",
    ],
    proof: "Vibe2Ship 2026 · live Cloud Run deployment · public GitHub.",
    highlights: ["Gemini Vision", "6-agent pipeline", "Civic PWA"],
    bullets: [
      "Architected solo full-stack delivery: React PWA, Express API, Firestore schema, and Cloud Run deployment.",
      "Built Gemini-powered issue categorization, 6-agent routing/dedup/SLA pipeline, and civic assistant chat.",
      "Shipped map explorer, community verification tiers, impact dashboards, leaderboard gamification, and admin analytics.",
    ],
    featured: true,
  },
  {
    title: "Career Automation Stack",
    subtitle: "Internship Scout & OA Forge — resume-optimiser monorepo",
    description:
      "A production automation stack aggregating internship listings across 965+ companies and 14K+ evidence-tracked OA questions — with scheduled CI pipelines, Supabase-backed data, and GitHub Actions orchestration.",
    image: "/portfolio-preview.png?v=2",
    tech: [
      "Python",
      "GitHub Actions",
      "Supabase",
      "BeautifulSoup",
      "REST APIs",
      "Next.js",
      "TypeScript",
    ],
    github: "https://github.com/Ojas-Srivastava05/resume-optimiser",
    live: "https://github.com/Ojas-Srivastava05/resume-optimiser",
    category: "AI Systems",
    period: "Jun 2026 — Present",
    role: "Sole architect — data pipelines, CI/CD, and automation tooling",
    impact: ["965+ companies", "14K+ OA questions", "Scheduled CI pipelines"],
    problem:
      "Internship hunting at scale means tracking hundreds of companies, OA question banks, and outreach — manually, it does not scale.",
    solution:
      "Built a monorepo with Internship Scout (listing aggregation), OA Forge (question drill platform), and Hiring Contacts discovery — all wired through GitHub Actions and Supabase.",
    outcomes: [
      "Aggregated listings across 965+ companies with evidence-tracked filtering.",
      "Indexed 14K+ OA questions with daily drill workflows and CI validation.",
      "Automated cold outreach and hiring-contact discovery via scheduled pipelines.",
    ],
    proof: "Public monorepo with active GitHub Actions workflows and production deployments.",
    highlights: ["GitHub Actions CI", "Data aggregation", "Supabase backend"],
    bullets: [
      "Architected internship listing aggregation across 965+ companies with BeautifulSoup scraping and REST API integrations.",
      "Built OA Forge with 14K+ evidence-tracked questions, daily drill workflows, and pytest-validated pipelines.",
      "Wired GitHub Actions for scheduled scouting, cold outreach, and hiring-contact discovery with Supabase persistence.",
    ],
    featured: true,
  },
  {
    title: "RangRiti",
    subtitle: "Web Wonders 2025 · Cultural-tech marketplace",
    description:
      "A cultural hub with VR experiences, AI storytelling, and a marketplace for traditional Indian arts. Forty-plus pages and a complete artisan commerce flow.",
    image: "/rangriti-preview.png?v=2",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary", "Hugging Face"],
    github: "https://github.com/Ojas-Srivastava05/RangRiti",
    live: "https://rangriti.onrender.com",
    category: "Full Stack",
    period: "Jun 2025 — Aug 2025",
    role: "Technical lead, backend integration, feature delivery",
    impact: ["40+ pages shipped", "Marketplace flow", "AI storytelling"],
    problem:
      "Traditional art discovery often lacks interactive context, creator visibility, and a commerce path for artisans.",
    solution:
      "Led a team build for a cultural-tech platform combining art-form pages, creator profiles, AI storytelling, and marketplace flows.",
    outcomes: [
      "Delivered a 40+ page competition-ready product.",
      "Integrated creator discovery, workshops, and artisan commerce surfaces.",
      "Added AI storytelling to make cultural exploration more interactive.",
    ],
    proof: "Web Wonders 2025 team build with live deployment.",
    highlights: ["40+ art forms", "AI storytelling", "Artisan marketplace"],
    bullets: [
      "Built a full-stack platform with artist profiles, workshops, and marketplace flows.",
      "Integrated AI storytelling tools and shipped 40+ pages for the Web Wonders 2025 competition.",
    ],
    featured: true,
  },
  {
    title: "Ink'd",
    subtitle: "AI text summariser",
    description:
      "An AI-powered platform for summarising user text with NLP-driven concise outputs and local export support.",
    image: "/inkd-preview.png?v=2",
    tech: ["Node.js", "Express", "Cohere API", "NLP"],
    github: "https://github.com/Ojas-Srivastava05/inkd-diary",
    live: "https://inkd-diary.onrender.com",
    category: "AI Tools",
    period: "Jun 2025 — Jul 2025",
    role: "Backend APIs, AI summarisation flow, export support",
    impact: ["Cohere-powered summaries", "Export flow", "Clean backend API"],
    problem:
      "Long-form notes and text are hard to convert into quick, reusable summaries without losing the core idea.",
    solution:
      "Built an Express API around Cohere summarisation with a focused interface and local export support.",
    outcomes: [
      "Converted pasted text into concise AI summaries.",
      "Added export functionality for saved outputs.",
      "Handled backend errors cleanly for a smoother user experience.",
    ],
    proof: "Public source and deployed Render app.",
    highlights: ["NLP summaries", "Local export", "Clean API"],
    bullets: [
      "Developed an AI summarisation platform using Node.js, Express.js, and the Cohere API.",
      "Implemented backend APIs with export functionality and clean error handling.",
    ],
  },
  {
    title: "Clubify",
    subtitle: "Campus community platform",
    description:
      "A club discovery and event-management platform with membership flows, role-based admin controls, JWT authentication, and Cloudinary media handling.",
    image: "/clubify-preview.png?v=2",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    github: "https://github.com/Ojas-Srivastava05/WPP-Project.git",
    live: "https://github.com/Ojas-Srivastava05/WPP-Project.git",
    category: "Product",
    period: "Academic Project",
    role: "Full-stack developer, auth, media, admin workflow",
    impact: ["Role-based admin", "JWT auth", "Cloudinary media"],
    problem:
      "Campus clubs need a single place for discovery, membership, events, and admin controls.",
    solution:
      "Built a MERN-style platform with JWT authentication, role-based admin surfaces, membership flows, and media uploads.",
    outcomes: [
      "Implemented club discovery and event-management workflows.",
      "Added secure role separation for admins and members.",
      "Used Cloudinary for practical media handling.",
    ],
    proof: "Academic project with public source repository.",
    highlights: ["Role-based admin", "Event workflows", "Auth + Media"],
  },
  {
    title: "ClimaTrack",
    subtitle: "Temperature prediction system",
    description:
      "A machine learning project with custom gradient descent, a Flask API, weather data ingestion, and a React interface for next-day forecasts.",
    image: "/climatracker-preview.png?v=2",
    tech: ["Python", "Flask", "Linear Regression", "React"],
    github: "https://github.com/Ojas-Srivastava05/TempPredictor",
    live: "https://climatrack-2o3u.onrender.com",
    category: "Machine Learning",
    period: "Academic Project",
    role: "ML model, Flask API, React interface",
    impact: ["From-scratch gradient descent", "Weather API ingestion", "Deployed forecast UI"],
    problem:
      "Weather prediction is a useful sandbox for understanding data ingestion, model training, and API-backed inference.",
    solution:
      "Implemented linear regression with custom gradient descent, exposed predictions through Flask, and built a React UI.",
    outcomes: [
      "Built the model pipeline from scratch instead of relying only on library defaults.",
      "Served next-day temperature predictions from an API.",
      "Connected weather data ingestion to a deployed frontend.",
    ],
    proof: "Academic ML build with public repository and live deployment.",
    highlights: ["From-scratch ML", "Weather API", "Deployed model"],
  },
  {
    title: "Portfolio",
    subtitle: "This site",
    description:
      "A handcrafted, motion-rich personal site built to showcase work, ratings, and engineering principles with intent in every interaction.",
    image: "/portfolio-preview.png?v=2",
    tech: ["React", "Vite", "Tailwind", "Framer Motion"],
    github: "https://github.com/Ojas-Srivastava05/Portfolio-Ojas.git",
    live: "https://ojas-srivastava.vercel.app/",
    category: "Frontend",
    period: "2025 — Present",
    role: "Design, React architecture, motion system, live stats integrations",
    impact: ["Command palette", "Live coding stats", "Motion-rich UI"],
    problem:
      "Most student portfolios either look generic or hide the actual proof a recruiter needs to scan.",
    solution:
      "Built a custom React/Vite portfolio with live profile data, command navigation, motion, and project proof surfaces.",
    outcomes: [
      "Created a distinctive personal brand without using a template.",
      "Added live coding stats and profile shortcuts.",
      "Organized work into scannable, recruiter-friendly sections.",
    ],
    proof: "This site is the artifact: public source, live deployment, and active iteration.",
    highlights: ["Custom design system", "Crafted motion", "Built from scratch"],
  },
];

export const experiences = [
  {
    year: "Jun — Jul 2025",
    role: "Software Intern",
    company: "IFFCO — Phulpur Unit",
    location: "Prayagraj, India",
    description:
      "Built and deployed a production full-stack application for the System Networking Division — automating 50+ daily enterprise workflows with JWT auth and structured error handling.",
    bullets: [
      "Developed 10+ RESTful APIs in Node.js + Express with optimized MySQL queries, indexing, and joins.",
      "Shipped through unit testing, integration testing, debugging, and peer code reviews on internal production infrastructure.",
      "Contributed to Docker containerization, CI/CD pipelines, and end-to-end feature ownership from implementation to release.",
    ],
    tags: ["Node.js", "Express", "MySQL", "REST"],
    accent: "primary",
  },
  {
    year: "Jun — Aug 2025",
    role: "Technical Lead",
    company: "RangRiti · Web Wonders 2025",
    location: "Surat, India",
    description:
      "Led a four-member team building RangRiti — a cultural marketplace with 40+ pages, artisan commerce flows, and AI storytelling for Web Wonders 2025.",
    bullets: [
      "Coordinated sprints and ensured on-time delivery of a 40+ page competition-ready product.",
      "Owned backend integration end-to-end, reviewed every PR, and shipped to Render.",
    ],
    tags: ["Leadership", "Node.js", "MongoDB"],
  },
  {
    year: "2024 — Present",
    role: "B.Tech in Artificial Intelligence",
    company: "SVNIT Surat",
    location: "Surat, India",
    description:
      "Studying AI, algorithms, operating systems, DBMS, computer organization, software engineering, and OOP.",
    metric: "CGPA 9.20",
    tags: ["AI / ML", "DSA", "Systems"],
  },
  {
    year: "2024 — Present",
    role: "Executive Member",
    company: "ACM SVNIT Surat",
    location: "Surat, India",
    description:
      "Organising coding workshops and technical events to grow a stronger programming culture across campus.",
    tags: ["Community", "Events", "Workshops"],
  },
  {
    year: "2024 — Present",
    role: "Mentor & Representative",
    company: "Nexus SVNIT",
    location: "Surat, India",
    description:
      "Mentoring juniors in programming fundamentals and coordinating participation in technical initiatives.",
    tags: ["Mentorship", "DSA", "Campus"],
  },
];

export const education = [
  {
    title: "B.Tech, Artificial Intelligence",
    institution: "Sardar Vallabhbhai National Institute of Technology",
    location: "Surat, Gujarat",
    period: "2024 — May 2028",
    score: "9.20 / 10",
    note: "Penultimate year · Concentrations in AI, systems, DSA, and software engineering.",
  },
  {
    title: "Class XII · CBSE",
    institution: "Shiv Jyoti Convent School",
    location: "Kota, Rajasthan",
    period: "Completed 2024",
    score: "95.80 %",
  },
  {
    title: "Class X · ICSE",
    institution: "St. Joseph's College",
    location: "Prayagraj, Uttar Pradesh",
    period: "Completed 2022",
    score: "97.20 %",
  },
];

export const principles = [
  {
    n: "01",
    title: "Backends are the product.",
    body:
      "I treat APIs as a UX surface. Predictable contracts, clean errors, and observable behaviour matter more than clever code.",
  },
  {
    n: "02",
    title: "Ship the deployable version.",
    body:
      "I build with deployment in mind from day zero. Every project I list has been pushed, configured, and made real.",
  },
  {
    n: "03",
    title: "AI should remove a step.",
    body:
      "I integrate AI where it shortens a real workflow — summarising, routing, explaining — not where it just sounds impressive.",
  },
  {
    n: "04",
    title: "Algorithms are reps.",
    body:
      "Contest ratings and solve counts refresh from LeetCode, Codeforces, and CodeChef APIs — the reps make me faster at debugging, calmer in code review, and sharper at problem modelling.",
  },
];

export const interests = [
  "Backend Development",
  "Distributed Systems",
  "Full-stack Web Development",
  "AI Integration",
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    handle: "Oju_Srivastava",
    rating: "2048",
    rank: "Knight",
    detail: "637 solved · Peak 2048 · 32 contests.",
    color: "#FFA116",
    href: "https://leetcode.com/Oju_Srivastava",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
    stats: [
      { label: "Peak rating", value: "2048" },
      { label: "Current", value: "2048" },
      { label: "Rank", value: "Knight" },
      { label: "Problems", value: "637" },
      { label: "Contests", value: "32" },
      { label: "Global rank", value: "Top 3%" },
    ],
  },
  {
    platform: "Codeforces",
    handle: "oju",
    rating: "1457",
    rank: "Specialist",
    detail: "207 problems solved — rated rounds and consistent practice grind.",
    color: "#1F8ACB",
    href: "https://codeforces.com/profile/oju",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
    stats: [
      { label: "Rating", value: "1457" },
      { label: "Rank", value: "Specialist" },
      { label: "Problems", value: "207" },
    ],
  },
  {
    platform: "CodeChef",
    handle: "ojassrivastava",
    rating: "1536",
    rank: "2★",
    detail: "11 rated contests · 118 problems solved (provisional Elo active).",
    color: "#FFFFFF",
    href: "https://www.codechef.com/users/ojassrivastava",
    icon: "https://cdn.simpleicons.org/codechef/FFFFFF",
    stats: [
      { label: "Rating", value: "1536*" },
      { label: "Rank", value: "2★" },
      { label: "Problems", value: "118" },
    ],
  },
  {
    platform: "GitHub",
    handle: "Ojas-Srivastava05",
    rating: "31",
    rank: "Public repos",
    detail: "31 public repos · 20 followers · Active since 2021.",
    color: "#FFFFFF",
    href: "https://github.com/Ojas-Srivastava05",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
    stats: [
      { label: "Repos", value: "31" },
      { label: "Followers", value: "20" },
      { label: "Lang", value: "Py/JS/C++" },
    ],
  },
];

export const achievements = [
  {
    title: "Google Solution Challenge 2026",
    detail:
      "LogiFlow (Neural Foundry) — Global Top 106. Technical Co-Lead, UI/UX Head, and Railway Pipeline Owner.",
    tag: "Competitive",
  },
  {
    title: "Community Hero · Vibe2Ship 2026",
    detail:
      "Solo-built CIVICPULSE AI — hyperlocal civic PWA with Gemini Vision, 6-agent pipeline, and Cloud Run deploy.",
    tag: "Hackathon",
  },
  {
    title: "McKinsey.org Forward Fellow",
    detail:
      "2026 cohort — structured problem-solving, communication, and cross-functional collaboration.",
    tag: "Fellowship",
  },
  {
    title: "PowerMind Hackathon 2026",
    detail: "Built AirHelp — AI airport companion with RAG, voice, and A* navigation.",
    tag: "Hackathon",
  },
  {
    title: "LeetCode Knight",
    detail: "Rating 2048 · 637+ problems solved · 32 contests.",
    tag: "Competitive",
  },
  {
    title: "Codeforces Specialist",
    detail: "Rating 1457 · 207 problems solved across rated rounds.",
    tag: "Competitive",
  },
  {
    title: "Software Intern at IFFCO",
    detail: "Shipped production tooling automating 50+ daily enterprise workflows.",
    tag: "Industry",
  },
  {
    title: "Technical Lead, Web Wonders 2025",
    detail: "Led a 4-member team building RangRiti — 40+ page cultural marketplace.",
    tag: "Leadership",
  },
  {
    title: "ACM SVNIT Executive",
    detail: "Organising DSA workshops, contests, and programming events on campus.",
    tag: "Community",
  },
  {
    title: "Nexus SVNIT Mentor",
    detail: "Mentoring juniors in programming fundamentals and technical onboarding.",
    tag: "Mentorship",
  },
];

export const toolkit = [
  {
    title: "Languages",
    blurb: "What I write in.",
    skills: [
      { name: "C / C++", logo: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "HTML / CSS", logo: "https://cdn.simpleicons.org/html5/E34F26" },
    ],
  },
  {
    title: "Frameworks",
    blurb: "How I build the surface.",
    skills: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express.js", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "Django", logo: "https://cdn.simpleicons.org/django/092E20" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
    ],
  },
  {
    title: "Data & Cloud",
    blurb: "Where state lives.",
    skills: [
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3FCF8E" },
      { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" },
      { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/FFFFFF" },
      { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
      { name: "Scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    ],
  },
  {
    title: "Tooling",
    blurb: "Day-to-day flow.",
    skills: [
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      { name: "GCP Cloud Run", logo: "https://cdn.simpleicons.org/googlecloud/4285F4" },
      { name: "Render", logo: "https://cdn.simpleicons.org/render/46E3B7" },
    ],
  },
];

