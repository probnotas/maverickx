/**
 * ALL site copy lives here. Layout files contain no words.
 * Source: "MaverickX Germanium Pitch: Website Plan" (rev 43) + the team's
 * planning notes. Do not add facts that are not in those documents.
 *
 * Rich text: wrap a number as [[visible text|sourceId]] and it renders as a
 * link to that source. sourceId "math" opens the Economics file (our
 * estimates); "test" opens the Plan file. Search for "TODO" before launch.
 */

export type SourceId = keyof typeof sources;

export interface Source {
  label: string;
  href?: string; // omitted = private source (no public link exists)
}

export const sources = {
  // Panels (internal links for our own estimates)
  math: { label: "Our estimate, see 03 Economics", href: "#file-economics" },
  test: { label: "Our proposal, see 05 Plan", href: "#file-plan" },

  // Titan / Teck
  titanQ2: {
    label: "Titan Q2 2026 corporate update: two processing pathways",
    href: "https://www.titanminingcorp.com/_resources/presentations/2026-Titan-Mining-Quarterly-Update-Presentation-Q2-2026.pdf",
  },
  titanQ1: {
    label: "Titan Q1 2026 results: germanium mainly in mica and gangue",
    href: "https://wwww.stockwatch.com/News/Item/Z-C!TI-3819483/C/TI",
  },
  titanApr: {
    label: "Titan, Apr 16, 2026: discussions with multiple counterparties",
    href: "https://titanminingcorp.com/_resources/news/2026-04-16-nr-titan.pdf",
  },
  titanJul: {
    label: "Titan, Jul 7, 2026: district-wide enrichment, mineralogy studies underway",
    href: "https://titanminingcorp.com/_resources/news/nr-20260707.pdf",
  },
  titanTeck: {
    label: "Titan Mining: cooperation agreement with Teck (May 13, 2026)",
    href: "https://www.titanminingcorp.com/_resources/news/2026-05-13-nr-titan.pdf",
  },
  marketscreener: {
    label: "MarketScreener: Titan–Teck agreement scope",
    href: "https://in.marketscreener.com/news/titan-mining-corporation-and-teck-resources-limited-enter-cooperation-agreement-to-evaluate-germaniu-ce7f5bdcd88ff125",
  },
  miningcom: {
    label: "Mining.com: Titan, Teck team up on germanium",
    href: "https://www.mining.com/?p=1206108",
  },
  mtnTitan: {
    label: "Metal Tech News: Titan evaluates Empire State germanium",
    href: "https://www.metaltechnews.com/story/2026/07/08/tech-metals/titan-evaluates-empire-state-germanium/2827.html",
  },
  smmTitan: {
    label: "SMM: Titan district-wide germanium, ~$78M/yr",
    href: "https://news.metal.com/en/newscontent/103995020-smm-flashdistrict-wide-germanium-enrichment-at-new-york-zinc-mine-potentially-adding-us78-million-in-annual-revenue",
  },
  teckTrail: {
    label: "Teck: Strategic Investment Agreement for Trail (Jul 7, 2026)",
    href: "https://www.bnnbloomberg.ca/press-releases/2026/07/08/teck-canada-growth-fund-and-canada-critical-minerals-accelerator-sign-agreement-to-support-strategic-metals-production-at-trail-smelter/",
  },
  cpTrail: {
    label: "Canadian Press: Ottawa to invest up to $400M in Trail",
    href: "https://www.castanetkamloops.net/news/Trail/623605/Ottawa-to-invest-up-to-400-million-in-Teck-critical-minerals-smelter-in-BC",
  },

  // Supply, price, policy
  usgs: {
    label: "USGS Mineral Commodity Summaries 2026: Germanium",
    href: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-germanium.pdf",
  },
  payne: {
    label: "Payne Institute: North American germanium supply chain",
    href: "https://payneinstitute.mines.edu/the-north-american-germanium-supply-chain-military-applications-and-civilian-competition/",
  },
  sp: {
    label: "S&P Global: Germanium Market Report (Aug 2026)",
    href: "https://www.spglobal.com/content/dam/spglobal/global-assets/en/special-reports/critical-mineral-market-reports/Market%20Report%20-%20Germanium%20-%2008052026.pdf",
  },
  mmta: {
    label: "MMTA/Fastmarkets: AI and defence boost germanium demand",
    href: "https://mmta.co.uk/ai-and-defence-boost-germanium-demand-and-spark-substitution-risks/",
  },
  mtnAllies: {
    label: "Metal Tech News: Allies race to rebuild germanium supply",
    href: "https://www.metaltechnews.com/story/2026/08/24/critical-minerals-alliances-2026/allies-race-to-rebuild-germanium-supply/2903.html",
  },
  evertiq: {
    label: "Evertiq: China suspends gallium and germanium ban to Nov 27, 2026",
    href: "https://evertiq.com/news/2025-11-10-china-suspends-ban-on-gallium-and-germanium-exports-to-the-us",
  },
  skillings: {
    label: "Skillings: Gallium and germanium 12 months after export controls",
    href: "https://skillings.net/gallium-germanium-12-months-after-export-controls-where-is-the-supply",
  },
  pennState: {
    label: "Penn State: Germanium review, <3% recovered",
    href: "https://pure.psu.edu/en/publications/germanium-a-review-of-its-us-demand-uses-resources-chemistry-and-/",
  },
  smmWeekly: {
    label: "SMM: Germanium weekly review, Oct 10, 2026",
    href: "https://news.metal.com/newscontent/104149364-supply-demand-pattern-unchanged-germanium-prices-continue-to-consolidate-on-a-strong-note-smm-germanium-market-weekly-review",
  },

  // Chemistry
  hzdr: {
    label: "HZDR (GeoSaxonia 2024): DFOB captures Ga and Ge, EDTA releases >90%",
    href: "https://www.dggv.de/e-publikationen/siderophore-assisted-recycling-of-gallium-and-germanium-from-their-low-concentrated-wastewaters/",
  },
  goldschmidt: {
    label: "Goldschmidt 2023: siderophore recovery of critical metals from mining residues",
    href: "https://goldschmidtabstracts.info/2023/15591.pdf",
  },
  cordis: {
    label: "CORDIS: GaLIophore project, 10 capture-release cycles",
    href: "https://cordis.europa.eu/project/id/704852/reporting/fr",
  },
  iitd: {
    label: "IIT Delhi thesis: DFOB recovered ~44% Ga with 53 mg/L iron",
    href: "https://ir.iitd.ac.in/bitstreams/0dd50c2e-f929-44c0-81d8-951971a3558b/download",
  },
  mdpi: {
    label: "MDPI: Germanium recovery, tannin dose",
    href: "https://www2.mdpi.com/2075-163X/10/4/358",
  },
  cdc: {
    label: "CDC/US Bureau of Mines: germanium recovery from leach solutions",
    href: "https://stacks.cdc.gov/view/cdc/220131/cdc_220131_DS1.pdf",
  },
  patent: {
    label: "Patent: low-grade germanium concentrate costs",
    href: "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9963761",
  },
  geosaxonia: {
    label: "GeoSaxonia 2024: GaLIophore siderophore recovery of Ga and Ge",
    href: "https://geosaxonia2024.de/GeoSaxonia2024_Agenda/www.conftool.pro/geosaxonia2024/indexc94d.html",
  },
  eraLearn: {
    label: "ERA-LEARN: SIDEREC siderophore project",
    href: "https://era-learn.eu/network-information/networks/era-min-2/era-min-joint-call-2018/siderophores-assisted-biorecovery-of-technology-critical-elements-gallium-ga-germanium-ge-and-indium-in-from-end-of-life-products",
  },

  // Demand
  optica: {
    label: "Optica: NVIDIA co-packaged optics for AI factories",
    href: "https://www.optica-opn.org/home/industry/2025/march/nvidia_looks_to_co-packaged_optics_for_ai_factories/",
  },
  tested3d: {
    label: "3DTested: NVIDIA says CPO a requirement for AI data centers",
    href: "https://www.3dtested.com/networking/nvidia-outlines-plans-for-using-light-for-communication-between-ai-gpus-by-2026-silicon-photonics-and-co-packaged-optics-may-become-mandatory-for-next-gen-ai-data-centers",
  },
  rnm: {
    label: "Research and Markets: germanium in silicon photonics",
    href: "https://www.researchandmarkets.com/report/germanium",
  },
  navitas: {
    label: "Navitas: GaN for NVIDIA 800V HVDC",
    href: "https://archive.navitassemi.com/navitas-developing-next-generation-800-v-hvdc-architecture-with-nvidia/",
  },
  st: {
    label: "ST: 800V HVDC power boards for AI data centers",
    href: "https://blog.st.com/800-v-hvdc-data-center/",
  },
  dcd: {
    label: "DCD: Corning and Meta $6B fiber deal",
    href: "https://www.datacenterdynamics.com/en/news/corning-meta-sign-6bn-fiber-deal-to-support-us-data-center-boom/",
  },

  // Private (no public link)
  suman: {
    label: "Suman's call transcript and emailed follow-up answers (siderophore cost, germanium tests, reuse, email preference)",
  },
  experts: {
    label: "Team emails with experts, Oct 23–26, 2026 (private)",
  },
} satisfies Record<string, Source>;

/** Order of the footer sources list (internal panel links are excluded). */
export const sourceList: SourceId[] = [
  "titanQ2", "titanQ1", "titanApr", "titanJul", "hzdr", "goldschmidt", "cordis",
  "iitd", "titanTeck", "marketscreener", "miningcom", "mtnTitan", "smmTitan",
  "teckTrail", "cpTrail", "usgs", "payne", "sp", "mmta", "mtnAllies", "evertiq",
  "skillings", "pennState", "mdpi", "cdc", "patent", "geosaxonia", "eraLearn",
  "optica", "tested3d", "rnm", "navitas", "st", "smmWeekly", "dcd", "suman",
];

/* ------------------------------------------------------------------ */
/* Media. Swap files in /public; paths stay the same.                  */
/* ------------------------------------------------------------------ */

export const media = {
  // MaverickX's logo, supplied by the team. on-dark = white lettering.
  brand: {
    logo: "/img/brand/maverickx-logo.png",
    logoOnDark: "/img/brand/maverickx-logo-on-dark.png",
    mark: "/img/brand/maverickx-mark.png",
    alt: "MaverickX",
  },
  desk: {
    src: "/img/desk/desk-2560.jpg",
    srcSmall: "/img/desk/desk-1440.jpg",
    alt: "A dark industrial lab bench at night with a vintage computer, rock core samples, a jar of grey mine tailings, a chunk of ore and lab glassware, and a lit refinery through the window.",
    /** Image aspect. The screen's outline lives in src/screenShape.ts:
     *  if you replace the image, run scripts/trace-screen.py. */
    width: 2720,
    height: 1536,
    /** The monitor's round power button (centre, fractions of width/height;
     *  size as a fraction of width). Re-measure if you replace the image. */
    power: { x: 0.5632, y: 0.7148, size: 0.0096 },
  },
};

/* ------------------------------------------------------------------ */
/* Site chrome                                                          */
/* ------------------------------------------------------------------ */

export const site = {
  logo: "Pitch", // shown after the MaverickX logo in the corner
  logoLabel: "Maverick Pitch, germanium recovery pitch to MaverickX",
  skipLink: "Skip to the files",
  close: "Close",
  closeLabel: "Close window",
  nextPrefix: "Next",
  bottomLineLabel: "Bottom line",
  estimateTag: "our estimate",
  paraphraseTag: "paraphrased",
  sourcesFolder: "Sources",
  openHint: "Open a file",
};

/* 1. DESK INTRO -------------------------------------------------------- */
export const desk = {
  headline: "Germanium is hiding in waste.",
  // ≤25 words
  sub: "Up to [[13,000 kg a year|titanTeck]] sits in one mine's waste. MaverickX has already cracked the mineral it hides in.",
  powerKicker: "Power on",
  powerArrow: "Click this",
  powerArrowTouch: "Tap this",
  powerLabel: "Turn on the computer",
  skip: "Skip the intro",
};

/* Boot screen, shown while the computer starts ----------------------- */
export const boot = {
  title: "Maverick Pitch",
  sub: "Starting up…",
  // "Extensions" that load along the bottom of the boot screen.
  icons: ["/img/cards/mica-cutout.png", "/img/cards/molecule-cutout.png", "/img/cards/flask-cutout.png"],
};

/* 2. DESKTOP ----------------------------------------------------------- */
export const desktop = {
  menu: {
    brand: "Maverick Pitch",
    sources: "Sources",
    shutdown: "Shut Down",
    runTest: "Run the test",
  },
  // The one window on screen: the six files, in reading order.
  folder: {
    title: "Maverick Pitch",
    guide: "Read the files in order, starting with 01. Each one ends with a button to the next.",
    startHere: "Start here",
    nextUp: "Next",
    read: "Read",
    // {n} is replaced with how many files have been opened.
    progress: "{n} of 6 read",
  },
  trash: "Trash",
};

/* The Trash: ideas we tested and killed ------------------------------ */
export const trash = {
  title: "Trash",
  heading: "How we got here: 2 ideas killed by the numbers",
  items: [
    { who: "Data center biofilm cleaning", does: "The industry is moving to PG25 glycol, enzyme biofilm cleaners already exist, and it isn't MaverickX's enzyme." },
    { who: "Produced-water pretreatment", does: "Target is about $0.10–0.20 per barrel, but single-use siderophore math is about $55+ per barrel for iron alone. Cheap competitors exist (ZwitterCo, TETRA's patented pretreatment)." },
  ],
  why: "Iron is cheap, so an expensive reagent can never pay. Germanium is worth thousands of dollars per kg, so a reagent can still leave a margin.",
};

/* 3. FILES ------------------------------------------------------------- */
/*
 * One file per question Suman asks (the "sieves"), in order. Each window is
 * a list of blocks; the renderer only knows block kinds, never words.
 */

export interface Table {
  caption?: string;
  head: string[];
  rows: string[][];
  note?: string;
}

export type Block =
  | { kind: "lede"; text: string }
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "stats"; items: { value: string; label: string }[] }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; table: Table }
  | { kind: "flow"; steps: { who: string; what: string; ours?: boolean }[]; note?: string }
  | { kind: "cards"; items: { title: string; text: string; chips: string[]; img?: string }[] }
  | { kind: "gates"; phases: { weeks: string; name: string; steps: string[]; gate: string; pass: string }[]; note: string }
  | { kind: "quotes"; items: ExpertQuote[]; note: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "people"; items: { who: string; does: string }[] }
  | { kind: "button"; text: string };

export interface PitchFile {
  id: "problem" | "solution" | "economics" | "evidence" | "plan" | "readme";
  name: string; // icon label
  filename: string; // window title bar
  question: string; // Suman's question this file answers
  title: string;
  blocks: Block[];
  bottomLine: string;
}

export interface ExpertQuote {
  name: string;
  role: string;
  org: string;
  quote: string; // one line
  kind: "quote" | "paraphrase"; // paraphrase = not their exact words
  validates: string;
  /** Default "role-only" until each person confirms they can be named. */
  permission: "named" | "role-only";
}

export const experts: ExpertQuote[] = [
  {
    name: "Bendix De Meulemeester",
    role: "Director, Marketing & Business Development",
    org: "Umicore Electro-Optic Materials",
    quote: "We are always interested in new ways to recover metals.",
    kind: "quote",
    validates: "A major germanium refiner wants to hear more",
    permission: "role-only",
  },
  {
    name: "Dirk Tischler",
    role: "Professor",
    org: "Ruhr University Bochum",
    quote: "By changing pH you might be able to release it.",
    kind: "quote",
    validates: "Siderophores bind germanium; release by pH, alongside EDTA",
    permission: "role-only",
  },
  {
    name: "Gisele Azimi",
    role: "Canada Research Chair in Urban Mining",
    org: "University of Toronto",
    quote: "The potential application of siderophores for germanium recovery is certainly worth investigating.",
    kind: "quote",
    validates: "The idea is credible; reuse is the key number",
    permission: "role-only",
  },
  {
    name: "Charles Nyabeze",
    role: "EVP Business Development, CEMI; Director",
    org: "MICA Network",
    quote: "Teck's Trail is “likely one of the strongest candidates” for germanium from zinc-processing streams.",
    kind: "paraphrase",
    validates: "Trail as the right partner; a pilot checklist",
    permission: "role-only",
  },
  {
    name: "Mary Anne Alvin",
    role: "Senior Technology Manager",
    org: "US DOE critical minerals office",
    quote: "It's not so much the cost of the reagent … but the over cost of the total system.",
    kind: "quote",
    validates: "Judge total process cost, not just siderophore cost",
    permission: "role-only",
  },
  {
    name: "Anna Kaksonen",
    role: "Team Leader, Resource Recovery",
    org: "CSIRO",
    quote: "Waste choice depends on composition, mineralogy, particle size and acid consumption.",
    kind: "paraphrase",
    validates: "The cost model to build next",
    permission: "role-only",
  },
  {
    name: "Ian Lange",
    role: "Professor",
    org: "Colorado School of Mines",
    quote: "On who pays a premium for non-Chinese germanium: “defense.”",
    kind: "paraphrase",
    validates: "Who the end buyers are",
    permission: "role-only",
  },
];

export const files: PitchFile[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "problem",
    name: "Problem",
    filename: "01 Problem",
    question: "Is this worth my attention?",
    title: "Almost none of the germanium in industrial waste gets recovered.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "[[<3%|pennState]]", label: "of the germanium in zinc ores and fly ash is ever recovered" },
          { value: "[[~60%|skillings]]", label: "of world germanium supply is controlled by China" },
          { value: "[[Nov 27, 2026|evertiq]]", label: "China's US export-ban pause ends" },
        ],
      },
      { kind: "p", text: "Germanium is never mined on its own. It's scraped out of zinc processing with harsh chemistry, and the US had [[no primary refinery production|mtnAllies]] in 2025. US metal imports fell from [[21,000 to 7,000 kg|payne]] between 2024 and 2025." },
      { kind: "h", text: "A real site is choosing a partner now" },
      {
        kind: "stats",
        items: [
          { value: "[[up to ~13,000 kg/yr|titanTeck]]", label: "contained germanium Titan and Teck are evaluating at the Empire State Mine" },
          { value: "[[~$78M/yr|smmTitan]]", label: "value of that germanium at $6,000/kg" },
        ],
      },
      { kind: "p", text: "Titan is weighing two routes at once: a concentrate to Teck's Trail, or an “owned or partnered hydrometallurgical facility” ([[Titan Q2 2026|titanQ2]]). It's in discussions with [[multiple counterparties|titanApr]] and running [[mineralogy studies|titanJul]] to pick the route. The partner slot is open now; it may not be in 6–12 months." },
      { kind: "h", text: "Why the demand holds" },
      { kind: "p", text: "Fiber is the largest germanium use: [[142 t in 2026|sp]]. Corning is supplying Meta under a fiber deal worth [[up to $6B through 2030|dcd]]. Asked who pays a premium for non-Chinese germanium, a professor at the Colorado School of Mines said: “defense.”" },
      { kind: "callout", title: "The counterpoint", text: "High prices are already pushing some buyers to substitutes, mainly in [[infrared optics and solder|mmta]]. Fiber and photonics are the stickier demand." },
      { kind: "p", text: "Samples are [[too small to establish a resource|mtnTitan]], so we always say “up to” and “being evaluated.”" },
    ],
    bottomLine: "There is a real, dated supply problem, the metal is already sitting in waste that someone owns, and a named site is looking for a way to recover it.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "solution",
    name: "Solution",
    filename: "02 Solution",
    question: "Does it use what we already have?",
    title: "Take the siderophore MaverickX already makes and point it at a new target.",
    blocks: [
      {
        kind: "flow",
        steps: [
          { who: "Titan", what: "Leaches germanium out of its mine waste into a liquid" },
          { who: "MaverickX siderophore", what: "Captures germanium from that liquid, at Titan's site", ours: true },
          { who: "Titan", what: "Ships the concentrate to Teck in Trail, BC" },
          { who: "Teck", what: "Refines it and sells to fiber, photonics and defense buyers" },
        ],
        note: "MaverickX touches one step. It doesn't replace Teck's refinery; it upgrades Titan's dilute liquid into a concentrate Trail can take.",
      },
      {
        kind: "cards",
        items: [
          {
            title: "Already cracked mica",
            text: "Titan's germanium sits mainly in mica. Your siderophore already released 98.5% of the lithium from lepidolite, a mica.",
            chips: ["[[98.5%|suman]] lithium from lepidolite", "Titan's Ge sits in [[mica|titanQ1]]"],
            img: "/img/cards/mica-cutout.png",
          },
          {
            title: "Known chemistry",
            text: "Siderophores capture germanium. EDTA releases over 90% and regenerates them, and 10 reuse cycles have been shown.",
            chips: ["[[>90%|hzdr]] released (EDTA)", "[[10|cordis]] reuse cycles", "[[pH release|experts]]"],
            img: "/img/cards/molecule-cutout.png",
          },
          {
            title: "A paid test",
            text: "90 days, 3 gates, customer-paid, about one scientist part-time.",
            chips: ["[[90 days|test]]", "[[3 gates|test]]", "[[customer-paid|math]]"],
            img: "/img/cards/flask-cutout.png",
          },
        ],
      },
      { kind: "callout", title: "Hypothesis, not a result", text: "Published germanium work uses the siderophore DFOB ([[HZDR|hzdr]], [[ERA-LEARN|eraLearn]]). We don't know which siderophore MaverickX tested on germanium, or the results. The test answers both." },
      { kind: "h", text: "Three of eight pieces are already in place" },
      {
        kind: "table",
        table: {
          head: ["Requirement", "What MaverickX already has", "What's missing", "Effort"],
          rows: [
            ["A product to test", "A siderophore in production as crude broth, [[“a few hundred dollars” per kg|suman]]", "Nothing", "Low"],
            ["Getting germanium out of the rock", "Titan's germanium sits mainly in [[mica|titanQ1]]. The siderophore released [[98.5%|suman]] of the lithium from lepidolite, a mica", "Same test on Titan's mica tailings", "Low"],
            ["Capturing germanium from the liquid", "Tested on germanium-bearing liquids, results unknown. DFOB binds germanium best at acidic pH with chloride present ([[HZDR|hzdr]])", "Which siderophore they used, and the capture % on Titan's liquid", "Medium"],
            ["Iron getting in the way", "Siderophores evolved to grab iron. DFOB recovered only [[~44% of gallium|iitd]] from a liquid with 53 mg/L iron", "Remove iron first, or tune pH to favour germanium", "High"],
            ["Releasing germanium and reusing the siderophore", "“In the works” (Suman). EDTA at pH 3.5 releases [[over 90%|hzdr]]; [[10 cycles|cordis]] were run for gallium", "Test that recipe on their siderophore", "Medium"],
            ["Measuring results", "They already outsource lab analysis ([[~$500 per 10 HPLC samples|suman]])", "Outside germanium assays, same model", "Low"],
            ["Making it at volume", "A prototype bioreactor up to [[750 L|suman]]", "About 10–250 t/yr of siderophore at full scale (our estimate), so a contract manufacturer", "High"],
            ["Fitting Teck's refinery", "Nothing yet", "Teck's minimum feed spec, which Titan and Teck are [[defining now|marketscreener]]", "Medium"],
          ],
        },
      },
      { kind: "callout", title: "The honest comparison", text: "By mass, siderophore use (8–19 g per g germanium, single use, our estimate) is similar to tannin ([[8–10 g|mdpi]]). Tannin is a cheap commodity, so MaverickX has to win on selectivity or reuse, not price per kg." },
    ],
    bottomLine: "The hardest part of most germanium projects is getting it out of the rock, and MaverickX has already done that on a mica. The biggest risk: the same iron-grabbing can crowd germanium out at the capture step.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "economics",
    name: "Economics",
    filename: "03 Economics",
    question: "Do the economics work?",
    title: "The test roughly pays for itself. The upside is millions a year.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "~$0", label: "net to try: the test fee roughly covers the cost (our estimate)" },
          { value: "$3.9–7.8M", label: "a year in royalties if it works (our estimate)" },
        ],
      },
      {
        kind: "table",
        table: {
          caption: "Cost of trying vs. the upside (our estimates)",
          head: ["", "90-day test", "If it works and scales"],
          rows: [
            ["Cash out", "~$30–80k: scientist time, small siderophore batches, outside germanium assays", "Siderophore made by a contract manufacturer, paid for by the customer"],
            ["Cash in", "Test fee from Titan, ~$25–75k", "5–10% royalty, ~$3.9–7.8M/yr at [[$6,000/kg|payne]] on [[13,000 kg/yr|titanTeck]], plus siderophore sales"],
            ["Team time", "~1 scientist, part-time, 12 weeks", "Grows with volume; routine testing shifts to the customer"],
            ["Worst case", "Lose the gap between cost and fee, a few $10k at most", "Gates stop it before big spending"],
            ["Strategic gain", "Real data on Titan's mica; back into mining with a paying partner", "A second revenue line beside oil and gas"],
          ],
        },
      },
      { kind: "p", text: "Expected value, roughly: even at a 10% chance of success, 0.1 × $3.9M/yr ≈ $390k/yr of expected royalty, against a test that pays for itself (our estimate)." },
      { kind: "h", text: "Reuse is the make-or-break number" },
      {
        kind: "table",
        table: {
          caption: "Siderophore cost per kg of germanium recovered (our estimate)",
          head: ["Case", "Siderophore per kg Ge", "Cost per kg Ge", "Margin at $6,000/kg (Western)", "Margin at ~$3,800/kg (China)"],
          rows: [
            ["Small siderophore, single use", "~8 kg", "~$2,400", "~$3,600", "~$1,400"],
            ["Pyoverdine, single use", "~19 kg", "~$5,800", "~$200", "loses ~$2,000"],
            ["Small siderophore, reused 10×", "~0.8 kg", "~$240", "~$5,760", "~$3,560"],
            ["Pyoverdine, reused 10×", "~1.9 kg", "~$580", "~$5,420", "~$3,220"],
          ],
          note: "Assumes [[$300/kg siderophore|suman]], 1:1 binding, 100% capture, so real numbers will be worse. Western spot ran [[$6,150–6,250/kg|payne]] in Jun–Jul 2026. China price is approximate (27,250 yuan/kg on Oct 9, 2026, at ~7.1 yuan per dollar; [[SMM|smmWeekly]]).",
        },
      },
      { kind: "callout", title: "Why this works when iron didn't", text: "Produced-water pretreatment failed because the target was $0.10–0.20 per barrel and single-use siderophore cost about $55+ per barrel. Germanium is worth thousands of dollars per kg, so the reagent can still leave a margin." },
      { kind: "h", text: "The offer, step by step" },
      {
        kind: "people",
        items: [
          { who: "Now", does: "A paid 90-day lab test on Titan's waste samples, estimated $25–75k." },
          { who: "2027–28", does: "A paid on-site pilot, cost shared by Titan and government grants." },
          { who: "2029+", does: "Siderophore supply plus a 5–10% royalty: ~$3.9–7.8M/yr at $6,000/kg on 13,000 kg (our estimate)." },
        ],
      },
      { kind: "p", text: "MaverickX's own cost per phase (team estimates, not verified): 90-day test ~$30–80k, roughly covered by the test fee; pilot ~$0.5–2M, mostly covered by Titan and grants; full scale through a contract manufacturer, so MaverickX doesn't build a plant." },
    ],
    bottomLine: "Reused, it works at any price. Single-use pyoverdine only breaks even at Western prices. Suman said reuse is “in the works,” so the 90-day test is exactly how to find out.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "evidence",
    name: "Evidence",
    filename: "04 Evidence",
    question: "Is anyone really asking for this?",
    title: "We didn't just think about it. We asked.",
    blocks: [
      { kind: "lede", text: "We emailed more than 30 people across refiners, mining networks, labs and government; 10 replied between Oct 23 and 26." },
      { kind: "quotes", items: experts, note: "Names withheld until each person confirms." },
      { kind: "h", text: "What it changed in our plan" },
      {
        kind: "list",
        items: [
          "The 90-day test gets four MICA items it didn't cover: a full mass balance, testing against zinc, lead, cadmium and arsenic as well as iron, environmental and biosafety checks, and a scale-up and IP plan.",
          "Cost is shown for the whole process, not just siderophore per kg.",
          "Two backup sites beyond Titan: Glencore's CEZinc in Quebec and the Winston Mine tailings near Thunder Bay.",
          "Release has two routes to test: EDTA at low pH ([[HZDR|hzdr]]) and a simple pH shift.",
        ],
      },
      { kind: "h", text: "The money is already moving" },
      {
        kind: "list",
        items: [
          "Canada: up to [[C$400M|cpTrail]] from the Canada Growth Fund into Teck's Trail smelter. Teck's expansion could double germanium output and add gallium capacity ([[Teck|teckTrail]]).",
          "US: Defense Production Act awards of $18.1M to 5N Plus and $18.5M to Lattice Materials ([[Payne Institute|payne]]).",
          "Titan + Teck: jointly defining the minimum feed specs Trail needs from Titan's waste ([[MarketScreener|marketscreener]]).",
        ],
      },
      { kind: "callout", title: "What nobody has said yet", text: "None of these companies has said they want a siderophore. They want a way to upgrade the waste; we're offering one to test." },
    ],
    bottomLine: "Big, recognizable companies are already spending on this problem, and we've done the legwork to talk to people. We're honest about what nobody has confirmed yet.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "plan",
    name: "Plan",
    filename: "05 Plan",
    question: "Is it low-risk and low-effort for my team?",
    title: "90 days. Three gates. Stop if any fails.",
    blocks: [
      { kind: "lede", text: "The test is built so the expensive question (making siderophore at volume) is never asked until three cheap questions are answered." },
      {
        kind: "gates",
        phases: [
          { weeks: "Weeks 1–4", name: "Leach", steps: ["Titan ships mica tailings", "Siderophore leach tests", "Assay Ge in the liquid"], gate: "Gate 1", pass: "50%+ of Ge leached out of Titan's mica" },
          { weeks: "Weeks 5–8", name: "Capture", steps: ["Capture Ge from the leach", "Test with iron present", "Try iron removal or pH"], gate: "Gate 2", pass: "70%+ of dissolved Ge captured despite iron" },
          { weeks: "Weeks 9–12", name: "Release", steps: ["Release Ge, reuse 3+ times", "Make a small concentrate", "Send it to Teck for spec"], gate: "Gate 3", pass: "90%+ released, 3+ reuses, and Teck accepts the spec" },
        ],
        note: "Thresholds are our proposal. Fail any gate: stop. Spending so far stays roughly covered by the test fee.",
      },
      { kind: "p", text: "Why these thresholds: Gate 1 at 50% means at least half the germanium is reachable. Gate 3's 90% release matches what the [[HZDR team|hzdr]] reached with DFOB, and 3+ reuses brings single-use pyoverdine's ~$5,800/kg cost under ~$1,900/kg of germanium, below even China's price (our estimate)." },
      { kind: "h", text: "Who does what" },
      {
        kind: "people",
        items: [
          { who: "Titan", does: "Ships tailings and mica concentrate samples, pays the test fee, shares its mineralogy data." },
          { who: "MaverickX", does: "Runs bench leach, capture and release tests with its existing siderophore; outsources germanium assays." },
          { who: "Teck", does: "Tells us the minimum feed spec and checks the small concentrate from weeks 9–12." },
        ],
      },
      { kind: "h", text: "MICA Network pilot checklist" },
      { kind: "p", text: "A director at the MICA Network listed 10 things a startup must show before a site pilot. The test now covers four it didn't:" },
      {
        kind: "list",
        items: [
          "A full mass balance (where every metal ends up)",
          "Testing against zinc, lead, cadmium and arsenic as well as iron",
          "Environmental and biosafety checks",
          "A scale-up and IP plan",
        ],
      },
      { kind: "h", text: "What could go wrong" },
      {
        kind: "table",
        table: {
          head: ["Risk", "Why it matters", "How we handle it"],
          rows: [
            ["We don't know Suman's germanium test results", "The whole idea rests on the siderophore actually capturing germanium", "Ask first; if results were poor, pivot to the backup idea"],
            ["Germanium is in solids, siderophore works on liquids", "Titan's germanium sits in non-sulfide waste material, so it must be leached first", "Pitch MaverickX as the capture step on the leach liquid"],
            ["Siderophore isn't reusable yet", "Single-use pyoverdine barely breaks even", "The 90-day test measures reuse"],
            ["Iron getting in the way", "DFOB recovered only [[~44% of gallium|iitd]] from a liquid with 53 mg/L iron", "Remove iron first, or tune pH to favour germanium"],
            ["Tannin is cheap", "By mass, siderophore use is similar to tannin ([[8–10 g per g Ge|mdpi]])", "Win on selectivity and reuse"],
            ["The research siderophore may not be theirs", "Published germanium work uses DFOB; MaverickX's main siderophore may be pyoverdine", "Ask which one they tested and how it compares"],
            ["High prices cause substitution", "Buyers are already swapping germanium out of some [[infrared optics and solder|mmta]]", "Lead with fiber and photonics, where demand is stickier"],
            ["Titan already has a partner", "Teck is evaluating the recovery path with Titan", "MaverickX is a supplier into that path, not a competitor to Teck"],
            ["It's mining-adjacent", "TKS warned against mining ideas, and MaverickX paused mining", "Recovering metals from existing waste, paid from day one"],
            ["13,000 kg isn't proven", "Titan's samples are [[too small to establish a resource|mtnTitan]]", "Always say “up to” and “being evaluated”"],
          ],
        },
      },
    ],
    bottomLine: "The cost of finding out is one part-time scientist for 12 weeks, paid for by the customer. If a gate fails, little is lost.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "readme",
    name: "Read me",
    filename: "06 Read me",
    question: "What happens first?",
    title: "Iron is the main risk, so we test it first.",
    blocks: [
      { kind: "lede", text: "Next: Titan samples, the Umicore call, Teck's feed spec." },
      { kind: "h", text: "Our questions for you" },
      {
        kind: "list",
        ordered: true,
        items: [
          "How much germanium did your siderophore capture in the germanium-bearing liquid tests, and was it promising?",
          "Which siderophore did you test on germanium: pyoverdine, or a hydroxamate like DFOB?",
          "Beyond lepidolite, have you leached any other mica? Titan's germanium sits mainly in mica.",
          "How much iron can be present before your siderophore stops capturing other metals well?",
          "Have you tried EDTA at low pH to release metals and reuse the siderophore?",
          "Roughly how much siderophore does it take per kg of metal captured, and how much can you produce a year today?",
          "Have you tried it on gallium? Gallium mimics iron, so it may bind even better.",
          "Would a paid 90-day test with a mine like Titan be something MaverickX would take on, and roughly how many scientist-hours would it take?",
        ],
      },
      { kind: "button", text: "Run the test" },
      { kind: "callout", title: "Backup direction", text: "Keeping saltwater disposal wells open: in MaverickX's oil and gas lane, already on its roadmap, and uses the existing product." },
    ],
    bottomLine: "In 90 days, at almost no net cost, MaverickX can find out whether its existing siderophore pulls germanium out of Titan's mica waste.",
  },
];

/* 4. SOURCES + CREDITS (the "Sources" folder on the desktop) ----------- */
export const footer = {
  wordmark: "Maverick Pitch",
  email: "armaansharma2311@gmail.com",
  emailSubject: "Germanium recovery: a paid 90-day test",
  sourcesTitle: "Every number, and where it comes from",
  teamLabel: "Team",
  team: ["Drishti", "Armaan", "Sidi", "Sahana", "Tawfic"],
  credits: [
    "TKS Activate · Triple Ignition Challenge · MaverickX",
    "Prepared for Suman, Principal Scientist, MaverickX · Oct 2026",
    "Figures labelled “our estimate” are the team's calculations, not measured results.",
    "Desk scene generated with World Labs Atlas.",
  ],
};
