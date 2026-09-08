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
      'Working on...',
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
      'Ported and validated a noise-reduction model and audio DSP pipeline on an embedded board, verifying bit-level agreement within tolerance across the test set.',
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
      'Developed backend services in Python for a decentralized prediction market, including market creation, order matching algorithm, oracle updates, and on-chain/off-chain integration.',
      'Built automated n8n workflows with LLM for smart contract vulnerability checks, integrating static analysis tools and alerting pipelines to ensure system security.',
      'Conducted research and produced analytical reports on various Web3 projects, including protocol architecture, tokenomics, security considerations, and potential use cases.',
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
      'Applied a wide range of machine learning and deep learning models to predict asset returns. Successfully reduced computation time and improved accuracy through linear models, and further enhanced predictive performance using GNU-based neural network implementations.',
      'Developed an intraday high-frequency trading strategy based on order flow imbalance and liquidity dynamics, achieving benchmark outperformance on GC futures in backtesting.',
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
