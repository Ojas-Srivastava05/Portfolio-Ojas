// Single source of truth for portfolio content.
// Competitive numbers verified May 2026 (GitHub · LeetCode · Codeforces · CodeChef).

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

/** When APIs omit solve totals, use for hero/aggregate tiles only (CodeChef mirror often offline). */
export const STATS_CP_PLATFORM_FALLBACK = {
  codeforcesProblems: 144,
  codechefProblems: 118,
};

export const profile = {
  name: "Ojas Srivastava",
  role: "AI Engineer & Full-Stack Developer",
  location: "Surat, India",
  origin: "Prayagraj, India",
  email: "srivastavaojas454@gmail.com",
  phone: "+91-7424978046",
  resume: "/Ojas-Srivastava-Resume.pdf",
  available: "Open to internships, freelance, and collaborative builds.",
  shortBio:
    "B.Tech AI at SVNIT Surat. I design backend systems, ship full-stack products, and grind algorithms — 548 on LeetCode, 810+ across CP, Knight, top ~3.7% contests.",
};

export const navItems = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Work", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Stats", id: "coding-stats" },
  { name: "Stack", id: "toolkit" },
  { name: "Contact", id: "contact" },
];

export const heroMetrics = [
  { value: "1952", label: "LeetCode peak", sub: "Knight · Top ~3.7% contests" },
  { value: "9.19", label: "CGPA", sub: "/ 10.0" },
  { value: "810+", label: "Problems", sub: "548 LC · CF · CC" },
  { value: "8+", label: "Shipped", sub: "deployed builds" },
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
    handle: "Knight · peak 1952 · 548 solved",
    href: "https://leetcode.com/Oju_Srivastava",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
  },
  {
    name: "Codeforces",
    handle: "Oju · 1179 rated",
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
    subtitle: "Decision intelligence for multi-modal logistics",
    description:
      "An end-to-end multi-modal logistics platform that unifies rail, air, road, and water pipelines, predicts disruptions with ML, and explains routing decisions with LLMs.",
    image: "/portfolio-preview.png?v=2",
    tech: ["FastAPI", "Next.js", "Python", "ML", "Gemini", "Groq"],
    github: "https://github.com/Ojas-Srivastava05/LogiFlow-Solution-Challenge-2026",
    live: "https://logi-flow-solution-challenge-2026.vercel.app/",
    category: "AI Systems",
    period: "2026 — Present",
    highlights: [
      "Hybrid decision orchestrator",
      "ML-based delay prediction",
      "LLM routing explanations",
    ],
    bullets: [
      "Engineered an end-to-end logistics platform integrating rail, air, road, and water pipelines.",
      "Built a robust railway pipeline with advanced scraping, session spoofing, and ML-based delay prediction.",
      "Designed a hybrid decision orchestrator that normalizes heterogeneous transport data and routes by time, cost, and risk.",
      "Integrated Gemini and Groq for interpretable routing insights across web and mobile.",
    ],
    featured: true,
    flagship: true,
  },
  {
    title: "AirHelp",
    subtitle: "AI airport companion — PowerMind Hackathon 2026",
    description:
      "An intelligent, privacy-first airport assistant built at PowerMind Hackathon 2026. Conversational AI with offline LLM, A* graph-based navigation, RAG-powered facility discovery, voice interaction (Whisper STT + Piper TTS), and boarding-pass OCR — all running locally with zero cloud dependencies.",
    image: "/portfolio-preview.png?v=2",
    tech: ["FastAPI", "Python", "React", "Ollama", "ChromaDB", "NetworkX", "Whisper", "Piper TTS"],
    github: "https://github.com/Ojas-Srivastava05/AirHelp-AI-Airport-Assistant",
    live: "https://github.com/Ojas-Srivastava05/AirHelp-AI-Airport-Assistant",
    category: "AI Systems",
    period: "2026 · Hackathon",
    highlights: ["A* navigation engine", "Offline-first LLM", "RAG + voice pipeline"],
    bullets: [
      "Built the UI/UX and graph-based navigation engine using A* pathfinding with turn-by-turn directions and time estimation.",
      "Integrated RAG pipeline (ChromaDB + Sentence Transformers) for semantic facility discovery with metadata filtering.",
      "Implemented offline voice pipeline: Whisper STT + Piper TTS — no cloud, full privacy.",
      "Contributed to the multi-layer memory architecture (persistent, ephemeral, turn-based) for context-aware conversations.",
    ],
    featured: true,
  },
  {
    title: "RangRiti",
    subtitle: "Cultural-tech experience platform",
    description:
      "A cultural hub with VR experiences, AI storytelling, and a marketplace for traditional Indian arts. Forty-plus pages and a complete artisan commerce flow.",
    image: "/rangriti-preview.png?v=2",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary", "Hugging Face"],
    github: "https://github.com/Ojas-Srivastava05/RangRiti",
    live: "https://rangriti.onrender.com",
    category: "Full Stack",
    period: "Jun 2025 — Aug 2025",
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
    highlights: ["NLP summaries", "Local export", "Clean API"],
    bullets: [
      "Developed an AI summarisation platform using Node.js, Express.js, and the Cohere API.",
      "Implemented backend APIs with export functionality and clean error handling.",
    ],
    featured: true,
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
    live: "https://portfolio-ojas-teal.vercel.app/",
    category: "Frontend",
    period: "2025 — Present",
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
      "Built and deployed an internal full-stack web application for the System Networking Division to automate enterprise workflows.",
    bullets: [
      "Developed REST APIs and backend features in Node.js + Express, integrated with MySQL.",
      "Shipped production-ready code through debugging, testing, and peer code reviews.",
      "Collaborated on system architecture, infrastructure, and deployment pipelines.",
    ],
    tags: ["Node.js", "Express", "MySQL", "REST"],
    accent: "primary",
  },
  {
    year: "Jun — Aug 2025",
    role: "Technical Lead",
    company: "Inspectonly.devs · Web Wonders 2025",
    location: "Surat, India",
    description:
      "Led a four-member development team, owning backend integration and feature deployment for a competition-ready platform.",
    bullets: [
      "Coordinated milestones and ensured on-time delivery of a 40+ page product.",
      "Owned backend integration end-to-end and reviewed every PR.",
    ],
    tags: ["Leadership", "Backend", "Delivery"],
  },
  {
    year: "2024 — Present",
    role: "B.Tech in Artificial Intelligence",
    company: "SVNIT Surat",
    location: "Surat, India",
    description:
      "Studying AI, algorithms, operating systems, DBMS, computer organization, software engineering, and OOP.",
    metric: "CGPA 9.19",
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
    period: "2024 — 2028",
    score: "9.19 / 10",
    note: "Concentrations in AI, systems, DSA, and software engineering.",
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
      "LeetCode Knight, peak 1952, 810+ aggregated practice across LC / CF / CC. The reps make me faster at debugging, calmer in code review, and sharper at problem modelling.",
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
    rating: "1931",
    rank: "Knight",
    detail: "548 solved · Peak 1952 · Top 3.67% contest percentile.",
    color: "#FFA116",
    href: "https://leetcode.com/Oju_Srivastava",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
    stats: [
      { label: "Peak rating", value: "1952" },
      { label: "Current", value: "1931" },
      { label: "Rank", value: "Knight" },
      { label: "Problems", value: "548" },
      { label: "Contests", value: "26" },
      { label: "Global rank", value: "Top 3.67%" },
    ],
  },
  {
    platform: "Codeforces",
    handle: "oju",
    rating: "1179",
    rank: "Newbie",
    detail: "144 problems uniquely solved — rated rounds and practice grind.",
    color: "#1F8ACB",
    href: "https://codeforces.com/profile/oju",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
    stats: [
      { label: "Rating", value: "1179" },
      { label: "Rank", value: "Newbie" },
      { label: "Problems", value: "144" },
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

export const achievementStats = [
  { value: "1952", label: "LeetCode peak", detail: "Knight · Top 3.67% contests" },
  { value: "9.19", label: "CGPA", detail: "B.Tech AI · SVNIT Surat" },
  { value: "810+", label: "Problems solved", detail: "548 LC · 144 CF · 118 CC" },
  { value: "8+", label: "Products shipped", detail: "Web · AI · Systems" },
];

export const achievements = [
  {
    title: "PowerMind Hackathon 2026",
    detail: "Built AirHelp — AI airport companion with offline LLM, voice, and A* navigation.",
    tag: "Hackathon",
  },
  {
    title: "LeetCode Knight",
    detail: "Reached a 1952 max rating with consistent algorithm practice.",
    tag: "Competitive",
  },
  {
    title: "Software Intern at IFFCO",
    detail: "Shipped internal workflow tooling for the Phulpur Unit.",
    tag: "Industry",
  },
  {
    title: "Technical Lead, Web Wonders 2025",
    detail: "Led a 4-member team to a competition-ready platform.",
    tag: "Leadership",
  },
  {
    title: "ACM SVNIT Executive",
    detail: "Organising workshops and programming events on campus.",
    tag: "Community",
  },
  {
    title: "Stanford ML Specialization",
    detail: "Pursuing Andrew Ng's specialization alongside coursework.",
    tag: "Learning",
  },
  {
    title: "Nexus SVNIT Mentor",
    detail: "Mentoring juniors in programming and technical onboarding.",
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
      { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/FFFFFF" },
      { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
    ],
  },
  {
    title: "Tooling",
    blurb: "Day-to-day flow.",
    skills: [
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
      { name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      { name: "Render", logo: "https://cdn.simpleicons.org/render/46E3B7" },
    ],
  },
];

export const nowFeed = [
  { tag: "BUILDING", text: "LogiFlow · multi-modal logistics decision engine" },
  { tag: "SHIPPED", text: "AirHelp · AI airport assistant · PowerMind Hackathon 2026" },
  { tag: "GRINDING", text: "LeetCode 548+/810+ CP · probing past peak 1952 again" },
  { tag: "STUDYING", text: "Stanford ML Specialization + DBMS internals" },
  { tag: "READING", text: "Designing Data-Intensive Applications" },
  { tag: "OPEN TO", text: "SDE / AI internships · Summer 2026" },
];

export const tickerLines = [
  "leetcode.knight",
  "peak::1952 · solved::548",
  "aggregate::810+ across lc/cf/cc",
  "cf::144 unique solves · 1179 rating",
  "codechef::2★ provisional 1536",
  "svnit.ai · cgpa 9.19",
  "stack::node + python + react + c++",
  "currently::shipping logiflow",
  "hackathon::airhelp · powermind 2026",
  "github::31 public repos",
  "areas::backend · distributed · ai",
];
