import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
  DollarSign,
  PieChart,
  BarChart3,
  Scale,
  Award,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/* =========================================================================
   1. VICTORIA DICKINSON NAKİT AKIŞI YAŞAM DÖNGÜSÜ İNTERAKTİF DİYAGRAMI
   ========================================================================= */

interface DickinsonStageData {
  id: string;
  name: string;
  nameTr: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  bgGradient: string;
  cfo: "+" | "-";
  cfi: "+" | "-";
  cff: "+" | "-";
  avgRoic: string;
  roicNum: number;
  descriptionTr: string;
  descriptionEn: string;
  diagnosticInsightTr: string;
  diagnosticInsightEn: string;
  idealForMoat: boolean;
  archetypeCompany: string;
  dangerAlertTr?: string;
  dangerAlertEn?: string;
}

const DICKINSON_STAGES: DickinsonStageData[] = [
  {
    id: "intro",
    name: "Introduction",
    nameTr: "1. Giriş Evresi",
    badgeColor: "bg-amber-500 text-white",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-400 dark:border-amber-600",
    bgGradient: "from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20",
    cfo: "-",
    cfi: "-",
    cff: "+",
    avgRoic: "-2.8%",
    roicNum: -2.8,
    descriptionTr: "Şirket henüz operasyonundan nakit üretemez. Sürekli yatırım harcaması yapar (CFI -) ve dışarıdan borç/yatırımcı parası bulur (CFF +).",
    descriptionEn: "The company cannot yet generate cash from operations (CFO -). It heavily invests in capital (CFI -) and relies on external financing or equity (CFF +).",
    diagnosticInsightTr: "Girişim sermayesi (VC) desteğiyle yaşar. Kâr marjı negatif veya çok düşüktür; pazar payı kapmaya odaklanır.",
    diagnosticInsightEn: "Funded by venture capital. Profit margins are negative or slim; primary focus is market traction.",
    idealForMoat: false,
    archetypeCompany: "Rivian / Early-Stage Biotech / Early OpenAI",
  },
  {
    id: "growth",
    name: "Growth",
    nameTr: "2. Büyüme Evresi",
    badgeColor: "bg-indigo-600 text-white",
    textColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-400 dark:border-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-indigo-900/20",
    cfo: "+",
    cfi: "-",
    cff: "+",
    avgRoic: "+10.6%",
    roicNum: 10.6,
    descriptionTr: "Artık kendi işinden nakit üretir (CFO +), ancak büyüme o kadar agresiftir ki hem kendi nakdini hem dış borçları yatırıma (CFI -) gömer.",
    descriptionEn: "Operating cash flow is now strongly positive (CFO +), but rapid expansion consumes all internal cash plus external debt/equity into CAPEX (CFI -).",
    diagnosticInsightTr: "Ciro roket gibi büyür. Müşteri sadakati oluşmaya başlar; birim ekonomisi pozitife döner.",
    diagnosticInsightEn: "Rapid revenue growth. Customer loyalty takes root; unit economics become positive.",
    idealForMoat: false,
    archetypeCompany: "Tesla (2018-2021) / Uber (2022) / Spotify",
  },
  {
    id: "maturity",
    name: "Maturity",
    nameTr: "3. Olgunluk Evresi",
    badgeColor: "bg-emerald-600 text-white shadow-md shadow-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500 dark:border-emerald-500",
    bgGradient: "from-emerald-50 via-teal-50 to-emerald-100/50 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-emerald-900/20",
    cfo: "+",
    cfi: "-",
    cff: "-",
    avgRoic: "+11.2%",
    roicNum: 11.2,
    descriptionTr: "Nakit Basma Makinesi! Operasyondan devasa nakit girer (CFO +), yatırımlarını kendi karşılar ve üstüne borç öder ya da temettü dağıtır (CFF -).",
    descriptionEn: "Cash Machine! Generates abundant operating cash flow (CFO +), funds all maintenance CAPEX internally, and repays debt or distributes dividends (CFF -).",
    diagnosticInsightTr: "🏰 İDEAL HENDEK KALESİ: Şirket piyasa lideridir. Fiyatlama gücü maksimumdadır ve hissedarlara devasa serbest nakit akışı akıtır.",
    diagnosticInsightEn: "🏰 IDEAL MOAT CASTLE: Market leader with pricing power, high ROIC stability, and substantial Free Cash Flow (FCF) returned to shareholders.",
    idealForMoat: true,
    archetypeCompany: "Apple / Microsoft / Coca-Cola / TSMC",
  },
  {
    id: "shakeout",
    name: "Shake-out",
    nameTr: "4. Sarsıntı Evresi",
    badgeColor: "bg-orange-500 text-white",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-400 dark:border-orange-600",
    bgGradient: "from-orange-50 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/20",
    cfo: "-",
    cfi: "-",
    cff: "-",
    avgRoic: "+3.8%",
    roicNum: 3.8,
    descriptionTr: "Piyasa doyuma ulaşır, fiyat savaşları başlar. Operasyon nakit yakmaya döner (CFO -), taahhütler ve borç ödemeleri şirketi sıkıştırır (CFF -).",
    descriptionEn: "Market saturation and intense price wars. Operations turn cash-negative (CFO -) while debt covenants create liquidity pressure (CFF -).",
    diagnosticInsightTr: "Zayıf ellerin elendiği, hendeksiz şirketlerin battığı veya konsolide olduğu kriz evresi.",
    diagnosticInsightEn: "Shakeout period where moat-less firms are wiped out or acquired.",
    idealForMoat: false,
    archetypeCompany: "Traditional Auto in Transition / Legacy Print Media",
    dangerAlertTr: "⚠️ Kâr marjlarında sert daralma ve sermaye tahsis hataları.",
    dangerAlertEn: "⚠️ Sharp margin compression and capital allocation distress.",
  },
  {
    id: "decline",
    name: "Decline",
    nameTr: "5. Düşüş Evresi",
    badgeColor: "bg-rose-600 text-white",
    textColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-400 dark:border-rose-600",
    bgGradient: "from-rose-50 to-rose-100/50 dark:from-rose-950/40 dark:to-rose-900/20",
    cfo: "-",
    cfi: "+",
    cff: "+",
    avgRoic: "-12.0%",
    roicNum: -12.0,
    descriptionTr: "İş modeli çökmüştür. Faaliyetler nakit yakar (CFO -). Hayatta kalmak için fabrikalarını satar (CFI +) ve acil borç/kredi arar (CFF +).",
    descriptionEn: "Broken business model. Operations burn cash (CFO -). The firm sells factories/assets to survive (CFI +) and urgently borrows capital (CFF +).",
    diagnosticInsightTr: "💀 DEĞER YIKIM ALANI: ROIC < WACC. Sermaye maliyetinin altında eriyen şirketler.",
    diagnosticInsightEn: "💀 VALUE DESTRUCTION ZONE: ROIC < WACC. Capital is actively incinerated.",
    idealForMoat: false,
    archetypeCompany: "Kodak (2010) / Blockbuster (2009) / Sears",
    dangerAlertTr: "🚨 Acil iflas veya yeniden yapılanma riski.",
    dangerAlertEn: "🚨 Imminent bankruptcy or emergency debt restructuring.",
  },
];

export const DickinsonLifecycleVisual: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [selectedStageId, setSelectedStageId] = useState<string>("maturity");
  const currentStage = DICKINSON_STAGES.find((s) => s.id === selectedStageId) || DICKINSON_STAGES[2];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
              {t("ModuleVisualDiagrams.victoria_dickinson_c_545")}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t("ModuleVisualDiagrams.diagnose_corporate_l_546")}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 self-start sm:self-auto">
          {t("ModuleVisualDiagrams.interactive_diagnost_547")}
        </span>
      </div>

      {/* 5 Stages Horizontal Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DICKINSON_STAGES.map((stg) => {
          const isSelected = stg.id === currentStage.id;
          return (
            <button
              key={stg.id}
              onClick={() => setSelectedStageId(stg.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? "bg-white dark:bg-slate-800 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${stg.badgeColor}`}>
                  {isEnglish ? stg.name : stg.nameTr.split(". ")[1]}
                </span>
                {stg.idealForMoat && <span className="text-xs">🏰</span>}
              </div>

              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">{t("ModuleVisualDiagrams.avg_roic_548")}</span>
                <span className={stg.roicNum > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {stg.avgRoic}
                </span>
              </div>

              {/* Cash flow pills */}
              <div className="flex items-center gap-1 text-[9px] font-mono pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className={`px-1 rounded font-bold ${stg.cfo === "+" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"}`}>
                  CFO:{stg.cfo}
                </span>
                <span className={`px-1 rounded font-bold ${stg.cfi === "+" ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"}`}>
                  CFI:{stg.cfi}
                </span>
                <span className={`px-1 rounded font-bold ${stg.cff === "+" ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                  CFF:{stg.cff}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
        >
          {/* Stage Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-xl text-xs font-black ${currentStage.badgeColor}`}>
                {isEnglish ? currentStage.name : `${currentStage.nameTr} (${currentStage.name})`}
              </span>
              {currentStage.idealForMoat && (
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-500/30 flex items-center gap-1">
                  👑 {t("ModuleVisualDiagrams.shareholder_value_pe_549")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500 dark:text-slate-400">{t("ModuleVisualDiagrams.average_roic_550")}</span>
              <span
                className={`px-2.5 py-0.5 rounded-lg font-bold text-xs ${
                  currentStage.roicNum > 0
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
                }`}
              >
                {currentStage.avgRoic}
              </span>
            </div>
          </div>

          {/* Cash Flow Signs Display Radar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* CFO */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400">
                  {t("ModuleVisualDiagrams.cfo_operating_cash_f_551")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfo === "+"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                      : "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30"
                  }`}
                >
                  {currentStage.cfo === "+" ? (t("ModuleVisualDiagrams.positive_552")) : (t("ModuleVisualDiagrams.negative_553"))}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cfo === "+"
                  ? (t("ModuleVisualDiagrams.customer_cash_exceed_554"))
                  : (t("ModuleVisualDiagrams.cash_receipts_fail_t_555"))}
              </p>
            </div>

            {/* CFI */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400">
                  {t("ModuleVisualDiagrams.cfi_investing_cash_f_556")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfi === "-"
                      ? "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30"
                      : "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"
                  }`}
                >
                  {currentStage.cfi === "-" ? (t("ModuleVisualDiagrams.negative_capex_557")) : (t("ModuleVisualDiagrams.positive_asset_sale_558"))}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cfi === "-"
                  ? (t("ModuleVisualDiagrams.company_invests_in_t_559"))
                  : (t("ModuleVisualDiagrams.company_is_selling_560"))}
              </p>
            </div>

            {/* CFF */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400">
                  {t("ModuleVisualDiagrams.cff_financing_cash_f_561")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cff === "+"
                      ? "bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30"
                      : "bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                  }`}
                >
                  {currentStage.cff === "+" ? (t("ModuleVisualDiagrams.positive_debt_equity_562")) : (t("ModuleVisualDiagrams.negative_repay_divid_563"))}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cff === "+"
                  ? (t("ModuleVisualDiagrams.company_borrows_from_564"))
                  : (t("ModuleVisualDiagrams.company_repays_debt_565"))}
              </p>
            </div>
          </div>

          {/* Narrative & Diagnostic Insight */}
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {isEnglish ? currentStage.descriptionEn : currentStage.descriptionTr}
            </div>
            <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold flex items-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{isEnglish ? currentStage.diagnosticInsightEn : currentStage.diagnosticInsightTr}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 font-mono">
              <span>{t("ModuleVisualDiagrams.archetype_case_comp_566")}</span>
              <span className="text-indigo-600 dark:text-indigo-300 font-bold">{currentStage.archetypeCompany}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
   2. DEĞER ÇUBUĞU (VALUE STICK) GÖRSEL DİYAGRAMI
   ========================================================================= */

export const ValueStickVisual: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [strategyMode, setStrategyMode] = useState<"standard" | "diff" | "cost">("standard");

  let wtp = 100;
  let price = 65;
  let cost = 30;
  let wts = 15;

  if (strategyMode === "diff") {
    wtp = 135;
    price = 90;
    cost = 35;
    wts = 15;
  } else if (strategyMode === "cost") {
    wtp = 95;
    price = 50;
    cost = 20;
    wts = 10;
  }

  const consumerSurplus = wtp - price;
  const firmProfit = price - cost;
  const supplierSurplus = cost - wts;
  const totalValue = wtp - wts;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider border border-indigo-200 dark:border-indigo-500/30">
              📏 {t("ModuleVisualDiagrams.visual_value_stick_567")}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t("ModuleVisualDiagrams.felix_oberholzer_gee_568")}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("ModuleVisualDiagrams.economic_surplus_sha_569")}
          </h3>
        </div>

        {/* Strategy Mode Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setStrategyMode("standard")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "standard" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {t("ModuleVisualDiagrams.standard_570")}
          </button>
          <button
            onClick={() => setStrategyMode("diff")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "diff" ? "bg-amber-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {t("ModuleVisualDiagrams.differentiation_appl_571")}
          </button>
          <button
            onClick={() => setStrategyMode("cost")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "cost" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {t("ModuleVisualDiagrams.cost_leadership_cost_572")}
          </button>
        </div>
      </div>

      {/* Visual Stick Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Graphical Vertical Stick */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-full max-w-[240px] space-y-2">
            {/* WTP line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-600 dark:text-amber-400 border-b border-dashed border-amber-400 dark:border-amber-500/60 pb-1">
              <span>WTP ({t("ModuleVisualDiagrams.willingness_to_pay_573")})</span>
              <span>{wtp} $</span>
            </div>

            {/* Block 1: Consumer Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/40 text-amber-900 dark:text-amber-200 text-center space-y-0.5"
            >
              <div className="text-xs font-bold">😊 {t("ModuleVisualDiagrams.customer_surplus_574")}</div>
              <div className="text-[11px] font-mono opacity-90">{t("ModuleVisualDiagrams.wtp_price_575")} = {consumerSurplus} $</div>
            </motion.div>

            {/* Price line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 border-b border-dashed border-indigo-400 dark:border-indigo-500/60 pb-1">
              <span>{t("ModuleVisualDiagrams.price_tag_576")}</span>
              <span>{price} $</span>
            </div>

            {/* Block 2: Firm Value Creation */}
            <motion.div
              layout
              className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/30 border-2 border-indigo-300 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-200 text-center space-y-0.5 shadow-xs"
            >
              <div className="text-xs font-extrabold flex items-center justify-center gap-1">
                <span>🏰 {t("ModuleVisualDiagrams.firm_profit_moat_are_577")}</span>
              </div>
              <div className="text-xs font-mono text-indigo-700 dark:text-indigo-300 font-bold">{t("ModuleVisualDiagrams.price_cost_578")} = {firmProfit} $</div>
            </motion.div>

            {/* Cost line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-600 dark:text-rose-400 border-b border-dashed border-rose-400 dark:border-rose-500/60 pb-1">
              <span>{t("ModuleVisualDiagrams.cost_579")}</span>
              <span>{cost} $</span>
            </div>

            {/* Block 3: Supplier Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-center space-y-0.5"
            >
              <div className="text-xs font-bold">🤝 {t("ModuleVisualDiagrams.supplier_employee_su_580")}</div>
              <div className="text-[11px] font-mono opacity-90">{t("ModuleVisualDiagrams.cost_wts_581")} = {supplierSurplus} $</div>
            </motion.div>

            {/* WTS line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border-t border-dashed border-emerald-400 dark:border-emerald-500/60 pt-1">
              <span>WTS ({t("ModuleVisualDiagrams.willingness_to_sell_582")})</span>
              <span>{wts} $</span>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Strategic Analysis */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs shadow-sm">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span>{t("ModuleVisualDiagrams.total_economic_value_583")}</span>
              <span className="font-bold text-amber-600 dark:text-amber-300">{totalValue} $</span>
            </div>
            <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300">
              <span>{t("ModuleVisualDiagrams.firm_profit_share_584")}</span>
              <span className="font-bold">{Math.round((firmProfit / totalValue) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between text-amber-700 dark:text-amber-300">
              <span>{t("ModuleVisualDiagrams.consumer_surplus_sha_585")}</span>
              <span className="font-bold">{Math.round((consumerSurplus / totalValue) * 100)}%</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {strategyMode === "standard" && (
              <p>
                ⚖️ <strong>{t("ModuleVisualDiagrams.balanced_market_586")}</strong> {t("ModuleVisualDiagrams.the_company_prices_a_587")}
              </p>
            )}
            {strategyMode === "diff" && (
              <p>
                💎 <strong>{t("ModuleVisualDiagrams.differentiation_stra_588")}</strong> {t("ModuleVisualDiagrams.the_ceiling_wtp_is_e_589")}
              </p>
            )}
            {strategyMode === "cost" && (
              <p>
                ⚡ <strong>{t("ModuleVisualDiagrams.cost_leadership_cost_590")}</strong> {t("ModuleVisualDiagrams.supplier_efficiency_591")}
              </p>
            )}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1 border-t border-slate-200 dark:border-slate-800">
              {t("ModuleVisualDiagrams.illustrative_teachin_592")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. PORTER'IN 5 GÜCÜ & GİRİŞ ENGELLERİ GÖRSEL DİYAGRAMI
   ========================================================================= */

export const PorterForcesVisual: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [activeForce, setActiveForce] = useState<string>("entrants");

  const forces = [
    {
      id: "entrants",
      name: t("ModuleVisualDiagrams.1_threat_of_new_entr_593"),
      sub: t("ModuleVisualDiagrams.key_moat_factor_594"),
      icon: "🚪",
      color: "bg-indigo-600 text-white",
      desc: t("ModuleVisualDiagrams.if_entry_is_friction_595"),
      moatDefense: t("ModuleVisualDiagrams.7_entry_barriers_sca_596"),
    },
    {
      id: "suppliers",
      name: t("ModuleVisualDiagrams.2_bargaining_power_o_597"),
      sub: t("ModuleVisualDiagrams.margin_squeeze_598"),
      icon: "🏭",
      color: "bg-amber-600 text-white",
      desc: t("ModuleVisualDiagrams.if_key_suppliers_hol_599"),
      moatDefense: t("ModuleVisualDiagrams.multi_sourcing_backw_600"),
    },
    {
      id: "buyers",
      name: t("ModuleVisualDiagrams.3_bargaining_power_o_601"),
      sub: t("ModuleVisualDiagrams.pricing_pressure_602"),
      icon: "🛒",
      color: "bg-emerald-600 text-white",
      desc: t("ModuleVisualDiagrams.if_customers_are_con_603"),
      moatDefense: t("ModuleVisualDiagrams.high_switching_costs_604"),
    },
    {
      id: "substitutes",
      name: t("ModuleVisualDiagrams.4_threat_of_substitu_605"),
      sub: t("ModuleVisualDiagrams.invisible_risk_606"),
      icon: "⚡",
      color: "bg-purple-600 text-white",
      desc: t("ModuleVisualDiagrams.products_outside_the_607"),
      moatDefense: t("ModuleVisualDiagrams.ecosystem_synergy_pr_608"),
    },
    {
      id: "rivalry",
      name: t("ModuleVisualDiagrams.5_industry_rivalry_p_609"),
      sub: t("ModuleVisualDiagrams.price_destruction_610"),
      icon: "⚔️",
      color: "bg-rose-600 text-white",
      desc: t("ModuleVisualDiagrams.fierce_competition_o_611"),
      moatDefense: t("ModuleVisualDiagrams.market_share_stabili_612"),
    },
  ];

  const current = forces.find((f) => f.id === activeForce) || forces[0];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 uppercase tracking-wider border border-purple-200 dark:border-purple-500/30">
              🛡️ {t("ModuleVisualDiagrams.michael_porter_frame_613")}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t("ModuleVisualDiagrams.5_forces_determining_614")}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {t("ModuleVisualDiagrams.mapping_competitors_615")}
          </h3>
        </div>
      </div>

      {/* Grid of 5 forces buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {forces.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveForce(f.id)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[88px] ${
              f.id === activeForce
                ? "bg-white dark:bg-slate-800 ring-2 ring-indigo-500/30 border-indigo-400 shadow-sm"
                : "bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/40"
            }`}
          >
            <div className="text-lg">{f.icon}</div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{f.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">{f.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Force Deep Dive Card */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{current.icon}</span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{current.name}</h4>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{current.desc}</p>
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong>{t("ModuleVisualDiagrams.moat_defense_616")}</strong> {current.moatDefense}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
