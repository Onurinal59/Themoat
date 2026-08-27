import React, { useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { LearningModule, UserLearningState } from "../types";
import { NavTab } from "./Navbar";
import { SimTab } from "./SimulationsView";
import { useLanguage } from "../context/LanguageContext";
import { getDueFlashcards } from "../utils/spacedRepetition";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Search,
  Target,
  Swords,
  Compass,
  Milestone,
  ShieldCheck,
  Zap,
  Eye,
  PlayCircle,
  Award
} from "lucide-react";

interface RoadmapViewProps {
  userState: UserLearningState;
  onSelectModule: (module: LearningModule) => void;
  onOpenGlossary: () => void;
  onOpenAICoach: () => void;
  onOpenGuide?: () => void;
  onNavigateTab?: (
    tab: NavTab,
    sim?: SimTab,
    filter?: "all" | "due" | "missed" | "new" | number,
    targetCardIds?: string[],
    targetModuleId?: number | null
  ) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userState,
  onSelectModule,
  onOpenGlossary,
  onOpenAICoach,
  onOpenGuide,
  onNavigateTab,
}) => {
  const { isEnglish, t, getModules, getFlashcards } = useLanguage();
  const modules = getModules();
  const baseFlashcards = getFlashcards();
  const dueCards = getDueFlashcards(userState, baseFlashcards);

  const completedCount = userState.completedModules.length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  // Spotlight Effect for cards
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const getPhaseInfo = (idx: number) => {
    if (idx === 0) return { 
        title: isEnglish ? "Phase I: Strategic Foundations & Capital Economics" : "Faz I: Stratejik Temeller & Sermaye Ekonomisi", 
        desc: isEnglish ? "Establish the mathematics of economic profit (ROIC vs. WACC), avoid value-destroying growth traps, and diagnose corporate lifecycles via cash flow signatures." : "Ekonomik kârın matematiğini kurun (ROIC vs. WACC), değer yok eden büyüme tuzaklarından kaçının ve nakit akış vektörleriyle kurumsal yaşam döngüsünü teşhis edin.",
        color: "from-blue-500 to-indigo-500" 
    };
    if (idx === 2) return { 
        title: isEnglish ? "Phase II: Microeconomics & Industry Topology" : "Faz II: Mikroekonomi & Sektör Topolojisi", 
        desc: isEnglish ? "Deconstruct unit transactions via Oberholzer-Gee's Value Stick (WTP vs. WTS) and calculate industry-wide economic profit pools." : "Felix Oberholzer-Gee'nin Değer Çubuğu (WTP vs. WTS) ile birim ekonomiyi ayrıştırın ve sektör genelindeki ekonomik kâr havuzlarını haritalandırın.",
        color: "from-indigo-500 to-cyan-500" 
    };
    if (idx === 4) return { 
        title: isEnglish ? "Phase III: Structural Defenses & Competitive Dynamics" : "Faz III: Yapısal Savunma Hatları & Rekabet Dinamikleri", 
        desc: isEnglish ? "Evaluate the 7 entry barriers, execute forensic 10-K R&D/lease capitalizations, and model game-theoretic pricing dynamics (Tit-for-Tat)." : "7 yapısal giriş engelini değerlendirin, adli 10-K Ar-Ge/kiralama aktifleştirmelerini uygulayın ve oyun teorisiyle fiyat savaşlarını modelleyin.",
        color: "from-violet-500 to-purple-500" 
    };
    if (idx === 6) return { 
        title: isEnglish ? "Phase IV: Internal Engines, Expectations & Moat Audit" : "Faz IV: Şirket İçi Kâr Motoru, Beklentiler & Hendek Denetimi", 
        desc: isEnglish ? "Dissect DuPont ROIC (Margin vs. Turnover), unmask working capital financing (CCC), reverse-engineer market-implied CAP, and execute the sustainable value creation checklist." : "DuPont ROIC ayrıştırmasını yapın, negatif işletme sermayesiyle büyümenin sırrını çözün, piyasanın ima ettiği CAP süresini (Tersine DCF) hesaplayın ve sürdürülebilir değer yaratımı kontrol listesini tamamlayın.",
        color: "from-purple-500 to-fuchsia-500" 
    };
    return null;
  };

  // Determine the "Next Up" module (the first uncompleted one)
  const nextUpIndex = modules.findIndex(m => !userState.completedModules.includes(m.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-10 sm:space-y-14 max-w-5xl mx-auto pb-12"
    >
      {/* Hero Header Section */}
      <div className="relative rounded-3xl bg-slate-50 dark:bg-slate-900 overflow-hidden shadow-2xl p-5 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-800 group">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[150%] bg-gradient-to-b from-indigo-500/20 to-purple-600/20 blur-3xl rounded-full transform rotate-12 opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] bg-gradient-to-tr from-emerald-500/10 to-teal-400/10 blur-3xl rounded-full opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center justify-between">
            <div className="space-y-3.5 sm:space-y-4 max-w-2xl w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-white/10 border border-indigo-200 dark:border-white/20 text-indigo-700 dark:text-white/90 text-xs font-bold backdrop-blur-md uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="truncate">{isEnglish ? "Mauboussin & Callahan Framework" : "Michael Mauboussin Metodolojisi"}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    {isEnglish ? "Measuring the Moat:" : "Ekonomik Hendeklerin Ölçülmesi:"}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                        {isEnglish ? "Magnitude, Runway & Longevity" : "Yayılım, Yatırım Pisti & CAP"}
                    </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                    {isEnglish 
                        ? "In competitive markets, high returns attract capital that erodes margins. Learn the Morgan Stanley framework to calculate ROIC with clear assumptions, model competitive advantage periods (CAP), and reverse-engineer market expectations."
                        : "Serbest piyasada yüksek kârlar sermayeyi mıknatıs gibi çeker ve aşındırır. Morgan Stanley araştırmalarına dayanan bu akademide varsayımları açık ROIC hesaplayın, hendek süresini (CAP) modelleyin ve tersine DCF uygulayın."}
                </p>

                {/* Mobile Progress Bar Widget */}
                <div className="md:hidden pt-1 pb-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">
                      {completedCount} / {modules.length} {isEnglish ? "Modules Done" : "Modül Tamamlandı"}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">%{progressPercent} {isEnglish ? "Mastery" : "Ustalık"}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-1 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button 
                        onClick={() => {
                            if (nextUpIndex !== -1) {
                                onSelectModule(modules[nextUpIndex]);
                            } else {
                                onSelectModule(modules[0]);
                            }
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/30 transition-all min-h-[48px] active:scale-98 cursor-pointer"
                    >
                        <PlayCircle className="w-5 h-5 shrink-0" />
                        <span>{isEnglish ? (nextUpIndex === 0 ? "Start Academy" : "Continue Academy") : (nextUpIndex === 0 ? "Akademiye Başla" : "Kaldığın Yerden Devam Et")}</span>
                    </button>
                    {onNavigateTab && (
                        <button 
                            onClick={() => onNavigateTab("simulators", "cap-fade")}
                            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 transition-all font-bold text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                        >
                            <Sparkles className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                            <span>{isEnglish ? "CAP & Fade Rate Engine" : "CAP & Fade Rate Simülatörü"}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Radar/Stats for Desktop */}
            <div className="hidden md:flex shrink-0 w-full md:w-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex-col items-center justify-center min-w-[240px]">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-white/10" />
                        <motion.circle 
                            initial={{ strokeDasharray: "0 283" }}
                            animate={{ strokeDasharray: `${(progressPercent / 100) * 283} 283` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                            strokeLinecap="round"
                            className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" 
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{progressPercent}%</span>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{isEnglish ? "Mastery" : "Ustalık"}</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {completedCount} / {modules.length} {isEnglish ? "Modules Completed" : "Modül Tamamlandı"}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* The 3 Pillars of Value Creation: The Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {isEnglish ? "1. Magnitude" : "1. Büyüklük"}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">ROIC - WACC</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isEnglish ? "Economic Spread" : "Ekonomik Yayılım (Spread)"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEnglish
              ? "The excess return generated on every dollar of invested capital above the hurdle rate."
              : "Yatırılan her 100 TL sermayenin, sermaye maliyetinin üzerinde ürettiği net fazlalık getiri."}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {isEnglish ? "2. Runway" : "2. Yatırım Pisti"}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">I × RONIC</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isEnglish ? "Reinvestment Capacity" : "Yeniden Yatırım Hacmi"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEnglish
              ? "How much capital the firm can redeploy at high incremental returns before exhausting runway."
              : "Şirketin kârını yüksek getiriyle tekrar işe yatırabilme kapasitesi ve büyüme alanı."}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {isEnglish ? "3. Sustainability" : "3. Sürdürülebilirlik"}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">CAP & Fade Rate</span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isEnglish ? "Competitive Advantage Period" : "Hendek Süresi (CAP)"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEnglish
              ? "The number of years the firm can resist competitive arbitrage before ROIC fades to WACC."
              : "Rakiplerin kârı eritmesine direnilebilen ve ROIC'nin sermaye maliyetine düşmediği toplam yıl."}
          </p>
        </div>
      </div>

      {/* Quick Tools Grid - Sleek minimalist cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigateTab ? onNavigateTab("company-audit") : undefined}
            className="flex flex-col items-start p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{isEnglish ? "10-K Balance Sheet Audit" : "10-K Bilanço Röntgeni"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{isEnglish ? "Review financials to estimate adjusted NOPAT and ROIC." : "Finansalları inceleyerek düzeltilmiş NOPAT ve ROIC hesaplayın."}</p>
          </motion.button>
          
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigateTab ? onNavigateTab("moat-duel") : undefined}
            className="flex flex-col items-start p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <Swords className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{isEnglish ? "Moat Duel Simulator" : "Hendek Düellosu"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{isEnglish ? "Compare two companies head-to-head on competitive advantages." : "İki şirketi rekabet avantajları açısından kafa kafaya çarpıştırın."}</p>
          </motion.button>

          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigateTab ? onNavigateTab("spaced-repetition") : undefined}
            className="flex flex-col items-start p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{isEnglish ? "Spaced Repetition (SM-2)" : "Aralıklı Tekrar (SM-2)"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{isEnglish ? "Solidify mental models in your long-term memory." : "Öğrendiğiniz finansal zihinsel modelleri kalıcı hafızaya kazıyın."}</p>
          </motion.button>
      </div>

      {/* Spaced Review / Targeted Concept Reminder Card */}
      {(() => {
        const missedCardIds = userState.missedQuizCards?.cardIds || [];
        const missedModuleId = userState.missedQuizCards?.moduleId || null;
        const hasMissed = missedCardIds.length > 0;
        const hasDue = dueCards.length > 0;

        // If neither missed concepts nor genuinely due cards exist, hide the card completely!
        if (!hasMissed && !hasDue) {
          return null;
        }

        if (hasMissed) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/30 dark:border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <Target className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {isEnglish ? "Review needed" : "Gözden Geçirme Gerekli"}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {isEnglish
                        ? `${missedCardIds.length} Missed Concept${missedCardIds.length > 1 ? "s" : ""}`
                        : `${missedCardIds.length} Kaçırılan Kavram`}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    {hasDue
                      ? isEnglish
                        ? `${missedCardIds.length} missed concept${missedCardIds.length > 1 ? "s are" : " is"} ready to strengthen before your next quiz attempt (+ ${dueCards.length} concept${dueCards.length > 1 ? "s" : ""} due for spaced review).`
                        : `Sıradaki test denemenizden önce pekiştirmeniz gereken ${missedCardIds.length} kaçırılan kavram hazır (+ ${dueCards.length} aralıklı tekrar bekleyen kart).`
                      : isEnglish
                      ? `${missedCardIds.length} missed concept${missedCardIds.length > 1 ? "s are" : " is"} ready to strengthen before your next quiz attempt.`
                      : `Sıradaki test denemenizden önce pekiştirmeniz gereken ${missedCardIds.length} kaçırılan kavram hazır.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  onNavigateTab
                    ? onNavigateTab("spaced-repetition", undefined, "missed", missedCardIds, missedModuleId)
                    : undefined
                }
                className="shrink-0 self-end sm:self-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-600/20 active:scale-98 cursor-pointer min-h-[44px]"
              >
                <span>{isEnglish ? "Review missed concepts" : "Kaçırılan kavramları çalış"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </motion.div>
          );
        }

        // Only genuinely due cards
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-500/30 dark:border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {isEnglish ? "Due for Spaced Review" : "Günü Gelen Aralıklı Tekrarlar"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {isEnglish ? `${dueCards.length} Cards Ready` : `${dueCards.length} Kart Hazır`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {isEnglish
                    ? `${dueCards.length} concept${dueCards.length > 1 ? "s are" : " is"} ready for a quick refresh.`
                    : `${dueCards.length} zihinsel model hafızanızı tazelemek için hazır.`}
                </p>
              </div>
            </div>

            <button
              onClick={() => (onNavigateTab ? onNavigateTab("spaced-repetition", undefined, "due") : undefined)}
              className="shrink-0 self-end sm:self-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-purple-600/20 active:scale-98 cursor-pointer min-h-[44px]"
            >
              <span>{isEnglish ? "Start due review" : "Tekrar kuyruğunu başlat"}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </motion.div>
        );
      })()}

      {/* The Mastery Timeline */}
      <div className="relative mt-6 sm:mt-8">
        {/* Main Vertical Line for desktop */}
        <div className="hidden sm:block absolute left-10 top-4 bottom-12 w-0.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        
        {/* Animated Progress Line for desktop */}
        <div className="hidden sm:block absolute left-10 top-4 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" style={{ height: `${Math.max(0, (completedCount / modules.length) * 100 - 5)}%`, minHeight: completedCount > 0 ? '5%' : '0' }}></div>

        <div className="space-y-4 sm:space-y-8 relative">
          {modules.map((module, idx) => {
            const isCompleted = userState.completedModules.includes(module.id);
            const isNext = idx === nextUpIndex;
            const isPreview = !isCompleted && !isNext;
            const quizScore = userState.quizScores[module.id];
            
            const phaseInfo = getPhaseInfo(idx);

            return (
              <React.Fragment key={module.id}>
                {/* Phase Header Injection */}
                {phaseInfo && (
                    <div className="relative sm:pl-24 pt-4 pb-2 sm:py-4">
                        <div className={`hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br ${phaseInfo.color} shadow-lg ring-4 ring-white dark:ring-slate-950 z-10 items-center justify-center`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div className="inline-flex sm:block items-center gap-2">
                          <span className={`sm:hidden w-2.5 h-2.5 rounded-full bg-gradient-to-br ${phaseInfo.color}`}></span>
                          <h2 className={`text-xs sm:text-base font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${phaseInfo.color}`}>
                              {phaseInfo.title}
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                            {phaseInfo.desc}
                        </p>
                    </div>
                )}

                {/* Module Node & Card */}
                <div className="relative sm:pl-24">
                  {/* Timeline Node Marker for desktop */}
                  <div className={`hidden sm:flex absolute left-[2.125rem] top-8 w-5 h-5 rounded-full border-2 z-10 transition-all duration-500 items-center justify-center bg-white dark:bg-slate-950
                    ${isCompleted 
                        ? 'border-indigo-500 scale-100' 
                        : isNext 
                            ? 'border-indigo-500 scale-125 ring-4 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulse' 
                            : 'border-slate-300 dark:border-slate-700 scale-90'
                    }`}
                  >
                    {isCompleted && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
                    {isNext && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                    {isPreview && <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>}
                  </div>

                  {/* Module Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.25, delay: (idx % 3) * 0.05 }}
                    whileHover={{ scale: 1.008 }}
                    onClick={() => onSelectModule(module)}
                    className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 group cursor-pointer overflow-hidden ${
                      isNext
                        ? "bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-500 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                        : isPreview
                        ? "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-start sm:items-center">
                      <div className="flex-1 space-y-2.5 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider border ${
                              isNext
                                ? "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700"
                                : isPreview
                                ? "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {isEnglish ? `Step 0${module.id}` : `Adım 0${module.id}`}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {module.subtitle}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400" /> {module.estimatedMinutes} {isEnglish ? "Min" : "Dk"}
                          </span>
                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              {isEnglish ? `Completed${quizScore !== undefined ? ` • ${quizScore}%` : ""}` : `Tamamlandı${quizScore !== undefined ? ` • %${quizScore}` : ""}`}
                            </span>
                          ) : isNext ? (
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              {isEnglish ? "Continue learning" : "Öğrenmeye devam et"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                              {isEnglish ? "Preview available" : "Önizleme açık"}
                            </span>
                          )}
                        </div>

                        <h3
                          className="text-base sm:text-lg font-bold transition-colors leading-snug text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                        >
                          {module.title}
                        </h3>

                        <p
                          className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                        >
                          {module.description}
                        </p>

                        {/* Takeaway Teaser */}
                        <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-start gap-2 mt-1">
                          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{module.zeroKnowledgeSummary}</span>
                        </div>
                      </div>

                      {/* CTA / Status */}
                      <div className="shrink-0 pt-1 sm:pt-0 w-full sm:w-auto">
                        <button
                          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] cursor-pointer shadow-xs active:scale-98 ${
                            isNext
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 shadow-md"
                              : isCompleted
                              ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {isPreview && <Eye className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />}
                          <span>
                            {isCompleted
                              ? isEnglish ? "Review Masterclass" : "Dersi Tekrarla"
                              : isNext
                              ? isEnglish ? (idx === 0 ? "Start Masterclass" : "Continue Masterclass") : (idx === 0 ? "Dersi Başlat" : "Derse Devam Et")
                              : isEnglish ? "Preview Masterclass" : "Dersi Önizle"}
                          </span>
                          <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
