import React, { useState } from "react";
const RoicWaccSim = React.lazy(() => import("./simulators/RoicWaccSim").then(m => ({ default: m.RoicWaccSim })));
const DickinsonLifecycleSim = React.lazy(() => import("./simulators/DickinsonLifecycleSim").then(m => ({ default: m.DickinsonLifecycleSim })));
const ValueStickSim = React.lazy(() => import("./simulators/ValueStickSim").then(m => ({ default: m.ValueStickSim })));
const ProfitPoolSim = React.lazy(() => import("./simulators/ProfitPoolSim").then(m => ({ default: m.ProfitPoolSim })));
const FootnoteDetectiveLab = React.lazy(() => import("./simulators/FootnoteDetectiveLab").then(m => ({ default: m.FootnoteDetectiveLab })));
const PrisonersDilemmaSim = React.lazy(() => import("./simulators/PrisonersDilemmaSim").then(m => ({ default: m.PrisonersDilemmaSim })));
const ColonelBlottoSim = React.lazy(() => import("./simulators/ColonelBlottoSim").then(m => ({ default: m.ColonelBlottoSim })));
const DuPontSim = React.lazy(() => import("./simulators/DuPontSim").then(m => ({ default: m.DuPontSim })));
const CashConversionSim = React.lazy(() => import("./simulators/CashConversionSim").then(m => ({ default: m.CashConversionSim })));
const ReverseDCFSim = React.lazy(() => import("./simulators/ReverseDCFSim").then(m => ({ default: m.ReverseDCFSim })));
const MoatChecklistSim = React.lazy(() => import("./simulators/MoatChecklistSim").then(m => ({ default: m.MoatChecklistSim })));
const CapFadeRateSim = React.lazy(() => import("./simulators/CapFadeRateSim").then(m => ({ default: m.CapFadeRateSim })));
const ReinvestmentRunwaySim = React.lazy(() => import("./simulators/ReinvestmentRunwaySim").then(m => ({ default: m.ReinvestmentRunwaySim })));
const BrandAcidTestSim = React.lazy(() => import("./simulators/BrandAcidTestSim").then(m => ({ default: m.BrandAcidTestSim })));

import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";











import {
  Shield,
  Activity,
  DollarSign,
  FlaskConical,
  Search,
  Swords,
  TrendingUp,
  Clock,
  Target,
  CheckSquare,
  Sparkles,
} from "lucide-react";

export type SimTab =
  | "roic-wacc"
  | "cap-fade"
  | "reinvestment-runway"
  | "dickinson"
  | "value-stick"
  | "brand-acid-test"
  | "profit-pool"
  | "footnote-detective"
  | "game-theory"
  | "blotto"
  | "dupont"
  | "ccc"
  | "reverse-dcf"
  | "checklist";

interface SimulationsViewProps {
  activeSim?: SimTab;
  onSelectSim?: (sim: SimTab) => void;
  onOpenAICoachWithPrompt?: (prompt: string) => void;
}

export const SimulationsView: React.FC<SimulationsViewProps> = ({
  activeSim: controlledActiveSim,
  onSelectSim,
  onOpenAICoachWithPrompt,
}) => {
  const { isEnglish, t } = useLanguage();
  const [internalSim, setInternalSim] = useState<SimTab>("roic-wacc");
  const activeSim = controlledActiveSim || internalSim;

  const handleSelectSim = (sim: SimTab) => {
    setInternalSim(sim);
    if (onSelectSim) {
      onSelectSim(sim);
    }
  };

  const SIMS_TR = [
    { id: "roic-wacc", label: "1. ROIC vs WACC (Şato)", icon: Shield, badge: "Sermaye", step: "Adım 1" },
    { id: "cap-fade", label: "CAP & Kâr Aşınması (Fade)", icon: Clock, badge: "Sürdürülebilirlik", step: "Adım 1+" },
    { id: "reinvestment-runway", label: "Yeniden Yatırım Pisti (RONIC)", icon: TrendingUp, badge: "Bileşik Büyüme", step: "Adım 1+" },
    { id: "dickinson", label: "2. Yaşam Döngüsü Röntgeni", icon: Activity, badge: "Nakit Tablosu", step: "Adım 2" },
    { id: "value-stick", label: "3. Değer Çubuğu (WTP)", icon: DollarSign, badge: "Mikroekonomi", step: "Adım 3" },
    { id: "brand-acid-test", label: "Marka Hendek Asit Testi", icon: Sparkles, badge: "Fiyatlama Gücü", step: "Adım 3+" },
    { id: "profit-pool", label: "4. Havacılık Kâr Havuzu", icon: FlaskConical, badge: "Sektör Haritası", step: "Adım 4" },
    { id: "footnote-detective", label: "5. 10-K Dipnot Dedektifi", icon: Search, badge: "Bilanço Düzeltmesi", step: "Adım 5" },
    { id: "game-theory", label: "6. Mahkumlar İkilemi", icon: Swords, badge: "Fiyat Savaşları", step: "Adım 6" },
    { id: "blotto", label: "Albay Blotto Dağıtımı", icon: Shield, badge: "Niş Strateji", step: "Adım 6+" },
    { id: "dupont", label: "7. DuPont ROIC Röntgeni", icon: TrendingUp, badge: "Marj vs Hız", step: "Adım 7" },
    { id: "ccc", label: "Nakit Dönüşüm (CCC)", icon: Clock, badge: "Amazon vs B&N", step: "Adım 7+" },
    { id: "reverse-dcf", label: "8. Tersine DCF & CAP", icon: Target, badge: "İleri Değerleme", step: "Adım 8" },
    { id: "checklist", label: "60 Maddelik Hendek Listesi", icon: CheckSquare, badge: "Morgan Stanley", step: "Final" },
  ];

  const SIMS_EN = [
    { id: "roic-wacc", label: "1. ROIC vs WACC (Castle)", icon: Shield, badge: "Capital", step: "Step 1" },
    { id: "cap-fade", label: "CAP & Fade Rate Engine", icon: Clock, badge: "Longevity", step: "Step 1+" },
    { id: "reinvestment-runway", label: "Reinvestment Runway (RONIC)", icon: TrendingUp, badge: "Compounding", step: "Step 1+" },
    { id: "dickinson", label: "2. Lifecycle Diagnostic", icon: Activity, badge: "Cash Flow", step: "Step 2" },
    { id: "value-stick", label: "3. Value Stick (WTP)", icon: DollarSign, badge: "Microecon", step: "Step 3" },
    { id: "brand-acid-test", label: "Brand Moat Acid Test", icon: Sparkles, badge: "Pricing Power", step: "Step 3+" },
    { id: "profit-pool", label: "4. Aviation Profit Pool", icon: FlaskConical, badge: "Industry Map", step: "Step 4" },
    { id: "footnote-detective", label: "5. 10-K Footnote Detective", icon: Search, badge: "Balance Sheet", step: "Step 5" },
    { id: "game-theory", label: "6. Prisoner's Dilemma", icon: Swords, badge: "Price Wars", step: "Step 6" },
    { id: "blotto", label: "Colonel Blotto Allocation", icon: Shield, badge: "Niche Focus", step: "Step 6+" },
    { id: "dupont", label: "7. DuPont ROIC X-Ray", icon: TrendingUp, badge: "Margin vs Turn", step: "Step 7" },
    { id: "ccc", label: "Cash Conversion (CCC)", icon: Clock, badge: "Amazon vs B&N", step: "Step 7+" },
    { id: "reverse-dcf", label: "8. Reverse DCF & CAP", icon: Target, badge: "Valuation", step: "Step 8" },
    { id: "checklist", label: "60-Item Moat Checklist", icon: CheckSquare, badge: "Morgan Stanley", step: "Final" },
  ];

  const SIMS = isEnglish ? SIMS_EN : SIMS_TR;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16 px-1 sm:px-0"
      id="simulations-view"
    >
      {/* Header */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {isEnglish ? "Step-by-Step Interactive Labs" : "Adım Adım İnteraktif Laboratuvarlar"}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isEnglish ? "Directly Integrated with Curriculum" : "Müfredat Adımlarına Göre Entegre"}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {isEnglish ? "Strategic Simulators & Financial Laboratory" : "Stratejik Simülatörler & Bilanço Deney Alanı"}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isEnglish
            ? "From Step 1 ROIC & Moat Castle calculations to Step 8 Reverse DCF (Implied CAP duration) and the 60-Point Morgan Stanley Moat Audit: test real scenarios with interactive parameters."
            : "1. Adımdaki ROIC & Şato Hendeği hesaplamasından 8. Adımdaki Tersine DCF (Zımni CAP süresi) ve 60 Maddelik Morgan Stanley Hendek Denetimine kadar tüm modelleri dinamik parametrelerle deneyimleyin."}
        </p>
      </div>

      {/* Simulator Selector Tabs (Horizontally scrollable on mobile, flex-wrap on tablet/desktop) */}
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 justify-start sm:justify-center border-b border-slate-200/80 dark:border-slate-800/80 py-2.5 px-1 sm:px-0">
        {SIMS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSim === s.id;
          return (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectSim(s.id as SimTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 ring-1 ring-indigo-500/50 font-bold"
                  : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/90 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{s.label}</span>
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-indigo-700/80 text-indigo-100"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {s.badge}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Simulator Component with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSim}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full"
        >
        <React.Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500 font-medium">Yükleniyor...</div>}>
          {activeSim === "roic-wacc" && <RoicWaccSim isEnglish={isEnglish} />}
          {activeSim === "cap-fade" && <CapFadeRateSim />}
          {activeSim === "reinvestment-runway" && <ReinvestmentRunwaySim />}
          {activeSim === "dickinson" && <DickinsonLifecycleSim isEnglish={isEnglish} />}
          {activeSim === "value-stick" && <ValueStickSim isEnglish={isEnglish} />}
          {activeSim === "brand-acid-test" && <BrandAcidTestSim />}
          {activeSim === "profit-pool" && <ProfitPoolSim isEnglish={isEnglish} />}
          {activeSim === "footnote-detective" && <FootnoteDetectiveLab isEnglish={isEnglish} />}
          {activeSim === "game-theory" && <PrisonersDilemmaSim isEnglish={isEnglish} />}
          {activeSim === "blotto" && <ColonelBlottoSim isEnglish={isEnglish} />}
          {activeSim === "dupont" && <DuPontSim isEnglish={isEnglish} />}
          {activeSim === "ccc" && <CashConversionSim isEnglish={isEnglish} />}
          {activeSim === "reverse-dcf" && (
            <ReverseDCFSim
              isEnglish={isEnglish}
              onAskAICoach={(prompt) => {
                if (onOpenAICoachWithPrompt) onOpenAICoachWithPrompt(prompt);
              }}
            />
          )}
          {activeSim === "checklist" && <MoatChecklistSim isEnglish={isEnglish} />}
        </React.Suspense>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
