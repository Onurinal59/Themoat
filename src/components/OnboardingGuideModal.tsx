import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Compass,
  Search,
  Target,
  Building2,
  Swords,
  Repeat,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  X,
  Zap,
  Calculator,
  PlayCircle
} from "lucide-react";
import { NavTab } from "./Navbar";
import { SimTab } from "./SimulationsView";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";

interface OnboardingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab, sim?: SimTab) => void;
  onStartFirstModule?: () => void;
}

interface TourStep {
  id: string;
  stepNumber: number;
  title: string;
  badge: string;
  targetTab: NavTab;
  targetSim?: SimTab;
  tabName: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  summary: string;
  whatYouWillLearn: string[];
  recommendedAction: string;
  ctaText: string;
}

export const OnboardingGuideModal: React.FC<OnboardingGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onStartFirstModule
}) => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const contentBodyRef = useRef<HTMLDivElement>(null);
  const dialogRef = useAccessibleDialog(isOpen, onClose);

  const TOUR_STEPS_TR: TourStep[] = [
    {
      id: "step-1-roadmap",
      stepNumber: 1,
      title: "Sıfırdan Başlangıç — Yol Haritası",
      badge: "TEMEL VE KAVRAMLAR",
      targetTab: "roadmap",
      tabName: "Yol Haritası",
      icon: Compass,
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBg: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 dark:from-blue-500/20 dark:to-indigo-500/20 dark:border-blue-500/30",
      summary: "Finans veya strateji geçmişiniz olmasa bile; mahalle fırını, limonata tezgahı ve iPhone gibi somut analojilerle ekonomik hendeklerin arkasındaki bilimi öğrenin.",
      whatYouWillLearn: [
        "Değer Çubuğu (WTP vs. Maliyet) ile kalıcı fiyatlama gücü",
        "Porter 5 Güç analiziyle sektör kârlılığını tahmin etme",
        "DuPont Yöntemi ile ROIC ayrıştırması",
        "CAP (Rekabetçi Avantaj Dönemi) ve ortalamaya dönüş dinamikleri"
      ],
      recommendedAction: "1. Modül olan 'Ekonomik Hendek Nedir?' ile başlayın ve mini testleri çözerek ilk rozetlerinizi kazanın.",
      ctaText: "Müfredata Git ve Başla"
    },
    {
      id: "step-2-formulas",
      stepNumber: 2,
      title: "Formül & Röntgen Atölyesi",
      badge: "FİNANSAL MATEMATİK",
      targetTab: "formulas",
      tabName: "Formüller",
      icon: Calculator,
      iconColor: "text-indigo-500 dark:text-indigo-400",
      iconBg: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20 dark:from-indigo-500/20 dark:to-violet-500/20 dark:border-indigo-500/30",
      summary: "Michael Mauboussin ve Morgan Stanley analizlerinde kullanılan 8 temel ekonomik hendek formülünü tam sayfa interaktif hesaplayıcılarla pratik edin.",
      whatYouWillLearn: [
        "WACC ve Hurdle Rate hesabı",
        "ROIC, NOPAT ve Yatırılan Sermaye matematiği",
        "Victoria Dickinson Nakit Akışı Röntgeni",
        "Sektörel Kâr Havuzu ve Ekonomik Refah"
      ],
      recommendedAction: "Hazır şirket şablonlarını seçip parametrelerle oynayarak kârlılık tepkilerini inceleyin.",
      ctaText: "Atölyeyi Aç"
    },
    {
      id: "step-3-footnote",
      stepNumber: 3,
      title: "Bilanço & Dipnot Dedektifi",
      badge: "UYGULAMALI PRATİK",
      targetTab: "simulators",
      targetSim: "footnote-detective",
      tabName: "Dipnot Analizi",
      icon: Search,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "from-cyan-500/10 to-teal-500/10 border-cyan-500/20 dark:from-cyan-500/20 dark:to-teal-500/20 dark:border-cyan-500/30",
      summary: "Standart muhasebe rakamları ekonomik kârlılığı maskeleyebilir. Şirketlerin 10-K ve KAP dipnotlarına inerek düzeltilmiş ROIC ve WACC hesaplamalarını keşfedin.",
      whatYouWillLearn: [
        "Ar-Ge harcamalarını aktifleştirme (R&D Capitalization)",
        "Bilançodaki devasa hazine bonolarını ayıklama",
        "Mağaza kiralama giderlerini borca dönüştürme",
        "Tek seferlik fabrika cezalarını normalleştirme"
      ],
      recommendedAction: "Örnek vakaları seçip dipnot butonlarına tıklayarak düzeltmeleri uygulayın.",
      ctaText: "Dedektifliğe Başla"
    },
    {
      id: "step-4-reverse-dcf",
      stepNumber: 4,
      title: "Tersine DCF & Zımni CAP Simülatörü",
      badge: "İLERİ DÜZEY DEĞERLEME",
      targetTab: "simulators",
      targetSim: "reverse-dcf",
      tabName: "Tersine DCF",
      icon: Target,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "from-amber-500/10 to-orange-500/10 border-amber-500/20 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-amber-500/30",
      summary: "Geleceği tahmin etmek yerine, mevcut hisse fiyatının içine piyasanın kaç yıllık rekabet avantajı (CAP) fiyatladığını tersine mühendislikle çözün.",
      whatYouWillLearn: [
        "Fiyatın ima ettiği ciro büyümesi ve NOPAT beklentileri",
        "Hissede kaç yıllık rekabetçi avantaj (CAP) gömülü?",
        "Piyasa aşırı mı iyimser yoksa hendek ucuz mu kalmış?"
      ],
      recommendedAction: "Apple veya Spotify şablonunu yükleyip hisse fiyatı sürgüsünü kaydırarak yılları gözlemleyin.",
      ctaText: "Simülatörü Çalıştır"
    },
    {
      id: "step-5-company-audit",
      stepNumber: 5,
      title: "Şirket Analiz Stüdyosu",
      badge: "KENDİ TEZİNİ OLUŞTUR",
      targetTab: "company-audit",
      tabName: "Analiz Stüdyosu",
      icon: Building2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "from-emerald-500/10 to-green-500/10 border-emerald-500/20 dark:from-emerald-500/20 dark:to-green-500/20 dark:border-emerald-500/30",
      summary: "Bir şirketi 5 yapısal adımda inceleyin ve kendi hendek tezinizi Yatırım Komitesi'ne karşı (Şeytanın Avukatı) savunun.",
      whatYouWillLearn: [
        "Sektör dinamikleri ve WTP (Ödeme İsteği) faktörleri",
        "Birincil hendek sürücüsünü belirleme",
        "Değerleme tezini komite itirazlarına karşı savunma"
      ],
      recommendedAction: "Yeni bir dosya açın (Apple, Costco) ve komite simülasyonunu test edin.",
      ctaText: "Stüdyoya Git"
    },
    {
      id: "step-6-duel",
      stepNumber: 6,
      title: "Hendek Düellosu & Kıyaslama",
      badge: "RAKİPLERİ KAPIŞTIR",
      targetTab: "moat-duel",
      tabName: "Hendek Düellosu",
      icon: Swords,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "from-purple-500/10 to-fuchsia-500/10 border-purple-500/20 dark:from-purple-500/20 dark:to-fuchsia-500/20 dark:border-purple-500/30",
      summary: "İki rakip şirketi yan yana koyarak DuPont marjlarını, ROIC makaslarını ve Porter 5 Güç dayanıklılıklarını doğrudan çarpıştırın.",
      whatYouWillLearn: [
        "Sermaye verimliliğinde kim daha üstün?",
        "Hangi şirketin hendeği rekabet erozyonuna daha dayanıklı?",
        "Yönetimin sermaye tahsisat kalitesi"
      ],
      recommendedAction: "Apple vs. Spotify düellosunu başlatın.",
      ctaText: "Düelloyu Başlat"
    },
    {
      id: "step-7-spaced-rep",
      stepNumber: 7,
      title: "Aralıklı Tekrarlama (SM-2)",
      badge: "KALICI HAFIZA",
      targetTab: "spaced-repetition",
      tabName: "SM-2 Flashcards",
      icon: Repeat,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "from-rose-500/10 to-pink-500/10 border-rose-500/20 dark:from-rose-500/20 dark:to-pink-500/20 dark:border-rose-500/30",
      summary: "Öğrendiğiniz kritik finans ve strateji terimlerini unutmamak için bilimsel SuperMemo SM-2 algoritmasıyla günde 2 dakika tekrar yapın.",
      whatYouWillLearn: [
        "WTP erozyonu, NOPAT türetimi, CAP aşınması gibi terimleri hatırlama",
        "Seri (Streak) takibi ile her gün düzenli pratik"
      ],
      recommendedAction: "Günde 5 dakikanızı ayırıp kartları puanlayın ve serinizi koruyun.",
      ctaText: "Öğrenmeyi Pekiştir"
    }
  ];

  const TOUR_STEPS_EN: TourStep[] = [
    {
      id: "step-1-roadmap",
      stepNumber: 1,
      title: "Starting from Zero — Roadmap",
      badge: "FOUNDATION",
      targetTab: "roadmap",
      tabName: "Roadmap",
      icon: Compass,
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBg: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 dark:from-blue-500/20 dark:to-indigo-500/20 dark:border-blue-500/30",
      summary: "Learn the science of Economic Moats through intuitive real-world analogies like local bakeries, lemonade stands, and Apple.",
      whatYouWillLearn: [
        "Value Stick (WTP vs. Cost) & pricing power",
        "Porter's 5 Forces to gauge industry profitability",
        "DuPont Decomposition for ROIC",
        "Competitive Advantage Period (CAP) and mean reversion"
      ],
      recommendedAction: "Begin with Module 1 'What is an Economic Moat?' and complete mini quizzes.",
      ctaText: "Go to Curriculum"
    },
    {
      id: "step-2-formulas",
      stepNumber: 2,
      title: "Formula & Diagnostic Workshop",
      badge: "FINANCIAL MATH",
      targetTab: "formulas",
      tabName: "Formula Lab",
      icon: Calculator,
      iconColor: "text-indigo-500 dark:text-indigo-400",
      iconBg: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20 dark:from-indigo-500/20 dark:to-violet-500/20 dark:border-indigo-500/30",
      summary: "Practice 8 fundamental economic moat formulas used by Michael Mauboussin and Morgan Stanley in interactive sandboxes.",
      whatYouWillLearn: [
        "WACC and Hurdle Rate calculations",
        "ROIC, NOPAT, and Invested Capital math",
        "Victoria Dickinson 5-Stage Cash Flow Diagnostic",
        "Industry Profit Pools and Economic Profit Spread"
      ],
      recommendedAction: "Open the Formula Lab, pick company presets, and observe changes dynamically.",
      ctaText: "Open Formula Lab"
    },
    {
      id: "step-3-footnote",
      stepNumber: 3,
      title: "10-K Footnote Detective",
      badge: "APPLIED PRACTICE",
      targetTab: "simulators",
      targetSim: "footnote-detective",
      tabName: "Footnote Detective",
      icon: Search,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "from-cyan-500/10 to-teal-500/10 border-cyan-500/20 dark:from-cyan-500/20 dark:to-teal-500/20 dark:border-cyan-500/30",
      summary: "Standard accounting can mask economic profitability. Dive into 10-K footnotes to calculate Adjusted Invested Capital.",
      whatYouWillLearn: [
        "Capitalizing R&D expenses as assets",
        "Excluding non-operating cash and treasury bills",
        "Converting operating leases into debt",
        "Normalizing one-off restructuring charges"
      ],
      recommendedAction: "Select Nexus Cloud or Atlas Market case and apply forensic adjustments.",
      ctaText: "Launch Detective"
    },
    {
      id: "step-4-reverse-dcf",
      stepNumber: 4,
      title: "Reverse DCF & Implied CAP",
      badge: "ADVANCED VALUATION",
      targetTab: "simulators",
      targetSim: "reverse-dcf",
      tabName: "Reverse DCF",
      icon: Target,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "from-amber-500/10 to-orange-500/10 border-amber-500/20 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-amber-500/30",
      summary: "Instead of forecasting the unknown, reverse-engineer current market stock prices to reveal the implied Competitive Advantage Period (CAP).",
      whatYouWillLearn: [
        "What revenue growth and NOPAT margins are priced in",
        "How many years of high-spread moat the market expects",
        "Spotting market over-optimism vs undervalued moats"
      ],
      recommendedAction: "Load Apple or Spotify presets and adjust stock price sliders to examine expectations.",
      ctaText: "Run Simulator"
    },
    {
      id: "step-5-company-audit",
      stepNumber: 5,
      title: "Company Audit Studio",
      badge: "BUILD YOUR THESIS",
      targetTab: "company-audit",
      tabName: "Audit Studio",
      icon: Building2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "from-emerald-500/10 to-green-500/10 border-emerald-500/20 dark:from-emerald-500/20 dark:to-green-500/20 dark:border-emerald-500/30",
      summary: "Audit any public company across 5 structured steps, then defend your moat thesis against the Investment Committee Devil's Advocate.",
      whatYouWillLearn: [
        "Industry dynamics, WTP factors, and capital return scoring",
        "Identifying primary moat drivers",
        "Defending your valuation thesis against skeptical challenges"
      ],
      recommendedAction: "Open a dossier (Apple, Costco) and run the committee simulation.",
      ctaText: "Enter Studio"
    },
    {
      id: "step-6-duel",
      stepNumber: 6,
      title: "Moat Duel Simulator",
      badge: "COMPARE COMPETITORS",
      targetTab: "moat-duel",
      tabName: "Moat Duel",
      icon: Swords,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "from-purple-500/10 to-fuchsia-500/10 border-purple-500/20 dark:from-purple-500/20 dark:to-fuchsia-500/20 dark:border-purple-500/30",
      summary: "Place two rival companies side-by-side to directly compare DuPont margins, ROIC spreads, and Porter's resilience.",
      whatYouWillLearn: [
        "Who possesses superior capital efficiency?",
        "Which moat is wider and more resilient?",
        "Evaluating capital allocation track record"
      ],
      recommendedAction: "Launch an Apple vs. Spotify or retail rivalry duel.",
      ctaText: "Start Duel"
    },
    {
      id: "step-7-spaced-rep",
      stepNumber: 7,
      title: "Spaced Repetition (SM-2)",
      badge: "LONG-TERM RETENTION",
      targetTab: "spaced-repetition",
      tabName: "Flashcards",
      icon: Repeat,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "from-rose-500/10 to-pink-500/10 border-rose-500/20 dark:from-rose-500/20 dark:to-pink-500/20 dark:border-rose-500/30",
      summary: "Retain critical financial concepts with 2 minutes of daily flashcards powered by the SuperMemo SM-2 algorithm.",
      whatYouWillLearn: [
        "Active recall of 20+ crucial concepts",
        "Streak tracking for daily disciplined learning"
      ],
      recommendedAction: "Spend 5 minutes grading flashcards to maintain your streak.",
      ctaText: "Solidify Knowledge"
    }
  ];

  const TOUR_STEPS = isEnglish ? TOUR_STEPS_EN : TOUR_STEPS_TR;
  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const IconComponent = currentStep.icon;

  useEffect(() => {
    contentBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  const handleStepAction = () => {
    onNavigateTab(currentStep.targetTab, currentStep.targetSim);
    if (currentStep.targetTab === "roadmap" && onStartFirstModule) {
      onStartFirstModule();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="platform-tour-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row text-slate-900 dark:text-slate-200"
        style={{ maxHeight: '90vh' }}
      >
        {/* Abstract Background Elements inside Modal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br ${currentStep.iconBg.split(' ')[0]} to-transparent blur-[100px] opacity-40 dark:opacity-20 transition-colors duration-700`} />
            <div className={`absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-tl ${currentStep.iconBg.split(' ')[0]} to-transparent blur-[80px] opacity-20 dark:opacity-10 transition-colors duration-700`} />
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 dark:opacity-10" style={{ filter: "invert(var(--is-light, 0)) opacity(0.2)"}} />
        </div>

        {/* Left Sidebar - Navigation & Steps */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col z-10 shrink-0">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[10px] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                {t("OnboardingGuideModal.platform_tour_673")}
              </div>
              <h2 id="platform-tour-title" className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Moat Academy
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label={t("audit.closeTour")}
              className="md:hidden p-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Steps (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
            {TOUR_STEPS.map((step, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 text-left border ${
                    isActive
                      ? "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-md dark:shadow-lg"
                      : "border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${
                    isActive ? "bg-indigo-600 dark:bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                      {step.badge}
                    </div>
                    <div className={`text-sm font-bold truncate ${isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                      {step.tabName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col z-10 relative overflow-hidden bg-white/50 dark:bg-slate-950/20 backdrop-blur-sm">
            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              aria-label={t("audit.closeTour")}
              className="hidden md:flex absolute top-6 right-6 p-2.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-50 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Content Scroll Area */}
            <div ref={contentBodyRef} className="flex-1 overflow-y-auto p-6 md:p-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        {/* Step Header */}
                        <div className="space-y-4">
                            <div className={`inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-br ${currentStep.iconBg} border shadow-xl`}>
                                <IconComponent className={`w-10 h-10 ${currentStep.iconColor}`} />
                            </div>
                            
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                                    {t("audit.stopOf", undefined, { step: currentStep.stepNumber })}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    {currentStep.title}
                                </h1>
                            </div>

                            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                {currentStep.summary}
                            </p>
                        </div>

                        {/* Objectives / Learning Outcomes */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <Target className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                {t("OnboardingGuideModal.core_competencies_ma_674")}
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {currentStep.whatYouWillLearn.map((item, index) => (
                                    <div key={index} className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Action */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-100/50 to-transparent dark:from-amber-500/10 dark:to-transparent border border-amber-200 dark:border-amber-500/20 flex items-start gap-4">
                            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 shrink-0">
                                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
                                    {t("OnboardingGuideModal.recommended_immediat_675")}
                                </h4>
                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200/80">
                                    {currentStep.recommendedAction}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Actions Bar (Fixed) */}
            <div className="p-5 md:p-6 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-xl flex items-center justify-between gap-4 shrink-0 z-20 relative">
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                        disabled={isFirstStep}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                            isFirstStep
                                ? "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-700 cursor-not-allowed"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-sm dark:shadow-lg"
                        }`}
                        aria-label={t("audit.previousStep")}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentStepIndex((prev) => Math.min(TOUR_STEPS.length - 1, prev + 1))}
                        disabled={isLastStep}
                        className={`px-6 py-3 rounded-xl border transition-all font-bold text-sm flex items-center gap-2 ${
                            isLastStep
                                ? "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-700 cursor-not-allowed"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-sm dark:shadow-lg"
                        }`}
                    >
                        {t("OnboardingGuideModal.next_step_676")}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStepAction}
                    className="flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 text-sm font-black transition-all cursor-pointer shadow-[0_0_20px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
                >
                    <PlayCircle className="w-5 h-5 text-white dark:text-indigo-600" />
                    <span className="truncate">{currentStep.ctaText}</span>
                </motion.button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
