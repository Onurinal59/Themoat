export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  detailedExplanation: string;
  realWorldAnalogy: string;
  category: "Temel Finans" | "Strateji" | "Mikroekonomi" | "Sektör Analizi" | "İnovasyon & Oyun Teorisi";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  practicalScenario?: string;
}

export interface ModuleBridge {
  prevTitle?: string;
  takeawayFromPrev?: string;
  transitionQuestion: string;
  nextTitle?: string;
  whyNext?: string;
  previewQuestion?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  summary: string;
  content: string[] | string; // Pedagogical paragraphs with rich examples
  analogyBox?: {
    title: string;
    description: string;
  };
  everydayAnalogy?: string;
  formulaBox?: {
    title: string;
    equation: string;
    variables?: { symbol: string; label: string; desc?: string }[];
    exampleCalculation?: string;
  };
  stepByStepMath?: string;
  companyExample?: {
    company: string;
    context: string;
  };
  keyTakeaway: string;
  interactiveWidgetId?: string;
  formulaDeepDiveId?: "wacc" | "roic" | "value-stick" | "dickinson" | "profit-pool" | "footnote" | "dupont-ccc" | "reverse-dcf";
  interactiveVisualId?: "dickinson-lifecycle" | "value-stick" | "porter-forces" | "dupont-tree" | "ccc-timeline" | "profit-pool" | "reverse-dcf" | "entry-barriers";
}

export interface SourceAndAssumption {
  primarySource: string; // E.g. "Mauboussin & Callahan (2024), s. 3" or "Victoria Dickinson (2011)"
  secondarySource?: string;
  scopeNote: string; // Educational scope & model clarification
  assumptions?: string[]; // Critical model assumptions
}

export interface LearningModule {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  iconName: string;
  description: string;
  zeroKnowledgeSummary: string;
  moduleBridge?: ModuleBridge;
  sourceAndAssumption?: SourceAndAssumption;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
}

export interface Flashcard {
  id: string;
  moduleId: number;
  term: string;
  question: string;
  answer: string;
  analogy: string;
  difficulty: "kolay" | "orta" | "zor";
  // SM-2 Spaced repetition state
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string; // ISO string
  lastReviewedDate?: string;
}

export interface FormulaStep {
  stepNumber: number;
  title: string;
  formula: string;
  explanation: string;
  exampleValues: string;
}

export interface FormulaGuide {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  coreEquation: string;
  plainLanguageSummary: string;
  whyThisFormulaExists: string;
  variables: {
    symbol: string;
    name: string;
    description: string;
    howToFindIt: string;
  }[];
  steps: FormulaStep[];
  realWorldExample: {
    company: string;
    scenario: string;
    calculationSteps: string[];
    resultInterpretation: string;
  };
  commonPitfalls: string[];
  calculatorType: "wacc" | "roic" | "value-stick" | "dickinson" | "profit-pool" | "footnote" | "dupont-ccc" | "reverse-dcf";
}

export interface UserLearningState {
  completedModules: number[];
  quizScores: Record<number, number>; // moduleId -> score percent
  flashcardStates: Record<string, Flashcard>;
  currentStreak: number;
  lastActiveDate: string;
  masteredCardsCount: number;
  bookmarkedTerms: string[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  question: string;
  explanation: string;
  highScoreIndicator: string;
  lowScoreIndicator: string;
}

export interface FinancialMetricInputs {
  revenue: number; // Yıllık Satış Gelirleri (Milyon TL/USD)
  operatingIncome: number; // Faaliyet Kârı / EBIT (Milyon TL/USD)
  effectiveTaxRate: number; // Efektif Vergi Oranı (%)
  totalAssets: number; // Toplam Varlıklar (Milyon TL/USD)
  cashAndEquivalents: number; // Nakit ve Benzerleri (Milyon TL/USD)
  nonInterestCurrentLiabilities: number; // Ticari Borçlar & Faizsiz Kısa Vadeli Borçlar (Milyon TL/USD)
  wacc: number; // Ağırlıklı Ortalama Sermaye Maliyeti - WACC (%)
}

export interface CompanyAuditDossier {
  id: string;
  companyName: string;
  ticker: string;
  industry: string;
  description: string;
  financials: FinancialMetricInputs;
  // Qualitative Evaluation
  industryStructure: {
    supplierPower: "düşük" | "orta" | "yüksek"; // Düşük güç hendek için iyi
    buyerPower: "düşük" | "orta" | "yüksek"; // Düşük güç hendek için iyi
    threatOfNewEntrants: "düşük" | "orta" | "yüksek"; // Düşük tehdit iyi
    threatOfSubstitutes: "düşük" | "orta" | "yüksek"; // Düşük tehdit iyi
    industryRivalry: "düşük" | "orta" | "yüksek"; // Düşük rekabet iyi
    profitPoolPosition: string; // Kâr havuzunda hangi halkada?
  };
  competitiveAdvantage: {
    primaryType: "tüketici_avantajı" | "üretim_avantajı" | "ölçek_avantajı" | "yok";
    subDrivers: string[]; // ['Ağ Etkisi', 'Geçiş Maliyeti', 'Marka/Arama Maliyeti', 'Patent/Lisans', 'Süreç Üstünlüğü', 'Ölçek Ekonomisi']
    pricingPowerEvidence: string; // Şirketin fiyat artırabilme kanıtı
    costAdvantageEvidence: string; // Şirketin birim maliyet avantajı kanıtı
  };
  interactionAndDiscipline: {
    capacityDiscipline: "yüksek" | "orta" | "düşük"; // Kapasite fazlası riski var mı?
    priceWarRisk: "düşük" | "orta" | "yüksek"; // Fiyat kırma dürtüsü var mı?
    managementCapitalAllocation: "mükemmel" | "ortalama" | "kötü"; // Kârı nereye yatırıyor?
  };
  sustainability: {
    estimatedCapYears: number; // CAP: Rekabetçi Avantaj Dönemi (Yıl)
    moatWidth: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)";
    keyVulnerability: string; // Hendegi tehdit eden en büyük risk (örn. teknolojik değişim)
  };
  notes: string;
  updatedAt: string;
  createdAt?: string;
  isCustom?: boolean;
  lastStep?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

export interface StepMethodologyGuide {
  step: number;
  title: string;
  mauboussinQuote: string;
  coreConcepts: string[];
  keyQuestions: string[];
  commonPitfalls: string[];
  practicalExercise: string;
}


