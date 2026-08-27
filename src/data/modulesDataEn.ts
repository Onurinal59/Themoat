import { LearningModule } from "../types";

export const MODULES_DATA_EN: LearningModule[] = [
  {
    id: 1,
    slug: "moat-and-value-creation",
    title: "Step 1: The Castle, Crocodile Moat & True Value Creation",
    subtitle: "Zero Knowledge Start: When Does a Business Truly Create Wealth?",
    estimatedMinutes: 14,
    iconName: "Shield",
    description:
      "Warren Buffett's iconic economic moat metaphor, Return on Invested Capital (ROIC), Cost of Capital (WACC), and the crucial mathematical divergence between accounting revenue and true shareholder value creation.",
    zeroKnowledgeSummary:
      "Even with zero financial background: Imagine starting a lemonade stand. If you borrow money from family at 10% interest, but your stand earns only a 5% return; even if lines are around the block and sales hit records, you are quietly destroying wealth! Real wealth begins only when your operational return (ROIC) exceeds your cost of capital (WACC).",
    moduleBridge: {
      transitionQuestion: "When does a business produce authentic economic wealth, and how does it protect that wealth from competitors?",
      nextTitle: "Step 2: Corporate Life Cycle (Dickinson Model)",
      whyNext: "We have mastered the mathematical spread between ROIC and WACC. But can companies sustain high returns forever? By tracking cash flow signs rather than chronological age, we identify exactly when a firm reaches peak compounding power.",
      previewQuestion: "How do (+ / -) signs on the Cash Flow Statement reveal a company's true life cycle stage and ROIC trajectory?",
    },
    sections: [
      {
        id: "m1-s1",
        title: "1. Warren Buffett's Castle and Moat Metaphor",
        summary: "Businesses are economic castles, and competitors are invaders seeking to storm them.",
        content: [
          "Imagine opening an exquisite, packed coffee shop in your neighborhood. Driven by capitalism, dozens of entrepreneurs will immediately open competing cafes next door to capture your high profits.",
          "Warren Buffett observes: 'We think of every business as an economic castle. In a free market, castles are under continuous assault. Millions of people think about how to take your profit. The fundamental question is: What kind of moat protects that castle?'",
          "An Economic Moat is a structural, durable barrier that prevents rivals from stealing your profits and market share. The deeper and wider the moat, the longer a company sustains superior returns.",
          "According to Michael Mauboussin's research at Morgan Stanley, only ~17% of public companies possess a genuine 'Wide Moat' lasting over 20 years."
        ],
        analogyBox: {
          title: "🏰 Castle and Moat Analogy",
          description:
            "Treasury inside the castle: The company's profits. Invading soldiers: Competitors. Crocodile-filled water moat: The company's patents, brand power, network effects, or cost advantages."
        },
        keyTakeaway:
          "When evaluating any long-term investment, the first and most critical question is: Does this business possess a durable moat defending its returns against imitation?"
      },
      {
        id: "m1-s2",
        title: "2. ROIC and WACC: The Mathematics of True Value Creation & Terminal Lab",
        summary: "When ROIC > WACC, a company creates real economic value. Otherwise, growth destroys shareholder wealth.",
        content: [
          "ROIC (Return on Invested Capital): How much net operating profit after tax (NOPAT) a business generates for every $100 tied up in working capital, equipment, and stores.",
          "WACC (Weighted Average Cost of Capital): The blended annual opportunity cost of capital (shareholder equity required returns + after-tax debt interest).",
          "Action in Terminal: In the simulator below, drag the left NOPAT slider upward; watch the green Economic Spread bar expand immediately on the right-hand terminal as annual wealth compounding surges.",
          "Diagnose the Capital Trap: Push the WACC slider above ROIC. Notice how the visual bar flips to Crimson Red—proving high revenue without economic spread actively destroys shareholder wealth."
        ],
        interactiveWidgetId: "roic-wacc",
        formulaBox: {
          title: "WACC & ROIC and Economic Spread Equation",
          equation: "WACC = (E/V × Ke) + (D/V × Kd × (1 - t))\nROIC = NOPAT / Invested Capital\nEconomic Spread = ROIC - WACC",
          variables: [
            { symbol: "E / V", label: "Equity Weight", desc: "Market Cap / Total Capital (70%)" },
            { symbol: "Ke", label: "Cost of Equity", desc: "CAPM: Risk-Free Rate + Beta × ERP (16%)" },
            { symbol: "D / V", label: "Debt Weight", desc: "Financial Debt / Total Capital (30%)" },
            { symbol: "Kd × (1 - t)", label: "Net Cost of Debt", desc: "After-tax interest cost (9%)" },
            { symbol: "NOPAT", label: "Operating Earnings", desc: "EBIT × (1 - Tax Rate)" }
          ],
          exampleCalculation: "WACC = (0.70 × 16%) + (0.30 × 12% × (1 - 0.25)) = 11.2% + 2.7% = 13.9%\nROIC = $180M / $1,000M = 18.0%\nSpread = 18.0% - 13.9% = +4.1% (Shareholder Value Creation)"
        },
        stepByStepMath: "Step 1: Cost of Equity = 10% Risk-Free + (1.2 Beta × 5% ERP) = 16.0%\nStep 2: After-Tax Debt = 12% Interest × (1 - 0.25 Tax) = 9.0%\nStep 3: Blended WACC = (0.70 × 16.0%) + (0.30 × 9.0%) = 13.9%\nStep 4: ROIC (18.0%) > WACC (13.9%) -> Positive +4.1% Annual Economic Spread",
        formulaDeepDiveId: "wacc",
        analogyBox: {
          title: "🍋 Lemonade Stand Example & Simulation",
          description:
            "You borrow $1,000 from family at 10% interest (WACC = 10%). By summer end, you net $180 operational profit (ROIC = 18%). After paying $100 interest, $80 pure wealth remains. But if you made only $60 (6% ROIC), you couldn't even cover the interest!"
        },
        keyTakeaway:
          "Unless ROIC exceeds the cost of capital (WACC), rapid revenue growth is simply an illusion masking wealth destruction."
      },
      {
        id: "m1-s3",
        title: "3. The Triad of Value Creation: Spread × Reinvestment Runway × CAP",
        summary: "Value = Spread (ROIC - WACC) × Reinvested Capital (I) × Duration (CAP).",
        content: [
          "In Michael Mauboussin and Dan Callahan's 'Measuring the Moat' framework, value creation is not a static single-year metric; it is the mathematical product of three pillars (The Triad):",
          "1. Magnitude (Spread): The distance between ROIC and WACC.",
          "2. Reinvestment Runway (I): How much incremental capital can be deployed at high rates of return (RONIC). A static 80% ROIC company with zero reinvestment runway (like See's Candies) is a wonderful dividend distributor, but high-reinvestment compounders (like Costco, Amazon, or early Walmart) create exponential multi-decade wealth.",
          "3. Duration & Mean Reversion (CAP & Fade Rate): In a competitive free market, excess profits attract capital like a magnet. Empirical research proves that most high-ROIC companies rapidly fade toward WACC within 5-10 years.",
          "Take Action in the Terminal: Adjust Initial ROIC and Decay Velocity (Fade Rate) in the model below. Observe how competitive pressure compresses the green spread zone toward WACC, and why total intrinsic wealth equals the cumulative area under the fade curve."
        ],
        interactiveWidgetId: "cap-fade",
        formulaBox: {
          title: "The Triad Compounding Equation",
          equation: "Cumulative Economic Value = Σ [ Capital(t) × (ROIC(t) - WACC) / (1 + WACC)^t ]\nSustainable Growth (g) = Reinvestment Rate (b) × Return on New Invested Capital (RONIC)",
          variables: [
            { symbol: "Spread", label: "Economic Spread", desc: "ROIC - WACC (Excess return per dollar of capital)" },
            { symbol: "Runway (b)", label: "Reinvestment Rate", desc: "Percentage of NOPAT profitably deployed back into the business" },
            { symbol: "CAP (Years)", label: "Moat Longevity", desc: "Duration of competitive advantage before returns decay to WACC" }
          ],
          exampleCalculation: "Company A: 40% ROIC, 10% Reinvestment = 4% Annual Growth (Cash Cow)\nCompany B: 18% ROIC, 80% Reinvestment = 14.4% Annual Growth (Compounding Powerhouse)"
        },
        formulaDeepDiveId: "roic",
        analogyBox: {
          title: "🏃‍♂️ Sprint vs. Marathon Runner",
          description:
            "A sprinter can break records in a 100m dash, but exhausts themselves in a 42km marathon. Wide moat compounders are marathon champions sustaining elite pace across decades."
        },
        keyTakeaway:
          "The greatest fortunes in investing are made by identifying businesses that combine high spread with a vast reinvestment runway and a long Competitive Advantage Period (CAP)."
      }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "In Warren Buffett's metaphor, what does an 'Economic Moat' represent?",
        options: [
          "The total volume of bank loans taken by a business",
          "A sustainable barrier protecting profits from imitation and competitive assault",
          "The annual advertising expenditure of a corporation",
          "The total employee salary budget"
        ],
        correctAnswerIndex: 1,
        explanation: "An economic moat is a durable competitive advantage that enables a company to maintain superior ROIC over decades."
      },
      {
        id: "q1-2",
        question: "What occurs when a company with 7% ROIC and 10% WACC doubles its revenue through aggressive capital expenditure?",
        options: [
          "It creates massive shareholder wealth because revenue grew",
          "It destroys shareholder wealth because every dollar invested earns less than its capital cost (Value Destruction)",
          "WACC automatically drops to zero",
          "ROIC immediately triples"
        ],
        correctAnswerIndex: 1,
        explanation: "When ROIC < WACC, capital expansion accelerates economic value destruction."
      },
      {
        id: "q1-3",
        question: "Why is debt interest multiplied by (1 - t) (the Tax Shield) when calculating WACC?",
        options: [
          "Banks pay penalties to the state",
          "Interest expenses are tax-deductible against corporate earnings, reducing the net effective cost of debt",
          "Shareholders do not pay any income tax",
          "Inflation erases debt liabilities"
        ],
        correctAnswerIndex: 1,
        explanation: "Because interest payments are deducted before corporate taxes on the income statement, the net cost of debt is Kd × (1 - t)."
      }
    ]
  },
  {
    id: 2,
    slug: "corporate-lifecycle",
    title: "Step 2: Corporate Life Cycle (Dickinson Model)",
    subtitle: "First Understand the True Age: Cash Flow Statement X-Ray",
    estimatedMinutes: 15,
    iconName: "TrendingUp",
    description:
      "In Module 1 we learned ROIC. But at what stage of their life cycle do companies generate high ROIC? Victoria Dickinson's 5-stage cash flow life cycle model and 8 cash flow sign combinations.",
    zeroKnowledgeSummary:
      "A baby, a college student, a working adult, and a retiree have vastly different spending habits. A company's true age is determined not by the calendar year of incorporation, but by the (+ / -) signs on its Cash Flow Statement. This method lets you instantly spot companies with paper profits whose bank accounts are silently draining.",
    moduleBridge: {
      prevTitle: "Step 1: The Castle, Crocodile Moat & True Value Creation",
      takeawayFromPrev: "A company produces real economic wealth only when ROIC > WACC.",
      transitionQuestion: "At what stage of its life cycle does a company achieve this high ROIC and transform into a cash-printing fortress?",
      nextTitle: "Step 3: The Value Stick (Microeconomic Foundations)",
      whyNext: "Having mapped life cycle stages and cash power, we now zoom in to the product unit level: Where does profit originate?",
      previewQuestion: "How is value split between the customer's maximum Willingness to Pay (WTP) and the supplier's cost floor?"
    },
    sections: [
      {
        id: "m2-s1",
        title: "1. Why Chronological Age Is Deceptive",
        summary: "A 100-year-old conglomerate can enter a new industry and rejuvenate; a 2-year-old startup can collapse prematurely.",
        content: [
          "Traditional analysis focused on the founding year. However, in the modern economy, calendar age fails to reveal a firm's operational vitality.",
          "Accounting professor Victoria Dickinson (2011) developed an empirical classification: examining the signs (+ or -) of the 3 primary cash flow arteries on the Cash Flow Statement!",
          "These 3 arteries are: 1. CFO: Cash Flow from Operations (actual cash from the core business), 2. CFI: Cash Flow from Investing (capital expenditures on factories/equipment/R&D), 3. CFF: Cash Flow from Financing (debt/equity issuance or debt repayment/dividends)."
        ],
        analogyBox: {
          title: "🌱 Human Life Cycle vs Corporate Life Cycle",
          description:
            "A college student cannot yet earn a full salary (Operations -), invests in their education and tuition (Investing -), and receives support/allowance from family (Financing +). This is the exact profile of an 'Introduction Stage' company!"
        },
        keyTakeaway:
          "Companies have no biological age; the directional flow of cash determines their true life cycle stage."
      },
      {
        id: "m2-s2",
        title: "2. The 5 Life Cycle Stages and Dickinson Cash Flow Fingerprints",
        summary: "Combinations of Operating, Investing, and Financing flows generate 5 core corporate life cycle stages.",
        content: [
          "1. Introduction (Giriş) [CFO: (-), CFI: (-), CFF: (+)]: The firm cannot yet generate operational cash from sales, invests heavily in capacity, and relies on external debt/equity funding. (Average ROIC: -2.8%)",
          "2. Growth (Büyüme) [CFO: (+), CFI: (-), CFF: (+)]: The business generates positive cash from operations, but expands so aggressively that internal cash plus external financing are poured into expansion CAPEX. (Average ROIC: +10.6%)",
          "3. Maturity (Olgunluk) [CFO: (+), CFI: (-), CFF: (-)]: The company has become a cash-printing fortress! Massive operating cash flows in, easily funding maintenance CAPEX, while surplus cash is returned to shareholders via buybacks and dividends. (Average ROIC: +11.2% - IDEAL MOAT STAGE)",
          "4. Shake-Out (Sarsıntı) [CFO: (+/-), CFI: (+/-), CFF: (+/-)]: Sector growth decelerates, price wars intensify, weaker players are eliminated, and profitability fluctuates. (Average ROIC: +3.8%)",
          "5. Decline (Düşüş) [CFO: (-), CFI: (+), CFF: (+/-)]: Core operations burn cash. To survive, the firm sells off factories and equipment to raise liquidity (CFI +). (Average ROIC: -12.0%)",
          "Action in Terminal: In the simulator below, use the left control panel to select preset company profiles (Apple, Early Startup, Declining Firm) or manually toggle CFO/CFI/CFF signs. Verify the corporate life cycle stage and cash distribution on the Recharts breakdown on the right."
        ],
        interactiveWidgetId: "dickinson",
        interactiveVisualId: "dickinson-lifecycle",
        formulaBox: {
          title: "Victoria Dickinson Cash Flow Life Cycle Model",
          equation: "Life Cycle Stage = Combination( CFO [Operations], CFI [Investing], CFF [Financing] )",
          variables: [
            { symbol: "CFO", label: "Cash Flow from Operations", desc: "Real cash collected from customers minus operating expenses" },
            { symbol: "CFI", label: "Cash Flow from Investing", desc: "CAPEX on factories, machines, R&D and fixed assets (-: Purchases, +: Asset Sales)" },
            { symbol: "CFF", label: "Cash Flow from Financing", desc: "Debt/equity issuance (+: Cash Inflow) or dividends/debt repayment (-: Cash Outflow)" }
          ],
          exampleCalculation: "Maturity Stage: CFO (+$300M) / CFI (-$80M) / CFF (-$150M)\nResult: Operations self-fund capital needs, debt is retired, and dividends are paid to shareholders!"
        },
        formulaDeepDiveId: "dickinson",
        analogyBox: {
          title: "🍎 The Stages of Apple",
          description:
            "Apple was in the Introduction stage in a garage in 1976. In 2007 with the iPhone, it entered hyper Growth. Today, generating ~$100B in annual operating cash flow and buying back stock, it is the quintessential Maturity castle."
        },
        keyTakeaway:
          "~74% of public companies reside in Growth (38%) or Maturity (36%) stages; the durability of economic moats is primarily tested during Maturity."
      }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "A company with Cash Flow from Operations (+), Cash Flow from Investing (-), and Cash Flow from Financing (-) is in which stage?",
        options: [
          "Introduction",
          "Growth",
          "Maturity",
          "Decline"
        ],
        correctAnswerIndex: 2,
        explanation:
          "In Maturity, the company generates large operational cash (+), funds ongoing capital investments (-), and uses remaining cash to retire debt or distribute dividends/buybacks (-)."
      },
      {
        id: "q2-2",
        question: "In Dickinson analysis, what does a positive (+) Cash Flow from Investing (CFI) typically indicate?",
        options: [
          "The company is opening brilliant new factories",
          "The company is liquidating plant, property, or equipment to cover operational cash deficits (a warning sign of Decline)",
          "The company is completely debt-free",
          "Shareholders received record dividend payouts"
        ],
        correctAnswerIndex: 1,
        explanation:
          "A positive CFI means the firm is not purchasing new productive assets; instead, it is selling off existing machinery, buildings, or business units to raise emergency cash."
      }
    ]
  },
  {
    id: 3,
    slug: "value-stick-microeconomics",
    title: "Step 3: The Value Stick (Microeconomic Foundations)",
    subtitle: "Customer Willingness to Pay (WTP) vs Company Cost",
    estimatedMinutes: 16,
    iconName: "Sliders",
    description:
      "We identified the life cycle stage. Now, how does a company generate profit at the individual product level? Felix Oberholzer-Gee's Value Stick: WTP, Price, Cost, and WTS surplus distribution.",
    zeroKnowledgeSummary:
      "Business is not just about raising prices. Enduring companies increase the value perceived by customers (WTP) or lower the supplier's cost floor (WTS), expanding the total pie for everyone. When customers are thrilled with the price and suppliers are delighted with the transaction, the firm captures massive sustainable margins.",
    moduleBridge: {
      prevTitle: "Step 2: Corporate Life Cycle (Dickinson Model)",
      takeawayFromPrev: "The cash flow profile (CFO+, CFI-, CFF-) proved the company is an established mature fortress.",
      transitionQuestion: "Where does this fortress generate its profit at the micro level when selling a single product or service?",
      nextTitle: "Step 4: Industry Map and Profit Pools",
      whyNext: "We saw how unit profit arises from the spread between WTP and Cost. But does the company keep this profit, or do other industry players (suppliers, distributors) capture it?",
      previewQuestion: "In an industry generating billions in revenue, which specific link in the value chain actually captures the economic profit?"
    },
    sections: [
      {
        id: "m3-s1",
        title: "1. The 4 Critical Rungs of the Value Stick",
        summary: "A product's commercial journey occurs between the customer's valuation ceiling and the supplier's cost floor.",
        content: [
          "1. WTP (Willingness to Pay): The absolute maximum ceiling price a customer is willing to pay based on perceived value, delight, and utility.",
          "2. Price: The actual dollar figure charged at checkout or on the invoice.",
          "3. Cost: The total accounting resources incurred by the firm to manufacture, distribute, and support the product.",
          "4. WTS (Willingness to Sell): The minimum reservation price acceptable to suppliers or employees to provide their inputs/labor (opportunity cost).",
          "Action in Terminal: In the simulator below, adjust the WTP, Price, Cost, and WTS sliders or click the Apple/Costco preset buttons. Watch how Consumer Surplus (blue), Firm Profit (green), and Supplier Surplus (purple) expand dynamically on the Recharts Value Stick on the right."
        ],
        interactiveVisualId: "value-stick",
        formulaBox: {
          title: "Felix Oberholzer-Gee Value Stick Equations",
          equation: "Total Value Created = WTP - WTS\nConsumer Surplus = WTP - Price\nFirm Value Creation = Price - Cost\nSupplier Surplus = Cost - WTS",
          variables: [
            { symbol: "WTP", label: "Willingness to Pay", desc: "Maximum ceiling value perceived by the customer" },
            { symbol: "Price", label: "Transaction Price", desc: "Actual price charged and collected at checkout" },
            { symbol: "Cost", label: "Unit Cost", desc: "Firm's direct raw materials, labor, and operational cost" },
            { symbol: "WTS", label: "Willingness to Sell", desc: "Supplier/employee minimum acceptable reservation cost" }
          ],
          exampleCalculation: "WTP ($100) - Price ($60) = $40 Consumer Surplus\nPrice ($60) - Cost ($25) = $35 Firm Profit\nCost ($25) - WTS ($15) = $10 Supplier Surplus\nTotal Value Created = $100 - $15 = $85"
        },
        formulaDeepDiveId: "value-stick",
        interactiveWidgetId: "value-stick",
        analogyBox: {
          title: "☕ A Specialty Cup of Coffee",
          description:
            "You are willing to pay up to $10 for an exquisite artisan coffee (WTP = $10). The cafe charges $6 (Price = $6). The cost to brew and serve it is $2.50 (Cost = $2.50). The coffee bean farmer was willing to sell at a minimum of $1.50 (WTS = $1.50)."
        },
        keyTakeaway:
          "The wider the distance between WTP and WTS, the larger the total economic pie available to be shared."
      },
      {
        id: "m3-s2",
        title: "2. Surpluses and Value Distribution: Who Captures What?",
        summary: "The total economic surplus is divided among Consumer Surplus, Firm Margin, and Supplier Surplus.",
        content: [
          "Consumer Surplus = WTP - Price. When a customer pays $60 for something they value at $100, they experience a $40 psychological 'delight buffer'. Loyal customers return repeatedly!",
          "Firm Value Creation / Margin = Price - Cost. Selling for $60 while spending $25 yields $35 in gross economic profit.",
          "Supplier / Employee Surplus = Cost - WTS. When a supplier receives $25 for an input they were willing to sell for $15, they capture $10 in supplier surplus.",
          "There are only 2 sustainable paths to expand firm value: Pushing WTP upward (Differentiation Strategy - Apple) or pulling WTS downward (Cost Leadership - Costco)."
        ],
        analogyBox: {
          title: "🤝 Zero-Sum Game vs Win-Win",
          description:
            "Mediocre companies squeeze suppliers to lower costs (zero-sum). Exceptional companies share real-time demand data and streamline logistics, lowering the supplier's actual WTS (win-win)."
        },
        keyTakeaway:
          "Attempting to boost profits purely by raising prices is vulnerable; durable success comes from driving up customer WTP and enlarging total surplus."
      }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "If a customer is willing to pay up to $2,000 for high-end headphones (WTP) and the store prices them at $1,400, what is the Consumer Surplus?",
        options: ["$3,400", "$2,000", "$600", "$0"],
        correctAnswerIndex: 2,
        explanation:
          "Consumer Surplus = WTP ($2,000) - Price ($1,400) = $600. The buyer perceives $600 in net value gain."
      },
      {
        id: "q3-2",
        question: "In the Value Stick framework, what is the primary objective of a 'Differentiation Strategy'?",
        options: [
          "Lowering WTS (Willingness to Sell)",
          "Increasing accounting Cost",
          "Raising customer WTP (Willingness to Pay)",
          "Increasing bank loan interest"
        ],
        correctAnswerIndex: 2,
        explanation:
          "Differentiation elevates customer Willingness to Pay (WTP) via superior design, branding, features, and service."
      }
    ]
  },
  {
    id: 4,
    slug: "industry-map-profit-pools",
    title: "Step 4: Industry Map and Profit Pools",
    subtitle: "The External Environment: The Fish May Be Healthy, But Is the Ocean Stormy?",
    estimatedMinutes: 16,
    iconName: "Compass",
    description:
      "Moving from micro unit economics to the entire industry: mapping the value chain, the airline profit pool (-$69B historical analysis), and market share stability (the 2% rule).",
    zeroKnowledgeSummary:
      "Warren Buffett observed: 'When a management with a reputation for brilliance tackles a business with a reputation for bad economics, the reputation of the business remains intact.' If you operate in a structurally value-destroying sector (like commercial airlines), even genius managers struggle to earn ROIC > WACC.",
    moduleBridge: {
      prevTitle: "Step 3: The Value Stick (Microeconomic Foundations)",
      takeawayFromPrev: "We learned how unit profit is born from the spread between WTP and Cost.",
      transitionQuestion: "Who captures this profit across the broader industry? Why do some links in the chain bleed cash while others print fortunes?",
      nextTitle: "Step 5: Porter's 5 Forces, Entry Barriers & 10-K Footnotes",
      whyNext: "Having identified where profit accumulates, what stops new entrants from storming in? We unpack Michael Porter's 5 forces and the 7 structural entry barriers.",
      previewQuestion: "What are the 7 defensive shields (Scale, Network Effects, Switching Costs, etc.) that keep rivals outside the gates?"
    },
    sections: [
      {
        id: "m4-s1",
        title: "1. Constructing an Industry Map (Case: US Commercial Aviation)",
        summary: "Mapping suppliers, airlines, airports, GDS booking systems, and passengers onto a unified grid.",
        content: [
          "A company's profitability does not exist in a vacuum; it is surrounded by buyers, suppliers, regulators, and rivals.",
          "Aviation Ecosystem: Aircraft makers (Boeing & Airbus - duopoly), Engine makers (GE, Rolls-Royce), Airports (local monopolies), Pilot unions, and Global Distribution Systems (Amadeus, Sabre).",
          "Airlines sit trapped between powerful monopoly suppliers and price-sensitive travelers!"
        ],
        analogyBox: {
          title: "🥪 The Airline in the Sandwich",
          description:
            "An airline is like a thin slice of cheese in a heavy sandwich: pressed from above by duopoly plane makers and monopoly airports, and squeezed from below by passengers demanding the cheapest flight."
        },
        keyTakeaway:
          "A firm's returns depend heavily on the bargaining power balance across the entire value chain."
      },
      {
        id: "m4-s2",
        title: "2. Profit Pool Analysis",
        summary: "Who commits the capital, and who actually captures the economic profit?",
        content: [
          "A Profit Pool plots Invested Capital Share (0-100%) on the X-axis and Economic Spread (ROIC - WACC) on the Y-axis.",
          "Box Area = Total Economic Profit / Loss ($). Formula: Economic Profit = Invested Capital × (ROIC - WACC).",
          "Aviation Insight: Airlines committed >75% of the sector's total capital but generated deep cumulative economic losses (-$69B). Meanwhile, asset-light GDS reservation systems (Amadeus) and Jet Fuel refiners captured massive positive economic profit.",
          "Action in Terminal: In the simulator below, select Airlines, Plane Manufacturers, or Booking Systems (GDS) from the left control panel. Observe on the Recharts Profit Pool chart on the right how capital share width (X) multiplied by return spread height (Y) translates directly into economic dollars created or destroyed."
        ],
        formulaBox: {
          title: "Economic Profit Pool Geometry",
          equation: "Economic Profit ($) = Invested Capital ($) × [ ROIC (%) - WACC (%) ]\nSegment Area = Segment Capital Share × Segment Spread",
          variables: [
            { symbol: "Capital Share", label: "X-Axis Width", desc: "Segment's weight of total industry invested capital" },
            { symbol: "ROIC - WACC", label: "Y-Axis Height", desc: "Segment's net economic spread per unit of capital" },
            { symbol: "Box Area", label: "Total Economic Profit", desc: "Net dollar wealth created or destroyed for shareholders" }
          ],
          exampleCalculation: "Airlines: $100B Capital × (5% ROIC - 9% WACC) = -$4B Wealth Destruction\nBooking Systems: $10B Capital × (35% ROIC - 9% WACC) = +$2.6B Net Value Creation!"
        },
        formulaDeepDiveId: "profit-pool",
        interactiveWidgetId: "profit-pool",
        analogyBox: {
          title: "🍿 Movie Theater vs Popcorn Stand",
          description:
            "The cinema spends millions building auditoriums and sound systems, but the 2-meter concession stand in the lobby captures almost all the net profit margin."
        },
        keyTakeaway:
          "Large revenue and massive factories do not guarantee profits; finding the high-spread niche in the profit pool is paramount."
      },
      {
        id: "m4-s3",
        title: "3. Market Share Volatility (Bruce Greenwald Rule)",
        summary: "If 5-year average market share volatility is ≤ 2%, the industry exhibits structural stability.",
        content: [
          "According to Columbia professor Bruce Greenwald, establishing a durable moat in industries where market shares swing wildly is near impossible.",
          "Formula: Compute the average 5-year absolute annual market share changes across all major competitors.",
          "If average change ≤ 2%, the market is stable (e.g., Search Engines: Google ~90%, Soft Drinks: Coca-Cola / Pepsi).",
          "If average change > 2%, the sector is unstable and prone to destructive price wars."
        ],
        analogyBox: {
          title: "💺 Musical Chairs Game",
          description:
            "In a frantic game where everyone scrambles for chairs on every beat, stable profits evaporate; in an established hall with assigned seats, companies compete rationally."
        },
        keyTakeaway:
          "Industries with high market share stability foster rational pricing discipline rather than capital-destroying turf wars."
      }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "In Profit Pool analysis, what does the geometric area of each segment's box represent?",
        options: [
          "Only the Y-axis ROIC percentage",
          "Total Economic Profit ($) (Invested Capital Share × [ROIC - WACC] Spread)",
          "The total number of employees",
          "Annual inflation rate"
        ],
        correctAnswerIndex: 1,
        explanation:
          "On a profit pool map, X is Invested Capital and Y is Economic Spread; the area of the rectangle equals total dollar economic profit."
      },
      {
        id: "q4-2",
        question: "According to Bruce Greenwald's rule of thumb, an industry is considered structurally stable when the 5-year average market share change is below:",
        options: ["20%", "10%", "2% or less", "0.01%"],
        correctAnswerIndex: 2,
        explanation:
          "An average absolute 5-year market share shift of 2% or less indicates a mature, stable oligopoly conducive to durable economic moats."
      }
    ]
  },
  {
    id: 5,
    slug: "porter-five-forces-barriers",
    title: "Step 5: Porter's 5 Forces, Entry Barriers & 10-K Footnotes",
    subtitle: "The Armor Keeping Rivals Out: Scale, Network Effects & R&D Capitalization",
    estimatedMinutes: 18,
    iconName: "Lock",
    description:
      "Mapping competitive forces: Michael Porter's 5 Forces, the 7 Entry Barriers, and 10-K Footnote Forensics for R&D and Operating Lease capitalization.",
    zeroKnowledgeSummary:
      "The harder it is for a new rival to enter your market, the safer your profits are. Furthermore, standard accounting rules treat software and pharma R&D as an immediate expense rather than a balance sheet asset; in this step, we learn how to perform forensic adjustments to uncover true invested capital.",
    moduleBridge: {
      prevTitle: "Step 4: Industry Map and Profit Pools",
      takeawayFromPrev: "We mapped where industry profit pools accumulate.",
      transitionQuestion: "What structural barriers protect high-profit pools from being overrun by new entrants?",
      nextTitle: "Step 6: Disruptive Innovation and Game Theory",
      whyNext: "We explored existing fortresses and entry barriers. But rivals don't only attack head-on; they engage in price wars or disrupt incumbent giants from below!",
      previewQuestion: "How do competitors maintain pricing discipline in game theory, and why do industry giants fall to low-end disruptors?"
    },
    sections: [
      {
        id: "m5-s1",
        title: "1. Michael Porter's 5 Forces Model and Entry Threats",
        summary: "The 5 gravitational forces governing industry profitability and the primacy of entry threats.",
        content: [
          "1. Threat of New Entrants - The single most critical force!",
          "2. Rivalry Among Existing Competitors",
          "3. Bargaining Power of Suppliers",
          "4. Bargaining Power of Buyers",
          "5. Threat of Substitutes"
        ],
        interactiveVisualId: "porter-forces",
        analogyBox: {
          title: "🌊 Winds Blowing from 5 Directions",
          description:
            "Your company is a ship sailing in a storm. Gusts blow from suppliers, buyers, neighboring ships, new pirates, and aircraft (substitutes). The ship's survival depends on structural resilience against all 5 forces."
        },
        keyTakeaway:
          "Bruce Greenwald highlights that 'Threat of New Entrants' is the master force governing the other four."
      },
      {
        id: "m5-s2",
        title: "2. The 7 Entry Barriers Protecting the Incumbent",
        summary: "Mechanisms that make entry prohibitively expensive or structurally unprofitable for newcomers.",
        content: [
          "1. Supply-Side Economies of Scale & MES (Minimum Efficient Scale): The incumbent spreads fixed costs over massive volume, yielding lowest unit cost. Small entrants face higher unit costs.",
          "2. Capital Requirements: Upfront capital barriers like TSMC spending $20B on a single semiconductor fabrication fab.",
          "3. Network Effects (Demand-Side Scale): Value grows exponentially as more users join (e.g., WhatsApp, Uber, Visa).",
          "4. Customer Switching Costs (Lock-in): High friction/cost for customers to switch vendors (e.g., SAP ERP systems, Bloomberg Terminal).",
          "5. Advantages Independent of Size & Wright's Law: Unit costs drop ~20% for every doubling of cumulative manufacturing experience (learning curve).",
          "6. Unequal Access to Distribution Channels: Supermarket shelf dominance or default browser agreements (Google paying Apple $20B/year).",
          "7. Government Regulation & Licensing: High regulatory hurdles ('Regulation is the incumbent's best friend')."
        ],
        analogyBox: {
          title: "🔌 Wright's Law and EV Batteries",
          description:
            "Early EV battery packs cost thousands of dollars per kWh. As cumulative global manufacturing scaled from thousands to millions of packs, costs plunged below $100/kWh."
        },
        keyTakeaway:
          "Industries protected by formidable entry barriers allow incumbents to sustain superior ROIC for decades."
      },
      {
        id: "m5-s3",
        title: "3. 10-K Footnote Adjustments: Capitalizing R&D & Operating Leases",
        summary: "Transforming immediate R&D expenses into multi-year amortizing balance sheet assets.",
        content: [
          "GAAP/IFRS rules immediately expense R&D budgets in the current year. For tech and biotech firms, this depresses reported operating earnings and conceals the true invested capital base.",
          "Mauboussin Forensic Adjustment: Add current R&D back to EBIT, amortize past R&D over 3-5 years, and add the net unamortized R&D asset to Invested Capital.",
          "Operating Leases: Calculate the present value (PV) of future minimum lease commitments (stores/aircraft) and add to both debt and fixed assets.",
          "Action in Terminal: In the simulator below, pick a 10-K scenario (e.g., Biotech & SaaS Firm) on the left panel or adjust R&D expenses and amortization life. Observe the stark difference between unadjusted reported earnings and true adjusted ROIC on the right."
        ],
        formulaBox: {
          title: "10-K Balance Sheet Adjustments & R&D / Lease Capitalization",
          equation: "Adjusted NOPAT = [ Reported EBIT + Current R&D - Annual R&D Amortization + Interest Component ] × (1 - t)\nAdjusted Invested Capital = Reported Capital + Net R&D Asset + Lease PV - Excess Cash",
          variables: [
            { symbol: "Net R&D Asset", label: "Capitalized R&D", desc: "Cumulative unamortized balance sheet R&D over 3-5 year lifespan" },
            { symbol: "Lease PV", label: "Operating Lease Debt", desc: "Discounted present value of non-cancellable operating lease obligations" },
            { symbol: "Excess Cash", label: "Non-Operating Cash", desc: "Surplus cash/Treasury bills not required for daily operations (deducted)" }
          ],
          exampleCalculation: "Reported EBIT: $500M | Current R&D: $300M | Amortization: $100M\nAdjusted EBIT = $500M + ($300M - $100M) = $700M\nAdded Balance Sheet Capital = +$500M Net R&D Asset Base"
        },
        formulaDeepDiveId: "footnote",
        interactiveWidgetId: "footnote-detective",
        analogyBox: {
          title: "🧪 Laboratory vs Steel Blast Furnace",
          description:
            "When a steelmaker builds a blast furnace, accounting capitalizes it over 30 years as an asset; when a pharma company discovers a life-saving vaccine, accountants treat it like a one-day expense! Footnote adjustments restore economic reality."
        },
        keyTakeaway:
          "Forensic capitalization of R&D and operating leases is essential to calculate the true ROIC of knowledge and asset-light enterprises."
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "According to Wright's Law (Learning Curve), approximately how much do unit manufacturing costs decline every time cumulative production volume doubles?",
        options: ["1%", "20%", "50%", "0% (costs remain unchanged)"],
        correctAnswerIndex: 1,
        explanation: "Wright's Law establishes that unit costs decline by ~20% for every doubling of cumulative manufacturing output."
      },
      {
        id: "q5-2",
        question: "What is the primary balance sheet impact of capitalizing and amortizing R&D expenditures?",
        options: [
          "It forces the company into immediate bankruptcy",
          "It reveals the true economic Invested Capital base and normalizes adjusted NOPAT earnings",
          "It reduces corporate tax rates to zero",
          "It multiplies the total share count"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Capitalizing R&D treats innovation expenditures as long-term productive assets, bringing Invested Capital and NOPAT into economic alignment."
      }
    ]
  },
  {
    id: 6,
    slug: "disruptive-innovation-game-theory",
    title: "Step 6: Disruptive Innovation and Game Theory",
    subtitle: "How David Beats Goliath: Christensen's Model & Tit-for-Tat",
    estimatedMinutes: 17,
    iconName: "Zap",
    description:
      "Even with thick castle walls, what if competitors tunnel in from below? Clayton Christensen's Disruptive Innovation, Prisoner's Dilemma in Price Wars, and Colonel Blotto strategies.",
    zeroKnowledgeSummary:
      "Sometimes industry giants collapse not because they were badly run, but because they did everything 'right': listening to their best customers and maximizing short-term margins! Meanwhile, an entrant enters from the low-end and quietly evolves. Furthermore, entering uncontrolled price wars destroys value for all competitors.",
    moduleBridge: {
      prevTitle: "Step 5: Porter's 5 Forces, Entry Barriers & 10-K Footnotes",
      takeawayFromPrev: "We audited the 7 entry barriers and hidden balance sheet R&D capital.",
      transitionQuestion: "What happens when rivals do not attack the fortress head-on, but reinvent the business model from below?",
      nextTitle: "Step 7: Internal Analysis & DuPont ROIC Forensic Dissection",
      whyNext: "Having mastered external forces and disruptive threats, we open the firm's balance sheet: Does it generate ROIC through High Margin or High Turnover?",
      previewQuestion: "How do Coca-Cola and Costco achieve the identical 16% ROIC through polar opposite business models?"
    },
    sections: [
      {
        id: "m6-s1",
        title: "1. Sustaining vs Disruptive Innovation",
        summary: "Sustaining innovation makes good products better; disruptive innovation reinvents the business model.",
        content: [
          "Sustaining Innovation: Making existing products faster, more powerful, and more expensive for demanding premium customers. Incumbent market leaders almost always win this game.",
          "Disruptive Innovation: A new business model that initially appears 'inferior, low-margin, or inadequate' to mainstream users, but is vastly cheaper, simpler, and more accessible.",
          "Overshooting: Incumbents add more complexity and performance than average customers need or are willing to pay for. Competition then pivots to simplicity, convenience, and low cost."
        ],
        analogyBox: {
          title: "📼 Blockbuster vs Netflix",
          description:
            "Blockbuster operated massive retail stores and earned ~15% of revenue from punitive late fees. Netflix started with mail-order DVDs with zero late fees, then pivoted to streaming. Blockbuster filed for bankruptcy in 2010!"
        },
        keyTakeaway:
          "Disruptive innovation is fundamentally a BUSINESS MODEL challenge, not merely a technology issue."
      },
      {
        id: "m6-s2",
        title: "2. Mini-Mills Steel Plants & Asymmetric Motivation",
        summary: "Incumbents accelerate their own downfall by fleeing low-margin market segments.",
        content: [
          "Christensen's classic case: Integrated steel mills refined iron ore into premium steel. Mini-mills melted cheap scrap steel in electric arc furnaces.",
          "Mini-mills first entered the lowest-margin product: rebar (concrete reinforcing rods). Integrated mills gladly ceded rebar, celebrating improved average corporate margins!",
          "However, mini-mills steadily refined their technology, climbed up-market into structural beams, and ultimately dominated sheet steel, driving integrated giants into distress."
        ],
        analogyBox: {
          title: "🪜 The Bottom Rung of the Ladder",
          description:
            "If you vacate the bottom rung of a ladder because 'it's dirty', you will eventually run out of rungs at the very top."
        },
        keyTakeaway:
          "Fleeing low-margin niches gives disruptive entrants the revenue runway needed to eventually conquer the core market."
      },
      {
        id: "m6-s3",
        title: "3. Prisoner's Dilemma & Tit-for-Tat in Price Wars",
        summary: "Escaping destructive Nash equilibrium in pricing wars using Robert Axelrod's Tit-for-Tat strategy.",
        content: [
          "Two rival airlines compete on the same route. If both maintain premium fares (Cooperation), both earn robust profits. If one slashes fares, it temporarily steals share.",
          "When both cut fares, prices drop below cost and both suffer severe losses (Nash Equilibrium Trap).",
          "Robert Axelrod proved the optimal repeated-game strategy is 'Tit-for-Tat': 1. Start with Cooperation (firm pricing), 2. Immediately retaliate if the rival cuts price, 3. Instantly forgive and restore normal pricing when the competitor cooperates.",
          "Action in Terminal: In the simulator below, pick Tit-for-Tat or Aggressive Undercutter from the left strategy panel; click 'Step Simulation' to advance rounds. Watch on the Recharts Cumulative Payoff graph on the right how disciplined retaliation outperforms destructive price wars."
        ],
        interactiveWidgetId: "game-theory",
        analogyBox: {
          title: "🕊️ The Dove vs the Hawk",
          description:
            "Initiating aggressive price wars destroys industry profit pools. Rational managers signal tacit coordination to preserve economic spread."
        },
        keyTakeaway:
          "Disciplined game theory and tacit coordination protect industry profit pools from mutually assured destruction."
      }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "According to Clayton Christensen, what does 'Overshooting' in a market mean?",
        options: [
          "A company going bankrupt and shutting its operations",
          "Product performance improvements exceeding what mainstream customers actually need and are willing to pay for",
          "Governments imposing excessive regulatory taxes",
          "Selling products in only one geographic region"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Overshooting occurs when companies pack excess features into products beyond what average customers value or can absorb."
      },
      {
        id: "q6-2",
        question: "In repeated game theory pricing tournaments, what is the initial move of the 'Tit-for-Tat' strategy?",
        options: [
          "Immediately slashing prices to attack the rival",
          "Starting with cooperation (maintaining disciplined pricing)",
          "Exiting the market completely",
          "Pricing randomly"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Tit-for-Tat always begins with cooperation (disciplined pricing), retaliates swiftly upon provocation, and forgives immediately upon reconciliation."
      }
    ]
  },
  {
    id: 7,
    slug: "internal-analysis-dupont-roic",
    title: "Step 7: Internal Analysis & DuPont ROIC Forensic Dissection",
    subtitle: "Margin Champion vs Velocity Champion: Costco vs Coca-Cola",
    estimatedMinutes: 18,
    iconName: "PieChart",
    description:
      "Opening the company's financial statements: DuPont decomposition (Margin × Turnover) and Amazon's Negative Cash Conversion Cycle (CCC = DIO + DSO - DPO).",
    zeroKnowledgeSummary:
      "Two companies with the exact same 16% ROIC can arrive there through polar opposite pathways: high pricing power (Coca-Cola making 26% NOPAT margin) vs extreme asset velocity (Costco making 3.8% margin but turning inventory at lightning speed). In this step, we learn how to perform a forensic audit of the balance sheet engine.",
    moduleBridge: {
      prevTitle: "Step 6: Disruptive Innovation and Game Theory",
      takeawayFromPrev: "We learned game theory price discipline and disruptive innovation mechanics.",
      transitionQuestion: "How does a company's internal engine produce its ROIC? Is it driven by Margin or Capital Turnover?",
      nextTitle: "Step 8: Reverse DCF, Brands and 60-Point Moat Audit",
      whyNext: "Having completed internal and external analysis, we reach the grand finale: reverse-engineering the Competitive Advantage Period (CAP) embedded in stock prices.",
      previewQuestion: "How many years of exceptional moat returns has the market already priced into the stock?"
    },
    sections: [
      {
        id: "m7-s1",
        title: "1. Operational Effectiveness vs Strategic Positioning",
        summary: "Doing things better than rivals is operational efficiency; strategy is choosing to perform different activities.",
        content: [
          "Michael Porter emphasizes: Operational Effectiveness is performing similar activities better than competitors. It is not strategy because best practices are quickly copied, eroding margins.",
          "Strategic Positioning is performing DIFFERENT activities or performing activities differently to deliver unique value with deliberate trade-offs.",
          "Southwest Airlines Case: Flew exclusively Boeing 737s, flew point-to-point rather than hub-and-spoke, and offered no seat assignments or meals. This slashed gate turnaround to 15 minutes and crushed competitors' cost structures."
        ],
        analogyBox: {
          title: "🎯 Trying to Please Everyone",
          description:
            "You cannot simultaneously be the world's most luxurious Michelin-starred restaurant and the cheapest drive-thru fast food chain. Choosing one requires deliberately sacrificing the other."
        },
        keyTakeaway:
          "Strategy is about deciding what NOT to do as much as deciding what to do."
      },
      {
        id: "m7-s2",
        title: "2. DuPont ROIC Dissection: Margin Champions vs Velocity Champions",
        summary: "ROIC (%) = NOPAT Margin (%) × Invested Capital Turnover (x).",
        content: [
          "In the DuPont mathematical identity, Sales cancels out: (NOPAT / Sales) × (Sales / Invested Capital) = NOPAT / Invested Capital = ROIC.",
          "Differentiation Path (High Margin / Low Turnover): Coca-Cola (26.2% margin, 0.61x turnover = 16.0% ROIC), Apple, Ferrari.",
          "Cost Leadership Path (Low Margin / High Turnover): Costco (3.8% margin, 4.21x turnover = 16.0% ROIC), Walmart.",
          "Costco and Coca-Cola produce the identical 16% ROIC, but one wins via pricing power while the other wins via asset velocity!",
          "Action in Terminal: In the simulator below, test Coca-Cola (Margin) vs Costco (Turnover) from the preset buttons, or adjust margin and asset turnover sliders. Discover on the DuPont Scatter Matrix on the right which operational axis powers your firm's return engine."
        ],
        formulaBox: {
          title: "DuPont ROIC Decomposition",
          equation: "ROIC (%) = NOPAT Margin (%) × Invested Capital Turnover (x)\nROIC = ( NOPAT / Sales ) × ( Sales / Invested Capital )",
          variables: [
            { symbol: "NOPAT Margin", label: "Profit Margin (Pricing Power)", desc: "Net operating profit kept from every $100 of revenue" },
            { symbol: "Capital Turnover", label: "Asset Velocity (Efficiency)", desc: "Annual revenue generated per $1 of invested capital" },
            { symbol: "Sales", label: "Bridging Metric", desc: "Sales acts as the bridge linking margin and balance sheet efficiency" }
          ],
          exampleCalculation: "Coca-Cola: 26.2% NOPAT Margin × 0.61x Capital Turnover = 16.0% ROIC\nCostco: 3.8% NOPAT Margin × 4.21x Capital Turnover = 16.0% ROIC"
        },
        formulaDeepDiveId: "dupont-ccc",
        interactiveWidgetId: "dupont",
        analogyBox: {
          title: "🏎️ Freight Truck vs Ferrari",
          description:
            "A Ferrari earns a massive margin on every single car sold. A freight truck makes a tiny margin per ton but runs non-stop 24/7 to generate the same total economic return."
        },
        keyTakeaway:
          "The most durable compounders adhere to 'Better before Cheaper' and 'Revenues before Cost'."
      },
      {
        id: "m7-s3",
        title: "3. Amazon's Secret Weapon: Negative Cash Conversion Cycle (CCC)",
        summary: "Collecting cash upfront and paying suppliers months later, funding growth with float.",
        content: [
          "Cash Conversion Cycle (CCC) = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO).",
          "1999 Barnes & Noble: Kept books on shelves for 149 days, collected cash in 6 days, paid publishers in 75 days. CCC = 149 + 6 - 75 = +80 Days! (Cash locked up in inventory for 80 days).",
          "1999 Amazon: Sold books in 29 days, collected credit card cash in 2 days, paid publishers in 60 days. CCC = 29 + 2 - 60 = -29 Days!",
          "Amazon held customer cash for nearly two months before paying suppliers, generating interest-free working capital float to fund hyper-expansion.",
          "Action in Terminal: In the simulator below, select Amazon vs Barnes & Noble from the company presets or adjust DIO, DSO, and DPO sliders. Watch the Recharts Waterfall chart on the right as negative working capital days create a massive interest-free liquidity engine."
        ],
        formulaBox: {
          title: "Cash Conversion Cycle (CCC)",
          equation: "CCC (Days) = DIO (Inventory Days) + DSO (Receivable Days) - DPO (Payable Days)",
          variables: [
            { symbol: "DIO", label: "Days Inventory Outstanding", desc: "(Average Inventory / COGS) × 365 Days" },
            { symbol: "DSO", label: "Days Sales Outstanding", desc: "(Accounts Receivable / Total Revenue) × 365 Days" },
            { symbol: "DPO", label: "Days Payable Outstanding", desc: "(Accounts Payable / COGS) × 365 Days" }
          ],
          exampleCalculation: "Barnes & Noble: 149 (DIO) + 6 (DSO) - 75 (DPO) = +80 Days (Positive CCC: Ties up capital)\nAmazon: 29 (DIO) + 2 (DSO) - 60 (DPO) = -29 Days (Negative CCC: Generates free float)"
        },
        formulaDeepDiveId: "dupont-ccc",
        interactiveWidgetId: "ccc",
        analogyBox: {
          title: "🏦 Trading on Other People's Money",
          description:
            "A customer pays you cash on January 1st; you deliver the product immediately but pay the manufacturing supplier on March 1st. For two whole months, you compound free float in your own bank account!"
        },
        keyTakeaway:
          "Balance sheet velocity and a negative cash conversion cycle provide exceptional financial leverage for disruptive compounders."
      }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "If Costco generates a 4.0% NOPAT profit margin and a 4.0x invested capital turnover, what is its ROIC?",
        options: ["8.0%", "16.0% (4.0% × 4.0)", "1.0%", "40.0%"],
        correctAnswerIndex: 1,
        explanation: "According to the DuPont identity, ROIC = NOPAT Margin (4%) × Capital Turnover (4.0x) = 16%."
      },
      {
        id: "q7-2",
        question: "What does it mean when a retailer possesses a Negative Cash Conversion Cycle (CCC)?",
        options: [
          "The company is approaching bankruptcy",
          "The company collects cash from customer sales well before paying suppliers, generating interest-free operational float",
          "The company cannot sell any inventory",
          "The company operates on physical cash only"
        ],
        correctAnswerIndex: 1,
        explanation:
          "A negative CCC allows a company to collect revenue from customers before paying supplier bills, providing free working capital float to fund organic growth."
      }
    ]
  },
  {
    id: 8,
    slug: "reverse-dcf-brands-checklist",
    title: "Step 8: Reverse DCF, Brands and 60-Point Moat Audit",
    subtitle: "The Grand Finale: Uncover Market Expectations, Tiffany Test & Morgan Stanley Checklist",
    estimatedMinutes: 20,
    iconName: "CheckSquare",
    description:
      "Synthesizing all tools: Reverse DCF to solve for the market's implied Competitive Advantage Period (CAP), Is Brand a Moat? (Tiffany diamond test), and the 60-Point Morgan Stanley Moat Checklist.",
    zeroKnowledgeSummary:
      "You cannot predict the future with a crystal ball. But you can reverse-engineer what future growth and moat longevity the current stock price implies (Reverse DCF). In this final module, we crown everything you have learned with an institutional investor moat checklist.",
    moduleBridge: {
      prevTitle: "Step 7: Internal Analysis & DuPont ROIC Forensic Dissection",
      takeawayFromPrev: "We unraveled the company's internal ROIC and negative working capital float engine.",
      transitionQuestion: "How many years of exceptional moat longevity (CAP) is the stock market currently pricing in? Is the stock cheap or overpriced?",
      nextTitle: "Congratulations! You completed the 8-Step Moat Academy Mastery Curriculum 🎓",
      whyNext: "You now possess institutional-grade competitive analysis tools. Apply them to real public companies using our live simulations and audit dossiers.",
      previewQuestion: "Are you ready to audit real 10-K balance sheets and hunt for enduring wide moats?"
    },
    sections: [
      {
        id: "m8-s1",
        title: "1. Reverse DCF and Implied CAP Horizon",
        summary: "Don't forecast the future; solve for the expectations embedded in current price.",
        content: [
          "In traditional DCF models, analysts attempt to forecast cash flows 10 years out, often with large forecasting error.",
          "Mauboussin's Reverse DCF: Invert the question: 'What future growth rate and Competitive Advantage Period (CAP) must this firm achieve to justify its current stock price?'",
          "Stock Price = Steady-State Value (NOPAT / WACC) + Present Value of Growth Opportunities (PVGO / CAP Years).",
          "If the market prices in 25 years of uncontested wide moat (CAP) in a fast-moving industry, the stock is priced for perfection. If the market prices in only 4 years of CAP for a company with 15-year patents, it presents a compelling margin of safety.",
          "Action in Terminal: In the simulator below, adjust Stock Price, Current NOPAT, Growth Rate, and WACC sliders or click preset scenarios (Apple, Coca-Cola, Overpriced Tech). Discover the split between Steady-State Value and PVGO Future Value, and determine the market's implied CAP (Moat) longevity on the right."
        ],
        formulaBox: {
          title: "Michael Mauboussin Reverse DCF & Implied CAP",
          equation: "Stock Price ($) = Steady-State Value (NOPAT / WACC) + Future Growth Options (PVGO)\nImplied CAP (Years) = f( Market Price, ROIC, WACC, Reinvestment Rate )",
          variables: [
            { symbol: "Steady-State Value", label: "Zero-Growth Value", desc: "Value of existing earnings produced in perpetuity without growth (NOPAT / WACC)" },
            { symbol: "PVGO", label: "Growth Expectation", desc: "Premium market price assigns to future value-creating investments" },
            { symbol: "CAP (Years)", label: "Implied Moat Period", desc: "Years ROIC must exceed WACC to justify current market price" }
          ],
          exampleCalculation: "NOPAT: $10/share | WACC: 8.0% | Stock Price: $350\nSteady-State Value = $10 / 0.08 = $125 (36%)\nPVGO (Growth Expectation) = $350 - $125 = $225 (64%)\nImplied CAP = 18 Years (The market requires 18 consecutive years of high spread to justify the price!)"
        },
        formulaDeepDiveId: "reverse-dcf",
        interactiveWidgetId: "reverse-dcf",
        analogyBox: {
          title: "🎯 Aiming at the Target",
          description:
            "The stock price is the bullseye on a target. Rather than guessing where the arrow lands, we ask: 'How fast and for how many years must the company run to hit this hurdle?'"
        },
        keyTakeaway:
          "Reverse DCF shifts the focus from speculating on the future to evaluating whether market expectations are realistic."
      },
      {
        id: "m8-s2",
        title: "2. Is Brand Alone an Economic Moat? (The Brand Acid Test)",
        summary: "Brand recognition alone is not a moat. A brand is a moat only if it increases customer WTP or lowers CAC.",
        content: [
          "Comparing Interbrand's 'Top 25 Global Brands' list against corporate ROIC reveals surprisingly weak correlation!",
          "Tiffany vs Costco Diamond Test: For two near-identical solitaire diamond rings, Tiffany charged $16,600 while Costco charged $6,600. An independent appraiser found only a $2,500 difference in wholesale components. Customers willingly paid a $10,000 premium for the iconic 'little blue box' and social signaling (WTP expansion).",
          "Charlie Munger's Chewing Gum Test: 'If I am in a foreign country and Glotz gum is 30 cents while Wrigley's is 40 cents, I am not going to put an unknown product in my mouth to save a dime.' (Search cost reduction and trust).",
          "The Brand Acid Test: A brand qualifies as an economic moat ONLY if demand is price-inelastic (e < 1) and market share is defended without continuous, crushing advertising expenses. Otherwise, brand awareness is merely an expensive operating cost.",
          "Take Action in the Terminal: Compare Tiffany (True Moat) vs CPG vs Ad-Dependent Commodity in the simulation below; test price hike shocks and verify how operating profit responds in real-time."
        ],
        interactiveWidgetId: "brand-acid-test",
        formulaBox: {
          title: "Brand Pricing Power & Price Elasticity",
          equation: "Price Elasticity of Demand (e) = | %Δ Quantity / %Δ Price |\nOperating Profit Margin = [ (Price × (1 - e × %ΔP)) - Unit COGS - CAC - Ad Expense ] / Revenue",
          variables: [
            { symbol: "e < 1", label: "Inelastic (Pricing Power)", desc: "Price increases directly translate to operating margin expansion" },
            { symbol: "CAC", label: "Customer Acquisition Cost", desc: "True brand recognition attracts organic customers at low CAC" },
            { symbol: "Ad Spend %", label: "Defensive Ad Budget", desc: "Mandatory annual marketing budget required to maintain share" }
          ],
          exampleCalculation: "Tiffany (e = 0.35): +10% Price Hike -> -3.5% Volume Drop -> Total Operating Profit +18%!\nCosmetic Brand (e = 2.2): +10% Price Hike -> -22% Volume Collapse -> Total Profit -34%!"
        },
        analogyBox: {
          title: "💎 The Little Blue Box Magic",
          description:
            "A diamond is chemically identical; however, gifting a Tiffany blue box elicits a very different emotional response than handing over a generic plastic bag. That difference is pure customer WTP."
        },
        keyTakeaway:
          "A brand's economic power is measured not by logo familiarity, but by customer willingness to pay a persistent premium (WTP) without churn."
      },
      {
        id: "m8-s3",
        title: "3. The 60-Point Morgan Stanley Moat Checklist",
        summary: "A 5-category institutional audit before presenting any company to an investment committee.",
        content: [
          "1. Industry Structure & Profit Pool (Buyer/Supplier bargaining power)",
          "2. Entry Barriers & Scale Advantages (MES, Wright's Law, Network Effects)",
          "3. Customer Advantages & Switching Costs (WTP ceiling, Lock-in)",
          "4. Management Capital Allocation Discipline (M&A avoidance, buyback timing)",
          "5. Moat Durability & Disruption Threat (CAP horizon, technological substitutes)",
          "Action in Terminal: In the simulator below, check items across the 5 categories on the left or load preset company audits (Apple Inc., Costco, Average Airline). Evaluate the fortress score and economic verdict on the Recharts Radar Breakdown on the right."
        ],
        interactiveWidgetId: "checklist",
        analogyBox: {
          title: "📋 The Pre-Flight Checklist",
          description:
            "Just as an airline captain audits every instrument prior to takeoff, institutional investors do not purchase a single share before auditing all 60 moat criteria."
        },
        keyTakeaway:
          "A systematic institutional checklist protects investors from emotional biases and cyclical illusions."
      }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "What is the primary advantage of Reverse DCF analysis over traditional discounted cash flow valuation?",
        options: [
          "It eliminates the need for speculative 10-year forecasts by solving for the expectations and moat duration (CAP) embedded in current stock prices",
          "It wipes out all corporate debt liabilities",
          "It only considers the previous year's net income",
          "It requires zero mathematical calculation"
        ],
        correctAnswerIndex: 0,
        explanation:
          "Reverse DCF starts with the observable market price to reveal the growth and Competitive Advantage Period hurdles the firm must beat to deliver excess returns."
      },
      {
        id: "q8-2",
        question: "In the Value Stick framework, what does Tiffany's ability to sell a diamond ring for $10,000 more than Costco demonstrate?",
        options: [
          "The mining cost of the diamond increased",
          "Brand prestige and signaling significantly elevate customer Willingness to Pay (WTP)",
          "Costco is prohibited from selling jewelry",
          "Tiffany is insolvent"
        ],
        correctAnswerIndex: 1,
        explanation:
          "Tiffany's brand status and trust signal dramatically increase customer Willingness to Pay (WTP), conferring superior pricing power."
      }
    ]
  }
];
