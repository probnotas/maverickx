/**
 * ALL site copy lives here. Layout files contain no words.
 * Source: "MaverickX Germanium Pitch: Website Plan" (rev 43) + the team's
 * planning notes. Do not add facts that are not in those documents.
 *
 * Rich text: wrap a number as [[visible text|sourceId]] and it renders as a
 * link to that source. sourceId "math" opens the Economics file (our
 * estimates); "test" opens the Implementation file. Search for "TODO" before launch.
 */

export type SourceId = keyof typeof sources;

export interface Source {
  label: string;
  href?: string; // omitted = private source (no public link exists)
}

export const sources = {
  // Panels (internal links for our own estimates)
  math: { label: "Our estimate, see 03 Economics", href: "#file-economics" },
  test: { label: "Our proposal, see 05 Implementation", href: "#file-plan" },

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
    label: "Team emails with experts, Oct 23–27, 2026 (private)",
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
  stepsLabel: "Pages, in reading order",
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
    runTest: "Email the team",
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
 * One file per question Suman asks, in order. Each page states its thesis
 * at the start (`thesis`) and again, reworded, at the end (`bottomLine`).
 * The renderer only knows block kinds, never words.
 */

export interface Table {
  caption?: string;
  head: string[];
  rows: string[][];
  note?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type Block =
  | { kind: "lede"; text: string }
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "stats"; items: Stat[] }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; table: Table }
  | { kind: "flow"; steps: { who: string; what: string; ours?: boolean }[]; note?: string }
  | {
      kind: "steps";
      prev: string;
      next: string;
      counter: string; // {n} and {total} are filled in
      steps: { label: string; text: string; video?: string; poster?: string; stat?: Stat; ours?: boolean }[];
      note?: string;
    }
  | { kind: "cards"; items: { title: string; text: string; chips: string[]; img?: string }[] }
  | { kind: "gates"; phases: { weeks: string; name: string; steps: string[]; gate: string; pass: string }[]; note: string }
  | { kind: "quotes"; items: ExpertQuote[]; note: string }
  | { kind: "feature"; label: string; quote: string; who: string; text: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "people"; items: { who: string; does: string }[] }
  | { kind: "summary"; items: { file: PitchFile["id"]; thesis: string; stats: Stat[] }[] }
  | { kind: "button"; text: string };

export interface PitchFile {
  id: "problem" | "solution" | "economics" | "evidence" | "plan" | "readme";
  name: string; // icon label and page title
  filename: string; // window title bar
  question: string; // Suman's question this file answers
  subtitle: string; // what the page is about
  thesis: string; // the page's one takeaway, stated at the start
  note?: string; // small print under the thesis
  blocks: Block[];
  bottomLine: string; // the same takeaway, reworded, at the end
}

export interface ExpertQuote {
  name: string;
  role: string;
  org: string;
  quote: string; // their exact words unless kind is "paraphrase"
  context?: string; // what the quote was about, shown after it
  kind: "quote" | "paraphrase";
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
    quote: "The problem is that germanium complex is highly stable. By changing pH you might be able to release it.",
    kind: "quote",
    validates: "Siderophores bind germanium tightly; getting it back out is the hard part",
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
    quote: "Likely one of the strongest candidates",
    context: "on Teck's Trail, for germanium from zinc-processing streams",
    kind: "quote",
    validates: "Teck is the right customer to approach",
    permission: "role-only",
  },
  {
    name: "Mary Anne Alvin",
    role: "Senior Technology Manager",
    org: "US DOE critical minerals office",
    quote: "It's not so much the cost of the reagent … but the [overall] cost of the total system.",
    kind: "quote",
    validates: "The full process cost matters, not just the siderophore",
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
    subtitle: "Why germanium in industrial waste is worth a look.",
    thesis: "Germanium is scarce, China controls most of it, and much of it is thrown away in mine and refinery waste.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "[[<3%|pennState]]", label: "of the germanium in zinc ores and fly ash is ever recovered" },
          { value: "[[~60%|skillings]]", label: "of world germanium supply is controlled by China" },
          { value: "[[Nov 27, 2026|evertiq]]", label: "China's pause on its US export ban ends" },
        ],
      },
      { kind: "p", text: "Germanium is never mined on its own. It comes out of zinc processing, and the US had [[no primary refinery production|mtnAllies]] in 2025. US imports of germanium metal fell from [[21,000 to 7,000 kg|payne]] between 2024 and 2025." },
      { kind: "h", text: "One example: a single mine's waste" },
      {
        kind: "stats",
        items: [
          { value: "[[up to ~13,000 kg/yr|titanTeck]]", label: "of germanium in the waste at Titan's Empire State Mine, which Titan and Teck are evaluating" },
          { value: "[[~$78M/yr|smmTitan]]", label: "what that germanium would be worth at $6,000/kg" },
        ],
      },
      { kind: "p", text: "Titan is one stream among many. The customer we'd pitch is Teck, which refines germanium at Trail in British Columbia and is expanding there; the expansion could double its germanium output ([[Teck|teckTrail]])." },
      { kind: "h", text: "Why the demand holds" },
      { kind: "p", text: "Fiber optics is the largest use of germanium: [[142 t in 2026|sp]]. Corning is supplying Meta under a fiber deal worth [[up to $6B through 2030|dcd]]. Asked who pays a premium for non-Chinese germanium, a professor at the Colorado School of Mines said: “defense.”" },
      { kind: "callout", title: "The counterpoint", text: "High prices are already pushing some buyers to substitutes, mainly in [[infrared optics and solder|mmta]]. Fiber and photonics are the steadier demand." },
      { kind: "p", text: "Titan's samples are [[too small to establish a resource|mtnTitan]], so we always say “up to.”" },
    ],
    bottomLine: "There's a real, dated supply problem, and the germanium is already sitting in waste that companies like Teck want to recover.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "solution",
    name: "Solution",
    filename: "02 Solution",
    question: "Does it use what we already have?",
    subtitle: "How MaverickX's existing siderophore could fit into Teck's process.",
    thesis: "MaverickX wouldn't build anything new: its existing siderophore would become one step in a process Teck already runs.",
    blocks: [
      { kind: "h", text: "How it would work, step by step" },
      {
        kind: "steps",
        prev: "Previous step",
        next: "Next step",
        counter: "Step {n} of {total}",
        steps: [
          {
            label: "Waste goes in",
            text: "Zinc residues and mine tailings hold small amounts of germanium. One example: Titan's tailings hold [[up to ~13,000 kg a year|titanTeck]].",
            video: "/video/how/1-waste.mp4",
            poster: "/img/how/1-waste.jpg",
          },
          {
            label: "Teck leaches",
            text: "Teck dissolves the germanium out of the solid waste into an acidic liquid.",
            video: "/video/how/2-leach.mp4",
            poster: "/img/how/2-leach.jpg",
          },
          {
            label: "MaverickX captures",
            text: "MaverickX's siderophore grabs the germanium out of that liquid. The test checks how much iron it grabs too.",
            video: "/video/how/3-capture.mp4",
            poster: "/img/how/3-capture.jpg",
            ours: true,
          },
          {
            label: "Release and reuse",
            text: "A pH shift or an EDTA wash makes the siderophore let go of the germanium. The siderophore goes back in to capture more.",
            video: "/video/how/4-release.mp4",
            poster: "/img/how/4-release.jpg",
            ours: true,
          },
          {
            label: "Teck refines",
            text: "Teck turns the concentrate into pure germanium and sells it to fiber, photonics and defense buyers.",
            video: "/video/how/5-refine.mp4",
            poster: "/img/how/5-refine.jpg",
          },
          {
            label: "MaverickX is paid",
            text: "Teck pays MaverickX a 5–10% royalty on germanium sales from the step. If it won't, the fallback is selling it the siderophore directly.",
            video: "/video/how/6-paid.mp4",
            poster: "/img/how/6-paid.jpg",
            ours: true,
          },
        ],
        note: "MaverickX supplies one step. It never runs a plant or handles mine waste itself. The animations are illustrations, not to scale.",
      },
      {
        kind: "cards",
        items: [
          {
            title: "Already cracked mica",
            text: "Some germanium sits in mica, as Titan's does. MaverickX's siderophore already released 98.5% of the lithium from lepidolite, a mica.",
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
            title: "A small first test",
            text: "A 90-day bench test on Teck's waste samples, run by about one scientist part-time.",
            chips: ["[[90 days|test]]", "[[3 checkpoints|test]]", "[[small cost|math]]"],
            img: "/img/cards/flask-cutout.png",
          },
        ],
      },
      { kind: "callout", title: "A hypothesis, not a result", text: "Published germanium work uses the siderophore DFOB ([[HZDR|hzdr]], [[ERA-LEARN|eraLearn]]). We don't know which siderophore MaverickX tested on germanium, or MaverickX's results. The test answers both." },
      { kind: "h", text: "Three of eight pieces are already in place" },
      {
        kind: "table",
        table: {
          head: ["What's needed", "What MaverickX already has", "What's missing", "Effort"],
          rows: [
            ["A product to test", "A siderophore in production as crude broth, [[“a few hundred dollars” per kg|suman]]", "Nothing", "Low"],
            ["Getting germanium out of the rock", "The siderophore released [[98.5%|suman]] of the lithium from lepidolite, a mica", "The same test on Teck's samples", "Low"],
            ["Capturing germanium from the liquid", "Tested on germanium-bearing liquids, results unknown to us. DFOB binds germanium best at acidic pH with chloride present ([[HZDR|hzdr]])", "Which siderophore was used, and how much it captures", "Medium"],
            ["Iron getting in the way", "Siderophores evolved to grab iron. Real leach liquids carry [[20–20,000× more iron than germanium|experts]] (our math from an expert's numbers)", "Remove iron first, or tune pH to favour germanium", "High"],
            ["Releasing germanium and reusing the siderophore", "MaverickX is working on reuse. EDTA at pH 3.5 releases [[over 90%|hzdr]]; [[10 cycles|cordis]] were run for gallium", "Test that recipe on MaverickX's siderophore", "Medium"],
            ["Measuring results", "MaverickX already outsources lab analysis ([[~$500 per 10 HPLC samples|suman]])", "Outside germanium assays, same model", "Low"],
            ["Making it at volume", "A prototype bioreactor up to [[750 L|suman]]", "About 10–250 t/yr of siderophore at full scale (our estimate), so likely a contract manufacturer", "High"],
            ["Fitting Teck's refinery", "Nothing yet", "Teck's minimum feed spec, which Titan and Teck are [[defining now|marketscreener]]", "Medium"],
          ],
        },
      },
      { kind: "callout", title: "The honest comparison", text: "By weight, siderophore use (8–19 g per g germanium, single use, our estimate) is similar to tannin, today's standard ([[8–10 g|mdpi]]). Tannin is cheap, so MaverickX has to win on selectivity or reuse, not on price per kg." },
    ],
    bottomLine: "It's MaverickX's existing product in one step of Teck's process. The big unknown is whether iron crowds the germanium out, and the test measures exactly that.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "economics",
    name: "Economics",
    filename: "03 Economics",
    question: "Do the economics work?",
    subtitle: "What it costs MaverickX to find out, and what it could earn.",
    thesis: "Trying this costs MaverickX very little, and if the siderophore can be reused, it pays.",
    note: "All figures on this page are our estimates unless they link to a source.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "~$30–80k", label: "what the 90-day test costs MaverickX" },
          { value: "~$25–75k", label: "the test fee we'd ask Teck for, covering most of that" },
          { value: "$3.9–7.8M/yr", label: "royalty if it works at full scale, from 2029 at the earliest" },
        ],
      },
      { kind: "p", text: "Would Teck pay a fee before seeing any data? It might not. In that case we'd offer a discounted fee or free siderophore for the first test, and MaverickX's cost is the ~$30–80k." },
      {
        kind: "table",
        table: {
          caption: "MaverickX's money and time",
          head: ["", "90-day test (now)", "If it works (2029+)"],
          rows: [
            ["Cash out", "~$30–80k: scientist time, small siderophore batches, outside germanium assays", "Making siderophore at volume, likely through a contract manufacturer. The cost per kg is unknown; we'd need MaverickX's number"],
            ["Cash in", "The ~$25–75k test fee we'd ask Teck for", "A 5–10% royalty on germanium sales: ~$3.9–7.8M/yr (breakdown below)"],
            ["Team time", "~1 scientist, part-time, 12 weeks", "Supplying siderophore and process support"],
            ["Worst case", "Lose the gap between cost and fee: a few tens of thousands of dollars", "The checkpoints stop it before big spending"],
          ],
        },
      },
      { kind: "h", text: "Where $3.9–7.8M a year comes from" },
      {
        kind: "table",
        table: {
          head: ["Step", "Number"],
          rows: [
            ["Example germanium stream: Titan, one of Teck's possible feeds", "[[13,000 kg/yr|titanTeck]]"],
            ["Germanium price (Western spot ran $6,150–6,250/kg in Jun–Jul 2026)", "[[$6,000/kg|payne]]"],
            ["Value of that germanium", "~$78M/yr"],
            ["Royalty at 5%", "~$3.9M/yr"],
            ["Royalty at 10%", "~$7.8M/yr"],
          ],
          note: "If Teck won't agree to a royalty, the fallback is selling it the siderophore directly.",
        },
      },
      { kind: "h", text: "Reuse is the make-or-break number" },
      { kind: "p", text: "Pyoverdine is a bigger siderophore molecule than DFOB (about 1,400 vs 580 g/mol), so about 2.5× more is needed per kg of germanium. We need to know which type MaverickX makes." },
      {
        kind: "table",
        table: {
          caption: "Siderophore cost per kg of germanium recovered",
          head: ["Case", "Siderophore per kg Ge", "Cost per kg Ge", "Left after siderophore cost at $6,000/kg (Western)", "Left after siderophore cost at ~$3,800/kg (China)"],
          rows: [
            ["Small siderophore, single use", "~8 kg", "~$2,400", "~$3,600", "~$1,400"],
            ["Pyoverdine, single use", "~19 kg", "~$5,800", "~$200", "loses ~$2,000"],
            ["Small siderophore, reused 10×", "~0.8 kg", "~$240", "~$5,760", "~$3,560"],
            ["Pyoverdine, reused 10×", "~1.9 kg", "~$580", "~$5,420", "~$3,220"],
          ],
          note: "Assumes [[$300/kg siderophore|suman]], one siderophore molecule per germanium atom, 100% capture and no siderophore lost to iron. Iron is the biggest risk every expert raised, so real numbers will be worse. “Left after siderophore cost” doesn't subtract the royalty, leaching or refining. The China price is approximate (27,250 yuan/kg on Oct 9, 2026, at ~7.1 yuan per dollar; [[SMM|smmWeekly]]).",
        },
      },
      { kind: "callout", title: "Why this works when produced water didn't", text: "Our earlier idea, cleaning oilfield produced water, needed a cost of $0.10–0.20 per barrel, but single-use siderophore cost about $55+ per barrel. Germanium is worth thousands of dollars per kg, so the siderophore can still leave money on the table." },
      { kind: "h", text: "The offer, step by step" },
      {
        kind: "people",
        items: [
          { who: "Now", does: "A 90-day lab test on Teck's samples. We'd ask for a ~$25–75k fee." },
          { who: "2027–28", does: "An on-site pilot. Who pays is to be agreed with Teck; grant funding may be possible but isn't secured." },
          { who: "2029+", does: "Siderophore supply plus a 5–10% royalty on germanium sales, or direct siderophore sales if Teck prefers." },
        ],
      },
    ],
    bottomLine: "Finding out costs MaverickX a few tens of thousands of dollars at most. If the siderophore can be reused, it works even at China's price.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "evidence",
    name: "Evidence",
    filename: "04 Evidence",
    question: "Is anyone really asking for this?",
    subtitle: "Who we talked to and what they said.",
    thesis: "Big companies are already spending on this, and no expert we asked said it can't work.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "54", label: "emails to refiners, mining networks, labs and government" },
          { value: "12", label: "replies" },
          { value: "1", label: "offer of real test material" },
        ],
      },
      {
        kind: "feature",
        label: "Our only offer of real test material",
        quote: "Blue Moon would be open to supporting testing a siderophore-based recovery process by providing some test material and some of my time to discuss your project.",
        who: "Manager, Special Projects (Apex project lead), Blue Moon Metals",
        text: "Before sending material, Blue Moon wants a project plan with our scope of work and funding. Their Apex ore is high in iron, and separating germanium from iron is one of their key challenges.",
      },
      { kind: "h", text: "The hard numbers" },
      { kind: "p", text: "A Missouri S&T professor who works on recovering germanium from zinc tailings told us what a siderophore would face in a real leach liquid:" },
      {
        kind: "stats",
        items: [
          { value: "pH 0–2", label: "sulfuric acid at 40–80 °C" },
          { value: "1–100 mg/L", label: "germanium" },
          { value: "2–20 g/L", label: "iron, mostly Fe(III), plus 5–50 g/L zinc" },
        ],
      },
      { kind: "p", text: "That's 20 to 20,000 times more iron than germanium (our math). In his words: “A biological chelator could be useful… So, selectivity is highly desired.”" },
      { kind: "h", text: "What other experts told us" },
      { kind: "quotes", items: experts, note: "Names withheld until each person confirms." },
      { kind: "h", text: "What it changed in our plan" },
      {
        kind: "list",
        items: [
          "The 90-day test now covers four items from the MICA Network's pilot checklist: a full mass balance, testing against zinc, lead, cadmium and arsenic as well as iron, environmental and biosafety checks, and a scale-up and IP plan.",
          "Releasing the germanium is the hard part. We'll test two routes: EDTA at low pH ([[HZDR|hzdr]]) and a simple pH shift.",
          "More places to test: Glencore's CEZinc in Quebec is another possible customer, and the Winston Mine tailings near Thunder Bay are a possible sample source.",
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
      { kind: "callout", title: "What nobody has said yet", text: "None of these companies has asked for a siderophore, and Teck hasn't replied to our four emails yet." },
    ],
    bottomLine: "The demand is real, but nobody has asked for a siderophore yet. That's what the test is for.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "plan",
    name: "Implementation",
    filename: "05 Implementation",
    question: "Is it low-risk and low-effort for my team?",
    subtitle: "How to decide whether this is worth the effort before investing real resources.",
    thesis: "A 90-day test with three checkpoints tells MaverickX whether this works before it spends serious money.",
    blocks: [
      {
        kind: "gates",
        phases: [
          { weeks: "Weeks 1–4", name: "Leach", steps: ["Teck sends waste samples", "Leach tests with the siderophore", "Measure germanium in the liquid"], gate: "Checkpoint 1", pass: "At least half the germanium dissolves out of the sample" },
          { weeks: "Weeks 5–8", name: "Capture", steps: ["Capture germanium from the liquid", "Test at real iron levels", "Try removing iron or adjusting pH"], gate: "Checkpoint 2", pass: "70%+ of the dissolved germanium captured despite iron" },
          { weeks: "Weeks 9–12", name: "Release", steps: ["Release the germanium and reuse the siderophore 3+ times", "Make a small concentrate", "Send it to Teck to check against its spec"], gate: "Checkpoint 3", pass: "90%+ released, 3+ reuses, and Teck accepts the concentrate" },
        ],
        note: "These thresholds are our proposal. If a checkpoint fails, MaverickX stops, having spent little.",
      },
      { kind: "p", text: "Why these thresholds: at 50%, at least half the germanium is reachable, which is enough to justify the capture work. 90% release matches what the [[HZDR team|hzdr]] reached with DFOB. Three or more reuses bring pyoverdine's cost from ~$5,800 to under ~$1,900 per kg of germanium, below even China's price (our estimate)." },
      { kind: "h", text: "Who does what" },
      {
        kind: "people",
        items: [
          { who: "Teck", does: "Sends waste samples, shares its minimum feed spec and checks the small concentrate in weeks 9–12. We'd ask it to pay the test fee." },
          { who: "MaverickX", does: "Runs bench tests with its existing siderophore and sends samples out for germanium assays." },
          { who: "Our team", does: "Handles outreach to Teck and the analysis." },
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
          head: ["Risk", "Why it matters", "Mitigation"],
          rows: [
            ["We don't know MaverickX's test results", "The idea rests on the siderophore capturing germanium", "Ask MaverickX first; the test confirms it either way"],
            ["Iron crowds germanium out", "Real leach liquids carry [[20–20,000× more iron than germanium|experts]]", "Remove iron first, or tune pH to favour germanium"],
            ["Strong acid", "Leach liquids run at pH 0–2 and 40–80 °C, and the siderophore must survive that", "Test at those conditions in weeks 1–8"],
            ["Siderophore isn't reusable yet", "Single-use pyoverdine barely breaks even", "The test measures reuse (3+ cycles)"],
            ["Tannin is cheap", "By weight, siderophore use is similar to tannin ([[8–10 g per g Ge|mdpi]])", "Win on selectivity and reuse"],
            ["The research siderophore may not be MaverickX's", "Published germanium work uses DFOB; MaverickX's main siderophore may be pyoverdine", "Ask which one MaverickX tested"],
            ["High prices cause substitution", "Buyers are already swapping germanium out of some [[infrared optics and solder|mmta]]", "Lead with fiber and photonics, where demand is steadier"],
            ["Teck hasn't replied yet", "We've sent four emails with no answer", "Blue Moon has offered test material, so testing can start either way"],
            ["It sounds like mining", "TKS warned against mining ideas, and MaverickX paused mining", "MaverickX supplies one step for waste that already exists; it never mines"],
          ],
        },
      },
    ],
    bottomLine: "Finding out takes one part-time scientist for 12 weeks. If a checkpoint fails, MaverickX stops having spent little.",
  },

  /* ---------------------------------------------------------------- */
  {
    id: "readme",
    name: "Summary",
    filename: "06 Summary",
    question: "What happens first?",
    subtitle: "Every page in one place, plus what we'd like to ask MaverickX.",
    thesis: "In 90 days, at little cost, MaverickX can find out whether its existing siderophore recovers germanium from waste.",
    blocks: [
      {
        kind: "summary",
        items: [
          {
            file: "problem",
            thesis: "Germanium is scarce, mostly Chinese, and thrown away in waste.",
            stats: [
              { value: "[[<3%|pennState]]", label: "recovered" },
              { value: "[[~60%|skillings]]", label: "from China" },
              { value: "[[13,000 kg/yr|titanTeck]]", label: "in one mine's waste" },
            ],
          },
          {
            file: "solution",
            thesis: "MaverickX's existing siderophore becomes one step in Teck's process.",
            stats: [
              { value: "[[98.5%|suman]]", label: "lithium freed from a mica" },
              { value: "[[>90%|hzdr]]", label: "germanium released with EDTA" },
              { value: "[[10|cordis]]", label: "reuse cycles shown" },
            ],
          },
          {
            file: "economics",
            thesis: "Trying costs little; with reuse, it pays.",
            stats: [
              { value: "~$30–80k", label: "test cost" },
              { value: "$3.9–7.8M/yr", label: "royalty potential" },
              { value: "~$240", label: "siderophore per kg Ge, reused 10×" },
            ],
          },
          {
            file: "evidence",
            thesis: "Companies are spending on this, and no expert said it can't work.",
            stats: [
              { value: "54", label: "emails" },
              { value: "12", label: "replies" },
              { value: "1", label: "offer of test material" },
            ],
          },
          {
            file: "plan",
            thesis: "A 90-day test with three checkpoints decides it.",
            stats: [
              { value: "90", label: "days" },
              { value: "3", label: "checkpoints" },
              { value: "~1", label: "scientist, part-time" },
            ],
          },
        ],
      },
      { kind: "h", text: "Our questions for MaverickX" },
      {
        kind: "list",
        ordered: true,
        items: [
          "How much germanium did your siderophore capture in the germanium-bearing liquid tests, and was it promising?",
          "Which siderophore did you test on germanium: pyoverdine, or a hydroxamate like DFOB?",
          "Beyond lepidolite, have you leached any other mica?",
          "How much iron can be present before your siderophore stops capturing other metals well?",
          "Have you tried EDTA at low pH to release metals and reuse the siderophore?",
          "Roughly how much siderophore does it take per kg of metal captured, and how much can you produce a year today?",
          "Have you tried it on gallium? Gallium mimics iron, so it may bind even better.",
          "Would a 90-day test with a company like Teck be something MaverickX would take on, and roughly how many scientist-hours would it take?",
        ],
      },
      { kind: "button", text: "Email the team" },
    ],
    bottomLine: "The next step is small: answer a few questions and run one 90-day test.",
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
