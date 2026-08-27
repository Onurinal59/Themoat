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
  const { isEnglish } = useLanguage();
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
              {isEnglish ? "Victoria Dickinson Cash Flow Lifecycle Diagnostic" : "Victoria Dickinson Nakit Akışı Yaşam Döngüsü Röntgeni"}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEnglish ? "Diagnose corporate lifecycles from CFO, CFI, and CFF cash flow signatures." : "Faaliyet (CFO), Yatırım (CFI) ve Finansman (CFF) işaretlerinden şirketin evresini teşhis edin."}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 self-start sm:self-auto">
          {isEnglish ? "Interactive Diagnostic" : "İnteraktif Röntgen"}
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
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">{isEnglish ? "Avg ROIC:" : "Ort. ROIC:"}</span>
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
                  👑 {isEnglish ? "Shareholder Value Peak" : "Hissedar Değer Zirvesi"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500 dark:text-slate-400">{isEnglish ? "Average ROIC:" : "Ortalama ROIC:"}</span>
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
                  {isEnglish ? "CFO (Operating Cash Flow)" : "CFO (Faaliyet Nakit Akışı)"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfo === "+"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                      : "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30"
                  }`}
                >
                  {currentStage.cfo === "+" ? (isEnglish ? "POSITIVE (+)" : "POZİTİF (+)") : (isEnglish ? "NEGATIVE (-)" : "NEGATİF (-)")}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cfo === "+"
                  ? (isEnglish ? "Customer cash exceeds operating expenses; the business generates organic cash." : "Müşterilerden gelen para faaliyet giderlerini aşıyor; iş nakit üretiyor.")
                  : (isEnglish ? "Cash receipts fail to cover salaries and suppliers; cash is being burned." : "Müşterilerden gelen para maaş ve tedarikçileri karşılamaya yetmiyor; nakit yakılıyor.")}
              </p>
            </div>

            {/* CFI */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400">
                  {isEnglish ? "CFI (Investing Cash Flow)" : "CFI (Yatırım Nakit Akışı)"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfi === "-"
                      ? "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30"
                      : "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"
                  }`}
                >
                  {currentStage.cfi === "-" ? (isEnglish ? "NEGATIVE (-) [CAPEX]" : "NEGATİF (-) [Yatırım]") : (isEnglish ? "POSITIVE (+) [Asset Sale]" : "POZİTİF (+) [Varlık Satışı]")}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cfi === "-"
                  ? (isEnglish ? "Company invests in the future: factories, equipment, R&D, and software." : "Şirket geleceğe yatırım yapıyor; fabrika, makine ve yazılım satın alıyor.")
                  : (isEnglish ? "🚨 Company is selling fixed assets/factories to scrape together liquidity." : "🚨 Şirket duran varlıklarını ve fabrikalarını satarak nakit yaratmaya çalışıyor.")}
              </p>
            </div>

            {/* CFF */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400">
                  {isEnglish ? "CFF (Financing Cash Flow)" : "CFF (Finansman Nakit Akışı)"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cff === "+"
                      ? "bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30"
                      : "bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                  }`}
                >
                  {currentStage.cff === "+" ? (isEnglish ? "POSITIVE (+) [Debt/Equity]" : "POZİTİF (+) [Borç/Sermaye]") : (isEnglish ? "NEGATIVE (-) [Repay/Dividends]" : "NEGATİF (-) [Geri Ödeme/Temettü]")}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {currentStage.cff === "+"
                  ? (isEnglish ? "Company borrows from banks or issues new equity shares to stay afloat." : "Şirket dışarıdan banka kredisi alıyor veya yeni hisse ihraç ediyor.")
                  : (isEnglish ? "Company repays debt or distributes dividends & share buybacks to shareholders." : "Şirket borçlarını kapatıyor veya hissedara temettü / hisse geri alımı yapıyor.")}
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
              <span>{isEnglish ? "🏢 Archetype Case Companies:" : "🏢 Vaka / Arketip Şirketler:"}</span>
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
  const { isEnglish } = useLanguage();
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
              📏 {isEnglish ? "Visual Value Stick" : "Görsel Değer Çubuğu"}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isEnglish ? "Felix Oberholzer-Gee Model" : "Felix Oberholzer-Gee Modeli"}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEnglish ? "Economic Surplus Sharing between WTP, Price, Cost, and WTS" : "WTP, Fiyat, Maliyet ve WTS Arasındaki Rant Bölüşümü"}
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
            {isEnglish ? "Standard" : "Standart"}
          </button>
          <button
            onClick={() => setStrategyMode("diff")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "diff" ? "bg-amber-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {isEnglish ? "Differentiation (Apple)" : "Farklılaşma (Apple)"}
          </button>
          <button
            onClick={() => setStrategyMode("cost")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "cost" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {isEnglish ? "Cost Leadership (Costco)" : "Maliyet Liderliği (Costco)"}
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
              <span>WTP ({isEnglish ? "Willingness to Pay" : "Ödeme İstekliliği"})</span>
              <span>{wtp} $</span>
            </div>

            {/* Block 1: Consumer Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/40 text-amber-900 dark:text-amber-200 text-center space-y-0.5"
            >
              <div className="text-xs font-bold">😊 {isEnglish ? "Customer Surplus" : "Müşteri Rantı"}</div>
              <div className="text-[11px] font-mono opacity-90">{isEnglish ? "WTP - Price" : "WTP - Fiyat"} = {consumerSurplus} $</div>
            </motion.div>

            {/* Price line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 border-b border-dashed border-indigo-400 dark:border-indigo-500/60 pb-1">
              <span>{isEnglish ? "PRICE (Tag)" : "FİYAT (Etiket)"}</span>
              <span>{price} $</span>
            </div>

            {/* Block 2: Firm Value Creation */}
            <motion.div
              layout
              className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/30 border-2 border-indigo-300 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-200 text-center space-y-0.5 shadow-xs"
            >
              <div className="text-xs font-extrabold flex items-center justify-center gap-1">
                <span>🏰 {isEnglish ? "Firm Profit (Moat Arena)" : "Şirket Kârı (Hendek Alanı)"}</span>
              </div>
              <div className="text-xs font-mono text-indigo-700 dark:text-indigo-300 font-bold">{isEnglish ? "Price - Cost" : "Fiyat - Maliyet"} = {firmProfit} $</div>
            </motion.div>

            {/* Cost line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-600 dark:text-rose-400 border-b border-dashed border-rose-400 dark:border-rose-500/60 pb-1">
              <span>{isEnglish ? "COST" : "MALİYET"}</span>
              <span>{cost} $</span>
            </div>

            {/* Block 3: Supplier Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-center space-y-0.5"
            >
              <div className="text-xs font-bold">🤝 {isEnglish ? "Supplier / Employee Surplus" : "Tedarikçi / Çalışan Rantı"}</div>
              <div className="text-[11px] font-mono opacity-90">{isEnglish ? "Cost - WTS" : "Maliyet - WTS"} = {supplierSurplus} $</div>
            </motion.div>

            {/* WTS line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border-t border-dashed border-emerald-400 dark:border-emerald-500/60 pt-1">
              <span>WTS ({isEnglish ? "Willingness to Sell" : "Satmaya İsteklilik"})</span>
              <span>{wts} $</span>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Strategic Analysis */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs shadow-sm">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span>{isEnglish ? "Total Economic Value (WTP - WTS):" : "Toplam Yaratılan Ekonomik Refah (WTP - WTS):"}</span>
              <span className="font-bold text-amber-600 dark:text-amber-300">{totalValue} $</span>
            </div>
            <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-300">
              <span>{isEnglish ? "Firm Profit Share (%):" : "Şirketin Aldığı Kâr Payı (%):"}</span>
              <span className="font-bold">{Math.round((firmProfit / totalValue) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between text-amber-700 dark:text-amber-300">
              <span>{isEnglish ? "Consumer Surplus Share (%):" : "Tüketicinin Yaşadığı Memnuniyet Payı (%):"}</span>
              <span className="font-bold">{Math.round((consumerSurplus / totalValue) * 100)}%</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {strategyMode === "standard" && (
              <p>
                ⚖️ <strong>{isEnglish ? "Balanced Market:" : "Dengeli Piyasa:"}</strong> {isEnglish ? "The company prices above cost while leaving adequate consumer surplus (WTP - Price)." : "Şirket fiyatı maliyetinin üstünde tutarken müşteriye de yeterli bir fayda (WTP - Fiyat) bırakmaktadır."}
              </p>
            )}
            {strategyMode === "diff" && (
              <p>
                💎 <strong>{isEnglish ? "Differentiation Strategy (Apple, Ferrari):" : "Farklılaşma Stratejisi (Apple, Ferrari):"}</strong> {isEnglish ? "The ceiling (WTP) is elevated. Customers are enthusiastic even at elevated price points ($90) because perceived surplus is huge ($45). Firm profit jumps to $55." : "Üst çizgi (WTP) tavan yapmıştır. Müşteri ürüne aşık olduğu için 90 TL gibi yüksek bir fiyatta bile mutlu hisseder (Tüketici rantı 45 TL!). Şirket kârı 55 TL'ye fırlar."}
              </p>
            )}
            {strategyMode === "cost" && (
              <p>
                ⚡ <strong>{isEnglish ? "Cost Leadership (Costco, Amazon Model):" : "Maliyet Liderliği (Costco, Amazon Modeli):"}</strong> {isEnglish ? "Supplier efficiency lowers the WTS floor. Low prices draw volume and generate returns via capital velocity." : "Tedarikçilerin verimliliği artırılarak WTS tabanı düşürülür, etiket fiyatı 50 TL'ye çekilir. Müşteri akın eder ve şirket yüksek devir hızıyla toplam refah üretir."}
              </p>
            )}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1 border-t border-slate-200 dark:border-slate-800">
              {isEnglish
                ? "Illustrative teaching scenario — figures are not current company estimates or investment views."
                : "Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir."}
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
  const { isEnglish } = useLanguage();
  const [activeForce, setActiveForce] = useState<string>("entrants");

  const forces = [
    {
      id: "entrants",
      name: isEnglish ? "1. Threat of New Entrants" : "1. Yeni Girenlerin Tehdidi",
      sub: isEnglish ? "Key Moat Factor!" : "En Belirleyici Güç!",
      icon: "🚪",
      color: "bg-indigo-600 text-white",
      desc: isEnglish
        ? "If entry is friction-free, hundreds of copycats flood in to copy high returns, driving industry ROIC down to cost of capital."
        : "Eğer sektöre girmek çok kolaysa, yüksek kârları gören yüzlerce yeni şirket içeri dalar ve kâr marjlarını sıfıra çeker.",
      moatDefense: isEnglish
        ? "7 Entry Barriers: Scale economies, Network effects, High switching costs, Patents & Regulatory licenses."
        : "7 Giriş Engeli: Ölçek ekonomisi, Ağ etkisi, Yüksek geçiş maliyeti ve Patentler.",
    },
    {
      id: "suppliers",
      name: isEnglish ? "2. Bargaining Power of Suppliers" : "2. Tedarikçilerin Gücü",
      sub: isEnglish ? "Margin Squeeze" : "Bozucu Baskı",
      icon: "🏭",
      color: "bg-amber-600 text-white",
      desc: isEnglish
        ? "If key suppliers hold a monopoly (e.g., TSMC for fabless chips or GE/Rolls-Royce for jet engines), they capture most downstream economic profit."
        : "Tedarikçiniz tekel ise (örneğin uçak motorunda GE/Rolls-Royce), kârınızı fiyat artışlarıyla süpürür.",
      moatDefense: isEnglish
        ? "Multi-sourcing, backward vertical integration, or designing custom in-house architectures."
        : "Çoklu tedarikçi yapısı kurmak veya geriye doğru dikey entegrasyon.",
    },
    {
      id: "buyers",
      name: isEnglish ? "3. Bargaining Power of Buyers" : "3. Alıcıların Gücü",
      sub: isEnglish ? "Pricing Pressure" : "Fiyat Baskısı",
      icon: "🛒",
      color: "bg-emerald-600 text-white",
      desc: isEnglish
        ? "If customers are concentrated and price-sensitive, they demand endless discounts, compressing gross margins."
        : "Müşteriler az sayıda ve fiyata aşırı duyarlıysa, sürekli indirim talep ederek kârınızı kırarlar.",
      moatDefense: isEnglish
        ? "High switching costs (lock-in) and strong emotional brand equity (high WTP)."
        : "Müşteri geçiş maliyeti (Lock-in) ve üstün marka aidiyeti (WTP artışı).",
    },
    {
      id: "substitutes",
      name: isEnglish ? "4. Threat of Substitutes" : "4. İkame Ürünlerin Tehdidi",
      sub: isEnglish ? "Invisible Risk" : "Görünmez Tehlike",
      icon: "⚡",
      color: "bg-purple-600 text-white",
      desc: isEnglish
        ? "Products outside the direct industry that solve the same underlying job-to-be-done (e.g. High-Speed Rail vs. Short-Haul Airlines, Zoom vs. Business Travel)."
        : "Doğrudan rakip olmasa bile müşterinin problemini farklı bir yoldan çözen ürünler (Örn: Havayoluna karşı Hızlı Tren).",
      moatDefense: isEnglish
        ? "Ecosystem synergy, proprietary integration, and continuous innovation."
        : "Ekosistem kurarak müşterinin hayatını kolaylaştırmak.",
    },
    {
      id: "rivalry",
      name: isEnglish ? "5. Industry Rivalry & Price Wars" : "5. Mevcut Rakipler Arası Rekabet",
      sub: isEnglish ? "Price Destruction" : "Fiyat Savaşları",
      icon: "⚔️",
      color: "bg-rose-600 text-white",
      desc: isEnglish
        ? "Fierce competition over market share with excess capacity leads to devastating discount wars."
        : "Aynı sektördeki rakiplerin kapasite fazlası ve fiyat kırma yarışına girmesi.",
      moatDefense: isEnglish
        ? "Market share stability, capacity discipline, and rational pricing behavior (Tit-for-Tat)."
        : "Pazar payı istikrarı, kapasite disiplini ve örtük işbirliği (Tit-for-Tat).",
    },
  ];

  const current = forces.find((f) => f.id === activeForce) || forces[0];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 uppercase tracking-wider border border-purple-200 dark:border-purple-500/30">
              🛡️ {isEnglish ? "Michael Porter Framework" : "Michael Porter Modeli"}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {isEnglish ? "5 Forces Determining Industry Profitability" : "Sektör Kârlılığını Belirleyen 5 Çekim Gücü"}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEnglish ? "Mapping Competitors & Industry Structure" : "Rakipleri ve Tehditleri Haritalandırma"}
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
            <strong>{isEnglish ? "Moat Defense: " : "Hendek Savunması: "}</strong> {current.moatDefense}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
