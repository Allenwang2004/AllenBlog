export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location: string;
  logo: string;
  color: string;
  summary: string;
  bullets: string[];
  image?: string;
  link?: {
    href: string;
    title: string;
    description: string;
    image?: string;
  };
};

export const workExperiences: WorkExperience[] = [
  {
    id: 'academia',
    company: 'Academia Sinica',
    role: 'Research Assistant',
    period: 'July 2026 – Now',
    current: true,
    location: 'Taipei, Taiwan',
    logo: 'AS',
    color: 'bg-gradient-to-br from-gray-800 to-gray-950',
    summary:
      'Working on...',
    bullets: [
      'Cross-Embodiment Representation: built a reusable data-processing and experimentation pipeline from AMASS datasets to compare humanoid models with different body proportions; extended Metamotivo-based control beyond a single embodiment.',
      '2026 BEHAVIOR Challenge: built evaluation infrastructure spanning three servers with shared data and offline load balancing; classified force data, trained separate SFT checkpoints and introduced a stage classifier for RL post-training, improving both success rate and q-score by more than 10% over baseline.',
      'x-LeRobot: built a 17-DoF mobile dual-arm platform with two SO-101 arms, a 2-DoF head, omnidirectional base and three cameras; trained a force-conditioned ACT policy and improved task success from 54% to 68%, then deployed it to Jetson Orin NX at 30 Hz with inference latency reduced from 62 ms to 19 ms.'
    ],
    image: '/images/workexperience/academia.png',
  },
  {
    id: 'tymphany',
    company: 'Tymphany',
    role: 'AI Assistant Engineer',
    period: 'Feb 2026 – June 2026',
    current: false,
    location: 'Taipei, Taiwan',
    logo: 'TY',
    color: 'bg-gradient-to-br from-gray-800 to-gray-950',
    summary:
      'Optimizing the FlowAI agentic framework and RAG-based planning system for audio processing workflows.',
    bullets: [
      'Developed and stabilised FlowAI, an agentic RAG-based planning framework for audio-processing workflows, integrating front-end and back-end functions for an internal engineering platform.',
      'Improved successful construction of acoustic processing flows from an initially unsuccessful state to above 90%, while adding context-memory control by adding tiered context management by introducing paged tiered context memory (persistent working context + on-demand retrieval from external storage), bounding token growth.',
      'Ported and validated a noise-reduction model and audio DSP pipeline on an embedded board, comparing quantised and on-device outputs against floating-point references on a fixed test set.',
      'Used Jira, daily stand-ups and weekly written pitches to coordinate development and propose product improvements with remote colleagues. '
    ],
    image: '/images/workexperience/tymphany.jpg',
    link: {
      href: '/posts/flowai-post',
      title: 'FlowAI',
      description:
        'Building an agentic workflow system with parallel agents, ReAct subagents, RAG-based tool retrieval, and tiered context management',
      image: '/images/flowai/cover.png',
    },
  },
  {
    id: 'aift',
    company: 'AIFT',
    role: 'Software Engineer Intern',
    period: 'July 2025 – Dec 2025',
    location: 'Remote',
    logo: 'AI',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    summary:
      'Built backend services for a decentralized prediction market and automated smart-contract security checks.',
    bullets: [
      'Developed front-end (React/TypeScript) and back-end (Python/FastAPI) features for the RiskMarket SaaS product, working in a distributed team with Git-based PR review and CI/CD.',
      'Built backend services for a decentralised prediction market: smart-contract market creation, an O(log n) red-black-tree order-matching engine, and on-chain settlement of off-chain matched trades.'
    ],
    image: '/images/workexperience/aift.avif',
  },
  {
    id: 'yuanta',
    company: 'Yuanta Securities',
    role: 'Quantitative Researcher Intern',
    period: 'Feb 2025 – June 2025',
    location: 'Taipei, Taiwan',
    logo: 'YT',
    color: 'bg-gradient-to-br from-red-500 to-red-700',
    summary:
      'Applied ML/DL models to predict asset returns and built an intraday high-frequency trading strategy.',
    bullets: [
      'Traced out-of-sample degradation from added microstructure features to collinear order-book signals and leakage across overlapping return windows; rebuilt LassoCV with time-ordered walk-forward validation and purged boundaries, removing look-ahead leakage at lower training cost than the original k-fold pipeline.',
      'Lifted out-of-sample R² from 0.013 to 0.014 on high-frequency return prediction with a tuned GRU model, evaluated under the corrected validation scheme.'

    ],
    image: '/images/workexperience/yuanta.jpg',
  },
  {
    id: 'medina',
    company: 'Medina Partners',
    role: 'Quantitative Researcher Intern',
    period: 'June 2024 – Aug 2024',
    location: 'Taipei, Taiwan',
    logo: 'MP',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    summary:
      'Engineered alpha signals from financial datasets and studied event-driven abnormal returns.',
    bullets: [
      'Engineered and selected alpha signals based on financial datasets; optimized factor combinations using feature engineering.',
      'Conducted event-driven abnormal return studies on public equities.',
    ],
    image: '/images/workexperience/medina.jpeg',
  },
];
