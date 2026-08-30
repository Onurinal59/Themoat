import { CompanyAuditDossier, FinancialMetricInputs } from "../types";

export interface BalanceSheetGuideItem {
  id: string;
  metricName: string;
  formula: string;
  whereToFindTr: string; // KAP / BIST Finansal Tablo Yolu
  whereToFindUs: string; // SEC 10-K / GAAP Yolu
  practicalMeaning: string;
  warningTip: string;
}

export const BALANCE_SHEET_GUIDE_TR: BalanceSheetGuideItem[] = [
  {
    id: "ebit",
    metricName: "Esas Faaliyet Kârı (EBIT / Operating Income)",
    formula: "Hasılat - Satışların Maliyeti - Faaliyet Giderleri (Pazarlama, Ar-Ge, Genel Yönetim)",
    whereToFindTr: "Gelir Tablosu -> 'Esas Faaliyet Kârı (Zararı)' kalemi. (Finansman giderleri ve vergiden ÖNCEKİ satır).",
    whereToFindUs: "Income Statement -> 'Operating Income' veya 'Operating Profit'.",
    practicalMeaning: "Şirketin ana işinden, finansman borçlarından bağımsız olarak ne kadar operasyonel kâr ürettiğini gösterir.",
    warningTip: "Diğer Faaliyetlerden Gelirler/Giderler (kur farkı vb.) gibi tek seferlik kalemleri ayıklayarak 'Net Esas Faaliyet Kârı'na odaklanın."
  },
  {
    id: "nopat",
    metricName: "Vergi Sonrası Net Faaliyet Kârı (NOPAT)",
    formula: "Esas Faaliyet Kârı (EBIT) × (1 - Efektif Vergi Oranı)",
    whereToFindTr: "Gelir Tablosu'ndan EBIT alınır. Dipnotlardaki Vergi Gideri / Vergi Öncesi Kâr ile efektif vergi oranı (%) hesaplanıp çarpılır.",
    whereToFindUs: "Operating Income × (1 - Effective Tax Rate).",
    practicalMeaning: "Şirketin sıfır borcu olsaydı ve sadece ana faaliyetinden elde ettiği kâr üzerinden vergi ödeseydi hissedarlara ve borç verenlere kalacak net nakit akımı.",
    warningTip: "Net Kâr yerine mutlaka NOPAT kullanılmalıdır çünkü Net Kâr borç faizlerinden etkilenir, operasyonel üstünlüğü gizler."
  },
  {
    id: "invested_capital",
    metricName: "Yatırılan Sermaye (Invested Capital - IC)",
    formula: "(Toplam Varlıklar - Nakit ve Nakit Benzerleri) - Faizsiz Kısa Vadeli Borçlar (Ticari Borçlar)",
    whereToFindTr: "Bilanço -> Varlıklar toplamından (Dönen Varlıklar içindeki Nakit ve Finansal Yatırımlar) çıkarılır. Yükümlülüklerden Ticari Borçlar ve diğer faizsiz borçlar düşülür.",
    whereToFindUs: "Balance Sheet -> Total Assets - Cash & Short-Term Equivalents - Non-Interest Bearing Current Liabilities (Accounts Payable).",
    practicalMeaning: "Şirketin bu kârı üretmek için işe fiilen bağladığı toplam net sermaye (fabrikalar, stoklar, net işletme sermayesi).",
    warningTip: "Kasada duran atıl fazla nakit operasyon için şart değilse yatırılan sermayeden çıkarılmalıdır, aksi halde ROIC haksız yere düşük çıkar."
  },
  {
    id: "roic",
    metricName: "Yatırılan Sermaye Getirisi (ROIC)",
    formula: "NOPAT / Yatırılan Sermaye (Invested Capital)",
    whereToFindTr: "Yukarıdaki NOPAT'ın Yatırılan Sermaye'ye bölünmesiyle bulunur.",
    whereToFindUs: "NOPAT / Invested Capital.",
    practicalMeaning: "İşe yatırılan her 100 TL veya 100 $ sermaye karşılığında şirketin kaç TL/Dolar vergi sonrası operasyonel getiri ürettiği. (%20+ mükemmel hendek işaretidir).",
    warningTip: "ROE (Özsermaye Kârlılığı) şirketin borçlanarak yapay şekilde yükseltebileceği bir metriktir. ROIC ise borç hilesine kanmaz!"
  },
  {
    id: "wacc",
    metricName: "Sermaye Maliyeti (WACC - Hurdle Rate)",
    formula: "(Özsermaye Payı × Özsermaye Maliyeti) + (Borç Payı × Borç Maliyeti × (1 - Vergi))",
    whereToFindTr: "Genellikle risksiz faiz oranı (Türkiye 10 Yıllık Tahvil) + Hisse Beta × Hisse Risk Primi formülüyle tahmin edilir (Genelde BIST için %25-35, ABD için %8-10).",
    whereToFindUs: "Weighted Average Cost of Capital (US piyasasında ortalama %8-%10 aralığındadır).",
    practicalMeaning: "Yatırımcıların ve bankaların bu şirkete sermaye sağlarken talep ettiği asgari getiri oranı.",
    warningTip: "ROIC > WACC ise şirket hissedara EKONOMİK DEĞER YARATIR. ROIC < WACC ise şirket büyüdükçe değer yok eder!"
  },
  {
    id: "pricing_power",
    metricName: "Fiyatlama Gücü (Pricing Power / WTP Kanıtı)",
    formula: "Enflasyon / Maliyet Artış Dönemlerinde Brüt Kâr Marjı (Gross Margin) Değişimi",
    whereToFindTr: "Faaliyet Raporu & Gelir Tablosu -> (Hasılat - Satışların Maliyeti) / Hasılat. Son 5 yıldaki krizlerde marj korundu mu?",
    whereToFindUs: "Gross Profit Margin stability over 5-10 years across inflation cycles.",
    practicalMeaning: "Şirket girdi maliyetleri (hammadde, işçilik) arttığında bunu müşterisine hissettirmeden veya müşteri kaybetmeden zam olarak yansıtabiliyor mu?",
    warningTip: "Müşterinin gitmeye yeri yoksa (geçiş maliyeti yüksekse) brüt kâr marjı krizlerde bile sabit kalır veya artar."
  }
];

export const BALANCE_SHEET_GUIDE_EN: BalanceSheetGuideItem[] = [
  {
    id: "ebit",
    metricName: "Operating Income (EBIT)",
    formula: "Revenue - Cost of Goods Sold (COGS) - Operating Expenses (SG&A, R&D)",
    whereToFindTr: "Income Statement -> 'Esas Faaliyet Kârı' line before interest and tax expenses.",
    whereToFindUs: "Income Statement -> 'Operating Income' or 'Operating Profit'.",
    practicalMeaning: "Shows how much operational profit the core business produces, independent of capital structure and debt financing.",
    warningTip: "Filter out one-off non-operating gains/losses (FX translation, asset sales) to isolate recurring Operating Income."
  },
  {
    id: "nopat",
    metricName: "Net Operating Profit After Tax (NOPAT)",
    formula: "Operating Income (EBIT) × (1 - Effective Tax Rate)",
    whereToFindTr: "EBIT × (1 - Effective Tax Rate derived from tax expense footnote).",
    whereToFindUs: "Operating Income × (1 - Effective Tax Rate).",
    practicalMeaning: "The unlevered after-tax cash earnings generated by core operations available to all providers of capital (debt and equity).",
    warningTip: "Never use Net Income instead of NOPAT; Net Income is distorted by interest expense and capital structure."
  },
  {
    id: "invested_capital",
    metricName: "Invested Capital (IC)",
    formula: "(Total Assets - Cash & Equivalents) - Non-Interest Bearing Current Liabilities (NIBCL)",
    whereToFindTr: "Total Assets minus Operating Cash minus Accounts Payable and trade payables.",
    whereToFindUs: "Balance Sheet -> (Total Assets - Cash & Short-Term Investments) - Accounts Payable & Non-Interest Current Liabilities.",
    practicalMeaning: "The total net operating capital tied up in the business to generate operational earnings (PP&E, working capital, inventory).",
    warningTip: "Exclude excess non-operating cash; otherwise ROIC will be artificially penalized for holding large cash cushions."
  },
  {
    id: "roic",
    metricName: "Return on Invested Capital (ROIC)",
    formula: "NOPAT / Invested Capital",
    whereToFindTr: "Calculated by dividing NOPAT by Invested Capital.",
    whereToFindUs: "NOPAT / Invested Capital.",
    practicalMeaning: "For every $100 of net capital invested, how many dollars of after-tax operating profit does the company produce? (20%+ signifies a solid moat).",
    warningTip: "ROE can be artificially inflated with excessive financial debt. ROIC sees through financial leverage tricks."
  },
  {
    id: "wacc",
    metricName: "Weighted Average Cost of Capital (WACC / Hurdle Rate)",
    formula: "(Weight of Equity × Cost of Equity) + (Weight of Debt × Cost of Debt × (1 - Tax))",
    whereToFindTr: "Risk-free rate + Beta × Equity Risk Premium (Typically 8-10% in US, 25-35% in high-inflation markets).",
    whereToFindUs: "WACC (Typically between 8% to 10% for developed US markets).",
    practicalMeaning: "The minimum required rate of return demanded by all investors and lenders providing capital to the business.",
    warningTip: "When ROIC > WACC, the firm CREATES economic value. When ROIC < WACC, growth destroys shareholder value!"
  },
  {
    id: "pricing_power",
    metricName: "Pricing Power (WTP Evidence)",
    formula: "Gross Profit Margin stability across inflation & input cost surges",
    whereToFindTr: "Gross Margin = (Revenue - COGS) / Revenue. Did margins hold during inflation spikes?",
    whereToFindUs: "Gross Profit Margin stability over 5-10 years across inflation cycles.",
    practicalMeaning: "Can the company raise prices to pass on cost increases without losing unit volume or customers?",
    warningTip: "High switching costs and strong customer willingness-to-pay (WTP) allow gross margins to remain steady during inflationary shocks."
  }
];

export function getBalanceSheetGuide(isEnglish: boolean): BalanceSheetGuideItem[] {
  return isEnglish ? BALANCE_SHEET_GUIDE_EN : BALANCE_SHEET_GUIDE_TR;
}

export const BALANCE_SHEET_GUIDE = BALANCE_SHEET_GUIDE_TR;

export const MAUBOUSSIN_GUIDED_TEMPLATE: CompanyAuditDossier = {
  id: "mauboussin-master-template",
  companyName: "Costco Wholesale (Mauboussin Template)",
  ticker: "COST (NASDAQ)",
  industry: "Toptan Satış & Üyelikli Perakende",
  description: "Michael Mauboussin's 5-step economic moat methodology: ROIC decomposition, Profit Pools, Value Stick (WTP/WTS), Game Theory, and CAP duration.",
  financials: {
    revenue: 242000,
    operatingIncome: 8500,
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
    profitPoolPosition: "Membership fees account for over 70% of total operating income. Products are sold near cost, locking in customer loyalty and creating negative working capital."
  },
  competitiveAdvantage: {
    primaryType: "ölçek_avantajı",
    subDrivers: ["Ölçek Ekonomisi", "Geçiş Maliyeti", "Süreç Üstünlüğü", "Nitelikli Tedarikçi Pazarlığı", "Arama Maliyeti/Marka"],
    pricingPowerEvidence: "Membership renewal rate exceeds 92%. Fee increases do not cause customer attrition because shoppers realize savings far exceed the annual fee (Consumer Surplus / WTP).",
    costAdvantageEvidence: "Carries only ~3,800 SKUs (1/10th of supermarkets), enabling massive volume purchasing per SKU. Operates with zero advertising and negative working capital."
  },
  interactionAndDiscipline: {
    capacityDiscipline: "yüksek",
    priceWarRisk: "düşük",
    managementCapitalAllocation: "mükemmel"
  },
  sustainability: {
    estimatedCapYears: 20,
    moatWidth: "Geniş Hendek (Wide)",
    keyVulnerability: "Long-term erosion of physical shopping habits by automated e-commerce delivery networks."
  },
  notes: `[MAUBOUSSIN STUDY GUIDE]:
1. ROIC Analysis: High ROIC can be generated not only via high margin, but through rapid capital turnover (DuPont framework).
2. Value Stick: Passing cost efficiencies back to consumers (Scale-Economies Shared) creates an insurmountable barrier for competitors.
3. Negative Working Capital: Cash collected upfront from customers, suppliers paid in 60 days; business funds its own growth without external debt.`,
  updatedAt: "2026-08-22",
  createdAt: "2026-08-22",
  isCustom: false,
  lastStep: 1,
  tags: ["Rehber Taslak", "Mauboussin Vakası", "Geniş Hendek"]
};

export interface StepMethodologyGuide {
  step: number;
  title: string;
  mauboussinQuote: string;
  coreConcepts: string[];
  keyQuestions: string[];
  commonPitfalls: string[];
  practicalExercise: string;
}

export const STEP_METHODOLOGY_GUIDES_TR: Record<number, StepMethodologyGuide> = {
  1: {
    step: 1,
    title: "Adım 1: Finansal Röntgen (ROIC & DuPont Ayrıştırması)",
    mauboussinQuote: "'Stratejinin temel amacı sürdürülebilir bir ekonomik değer (ROIC > WACC) yaratmaktır. Büyüme, ancak getiri sermaye maliyetini aştığı zaman değer yaratır.' — Michael J. Mauboussin",
    coreConcepts: [
      "NOPAT (Net Operating Profit After Tax): Borç yapısından bağımsız ana faaliyet kârı.",
      "Invested Capital (Yatırılan Sermaye): Şirketin işe fiilen bağladığı net operasyonel sermaye (Varlıklar - Nakit - Faizsiz Borçlar).",
      "DuPont Ayrıştırması: ROIC = NOPAT Marjı (%) × Sermaye Devir Hızı (Kez). Kâr marjınız düşük olsa bile sermayeyi hızlı döndürerek devasa ROIC üretebilirsiniz (BIM/Costco örneği).",
      "Ekonomik Yayılım (Spread): ROIC - WACC farkı. Bu fark pozitifse şirket her 100 TL yatırımla hissedarına zenginlik katar."
    ],
    keyQuestions: [
      "Şirketin son 3-5 yıllık ROIC ortalaması sermaye maliyetinin (WACC) belirgin şekilde üzerinde mi?",
      "ROIC'i yükselten ana motor yüksek fiyat/marj mı, yoksa hızlı sermaye devri mi?",
      "Kasada bekleyen atıl nakit operasyondan arındırıldı mı?"
    ],
    commonPitfalls: [
      "Net Kâr veya F/K oranına aldanmak (Net Kâr borç faizi ve tek seferlik gelirlerle bozulur; NOPAT'a bakın).",
      "ROE'yi (Özsermaye Kârlılığı) ROIC sanmak (ROE aşırı borçlanarak yapay şekilde şişirilebilir).",
      "WACC'ı hesaba katmadan sadece yüksek ciro büyümesine odaklanmak (ROIC < WACC iken büyüme değer yok eder)."
    ],
    practicalExercise: "İncelediğiniz şirketin NOPAT marjı ile Sermaye Devir Hızını çarpın. Sonucun ROIC ile birebir örtüştüğünü ve şirketin hangi koldan rekabet ettiğini teyit edin."
  },
  2: {
    step: 2,
    title: "Adım 2: Sektör Yapısı & Kâr Havuzu (Industry & Profit Pool)",
    mauboussinQuote: "'Bir şirketin performansı büyük ölçüde içinde bulunduğu sektörün yapısı tarafından belirlenir. Kötü bir sektörde harika bir yönetim bile vasat kalabilir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Porter'ın 5 Gücü: Tedarikçi gücü, Müşteri gücü, Yeni giren tehdidi, İkame tehdidi ve Sektör içi rekabet şiddeti.",
      "Kâr Havuzu (Profit Pool): Değer zincirindeki tüm gelirlerin hangi halkada kâra dönüştüğünü gösteren harita.",
      "Sektör Giriş Engelleri: Regülasyonlar, devasa sabit sermaye gereksinimi veya coğrafi tekel konumları."
    ],
    keyQuestions: [
      "Sektördeki toplam kârın çoğunu hangi halka topluyor? (Örn: Havacılıkta havaalanları ve rezervasyon sistemleri mi, uçak şirketleri mi?)",
      "Yeni bir rakip yarın pazara girmek istese ne kadar sermaye ve zaman harcamak zorunda kalır?",
      "Müşteriler veya tedarikçiler birleşerek fiyat baskısı kurabiliyor mu?"
    ],
    commonPitfalls: [
      "Sadece şirketin kendi operasyonuna odaklanıp sektörün yapısal bozukluğunu görmezden gelmek.",
      "Cirosu çok yüksek olan halkaların kâr havuzunun da büyük olduğunu varsaymak."
    ],
    practicalExercise: "Şirketin değer zincirindeki tedarikçilerini ve alıcılarını listeleyin. Şirketin kimden fiyat tavizi koparabildiğini belirleyin."
  },
  3: {
    step: 3,
    title: "Adım 3: Değer Çubuğu & Hendek Motorları (WTP / WTS & Moat Drivers)",
    mauboussinQuote: "'Ekonomik hendek, müşterinin ödeme istekliliği (WTP) ile tedarikçinin satış istekliliği (WTS) arasındaki mesafeyi rakiplerden daha fazla açabilmektir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Tüketici Avantajı (WTP Artışı): Geçiş Maliyeti (Switching Cost), Ağ Etkisi (Network Effect), Arama Maliyeti & Güçlü Marka.",
      "Üretim / Maliyet Avantajı (WTS İndirimi): Eşsiz hammadde erişimi, patentler veya devasa coğrafi lojistik üstünlüğü.",
      "Ölçek Ekonomisi (Scale Economics): Sabit maliyetlerin devasa satış hacmine bölünerek birim maliyetin rakiplerin erişemeyeceği seviyeye indirilmesi.",
      "Fiyatlama Gücü (Pricing Power): Enflasyon döneminde müşteri kaybetmeden zam yapabilme kabiliyeti."
    ],
    keyQuestions: [
      "Müşteri bu şirketin ürününü bırakıp rakibe geçerse hangi maddi/manevi maliyetlere katlanır?",
      "Yeni kullanıcılar katıldıkça sistem mevcut kullanıcılar için daha değerli hale geliyor mu? (Ağ Etkisi)",
      "Şirket maliyet avantajını cebe mi atıyor yoksa 'Scale-Economies Shared' ile tüketiciye aktarıp rakipleri mi boğuyor?"
    ],
    commonPitfalls: [
      "Geçiş maliyeti olmayan sadece popüler bir reklam kampanyasını 'Geniş Hendek' sanmak.",
      "Patent süresinin bitimine az kalmış ilaç/teknoloji şirketlerinde hendeği kalıcı zannetmek."
    ],
    practicalExercise: "Şirketin son 3 kriz veya enflasyon dönemindeki Brüt Kâr Marjı (Gross Margin) değişimini inceleyin. Fiyatlama gücünü kanıtlayın."
  },
  4: {
    step: 4,
    title: "Adım 4: Oyun Teorisi, Kapasite & Sermaye Tahsisi",
    mauboussinQuote: "'Rakiplerin stratejik hamleleri ve yönetimin serbest nakdi nereye tahsis ettiği, hendeklerin ömrünü belirleyen en kritik etkileşimlerdir.' — Michael J. Mauboussin",
    coreConcepts: [
      "Mahkumlar Çıkmazı (Prisoner's Dilemma): Sektördeki oyuncuların fiyat kırarak veya aşırı kapasite kurarak birbirlerinin kârını yok etmesi riski.",
      "Kapasite Disiplini: Sektör oyuncularının talep düşüşlerinde üretimi kısabilme olgunluğu.",
      "Sermaye Tahsisi (Capital Allocation): Yönetimin ürettiği nakdi; Organik Büyüme, Temettü, Hisse Geri Alımı veya Satın Almalara (M&A) ne kadar rasyonel yönlendirdiği."
    ],
    keyQuestions: [
      "Sektörde yıkıcı fiyat kırma savaşları yaşanıyor mu?",
      "Yönetim hisseler ucuzken hisse geri alımı yapıyor mu, yoksa pahalı satın almalarla hissedar değerini mi yok ediyor?",
      "Kapasite fazlası riski var mı?"
    ],
    commonPitfalls: [
      "Yüksek ciro büyümesi için verimsiz şirket satın almaları (M&A) yapan yönetimleri başarılı sanmak.",
      "Döngünün zirvesinde yapılan devasa fabrika yatırımlarının sonraki yıllarda ROIC'i çökerteceğini öngörememek."
    ],
    practicalExercise: "Yönetimin son 3 yılda serbest nakit akımını (FCF) nereye harcadığını kontrol edin: Temettü, hisse geri alımı, borç ödeme mi yoksa agresif satın alma mı?"
  },
  5: {
    step: 5,
    title: "Adım 5: Hendek Ömrü (CAP) & Nihai Teşhis Raporu",
    mauboussinQuote: "'Rekabetçi Avantaj Dönemi (CAP), bir şirketin sermaye maliyetinin üzerinde getiri üretebileceği süredir. Piyasalar genellikle bu süreyi yanlış fiyatlar.' — Michael J. Mauboussin",
    coreConcepts: [
      "CAP (Competitive Advantage Period): Hendeklerin rakipler tarafından kopyalanana kadar şirketi koruduğu süre (Genelde 5-20 yıl).",
      "Ortalamaya Dönüş (Mean Reversion): Yüksek kârların zamanla yeni rakipleri çekerek ROIC'i sektör ortalamasına çekme eğilimi.",
      "Yıkıcı İnovasyon (Disruption) Tehdidi: Hendek duvarlarını aşmak yerine hendeği anlamsız kılan yeni teknoloji veya iş modelleri."
    ],
    keyQuestions: [
      "Bu şirketin ROIC'i önümüzdeki 10 yıl boyunca WACC'ın üzerinde kalmaya devam edebilir mi?",
      "Hendeği tehdit eden en büyük teknolojik, regülatif veya tüketici alışkanlığı riski nedir?",
      "100 üzerinden Mauboussin Hendek Skoru kaç çıktı ve sonuç Geniş mi, Dar mı?"
    ],
    commonPitfalls: [
      "Bugünkü yüksek kârlılığın sonsuza kadar aynı hızla süreceğini varsaymak (Ortalamaya dönüş yasasını unutmak).",
      "Hendek genişliği ile hisse senedi değerlemesini (Fiyat/Değer) karıştırmak (Harika bir hendek bile aşırı pahalı fiyattan alınırsa kötü yatırım olabilir)."
    ],
    practicalExercise: "Tek tıkla kopyalanabilir yatırımcı notunu inceleyin ve şirketin en kırılgan 1 zayıf noktasını belirleyin."
  }
};

export const STEP_METHODOLOGY_GUIDES_EN: Record<number, StepMethodologyGuide> = {
  1: {
    step: 1,
    title: "Step 1: Financial X-Ray (ROIC & DuPont Decomposition)",
    mauboussinQuote: "'The ultimate goal of strategy is to create sustainable economic value (ROIC > WACC). Growth only creates value when returns exceed the cost of capital.' — Michael J. Mauboussin",
    coreConcepts: [
      "NOPAT (Net Operating Profit After Tax): Operating profit free of financial leverage and interest distortion.",
      "Invested Capital: Net operational capital tied up in operations (Assets - Operating Cash - Non-Interest Liabilities).",
      "DuPont Decomposition: ROIC = NOPAT Margin (%) × Capital Turnover (x). High returns can stem from either fat margins or lightning-fast inventory/capital turns (Costco model).",
      "Economic Spread: ROIC - WACC. When positive, every $100 of capital deployed compounds shareholder wealth."
    ],
    keyQuestions: [
      "Is the firm's 3-5 year average ROIC comfortably above its cost of capital (WACC)?",
      "Is ROIC driven predominantly by pricing margin or velocity of capital turnover?",
      "Has non-operating cash been excluded from invested capital?"
    ],
    commonPitfalls: [
      "Relying on Net Income or P/E ratios (distorted by leverage and one-off items).",
      "Confusing ROE with ROIC (ROE can be levered up with debt).",
      "Chasing top-line revenue growth when ROIC is below WACC."
    ],
    practicalExercise: "Multiply NOPAT Margin by Capital Turnover to verify ROIC matches precisely and identify the company's competitive engine."
  },
  2: {
    step: 2,
    title: "Step 2: Industry Structure & Profit Pools",
    mauboussinQuote: "'Industry structure is the foundation of competitive advantage. A company in a structurally attractive industry can prosper even with mediocre management.' — Michael J. Mauboussin",
    coreConcepts: [
      "Porter's 5 Forces: Supplier power, Buyer power, Threat of entry, Threat of substitutes, and Competitive rivalry.",
      "Profit Pool: The distribution of industry profit across each node in the value chain.",
      "Barriers to Entry: Regulatory licenses, capital scale requirements, network lock-ins."
    ],
    keyQuestions: [
      "Which link in the value chain captures the lion's share of profits?",
      "How much capital and lead time would a new entrant require to compete effectively?",
      "Can buyers or suppliers organize to squeeze operating margins?"
    ],
    commonPitfalls: [
      "Analyzing the company in isolation without evaluating industry forces.",
      "Assuming high-revenue segments correspond to large profit pools."
    ],
    practicalExercise: "Map suppliers and buyers across the value chain to locate where economic profits accumulate."
  },
  3: {
    step: 3,
    title: "Step 3: Value Stick & Moat Drivers (WTP / WTS)",
    mauboussinQuote: "'An economic moat is the ability to widen the spread between Willingness-To-Pay (WTP) and Supplier Willingness-To-Sell (WTS) wider than competitors.' — Michael J. Mauboussin",
    coreConcepts: [
      "Consumer Advantage (WTP Expansion): High switching costs, network effects, brand search costs.",
      "Production Advantage (WTS Reduction): Scale economies, proprietary patents, favorable geography.",
      "Scale-Economies Shared: Passing cost savings back to customers to build unassailable volume.",
      "Pricing Power: Raising prices without losing customers during cost inflation."
    ],
    keyQuestions: [
      "What switching frictions do customers face if migrating to a competitor?",
      "Does the product become more valuable as the network grows? (Network Effects)",
      "Does the firm hoard cost savings or share them to widen the moat?"
    ],
    commonPitfalls: [
      "Mistaking a trendy marketing campaign for a durable economic moat.",
      "Assuming expiring patents provide permanent protection."
    ],
    practicalExercise: "Examine Gross Margin stability over the last 3 inflation cycles to verify true pricing power."
  },
  4: {
    step: 4,
    title: "Step 4: Game Theory, Capacity & Capital Allocation",
    mauboussinQuote: "'Management's capital allocation track record and competitor interactions determine the longevity of the moat.' — Michael J. Mauboussin",
    coreConcepts: [
      "Prisoner's Dilemma: The risk that rivals slash prices or overbuild capacity, destroying industry returns.",
      "Capacity Discipline: Industry players demonstrating discipline during demand downturns.",
      "Capital Allocation: Rational deployment of FCF into Organic Growth, Dividends, Buybacks, or M&A."
    ],
    keyQuestions: [
      "Is the industry vulnerable to self-destructive price wars?",
      "Does management execute opportunistic buybacks at undervaluation or destructive empire-building M&A?",
      "Is there structural overcapacity in the sector?"
    ],
    commonPitfalls: [
      "Rewarding revenue growth achieved through dilutive, value-destroying acquisitions.",
      "Overbuilding capacity at peak cycle times, impairing future ROIC."
    ],
    practicalExercise: "Review where Free Cash Flow was deployed over the past 3 years: R&D, dividends, buybacks, or debt paydown."
  },
  5: {
    step: 5,
    title: "Step 5: Competitive Advantage Period (CAP) & Synthesis",
    mauboussinQuote: "'Competitive Advantage Period (CAP) is the timeframe during which a company is expected to generate returns in excess of its cost of capital.' — Michael J. Mauboussin",
    coreConcepts: [
      "Competitive Advantage Period (CAP): The number of years a firm can maintain returns above WACC.",
      "Mean Reversion: The economic gravity pulling high returns down as competitors enter.",
      "Disruption Risk: Novel business models or technologies that make existing moats obsolete."
    ],
    keyQuestions: [
      "Can this firm's ROIC remain above WACC for the next 10-15 years?",
      "What is the single greatest technological or regulatory threat to the moat?",
      "What is the final Mauboussin Moat Score (Wide, Narrow, or None)?"
    ],
    commonPitfalls: [
      "Assuming high current profitability continues indefinitely (ignoring mean reversion).",
      "Confusing business quality with stock valuation (even a great business can be overpriced)."
    ],
    practicalExercise: "Generate the one-click executive memorandum and identify the #1 key vulnerability."
  }
};

export function getStepMethodologyGuide(step: number, isEnglish: boolean): StepMethodologyGuide {
  return isEnglish
    ? STEP_METHODOLOGY_GUIDES_EN[step] || STEP_METHODOLOGY_GUIDES_EN[1]
    : STEP_METHODOLOGY_GUIDES_TR[step] || STEP_METHODOLOGY_GUIDES_TR[1];
}

export const STEP_METHODOLOGY_GUIDES = STEP_METHODOLOGY_GUIDES_TR;

export const INITIAL_PRESET_DOSSIERS_TR: CompanyAuditDossier[] = [
  MAUBOUSSIN_GUIDED_TEMPLATE,
  {
    id: "bim-dossier",
    companyName: "BİM Birleşik Mağazalar",
    ticker: "BIMAS (BIST)",
    industry: "Sert İndirimli Market Perakendeciliği",
    description: "Yüksek hacim, özel markalı (private label) sınırlı ürün portföyü ve sıfır lüks mağaza konseptiyle Türkiye'nin en büyük perakendecisi.",
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
      profitPoolPosition: "Tedarikçilere karşı devasa alım gücü (Buyer Monopsony) ve negatif nakit dönüşüm süresi (CCC)."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Ölçek Ekonomisi", "Süreç Üstünlüğü", "Nitelikli Tedarikçi Pazarlığı"],
      pricingPowerEvidence: "En ucuz sepet garantisi vererek enflasyon döneminde pazar payı kazanma yeteneği.",
      costAdvantageEvidence: "Mağaza başına 750 SKU sınırlaması, kutudan satış ve düşük lojistik maliyetleriyle sektörün en düşük faaliyet gideri/satış oranı."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Online hızlı teslimat kanallarının geleneksel mağaza trafiğini aşındırması riski."
    },
    notes: "BIM düşük kâr marjı (%3-5 NOPAT) ancak yıldırım hızında sermaye devir hızı (5x+) ile yüksek ROIC üretir.",
    updatedAt: "2026-08-20"
  },
  {
    id: "apple-dossier",
    companyName: "Apple Inc.",
    ticker: "AAPL (NASDAQ)",
    industry: "Tüketici Elektroniği & Dijital Ekosistem",
    description: "iOS, macOS, App Store ve iCloud donanım-yazılım entegrasyonuyla 2 milyardan fazla aktif cihazı birbirine bağlayan küresel ekosistem.",
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
      profitPoolPosition: "Akıllı telefon sektöründeki toplam küresel faaliyet kârının %85'ini tek başına toplar."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Marka/Arama Maliyeti"],
      pricingPowerEvidence: "iPhone fiyatları her nesilde yükselmesine rağmen %90+ sadakat ve takas oranı.",
      costAdvantageEvidence: "Kendi tasarladığı M-serisi ve A-serisi çiplerle hem performans üstünlüğü hem de donanım marj optimizasyonu."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 20,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Antitröst düzenlemeleri ve App Store komisyonlarına getirilecek regülasyon baskıları."
    },
    notes: "Apple yüksek WTP (Tüketici Ödeme İstekliliği) ve yüksek geçiş maliyeti sayesinde %50+ ROIC üretmektedir.",
    updatedAt: "2026-08-21"
  },
  {
    id: "nvidia-dossier",
    companyName: "Nvidia Corporation",
    ticker: "NVDA (NASDAQ)",
    industry: "Yapay Zekâ Donanımı & Hızlandırılmış Hesaplama",
    description: "CUDA yazılım mimarisi ve GPU donanım entegrasyonuyla üretken yapay zekânın küresel fiili standardı.",
    financials: {
      revenue: 120000,
      operatingIncome: 75000,
      effectiveTaxRate: 15,
      totalAssets: 85000,
      cashAndEquivalents: 35000,
      nonInterestCurrentLiabilities: 18000,
      wacc: 10
    },
    industryStructure: {
      supplierPower: "orta",
      buyerPower: "orta",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "düşük",
      industryRivalry: "düşük",
      profitPoolPosition: "Yapay zekâ ekosisteminde donanım ve yazılım kâr havuzunun aslan payını tek başına toplar."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Süreç Üstünlüğü", "Patent/Lisans"],
      pricingPowerEvidence: "H100 ve Blackwell çiplerinde %75+ brüt kâr marjı ve aylar süren müşteri bekleme listeleri.",
      costAdvantageEvidence: "CUDA yazılım kütüphanesinin 4+ milyon geliştirici tarafından 18 yıldır kullanılması nedeniyle rakip donanımlara geçiş maliyetinin imkansıza yakın olması."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Büyük bulut müşterilerinin (Google TPU, Amazon Trainium, Meta) kendi iç çiplerini geliştirmesi."
    },
    notes: "Nvidia, Mauboussin'in bahsettiği 'Yazılım Destekli Yüksek Geçiş Maliyeti + Ağ Etkisi' hendek kombinasyonunun en güçlü modern örneğidir.",
    updatedAt: "2026-08-22"
  }
,

  {
    id: "thy-dossier",
    companyName: "Türk Hava Yolları (THY)",
    ticker: "THYAO (BIST)",
    industry: "Havacılık & Ulaştırma",
    description: "Yüksek sermaye yoğunluğuna sahip, döngüsel havacılık sektöründe geniş uçuş ağı ile öne çıkan küresel bayrak taşıyıcısı.",
    financials: { revenue: 550000, operatingIncome: 65000, effectiveTaxRate: 20, totalAssets: 1100000, cashAndEquivalents: 150000, nonInterestCurrentLiabilities: 200000, wacc: 30 },
    industryStructure: { supplierPower: "yüksek", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "yüksek", profitPoolPosition: "Yoğun rekabet ve yüksek sabit maliyetler nedeniyle döngüsel kârlılık halkası." },
    competitiveAdvantage: { primaryType: "ölçek_avantajı", subDrivers: ["Ağ Etkisi", "Ölçek Ekonomisi"], pricingPowerEvidence: "Yoğun rekabet ve elastik talep (fiyata duyarlı müşteri) nedeniyle fiyatlama gücü sınırlıdır.", costAdvantageEvidence: "Geniş uçuş ağı sabit maliyetleri dağıtır ancak yakıt ve uçak finansmanı maliyetleri dışsaldır." },
    interactionAndDiscipline: { capacityDiscipline: "orta", priceWarRisk: "yüksek", managementCapitalAllocation: "kötü" },
    sustainability: { estimatedCapYears: 5, moatWidth: "Dar Hendek (Narrow)", keyVulnerability: "Yakıt fiyatları, jeopolitik riskler ve makroekonomik krizler." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Havacılık sektörü tarihsel olarak 'değer yok edici' veya çok dar hendekli bir sektördür. Rekabet sert, sabit maliyetler çok yüksektir."
  },

  {
    id: "cocacola-dossier",
    companyName: "Coca-Cola",
    ticker: "KO (NYSE)",
    industry: "İçecek & Hızlı Tüketim (FMCG)",
    description: "Dünyanın en güçlü marka değerlerinden birine sahip, şurup satışı ve şişeleme ağıyla yüksek kâr marjlı içecek devi.",
    financials: { revenue: 45000, operatingIncome: 13500, effectiveTaxRate: 21, totalAssets: 97000, cashAndEquivalents: 13000, nonInterestCurrentLiabilities: 20000, wacc: 8 },
    industryStructure: { supplierPower: "düşük", buyerPower: "orta", threatOfNewEntrants: "düşük", threatOfSubstitutes: "orta", industryRivalry: "orta", profitPoolPosition: "Marka gücü sayesinde kâr havuzunun aslan payını (şurup üretimi) elinde tutan lider pozisyon." },
    competitiveAdvantage: { primaryType: "tüketici_avantajı", subDrivers: ["Marka/Arama Maliyeti", "Ölçek Ekonomisi"], pricingPowerEvidence: "Enflasyonist dönemlerde ürün fiyatlarını satış hacmi kaybetmeden artırabilme kanıtı.", costAdvantageEvidence: "Şişeleme operasyonlarını (düşük marjlı) dışarı aktarıp sadece konsantre şurup (yüksek marj) satarak sermaye hafif bir model kurmuştur." },
    interactionAndDiscipline: { capacityDiscipline: "yüksek", priceWarRisk: "düşük", managementCapitalAllocation: "mükemmel" },
    sustainability: { estimatedCapYears: 20, moatWidth: "Geniş Hendek (Wide)", keyVulnerability: "Tüketici alışkanlıklarının sağlıklı içeceklere kayması." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "Geleneksel 'geniş hendek' ve 'tüketici avantajı' (Consumer Advantage) kavramının ders kitabı niteliğindeki klasik örneği."
  }
];

export const INITIAL_PRESET_DOSSIERS_EN: CompanyAuditDossier[] = [
  MAUBOUSSIN_GUIDED_TEMPLATE,
  {
    id: "bim-dossier",
    companyName: "BIM Stores (Hard-Discount)",
    ticker: "BIMAS (BIST)",
    industry: "Sert İndirimli Market Perakendeciliği",
    description: "High volume, limited SKU private-label portfolio, and zero frills store format making it the leading discount retailer.",
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
      profitPoolPosition: "Dominant buyer monopsony power against suppliers and negative cash conversion cycle (CCC)."
    },
    competitiveAdvantage: {
      primaryType: "ölçek_avantajı",
      subDrivers: ["Ölçek Ekonomisi", "Süreç Üstünlüğü", "Nitelikli Tedarikçi Pazarlığı"],
      pricingPowerEvidence: "Guaranteed lowest price basket gaining market share throughout high inflation cycles.",
      costAdvantageEvidence: "Only ~750 SKUs per store, palletized sales, and ultra-lean logistics producing lowest SG&A/Sales ratio in the sector."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Instant quick-commerce delivery apps cannibalizing walk-in basket frequency."
    },
    notes: "Generates high ROIC via razor-thin margins (3-5% NOPAT) multiplied by rapid capital turnover (5x+).",
    updatedAt: "2026-08-20"
  },
  {
    id: "apple-dossier",
    companyName: "Apple Inc.",
    ticker: "AAPL (NASDAQ)",
    industry: "Consumer Tech & Digital Ecosystem",
    description: "Integrated hardware, software (iOS, macOS), and digital services (iCloud, App Store) locking in 2+ billion active devices globally.",
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
      profitPoolPosition: "Captures ~85% of total global smartphone industry operating profits alone."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Marka/Arama Maliyeti"],
      pricingPowerEvidence: "iPhone price increases absorbed with 90%+ customer retention and ecosystem trade-in loyalty.",
      costAdvantageEvidence: "In-house custom silicon (M-series, A-series) driving performance lead and gross margin expansion."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 20,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Antitrust regulations and mandated App Store third-party fee commission reductions."
    },
    notes: "Combines massive customer Willingness-To-Pay (WTP) with sticky ecosystem switching costs to compound 50%+ ROIC.",
    updatedAt: "2026-08-21"
  },
  {
    id: "nvidia-dossier",
    companyName: "Nvidia Corporation",
    ticker: "NVDA (NASDAQ)",
    industry: "AI Accelerators & Parallel Computing",
    description: "De facto global standard for generative AI via proprietary CUDA software stack coupled with high-bandwidth GPU clusters.",
    financials: {
      revenue: 120000,
      operatingIncome: 75000,
      effectiveTaxRate: 15,
      totalAssets: 85000,
      cashAndEquivalents: 35000,
      nonInterestCurrentLiabilities: 18000,
      wacc: 10
    },
    industryStructure: {
      supplierPower: "orta",
      buyerPower: "orta",
      threatOfNewEntrants: "düşük",
      threatOfSubstitutes: "düşük",
      industryRivalry: "düşük",
      profitPoolPosition: "Captures over 80% of total hardware & software profits in the AI data center profit pool."
    },
    competitiveAdvantage: {
      primaryType: "tüketici_avantajı",
      subDrivers: ["Geçiş Maliyeti", "Ağ Etkisi", "Süreç Üstünlüğü", "Patent/Lisans"],
      pricingPowerEvidence: "Maintains 75%+ gross margins on H100/Blackwell architectures with multi-quarter customer backlogs.",
      costAdvantageEvidence: "18-year entrenched CUDA ecosystem with 4+ million developers creating immense switching friction."
    },
    interactionAndDiscipline: {
      capacityDiscipline: "yüksek",
      priceWarRisk: "düşük",
      managementCapitalAllocation: "mükemmel"
    },
    sustainability: {
      estimatedCapYears: 15,
      moatWidth: "Geniş Hendek (Wide)",
      keyVulnerability: "Hyperscalers (Google TPU, Amazon Trainium, Meta MTIA) designing internal custom ASICs."
    },
    notes: "Premier modern example of software-backed high switching costs combined with ecosystem network effects.",
    updatedAt: "2026-08-22"
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
    interactionAndDiscipline: { capacityDiscipline: "orta", priceWarRisk: "yüksek", managementCapitalAllocation: "kötü" },
    sustainability: { estimatedCapYears: 5, moatWidth: "Dar Hendek (Narrow)", keyVulnerability: "Fuel price shocks, geopolitical risks, and macroeconomic crises." },
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
    interactionAndDiscipline: { capacityDiscipline: "yüksek", priceWarRisk: "düşük", managementCapitalAllocation: "mükemmel" },
    sustainability: { estimatedCapYears: 20, moatWidth: "Geniş Hendek (Wide)", keyVulnerability: "Consumer shift towards healthier beverages." },
    isCustom: false, createdAt: "2026-08-22", updatedAt: "2026-08-22",
    notes: "A textbook classic example of a 'wide moat' driven purely by Consumer Advantage (Brand)."
  }
];

export function getInitialPresetDossiers(isEnglish: boolean): CompanyAuditDossier[] {
  const presets = isEnglish ? INITIAL_PRESET_DOSSIERS_EN : INITIAL_PRESET_DOSSIERS_TR;
  return JSON.parse(JSON.stringify(presets));
}

export const INITIAL_PRESET_DOSSIERS = INITIAL_PRESET_DOSSIERS_TR;

// Calculation Helpers
export function calculateFinancialOutputs(inputs: FinancialMetricInputs) {
  const {
    revenue = 0,
    operatingIncome = 0,
    effectiveTaxRate = 0,
    totalAssets = 0,
    cashAndEquivalents = 0,
    nonInterestCurrentLiabilities = 0,
    wacc = 0
  } = inputs;

  const safeNum = (val: any) => {
    const num = Number(val);
    return isNaN(num) || !isFinite(num) ? 0 : num;
  };

  const safeRev = Math.max(0, safeNum(revenue));
  const safeOpInc = safeNum(operatingIncome);
  const safeTax = safeNum(effectiveTaxRate);
  const safeAssets = Math.max(0, safeNum(totalAssets));
  const safeCash = Math.max(0, Math.min(safeAssets, safeNum(cashAndEquivalents)));
  const safeLiab = safeNum(nonInterestCurrentLiabilities);
  const safeWacc = safeNum(wacc);

  const taxMultiplier = Math.max(0, 1 - (safeTax / 100));
  const nopat = safeOpInc * taxMultiplier;

  const operatingAssets = safeAssets - safeCash;
  const investedCapital = operatingAssets - safeLiab;

  let roicPercent = 0;
  let capitalTurnover = 0;
  let spread = 0;
  let economicProfit = 0;
  const isRoicMeaningful = investedCapital > 0;

  if (isRoicMeaningful) {
    roicPercent = (nopat / investedCapital) * 100;
    capitalTurnover = safeRev > 0 ? safeRev / investedCapital : 0;
    spread = roicPercent - safeWacc;
    economicProfit = (spread / 100) * investedCapital;
  }

  const ensureSafe = (val: number) => (isNaN(val) || !isFinite(val) ? 0 : val);

  return {
    nopat: Number(ensureSafe(nopat).toFixed(1)),
    investedCapital: Number(ensureSafe(investedCapital).toFixed(1)),
    roicPercent: Number(ensureSafe(roicPercent).toFixed(1)),
    nopatMarginPercent: Number((safeRev > 0 ? ensureSafe((nopat / safeRev) * 100) : 0).toFixed(1)),
    capitalTurnover: Number(ensureSafe(capitalTurnover).toFixed(2)),
    spread: Number(ensureSafe(spread).toFixed(1)),
    economicProfit: Number(ensureSafe(economicProfit).toFixed(1)),
    isRoicMeaningful,
    isCreatingValue: isRoicMeaningful && ensureSafe(spread) > 0
  };
}

export function computeMoatScore(dossier: CompanyAuditDossier): {
  score: number;
  maxScore: number;
  scorePercent: number;
  diagnosedMoat: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)";
  summaryTags: string[];
} {
  let score = 0;
  const maxScore = 100;
  const tags: string[] = [];

  const fin = calculateFinancialOutputs(dossier.financials);

  // Financial Score (Max 35 pts)
  if (!fin.isRoicMeaningful) {
    tags.push("ROIC N/M (Non-positive Invested Capital)");
  } else if (fin.roicPercent >= 25) {
    score += 25;
    tags.push("Superior ROIC (25%+)");
  } else if (fin.roicPercent >= 15) {
    score += 15;
    tags.push("Good ROIC (15-25%)");
  } else if (fin.roicPercent >= 10) {
    score += 8;
  }

  if (!fin.isRoicMeaningful) {
    // ROIC and economic spread cannot be interpreted with non-positive invested capital.
  } else if (fin.spread >= 10) {
    score += 10;
    tags.push("Strong Economic Spread (>10%)");
  } else if (fin.spread > 0) {
    score += 5;
    tags.push("Positive Value Creation");
  } else {
    tags.push("Değer Yok Edimi (ROIC < WACC)");
  }

  // Industry Structure (Max 25 pts)
  const ind = dossier.industryStructure;
  if (ind.threatOfNewEntrants === "düşük") score += 6;
  if (ind.supplierPower === "düşük") score += 5;
  if (ind.buyerPower === "düşük") score += 5;
  if (ind.threatOfSubstitutes === "düşük") score += 5;
  if (ind.industryRivalry === "düşük") score += 4;

  // Competitive Advantage Subdrivers (Max 25 pts)
  const adv = dossier.competitiveAdvantage;
  const driverPoints = adv.subDrivers.length * 6;
  score += Math.min(25, driverPoints);
  if (adv.subDrivers.includes("Geçiş Maliyeti") || adv.subDrivers.includes("Switching Costs")) tags.push("High Switching Costs");
  if (adv.subDrivers.includes("Ağ Etkisi") || adv.subDrivers.includes("Network Effects")) tags.push("Network Effects");
  if (adv.subDrivers.includes("Ölçek Ekonomisi") || adv.subDrivers.includes("Scale Economics")) tags.push("Scale Economics");

  // Discipline & Management (Max 15 pts)
  const inter = dossier.interactionAndDiscipline;
  if (inter.capacityDiscipline === "yüksek") score += 5;
  if (inter.priceWarRisk === "düşük") score += 5;
  if (inter.managementCapitalAllocation === "mükemmel") score += 5;

  const scorePercent = Math.min(100, Math.round((score / maxScore) * 100));

  let diagnosedMoat: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)" = "Hendek Yok (None)";
  if (scorePercent >= 70 && fin.spread > 5) {
    diagnosedMoat = "Geniş Hendek (Wide)";
  } else if (scorePercent >= 45 && fin.spread >= 0) {
    diagnosedMoat = "Dar Hendek (Narrow)";
  }

  return {
    score,
    maxScore,
    scorePercent,
    diagnosedMoat,
    summaryTags: tags
  };
}

export function translateMoatDriver(driver: string, isEnglish: boolean): string {
  if (!driver) return "";
  const cleaned = driver.trim();
  
  const trToEn: Record<string, string> = {
    "Ölçek Ekonomisi": "Economies of Scale",
    "Geçiş Maliyeti": "Switching Costs",
    "Ağ Etkisi": "Network Effects",
    "Marka/Arama Maliyeti": "Brand and Search Costs",
    "Arama Maliyeti/Marka": "Brand and Search Costs",
    "Marka / Arama Maliyeti": "Brand and Search Costs",
    "Arama Maliyeti": "Brand and Search Costs",
    "Marka": "Brand and Search Costs",
    "Süreç Üstünlüğü": "Process Advantage",
    "Nitelikli Tedarikçi Pazarlığı": "Supplier Bargaining Power",
    "Patent/Lisans": "Patents / Licenses",
    "Patent / Lisans": "Patents / Licenses",
    "Coğrafi Hub Avantajı": "Geographic Hub Monopoly",
    "Kargo Entegrasyonu": "Cargo Fleet Integration",
    "Geliştirici Bağımlılığı (CUDA)": "Developer Lock-in (CUDA)",
    "Ar-Ge Ölçek Ekonomisi": "Scale Economics in R&D",
    "Tam Katmanlı Ağ Mimarisi": "Full-Stack Network Architecture",
    // In case English synonyms are passed
    "Scale Economics": "Economies of Scale",
    "Economies of Scale": "Economies of Scale",
    "High Switching Costs": "Switching Costs",
    "Switching Costs": "Switching Costs",
    "Process Superiority": "Process Advantage",
    "Process Advantage": "Process Advantage",
    "Process Superiority / Culture": "Process Advantage",
    "Monopsony Bargaining Power": "Supplier Bargaining Power",
    "Bargaining Monopsony Power": "Supplier Bargaining Power",
    "Supplier Bargaining Power": "Supplier Bargaining Power",
    "Brand / Search Costs": "Brand and Search Costs",
    "Brand / Search Cost Advantage": "Brand and Search Costs",
    "Brand Loyalty & Search Costs": "Brand and Search Costs",
    "Brand and Search Costs": "Brand and Search Costs",
    "Proprietary Patents & Licenses": "Patents / Licenses",
    "Patents / Licenses": "Patents / Licenses",
    "Geographic Hub Monopoly": "Geographic Hub Monopoly",
    "Fleet & Freight Integration": "Cargo Fleet Integration",
    "Cargo Fleet Integration": "Cargo Fleet Integration"
  };

  const enToTr: Record<string, string> = {
    "Economies of Scale": "Ölçek Ekonomisi",
    "Scale Economics": "Ölçek Ekonomisi",
    "Switching Costs": "Geçiş Maliyeti",
    "High Switching Costs": "Geçiş Maliyeti",
    "Network Effects": "Ağ Etkisi",
    "Network Effect": "Ağ Etkisi",
    "Brand and Search Costs": "Marka/Arama Maliyeti",
    "Brand / Search Costs": "Marka/Arama Maliyeti",
    "Brand / Search Cost Advantage": "Marka/Arama Maliyeti",
    "Brand Loyalty & Search Costs": "Marka/Arama Maliyeti",
    "Process Advantage": "Süreç Üstünlüğü",
    "Process Superiority": "Süreç Üstünlüğü",
    "Process Superiority / Culture": "Süreç Üstünlüğü",
    "Supplier Bargaining Power": "Nitelikli Tedarikçi Pazarlığı",
    "Monopsony Bargaining Power": "Nitelikli Tedarikçi Pazarlığı",
    "Bargaining Monopsony Power": "Nitelikli Tedarikçi Pazarlığı",
    "Patents / Licenses": "Patent/Lisans",
    "Proprietary Patents & Licenses": "Patent/Lisans",
    "Geographic Hub Monopoly": "Coğrafi Hub Avantajı",
    "Cargo Fleet Integration": "Kargo Entegrasyonu",
    "Fleet & Freight Integration": "Kargo Entegrasyonu",
    "Developer Lock-in (CUDA)": "Geliştirici Bağımlılığı (CUDA)",
    "Scale Economics in R&D": "Ar-Ge Ölçek Ekonomisi",
    "Full-Stack Network Architecture": "Tam Katmanlı Ağ Mimarisi",
    "Ölçek Ekonomisi": "Ölçek Ekonomisi",
    "Geçiş Maliyeti": "Geçiş Maliyeti",
    "Ağ Etkisi": "Ağ Etkisi",
    "Marka/Arama Maliyeti": "Marka/Arama Maliyeti",
    "Arama Maliyeti/Marka": "Marka/Arama Maliyeti",
    "Süreç Üstünlüğü": "Süreç Üstünlüğü",
    "Nitelikli Tedarikçi Pazarlığı": "Nitelikli Tedarikçi Pazarlığı",
    "Patent/Lisans": "Patent/Lisans",
    "Coğrafi Hub Avantajı": "Coğrafi Hub Avantajı",
    "Kargo Entegrasyonu": "Kargo Entegrasyonu"
  };

  if (isEnglish) {
    return trToEn[cleaned] || cleaned;
  } else {
    return enToTr[cleaned] || cleaned;
  }
}

export function translateCategory(category: string, isEnglish: boolean): string {
  if (!category) return "";
  const cleaned = category.trim();
  
  const trToEn: Record<string, string> = {
    "Strateji": "Strategy",
    "Temel Finans": "Fundamental Finance",
    "Core Finance": "Fundamental Finance",
    "Mikroekonomi": "Microeconomics",
    "Sektör Analizi": "Industry Analysis",
    "İnovasyon & Oyun Teorisi": "Innovation & Game Theory",
    "1. Giriş & Getiri": "1. Introduction & Return",
    "2. Sektör Haritası": "2. Industry Map (Lay of the Land)",
    "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)": "3. Porter's Five Forces",
    "4. Giriş Engelleri & 7 Moat": "4. Barriers to Entry & 7 Moats",
    "5. Bilanço & 10-K Röntgeni": "5. Balance Sheet & 10-K Diagnostic",
    "6. Değer Çubuğu & Şirket Analizi": "6. Value Stick & Firm Analysis",
    "7. Oyun Teorisi & Marka Gücü": "7. Game Theory & Brand Moat"
  };

  const enToTr: Record<string, string> = {
    "Strategy": "Strateji",
    "Fundamental Finance": "Temel Finans",
    "Core Finance": "Temel Finans",
    "Microeconomics": "Mikroekonomi",
    "Industry Analysis": "Sektör Analizi",
    "Innovation & Game Theory": "İnovasyon & Oyun Teorisi",
    "1. Introduction & Return": "1. Giriş & Getiri",
    "2. Industry Map (Lay of the Land)": "2. Sektör Haritası",
    "3. Porter's Five Forces": "3. Porter 5 Güç (Tedarikçi, Alıcı, İkame)",
    "4. Barriers to Entry & 7 Moats": "4. Giriş Engelleri & 7 Moat",
    "5. Balance Sheet & 10-K Diagnostic": "5. Bilanço & 10-K Röntgeni",
    "6. Value Stick & Firm Analysis": "6. Değer Çubuğu & Şirket Analizi",
    "7. Game Theory & Brand Moat": "7. Oyun Teorisi & Marka Gücü"
  };

  if (isEnglish) {
    return trToEn[cleaned] || cleaned;
  } else {
    return enToTr[cleaned] || cleaned;
  }
}

export function translateSummaryTag(tag: string, isEnglish: boolean): string {
  if (!tag) return "";
  const cleaned = tag.trim();
  
  const trToEn: Record<string, string> = {
    "High Switching Costs": "High Switching Costs",
    "Geçiş Maliyeti": "High Switching Costs",
    "Yüksek Geçiş Maliyeti": "High Switching Costs",
    "Network Effects": "Network Effects",
    "Ağ Etkisi": "Network Effects",
    "Scale Economics": "Economies of Scale",
    "Ölçek Ekonomisi": "Economies of Scale",
    "Economies of Scale": "Economies of Scale",
    "Brand / Search Advantage": "Brand and Search Costs",
    "Brand / Search Cost Advantage": "Brand and Search Costs",
    "Marka / Arama Avantajı": "Brand and Search Costs",
    "Marka/Arama Maliyeti": "Brand and Search Costs",
    "Process Advantage": "Process Advantage",
    "Süreç Üstünlüğü": "Process Advantage",
    "Supplier Bargaining Power": "Supplier Bargaining Power",
    "Nitelikli Tedarikçi Pazarlığı": "Supplier Bargaining Power",
    "High Pricing Power": "High Pricing Power",
    "Yüksek Fiyatlama Gücü": "Yüksek Fiyatlama Gücü",
    "Patents & IP": "Patents & Licenses",
    "Patent/Lisans": "Patents & Licenses"
  };

  const enToTr: Record<string, string> = {
    "High Switching Costs": "Yüksek Geçiş Maliyeti",
    "Switching Costs": "Geçiş Maliyeti",
    "Network Effects": "Ağ Etkisi",
    "Scale Economics": "Ölçek Ekonomisi",
    "Economies of Scale": "Ölçek Ekonomisi",
    "Brand and Search Costs": "Marka/Arama Maliyeti",
    "Brand / Search Advantage": "Marka / Arama Avantajı",
    "Brand / Search Cost Advantage": "Marka/Arama Maliyeti",
    "Process Advantage": "Süreç Üstünlüğü",
    "Supplier Bargaining Power": "Nitelikli Tedarikçi Pazarlığı",
    "High Pricing Power": "Yüksek Fiyatlama Gücü",
    "Patents & Licenses": "Patentler & Lisanslar",
    "Patents & IP": "Patentler & Fikri Mülkiyet"
  };

  if (isEnglish) {
    return trToEn[cleaned] || cleaned;
  } else {
    return enToTr[cleaned] || cleaned;
  }
}

export function translateMoatType(type: string, isEnglish: boolean): string {
  if (!isEnglish) {
    if (type === "tüketici_avantajı" || type === "customer_advantage") return "Tüketici Avantajı (WTP Artışı)";
    if (type === "üretim_avantajı" || type === "production_advantage") return "Üretim/Maliyet Avantajı (WTS İndirimi)";
    if (type === "ölçek_avantajı" || type === "scale_advantage") return "Ölçek Ekonomisi & Süreç Üstünlüğü";
    return type.replace(/_/g, " ");
  }
  if (type === "tüketici_avantajı" || type === "customer_advantage") return "Customer Advantage (WTP Expansion)";
  if (type === "üretim_avantajı" || type === "production_advantage") return "Production/Cost Advantage (WTS Reduction)";
  if (type === "ölçek_avantajı" || type === "scale_advantage") return "Scale Economics & Process Advantage";
  return type.replace(/_/g, " ");
}

export function translateMoatWidth(width: string, isEnglish: boolean): string {
  if (!isEnglish) {
    if (width.includes("Wide") || width.includes("Geniş")) return "Geniş Hendek (Wide Moat)";
    if (width.includes("Narrow") || width.includes("Dar")) return "Dar Hendek (Narrow Moat)";
    return "Hendek Yok (No Moat)";
  }
  if (width.includes("Geniş") || width.includes("Wide")) return "Wide Moat";
  if (width.includes("Dar") || width.includes("Narrow")) return "Narrow Moat";
  return "No Moat";
}
