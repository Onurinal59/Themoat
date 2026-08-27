import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  HelpCircle,
  Sparkles,
  Calculator,
  RotateCcw,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Eye,
  Award,
  ChevronDown
} from "lucide-react";

export interface DetectiveFinancialItem {
  id: string;
  nameTr: string;
  nameEn: string;
  category: "income_statement" | "balance_sheet_asset" | "balance_sheet_liability" | "footnote_item";
  reportedValue: number;
  economicValueAdjusted: number;
  hasFootnote: boolean;
  footnoteNumber?: number;
  footnoteTitleTr?: string;
  footnoteTitleEn?: string;
  footnoteTextTr?: string;
  footnoteTextEn?: string;
  auditAdjustmentNoteTr: string;
  auditAdjustmentNoteEn: string;
  adjustmentType: "nopat_addback" | "invested_capital_add" | "invested_capital_subtract" | "wacc_weight_shift" | "none";
  adjustmentImpactExplanationTr: string;
  adjustmentImpactExplanationEn: string;
}

export interface DetectiveCase {
  id: string;
  companyName: string;
  ticker: string;
  industryTr: string;
  industryEn: string;
  scenarioDescriptionTr: string;
  scenarioDescriptionEn: string;
  currencyTr: string;
  currencyEn: string;
  reportedTaxRate: number;
  
  // Reported raw numbers
  reportedRevenue: number;
  reportedOperatingCost: number;
  reportedEbit: number;
  reportedTotalAssets: number;
  reportedCashAndEquivalents: number;
  reportedNonOperatingCash: number;
  reportedCurrentLiabilities: number;
  reportedInterestBearingDebt: number;
  reportedShareholdersEquity: number;
  
  // WACC components
  costOfEquity: number; // % (Ke)
  costOfDebtPreTax: number; // % (Kd)
  
  // Footnotes and detailed balance sheet lines
  lineItems: DetectiveFinancialItem[];

  // Student guidance questions
  discoveryQuestions: {
    questionTr: string;
    questionEn: string;
    targetItemId: string;
    hintTr: string;
    hintEn: string;
    whyItMattersTr: string;
    whyItMattersEn: string;
  }[];

  // Pedagogical Summary
  takeawayTr: string;
  takeawayEn: string;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: "tech-cloud-rnd",
    companyName: "Nexus Cloud & AI Systems Inc.",
    ticker: "NXAI",
    industryTr: "Yazılım, Bulut & Yapay Zeka",
    industryEn: "Enterprise Cloud & AI Software",
    currencyTr: "Milyon $",
    currencyEn: "Million $",
    scenarioDescriptionTr: "Yüksek Ar-Ge harcaması yapan ve bilançosunda devasa hazine bonosu/nakit tutan küresel bir SaaS devi. Standart muhasebede Ar-Ge gider yazıldığı ve atıl nakit varlıklarda tutulduğu için ROIC yanıltıcı görünmektedir.",
    scenarioDescriptionEn: "A global enterprise SaaS leader spending heavily on multi-year R&D with substantial non-operating Treasury bonds on its balance sheet. Standard GAAP expenses R&D immediately and leaves cash idle, distorting reported ROIC.",
    reportedTaxRate: 0.20,
    reportedRevenue: 24000,
    reportedOperatingCost: 16000,
    reportedEbit: 4500,
    reportedTotalAssets: 48000,
    reportedCashAndEquivalents: 22000,
    reportedNonOperatingCash: 19000,
    reportedCurrentLiabilities: 6000,
    reportedInterestBearingDebt: 8000,
    reportedShareholdersEquity: 34000,
    costOfEquity: 10.5,
    costOfDebtPreTax: 5.5,
    takeawayTr: "Ar-Ge harcamalarını aktifleştirip faydalı ömrüne (3-5 yıl) itfa etmek ve operasyon dışı atıl nakdi bilançodan ayıklamak, şirketin düzeltilmiş NOPAT ve Yatırılan Sermaye (Invested Capital) gücünü açığa çıkarır.",
    takeawayEn: "Capitalizing R&D expenditures with economic amortization (3-5 years) and carving out non-operating idle cash reveals the adjusted NOPAT and analytical Invested Capital productivity.",
    lineItems: [
      {
        id: "rnd-expense",
        nameTr: "Yıllık Ar-Ge Harcaması (Gelir Tablosu Gideri)",
        nameEn: "Annual R&D Expenditure (Expensed on Income Statement)",
        category: "income_statement",
        reportedValue: 3500,
        economicValueAdjusted: 1100,
        hasFootnote: true,
        footnoteNumber: 14,
        footnoteTitleTr: "Araştırma ve Geliştirme Politikası & Yazılım Varlıkları",
        footnoteTitleEn: "Note 14 — R&D Policy & Capitalized Software Assets",
        footnoteTextTr: "Şirket cari yılda 3.500 Milyon $ Ar-Ge harcaması yapmış olup US GAAP uyarınca tamamını faaliyet gideri kaydetmiştir. Geliştirilen büyük dil modelleri ve bulut algoritmalarının tahmini ekonomik ömrü 4 yıldır. Geçmiş 4 yılın itfa amortismanı 2.400 Milyon $'dır.",
        footnoteTextEn: "The company incurred $3,500M in R&D, expensed entirely under US GAAP. Key algorithmic AI models retain an estimated 4-year useful economic lifespan. Prior 4-year cumulative economic amortization equals $2,400M.",
        auditAdjustmentNoteTr: "3.500 M$ gider kâra geri eklenir, 2.400 M$ ekonomik itfa düşülür -> Net EBIT Düzeltmesi: +1.100 M$. Kalan 7.200 M$ birikmiş Ar-Ge varlığı bilançoya (Invested Capital) eklenir.",
        auditAdjustmentNoteEn: "Add back $3,500M R&D expense to EBIT, deduct $2,400M economic amortization -> Net EBIT Adjustment: +$1,100M. Capitalize remaining $7,200M net R&D asset onto Invested Capital.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanationTr: "EBIT'i +1.100 M$, NOPAT'ı +880 M$ artırır. Bilançoya +7.200 M$ sermaye varlığı ekler.",
        adjustmentImpactExplanationEn: "Increases EBIT by +$1,100M, NOPAT by +$880M, and adds +$7,200M productive intangible capital to the Balance Sheet.",
      },
      {
        id: "excess-cash-item",
        nameTr: "Hazine Bonoları ve Vadeli Mevduatlar (Atıl Nakit)",
        nameEn: "Treasury Bills & Short-Term Equiv. (Non-Operating Excess Cash)",
        category: "balance_sheet_asset",
        reportedValue: 22000,
        economicValueAdjusted: 3000,
        hasFootnote: true,
        footnoteNumber: 4,
        footnoteTitleTr: "Nakit ve Finansal Varlıkların Operasyonel Ayrımı",
        footnoteTitleEn: "Note 4 — Operational vs Non-Operating Cash Allocation",
        footnoteTextTr: "Toplam 22.000 Milyon $'lık likit varlığın yalnızca 3.000 Milyon $'ı maaş ve günlük operasyon işletme sermayesi için elzemdir. 19.000 Milyon $'lık bakiye ABD Hazine Bonolarında faiz geliri amaçlı park edilmiştir.",
        footnoteTextEn: "Of total $22,000M liquid assets, only $3,000M is required for operational payroll and working capital. The remaining $19,000M is parked in US Treasury securities for yield management.",
        auditAdjustmentNoteTr: "19.000 M$'lık atıl bono yatırılan sermayeden (Invested Capital) çıkarılmalıdır. Çünkü ana faaliyet kârı fabrikalar, sunucular ve mühendislerle üretilir, hazine bonosu faizi ana faaliyet kârına (NOPAT) dahil değildir.",
        auditAdjustmentNoteEn: "Deduct $19,000M excess cash from Invested Capital. Operating NOPAT is generated by servers and engineers, not parked Treasury bills.",
        adjustmentType: "invested_capital_subtract",
        adjustmentImpactExplanationTr: "Invested Capital'i 19.000 M$ düşürerek paydadaki yapay şişkinliği yok eder.",
        adjustmentImpactExplanationEn: "Reduces Invested Capital by $19,000M, eliminating denominator distortion and revealing pure core ROIC.",
      },
      {
        id: "sbc-item",
        nameTr: "Hisse Bazlı Personel Ödemeleri (Stock-Based Comp - SBC)",
        nameEn: "Stock-Based Compensation (SBC Dilution)",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 1200,
        hasFootnote: true,
        footnoteNumber: 18,
        footnoteTitleTr: "Hisse Opsiyonları ve Yönetici Primleri",
        footnoteTitleEn: "Note 18 — Stock Options & Executive Share Grants",
        footnoteTextTr: "Şirket mühendislere ve üst yönetime 1.200 Milyon $ değerinde kısıtlı hisse senedi (RSU) dağıtmıştır. Bazı analistler bunu 'nakitsiz gider' diyerek NOPAT'a ekleme hatasına düşmektedir.",
        footnoteTextEn: "The company granted $1,200M in restricted stock units (RSUs) to engineers. Some analysts mistakenly treat this as a non-cash expense and add it back to operating profit.",
        auditAdjustmentNoteTr: "DİKKAT TUZAĞI: Mauboussin uyarır: SBC nakitsiz olsa da hissedarlar için gerçek bir seyreltme maliyetidir (Gerçek Ücret Gideridir). NOPAT'a GERİ EKLENMEMELİDİR!",
        auditAdjustmentNoteEn: "PITFALL WARNING: Mauboussin emphasizes: SBC is a real economic compensation cost diluting shareholders. It must NEVER be added back to NOPAT.",
        adjustmentType: "none",
        adjustmentImpactExplanationTr: "Düzeltme yapılmaz; NOPAT'ı yapay şişirmemek için gerçek faaliyet gideri sayılır.",
        adjustmentImpactExplanationEn: "No adjustment made; treated strictly as an operational operating expense.",
      },
    ],
    discoveryQuestions: [
      {
        questionTr: "Ar-Ge harcamaları kârdan hemen düşülünce ve sermayeye yazılmayınca ROIC neden bozulur?",
        questionEn: "Why is ROIC distorted when multi-year R&D is expensed immediately instead of capitalized?",
        targetItemId: "rnd-expense",
        hintTr: "Dipnot 14'e bakın: Yazılım algoritması 4 yıl boyunca gelir üretecek bir 'Varlık'tır (Asset).",
        hintEn: "See Note 14: An algorithmic platform is a multi-year economic productive asset.",
        whyItMattersTr: "Yazılım şirketleri gençken Ar-Ge nedeniyle kârsız, olgunlaşınca ise sermayesiz görünüp yapay %100+ ROIC üretir.",
        whyItMattersEn: "Young tech firms appear falsely unprofitable, while mature firms appear asset-light with artificial 100%+ ROIC without capitalization.",
      },
      {
        questionTr: "Şirketin kasasındaki 19 Milyar $'lık Hazine Bonosu ana faaliyet sermayesine dahil edilmeli midir?",
        questionEn: "Should $19B in non-operating Treasury securities be included in core Invested Capital?",
        targetItemId: "excess-cash-item",
        hintTr: "Dipnot 4'e bakın: Faiz geliri EBIT'e dahil değildir; dolayısıyla bonolar da Yatırılan Sermaye'de olmamalıdır.",
        hintEn: "See Note 4: Interest income is non-operating; matching requires excluding the parked assets from capital.",
        whyItMattersTr: "Atıl nakit düşülmezse şirketin çekirdek işinin ne kadar yüksek sermaye getirisi ürettiği gizlenir.",
        whyItMattersEn: "Failing to carve out idle cash penalizes the company's real underlying business returns.",
      },
    ]
  },
  {
    id: "retail-leases-capitalization",
    companyName: "Atlas Supermarket & Retail Stores Inc.",
    ticker: "ATLS",
    industryTr: "Organize Perakende & Süpermarket",
    industryEn: "Discount Retail & Grocery Chain",
    currencyTr: "Milyon TL",
    currencyEn: "Million TL",
    scenarioDescriptionTr: "12.000 mağazasının tamamını kiralayan ulusal bir perakende devi. Mağaza satın almak yerine kiraladığı için geleneksel bilançoda yatırılan sermayesi çok küçük, ROIC oranı ise yapay olarak astronomik görünmektedir.",
    scenarioDescriptionEn: "A national grocery giant leasing all 12,000 store locations. Off-balance-sheet leases make traditional invested capital appear tiny and reported ROIC artificially astronomical.",
    reportedTaxRate: 0.22,
    reportedRevenue: 95000,
    reportedOperatingCost: 89000,
    reportedEbit: 4800,
    reportedTotalAssets: 32000,
    reportedCashAndEquivalents: 4500,
    reportedNonOperatingCash: 2000,
    reportedCurrentLiabilities: 21000,
    reportedInterestBearingDebt: 2500,
    reportedShareholdersEquity: 8500,
    costOfEquity: 18.0,
    costOfDebtPreTax: 24.0,
    takeawayTr: "Mağaza kiralayan perakendecide kira taahhütlerini iskonto edip sermayeye ve borca eklemek (Kullanım Hakkı Varlığı), şirketin düzeltilmiş borçluluğunu, WACC ağırlığını ve sermaye yoğunluğunu ortaya koyar.",
    takeawayEn: "Capitalizing non-cancellable operating leases into Right-of-Use assets and debt liabilities reveals adjusted capital intensity, realistic debt weights for WACC, and adjusted ROIC.",
    lineItems: [
      {
        id: "operating-leases-item",
        nameTr: "Mağaza Faaliyet Kiralamaları Taahhütleri (Gelecek 5-7 Yıl)",
        nameEn: "Operating Store Lease Commitments (Next 5-7 Years)",
        category: "footnote_item",
        reportedValue: 0,
        economicValueAdjusted: 16500,
        hasFootnote: true,
        footnoteNumber: 21,
        footnoteTitleTr: "Uzun Vadeli Kira Sözleşmeleri & İptal Edilemez Taahhütler",
        footnoteTitleEn: "Note 21 — Long-Term Non-Cancellable Lease Commitments",
        footnoteTextTr: "Şirketin 12.000 mağazası için gelecek 7 yıllık asgari iptal edilemez kira yükümlülüklerinin toplamı 25.000 Milyon TL'dir. İskonto oranı %16 ile bugünkü indirgenmiş değeri 16.500 Milyon TL'dir. Cari yıl kira gideri içindeki zımni faiz payı 1.200 Milyon TL'dir.",
        footnoteTextEn: "Total undiscounted minimum lease commitments across 12,000 locations equal 25,000M TL. Discounted at 16% cost of debt, present value is 16,500M TL. Imputed lease interest expense in current SG&A is 1,200M TL.",
        auditAdjustmentNoteTr: "16.500 Milyon TL 'Kullanım Hakkı Varlığı' olarak Yatırılan Sermaye'ye ve 'Kira Borcu' olarak Borç hanesine eklenir. Kira içindeki 1.200 M TL faiz EBIT'e geri eklenir.",
        auditAdjustmentNoteEn: "Add 16,500M TL Right-of-Use Asset to Invested Capital and Lease Debt. Reclassify 1,200M TL imputed interest out of SG&A back into EBIT.",
        adjustmentType: "invested_capital_add",
        adjustmentImpactExplanationTr: "EBIT'i +1.200 M TL (NOPAT'ı +936 M TL), Yatırılan Sermayeyi ise +16.500 M TL artırır.",
        adjustmentImpactExplanationEn: "Increases EBIT by +1,200M TL (NOPAT +936M TL) and Invested Capital & Debt by +16,500M TL.",
      },
      {
        id: "working-capital-item",
        nameTr: "Negatif İşletme Sermayesi (Tedarikçi Finansmanı)",
        nameEn: "Negative Working Capital (Supplier Float Financing)",
        category: "balance_sheet_liability",
        reportedValue: 21000,
        economicValueAdjusted: 21000,
        hasFootnote: true,
        footnoteNumber: 8,
        footnoteTitleTr: "Ticari Borçlar ve Tedarikçi Vade Süreleri",
        footnoteTitleEn: "Note 8 — Accounts Payable & Payment Terms",
        footnoteTextTr: "Şirket sattığı ürünü müşteriden anında nakit/kartla (0 gün) tahsil ederken, üreticiye ödemeyi ortalama 75 günde yapmaktadır. Bu durum 8.000 Milyon TL negatif işletme sermayesi fonlaması yaratır.",
        footnoteTextEn: "Customers pay instantly at checkout (0 days), while suppliers are paid in 75 days on average. This generates 8,000M TL in free non-interest operating float.",
        auditAdjustmentNoteTr: "Faizsiz ticari borçlar Yatırılan Sermaye'den düşülür. Bu perakendecinin müşterilerden ve tedarikçilerden bedava fon sağladığını kanıtlar.",
        auditAdjustmentNoteEn: "Non-interest-bearing trade liabilities are deducted from Invested Capital, reflecting powerful zero-cost working capital float.",
        adjustmentType: "none",
        adjustmentImpactExplanationTr: "Yatırılan Sermaye formülünde (Dönen Varlıklar - Nakit - Kısa Vadeli Faizsiz Borçlar) yer alır.",
        adjustmentImpactExplanationEn: "Integrated into the standard NIBCL deduction from gross operating assets.",
      },
    ],
    discoveryQuestions: [
      {
        questionTr: "Perakendeci mağazayı satın almak yerine 10 yıllığına kiralayınca neden bilançoda 'Borç' ve 'Varlık' gizlenmiş olur?",
        questionEn: "Why does leasing store property rather than purchasing hide assets and debt on traditional statements?",
        targetItemId: "operating-leases-item",
        hintTr: "Dipnot 21'e bakın: 16.500 Milyon TL'lik kira sözleşmesi banka kredisinden farksız bir borç taahhüdüdür.",
        hintEn: "See Note 21: A multi-year irrevocable contract is economically identical to collateralized debt financing.",
        whyItMattersTr: "Kira borcu eklenmezse şirketin WACC'ı yanlış hesaplanır ve ROIC %60 gibi yanıltıcı yüksek çıkar.",
        whyItMattersEn: "Ignoring lease obligations understates invested capital and creates deceptively elevated ROIC figures.",
      },
    ]
  },
  {
    id: "industrial-restructuring-pension",
    companyName: "Atlas Heavy Industrial & Machinery Co.",
    ticker: "DMRÇ",
    industryTr: "Ağır Sanayi & Metalurji",
    industryEn: "Heavy Metallurgy & Industrial Equipment",
    currencyTr: "Milyon TL",
    currencyEn: "Million TL",
    scenarioDescriptionTr: "Geçtiğimiz yıl tek seferlik fabrika kapatma tazminatı ödeyen ve bilançosunda devasa fonlanmamış kıdem tazminatı yükümlülüğü olan döngüsel sanayi devi.",
    scenarioDescriptionEn: "A cyclical heavy industrial player burdened by a one-off plant closure charge and significant unfunded employee severance/pension obligations.",
    reportedTaxRate: 0.20,
    reportedRevenue: 38000,
    reportedOperatingCost: 34500,
    reportedEbit: 1500,
    reportedTotalAssets: 42000,
    reportedCashAndEquivalents: 3000,
    reportedNonOperatingCash: 1200,
    reportedCurrentLiabilities: 7000,
    reportedInterestBearingDebt: 12000,
    reportedShareholdersEquity: 23000,
    costOfEquity: 16.0,
    costOfDebtPreTax: 20.0,
    takeawayTr: "Tek seferlik kazaları/cezaları NOPAT'a geri eklemek (Normalizasyon) ve fonlanmamış kıdem tazminatlarını borç benzeri yükümlülük saymak sürdürülebilir kazanç gücünü netleştirir.",
    takeawayEn: "Normalizing non-recurring restructuring penalties back into NOPAT and treating unfunded pension deficits as debt-equivalents unmasks normalized earnings power.",
    lineItems: [
      {
        id: "one-off-restructuring",
        nameTr: "Tek Seferlik Fabrika Kapatma ve Çevre Cezası",
        nameEn: "One-Off Plant Decommissioning & Environmental Charge",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 0,
        hasFootnote: true,
        footnoteNumber: 29,
        footnoteTitleTr: "Olağandışı Giderler ve Fabrika Dönüşüm Karşılığı",
        footnoteTitleEn: "Note 29 — Non-Recurring Plant Restructuring Provisions",
        footnoteTextTr: "Eski yüksek fırının kapatılması ve çevre rehabilitasyon cezaları nedeniyle cari dönemde 1.200 Milyon TL tek seferlik karşılık ayrılmış ve faaliyet kârından düşülmüştür.",
        footnoteTextEn: "The permanent decommissioning of an obsolete blast furnace resulted in a one-time 1,200M TL charge reducing reported operating profit.",
        auditAdjustmentNoteTr: "Tek seferlik 1.200 M TL gider EBIT'e geri eklenir. Böylece şirketin normalleştirilmiş kalıcı faaliyet kârı ortaya çıkar.",
        auditAdjustmentNoteEn: "Add back 1,200M TL to EBIT to restore normalized baseline sustainable earning power.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanationTr: "EBIT'i +1.200 M TL, NOPAT'ı +960 M TL artırarak normalleştirir.",
        adjustmentImpactExplanationEn: "Normalizes sustainable EBIT by +1,200M TL and after-tax NOPAT by +960M TL.",
      },
      {
        id: "pension-deficit",
        nameTr: "Fonlanmamış Kıdem Tazminatı & Emeklilik Yükümlülüğü",
        nameEn: "Unfunded Pension & Severance Benefit Deficit",
        category: "balance_sheet_liability",
        reportedValue: 2800,
        economicValueAdjusted: 2800,
        hasFootnote: true,
        footnoteNumber: 16,
        footnoteTitleTr: "Çalışanlara Sağlanan Faydalar ve Aktüeryal Açık",
        footnoteTitleEn: "Note 16 — Employee Benefits & Actuarial Deficit",
        footnoteTextTr: "Şirketin 8.500 kıdemli personeli için aktüeryal hesaplanan kıdem tazminatı karşılığı 2.800 Milyon TL'dir. Bu borç için herhangi bir bloke fon ayrılmamıştır.",
        footnoteTextEn: "Actuarially calculated severance obligations for 8,500 senior staff total 2,800M TL with zero segregated trust assets.",
        auditAdjustmentNoteTr: "Fonlanmamış kıdem tazminatları borç benzeri (Debt-Equivalent) bir finansal yükümlülüktür ve WACC hesaplanırken borç tarafına dahil edilmelidir.",
        auditAdjustmentNoteEn: "Unfunded obligations are contractual debt equivalents and must be factored into debt weighting for WACC and enterprise valuation.",
        adjustmentType: "wacc_weight_shift",
        adjustmentImpactExplanationTr: "WACC hesaplamasında borç ağırlığını artırır ve hisse değerlemesinde borç olarak düşülür.",
        adjustmentImpactExplanationEn: "Adjusts debt ratio upward in WACC and is deducted in equity bridge calculations.",
      }
    ],
    discoveryQuestions: [
      {
        questionTr: "1.200 Milyon TL'lik tek seferlik çevre cezası gelecek yılların hendek kârlılığı tahmininde neden dışarıda bırakılmalıdır?",
        questionEn: "Why should the 1,200M TL non-recurring environmental penalty be excluded from future moat projections?",
        targetItemId: "one-off-restructuring",
        hintTr: "Dipnot 29'a bakın: Şirket bu fırını kapattı ve ceza bir daha ödenmeyecek.",
        hintEn: "See Note 29: The facility is fully decommissioned; this cash outflow will not recur.",
        whyItMattersTr: "Normalizasyon yapılmazsa şirketin gelecekteki kâr potansiyeli çok düşük tahmin edilir.",
        whyItMattersEn: "Without normalization, long-term steady-state cash flow capacity will be severely understated.",
      }
    ]
  }
];

export const FootnoteDetectiveLab: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [activeCaseId, setActiveCaseId] = useState<string>(DETECTIVE_CASES[0].id);
  const [selectedFootnoteId, setSelectedFootnoteId] = useState<string | null>(null);
  const [appliedAdjustments, setAppliedAdjustments] = useState<Record<string, boolean>>({});
  const [userRoicGuess, setUserRoicGuess] = useState<string>("");
  const [userWaccGuess, setUserWaccGuess] = useState<string>("");
  const [guessChecked, setGuessChecked] = useState<boolean>(false);
  const [activeViewTab, setActiveViewTab] = useState<"balance-sheet" | "income-statement" | "wacc-calc" | "quiz-detective">("balance-sheet");
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  const currentCase = DETECTIVE_CASES.find((c) => c.id === activeCaseId) || DETECTIVE_CASES[0];

  const handleToggleAdjustment = (itemId: string) => {
    setAppliedAdjustments((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
    setGuessChecked(false);
  };

  // Calculate Raw Accounting Values
  const rawRevenue = currentCase.reportedRevenue;
  const rawEbit = currentCase.reportedEbit;
  const rawTaxRate = currentCase.reportedTaxRate;
  const rawNopat = rawEbit * (1 - rawTaxRate);
  const rawInvestedCapital = currentCase.reportedTotalAssets - currentCase.reportedCurrentLiabilities;
  const rawRoic = rawInvestedCapital > 0 ? (rawNopat / rawInvestedCapital) * 100 : 0;

  // Raw WACC Calculation
  const totalRawCapital = currentCase.reportedInterestBearingDebt + currentCase.reportedShareholdersEquity;
  const weightDebtRaw = totalRawCapital > 0 ? currentCase.reportedInterestBearingDebt / totalRawCapital : 0.3;
  const weightEquityRaw = totalRawCapital > 0 ? currentCase.reportedShareholdersEquity / totalRawCapital : 0.7;
  const costOfDebtAfterTaxRaw = currentCase.costOfDebtPreTax * (1 - rawTaxRate);
  const rawWacc = (weightEquityRaw * currentCase.costOfEquity) + (weightDebtRaw * costOfDebtAfterTaxRaw);

  // Calculate Adjusted Economic Values based on applied toggles
  let deltaEbit = 0;
  let deltaNopat = 0;
  let deltaInvestedCapital = 0;
  let extraDebtForWacc = 0;

  currentCase.lineItems.forEach((item) => {
    const isApplied = Boolean(appliedAdjustments[item.id]);
    if (isApplied) {
      if (item.id === "rnd-expense") {
        deltaEbit += 1100;
        deltaNopat += 880;
        deltaInvestedCapital += 7200;
      } else if (item.id === "excess-cash-item") {
        deltaInvestedCapital -= currentCase.reportedNonOperatingCash;
      } else if (item.id === "operating-leases-item") {
        deltaEbit += 1200;
        deltaNopat += 936;
        deltaInvestedCapital += 16500;
        extraDebtForWacc += 16500;
      } else if (item.id === "one-off-restructuring") {
        deltaEbit += 1200;
        deltaNopat += 960;
      } else if (item.id === "pension-deficit") {
        extraDebtForWacc += 2800;
      }
    }
  });

  const adjEbit = rawEbit + deltaEbit;
  const adjNopat = rawNopat + deltaNopat;
  const adjInvestedCapital = Math.max(100, rawInvestedCapital + deltaInvestedCapital);
  const adjRoic = (adjNopat / adjInvestedCapital) * 100;

  // Adjusted WACC
  const totalAdjDebt = currentCase.reportedInterestBearingDebt + extraDebtForWacc;
  const totalAdjCapital = totalAdjDebt + currentCase.reportedShareholdersEquity;
  const weightDebtAdj = totalAdjCapital > 0 ? totalAdjDebt / totalAdjCapital : weightDebtRaw;
  const weightEquityAdj = totalAdjCapital > 0 ? currentCase.reportedShareholdersEquity / totalAdjCapital : weightEquityRaw;
  const adjWacc = (weightEquityAdj * currentCase.costOfEquity) + (weightDebtAdj * costOfDebtAfterTaxRaw);

  const rawSpread = rawRoic - rawWacc;
  const adjSpread = adjRoic - adjWacc;

  const activeFootnote = currentCase.lineItems.find((item) => item.id === selectedFootnoteId);
  const currencyLabel = isEnglish ? currentCase.currencyEn : currentCase.currencyTr;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs animate-in fade-in duration-200" id="footnote-detective-lab">
      {/* Header & Case Selector */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50">
              {t("FootnoteDetectiveLab.module_5_lab_991")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Search className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              {t("FootnoteDetectiveLab.10_k_financial_footn_992")}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("FootnoteDetectiveLab.applied_balance_shee_993")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAppliedAdjustments({});
                setSelectedFootnoteId(null);
                setGuessChecked(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t("FootnoteDetectiveLab.reset_adjustments_994")}
            </button>
          </div>
        </div>

        {/* Quick Case Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          <span className="text-xs text-slate-400 font-semibold shrink-0">{t("FootnoteDetectiveLab.select_case_995")}</span>
          {DETECTIVE_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseId(c.id);
                setSelectedFootnoteId(null);
                setGuessChecked(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCaseId === c.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {c.ticker} ({isEnglish ? c.industryEn.split(",")[0] : c.industryTr.split(",")[0]})
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>{currentCase.companyName} ({currentCase.ticker})</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {currencyLabel}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish ? currentCase.scenarioDescriptionEn : currentCase.scenarioDescriptionTr}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-1">
            {t("FootnoteDetectiveLab.illustrative_teachin_996")}
          </p>
        </div>
      </div>

      {/* Primary KPI Spread Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md">
        {/* Metric 1: NOPAT */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{t("FootnoteDetectiveLab.net_operating_profit_997")}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {Math.round(adjNopat).toLocaleString()} {currencyLabel}
            </span>
            {deltaNopat !== 0 && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                +{Math.round(deltaNopat).toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t("FootnoteDetectiveLab.raw_accounting_998")}{Math.round(rawNopat).toLocaleString()}</span>
        </div>

        {/* Metric 2: Invested Capital */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{t("FootnoteDetectiveLab.invested_capital_ic_999")}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {Math.round(adjInvestedCapital).toLocaleString()} {currencyLabel}
            </span>
            {deltaInvestedCapital !== 0 && (
              <span className={`text-xs font-bold ${deltaInvestedCapital < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {deltaInvestedCapital > 0 ? `+${deltaInvestedCapital.toLocaleString()}` : `${deltaInvestedCapital.toLocaleString()}`}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t("FootnoteDetectiveLab.raw_balance_sheet_1000")}{Math.round(rawInvestedCapital).toLocaleString()}</span>
        </div>

        {/* Metric 3: ROIC & WACC */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{t("FootnoteDetectiveLab.adjusted_roic_vs_wac_1001")}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-300">
              %{adjRoic.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              / WACC %{adjWacc.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t("FootnoteDetectiveLab.raw_roic_1002")}{rawRoic.toFixed(1)}</span>
        </div>

        {/* Metric 4: Economic Moat Spread */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{t("FootnoteDetectiveLab.moat_spread_roic_wac_1003")}</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${adjSpread >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {adjSpread >= 0 ? `+%{${adjSpread.toFixed(1)}}` : `%{${adjSpread.toFixed(1)}}`}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {adjSpread > 5 ? (t("FootnoteDetectiveLab.wide_moat_1004")) : adjSpread > 0 ? (t("FootnoteDetectiveLab.narrow_moat_1005")) : (t("FootnoteDetectiveLab.value_destroyer_1006"))}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t("FootnoteDetectiveLab.raw_spread_1007")}{rawSpread.toFixed(1)}</span>
        </div>
      </div>

      {/* Sub-view Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveViewTab("balance-sheet")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "balance-sheet"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {t("FootnoteDetectiveLab.balance_sheet_invest_1008")}
        </button>

        <button
          onClick={() => setActiveViewTab("income-statement")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "income-statement"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {t("FootnoteDetectiveLab.income_statement_nop_1009")}
        </button>

        <button
          onClick={() => setActiveViewTab("wacc-calc")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "wacc-calc"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          {t("FootnoteDetectiveLab.wacc_cost_of_capital_1010")}
        </button>

        <button
          onClick={() => setActiveViewTab("quiz-detective")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "quiz-detective"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          {t("FootnoteDetectiveLab.quiz_yourself_roic_w_1011")}
        </button>
      </div>

      {/* TAB 1: Balance Sheet & Invested Capital */}
      {activeViewTab === "balance-sheet" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {t("FootnoteDetectiveLab.economic_balance_she_1012")}
              </h3>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                {t("FootnoteDetectiveLab.click_footnote_butto_1013")}
              </span>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-x-auto text-xs">
              <table className="w-full min-w-[480px] text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">{t("FootnoteDetectiveLab.balance_sheet_line_1014")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.reported_1015")}</th>
                    <th className="p-3 text-center">{t("FootnoteDetectiveLab.footnote_1016")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.adjustment_action_1017")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {/* Total Assets */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="p-3 font-bold">{t("FootnoteDetectiveLab.total_assets_1018")}</td>
                    <td className="p-3 text-right font-mono font-bold">{currentCase.reportedTotalAssets.toLocaleString()}</td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right text-slate-400">{t("FootnoteDetectiveLab.raw_base_1019")}</td>
                  </tr>

                  {/* Excess Cash */}
                  <tr className={appliedAdjustments["excess-cash-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                    <td className="p-3 pl-6 flex items-center gap-1.5">
                      <span>{t("FootnoteDetectiveLab.cash_marketable_sec_1020")}</span>
                    </td>
                    <td className="p-3 text-right font-mono">{currentCase.reportedCashAndEquivalents.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedFootnoteId("excess-cash-item")}
                        className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                      >
                        {t("FootnoteDetectiveLab.note_4_1021")}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      {currentCase.reportedNonOperatingCash > 0 && (
                        <button
                          onClick={() => handleToggleAdjustment("excess-cash-item")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["excess-cash-item"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["excess-cash-item"]
                            ? (isEnglish ? `✓ Deducted (-${currentCase.reportedNonOperatingCash.toLocaleString()})` : `✓ Düşüldü (-${currentCase.reportedNonOperatingCash.toLocaleString()})`)
                            : (t("FootnoteDetectiveLab.deduct_excess_cash_1022"))}
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Leases Capitalization */}
                  {currentCase.id === "retail-leases-capitalization" && (
                    <tr className={appliedAdjustments["operating-leases-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 font-semibold text-indigo-700 dark:text-indigo-300">
                        {t("FootnoteDetectiveLab.capitalized_right_o_1023")}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400">{t("FootnoteDetectiveLab.0_historical_gaap_1024")}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedFootnoteId("operating-leases-item")}
                          className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                        >
                          {t("FootnoteDetectiveLab.note_21_1025")}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleAdjustment("operating-leases-item")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["operating-leases-item"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["operating-leases-item"] ? (t("FootnoteDetectiveLab.added_16_500_1026")) : (t("FootnoteDetectiveLab.capitalize_leases_1027"))}
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Capitalized R&D */}
                  {currentCase.id === "tech-cloud-rnd" && (
                    <tr className={appliedAdjustments["rnd-expense"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 font-semibold text-indigo-700 dark:text-indigo-300">
                        {t("FootnoteDetectiveLab.capitalized_net_r_d_1028")}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400">{t("FootnoteDetectiveLab.0_expensed_under_gaa_1029")}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedFootnoteId("rnd-expense")}
                          className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                        >
                          {t("FootnoteDetectiveLab.note_14_1030")}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleAdjustment("rnd-expense")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["rnd-expense"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["rnd-expense"] ? (t("FootnoteDetectiveLab.added_7_200_1031")) : (t("FootnoteDetectiveLab.capitalize_r_d_1032"))}
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Current Liabilities */}
                  <tr>
                    <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">
                      {t("FootnoteDetectiveLab.non_interest_bearin_1033")}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-rose-600">
                      -{currentCase.reportedCurrentLiabilities.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right text-slate-400">{t("FootnoteDetectiveLab.auto_deducted_1034")}</td>
                  </tr>

                  {/* Result: Invested Capital */}
                  <tr className="bg-indigo-50 dark:bg-indigo-950/60 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3">{t("FootnoteDetectiveLab.adjusted_invested_ca_1035")}</td>
                    <td className="p-3 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                      {Math.round(adjInvestedCapital).toLocaleString()} {currencyLabel}
                    </td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {adjInvestedCapital !== rawInvestedCapital
                        ? `${t("FootnoteDetectiveLab.delta_1036")}${(adjInvestedCapital - rawInvestedCapital > 0 ? "+" : "") + (adjInvestedCapital - rawInvestedCapital).toLocaleString()}`
                        : (t("FootnoteDetectiveLab.no_adjustments_1037"))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" /> {t("FootnoteDetectiveLab.mauboussin_invested_1038")}
              </strong>
              <p className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
                {t("FootnoteDetectiveLab.invested_capital_tot_1039")}
              </p>
            </div>
          </div>

          {/* Footnote Inspector Panel (Right side) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              {t("FootnoteDetectiveLab.footnote_inspector_w_1040")}
            </h3>

            {activeFootnote ? (
              <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 space-y-4 font-serif animate-in fade-in">
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    {isEnglish ? `Note ${activeFootnote.footnoteNumber} — Official Disclosure` : `Dipnot ${activeFootnote.footnoteNumber} — Resmi Şirket Açıklaması`}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {isEnglish ? activeFootnote.footnoteTitleEn : activeFootnote.footnoteTitleTr}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/60 dark:border-slate-700">
                  "{isEnglish ? activeFootnote.footnoteTextEn : activeFootnote.footnoteTextTr}"
                </p>

                <div className="font-sans space-y-2 pt-2 border-t border-amber-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
                    {t("FootnoteDetectiveLab.forensic_accounting_1041")}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {isEnglish ? activeFootnote.auditAdjustmentNoteEn : activeFootnote.auditAdjustmentNoteTr}
                  </p>
                </div>

                <div className="font-sans pt-2">
                  <button
                    onClick={() => handleToggleAdjustment(activeFootnote.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      appliedAdjustments[activeFootnote.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {appliedAdjustments[activeFootnote.id] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t("FootnoteDetectiveLab.adjustment_active_cl_1042")}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{t("FootnoteDetectiveLab.apply_forensic_adjus_1043")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {t("FootnoteDetectiveLab.click_on_any_note_bu_1044")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Income Statement & NOPAT Adjustments */}
      {activeViewTab === "income-statement" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t("FootnoteDetectiveLab.income_statement_nop_1045")}
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-x-auto text-xs">
              <table className="w-full min-w-[500px] text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">{t("FootnoteDetectiveLab.line_item_1046")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.reported_1047")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.audit_adjustment_1048")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.adjusted_1049")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-bold">{t("FootnoteDetectiveLab.net_revenues_1050")}</td>
                    <td className="p-3 text-right font-mono">{rawRevenue.toLocaleString()}</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right font-mono font-bold">{rawRevenue.toLocaleString()}</td>
                  </tr>

                  {/* Ar-Ge Geri Ekleme */}
                  {currentCase.id === "tech-cloud-rnd" && (
                    <tr className={appliedAdjustments["rnd-expense"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        {t("FootnoteDetectiveLab.r_d_expense_add_bac_1051")}
                      </td>
                      <td className="p-3 text-right text-slate-400">{t("FootnoteDetectiveLab.3_500_expensed_1052")}</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["rnd-expense"] ? `+1,100 ${currencyLabel}` : (t("FootnoteDetectiveLab.0_not_applied_1053"))}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["rnd-expense"] ? "+1,100" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* Tek Seferlik Normalizasyon */}
                  {currentCase.id === "industrial-restructuring-pension" && (
                    <tr className={appliedAdjustments["one-off-restructuring"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        {t("FootnoteDetectiveLab.one_off_restructuri_1054")}
                      </td>
                      <td className="p-3 text-right text-slate-400">{t("FootnoteDetectiveLab.1_200_one_off_1055")}</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["one-off-restructuring"] ? `+1,200 ${currencyLabel}` : "0"}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["one-off-restructuring"] ? "+1,200" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* Operating Lease Interest */}
                  {currentCase.id === "retail-leases-capitalization" && (
                    <tr className={appliedAdjustments["operating-leases-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        {t("FootnoteDetectiveLab.reclassification_of_1056")}
                      </td>
                      <td className="p-3 text-right text-slate-400">{t("FootnoteDetectiveLab.in_sg_a_1057")}</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["operating-leases-item"] ? `+1,200 ${currencyLabel}` : "0"}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["operating-leases-item"] ? "+1,200" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* EBIT */}
                  <tr className="bg-slate-50 dark:bg-slate-900/60 font-bold">
                    <td className="p-3">{t("FootnoteDetectiveLab.operating_profit_ebi_1058")}</td>
                    <td className="p-3 text-right font-mono">{rawEbit.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-mono">+{deltaEbit.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-indigo-600 dark:text-indigo-400 font-extrabold">
                      {adjEbit.toLocaleString()}
                    </td>
                  </tr>

                  {/* Effective Tax */}
                  <tr>
                    <td className="p-3 text-rose-600">{isEnglish ? `(-) Cash Effective Tax Rate (${(rawTaxRate * 100).toFixed(0)}%)` : `(-) Nakit Efektif Vergi Oranı (%${(rawTaxRate * 100).toFixed(0)})`}</td>
                    <td className="p-3 text-right font-mono text-rose-600">-{Math.round(rawEbit * rawTaxRate).toLocaleString()}</td>
                    <td className="p-3 text-right text-rose-600 font-mono">-{Math.round(deltaEbit * rawTaxRate).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-rose-600">-{Math.round(adjEbit * rawTaxRate).toLocaleString()}</td>
                  </tr>

                  {/* NOPAT */}
                  <tr className="bg-indigo-50 dark:bg-indigo-950/80 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3">{t("FootnoteDetectiveLab.adjusted_nopat_net_o_1059")}</td>
                    <td className="p-3 text-right font-mono">{Math.round(rawNopat).toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-mono font-bold">+{Math.round(deltaNopat).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">
                      {Math.round(adjNopat).toLocaleString()} {currencyLabel}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> {t("FootnoteDetectiveLab.why_nopat_outperform_1060")}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {t("FootnoteDetectiveLab.net_income_is_distor_1061")}
              </p>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-700 font-mono text-[11px] text-indigo-800 dark:text-indigo-300">
                NOPAT = EBIT × (1 - {t("FootnoteDetectiveLab.effective_tax_rate_1062")})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WACC Cost of Capital Breakdown */}
      {activeViewTab === "wacc-calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t("FootnoteDetectiveLab.weighted_average_cos_1063")}
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-x-auto text-xs">
              <table className="w-full min-w-[500px] text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">{t("FootnoteDetectiveLab.capital_component_1064")}</th>
                    <th className="p-3 text-right">{isEnglish ? `Amount (${currencyLabel})` : `Tutar (${currencyLabel})`}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.weight_1065")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.cost_after_tax_1066")}</th>
                    <th className="p-3 text-right">{t("FootnoteDetectiveLab.contribution_1067")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-semibold">{t("FootnoteDetectiveLab.shareholders_equity_1068")}</td>
                    <td className="p-3 text-right font-mono">{currentCase.reportedShareholdersEquity.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">%{(weightEquityAdj * 100).toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-bold text-indigo-600">%{currentCase.costOfEquity.toFixed(1)} (Ke)</td>
                    <td className="p-3 text-right font-mono font-bold">{((weightEquityAdj * currentCase.costOfEquity)).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{t("FootnoteDetectiveLab.financial_debt_debt_1069")}</td>
                    <td className="p-3 text-right font-mono">{totalAdjDebt.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">%{(weightDebtAdj * 100).toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-600">%{costOfDebtAfterTaxRaw.toFixed(1)} (Kd × [1-t])</td>
                    <td className="p-3 text-right font-mono font-bold">{((weightDebtAdj * costOfDebtAfterTaxRaw)).toFixed(2)}%</td>
                  </tr>
                  <tr className="bg-indigo-50 dark:bg-indigo-950/80 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3" colSpan={4}>{t("FootnoteDetectiveLab.weighted_average_cos_1070")}</td>
                    <td className="p-3 text-right font-mono text-indigo-600 dark:text-indigo-400 text-sm font-black">
                      %{adjWacc.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <strong>{t("FootnoteDetectiveLab.wacc_hurdle_rule_1071")}</strong>{" "}
              {isEnglish
                ? `As long as the company earns ROIC above %${adjWacc.toFixed(1)}, each reinvested dollar creates positive economic value. If ROIC falls below WACC, growth destroys shareholder value!`
                : `Şirket yeni yatırımlardan %${adjWacc.toFixed(1)}'in üzerinde getiri (ROIC) ürettiği sürece hissedar değeri yaratır. ROIC %${adjWacc.toFixed(1)}'in altına düştüğü an şirket büyüdükçe değer yok eder!`}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t("FootnoteDetectiveLab.understanding_wacc_c_1072")}
              </h4>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <strong className="text-slate-900 dark:text-slate-100">{t("FootnoteDetectiveLab.ke_cost_of_equity_1073")}</strong>{" "}
                  {t("FootnoteDetectiveLab.the_minimum_expected_1074")}
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-slate-100">{t("FootnoteDetectiveLab.kd_cost_of_debt_1075")}</strong>{" "}
                  {t("FootnoteDetectiveLab.the_effective_borrow_1076")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Quiz Yourself */}
      {activeViewTab === "quiz-detective" && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              {t("FootnoteDetectiveLab.detective_challenge_1077")}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t("FootnoteDetectiveLab.based_on_your_forens_1078")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t("FootnoteDetectiveLab.adjusted_roic_guess_1079")}
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={t("FootnoteDetectiveLab.e_g_24_5_1080")}
                value={userRoicGuess}
                onChange={(e) => setUserRoicGuess(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t("FootnoteDetectiveLab.adjusted_wacc_guess_1081")}
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={t("FootnoteDetectiveLab.e_g_9_2_1082")}
                value={userWaccGuess}
                onChange={(e) => setUserWaccGuess(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => setGuessChecked(true)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{t("FootnoteDetectiveLab.verify_guess_1083")}</span>
            </button>
          </div>

          {guessChecked && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  {t("FootnoteDetectiveLab.audit_verification_r_1084")}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {t("FootnoteDetectiveLab.target_values_1085")}ROIC %{adjRoic.toFixed(1)} | WACC %{adjWacc.toFixed(1)}
                </span>
              </div>

              <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  <strong>{t("FootnoteDetectiveLab.roic_accuracy_1086")}</strong>{" "}
                  {Math.abs(parseFloat(userRoicGuess || "0") - adjRoic) <= 1.0
                    ? (t("FootnoteDetectiveLab.excellent_you_calcu_1087"))
                    : (isEnglish
                        ? `Close. Adjusted NOPAT (${Math.round(adjNopat).toLocaleString()}) / Adjusted Capital (${Math.round(adjInvestedCapital).toLocaleString()}) = %${adjRoic.toFixed(1)}.`
                        : `Yaklaştınız. Düzeltilmiş NOPAT (${Math.round(adjNopat).toLocaleString()}) / Düzeltilmiş Sermaye (${Math.round(adjInvestedCapital).toLocaleString()}) = %${adjRoic.toFixed(1)}.`)}
                </p>
                <p>
                  <strong>{t("FootnoteDetectiveLab.wacc_accuracy_1088")}</strong>{" "}
                  {Math.abs(parseFloat(userWaccGuess || "0") - adjWacc) <= 0.5
                    ? (t("FootnoteDetectiveLab.spot_on_your_cost_o_1089"))
                    : (isEnglish
                        ? `The weighted average cost of capital evaluates to %${adjWacc.toFixed(1)}.`
                        : `Ağırlıklı sermaye maliyeti %${adjWacc.toFixed(1)} olarak gerçekleşti.`)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">
            {t("FootnoteDetectiveLab.michael_mauboussin_f_1090")}
          </strong>
          {isEnglish ? currentCase.takeawayEn : currentCase.takeawayTr}
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-footnote-lab-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("FootnoteDetectiveLab.see_the_calculation_1091")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("FootnoteDetectiveLab.hide_1092")) : (t("FootnoteDetectiveLab.show_1093"))}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showCalculationDetails ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <AnimatePresence>
          {showCalculationDetails && (
            <motion.div
              id="footnote-lab-calculation-breakdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-5"
            >
              {/* Formula Blueprint */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t("FootnoteDetectiveLab.forensic_economic_ad_1094")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("FootnoteDetectiveLab.adjusted_nopat_repor_1095")}</span>
                  <br />
                  <span>{t("FootnoteDetectiveLab.adjusted_invested_ca_1096")}</span>
                  <br />
                  <span>{t("FootnoteDetectiveLab.adjusted_roic_adjust_1097")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("FootnoteDetectiveLab.current_scenario_adj_1098")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-indigo-600 dark:text-indigo-400 block font-bold mb-1">
                      {t("FootnoteDetectiveLab.reported_vs_adjusted_1099")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Reported ROIC: %${rawRoic.toFixed(1)} -> Adjusted ROIC: %${adjRoic.toFixed(1)} (Difference: ${(adjRoic - rawRoic).toFixed(1)}%)`
                        : `Raporlanan ROIC: %${rawRoic.toFixed(1)} -> Düzeltilmiş ROIC: %${adjRoic.toFixed(1)} (Fark: %${(adjRoic - rawRoic).toFixed(1)})`}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-emerald-600 dark:text-emerald-400 block font-bold mb-1">
                      {t("FootnoteDetectiveLab.cost_of_capital_impa_1100")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Reported WACC: %${rawWacc.toFixed(1)} -> Adjusted WACC: %${adjWacc.toFixed(1)}`
                        : `Raporlanan WACC: %${rawWacc.toFixed(1)} -> Düzeltilmiş WACC: %${adjWacc.toFixed(1)}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
