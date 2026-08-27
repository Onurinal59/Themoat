import { FormulaGuide } from "../types";

export const FORMULA_GUIDES_DATA_EN: Record<string, FormulaGuide> = {
  "wacc": {
    id: "wacc",
    title: "Weighted Average Cost of Capital (WACC)",
    badge: "MODULE 1: FINANCIAL FOUNDATIONS",
    subtitle: "How to Calculate the True Opportunity Cost of Capital Employed by a Business",
    coreEquation: "WACC = (E / V × Ke) + (D / V × Kd × (1 - t))",
    plainLanguageSummary:
      "WACC represents the blended annual percentage return a company must pay to its capital providers (equity investors and debt lenders) for every $100 raised. If a firm's projects or ROIC exceed WACC, wealth is created; otherwise, capital is being destroyed.",
    whyThisFormulaExists:
      "Companies source capital from two buckets: 1) Shareholders (Equity) and 2) Lenders/Bondholders (Debt). Assuming equity is 'free' is a catastrophic fallacy—equity investors demand 10-15% for business risk. Lenders require interest (e.g. 7%). Because interest is tax-deductible (Tax Shield: 1 - t), debt is cheaper after-tax. WACC calculates the blended hurdle rate.",
    variables: [
      {
        symbol: "E",
        name: "Market Value of Equity (Market Cap)",
        description: "Share Price × Total Diluted Shares Outstanding.",
        howToFindIt: "Current Market Capitalization on market quotes.",
      },
      {
        symbol: "D",
        name: "Total Net Interest-Bearing Debt",
        description: "Short-term loans, long-term bank debt, and issued bonds.",
        howToFindIt: "Balance sheet: Short-Term + Long-Term Financial Liabilities.",
      },
      {
        symbol: "V",
        name: "Total Enterprise Capitalization (E + D)",
        description: "Sum of Equity Market Value and Net Debt.",
        howToFindIt: "Calculated as E + D.",
      },
      {
        symbol: "Ke",
        name: "Cost of Equity (CAPM)",
        description: "Ke = Risk-Free Rate (Rf) + [Beta (β) × Equity Risk Premium (ERP)]. Minimum return required by equity holders.",
        howToFindIt: "10-Yr Treasury Yield + (Sector Beta × 5-6% ERP).",
      },
      {
        symbol: "Kd",
        name: "Gross Cost of Debt",
        description: "Average interest rate paid on borrowings and corporate notes.",
        howToFindIt: "Annual Interest Expense / Total Financial Debt.",
      },
      {
        symbol: "t",
        name: "Effective Corporate Tax Rate",
        description: "Tax rate paid by the enterprise (e.g., 25%).",
        howToFindIt: "Income Statement: Income Tax Expense / EBT.",
      },
      {
        symbol: "(1 - t)",
        name: "Tax Shield Multiplier",
        description: "Deduction factor reducing the after-tax cost of borrowing.",
        howToFindIt: "If tax is 25%, multiplier is 1 - 0.25 = 0.75.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Determine Cost of Equity (Ke) via CAPM",
        formula: "Ke = Rf + β × ERP",
        explanation:
          "With 4.5% risk-free rate, 1.1 Beta, and 5.5% ERP: Ke = 4.5% + (1.1 × 5.5%) = 10.55%.",
        exampleValues: "Rf = 4.5%, β = 1.1, ERP = 5.5% -> Ke = 10.55%",
      },
      {
        stepNumber: 2,
        title: "Calculate After-Tax Cost of Debt (Net Kd)",
        formula: "Net Kd = Kd × (1 - t)",
        explanation:
          "With 6% gross interest and 25% tax: Net Kd = 6% × (1 - 0.25) = 4.5%.",
        exampleValues: "Kd = 6.0%, t = 25% -> Net Kd = 4.5%",
      },
      {
        stepNumber: 3,
        title: "Calculate Capital Weights (E/V and D/V)",
        formula: "Weight_E = E / (E + D), Weight_D = D / (E + D)",
        explanation:
          "Equity $700M, Debt $300M -> Total V = $1,000M. Equity weight 70%, Debt weight 30%.",
        exampleValues: "E = $700M, D = $300M -> W_E = 70%, W_D = 30%",
      },
      {
        stepNumber: 4,
        title: "Compute Blended WACC",
        formula: "WACC = (W_E × Ke) + (W_D × Net Kd)",
        explanation:
          "WACC = (0.70 × 10.55%) + (0.30 × 4.5%) = 7.39% + 1.35% = 8.74%.",
        exampleValues: "(0.70 × 10.55%) + (0.30 × 4.5%) = 8.74% WACC",
      },
    ],
    realWorldExample: {
      company: "Tech Giant Case",
      scenario: "Evaluating a new data center expansion project with expected 18% ROIC.",
      calculationSteps: [
        "Market Cap: $800M, Debt: $200M (Total Capital = $1,000M).",
        "Equity Weight: 80%, Debt Weight: 20%.",
        "Cost of Equity: 15.0%, Gross Debt Interest: 10.0%, Tax Rate: 20%.",
        "Net Cost of Debt = 10% × (1 - 0.20) = 8.0%.",
        "WACC = (80% × 15.0%) + (20% × 8.0%) = 12.0% + 1.6% = 13.6%.",
      ],
      resultInterpretation:
        "Because project ROIC (18.0%) exceeds WACC (13.6%) by +4.4% positive spread, the expansion creates authentic economic value for shareholders.",
    },
    commonPitfalls: [
      "Treating shareholder equity as free capital with zero opportunity cost.",
      "Using book value of equity instead of live market capitalization.",
      "Forgetting to apply the (1 - t) tax shield on debt interest expenses.",
    ],
    calculatorType: "wacc",
  },
  "roic": {
    id: "roic",
    title: "Return on Invested Capital (ROIC & NOPAT)",
    badge: "MODULE 1 & 7: CAPITAL EFFICIENCY & MOAT",
    subtitle: "How Much Operating Cash Profit a Firm Generates for Every $100 Deployed",
    coreEquation: "ROIC = NOPAT / Invested Capital",
    plainLanguageSummary:
      "ROIC measures how much net cash profit a business generates for every dollar deployed in productive operational assets, regardless of capital structure or leverage.",
    whyThisFormulaExists:
      "Traditional metrics like ROE or Net Margin can be manipulated by debt leverage or financial engineering. ROIC is unlevered and exposes the true operational quality of factories, stores, and intangible moats.",
    variables: [
      {
        symbol: "NOPAT",
        name: "Net Operating Profit After Tax",
        description: "Operating Income (EBIT) × (1 - Effective Tax Rate).",
        howToFindIt: "Operating Income on Income Statement × (1 - Tax Rate).",
      },
      {
        symbol: "Invested Capital",
        name: "Total Operating Invested Capital",
        description: "Net Working Capital (Receivables + Inventory - Payables) + Net PP&E + Intangibles.",
        howToFindIt: "Total Assets - Non-Operating Cash - Non-Interest Bearing Current Liabilities.",
      },
      {
        symbol: "ROIC - WACC",
        name: "Economic Spread",
        description: "The percentage excess return earned above the cost of capital.",
        howToFindIt: "ROIC minus WACC.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Calculate NOPAT",
        formula: "NOPAT = EBIT × (1 - t)",
        explanation: "EBIT $200M with 25% tax: NOPAT = $200M × (1 - 0.25) = $150M.",
        exampleValues: "EBIT = $200M, t = 25% -> NOPAT = $150M",
      },
      {
        stepNumber: 2,
        title: "Calculate Net Working Capital (NWC)",
        formula: "NWC = (Receivables + Inventory) - Payables",
        explanation: "Operating capital tied up in day-to-day operations.",
        exampleValues: "Rec: $80M, Inv: $120M, Pay: $100M -> NWC = $100M",
      },
      {
        stepNumber: 3,
        title: "Sum Total Invested Capital",
        formula: "Invested Capital = NWC + Net PP&E",
        explanation: "Physical assets plus operating working capital = $100M + $400M = $500M.",
        exampleValues: "NWC = $100M, PP&E = $400M -> Invested Capital = $500M",
      },
      {
        stepNumber: 4,
        title: "Compute ROIC",
        formula: "ROIC = NOPAT / Invested Capital = $150M / $500M = 30.0%",
        explanation: "The company generates $30 of clean cash profit per year for every $100 deployed.",
        exampleValues: "ROIC = 30.0% (Exceptional economic moat signal)",
      },
    ],
    realWorldExample: {
      company: "Starbucks vs Low-Margin Commodity Retailer",
      scenario: "Starbucks leverages brand loyalty to generate massive NOPAT with modest invested capital.",
      calculationSteps: [
        "Starbucks NOPAT: $4.2B.",
        "Starbucks Invested Capital: $14.0B.",
        "ROIC = $4.2B / $14.0B = 30.0%.",
        "With industry WACC at 8.5%, Economic Spread = +21.5%.",
      ],
      resultInterpretation:
        "Starbucks earns returns 3.5x its cost of capital, representing concrete mathematical proof of a wide consumer moat.",
    },
    commonPitfalls: [
      "Leaving non-operating excess cash inside Invested Capital.",
      "Including interest expense in NOPAT (Interest reflects capital structure, not operating efficiency).",
      "Failing to capitalize off-balance-sheet operating leases or R&D.",
    ],
    calculatorType: "roic",
  },
  "value-stick": {
    id: "value-stick",
    title: "The Value Stick (WTP, Price, Cost, WTS)",
    badge: "MODULE 3: MICROECONOMIC VALUE CREATION",
    subtitle: "Capturing Value Between Customer Willingness to Pay and Supplier Cost",
    coreEquation: "Total Value Created = WTP (Willingness to Pay) - WTS (Willingness to Sell)",
    plainLanguageSummary:
      "The Value Stick demonstrates that businesses do not create profit from thin air—they divide value between the maximum benefit ceiling perceived by customers (WTP) and the minimum cost floor accepted by suppliers and employees (WTS).",
    whyThisFormulaExists:
      "Cost cutting alone rarely builds a durable moat. True moats arise from either elevating WTP to premium heights (Apple) or pushing supplier and operational costs to the industry floor (Costco/Walmart).",
    variables: [
      {
        symbol: "WTP",
        name: "Willingness to Pay",
        description: "The maximum price a customer is willing to pay before walking away.",
        howToFindIt: "Customer surveys, price elasticity tests, brand loyalty metrics.",
      },
      {
        symbol: "P",
        name: "Price",
        description: "The actual selling price charged by the company.",
        howToFindIt: "Revenue / Units Sold.",
      },
      {
        symbol: "C",
        name: "Cost",
        description: "The accounting cost incurred to produce and deliver the product.",
        howToFindIt: "Cost of Goods Sold + Operating Expenses.",
      },
      {
        symbol: "WTS",
        name: "Willingness to Sell",
        description: "The lowest compensation suppliers or employees would accept.",
        howToFindIt: "Supplier opportunity cost benchmarks.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Calculate Consumer Surplus",
        formula: "Consumer Surplus = WTP - Price",
        explanation: "If a customer values an iPhone at $1,500 and pays $1,200, they enjoy $300 of perceived value surplus.",
        exampleValues: "WTP = $1,500, P = $1,200 -> Surplus = $300",
      },
      {
        stepNumber: 2,
        title: "Calculate Firm Profit Margin",
        formula: "Firm Profit = Price - Cost",
        explanation: "Selling a $1,200 product with $600 manufacturing cost yields $600 profit margin.",
        exampleValues: "P = $1,200, C = $600 -> Firm Profit = $600",
      },
      {
        stepNumber: 3,
        title: "Calculate Supplier Surplus",
        formula: "Supplier Surplus = Cost - WTS",
        explanation: "If a supplier is willing to sell parts for $450 and receives $600, their surplus is $150.",
        exampleValues: "C = $600, WTS = $450 -> Supplier Surplus = $150",
      },
      {
        stepNumber: 4,
        title: "Determine Total Ecosystem Value",
        formula: "Total Value = WTP - WTS = $1,500 - $450 = $1,050",
        explanation: "The business creates $1,050 of total ecosystem surplus and claims the lion's share.",
        exampleValues: "Total Value Created = $1,050",
      },
    ],
    realWorldExample: {
      company: "Apple vs Commodity Smartphone Maker",
      scenario: "Apple drives WTP skyward via ecosystem lock-in, capturing 85% of global smartphone industry profits.",
      calculationSteps: [
        "Generic OEM: WTP = $400, Price = $350, Cost = $320 -> Profit = $30 (8.5% margin).",
        "Apple: WTP = $1,400, Price = $1,100, Cost = $500 -> Profit = $600 (54.5% margin).",
      ],
      resultInterpretation:
        "Apple leaves $300 consumer surplus to maintain fanatical loyalty while earning $600 profit per unit.",
    },
    commonPitfalls: [
      "Raising price above WTP, triggering customer defection.",
      "Cutting costs in ways that damage quality and destroy customer WTP.",
    ],
    calculatorType: "value-stick",
  },
  "dickinson": {
    id: "dickinson",
    title: "Dickinson Life Cycle & 8 Cash Flow Sign Patterns",
    badge: "MODULE 2: LIFE CYCLE FORENSICS",
    subtitle: "Diagnosing Corporate Stage via Operating, Investing, and Financing Cash Signs (+ / -)",
    coreEquation: "Cash Flow Fingerprint = (CFO, CFI, CFF) Signs",
    plainLanguageSummary:
      "Developed by Victoria Dickinson (2011), this framework uses the direction (+ / -) of Cash from Operations, Investing, and Financing to diagnose whether a firm is in Introduction, Growth, Maturity, Shake-Out, or Decline.",
    whyThisFormulaExists:
      "Accounting earnings can be managed or delayed, but cash flow signs cannot lie. A firm showing strong paper profits while burning operating cash or liquidating assets is masking distress.",
    variables: [
      {
        symbol: "CFO",
        name: "Cash from Operations",
        description: "Net cash generated from core business operations.",
        howToFindIt: "Cash Flow Statement - Operating Activities.",
      },
      {
        symbol: "CFI",
        name: "Cash from Investing",
        description: "Cash spent on CapEx, factories, or acquisitions (normally negative).",
        howToFindIt: "Cash Flow Statement - Investing Activities.",
      },
      {
        symbol: "CFF",
        name: "Cash from Financing",
        description: "Debt issuance, equity funding, dividends, and share repurchases.",
        howToFindIt: "Cash Flow Statement - Financing Activities.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Introduction Stage: ( - , - , + )",
        formula: "CFO: - , CFI: - , CFF: +",
        explanation: "Startup burns cash (-), builds initial capacity (-), and requires external equity/debt (+).",
        exampleValues: "Example: Early-stage Biotech",
      },
      {
        stepNumber: 2,
        title: "Growth Stage: ( + , - , + )",
        formula: "CFO: + , CFI: - , CFF: +",
        explanation: "Operations generate cash (+), but expansion is so rapid that external debt is also raised (+).",
        exampleValues: "Example: Fast-expanding tech scale-up",
      },
      {
        stepNumber: 3,
        title: "Maturity / Cash Cow: ( + , - , - ) [IDEAL MOAT]",
        formula: "CFO: + , CFI: - , CFF: -",
        explanation: "Massive operating cash (+), disciplined CapEx (-), and returns capital to shareholders (-).",
        exampleValues: "Example: Apple, Microsoft, Berkshire Hathaway",
      },
      {
        stepNumber: 4,
        title: "Decline Stage: ( - , + , + / - )",
        formula: "CFO: - , CFI: + , CFF: +/-",
        explanation: "Operations burn cash (-), forcing the company to sell factories and assets to survive (CFI +).",
        exampleValues: "Example: Distressed legacy conglomerate",
      },
    ],
    realWorldExample: {
      company: "Microsoft Cash Flow Profile",
      scenario: "Analyzing Microsoft's cash flow statement under the Dickinson framework.",
      calculationSteps: [
        "CFO: +$87.6B (Tremendous positive operational generation).",
        "CFI: -$22.7B (Active AI infrastructure and data center CapEx).",
        "CFF: -$43.9B (Dividends paid and aggressive share repurchases).",
      ],
      resultInterpretation:
        "Fingerprint: ( + , - , - ). A pristine Maturity & Cash Compounder profile that is completely self-funding.",
    },
    commonPitfalls: [
      "Assuming a positive CFI is good (Positive CFI often means the firm is selling off its revenue-generating assets).",
      "Ignoring negative CFO in companies showing rising paper Net Income.",
    ],
    calculatorType: "dickinson",
  },
  "profit-pool": {
    id: "profit-pool",
    title: "Industry Profit Pool Mapping",
    badge: "MODULE 4: INDUSTRY VALUE CHAIN",
    subtitle: "The Gap Between Capital Deployed and Economic Rent Across Value Chain Segments",
    coreEquation: "Economic Profit = Invested Capital × (ROIC - WACC)",
    plainLanguageSummary:
      "A Profit Pool maps where invested capital is tied up and where economic profit (spread × capital) accumulates across an entire industry value chain.",
    whyThisFormulaExists:
      "People often assume the segment with the highest revenue or largest physical assets earns the most profit. In reality, airlines tie up 65% of capital for 0% economic profit, while booking software providers (GDS) tie up 2% capital and harvest 40% of the profits.",
    variables: [
      {
        symbol: "Capital Share (%)",
        name: "Share of Industry Invested Capital",
        description: "Percentage of total industry assets deployed in this segment.",
        howToFindIt: "Aggregated industry balance sheets.",
      },
      {
        symbol: "ROIC - WACC",
        name: "Economic Spread",
        description: "Margin earned above capital hurdle rate in this segment.",
        howToFindIt: "Average segment ROIC minus WACC.",
      },
      {
        symbol: "Profit Pool Share (%)",
        name: "Share of Industry Economic Profit",
        description: "Percentage of total positive industry economic profit captured.",
        howToFindIt: "(Segment Economic Profit) / (Total Positive Industry Profit).",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Define Value Chain Links",
        formula: "Chain = Aircraft Manufacturers + Airlines + Airports + Booking (GDS)",
        explanation: "List every participant in the customer journey.",
        exampleValues: "4 Core Links",
      },
      {
        stepNumber: 2,
        title: "Calculate Capital Deployed in Each Link",
        formula: "Capital_Share = Link_Capital / Total_Industry_Capital",
        explanation: "Airlines buy planes (65% capital), software providers buy servers (2% capital).",
        exampleValues: "Airlines = $650M, Software = $20M",
      },
      {
        stepNumber: 3,
        title: "Determine Economic Spread per Link",
        formula: "Spread = ROIC - WACC",
        explanation: "Airlines: ROIC 6%, WACC 8% (-2%). Software: ROIC 35%, WACC 9% (+26%).",
        exampleValues: "Airlines: Negative, Software: +26%",
      },
      {
        stepNumber: 4,
        title: "Identify the Profit Pool Champions",
        formula: "Economic Profit = Capital × Spread",
        explanation: "Tollbooth assets with high spreads capture the profit pool.",
        exampleValues: "GDS and Airports capture 80% of net value.",
      },
    ],
    realWorldExample: {
      company: "Amadeus / Sabre (GDS) vs Global Airlines",
      scenario: "When a passenger buys a $500 flight, where does economic profit flow?",
      calculationSteps: [
        "Airline: Net margin ~$5 per seat after fuel, labor, and plane depreciation.",
        "GDS Software: Takes $4 booking fee with $0.10 server cost -> $3.90 clean profit.",
      ],
      resultInterpretation:
        "The airline assumes all operational and balance sheet risk, while the asset-light software bridge captures pure economic rent.",
    },
    commonPitfalls: [
      "Confusing high top-line revenue with high structural economic profit.",
      "Failing to locate the choke point (moat tollbooth) in the value chain.",
    ],
    calculatorType: "profit-pool",
  },
  "footnote": {
    id: "footnote",
    title: "10-K Footnote Forensic Adjustments (R&D & Leases)",
    badge: "MODULE 5: FORENSIC ACCOUNTING",
    subtitle: "Capitalizing R&D and Operating Leases to Expose Adjusted Invested Capital",
    coreEquation: "Adjusted NOPAT = EBIT + Current R&D - R&D Amortization",
    plainLanguageSummary:
      "Standard accounting rules (GAAP/IFRS) expense multi-year R&D and intangible investments immediately as if they were utility bills. Forensic adjustments capitalize these investments over their useful lives, revealing adjusted NOPAT and capital efficiency.",
    whyThisFormulaExists:
      "R&D is not a consumable expense—it builds durable intellectual property. Treating it as a long-term asset amortized over 3-7 years reveals whether innovative companies are actually lucrative compounders.",
    variables: [
      {
        symbol: "R&D Expense",
        name: "Current Year R&D Spending",
        description: "Total research and development spending in the income statement.",
        howToFindIt: "Income Statement - R&D Expense.",
      },
      {
        symbol: "Useful Life (N)",
        name: "R&D Amortization Horizon (Years)",
        description: "Estimated economic lifespan of technology (e.g. 3 yrs for software, 8 yrs for pharma).",
        howToFindIt: "Industry consensus standard.",
      },
      {
        symbol: "Lease Capitalization",
        name: "Operating Lease Debt Equivalent",
        description: "Present value of future minimum lease commitments.",
        howToFindIt: "10-K Footnotes - Commitments and Contingencies.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Add Back Current R&D Expense to EBIT",
        formula: "Adjusted EBIT = Reported EBIT + Current Year R&D",
        explanation: "Reported EBIT $100M + R&D $40M = Gross Adjusted EBIT $140M.",
        exampleValues: "EBIT = $100M, R&D = $40M -> $140M",
      },
      {
        stepNumber: 2,
        title: "Deduct Historical R&D Amortization",
        formula: "Amortization = Total Capitalized R&D / N",
        explanation: "Subtract annual amortization share ($25M) -> $115M Adjusted EBIT.",
        exampleValues: "$140M - $25M = $115M Adjusted EBIT",
      },
      {
        stepNumber: 3,
        title: "Add Net R&D Asset to Balance Sheet",
        formula: "Adjusted Capital = Reported Capital + Net R&D Asset",
        explanation: "Include unamortized R&D capital ($60M) inside Invested Capital.",
        exampleValues: "Invested Capital expands to true productive scale.",
      },
      {
        stepNumber: 4,
        title: "Capitalize Operating Leases",
        formula: "Lease Debt = Annual Rent × 8 (or discounted PV)",
        explanation: "Bring hidden off-balance-sheet store rental obligations onto the balance sheet.",
        exampleValues: "True leverage and asset base become transparent.",
      },
    ],
    realWorldExample: {
      company: "Pfizer / BioNTech R&D Adjustment",
      scenario: "During heavy vaccine development, BioNTech spent €1B on R&D, showing accounting losses.",
      calculationSteps: [
        "Reported GAAP Income: -€200M (Loss).",
        "R&D Spending: €1,000M.",
        "5-Year Amortization Share: €200M.",
        "Adjusted NOPAT = -€200M + €1,000M - €200M = +€600M (Highly profitable).",
      ],
      resultInterpretation:
        "Without forensic adjustment, world-class innovators appear to be loss-making value destroyers.",
    },
    commonPitfalls: [
      "Adding back R&D without deducting historical amortization.",
      "Applying the same amortization lifespan to fast-moving software and slow pharma trials.",
    ],
    calculatorType: "footnote",
  },
  "dupont-ccc": {
    id: "dupont-ccc",
    title: "DuPont ROIC & Cash Conversion Cycle (CCC)",
    badge: "MODULE 7: OPERATIONAL VELOCITY",
    subtitle: "ROIC = Margin × Turnover & CCC = DIO + DSO - DPO",
    coreEquation: "ROIC = (NOPAT / Sales) × (Sales / Invested Capital)",
    plainLanguageSummary:
      "A company can achieve a high ROIC in two distinct ways: 1) High Margin (Apple, Ferrari) or 2) High Turnover Velocity (Costco, Walmart). CCC measures whether suppliers are unwittingly providing interest-free growth financing.",
    whyThisFormulaExists:
      "DuPont analysis pinpoints whether a moat is built on pricing power or operational efficiency. Amazon and Costco compound rapidly because their negative CCC lets them collect cash from buyers before paying vendors.",
    variables: [
      {
        symbol: "NOPAT Margin",
        name: "Operating Profit Margin (%)",
        description: "NOPAT / Sales Revenue. Measures pricing power.",
        howToFindIt: "Income statement: NOPAT / Revenue.",
      },
      {
        symbol: "Capital Turnover",
        name: "Invested Capital Turnover (x)",
        description: "Sales Revenue / Invested Capital. Measures asset velocity.",
        howToFindIt: "Revenue / Invested Capital.",
      },
      {
        symbol: "DIO",
        name: "Days Inventory Outstanding",
        description: "Average days goods sit in warehouses before being sold.",
        howToFindIt: "(Average Inventory / COGS) × 365.",
      },
      {
        symbol: "DSO",
        name: "Days Sales Outstanding",
        description: "Average days required to collect customer receivables.",
        howToFindIt: "(Receivables / Revenue) × 365.",
      },
      {
        symbol: "DPO",
        name: "Days Payable Outstanding",
        description: "Average days taken to pay vendor invoices.",
        howToFindIt: "(Payables / COGS) × 365.",
      },
      {
        symbol: "CCC",
        name: "Cash Conversion Cycle",
        description: "DIO + DSO - DPO. Negative CCC provides interest-free float.",
        howToFindIt: "DIO + DSO - DPO.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Calculate NOPAT Margin",
        formula: "Margin = NOPAT / Revenue",
        explanation: "$20M NOPAT on $100M Revenue -> 20.0% Margin.",
        exampleValues: "Revenue = $100M, NOPAT = $20M -> 20%",
      },
      {
        stepNumber: 2,
        title: "Calculate Capital Turnover",
        formula: "Turnover = Revenue / Invested Capital",
        explanation: "$100M Revenue / $50M Capital -> 2.0x Turnover.",
        exampleValues: "Revenue = $100M, Capital = $50M -> 2.0x",
      },
      {
        stepNumber: 3,
        title: "Multiply via DuPont ROIC",
        formula: "ROIC = Margin × Turnover = 20.0% × 2.0x = 40.0%",
        explanation: "Operational margin times capital velocity produces 40.0% ROIC.",
        exampleValues: "ROIC = 40.0%",
      },
      {
        stepNumber: 4,
        title: "Compute Cash Conversion Cycle (CCC)",
        formula: "CCC = DIO (30d) + DSO (5d) - DPO (65d) = -30 Days",
        explanation: "Negative 30 days means the company holds customer cash for a full month before paying suppliers.",
        exampleValues: "CCC = -30 Days (Interest-free operational float)",
      },
    ],
    realWorldExample: {
      company: "Costco vs Tiffany & Co.",
      scenario: "Costco wins through ultra-fast turnover and negative CCC; Tiffany wins through premium gross margins.",
      calculationSteps: [
        "Costco: Margin 2.5%, Turnover 6.0x -> ROIC = 15.0% (CCC: -5 days).",
        "Tiffany: Margin 15.0%, Turnover 1.0x -> ROIC = 15.0% (CCC: +180 days).",
      ],
      resultInterpretation:
        "Both achieve 15% ROIC, but Costco uses supplier float as a zero-interest growth engine.",
    },
    commonPitfalls: [
      "Focusing only on profit margin while ignoring asset turnover speed.",
      "Assuming positive working capital is always a sign of strength.",
    ],
    calculatorType: "dupont-ccc",
  },
  "reverse-dcf": {
    id: "reverse-dcf",
    title: "Reverse DCF & Competitive Advantage Period (CAP)",
    badge: "MODULE 8: VALUATION EXPECTATIONS",
    subtitle: "Reverse-Engineering Market Implied Growth and Moat Duration from Stock Price",
    coreEquation: "Stock Price = Steady-State Value + Future Value Creation (CAP Years)",
    plainLanguageSummary:
      "Instead of attempting to forecast unpredictable future cash flows, Reverse DCF asks: 'What revenue growth, margin, and moat duration (CAP) must this business sustain to justify its current stock price?'",
    whyThisFormulaExists:
      "Stock prices are bundles of market expectations. If the market prices in 25 years of flawless high-ROIC growth for a cyclical firm, the stock is risky. If the market prices in only 3 years for a firm with 15-year patents, it is undervalued.",
    variables: [
      {
        symbol: "Stock Price (P)",
        name: "Current Market Share Price",
        description: "Live market trading price of the stock.",
        howToFindIt: "Live quote.",
      },
      {
        symbol: "NOPAT / WACC",
        name: "Steady-State Value",
        description: "Value of the company assuming zero future growth and perpetual current earnings.",
        howToFindIt: "NOPAT / WACC.",
      },
      {
        symbol: "CAP (Years)",
        name: "Competitive Advantage Period",
        description: "The number of years the company can sustain ROIC > WACC.",
        howToFindIt: "Solved in Reverse DCF to equate intrinsic value with price.",
      },
      {
        symbol: "Implied Growth (%)",
        name: "Market Implied Revenue CAGR",
        description: "The hurdle rate of annual top-line expansion priced in by consensus.",
        howToFindIt: "Reverse-engineered from DCF model.",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Calculate Steady-State Value",
        formula: "Steady-State Value = NOPAT / WACC",
        explanation: "For $100M NOPAT and 10% WACC: Steady-state value is $1,000M.",
        exampleValues: "NOPAT = $100M, WACC = 10% -> $1,000M",
      },
      {
        stepNumber: 2,
        title: "Subtract Steady-State from Market Cap",
        formula: "Future Growth Value = Market Cap - Steady-State Value",
        explanation: "If Market Cap is $2,500M: Growth Premium = $2,500M - $1,000M = $1,500M (60% of price is future hope!).",
        exampleValues: "60% of current share price is tied to future moat durability.",
      },
      {
        stepNumber: 3,
        title: "Solve for Implied CAP Horizon",
        formula: "CAP Years = f(Price, Growth, ROIC, WACC)",
        explanation: "To justify this price at 15% ROIC, the firm must maintain its moat for 14 straight years.",
        exampleValues: "Implied CAP = 14 Years",
      },
      {
        stepNumber: 4,
        title: "Compare Against Structural Moat Reality",
        formula: "Decision = Company's True Moat vs Market Implied CAP",
        explanation: "If your fundamental audit reveals a 20-year moat, the stock is attractive; if 5 years, it is expensive.",
        exampleValues: "Strategic Expectations Decision",
      },
    ],
    realWorldExample: {
      company: "Coca-Cola vs Hyped Tech Startup",
      scenario: "Testing whether consensus expectations match economic reality.",
      calculationSteps: [
        "Coca-Cola Implied CAP: 18 Years (Realistic given 50+ years of brand dominance).",
        "Trendy E-Commerce IPO Implied CAP: 22 Years (Unrealistic given low switching costs).",
      ],
      resultInterpretation:
        "Reverse DCF replaces speculative crystal-ball forecasting with a disciplined audit of market consensus.",
    },
    commonPitfalls: [
      "Assuming stock price reflects only past accounting performance.",
      "Using unrealistic terminal growth rates that distort DCF math.",
    ],
    calculatorType: "reverse-dcf",
  },
};

export const FORMULA_GUIDES_MAP_EN = FORMULA_GUIDES_DATA_EN;
export const FORMULA_GUIDES_LIST_EN = Object.values(FORMULA_GUIDES_DATA_EN);
