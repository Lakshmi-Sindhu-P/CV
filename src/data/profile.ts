/**
 * Single source of truth for every word on the site.
 * Edit here; the components are dumb.
 *
 * TODO(verify): the two most recent résumés disagree on dates —
 *   "Resume 2026 (2).pdf"  → Effexoft Aug 2025–Present, TekLink Feb 2025–Aug 2025
 *   "LSP Vanilla.md"       → Effexoft Aug 2024–Present, TekLink Feb 2024–Aug 2024
 * The 2026 PDF values are used below. Confirm before publishing.
 */

export const profile = {
  name: 'Lakshmi Sindhu Pulugundla',
  shortName: 'Lakshmi Sindhu P.',
  role: 'Data Analyst · Data Scientist',
  location: 'Chicago, IL',
  availability: 'Open to Data Analyst / Data Scientist roles — Chicago or remote',
  email: 'sindhu.pl@outlook.com',
  github: 'https://github.com/Lakshmi-Sindhu-P',
  linkedin: 'https://www.linkedin.com/in/lakshmi-sindhu-p/',
  resume: '/resume.pdf',
} as const;

/** The four numbers a recruiter should leave with. Every one is from the résumé. */
export const headlineMetrics = [
  { value: '−60%', label: 'inventory query time', note: '547K-row pipeline' },
  { value: '35→18', label: 'min per consultation', note: '96% ASR accuracy' },
  { value: '4.9M→184K', label: 'protein edges pruned', note: 'NSCLC network' },
  { value: '0.04→0.42', label: 'R² on engagement', note: '10,080 tracks' },
] as const;

export const positioning = `I build analytics systems that people actually use: pipelines with a named owner,
dashboards that replace a recurring question, and models whose failure modes are documented
rather than hidden. Recently: a clinical assistant that took a neurologist's note-taking from
35 minutes to 18, and a procurement pipeline that cut inventory query time by 60%.`;

export type Project = {
  id: string;
  index: string;
  title: string;
  context: string;
  year: string;
  outcome: string;
  metrics: string[];
  method: string;
  stack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    id: 'clinical',
    index: '01',
    title: 'Clinical AI assistant for neurologists',
    context: 'Effexoft',
    year: '2025',
    outcome:
      'A consultation note writes itself while the neurologist talks. Documentation time fell from 30–35 minutes to about 18.',
    metrics: ['35→18 min', '96%+ transcription'],
    method:
      'FastAPI service with a medical speech-to-text pipeline, LLM summarisation, multi-turn conversation memory, and a QA validation suite. Role-based access control on PostgreSQL so every read of a patient record is attributable; audit trail designed before the model was tuned.',
    stack: ['FastAPI', 'LLM integration', 'Medical ASR', 'PostgreSQL', 'RBAC'],
  },
  {
    id: 'procurement',
    index: '02',
    title: 'Procurement-to-delivery analytics pipeline',
    context: 'Effexoft',
    year: '2025',
    outcome:
      'One analytical schema over a messy 547K-row stock ledger, with the KPIs finance and ops had been reconciling by hand in spreadsheets.',
    metrics: ['547K rows', '−60% query time', '+15% forecast accuracy'],
    method:
      'Unified schema with 35–40 engineered features, then Power BI dashboards for inventory turnover, on-hand balances, and shipment velocity. Query strategy — views, materialised rollups, and index review — is what produced the 60% reduction.',
    stack: ['SQL', 'Power BI', 'Feature engineering', 'Data modelling'],
  },
  {
    id: 'network',
    index: '03',
    title: 'NSCLC protein interaction network',
    context: 'Illinois Tech · Network Analysis',
    year: '2024',
    outcome:
      'Cut a 4.9M-edge STRING network down to the 184K interactions that carry signal, then let the graph name the hubs.',
    metrics: ['4.9M→184K edges', '2,500+ proteins'],
    method:
      'Confidence filtering and degree/centrality analysis in NetworkX, followed by community detection. TP53, KRAS, and AKT1 surfaced as hubs without being seeded into the model — a useful check that the filtering was not throwing away biology.',
    stack: ['NetworkX', 'Graph analysis', 'Community detection', 'Python'],
  },
  {
    id: 'spotify',
    index: '04',
    title: 'What actually drives repeat listening',
    context: 'Illinois Tech · Regression',
    year: '2024',
    outcome:
      'A baseline that explained 4% of engagement variance, rebuilt until it explained 42% — and a clear answer about which audio features matter.',
    metrics: ['R² 0.04→0.42', '10,080 tracks'],
    method:
      'Log-transformed targets, interaction terms, and Ridge/Lasso regularisation with cross-validated shrinkage. Genre, artist popularity, tempo, and energy were the stable predictors; the outliers were more interesting than the fit.',
    stack: ['R', 'Python', 'Ridge / Lasso', 'Regression diagnostics'],
  },
];

/** Compact "also shipped" row — depth without six more cards. */
export const smallerProjects = [
  { title: 'S&P 500 LSTM forecasting', detail: '23,323 daily records, 1927–2024 · Streamlit dashboard' },
  { title: 'Driver drowsiness detection', detail: '93% accuracy, 7% FPR, 30–50 ms latency · OpenCV' },
  { title: 'AI email generator', detail: '60+ unit tests · 70% faster composition' },
  { title: 'Atlas voice travel guide', detail: 'LiveKit, VAD, GPT-4o tool calling' },
  { title: 'YouTube trending analytics', detail: '40K videos, 4 countries' },
  { title: 'Banking fraud pipelines', detail: '10M+ records · Spark SQL, Delta Live Tables' },
] as const;

export type Role = {
  org: string;
  role: string;
  period: string;
  place: string;
  points: string[];
  proof?: string;
};

export const experience: Role[] = [
  {
    org: 'Effexoft',
    role: 'Data Analyst',
    period: 'Aug 2025 — Present',
    place: 'Remote',
    proof: '−60% query time',
    points: [
      'Clinical AI assistant (FastAPI, LLM, medical ASR): consultation documentation from 30–35 min to ~18 min at 96%+ transcription accuracy.',
      'Role-based access control schema, multi-turn memory, and a QA validation suite for safe, auditable clinical workflows.',
      'Procurement-to-delivery pipeline over a 547K-row stock ledger; Power BI dashboards cut inventory query time ~60% and lifted forecast accuracy ~15%.',
    ],
  },
  {
    org: 'TekLink International',
    role: 'Associate Data Analytics Intern',
    period: 'Feb 2025 — Aug 2025',
    place: 'Warrenville, IL',
    proof: '10M+ records',
    points: [
      'Azure Data Factory ETL for six Excel sources; star schema via SQL views and materialised queries for centralised KPI reporting.',
      'Spark SQL and Delta Live Tables pipelines over 10M+ banking transactions for fraud detection and transfer validation.',
      'Reproduced AutoML workflows (FLAML, H2O), cutting model development time ~30%.',
    ],
  },
  {
    org: 'Illinois Institute of Technology',
    role: 'Graduate Student Assistant',
    period: 'Sep 2024 — May 2025',
    place: 'Chicago, IL',
    points: [
      'Admissions testing operations: check-in, identity verification, and reporting on data that must not leak.',
      'Grading-data workflows and student results communication across groups of 20–30.',
    ],
  },
  {
    org: 'AlertFusion',
    role: 'Data Science Intern',
    period: 'Jan 2023 — May 2023',
    place: 'Maidstone, UK',
    proof: 'alert triage',
    points: [
      'Proof-of-concept alert triage model combining rule-based scoring with collaborative filtering to rank cybersecurity alerts.',
      'Evaluated ML.NET, PySpark, and Hadoop pipelines for scalable security data integration.',
    ],
  },
];

export const toolkit = [
  {
    group: 'Languages & query',
    items: ['Python', 'SQL', 'R', 'PySpark', 'Bash'],
  },
  {
    group: 'Data & platforms',
    items: ['PostgreSQL', 'Azure Data Factory', 'Databricks', 'Delta Live Tables', 'Snowflake (coursework)', 'dbt (basics)'],
  },
  {
    group: 'Modelling',
    items: ['scikit-learn', 'statsmodels', 'Keras', 'XGBoost', 'Ridge / Lasso', 'FLAML', 'H2O AutoML'],
  },
  {
    group: 'Analysis & graphs',
    items: ['pandas', 'NumPy', 'NetworkX', 'A/B testing', 'Regression diagnostics'],
  },
  {
    group: 'Product & delivery',
    items: ['Power BI', 'Streamlit', 'Plotly', 'FastAPI', 'Git', 'Docker (basics)'],
  },
  {
    group: 'Working with LLMs',
    items: ['OpenAI API', 'Prompt + tool design', 'RAG patterns', 'Guardrails & QA suites'],
  },
] as const;

export const education = [
  {
    school: 'Illinois Institute of Technology',
    degree: 'M.S. Data Science',
    period: 'Aug 2023 — Jul 2025',
    note: 'Chicago, IL · GPA 3.1',
  },
  {
    school: 'Presidency University',
    degree: 'B.Tech Computer Engineering & Data Science',
    period: 'Jul 2019 — Jul 2023',
    note: 'Bangalore, India · GPA 3.7',
  },
] as const;

export const certifications = [
  'Microsoft Azure Data Fundamentals',
  'Databricks Lakehouse Fundamentals',
] as const;

/** Command-palette + nav entries. Keep ids in sync with section ids. */
export const navSections = [
  { id: 'work', label: 'Selected work', hint: 'Four projects with numbers' },
  { id: 'experience', label: 'Experience', hint: 'Roles and what changed' },
  { id: 'toolkit', label: 'Toolkit', hint: 'What I actually use' },
  { id: 'education', label: 'Education', hint: 'IIT Chicago · Presidency' },
  { id: 'contact', label: 'Contact', hint: 'Email, LinkedIn, GitHub' },
] as const;
