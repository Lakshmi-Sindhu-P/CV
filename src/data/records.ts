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
  },
  {
    slug: 'repeat-listening',
    index: '03',
    group: 'work',
    title: 'Why a song survives the third listen',
    org: 'Illinois Institute of Technology',
    place: 'Chicago',
    period: '2024',
    role: 'Regression modelling coursework, extended',
    deck: 'A baseline explained four per cent of why people keep a track. The rebuild explained forty-two — and found the leak that made the question harder than it looked.',
    chips: ['R² 0.04 → 0.42', '10,080 tracks', 'one leak found'],
    figures: [
      { value: '0.04', label: 'R² of the first, untransformed model' },
      { value: '0.42', label: 'R² after transformation, interactions, and shrinkage' },
      { value: '10,080', label: 'tracks in the working sample' },
    ],
    situation: [
      'The dataset had ten thousand tracks and the audio features every streaming platform exposes: danceability, energy, tempo, valence, acousticness, plus artist and genre metadata. Engagement was the target.',
      'The first model was a straight OLS on raw features. It explained four per cent of variance, which is the correct answer to the wrong question.',
    ],
    work: [
      'Log-transformed the skewed target, added interactions between energy and tempo and between artist popularity and genre, then moved to Ridge and Lasso with cross-validated shrinkage so the interaction terms earned their place.',
      'Then diagnostics rather than more features: residual plots by genre, leverage points by artist, and a hard look at what “popular” actually encodes.',
    ],
    moved: [
      'R² went from 0.04 to 0.42. Genre, artist popularity, tempo, and energy were the stable predictors across folds.',
      'The more useful result was the leak: artist popularity is downstream of the outcome. A track is popular because people play it, so the model was partly predicting the thing it was trying to explain.',
    ],
    hard: [
      'Once you remove the leak, the audio features explain much less — which is the honest finding and also the less quotable one.',
      'The outliers were more interesting than the fit: tracks that are structurally ordinary and still get returned to.',
      'Everything here is observational. It measures what correlates with repetition, not what causes it.',
    ],
    stack: ['R', 'Python', 'Ridge / Lasso', 'Regression diagnostics', 'Cross-validation'],
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
];

export const recordBySlug = (slug: string) => records.find((r) => r.slug === slug);

export const workRecords = records.filter((r) => r.group === 'work');
export const independentRecords = records.filter((r) => r.group === 'independent');

/** Smaller shipped work — real entries, no padding. */
export const alsoShipped = [
  { title: 'S&P 500 forecasting', detail: '23,323 daily records, 1927–2024 · LSTM with a Streamlit front end' },
  { title: 'Driver drowsiness detection', detail: '93% accuracy, 7% false positives, 30–50 ms latency · OpenCV' },
  { title: 'Banking fraud pipelines', detail: '10M+ transactions · Spark SQL, Delta Live Tables, transfer validation' },
  { title: 'YouTube trending analysis', detail: '40,000 videos across four countries' },
  { title: 'AI email generator', detail: '60+ unit tests · 70% faster composition' },
  { title: 'Atlas voice travel guide', detail: 'LiveKit, voice activity detection, GPT-4o tool calling' },
];
