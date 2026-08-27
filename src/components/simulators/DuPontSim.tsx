import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
  Layers,
  BarChart3,
  HelpCircle,
  Shield,
  ChevronDown,
  Calculator,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

interface CompanyBenchmark {
  name: string;
  strategyTr: string;
  strategyEn: string;
  margin: number;
  turnover: number;
  roic: number;
  descTr: string;
  descEn: string;
}

const BENCHMARKS: CompanyBenchmark[] = [
  {
    name: "Coca-Cola Company",
    strategyTr: "Farklılaşma (Yüksek Marj)",
    strategyEn: "Differentiation (High Margin)",
    margin: 26,
    turnover: 0.6,
    roic: 15.6,
    descTr: "Güçlü marka ve gizli formül ile %26 NOPAT marjı üretir. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Generates a 26% NOPAT margin via pricing power and brand equity. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    name: "Costco Wholesale",
    strategyTr: "Maliyet Liderliği (Yüksek Devir)",
    strategyEn: "Cost Leadership (High Turnover)",
    margin: 4,
    turnover: 4.3,
    roic: 17.2,
    descTr: "Yalnızca %4 ince kâr marjıyla çalışır ama depodaki sermayeyi 4.3 kat hızla döndürür. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Operates with a lean 4% operating margin but turns over invested capital 4.3x annually. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    name: "Apple Inc.",
    strategyTr: "Süperstar (Çifte Motor)",
    strategyEn: "Superstar (Both Engines)",
    margin: 28,
    turnover: 1.6,
    roic: 44.8,
    descTr: "Hem %28'lik devasa bir lüks marjına hem de 1.6x yüksek sermaye dönüşüm hızına sahiptir. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Commands both luxury 28% NOPAT margins and a high 1.6x capital velocity. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    name: "Marathon Petroleum",
    strategyTr: "Maliyet Liderliği (Yüksek Devir)",
    strategyEn: "Cost Leadership (High Turnover)",
    margin: 8,
    turnover: 2.3,
    roic: 18.4,
    descTr: "Rafineri ölçeği ve yüksek varlık verimliliği ile 2.3x devir hızına ulaşır. Öğretim senaryosudur; rakamlar güncel şirket tahmini veya yatırım görüşü değildir.",
    descEn: "Reaches 2.3x asset velocity driven by refinery scale and operational throughput. Illustrative teaching scenario — figures are not current company estimates or investment views.",
  },
  {
    name: "Standart Emtia Şirketi",
    strategyTr: "Ortada Sıkışmış (Kırılgan)",
    strategyEn: "Stuck in the Middle (Vulnerable)",
    margin: 6,
    turnover: 0.8,
    roic: 4.8,
    descTr: "Ne fiyatlama gücü vardır ne de sermaye hızı; sermaye maliyetinin altında kalır. Öğretim senaryosudur; gerçek sonuçlar ve hendek süresi değişebilir.",
    descEn: "Neither commands pricing power nor asset velocity; falls below WACC. Illustrative scenario; actual outcomes and moat duration vary.",
  },
];

export const DuPontSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [nopatMargin, setNopatMargin] = useState<number>(26);
  const [capitalTurnover, setCapitalTurnover] = useState<number>(0.6);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  const calculatedRoic = Math.round(nopatMargin * capitalTurnover * 10) / 10;

  const handleSelectBenchmark = (b: CompanyBenchmark) => {
    setNopatMargin(b.margin);
    setCapitalTurnover(b.turnover);
  };

  const getStrategicArchetype = () => {
    if (nopatMargin >= 20 && capitalTurnover >= 1.5) {
      return {
        titleTr: "👑 Süperstar Şirket (Çifte Motor)",
        titleEn: "👑 Superstar Compounder (Twin Engines)",
        color: "text-purple-600 dark:text-purple-400",
        badge: "bg-purple-100 dark:bg-purple-950/60 border-purple-300 text-purple-800 dark:text-purple-300",
        descTr: "Hem lüks marjı hem de yüksek sermaye devriyle dünyadaki en yüksek ROIC oranlarını üretir (Örn: Apple).",
        descEn: "Combines luxury pricing margins with blistering capital velocity (e.g. Apple).",
      };
    }
    if (nopatMargin >= 18) {
      return {
        titleTr: "💎 Farklılaşma Lideri (Yüksek Marj)",
        titleEn: "💎 Differentiation Leader (High Margin)",
        color: "text-indigo-600 dark:text-indigo-400",
        badge: "bg-indigo-100 dark:bg-indigo-950/60 border-indigo-300 text-indigo-800 dark:text-indigo-300",
        descTr: "Marka, patent veya tekel avantajıyla her satıştan devasa kâr marjı keser (Örn: Coca-Cola, Tiffany).",
        descEn: "Commands massive operating margins via brand prestige or proprietary IP (e.g. Coca-Cola, Tiffany).",
      };
    }
    if (capitalTurnover >= 2.5) {
      return {
        titleTr: "⚡ Maliyet & Hız Lideri (Yüksek Devir Hızı)",
        titleEn: "⚡ Cost & Velocity Leader (High Turnover)",
        color: "text-emerald-600 dark:text-emerald-400",
        badge: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-300",
        descTr: "Düşük kâr marjıyla çalışır ama sermayeyi yılda defalarca döndürerek aynı yüksek ROIC'e ulaşır (Örn: Costco).",
        descEn: "Operates with slim margins but achieves identical superior ROIC through rapid capital velocity (e.g. Costco).",
      };
    }
    return {
      titleTr: "⚠️ Ortada Sıkışmış (Emtia Tuzağı)",
      titleEn: "⚠️ Stuck in the Middle (Commodity Trap)",
      color: "text-rose-600 dark:text-rose-400",
      badge: "bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-800 dark:text-rose-300",
      descTr: "Ne yüksek fiyat koyabiliyor ne de mallarını hızlı döndürebiliyor; sermaye maliyetinin altında ezilme riski taşır.",
      descEn: "Neither commands pricing power nor achieves asset velocity; high risk of destroying capital value.",
    };
  };

  const archetype = getStrategicArchetype();

  // Recharts Data: Benchmark Comparison vs Active Setup
  const comparisonData = [
    {
      name: isEnglish ? "Active Scenario" : "Aktif Senaryonuz",
      roic: calculatedRoic,
      margin: nopatMargin,
      turnover: capitalTurnover,
      fill: calculatedRoic >= 15 ? "#10B981" : calculatedRoic >= 9 ? "#F59E0B" : "#F43F5E",
    },
    ...BENCHMARKS.slice(0, 4).map((b) => ({
      name: b.name.split(" ")[0],
      roic: b.roic,
      margin: b.margin,
      turnover: b.turnover,
      fill: "#6366F1",
    })),
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="dupont-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Step 7 Interactive Terminal" : "7. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "DuPont ROIC Decomposition" : "DuPont ROIC Ayrıştırması"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "DuPont Strategic Twin Engines: Margin × Velocity" : "DuPont Stratejik İkiz Motor Röntgeni: Marj × Hız"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isEnglish
              ? "ROIC = NOPAT Margin (%) × Capital Turnover (x). Discover how high margin and high asset velocity are two distinct mathematical paths to the same superior ROIC."
              : "ROIC = NOPAT Marjı (%) × Sermaye Devir Hızı (x). Yüksek kâr marjı ile yüksek devir hızının aynı üstün ROIC'e giden iki farklı stratejik yol olduğunu keşfedin."}
          </p>
        </div>

        <button
          onClick={() => handleSelectBenchmark(BENCHMARKS[0])}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Coca-Cola)" : "Sıfırla (Coca-Cola)"}
        </button>
      </div>

      {/* Corporate Benchmarks */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Preset Corporate Benchmarks:" : "Kurumsal Strateji Şablonları:"}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BENCHMARKS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectBenchmark(b)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                {b.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {isEnglish ? b.strategyEn : b.strategyTr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: DuPont Sliders & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {isEnglish ? "Twin Engine Levers:" : "İkiz Motor Kontrolleri:"}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              ROIC: %{calculatedRoic}
            </span>
          </div>

          {/* 1. NOPAT Margin Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                1. NOPAT Marjı (Kârlılık Motoru)
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setNopatMargin(Math.max(1, nopatMargin - 1))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>%{nopatMargin}</span>
                <button
                  onClick={() => setNopatMargin(Math.min(50, nopatMargin + 1))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Net Operating Profit per $100 Revenue" : "Her 100 TL Cirodan Kalan Net Faaliyet Kârı"}
            </p>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={nopatMargin}
              onChange={(e) => setNopatMargin(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 2. Capital Turnover Slider */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                2. Sermaye Devir Hızı (Hız Motoru)
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <button
                  onClick={() => setCapitalTurnover(Math.max(0.1, Math.round((capitalTurnover - 0.1) * 10) / 10))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span>{capitalTurnover.toFixed(1)}x</span>
                <button
                  onClick={() => setCapitalTurnover(Math.min(6.0, Math.round((capitalTurnover + 0.1) * 10) / 10))}
                  className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Revenue generated per $1 of Invested Capital" : "Yatırılan Her 1 TL Sermaye ile Üretilen Yıllık Ciro"}
            </p>
            <input
              type="range"
              min={0.1}
              max={6.0}
              step={0.1}
              value={capitalTurnover}
              onChange={(e) => setCapitalTurnover(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {isEnglish ? "Action-Oriented Experiment:" : "Eyleme Dönük DuPont Deneyi:"}
            </strong>
            {isEnglish
              ? "Lower NOPAT margin to 4% and push Capital Turnover to 4.3x; watch the right chart prove how Costco matches Coca-Cola's 16% ROIC purely through asset velocity!"
              : "NOPAT marjını %4'e indirin ve Sermaye Devir Hızını 4.3x'e çıkarın; sağdaki grafikte Costco'nun incecik kâr marjıyla bile Coca-Cola ile aynı %16-%17 ROIC seviyesine sırf hızla nasıl ulaştığını canlı görün!"}
          </div>
        </div>

        {/* Right Column: Recharts Benchmark Chart & Glassmorphic Diagnosis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isEnglish ? "ROIC Comparison vs Benchmarks (%)" : "ROIC Karşılaştırma Grafiği (%)"}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                Formula: {nopatMargin}% × {capitalTurnover.toFixed(1)}x = %{calculatedRoic}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="%" />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val, name, item) => {
                          const margin = item?.payload?.margin;
                          const turnover = item?.payload?.turnover;
                          const extra = margin !== undefined && turnover !== undefined
                            ? ` (${isEnglish ? "Margin" : "Marj"}: %${margin}, ${isEnglish ? "Velocity" : "Hız"}: ${turnover}x)`
                            : "";
                          return [
                            `ROIC %${val}${extra}`,
                            isEnglish ? "Return" : "Getiri",
                          ];
                        }}
                      />
                    }
                  />
                  <ReferenceLine y={10} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: "WACC (~%10)", fill: "#94A3B8", fontSize: 10 }} />
                  <Bar dataKey="roic" radius={[6, 6, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Diagnosis Archetype Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {isEnglish ? "Strategic Archetype Diagnostic" : "Stratejik Model Teşhisi"}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {isEnglish ? archetype.titleEn : archetype.titleTr}
                </h4>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${archetype.badge}`}>
                {calculatedRoic >= 15 ? "Wide Moat" : calculatedRoic >= 9 ? "Narrow Moat" : "No Moat"}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {isEnglish ? archetype.descEn : archetype.descTr}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
              <div className="p-2 rounded bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200">
                <span className="block text-[10px] text-slate-400 font-sans">
                  {isEnglish ? "Profit Margin Engine" : "Kâr Marjı Katkısı"}
                </span>
                %{nopatMargin} {isEnglish ? "NOPAT / Revenue" : "NOPAT / Ciro"}
              </div>
              <div className="p-2 rounded bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
                <span className="block text-[10px] text-slate-400 font-sans">
                  {isEnglish ? "Capital Velocity Engine" : "Sermaye Hızı Katkısı"}
                </span>
                {capitalTurnover.toFixed(1)}x {isEnglish ? "Revenue / Capital" : "Ciro / Sermaye"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation & deep dive" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-dupont-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEnglish
                ? "See the calculation & deep dive (DuPont Proof, Margins vs Turnover & Diagnosis)"
                : "Hesabı & Derinlemesine Analizi Gör (DuPont Formül Dökümü, Marj vs Hız Analizi)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (isEnglish ? "Hide" : "Gizle") : (isEnglish ? "Show" : "Göster")}</span>
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden space-y-4 pt-4"
            >
              {/* Formula and Numerical Proof */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">
                    ROIC = NOPAT Marjı × Sermaye Devir Hızı = %{nopatMargin} × {capitalTurnover.toFixed(1)}x = %{calculatedRoic}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {isEnglish
                      ? `Calculation Proof: (NOPAT / Revenue) × (Revenue / Invested Capital) = (NOPAT / Invested Capital)`
                      : `Matematiksel İspat: (NOPAT / Ciro) × (Ciro / Yatırılan Sermaye) = (NOPAT / Yatırılan Sermaye)`}
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {isEnglish
                    ? `Two Distinct Competitive Strategies: Coca-Cola (26% margin × 0.6x turnover = 15.6% ROIC) and Costco (4% margin × 4.3x turnover = 17.2% ROIC) both achieve world-class capital returns via completely opposite operating engines.`
                    : `İki Zıt Rekabet Stratejisi: Coca-Cola (%26 marj × 0.6x devir = %15.6 ROIC) ile Costco (%4 marj × 4.3x devir = %17.2 ROIC) tamamen zıt iki motorla aynı üstün sermaye getirisi liginde yarışır.`}
                </p>
              </div>

              {/* Actionable DuPont Experiments */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isEnglish ? "Pedagogical DuPont Experiments:" : "Terminal DuPont Deneyleri:"}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-indigo-900 dark:text-indigo-300">{isEnglish ? "Luxury / Moat Experiment:" : "Lüks / Hendek Deneyi:"}</strong>{" "}
                    {isEnglish
                      ? "Raise NOPAT Margin to 28% while holding Turnover at 1.6x (Apple model). Observe how twin engines blast ROIC to 44.8%."
                      : "NOPAT Marjını %28'e çıkarıp Devir Hızını 1.6x yapın (Apple modeli). Çifte motorun ROIC'yi nasıl %44.8'e fırlattığını izleyin."}
                  </p>
                  <p>
                    👉 <strong className="text-rose-900 dark:text-rose-300">{isEnglish ? "The Commodity Trap:" : "Emtia Tuzağı:"}</strong>{" "}
                    {isEnglish
                      ? "Set Margin to 6% and Turnover to 0.8x. ROIC drops to 4.8%, destroying shareholder value below the WACC hurdle rate."
                      : "Marjı %6'ya ve Devri 0.8x'e indirin. ROIC %4.8'e düşerek %10'luk sermaye maliyetinin altında servet eritir."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
