import React, { useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { LearningModule, UserLearningState } from "../types";
import { NavTab } from "./Navbar";
import { SimTab } from "./SimulationsView";
import { useLanguage } from "../context/LanguageContext";
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
  Lock,
  PlayCircle,
  Award
} from "lucide-react";

interface RoadmapViewProps {
  userState: UserLearningState;
  onSelectModule: (module: LearningModule) => void;
  onOpenGlossary: () => void;
  onOpenAICoach: () => void;
  onOpenGuide?: () => void;
  onNavigateTab?: (tab: NavTab, sim?: SimTab) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userState,
  onSelectModule,
  onOpenGlossary,
  onOpenAICoach,
  onOpenGuide,
  onNavigateTab,
}) => {
  const { isEnglish, t, getModules } = useLanguage();
  const modules = getModules();

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
        title: isEnglish ? "Phase I: The Triad & Strategic Foundations" : "Faz 1: Değer Yaratma Üçlüsü & Stratejik Temeller", 
        desc: isEnglish ? "Master the Triad (Spread, Runway, Duration), lifecycle diagnostics, and unit microeconomics (WTP/WTS)." : "Değer Yaratma Üçlüsünü (Yayılım, Yatırım Pisti, CAP), yaşam döngüsü teşhisini ve birim mikroekonomiyi kavrayın.",
        color: "from-blue-500 to-indigo-500" 
    };
    if (idx === 3) return { 
        title: isEnglish ? "Phase II: Industry Diagnostics & Forensic Accounting" : "Faz 2: Sektör Kâr Havuzları & Adli Bilanço Analizi", 
        desc: isEnglish ? "Map profit pool distortions, capitalize operating leases and R&D, and analyze competitive games & regulation." : "Kâr havuzu haritalarını çıkarın, kiralama ve Ar-Ge'yi aktifleştirerek düzeltilmiş ROIC hesaplayın ve regülasyonu analiz edin.",
        color: "from-indigo-500 to-violet-500" 
    };
    if (idx === 6) return { 
        title: isEnglish ? "Phase III: Internal Engines, Reverse DCF & Final Moat Audit" : "Faz 3: Şirket İçi Kâr Motoru, Tersine DCF & Hendek Denetimi", 
        desc: isEnglish ? "Deconstruct DuPont & cash conversion cycles, solve market-implied CAP (MICAP), and execute the 60-point moat audit." : "DuPont ve nakit dönüşümünü ayrıştırın, piyasanın ima ettiği CAP'i (MICAP) çözün ve 60 maddelik Morgan Stanley denetimini uygulayın.",
        color: "from-violet-500 to-fuchsia-500" 
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
      <div className="relative rounded-3xl bg-slate-50 dark:bg-slate-900 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-800 group">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[150%] bg-gradient-to-b from-indigo-500/20 to-purple-600/20 blur-3xl rounded-full transform rotate-12 opacity-50 group-hover:opacity-70 transition-opacity duration-1000"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] bg-gradient-to-tr from-emerald-500/10 to-teal-400/10 blur-3xl rounded-full opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-white/10 border border-indigo-200 dark:border-white/20 text-indigo-700 dark:text-white/90 text-xs font-bold backdrop-blur-md uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-400" />
                    {isEnglish ? "Michael Mauboussin & Dan Callahan Framework" : "Michael Mauboussin & Dan Callahan Metodolojisi"}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {isEnglish ? "Measuring the Moat:" : "Ekonomik Hendeklerin Ölçülmesi:"}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        {isEnglish ? "Magnitude, Runway & Longevity" : "Yayılım, Yatırım Pisti & CAP"}
                    </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                    {isEnglish 
                        ? "In competitive markets, high returns attract capital that erodes margins. Learn the rigorous Morgan Stanley / Credit Suisse framework to calculate true ROIC, model competitive advantage periods (CAP), and reverse-engineer market expectations."
                        : "Serbest piyasada yüksek kârlar sermayeyi mıknatıs gibi çeker ve aşındırır. Morgan Stanley ve Credit Suisse araştırmalarına dayanan Measuring the Moat çerçevesiyle gerçek ROIC'yi hesaplayın, hendek süresini (CAP) modelleyin ve piyasa beklentilerini tersine DCF ile çözün."}
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3">
                    <button 
                        onClick={() => {
                            if (nextUpIndex !== -1) {
                                onSelectModule(modules[nextUpIndex]);
                            } else {
                                onSelectModule(modules[0]);
                            }
                        }}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors font-bold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/20 dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                    >
                        <PlayCircle className="w-5 h-5 text-indigo-600" />
                        {isEnglish ? (nextUpIndex === 0 ? "Start Curriculum" : "Continue Curriculum") : (nextUpIndex === 0 ? "Müfredata Başla" : "Kaldığın Yerden Devam Et")}
                    </button>
                    {onNavigateTab && (
                        <button 
                            onClick={() => onNavigateTab("simulations", "cap-fade")}
                            className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 border border-slate-300 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white transition-colors font-bold text-sm flex items-center gap-2 backdrop-blur-sm"
                        >
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                            {isEnglish ? "CAP & Fade Rate Engine" : "CAP & Fade Rate Simülatörü"}
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Radar/Stats */}
            <div className="shrink-0 w-full md:w-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center min-w-[240px]">
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
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{isEnglish ? "Scan real company financials to calculate true NOPAT and ROIC." : "Gerçek şirket bilançolarını tarayıp NOPAT ve ROIC hesaplayın."}</p>
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

      {/* The Mastery Timeline */}
      <div className="relative mt-8">
        {/* Main Vertical Line (Background) */}
        <div className="absolute left-6 sm:left-10 top-4 bottom-12 w-0.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        
        {/* Animated Progress Line (Foreground) */}
        <div className="absolute left-6 sm:left-10 top-4 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" style={{ height: `${Math.max(0, (completedCount / modules.length) * 100 - 5)}%`, minHeight: completedCount > 0 ? '5%' : '0' }}></div>

        <div className="space-y-6 sm:space-y-8 relative">
          {modules.map((module, idx) => {
            const isCompleted = userState.completedModules.includes(module.id);
            const isNext = idx === nextUpIndex;
            const isLocked = !isCompleted && !isNext;
            const quizScore = userState.quizScores[module.id];
            
            const phaseInfo = getPhaseInfo(idx);

            return (
              <React.Fragment key={module.id}>
                {/* Phase Header Injection */}
                {phaseInfo && (
                    <div className="relative pl-16 sm:pl-24 py-4">
                        <div className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-gradient-to-br ${phaseInfo.color} shadow-lg ring-4 ring-white dark:ring-slate-950 z-10 flex items-center justify-center`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <h2 className={`text-sm sm:text-base font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${phaseInfo.color}`}>
                            {phaseInfo.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            {phaseInfo.desc}
                        </p>
                    </div>
                )}

                {/* Module Node & Card */}
                <div className="relative pl-16 sm:pl-24">
                  {/* Timeline Node Marker */}
                  <div className={`absolute left-[1.125rem] sm:left-[2.125rem] top-8 w-5 h-5 rounded-full border-2 z-10 transition-all duration-500 flex items-center justify-center bg-white dark:bg-slate-950
                    ${isCompleted 
                        ? 'border-indigo-500 scale-100' 
                        : isNext 
                            ? 'border-indigo-500 scale-125 ring-4 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulse' 
                            : 'border-slate-300 dark:border-slate-700 scale-75'
                    }`}
                  >
                    {isCompleted && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
                    {isNext && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                  </div>

                  {/* Module Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                    whileHover={!isLocked ? { scale: 1.01, x: 4 } : {}}
                    onClick={() => !isLocked && onSelectModule(module)}
                    className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 group ${
                        isLocked 
                            ? "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-70 cursor-not-allowed" 
                            : isCompleted
                                ? "bg-white dark:bg-slate-900 border-indigo-200/50 dark:border-indigo-800/40 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
                                : "bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10 cursor-pointer overflow-hidden"
                    }`}
                  >
                    {/* Glowing hover effect for unlocked cards */}
                    {!isLocked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between items-start sm:items-center">
                        <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                                    isNext 
                                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                                }`}>
                                    {module.subtitle}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                                    <Clock className="w-3 h-3" /> {module.estimatedMinutes} {isEnglish ? "Min" : "Dk"}
                                </span>
                                {quizScore !== undefined && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                                        {isEnglish ? `Score: ${quizScore}%` : `Skor: %${quizScore}`}
                                    </span>
                                )}
                            </div>
                            
                            <h3 className={`text-base sm:text-lg font-black transition-colors ${
                                isLocked ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                            }`}>
                                {module.title}
                            </h3>
                            
                            <p className={`text-xs sm:text-sm font-medium leading-relaxed line-clamp-2 ${
                                isLocked ? "text-slate-400 dark:text-slate-600" : "text-slate-600 dark:text-slate-300"
                            }`}>
                                {module.description}
                            </p>

                            {/* Takeaway Teaser */}
                            {!isLocked && (
                                <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400/90 font-semibold pt-1">
                                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                    <span className="line-clamp-1">{module.zeroKnowledgeSummary}</span>
                                </div>
                            )}
                        </div>

                        {/* CTA / Status */}
                        <div className="shrink-0 pt-2 sm:pt-0 w-full sm:w-auto">
                            {isLocked ? (
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                                    <Lock className="w-4 h-4" />
                                    {isEnglish ? "Locked" : "Kilitli"}
                                </div>
                            ) : (
                                <button
                                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 ${
                                        isNext
                                            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105"
                                            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                    }`}
                                >
                                    {isCompleted 
                                        ? (isEnglish ? "Review Masterclass" : "Dersi Tekrarla")
                                        : (isEnglish ? "Start Masterclass" : "Dersi Başlat")}
                                    <ArrowRight className={`w-4 h-4 ${isNext ? "animate-pulse" : "transition-transform group-hover:translate-x-1"}`} />
                                </button>
                            )}
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
