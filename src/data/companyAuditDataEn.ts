import { CompanyAuditDossier, StepMethodologyGuide } from "../types";

export const MAUBOUSSIN_GUIDED_TEMPLATE_EN: CompanyAuditDossier = {
  id: "mauboussin-master-template",
  companyName: "Costco Wholesale Corp. (Mauboussin Master Case)",
  ticker: "COST (NASDAQ)",
  industry: "Subscription Retail & Scale-Economies Shared",
  description: "A benchmark case study applying Michael J. Mauboussin's 'Measuring the Moat' methodology: Negative working capital, high ROIC via capital turnover, and consumer surplus sharing.",
  financials: {
    revenue: 242000,
    operatingIncome: 8100,
    effectiveTaxRate: 26,
    totalAssets: 68000,
    cashAndEquivalents: 14000,
    nonInterestCurrentLiabilities: 28000,
    wacc: 8.5
  },
  industryStructure: {
    supplierPower: "düşük",
    buyerPower: "düşük",
    threatOfNewEntrants: "düşük",
    threatOfSubstitutes: "orta",
    industryRivalry: "düşük",
    profitPoolPosition: "Membership fees represent over 70% of total operating profit. Goods are sold near cost, binding customers to the ecosystem rather than extracting margin from suppliers and buyers."
  },
  competitiveAdvantage: {
    primaryType: "ölçek_avantajı",
    subDrivers: ["Economies of Scale", "Switching Costs", "Process Superiority", "Monopsony Bargaining Power", "Brand / Search Costs"],
    pricingPowerEvidence: "Membership renewal rates exceed 92% globally. Subscription price increases do not lead to churn because members know their annual savings vastly exceed the fee (Substantial Consumer Surplus / High WTP).",
    costAdvantageEvidence: "Operates with only ~3,800 SKUs (1/10th of traditional supermarkets), purchasing in massive pallet volumes. Zero advertising spend. Operates with negative working capital using supplier funds."
  },
  interactionAndDiscipline: {
    capacityDiscipline: "yüksek",
    priceWarRisk: "düşük",
    managementCapitalAllocation: "mükemmel"
  },
  sustainability: {
    estimatedCapYears: 20,
    moatWidth: "Geniş Hendek (Wide)",
    keyVulnerability: "E-commerce logistics networks reducing the convenience barrier of bulk warehouse shopping or changing store visit habits among younger generations."
  },
  notes: `[MAUBOUSSIN METHODOLOGY STUDY NOTES]:
1. ROIC Analysis: High ROIC can be generated not only through high profit margins, but also via lightning-fast Capital Turnover (DuPont identity).
2. Value Stick: Companies that pass cost savings directly to consumers (Scale-Economies Shared) create an insurmountable moat for competitors.
3. Negative Working Capital: Cash is collected upfront from shoppers and paid to suppliers 60 days later, self-funding growth without external equity dilution.`,
  updatedAt: "2026-08-22",
  createdAt: "2026-08-22",
  isCustom: false,
  lastStep: 1,
  tags: ["Guided Template", "Mauboussin Case", "Wide Moat"]
};

export const STEP_METHODOLOGY_GUIDES_EN: Record<number, StepMethodologyGuide> = {
  1: {
    step: 1,
    title: "Step 1: Financial X-Ray (ROIC & DuPont Decomposition)",
    mauboussinQuote: "'The primary goal of strategy is to create sustainable economic value (ROIC > WACC). Growth only creates value when returns exceed the cost of capital.' — Michael J. Mauboussin",
    coreConcepts: [
      "NOPAT (Net Operating Profit After Tax): Core operational earnings independent of debt and financing structure.",
      "Invested Capital: Net operational capital actually tied up in running the business (Total Assets - Cash - Non-Interest Bearing Liabilities).",
      "DuPont Decomposition: ROIC = NOPAT Margin (%) × Capital Turnover (x). Even with razor-thin margins, lightning-fast capital velocity produces massive ROIC (Costco / BIM model).",
      "Economic Spread: ROIC minus WACC. A positive spread compounds shareholder wealth with every dollar invested."
    ],
    keyQuestions: [
      "Is the company's 3-5 year average ROIC comfortably above its cost of capital (WACC)?",
      "What is the primary engine driving ROIC: high pricing/margin, or rapid asset turnover?",
      "Has excess non-operating idle cash in the treasury been stripped out of invested capital?"
    ],
    commonPitfalls: [
      "Relying on Net Income or P/E ratios (Net income is distorted by debt leverage, interest expenses, and one-off items; always focus on NOPAT).",
      "Confusing ROE (Return on Equity) with ROIC (ROE can be artificially inflated through extreme debt leverage).",
      "Focusing exclusively on high revenue growth while ignoring WACC (growth with ROIC < WACC actively destroys value)."
    ],
    practicalExercise: "Multiply your target company's NOPAT margin by its Capital Turnover. Verify that the product equals ROIC and pinpoint the primary dimension of competitive advantage."
  },
  2: {
    step: 2,
    title: "Step 2: Industry Structure & Profit Pool",
    mauboussinQuote: "'Company performance is largely governed by the underlying structure of its industry. Even elite management struggles to generate alpha in an economically broken industry.' — Michael J. Mauboussin",
    coreConcepts: [
      "Porter's 5 Forces: Supplier power, Buyer power, Threat of new entrants, Threat of substitutes, and Competitive rivalry intensity.",
      "Profit Pool: A strategic map showing where revenues across the entire value chain are converted into economic profits.",
      "Industry Entry Barriers: Regulatory licensing, massive upfront fixed capital requirements, or regional network monopolies."
    ],
    keyQuestions: [
      "Which segment in the value chain captures the lion's share of profits? (e.g., In aviation, is it airports and booking GDS systems, or airlines?)",
      "If a new entrant tried to attack this market tomorrow, how much capital and time would be required?",
      "Can customers or suppliers aggregate together to dictate pricing terms?"
    ],
    commonPitfalls: [
      "Looking only at the company's internal execution while ignoring industry structural flaws.",
      "Assuming that segments with the highest gross revenue also command the largest profit pools."
    ],
    practicalExercise: "Map the suppliers and buyers across the target company's value chain. Determine who holds pricing leverage over whom."
  },
  3: {
    step: 3,
    title: "Step 3: Value Stick & Moat Drivers (WTP / WTS)",
    mauboussinQuote: "'An economic moat is the ability to widen the spread between customer willingness-to-pay (WTP) and supplier willingness-to-sell (WTS) further than any rival.' — Michael J. Mauboussin",
    coreConcepts: [
      "Consumer Advantage (WTP Expansion): High Switching Costs, Network Effects, Search Cost reductions & Brand loyalty.",
      "Production / Cost Advantage (WTS Reduction): Proprietary raw material access, patented processes, or massive logistical scale.",
      "Scale Economics: Spreading heavy fixed costs over massive volume to drive unit costs down to levels competitors cannot replicate.",
      "Pricing Power: The ability to raise prices during inflationary environments without suffering customer defection."
    ],
    keyQuestions: [
      "What financial, procedural, or psychological switching costs does a customer bear when switching to a competitor?",
      "Does the platform become more valuable to existing users as new users join? (Network Effects)",
      "Does the company retain cost savings as profit, or share them with consumers (Scale-Economies Shared) to crowd out rivals?"
    ],
    commonPitfalls: [
      "Mistaking a trendy advertising campaign for a sustainable economic moat when switching costs are zero.",
      "Assuming pharmaceutical or tech companies have permanent moats without checking patent expiration schedules."
    ],
    practicalExercise: "Examine the trend in Gross Margin across the last 3 economic downturns or inflationary spikes to confirm genuine pricing power."
  },
  4: {
    step: 4,
    title: "Step 4: Game Theory, Capacity & Capital Allocation",
    mauboussinQuote: "'Competitors' strategic interactions and management's capital allocation choices are the decisive factors dictating moat longevity.' — Michael J. Mauboussin",
    coreConcepts: [
      "Prisoner's Dilemma: The structural risk where industry participants destroy collective profits through irrational price wars or overcapacity.",
      "Capacity Discipline: The collective maturity of industry incumbents to curtail production when demand softens.",
      "Capital Allocation: How rationally management deploys free cash flow: Organic CapEx, Dividends, Buybacks, Debt paydown, or M&A."
    ],
    keyQuestions: [
      "Is the industry plagued by destructive discounting or capacity races?",
      "Does management opportunistically buy back stock when undervalued, or pursue empire-building dilutive M&A?",
      "Is there a structural overhang of excess capacity in the industry?"
    ],
    commonPitfalls: [
      "Praising management for high top-line growth driven by overpriced, value-destroying M&A deals.",
      "Failing to anticipate that massive CapEx at the peak of a cycle will depress ROIC for years to come."
    ],
    practicalExercise: "Audit where management deployed free cash flow over the last 3-5 years: Organic growth, dividends, buybacks, or debt retirement."
  },
  5: {
    step: 5,
    title: "Step 5: Moat Longevity (CAP) & Synthesis Verdict",
    mauboussinQuote: "'The Competitive Advantage Period (CAP) is the timeframe over which a firm can earn returns in excess of its cost of capital. The market regularly misprices this duration.' — Michael J. Mauboussin",
    coreConcepts: [
      "CAP (Competitive Advantage Period): The duration (typically 5-20 years) over which moats defend excess returns before fading.",
      "Mean Reversion: The economic law where extraordinary returns attract new capital and competition, pulling ROIC toward WACC.",
      "Disruption Risk: New business models or paradigms that render existing moat defenses obsolete rather than attacking head-on."
    ],
    keyQuestions: [
      "Can this company's ROIC remain above its cost of capital (WACC) over the next 10-15 years?",
      "What is the single biggest technological, regulatory, or behavioral threat to this moat?",
      "What is the final Mauboussin Moat Score out of 100, and is the diagnosis Wide, Narrow, or None?"
    ],
    commonPitfalls: [
      "Extrapolating today's peak profitability infinitely into the future (ignoring the gravitational pull of mean reversion).",
      "Confusing moat strength with stock valuation (even an elite wide-moat company is a poor investment if bought at an absurd multiple)."
    ],
    practicalExercise: "Review the one-click exportable investment dossier and summarize the single most critical structural vulnerability of the business."
  }
};

export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier[] = [
  MAUBOUSSIN_GUIDED_TEMPLATE_EN,
  {
    id: "bim-dossier",
    companyName: "BIM Birleşik Mağazalar",
    ticker: "BIMAS (BIST)",
    industry: "Hard-Discount Grocery Retail",
    description: "Turkey's largest grocery retailer with high volume, private label assortment, and a zero-frills store concept.",
    financials: {
      revenue: 420000,
      operatingIncome: 21000,
      effectiveTaxRate: 25,
      totalAssets: 135000,
      cashAndEquivalents: 22000,
      nonInterestCurrentLiabilities: 65000,
      wacc: 28
    },
    industryStructure: {
      supplierPower: "düşük",
      buyerPower: "düşük",
      threatOfNewEntrants: "orta",
      threatOfSubstitutes: "orta",
      industryRivalry: "orta",
      profitPoolPosition: "Immense buyer monopsony power over food suppliers and negative cash conversion cycle (CCC)."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Economies of Scale", "Process Superiority", "Supplier Bargaining Power"],
      pricingPowerEvidence: "Ability to gain grocery market share during high inflation by guaranteeing the lowest basket price in the nation.",
      costAdvantageEvidence: "Strict limit of ~750 SKUs per store, pallet-based merchandising, and industry-lowest SG&A/Sales ratio."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Rapid on-demand grocery delivery services encroaching on traditional convenience foot traffic."
    },
    notes: "BIM operates on slim NOPAT margins (3-5%) but generates high ROIC through rapid 5x+ capital turnover.",
    updatedAt: "2026-08-20"
  },
  {
    id: "apple-dossier",
    companyName: "Apple Inc.",
    ticker: "AAPL (NASDAQ)",
    industry: "Consumer Tech & Digital Ecosystem",
    description: "Global ecosystem connecting 2+ billion active devices across iOS, macOS, Services, and custom silicon integration.",
    financials: {
      revenue: 385000,
      operatingIncome: 115000,
      effectiveTaxRate: 16,
      totalAssets: 350000,
      cashAndEquivalents: 65000,
      nonInterestCurrentLiabilities: 125000,
      wacc: 9
    },
    industryStructure: {
      supplierPower: "düşük",
      buyerPower: "düşük",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "düşük",
      industryRivalry: "düşük",
      profitPoolPosition: "Captures over 85% of total global smartphone industry operating profits alone."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Switching Costs", "Network Effect", "Brand Loyalty & Search Costs"],
      pricingPowerEvidence: "Over 90% customer retention and trade-in loyalty despite consistent ASP increases across iPhone generations.",
      costAdvantageEvidence: "Proprietary Apple Silicon (M & A series) delivering performance superiority and hardware margin expansion."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 20,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Antitrust scrutiny on App Store commissions and platform exclusivity."
    },
    notes: "Apple combines immense consumer willingness-to-pay (WTP) and steep switching costs to sustain 50%+ ROIC.",
    updatedAt: "2026-08-21"
  },
  {
    id: "thy-dossier",
    companyName: "Turkish Airlines",
    ticker: "THYAO (BIST)",
    industry: "Aviation & Global Transfer Hub",
    description: "Flag carrier airline flying to more countries than any other airline, leveraging the Istanbul mega-hub geographic advantage.",
    financials: {
      revenue: 650000,
      operatingIncome: 75000,
      effectiveTaxRate: 20,
      totalAssets: 950000,
      cashAndEquivalents: 110000,
      nonInterestCurrentLiabilities: 180000,
      wacc: 24
    },
    industryStructure: {
      supplierPower: "yüksek",
      buyerPower: "yüksek",
      threatOfNewEntrants: "orta",
      threatOfSubstitutes: "düşük",
      industryRivalry: "yüksek",
      profitPoolPosition: "While airports and GDS booking systems drain airline margins, THY excels via cargo scale and East-West transfer volume."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Economies of Scale", "Geographic Hub Monopoly", "Cargo Fleet Integration"],
      pricingPowerEvidence: "Low unit seat-cost (CASK) allowing competitive fare pricing for connecting passenger flows.",
      costAdvantageEvidence: "Access to 60+ capital cities within 4-hour flight radius of Istanbul, optimizing aircraft utilization."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "orta",
      priceWarRisk: "orta",
      managementCapitalAllocation: "ortalama"
    },
    sustainability: {
      estimatedCapYears: 8,
      moatWidth: "Dar Hendek (Narrow)",
      keyVulnerability: "Jet fuel price volatility, geopolitical flare-ups, and global wide-body capacity overhangs."
    },
    notes: "THY boasts exceptional geographic routing advantages, but airline industry economics limit permanent moat durability.",
    updatedAt: "2026-08-19"
  },
  {
    id: "nvidia-dossier",
    companyName: "Nvidia Corporation",
    ticker: "NVDA (NASDAQ)",
    industry: "Accelerated Computing & AI Hardware/Software",
    description: "Dominant AI accelerator architecture anchored by the CUDA developer ecosystem, NVLink fabric, and full-stack AI supercomputers.",
    financials: {
      revenue: 120000,
      operatingIncome: 75000,
      effectiveTaxRate: 15,
      totalAssets: 90000,
      cashAndEquivalents: 26000,
      nonInterestCurrentLiabilities: 18000,
      wacc: 10
    },
    industryStructure: {
      supplierPower: "orta",
      buyerPower: "orta",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "orta",
      industryRivalry: "düşük",
      profitPoolPosition: "Controls over 80% of datacenter AI training and inference accelerator operating profits."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Developer Lock-in (CUDA)", "High Switching Costs", "Scale Economics in R&D", "Full-Stack Network Architecture"],
      pricingPowerEvidence: "Surging demand for H100/Blackwell GPUs allowing 70%+ gross margins without loss of hyperscaler demand.",
      costAdvantageEvidence: "Massive annual R&D expenditure exceeding entire competitor balance sheets, yielding annual architectural leapfrogging."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Hyperscalers (Google TPU, AWS Trainium, Meta MTIA) designing custom in-house ASICs and TSMC wafer constraints."
    },
    notes: "CUDA software lock-in + rapid architectural pacing generates astronomical 100%+ ROIC during the AI infrastructure boom.",
    updatedAt: "2026-08-23"
  }
,

  {
    id: "thy-dossier",
    companyName: "Turkish Airlines",
    ticker: "THYAO (BIST)",
    industry: "Airlines & Transportation",
    description: "Global flag carrier standing out with its extensive flight network in the highly capital-intensive, cyclical airline industry.",
    financials: { revenue: 550000, operatingIncome: 65000, effectiveTaxRate: 20, totalAssets: 1100000, cashAndEquivalents: 150000, nonInterestCurrentLiabilities: 200000, wacc: 30 },
    industryStructure: { supplierPower: "yüksek", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "yüksek", profitPoolPosition: "Cyclical profitability ring due to intense competition and high fixed costs." },
    competitiveAdvantage: { primaryType: "ölçek_avantajı", subDrivers: ["Ağ Etkisi", "Ölçek Ekonomisi"], pricingPowerEvidence: "Limited pricing power due to intense rivalry and elastic (price-sensitive) demand.", costAdvantageEvidence: "Extensive network spreads fixed costs, but fuel and aircraft financing remain exogenous." },
    interactionAndDiscipline: { capacityDiscipline: "orta", priceWarRisk: "yüksek", managementCapitalAllocation: "yüksek_riskli" },
    sustainability: { estimatedCapYears: 5, keyVulnerability: "Fuel price shocks, geopolitical risks, and macroeconomic crises." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Airlines are historically known as 'value destroyers' or very narrow moat businesses. Competition is brutal and fixed costs are extremely high."
  },

  {
    id: "cocacola-dossier",
    companyName: "Coca-Cola",
    ticker: "KO (NYSE)",
    industry: "Beverages (FMCG)",
    description: "Beverage giant with one of the world's most powerful brand values, operating a highly profitable syrup and bottling network model.",
    financials: { revenue: 45000, operatingIncome: 13500, effectiveTaxRate: 21, totalAssets: 97000, cashAndEquivalents: 13000, nonInterestCurrentLiabilities: 20000, wacc: 8 },
    industryStructure: { supplierPower: "düşük", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "orta", profitPoolPosition: "Dominant position capturing the lion's share of the profit pool (syrup manufacturing) via brand strength." },
    competitiveAdvantage: { primaryType: "tüketici_avantajı", subDrivers: ["Marka/Arama Maliyeti", "Ölçek Ekonomisi"], pricingPowerEvidence: "Proven ability to raise prices during inflationary periods without losing sales volume.", costAdvantageEvidence: "Asset-light model achieved by outsourcing (low-margin) bottling and focusing strictly on (high-margin) concentrate sales." },
    interactionAndDiscipline: { capacityDiscipline: "yüksek", priceWarRisk: "düşük", managementCapitalAllocation: "etkin" },
    sustainability: { estimatedCapYears: 20, keyVulnerability: "Consumer shift towards healthier beverages." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "A textbook classic example of a 'wide moat' driven purely by Consumer Advantage (Brand)."
  }
];

export const BALANCE_SHEET_GUIDE_EN = [
  {
    field: "1. Annual Revenue (Hasılat / Turnover)",
    financialTable: "Income Statement (Gelir Tablosu)",
    lineName: "Revenue / Net Sales / Hasılat",
    tip: "Total value of products and services sold during the accounting period."
  },
  {
    field: "2. Operating Income (EBIT / Esas Faaliyet Kârı)",
    financialTable: "Income Statement (Gelir Tablosu)",
    lineName: "Operating Profit / Esas Faaliyet Kârı (Zararı)",
    tip: "Core operating earnings before interest expense and corporate income taxes."
  },
  {
    field: "3. Effective Tax Rate (%)",
    financialTable: "Income Statement Notes (Vergi Dipnotu)",
    lineName: "Income Tax Expense ÷ Pre-Tax Income",
    tip: "Typically 15-21% for US companies and 25-30% for Turkish BIST companies."
  },
  {
    field: "4. Total Assets (Toplam Aktifler)",
    financialTable: "Balance Sheet (Bilanço - Varlıklar)",
    lineName: "Total Assets / Toplam Varlıklar",
    tip: "Sum of all current and non-current balance sheet assets."
  },
  {
    field: "5. Cash & Cash Equivalents",
    financialTable: "Balance Sheet (Dönen Varlıklar)",
    lineName: "Cash and Short-Term Investments / Hazır Değerler",
    tip: "Non-operating liquid cash deducted when calculating Invested Capital."
  },
  {
    field: "6. Non-Interest Bearing Current Liabilities",
    financialTable: "Balance Sheet (Kısa Vadeli Yükümlülükler)",
    lineName: "Accounts Payable & Other Non-Interest Liabilities / Ticari Borçlar",
    tip: "Interest-free supplier capital (Accounts Payable) deducted to isolate true Invested Capital."
  },
  {
    field: "7. Cost of Capital (WACC / Hurdle Rate)",
    financialTable: "Market Valuation Analysis",
    lineName: "Weighted Average Cost of Capital",
    tip: "Minimum required rate of return demanded by debt and equity investors."
  }
];
