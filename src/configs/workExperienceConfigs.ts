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
      'Optimizing the FlowAI agentic framework and RAG-based planning system for audio processing workflows.',
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
      'Optimized and stabilized the FlowAI agentic framework and the RAG system, a planning system for audio processing workflows, including context control and token consumption.',
      'Fine-tuned large language models to generate structured audio processing pipelines, enabling automated workflow generation within the Flowstudio platform.',
      'Built automated CI/CD pipelines for continuous evaluation and benchmarking of agent planning performance and the deployment of the agentic infrastructure.',
    ],
    image: '/images/workexperience/tymphany.jpg',
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
