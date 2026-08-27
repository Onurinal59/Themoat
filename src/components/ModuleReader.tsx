import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LearningModule, UserLearningState } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { PASSING_SCORE_THRESHOLD } from "../utils/spacedRepetition";
import { RoicWaccSim } from "./simulators/RoicWaccSim";
import { DickinsonLifecycleSim } from "./simulators/DickinsonLifecycleSim";
import { ValueStickSim } from "./simulators/ValueStickSim";
import { ProfitPoolSim } from "./simulators/ProfitPoolSim";
import { FootnoteDetectiveLab } from "./simulators/FootnoteDetectiveLab";
import { PrisonersDilemmaSim } from "./simulators/PrisonersDilemmaSim";
import { ColonelBlottoSim } from "./simulators/ColonelBlottoSim";
import { DuPontSim } from "./simulators/DuPontSim";
import { CashConversionSim } from "./simulators/CashConversionSim";
import { ReverseDCFSim } from "./simulators/ReverseDCFSim";
import { MoatChecklistSim } from "./simulators/MoatChecklistSim";
import { CapFadeRateSim } from "./simulators/CapFadeRateSim";
import { ReinvestmentRunwaySim } from "./simulators/ReinvestmentRunwaySim";
import { BrandAcidTestSim } from "./simulators/BrandAcidTestSim";
import { SimTab } from "./SimulationsView";
import { MathFormula } from "./MathFormula";
import {
  DickinsonLifecycleVisual,
  ValueStickVisual,
  PorterForcesVisual,
} from "./ModuleVisualDiagrams";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trophy,
  BookOpen,
  MessageSquare,
  RotateCcw,
  Clock,
  Layers,
  FlaskConical,
  Play,
  Calculator,
  Award,
  Compass,
  Milestone,
  FileText,
  ExternalLink,
  Eye,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ModuleReaderProps {
  module: LearningModule;
  allModules: LearningModule[];
  userState: UserLearningState;
  onBackToRoadmap: () => void;
  onSelectModule: (m: LearningModule) => void;
  onCompleteModule: (moduleId: number, score: number) => void;
  onQuizFailed?: (moduleId: number, score: number, missedCardIds: string[]) => void;
  onOpenAICoach: () => void;
  onOpenGlossary: (termId?: string) => void;
  onOpenLabSim?: (simId: SimTab) => void;
  onOpenFormulaWorkshop?: (formulaId: string) => void;
  onReviewMissedInFlashcards?: (moduleId: number, cardIds: string[]) => void;
}

// Module to Lab Simulator Mapping for "Kendin Dene" feature
interface ModuleLabConfig {
  simId: SimTab;
  title: string;
  badge: string;
  description: string;
  buttonLabel: string;
}

const MODULE_LAB_MAPPINGS_TR: Record<number, ModuleLabConfig> = {
  1: {
    simId: "roic-wacc",
    title: "ROIC vs WACC & Şato Hendeği Simülatörü",
    badge: "MODÜL 1 İLE İLİŞKİLİ",
    description: "Sıfırdan başlangıç: Limonata tezgahından holdinge, sermaye maliyeti (WACC) ile NOPAT getirisini (ROIC) ve yaratılan gerçek refahı hesaplayın.",
    buttonLabel: "ROIC & Şato Simülatöründe Kendin Dene",
  },
  2: {
    simId: "dickinson",
    title: "Dickinson Yaşam Döngüsü & Nakit Akış Röntgeni",
    badge: "MODÜL 2 İLE İLİŞKİLİ",
    description: "Faaliyet, Yatırım ve Finansman nakit akışlarının (+ / -) yönlerini değiştirerek şirketin Giriş, Büyüme, Olgunluk veya Düşüş evresini anında teşhis edin.",
    buttonLabel: "Yaşam Döngüsü Laboratuvarında Kendin Dene",
  },
  3: {
    simId: "value-stick",
    title: "Değer Çubuğu (Value Stick - WTP, Fiyat, Maliyet, WTS) Simülatörü",
    badge: "MODÜL 3 İLE İLİŞKİLİ",
    description: "Müşterinin Ödemeye İstekliliği (WTP) ile Tedarikçi Maliyetini (WTS) dinamik olarak artırıp azaltın; şirketin kâr payını canlı izleyin.",
    buttonLabel: "Değer Çubuğu Atölyesinde Kendin Dene",
  },
  4: {
    simId: "profit-pool",
    title: "Sektörel Kâr Havuzu Çarpıklığı Simülatörü",
    badge: "MODÜL 4 İLE İLİŞKİLİ",
    description: "Havacılık ve teknoloji sektörlerindeki kâr ve sermaye dağılımını inceleyin; kimin değer üretip kimin değer yok ettiğini simüle edin.",
    buttonLabel: "Kâr Havuzu Atölyesinde Kendin Dene",
  },
  5: {
    simId: "footnote-detective",
    title: "10-K Dipnot Dedektifi & Bilanço Düzeltmeleri",
    badge: "MODÜL 5 İLE İLİŞKİLİ",
    description: "Faaliyet kiralamalarını borca dönüştürün, Ar-Ge giderlerini aktifleştirin; düzeltilmiş NOPAT ve Düzeltilmiş ROIC'i adım adım hesaplayın.",
    buttonLabel: "10-K Dipnot Dedektifinde Kendin Dene",
  },
  6: {
    simId: "game-theory",
    title: "Oyun Teorisi & Fiyat Savaşı (Tutsak İkilemi) Simülatörü",
    badge: "MODÜL 6 İLE İLİŞKİLİ",
    description: "Rakibinizle fiyat kırma veya koordinasyon hamleleri yapın; Nash dengesini ve kâr havuzunun nasıl buharlaştığını deneyimleyin.",
    buttonLabel: "Oyun Teorisi Arenasında Kendin Dene",
  },
  7: {
    simId: "dupont",
    title: "5 Bileşenli DuPont & Negatif Nakit Dönüşüm Süresi (CCC)",
    badge: "MODÜL 7 İLE İLİŞKİLİ",
    description: "Faaliyet marjı x Sermaye devir hızı çarpımını değiştirin; Amazon'un tedarikçi parasıyla nasıl sıfır sermaye gerektiren bir hendek kurduğunu görün.",
    buttonLabel: "DuPont & CCC Atölyesinde Kendin Dene",
  },
  8: {
    simId: "reverse-dcf",
    title: "Tersine DCF & Piyasanın İma Ettiği Hendek Süresi (CAP)",
    badge: "MODÜL 8 İLE İLİŞKİLİ",
    description: "Hisse fiyatını girin, model size piyasanın bu şirketten kaç yıllık olağanüstü hendek (CAP) beklediğini söylesin.",
    buttonLabel: "Tersine DCF Simülatöründe Kendin Dene",
  },
};

const MODULE_LAB_MAPPINGS_EN: Record<number, ModuleLabConfig> = {
  1: {
    simId: "roic-wacc",
    title: "ROIC vs WACC & Economic Moat Castle Simulator",
    badge: "LINKED TO MODULE 1",
    description: "From lemonade stands to conglomerates: calculate Cost of Capital (WACC) vs Return on Capital (ROIC) and real economic value added.",
    buttonLabel: "Try in ROIC & Moat Castle Simulator",
  },
  2: {
    simId: "dickinson",
    title: "Dickinson Cash Flow Lifecycle Diagnostic",
    badge: "LINKED TO MODULE 2",
    description: "Toggle Operating, Investing, and Financing cash flow directions (+ / -) to diagnose Intro, Growth, Maturity, or Decline stages in real-time.",
    buttonLabel: "Try in Dickinson Lifecycle Lab",
  },
  3: {
    simId: "value-stick",
    title: "Value Stick (WTP, Price, Cost, WTS) Interactive Tool",
    badge: "LINKED TO MODULE 3",
    description: "Dynamically adjust Willingness-to-Pay (WTP) and Supplier Cost (WTS) to inspect how economic value capture shifts.",
    buttonLabel: "Try in Value Stick Workshop",
  },
  4: {
    simId: "profit-pool",
    title: "Industry Profit Pool Skew Simulator",
    badge: "LINKED TO MODULE 4",
    description: "Analyze profit vs capital distribution across airlines, semiconductors, and tech to see who creates vs destroys value.",
    buttonLabel: "Try in Profit Pool Workshop",
  },
  5: {
    simId: "footnote-detective",
    title: "10-K Footnote Detective & Forensic Adjustments",
    badge: "LINKED TO MODULE 5",
    description: "Capitalize operating leases, amortize R&D expenses, and recalculate adjusted NOPAT and Adjusted Invested Capital.",
    buttonLabel: "Try in 10-K Footnote Detective",
  },
  6: {
    simId: "game-theory",
    title: "Game Theory & Price War (Prisoner's Dilemma) Arena",
    badge: "LINKED TO MODULE 6",
    description: "Play against rational rivals in price cuts vs coordination; observe Nash equilibrium and profit pool destruction.",
    buttonLabel: "Try in Game Theory Arena",
  },
  7: {
    simId: "dupont",
    title: "5-Stage DuPont & Negative Cash Conversion Cycle (CCC)",
    badge: "LINKED TO MODULE 7",
    description: "Decompose Operating Margin x Capital Turnover; observe how Amazon built a moat funded entirely by suppliers.",
    buttonLabel: "Try in DuPont & CCC Workshop",
  },
  8: {
    simId: "reverse-dcf",
    title: "Reverse DCF & Competitive Advantage Period (CAP)",
    badge: "LINKED TO MODULE 8",
    description: "Input current stock price to uncover how many years of high-spread moat the market has already priced in.",
    buttonLabel: "Try in Reverse DCF Simulator",
  },
};

export const ModuleReader: React.FC<ModuleReaderProps> = ({
  module,
  allModules,
  userState,
  onBackToRoadmap,
  onSelectModule,
  onCompleteModule,
  onQuizFailed,
  onOpenAICoach,
  onOpenGlossary,
  onOpenLabSim,
  onOpenFormulaWorkshop,
  onReviewMissedInFlashcards,
}) => {
  const { isEnglish, getFormulaGuides } = useLanguage();
  const formulaGuidesMap = getFormulaGuides();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Reset quiz when module changes
  useEffect(() => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [module.id]);

  const currentIndex = allModules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const isCurrentModuleCompleted = userState.completedModules.includes(module.id);
  const isPrerequisiteMet = prevModule ? userState.completedModules.includes(prevModule.id) : true;
  const isPreviewMode = !isCurrentModuleCompleted && !isPrerequisiteMet;

  const isCurrentQuizPassed = isQuizSubmitted && quizScore !== null && quizScore >= PASSING_SCORE_THRESHOLD;
  const isNextModuleNormalLearning = isCurrentModuleCompleted || isCurrentQuizPassed;

  // Identify missed questions and map to their flashcard IDs
  const missedQuestions = isQuizSubmitted
    ? module.quiz.filter((q) => selectedAnswers[q.id] !== q.correctAnswerIndex)
    : [];
  const missedFlashcardIds = Array.from(
    new Set(missedQuestions.map((q) => q.flashcardId).filter(Boolean))
  ) as string[];

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (isPreviewMode) return;
    if (module.quiz.length === 0) return;

    let correctCount = 0;
    module.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / module.quiz.length) * 100);
    setQuizScore(score);
    setIsQuizSubmitted(true);

    const missed = module.quiz.filter((q) => selectedAnswers[q.id] !== q.correctAnswerIndex);
    const missedCardIds = Array.from(
      new Set(missed.map((q) => q.flashcardId).filter(Boolean))
    ) as string[];

    // Only mark module complete and unlock next step if passed (>= 80%)
    if (score >= PASSING_SCORE_THRESHOLD || module.quiz.length === 0) {
      onCompleteModule(module.id, score);
    } else {
      onQuizFailed?.(module.id, score, missedCardIds);
    }

    // Trigger confetti if mastery achieved
    if (score >= PASSING_SCORE_THRESHOLD) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
  };

  // Helper to render widget if specified in section
  const renderWidget = (widgetId?: string) => {
    switch (widgetId) {
      case "roic-wacc":
        return <RoicWaccSim isEnglish={isEnglish} />;
      case "cap-fade":
        return <CapFadeRateSim />;
      case "reinvestment-runway":
        return <ReinvestmentRunwaySim />;
      case "dickinson":
        return <DickinsonLifecycleSim isEnglish={isEnglish} />;
      case "value-stick":
        return <ValueStickSim isEnglish={isEnglish} />;
      case "brand-acid-test":
        return <BrandAcidTestSim />;
      case "dupont":
        return <DuPontSim isEnglish={isEnglish} />;
      case "profit-pool":
        return <ProfitPoolSim isEnglish={isEnglish} />;
      case "footnote-detective":
        return <FootnoteDetectiveLab isEnglish={isEnglish} />;
      case "game-theory":
        return <PrisonersDilemmaSim isEnglish={isEnglish} />;
      case "blotto":
        return <ColonelBlottoSim isEnglish={isEnglish} />;
      case "ccc":
        return <CashConversionSim isEnglish={isEnglish} />;
      case "reverse-dcf":
        return <ReverseDCFSim isEnglish={isEnglish} />;
      case "checklist":
        return <MoatChecklistSim isEnglish={isEnglish} />;
      default:
        return null;
    }
  };

  const mappings = isEnglish ? MODULE_LAB_MAPPINGS_EN : MODULE_LAB_MAPPINGS_TR;
  const labConfig = mappings[module.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16 px-1 sm:px-0"
      id="module-reader"
    >
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <motion.button
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToRoadmap}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEnglish ? "Back to Roadmap" : "Yol Haritasına Dön"}</span>
        </motion.button>

        <div className="flex items-center gap-2">
          {labConfig && onOpenLabSim && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenLabSim(labConfig.simId)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={isEnglish ? "Open this module's simulator in the lab" : "Bu modülün simülatörünü laboratuvarda aç"}
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{isEnglish ? "Try in Lab" : "Laboratuvarda Dene"}</span>
              <span className="sm:hidden">{isEnglish ? "Lab" : "Laboratuvar"}</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenGlossary()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{isEnglish ? "Glossary" : "Sözlük"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAICoach}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{isEnglish ? "Ask Coach" : "Koça Sor"}</span>
          </motion.button>
        </div>
      </div>

      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-950 dark:text-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Eye className="w-4.5 h-4.5" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="font-extrabold text-amber-900 dark:text-amber-200">
                {isEnglish ? "Preview mode — " : "Önizleme modu — "}
              </span>
              <span className="text-amber-800 dark:text-amber-300">
                {isEnglish
                  ? `You can explore this lesson. To record progress and complete the module, first pass the Step 0${prevModule ? prevModule.id : module.id - 1} quiz.`
                  : `Bu dersi inceleyebilirsin. İlerlemeyi kaydetmek ve modülü tamamlamak için önce Step 0${prevModule ? prevModule.id : module.id - 1} quizini geç.`}
              </span>
            </div>
          </div>

          {prevModule && (
            <button
              onClick={() => onSelectModule(prevModule)}
              className="shrink-0 self-end sm:self-auto px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[36px] active:scale-98"
            >
              {isEnglish ? `Go to Step 0${prevModule.id}` : `Step 0${prevModule.id}’e Git`}
            </button>
          )}
        </motion.div>
      )}

      {/* Module Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-2xs">
            {isEnglish ? `Step 0${module.id}` : `Adım 0${module.id}`}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            {module.subtitle}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 ml-auto font-semibold">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {isEnglish ? `Estimated Reading: ${module.estimatedMinutes} Minutes` : `Tahmini Okuma: ${module.estimatedMinutes} Dakika`}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {module.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          {module.description}
        </p>

        {/* Intuitive Zero-Knowledge Teaser */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-amber-950 dark:text-amber-100">
            <strong className="block font-bold text-amber-950 dark:text-amber-50 text-sm">
              {isEnglish ? "💡 Core Intuition & Real-Life Analogy" : "💡 Temel Sezgi & Günlük Hayat Analojisi"}
            </strong>
            <p className="leading-relaxed text-sm text-amber-900 dark:text-amber-200">{module.zeroKnowledgeSummary}</p>
          </div>
        </div>

        {/* Pedagogical Step Bridge */}
        {module.moduleBridge && (
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300">
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isEnglish ? "🧭 Learning Bridge & Why This Step?" : "🧭 Öğrenme Köprüsü & Neden Bu Adım?"}</span>
            </div>
            
            {module.moduleBridge.takeawayFromPrev && (
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {module.moduleBridge.prevTitle
                    ? isEnglish ? `Previous Step (${module.moduleBridge.prevTitle}): ` : `Önceki Adım (${module.moduleBridge.prevTitle}): `
                    : isEnglish ? "Previous Step: " : "Önceki Adım: "}
                </span>
                {module.moduleBridge.takeawayFromPrev}
              </div>
            )}

            <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 font-medium bg-white/80 dark:bg-slate-900/70 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                {isEnglish ? "🎯 Target Question to Solve:" : "🎯 Çözeceğimiz Soru:"}
              </span>
              <span>{module.moduleBridge.transitionQuestion}</span>
            </div>
          </div>
        )}

        {/* Academic Source & Methodological Assumptions Callout */}
        {module.sourceAndAssumption && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{isEnglish ? "Academic Sources & Analytical Scope" : "Akademik Kaynak & Metodolojik Kapsam"}</span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{isEnglish ? "Primary Source: " : "Ana Kaynak: "}</span>
                <span>{module.sourceAndAssumption.primarySource}</span>
              </div>
              {module.sourceAndAssumption.secondarySource && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{isEnglish ? "Secondary: " : "İkincil: "}</span>
                  <span>{module.sourceAndAssumption.secondarySource}</span>
                </div>
              )}
            </div>
            {module.sourceAndAssumption.scopeNote && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                {module.sourceAndAssumption.scopeNote}
              </p>
            )}
            <div className="pt-1.5 flex items-center justify-between gap-2 flex-wrap">
              <a
                href="https://www.morganstanley.com/content/dam/im/assets/publication/thought-leadership/consilient-observer/article_measuringthemoat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline cursor-pointer min-h-[36px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isEnglish ? "Official Morgan Stanley \"Measuring the Moat\" (2024) PDF" : "Resmi Morgan Stanley \"Measuring the Moat\" (2024) PDF Raporu"}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Structured Sections */}
      <div className="space-y-6">
        {module.sections.map((section, idx) => (
          <div
            key={section.id}
            className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
            </div>

            {/* Everyday Analogy Box */}
            {(section.analogyBox || section.everydayAnalogy) && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {section.analogyBox?.title || (isEnglish ? "Everyday Analogy: Understand from Scratch" : "Sıfırdan Analoji: Günlük Hayattan Bir Örnekle Anlayalım")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
                  {section.analogyBox?.description || section.everydayAnalogy}
                </p>
              </div>
            )}

            {/* Structured Formula Box */}
            {section.formulaBox && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-xl">
                {/* Header */}
                <div className="px-4 sm:px-5 py-3 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider border border-amber-500/20 dark:border-amber-400/30">
                      📐 {isEnglish ? "CORE EQUATION" : "TEMEL EŞİTLİK"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {section.formulaBox.title}
                    </span>
                  </div>
                  {section.formulaDeepDiveId && (
                    <button
                      onClick={() => onOpenFormulaWorkshop?.(section.formulaDeepDiveId!)}
                      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-slate-300 dark:border-slate-700 text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{isEnglish ? "Calculate in Workshop" : "Formül Sayfasında Hesapla"}</span>
                    </button>
                  )}
                </div>

                {/* Main Equation Box */}
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-950 space-y-4">
                  <MathFormula equation={section.formulaBox.equation} size="md" />

                  {/* Variables Breakdown Pills */}
                  {section.formulaBox.variables && section.formulaBox.variables.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {isEnglish ? "Variables & Parameters" : "Değişkenler & Parametre Açıklamaları"}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {section.formulaBox.variables.map((v, vIdx) => (
                          <div
                            key={vIdx}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 text-xs"
                          >
                            <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-black border border-indigo-200 dark:border-indigo-800/60 shrink-0">
                              {v.symbol}
                            </span>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 dark:text-slate-100">{v.label}</div>
                              {v.desc && <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{v.desc}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Calculation */}
                  {section.formulaBox.exampleCalculation && (
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{isEnglish ? "Numerical Proof & Example" : "Sayısal Örnek Sağlaması"}</span>
                      </div>
                      <pre className="font-mono text-xs text-indigo-900 dark:text-indigo-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {section.formulaBox.exampleCalculation}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step-by-Step Math or Breakdown */}
            {section.stepByStepMath && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs shadow-xs">
                <div className="flex items-center gap-2 font-sans font-bold text-indigo-700 dark:text-amber-400 text-xs uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-indigo-600 dark:text-amber-400" />
                  <span>{isEnglish ? "Step-by-Step Diagnostic Breakdown" : "Adım Adım Hesaplama Röntgeni"}</span>
                </div>
                <div className="space-y-2">
                  {section.stepByStepMath.split("\n").map((stepLine, sIdx) => {
                    const isStep = stepLine.startsWith("Adım") || stepLine.startsWith("Step");
                    return (
                      <div
                        key={sIdx}
                        className={`p-2.5 rounded-xl ${
                          isStep
                            ? "bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 flex items-start gap-2.5 shadow-xs"
                            : "text-slate-600 dark:text-slate-300 pl-2"
                        }`}
                      >
                        {isStep && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 font-sans font-bold text-[10px] uppercase shrink-0 border border-amber-200 dark:border-amber-400/30">
                            {stepLine.split(":")[0]}
                          </span>
                        )}
                        <span className="leading-relaxed font-sans sm:font-mono">
                          {isStep ? stepLine.substring(stepLine.indexOf(":") + 1).trim() : stepLine}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Content Paragraphs & Structured Cards */}
            <div className="prose dark:prose-invert max-w-none text-base text-slate-800 dark:text-slate-100 leading-[1.68] space-y-4">
              {(Array.isArray(section.content)
                ? section.content
                : typeof section.content === "string"
                ? (section.content as string).split("\n\n")
                : []
              ).map((para, pIdx) => {
                // Match Dickinson 5 Stages
                const dickinsonMatch = para.match(/^(\d+)\.\s*([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]:\s*([^(]+)(?:\(([^)]+)\))?/i);
                if (dickinsonMatch) {
                  const [, num, nameTr, nameEn, cashFlows, text, roicTag] = dickinsonMatch;
                  const isMaturity = nameEn.toLowerCase().includes("maturity") || nameTr.toLowerCase().includes("olgunluk");
                  const isDecline = nameEn.toLowerCase().includes("decline") || nameTr.toLowerCase().includes("düşüş");
                  const isGrowth = nameEn.toLowerCase().includes("growth") || nameTr.toLowerCase().includes("büyüme");
                  const isIntro = nameEn.toLowerCase().includes("intro") || nameTr.toLowerCase().includes("giriş");

                  const borderClass = isMaturity
                    ? "border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : isDecline
                    ? "border-rose-400/80 bg-rose-50/50 dark:bg-rose-950/20"
                    : isGrowth
                    ? "border-indigo-400/80 bg-indigo-50/50 dark:bg-indigo-950/20"
                    : isIntro
                    ? "border-amber-400/80 bg-amber-50/50 dark:bg-amber-950/20"
                    : "border-purple-400/80 bg-purple-50/50 dark:bg-purple-950/20";

                  const badgeClass = isMaturity
                    ? "bg-emerald-600 text-white"
                    : isDecline
                    ? "bg-rose-600 text-white"
                    : isGrowth
                    ? "bg-indigo-600 text-white"
                    : isIntro
                    ? "bg-amber-500 text-white"
                    : "bg-purple-600 text-white";

                  return (
                    <div
                      key={pIdx}
                      className={`p-4 sm:p-5 rounded-2xl border-2 shadow-xs space-y-2.5 transition-all ${borderClass}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black font-mono ${badgeClass}`}>
                            0{num}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                            {isEnglish ? nameTr.trim() : `${nameTr.trim()} (${nameEn.trim()})`}
                          </span>
                          {isMaturity && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400/30 text-amber-900 dark:text-amber-200 text-[10px] font-black border border-amber-400/50">
                              {isEnglish ? "🏆 IDEAL MOAT STAGE" : "🏆 İDEAL HENDEK EVRESİ"}
                            </span>
                          )}
                        </div>

                        {roicTag && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-slate-100 dark:bg-slate-800">
                            {roicTag.trim()}
                          </span>
                        )}
                      </div>

                      {/* Cash flow pills */}
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {isEnglish ? "Cash Flow Directions:" : "Nakit Akış Yönleri:"}
                        </span>
                        {cashFlows.split(",").map((cf, cIdx) => {
                          const isPos = cf.includes("(+)");
                          const isNeg = cf.includes("(-)");
                          const cfPill = isPos
                            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                            : isNeg
                            ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700";
                          return (
                            <span
                              key={cIdx}
                              className={`px-2 py-0.5 rounded-md border font-bold text-[11px] ${cfPill}`}
                            >
                              {cf.trim()}
                            </span>
                          );
                        })}
                      </div>

                      {/* Text Body */}
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium m-0">
                        {text.trim()}
                      </p>
                    </div>
                  );
                }

                // Match numbered feature list item
                const numberedMatch = para.match(/^(\d+)\.\s*([^:]+):\s*(.*)/);
                if (numberedMatch) {
                  const [, num, label, text] = numberedMatch;
                  return (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 my-2"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {num}
                      </span>
                      <div className="space-y-0.5 text-xs sm:text-sm">
                        <strong className="text-slate-900 dark:text-slate-100 font-bold block">
                          {label.trim()}
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                          {text.trim()}
                        </p>
                      </div>
                    </div>
                  );
                }

                const isFormulaCallout = para.startsWith("Formül:") || para.startsWith("Formula:") || (para.includes(" = ") && (para.includes("WACC") || para.includes("ROIC") || para.includes("Spread")));
                if (isFormulaCallout) {
                  return (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 font-mono text-xs flex items-start gap-2.5 my-2 shadow-xs"
                    >
                      <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="font-bold leading-relaxed">{para}</div>
                    </div>
                  );
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>

            {/* Interactive Visual Infographic if specified on section */}
            {section.interactiveVisualId === "dickinson-lifecycle" && (
              <DickinsonLifecycleVisual />
            )}
            {section.interactiveVisualId === "value-stick" && (
              <ValueStickVisual />
            )}
            {section.interactiveVisualId === "porter-forces" && (
              <PorterForcesVisual />
            )}

            {/* Interactive Widget if bound to section */}
            {section.interactiveWidgetId && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {isEnglish ? "Live Interactive Simulation" : "Canlı Etkileşimli Simülasyon"}
                </div>
                {renderWidget(section.interactiveWidgetId)}
              </div>
            )}

            {/* Real World Company Case Study */}
            {section.companyExample && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEnglish ? `Real-World Case Study: ${section.companyExample.company}` : `Gerçek Şirket Vakası: ${section.companyExample.company}`}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                  {section.companyExample.context}
                </p>
              </div>
            )}

            {/* Formula Deep Dive Guide Trigger Card */}
            {section.formulaDeepDiveId && formulaGuidesMap[section.formulaDeepDiveId] && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-indigo-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white uppercase tracking-wider">
                      🧮 {isEnglish ? "Formula Workshop" : "Formül & Hesaplama Atölyesi"}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                      {isEnglish ? "How to calculate step by step?" : "Adım Adım Nasıl Hesaplanır?"}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {formulaGuidesMap[section.formulaDeepDiveId].title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {formulaGuidesMap[section.formulaDeepDiveId].plainLanguageSummary}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenFormulaWorkshop?.(section.formulaDeepDiveId!)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{isEnglish ? "Inspect & Calculate" : "Formülü İncele & Hesapla"}</span>
                </motion.button>
              </div>
            )}

            {/* Key Takeaway */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-slate-100">
                  {isEnglish ? "Core Takeaway Principle:" : "Akılda Kalacak İlke:"}
                </strong>{" "}
                {section.keyTakeaway}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "Kendin Dene" Interactive Lab Gateway Banner */}
      {labConfig && onOpenLabSim && (
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-950 text-white shadow-lg border border-indigo-700/60 dark:border-indigo-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 dark:bg-indigo-500/30 text-white dark:text-indigo-200 border border-white/30 dark:border-indigo-400/30 uppercase tracking-wider">
                🧪 {labConfig.badge}
              </span>
              <span className="text-xs text-indigo-200 dark:text-indigo-300 font-medium">
                {isEnglish ? "Hands-On Lab" : "Uygulamalı Atölye"}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {labConfig.title}
            </h3>
            <p className="text-xs text-indigo-100/90 dark:text-indigo-200/90 leading-relaxed max-w-xl">
              {labConfig.description}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenLabSim(labConfig.simId)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-xs transition-all shadow-md cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>{isEnglish ? "Try for Yourself" : "Kendin Dene"}</span>
          </motion.button>
        </div>
      )}

      {/* Pedagogical Bridge to Next Step */}
      {module.moduleBridge?.whyNext && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-white border border-indigo-100 dark:border-indigo-500/30 shadow-xs dark:shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Milestone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEnglish
                ? `🚀 Next Piece of the Puzzle: Why ${module.moduleBridge.nextTitle}?`
                : `🚀 Yapbozun Sıradaki Parçası: Neden ${module.moduleBridge.nextTitle}?`}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
            {module.moduleBridge.whyNext}
          </p>
          {module.moduleBridge.previewQuestion && (
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-400/30 text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">{isEnglish ? "❓ Key Question Ahead:" : "❓ Sıradaki Merak Sorusu:"}</span>
              <span>{module.moduleBridge.previewQuestion}</span>
            </div>
          )}
        </div>
      )}

      {/* Interactive Module Quiz */}
      <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6" id="module-quiz">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {isEnglish ? "Comprehension & Mastery Test" : "Kavrama & Ustalık Testi"}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {isEnglish
                ? `End-of-Module Mastery Quiz (${module.quiz.length} Questions)`
                : `Modül Sonu Değerlendirme Testi (${module.quiz.length} Soru)`}
            </h3>
          </div>
          {isQuizSubmitted && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleResetQuiz}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Retry Quiz" : "Tekrar Dene"}
            </motion.button>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {module.quiz.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <fieldset key={q.id} className="space-y-3 border-0 p-0 m-0">
                <legend className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {qIdx + 1}. {q.question}
                </legend>

                <div className="space-y-2.5" role="radiogroup" aria-label={`${isEnglish ? "Question" : "Soru"} ${qIdx + 1}`}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optStyle = "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-700 dark:text-slate-300";

                    if (isQuizSubmitted) {
                      if (optIdx === q.correctAnswerIndex) {
                        optStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrect) {
                        optStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-100 font-bold shadow-2xs ring-1 ring-indigo-400";
                    }

                    return (
                      <label
                        key={optIdx}
                        htmlFor={`q-${q.id}-opt-${optIdx}`}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 min-h-[46px] select-none ${
                          isQuizSubmitted ? "cursor-default opacity-95" : "cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800"
                        } ${optStyle}`}
                      >
                        <input
                          type="radio"
                          id={`q-${q.id}-opt-${optIdx}`}
                          name={`quiz-question-${q.id}`}
                          value={optIdx}
                          checked={isSelected}
                          disabled={isQuizSubmitted}
                          onChange={() => handleOptionSelect(q.id, optIdx)}
                          className="sr-only"
                          aria-label={`${String.fromCharCode(65 + optIdx)}: ${opt}`}
                        />
                        <span
                          aria-hidden="true"
                          className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                            isSelected ? "border-current bg-indigo-600 text-white dark:bg-indigo-400 dark:text-slate-900" : "border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Explanation on submit */}
                {isQuizSubmitted && (
                  <motion.div
                    role="region"
                    aria-label={isCorrect ? (isEnglish ? "Correct answer explanation" : "Doğru cevap açıklaması") : (isEnglish ? "Explanation and solution" : "Açıklama ve çözüm")}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                      isCorrect
                        ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                        : "bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
                    }`}
                  >
                    <strong className="block mb-1 font-bold">
                      {isCorrect
                        ? isEnglish ? "✅ Excellent, Correct Answer!" : "✅ Harika, Doğru Cevap!"
                        : isEnglish ? "💡 Explanation & Solution:" : "💡 Açıklama ve Çözüm:"}
                    </strong>
                    {q.explanation}
                  </motion.div>
                )}
              </fieldset>
            );
          })}
        </div>

        {/* Mastery Result Feedback Box */}
        {isQuizSubmitted && !isPreviewMode && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 sm:p-5 rounded-2xl border ${
              isCurrentQuizPassed
                ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                : "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isCurrentQuizPassed
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {isCurrentQuizPassed ? (
                    <Trophy className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm sm:text-base">
                      {isCurrentQuizPassed
                        ? isEnglish
                          ? `Passed 🎉 • ${quizScore}% Score`
                          : `Geçtiniz 🎉 • %${quizScore} Başarı Puanı`
                        : isEnglish
                        ? `Not Yet Mastered • ${quizScore}% Score`
                        : `Henüz Ustalaşılmadı • %${quizScore} Puan`}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold uppercase ${
                        isCurrentQuizPassed
                          ? "bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                          : "bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200"
                      }`}
                    >
                      {isCurrentQuizPassed
                        ? isEnglish ? "Mastery Achieved (≥80%)" : "Ustalık Sağlandı (≥%80)"
                        : isEnglish ? "80% Required to Complete" : "Tamamlamak İçin En Az %80 Gerekir"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {isCurrentQuizPassed
                      ? isEnglish
                        ? "Outstanding work! You have satisfied the mastery criteria and unlocked the next module in your learning roadmap."
                        : "Harika iş! Ustalık kriterini başarıyla sağladınız ve yol haritanızdaki sonraki adımın kilidini açtınız."
                      : isEnglish
                      ? "To count this module as completed and save your progress, review the key concepts you missed and retake the quiz. You can also explore subsequent lessons in preview mode anytime."
                      : "Bu modülü tamamlandı saymak ve ilerlemenizi kaydetmek için kaçırdığınız kavramları gözden geçirin ve testi tekrar çözün. Dilerseniz sonraki dersleri önizleme modunda incelemeye devam edebilirsiniz."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz Submit & Action Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div id="quiz-status-instruction" className="text-xs text-slate-500 dark:text-slate-400">
            {isPreviewMode ? (
              <span className="text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                {isEnglish
                  ? "To save this quiz score, complete the previous module first."
                  : "Bu quiz’i kaydetmek için önce önceki modülü tamamla."}
              </span>
            ) : isQuizSubmitted ? (
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                {isEnglish
                  ? `Your Score: ${quizScore}% (${isCurrentQuizPassed ? "Passed 🎉" : "Not yet mastered — 80% required"})`
                  : `Başarı Puanınız: %${quizScore} (${isCurrentQuizPassed ? "Geçtiniz 🎉" : "Henüz ustalaşılmadı — en az %80 gerekli"})`}
              </span>
            ) : (
              <span>{isEnglish ? "Select your answers and submit to verify." : "Cevaplarınızı seçtikten sonra sonucu kontrol edin."}</span>
            )}
          </div>

          {isPreviewMode ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                aria-describedby="quiz-status-instruction"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-sm font-bold opacity-75 cursor-not-allowed min-h-[44px] select-none"
              >
                {isEnglish ? "Complete Test & Save Score" : "Testi Tamamla & Puanı Kaydet"}
              </button>
            </div>
          ) : !isQuizSubmitted ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={Object.keys(selectedAnswers).length < module.quiz.length}
              aria-describedby="quiz-status-instruction"
              onClick={handleSubmitQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-xs transition-all cursor-pointer min-h-[44px]"
            >
              {isEnglish ? "Complete Test & Save Score" : "Testi Tamamla & Puanı Kaydet"}
            </motion.button>
          ) : isNextModuleNormalLearning ? (
            nextModule ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectModule(nextModule)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>{isEnglish ? `Continue to Next Step (Step 0${nextModule.id})` : `Sonraki Adıma Geç (Adım 0${nextModule.id})`}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBackToRoadmap}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{isEnglish ? "Academy Completed! View Roadmap" : "Akademi Tamamlandı! Müfredatı Gör"}</span>
              </motion.button>
            )
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {missedFlashcardIds.length > 0 && onReviewMissedInFlashcards && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onReviewMissedInFlashcards(module.id, missedFlashcardIds)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  title={isEnglish ? "Study missed concepts in flashcards" : "Kaçırılan kavramları flashcard'larda tekrar et"}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>
                    {isEnglish
                      ? `Review missed concepts in Flashcards (${missedFlashcardIds.length})`
                      : `Kaçırılan kavramları Flashcard'larda çalış (${missedFlashcardIds.length})`}
                  </span>
                </motion.button>
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResetQuiz}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>{isEnglish ? "Retake Quiz" : "Testi Tekrar Çöz"}</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Prev / Next Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
        {prevModule ? (
          <motion.button
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectModule(prevModule)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{isEnglish ? `Previous Step (0${prevModule.id})` : `Önceki Adım (0${prevModule.id})`}</span>
          </motion.button>
        ) : (
          <div />
        )}

        {nextModule && (
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectModule(nextModule)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer min-h-[44px] ${
              isNextModuleNormalLearning
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 shadow-md"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {!isNextModuleNormalLearning && <Eye className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />}
            <span>
              {isNextModuleNormalLearning
                ? isEnglish
                  ? `Continue to Next Step (Step 0${nextModule.id})`
                  : `Sonraki Adıma Geç (Adım 0${nextModule.id})`
                : isEnglish
                ? `Preview Step 0${nextModule.id}`
                : `Step 0${nextModule.id} Önizle`}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
