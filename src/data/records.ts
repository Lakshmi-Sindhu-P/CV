/**
 * The work records. Every figure here is the one already used on the
 * résumé — nothing is rounded up, and nothing is invented. Prose is written
 * from what the work actually did.
 */

export type Figure = { value: string; label: string };

export type WorkRecord = {
  slug: string;
  index: string;
  /** Where the work happened: employed/client work, or a project of her own. */
  group: 'work' | 'independent';
  title: string;
  org: string;
  place: string;
  period: string;
  role: string;
  deck: string;
  chips: string[];
  figures: Figure[];
  situation: string[];
  work: string[];
  moved: string[];
  hard: string[];
  stack: string[];
  /** Public code, when there is any to read. */
  repo?: { label: string; url: string };
};

export const records: WorkRecord[] = [
  {
    slug: 'procurement-ledger',
    index: '01',
    group: 'work',
    title: 'One ledger, one definition of “on hand”',
    org: 'Effexoft',
    place: 'Remote',
    period: '2025',
    role: 'Data Analyst',
    deck: 'Procurement, delivery, and finance were each reconciling the same stock ledger by hand, and each had its own definition of what was in the warehouse.',
    chips: ['547K rows', '−60% query time', '+15% forecast accuracy'],
    figures: [
      { value: '547K', label: 'rows in the stock ledger, one analytical schema' },
      { value: '−60%', label: 'inventory query time after the query rewrite' },
      { value: '+15%', label: 'forecast accuracy on the demand model' },
    ],
    situation: [
      'The ledger was a working spreadsheet that had grown into a system of record: 547,000 rows of receipts, shipments, transfers, and adjustments, with three departments reading it three ways. Turnover reported by procurement did not match turnover reported by finance, and both were arithmetically correct.',
      'Most of the delay was not computation. It was the fortnight of email that preceded each report, spent agreeing on which number was the number.',
    ],
    work: [
      'One analytical schema over the ledger, with thirty-five to forty engineered features behind the KPIs: inventory turnover, on-hand balances, shipment velocity, and the lead-time variance that explains the rest.',
      'Power BI on top, so the definitions live in the model rather than in someone’s workbook. Then the query work — views for stable grains, materialised rollups for the heavy aggregates, and an index review against the queries that actually ran. That last pass is where the sixty per cent came from, not from the dashboard.',
    ],
    moved: [
      'Inventory query time fell about sixty per cent and forecast accuracy rose about fifteen per cent against the previous baseline.',
      'The reporting month stopped beginning with a reconciliation meeting, because there was only one definition to reconcile to.',
    ],
    hard: [
      'The definitions were politics, not SQL. “On hand” meant three things and two of them were legitimate.',
      'Late-arriving stock counts make a materialised view quietly wrong; the refresh schedule is a correctness decision, not a performance one.',
      'A tidy schema does not fix a process that logs a transfer a day late. It just makes the lateness visible, which is progress of a kind.',
    ],
    stack: ['SQL', 'Power BI', 'Data modelling', 'Feature engineering', 'Query tuning'],
  },
  {
    slug: 'protein-network',
    index: '02',
    group: 'work',
    title: 'Five million edges down to the ones that matter',
    org: 'Illinois Institute of Technology',
    place: 'Chicago',
    period: '2024',
    role: 'Network analysis coursework, extended',
    deck: 'A protein interaction network is mostly noise by volume. The interesting question was whether pruning it would delete the biology or reveal it.',
    chips: ['4.9M → 184K edges', '2,500+ proteins', 'TP53 · KRAS · AKT1'],
    figures: [
      { value: '4.9M', label: 'interactions in the unfiltered STRING network' },
      { value: '184K', label: 'edges left after confidence filtering' },
      { value: '3', label: 'canonical NSCLC hubs found without seeding them' },
    ],
    situation: [
      'STRING ships confidence-scored interactions, which means the network is a claim about the literature as much as about biology. At 4.9 million edges over 2,500 proteins, everything is connected to everything and community detection returns a hairball.',
      'The project question: cut it down without cutting out the disease.',
    ],
    work: [
      'Confidence filtering first, then degree and betweenness centrality in NetworkX to find what survived the cut, then community detection on the pruned graph to see whether the communities had biological meaning.',
      'The check that mattered was doing it without telling the algorithm which genes we expected. Hubs were allowed to emerge.',
    ],
    moved: [
      'The network went from 4.9 million edges to about 184,000 and became readable: a few dense communities, a long tail, and a hub structure that matched the non-small-cell lung cancer literature.',
      'TP53, KRAS, and AKT1 came out as hubs without being seeded — a useful negative control on the filtering.',
    ],
    hard: [
      'A confidence threshold is a silent filter on biology: it removes weak-but-real interactions and there is no error message when it does.',
      'Degree centrality rewards well-studied proteins, so the hubs partly measure how much attention a gene has received rather than how important it is.',
      'The honest version of “the graph found the answer” is “the graph agreed with the literature once we had already decided how to cut it”.',
    ],
    stack: ['Python', 'NetworkX', 'Community detection', 'Centrality analysis', 'STRING'],
    repo: { label: 'Network-Analysis-NSCLC', url: 'https://github.com/Lakshmi-Sindhu-P/Network-Analysis-NSCLC' },
  },
  {
    slug: 'repeat-listening',
    index: '03',
    group: 'work',
    title: 'Why a song survives the third listen',
    org: 'Illinois Institute of Technology',
    place: 'Chicago',
    period: '2024 · re-audited 2026',
    role: 'Regression coursework, then its own audit',
    deck: 'The first version reported R² 0.42. The export listed every track twice and the imputer had read the outcome. Rebuilt on 5,040 tracks the honest number is 0.085 — and unlike 0.42, it survives being held out.',
    chips: ['R² 0.42 → 0.085', '10,080 rows → 5,040 tracks', '200 splits'],
    figures: [
      { value: '0.085', label: 'R² of the rebuilt model: audio, genre and artist' },
      { value: '0.05', label: 'mean held-out R² across 200 random splits' },
      { value: '0.26', label: 'percentage points the three audio attributes add' },
    ],
    situation: [
      'Ten thousand rows of Spotify song attributes — danceability, energy, tempo, valence, plus artist and genre — and one target: how long a track actually gets played, stored as cumulative milliseconds.',
      'The first version reported R² 0.42 from a transformed OLS with interactions and shrinkage. It looked like a good result, which is exactly why it took a year to go back and check it.',
    ],
    work: [
      'Audited the file before modelling it. Every track appeared exactly twice, identical in all 22 columns, because the rows had been joined on a non-unique key: 10,080 rows for 5,040 tracks. The imputer was worse — the KNN pass had been fitted over all 22 columns including the outcome, so 550 rows had been filled from their own target.',
      'Rebuilt without imputation: 275 tracks missing audio features are excluded from the audio models and checked with an indicator model instead of being filled with invented values. Response on a log10 scale, predictors in natural units, effects reported per standard deviation, HC3 errors alongside the classical ones.',
    ],
    moved: [
      'R² fell to 0.085 — and, unlike 0.42, it holds: over 200 random 70/30 splits the mean held-out R² is 0.05. Genre and artist carry 8.3 of those points and each adds over the other; the three audio attributes contribute 0.26 points, detectable at p = 0.004 and not clearly positive out of sample.',
      'Splitting the response into its two behavioural margins changed the reading: energy raises the odds of being skipped by 1.22 per standard deviation, while among tracks played at least once its coefficient flips sign. Which of those is “the effect of energy” is a choice of question, not a fact about the data.',
    ],
    hard: [
      'The old “the model does not predict at all” claim was wrong too, for a duller reason: on the raw millisecond scale the identical specification averages −0.024, negative in 82% of splits, because a handful of enormous values dominate squared error.',
      'Unpruned, the same design reaches R² 0.57 — almost all of it 2,187 artist dummies fitted to 4,765 tracks — and scores worse than predicting the mean on held-out data. That is the number a leaderboard would have rewarded.',
      'None of it is causal, and the information the file does not contain is the context: mood, device, playlist position, and who is listening.',
    ],
    stack: ['R', 'RMarkdown', 'Robust standard errors', 'Specification curve', 'Leakage audit'],
    repo: { label: 'Enhanced-Spotify-Attribute-Analysis', url: 'https://github.com/Lakshmi-Sindhu-P/Enhanced-Spotify-Attribute-Analysis' },
  },
  {
    slug: 'clinical-notes',
    index: '04',
    group: 'independent',
    title: 'A consultation note that writes itself',
    org: 'Independent project',
    place: 'Chicago',
    period: '2025',
    role: 'Design and build',
    deck: 'Neurologists were writing notes thirty minutes after the patient had left the room, from memory. We moved the writing into the room.',
    chips: ['35 → 18 min', '96%+ transcription', '50+ evaluation sessions'],
    figures: [
      { value: '35→18', label: 'minutes of documentation per consultation' },
      { value: '96%+', label: 'transcription accuracy on the evaluation set' },
      { value: '50+', label: 'scripted evaluation sessions before release' },
    ],
    situation: [
      'A consultation is fifteen minutes of talking and thirty minutes of writing. The writing happens afterwards, so it happens from memory — and memory flattens exactly the details that matter in neurology: which side, how long, how often, getting worse or better.',
      'The ask was to make the note appear while the talking happened. The constraint nobody stated out loud was that a wrong note is worse than no note: it gets signed, filed, and read by someone who was not in the room.',
    ],
    work: [
      'A FastAPI service in front of a medical speech-to-text model, with an LLM summarisation layer whose output is structured into the note sections the clinic already used. Multi-turn memory keeps the thread when a consultation returns to an earlier complaint.',
      'The parts that were not modelling were most of the build: role-based access control on PostgreSQL so every read of a patient record is attributable, an audit trail designed before the prompt was tuned, and a scripted evaluation suite — over fifty sessions — that scored the output against what the clinician actually wrote.',
    ],
    moved: [
      'Documentation time fell from thirty to thirty-five minutes to about eighteen. The note is drafted in the room, and the clinician edits rather than composes.',
      'The evaluation suite turned an argument about quality into a list of failing cases: drug names transcribed wrong, negatives dropped, findings attributed to the wrong speaker. Those became the backlog.',
    ],
    hard: [
      'Speech-to-text on medication names is still the weak point, and a confidence score is not the same as a correct note.',
      'Summaries drop negations. “No weakness in the left arm” is one word away from the opposite clinical fact, and no metric catches that unless a clinician reads for it.',
      'Evaluation needs the people whose work you are changing. A dashboard that says 96% is not the same as a neurologist saying it sounds like her.',
    ],
    stack: ['FastAPI', 'Medical ASR', 'LLM summarisation', 'PostgreSQL', 'Role-based access control', 'Evaluation design'],
  },
  {
    slug: 'cluelattice',
    index: '05',
    group: 'independent',
    title: 'No claim without an artifact',
    org: 'Independent project',
    place: 'Chicago',
    period: '2026',
    role: 'Design, build, evaluation',
    deck: 'A security-triage research repository where every sentence in the documentation points at an artifact, a digest and a ledger entry — including the sentence that says the idea did not work.',
    chips: ['107,251 rows, 0 rejects', 'threshold frozen at 0.20', 'scenario 7 sealed'],
    figures: [
      { value: '107,251', label: 'CTU-13 flows accepted with zero rejected rows' },
      { value: '0.20', label: 'alert threshold frozen before the final measurement' },
      { value: '0/9', label: 'reviewer budgets where uncertainty routing beat model score' },
    ],
    situation: [
      'Security teams do not run out of alerts, they run out of reasons to believe one. The question I set was whether a provenance-first system — deterministic rules, supervised models, temporal features, and later an advisory LLM — could hand a junior reviewer a recommendation that separates what is observed, what is inferred, and what the telemetry simply does not support.',
      'The constraint came before the code: no claim may exist without an artifact that backs it, and a claim that fails its own check stays in the ledger with the refutation attached.',
    ],
    work: [
      'Built the bottom half of that system in Python 3.12 on a locked environment: two source adapters (IoT-23 Zeek, CTU-13 Argus) emitting typed canonical events, deterministic UUIDv5 identities, quality reports and checksum-backed dataset manifests — 107,251 rows accepted from Scenario 11 with zero rejects.',
      'Three feature generations under a leakage contract — 26 flow columns, a scenario-local behavioral family, and a prior-only causal family — each frozen before comparison, with a sealed-scenario guard so the holdout could not be used for tuning.',
      'A validation-only benchmark across rules, logistic regression, random forest, extra trees, histogram gradient boosting and a linear SVM, then a 450-policy simulated reviewer sweep. A results ledger is generated from JSON and machine-checked against an experiment registry, so the build fails if a claim drifts from its citation.',
    ],
    moved: [
      'The useful result was negative: ranking alerts by model score retrieved at least as many true positives as threshold-distance “uncertainty” routing at zero of nine reviewer budgets, on all six stage-1 captures. A plausible idea, tested properly, and written down as refuted.',
      'The causal feature family cut the cases both models missed from 68,353 to 64,986 — 4.9%, concentrated in one subgroup — and no single operating point improved. It is recorded as a localized hypothesis, not promoted into the policy.',
    ],
    hard: [
      'Unknown-label rows dominate a real capture, and excluding them from supervised metrics shrinks the sample every claim rests on. Saying so costs headline numbers, which is the reason to say it.',
      'The sealed scenario can be opened exactly once, so every experiment that touches it spends something that cannot be replaced.',
      'The parts that would make it operational — finding aggregation, evidence retrieval, LLM triage, the human review tier — are planned and documented, not implemented. The repository says that in its first table rather than its last paragraph.',
    ],
    stack: ['Python 3.12', 'Pydantic', 'Parquet / DuckDB', 'scikit-learn', 'pytest', 'mypy', 'CI'],
    repo: { label: 'ClueLattice', url: 'https://github.com/Lakshmi-Sindhu-P/ClueLattice' },
  },
];

export const recordBySlug = (slug: string) => records.find((r) => r.slug === slug);

export const workRecords = records.filter((r) => r.group === 'work');
export const independentRecords = records.filter((r) => r.group === 'independent');

/** Smaller shipped work — real entries, no padding. */
export type SideProject = {
  title: string;
  detail: string;
  note: string;
  url?: string;
  /** Shown instead of a link when there is no public code. */
  linkNote?: string;
};

export const alsoShipped: SideProject[] = [
  {
    title: 'S&P 500 forecasting',
    detail: '23,323 daily records, 1927–2024 · LSTM with a Streamlit front end',
    linkNote: 'Repo private',
    note: 'Ninety-seven years of daily closes, an LSTM reading sixty-day windows, and a Streamlit page that lets you pick a ticker. The useful lesson was how quickly a model on that much history runs out of things to say about next week, and how much of the accuracy was the market drifting upward.',
  },
  {
    title: 'Driver drowsiness detection',
    detail: '93% accuracy, 7% false positives, 30–50 ms latency · OpenCV',
    linkNote: 'No public code',
    note: 'A webcam, an eye-aspect-ratio calculation, and a threshold that had to fire in under fifty milliseconds, because the cost of a miss is a car. The false-positive rate mattered more than the accuracy — a system that beeps at every blink gets switched off.',
  },
  {
    title: 'Banking fraud pipelines',
    detail: '10M+ transactions · Spark SQL, Delta Live Tables, transfer validation',
    linkNote: 'Client work — no public code',
    note: 'Ten million transactions through Spark SQL and Delta Live Tables, with schema enforcement and transfer validation at the boundary. The 183,000 labelled fraud cases existed to answer one question: did the pipeline silently drop the rows that mattered?',
  },
  {
    title: 'YouTube trending analysis',
    detail: '40,000 videos across four countries',
    note: 'Four national trending pages and forty thousand videos, asking what actually separates a video that trends in India from one that trends in the United States. Most of the answer was timing and channel size, not content.',
    url: 'https://github.com/Lakshmi-Sindhu-P/Youtube-Trending-Video-Analysis',
  },
  {
    title: 'AI email generator',
    detail: '60+ unit tests · 70% faster composition',
    note: 'A Streamlit app that drafts two emails in different tones and five subject lines from a few inputs. Sixty tests on prompt output taught me more about evaluation than the prompt did: most of the work was deciding what a wrong draft looks like.',
    url: 'https://github.com/Lakshmi-Sindhu-P/ai-email-generator',
  },
  {
    title: 'Atlas voice travel guide',
    detail: 'LiveKit, voice activity detection, GPT-4o tool calling',
    note: 'A voice-first agent that hears a request, looks up listings by city, and books by confirmation number without a keyboard. The hard part was never the prompt — it was latency and interruption: knowing when to stop talking.',
    url: 'https://github.com/Lakshmi-Sindhu-P/Atlas',
  },
];
