import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Percent,
  Layers,
  ArrowRight,
  HelpCircle,
  Clock,
  Award,
  Sliders,
  BarChart3,
  TrendingDown,
  Info,
  ChevronRight,
  Plus,
  Minus,
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
  Cell,
  ReferenceLine,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

interface PresetCompany {
  nameTr: string;
  nameEn: string;
  badgeTr: string;
  badgeEn: string;
  capital: number; // Milyon $
  nopat: number; // Milyon $
  wacc: number; // %
  moatType: "wide" | "narrow" | "none" | "destroyer";
  descTr: string;
  descEn: string;
}

const PRESET_COMPANIES: PresetCompany[] = [
  {
    nameTr: "🏰 Geniş Hendek (Apple / Coca-Cola)",
    nameEn: "🏰 Wide-Moat (Apple / Coca-Cola)",
    badgeTr: "Geniş Hendek",
    badgeEn: "Wide Moat",
    capital: 50000,
    nopat: 12500, // ROIC = 25%
    wacc: 8.0,
    moatType: "wide",
    descTr: "Fiyatlama gücü ve marka sadakati sayesinde sermaye maliyetinin (%8.0) 3 katı getiri (%25.0 ROIC) üreterek devasa yeşil yayılım sağlar.",
    descEn: "Unmatched brand pricing power generates 25% ROIC against an 8% WACC, delivering massive green economic spread.",
  },
  {
    nameTr: "🍋 Limonata Tezgahı (Sıfırdan Başlangıç)",
    nameEn: "🍋 Lemonade Stand (Zero-to-One Starter)",
    badgeTr: "Başlangıç",
    badgeEn: "Starter",
    capital: 1000,
    nopat: 180, // ROIC = 18%
    wacc: 10.0,
    moatType: "narrow",
    descTr: "1.000 $ borçlanma maliyeti (%10 WACC = 100 $). Yaz sonu 180 $ kâr (%18 ROIC). Borç faizi ödendikten sonra +80 $ saf refah kalır.",
    descEn: "$1,000 borrowed at 10% WACC ($100). Year-end profit $180 (18% ROIC). After paying funding cost, +$80 pure economic wealth remains.",
  },
  {
    nameTr: "🛒 Dar Hendek (Costco / Walmart)",
    nameEn: "🛒 Narrow-Moat (Costco / Walmart)",
    badgeTr: "Dar Hendek",
    badgeEn: "Narrow Moat",
    capital: 30000,
    nopat: 4200, // ROIC = 14%
    wacc: 9.0,
    moatType: "narrow",
    descTr: "Yüksek hacim ve stok çevrim hızıyla sermaye maliyetinin 5 puan üzerinde (%14.0 ROIC) istikrarlı pozitif yayılım üretir.",
    descEn: "High inventory turnover delivers a consistent 5% economic spread (14% ROIC vs 9% WACC).",
  },
  {
    nameTr: "⚠️ Ciro Devi Zombi Şirket (Değer Yok Eden)",
    nameEn: "⚠️ Revenue Giant Zombie (Value Destroyer)",
    badgeTr: "Değer Yok Edici",
    badgeEn: "Value Destroyer",
    capital: 80000,
    nopat: 4000, // ROIC = 5%
    wacc: 10.5,
    moatType: "destroyer",
    descTr: "80 milyar $ sermaye bağlayıp 4 milyar $ muhasebe kârı açıklar; fakat %10.5 sermaye maliyeti yüzünden her yıl -4.4 milyar $ servet yakar!",
    descEn: "Deploys $80B capital producing $4B accounting profit, yet burns -$4.4B in wealth yearly because 5% ROIC is well below 10.5% WACC!",
  },
];

export const RoicWaccSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [investedCapital, setInvestedCapital] = useState<number>(50000); // Milyon $
  const [nopat, setNopat] = useState<number>(10000); // Milyon $ Net Operating Profit
  const [wacc, setWacc] = useState<number>(8.5); // Cost of capital %
  const [regressionYears, setRegressionYears] = useState<number>(5); // 1 to 10 years
  const [activeChartView, setActiveChartView] = useState<"rate" | "projection">("rate");
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Core Financial Calculations
  const roic = investedCapital > 0 ? (nopat / investedCapital) * 100 : 0;
  const spread = roic - wacc;
  const economicProfit = (investedCapital * spread) / 100; // Milyon $ Yıllık Gerçek Katma Değer
  const isValueCreating = spread >= 0;

  // Rate Comparison Chart Data for Recharts
  const rateChartData = [
    {
      name: isEnglish ? "ROIC (Return on Capital)" : "ROIC (Sermaye Getirisi)",
      shortName: "ROIC",
      value: Number(roic.toFixed(1)),
      fillColor: "#6366F1", // Indigo
      type: "return",
    },
    {
      name: isEnglish ? "WACC (Cost of Capital)" : "WACC (Sermaye Maliyeti)",
      shortName: "WACC",
      value: Number(wacc.toFixed(1)),
      fillColor: "#94A3B8", // Slate
      type: "cost",
    },
    {
      name: isEnglish ? "Economic Spread (ROIC - WACC)" : "Ekonomik Yayılım (Spread)",
      shortName: isEnglish ? "Spread" : "Yayılım",
      value: Number(spread.toFixed(1)),
      fillColor: isValueCreating ? "#10B981" : "#F43F5E", // Emerald vs Rose
      type: "spread",
    },
  ];

  // 10-Year Mean Reversion Projection Data (Mauboussin Competitive Fade)
  const projectionData = Array.from({ length: 10 }, (_, i) => {
    const yr = i + 1;
    // Exponential or linear fade towards WACC after competitive advantage period
    const fadeFactor = Math.min(1, yr / regressionYears);
    const projectedRoic = roic + (wacc - roic) * (fadeFactor * 0.85);
    const projectedSpread = projectedRoic - wacc;
    const projectedWealth = (investedCapital * projectedSpread) / 100;

    return {
      year: isEnglish ? `Yr ${yr}` : `${yr}. Yıl`,
      roic: Number(projectedRoic.toFixed(1)),
      wacc: Number(wacc.toFixed(1)),
      spread: Number(projectedSpread.toFixed(1)),
      wealth: Math.round(projectedWealth),
    };
  });

  const handleApplyPreset = (preset: PresetCompany) => {
    setInvestedCapital(preset.capital);
    setNopat(preset.nopat);
    setWacc(preset.wacc);
  };

  const handleReset = () => {
    setInvestedCapital(50000);
    setNopat(10000);
    setWacc(8.5);
    setRegressionYears(5);
  };

  return (
    <div
      id="roic-wacc-sim-container"
      className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
    >
      {/* Header & Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {isEnglish ? "Module 1 & 2 Laboratory" : "Modül 1 & 2 Laboratuvarı"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish
              ? "ROIC vs WACC: Value Creation & Economic Moat Terminal"
              : "ROIC vs WACC: Değer Yaratma & Şato Hendeği Terminali"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {isEnglish
              ? "Adjust left-hand levers and observe the real-time response. A firm creates true economic wealth only when Return on Capital (ROIC) exceeds Cost of Capital (WACC)."
              : "Soldaki parametreleri değiştirin ve sağdaki terminalin canlı tepkisini izleyin. Bir şirket yalnızca Sermaye Getirisi (ROIC), Sermaye Maliyetini (WACC) aştığı zaman ekonomik değer yaratır."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer self-start sm:self-center shrink-0 border border-slate-200 dark:border-slate-700 min-h-[40px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEnglish ? "Reset" : "Sıfırla"}</span>
        </button>
      </div>

      {/* (A) Focus Area 1: Benchmark Scenario Presets */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isEnglish ? "Select Benchmark Scenario:" : "Örnek Senaryo Şablonu Seçin:"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_COMPANIES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="p-3 text-left rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700/80 transition-all cursor-pointer group space-y-1 min-h-[44px]"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                {isEnglish ? p.nameEn : p.nameTr}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                {isEnglish ? p.descEn : p.descTr}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Core: (B) 3 Main Sliders + (C) Live Chart & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* (B) Focus Area 2: 3 Main Interactive Sliders (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {isEnglish ? "Core Levers" : "Temel 3 Sürgü"}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Live Sync</span>
          </div>

          {/* Slider 1: Invested Capital */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEnglish ? "1. Invested Capital ($M):" : "1. Yatırılan Sermaye ($M):"}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isEnglish ? "Net Working Capital + Net Fixed Assets" : "Net İşletme Sermayesi + Net Duran Varlıklar"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setInvestedCapital((v) => Math.max(500, v - 2500))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-2500"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 min-w-24 text-center">
                  ${investedCapital.toLocaleString()}M
                </span>
                <button
                  type="button"
                  onClick={() => setInvestedCapital((v) => Math.min(150000, v + 2500))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="+2500"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={150000}
              step={500}
              value={investedCapital}
              onChange={(e) => setInvestedCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>$500M</span>
              <span>$75,000M</span>
              <span>$150,000M</span>
            </div>
          </div>

          {/* Slider 2: Annual NOPAT */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEnglish ? "2. Annual NOPAT ($M):" : "2. Yıllık NOPAT ($M):"}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isEnglish ? "EBIT × (1 - t) Net Operating Profit" : "Vergi Sonrası Net Faaliyet Kârı"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setNopat((v) => Math.max(100, v - 500))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-500"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 min-w-24 text-center">
                  ${nopat.toLocaleString()}M
                </span>
                <button
                  type="button"
                  onClick={() => setNopat((v) => Math.min(40000, v + 500))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="+500"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={100}
              max={40000}
              step={100}
              value={nopat}
              onChange={(e) => setNopat(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>$100M</span>
              <span>$20,000M</span>
              <span>$40,000M</span>
            </div>
          </div>

          {/* Slider 3: Cost of Capital (WACC) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {isEnglish ? "3. Cost of Capital (WACC %):" : "3. Sermaye Maliyeti (WACC %):"}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isEnglish ? "Blended Cost of Equity + After-Tax Debt" : "Özsermaye ve Net Borçlanma Ağırlıklı Ortalaması"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setWacc((v) => Math.max(4.0, Number((v - 0.5).toFixed(1))))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-0.5%"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 min-w-24 text-center">
                  %{wacc.toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => setWacc((v) => Math.min(22.0, Number((v + 0.5).toFixed(1))))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="+0.5%"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={4.0}
              max={22.0}
              step={0.2}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>%4.0</span>
              <span>%13.0</span>
              <span>%22.0</span>
            </div>
          </div>
        </div>

        {/* (C) Focus Area 3: Live Chart & Dynamic Result Card (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {isEnglish ? "Live Spread Result" : "Canlı Yayılım Sonucu"}
              </h3>
            </div>

            {/* View Switcher Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveChartView("rate")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeChartView === "rate"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {isEnglish ? "ROIC vs WACC" : "Oran"}
              </button>
              <button
                type="button"
                onClick={() => setActiveChartView("projection")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeChartView === "projection"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {isEnglish ? "10-Yr Decay" : "10 Yıllık"}
              </button>
            </div>
          </div>

          {/* Dynamic Result Card with High-Contrast Dual Indicators (Colors + Labels + Icons) */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              isValueCreating
                ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-700/60 shadow-sm"
                : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300/80 dark:border-rose-700/60 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-base sm:text-lg shrink-0 shadow-md ${
                  isValueCreating
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                <span className="text-[10px] font-sans font-bold opacity-90 leading-none">ROIC</span>
                <span>%{roic.toFixed(1)}</span>
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isValueCreating
                        ? "bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                        : "bg-rose-200/70 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200"
                    }`}
                  >
                    {isValueCreating
                      ? isEnglish ? "✓ VALUE CREATOR (Wide/Narrow Moat)" : "✓ DEĞER YARATICI (Pozitif Hendek)"
                      : isEnglish ? "✗ VALUE DESTROYER (Capital Drain)" : "✗ DEĞER YOK EDİCİ (Sermaye Tüketimi)"}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
                  {isValueCreating
                    ? isEnglish
                      ? `+${spread.toFixed(2)}% Spread (+$${Math.round(economicProfit).toLocaleString()}M / Year)`
                      : `+${spread.toFixed(2)} Puan Yayılım (+${Math.round(economicProfit).toLocaleString()}M $ / Yıl Refah)`
                    : isEnglish
                    ? `${spread.toFixed(2)}% Negative Spread (-$${Math.abs(Math.round(economicProfit)).toLocaleString()}M / Year)`
                    : `${spread.toFixed(2)} Puan Negatif Yayılım (-${Math.abs(Math.round(economicProfit)).toLocaleString()}M $ / Yıl Kayıp)`}
                </h4>
              </div>
            </div>
          </div>

          {/* Interactive Recharts Canvas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[220px]">
            {activeChartView === "rate" ? (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rateChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                    <XAxis dataKey="shortName" tick={{ fontSize: 11, fontWeight: 700, fill: "#64748B" }} tickLine={false} />
                    <YAxis unit="%" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length > 0 && payload[0]?.payload) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-2.5 rounded-xl bg-slate-900 text-white border border-slate-700 text-xs space-y-1 shadow-lg">
                              <div className="font-bold">{data.name}</div>
                              <div className="text-sm font-mono font-black text-amber-300">%{data.value}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1.5} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={300}>
                      {rateChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fillColor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} />
                    <YAxis unit="%" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <ReferenceLine y={wacc} stroke="#64748B" strokeDasharray="4 4" />
                    <Area
                      type="monotone"
                      dataKey="roic"
                      stroke={isValueCreating ? "#10B981" : "#F43F5E"}
                      strokeWidth={2}
                      fill={isValueCreating ? "#10B981" : "#F43F5E"}
                      fillOpacity={0.2}
                      animationDuration={300}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-roic-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEnglish ? "See the calculation" : "Hesabı gör"}
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
              {/* Formula and Interpretation Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold">
                    Spread = %{roic.toFixed(1)} (ROIC) - %{wacc.toFixed(1)} (WACC) = {spread >= 0 ? `+${spread.toFixed(1)}%` : `${spread.toFixed(1)}%`}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {isEnglish ? "Economic Profit" : "Ekonomik Kâr"} = ${investedCapital.toLocaleString()}M × {spread.toFixed(1)}% = ${Math.round(economicProfit).toLocaleString()}M
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {isValueCreating
                    ? isEnglish
                      ? `🏰 Model Interpretation: For every $100 deployed, this business generates $${roic.toFixed(1)} in net operating profit while its financing costs only $${wacc.toFixed(1)}, compounding $${spread.toFixed(1)} of pure shareholder wealth each cycle.`
                      : `🏰 Modelin Yorumu: Bağlanan her 100 $ sermaye için şirket 100 × %${roic.toFixed(1)} = ${roic.toFixed(1)} $ net faaliyet kârı üretirken finansman maliyeti ${wacc.toFixed(1)} $ olduğu için aradaki ${spread.toFixed(1)} $ net refah hissedara kalır.`
                    : isEnglish
                    ? `⚠️ Model Interpretation: Capital Drain! Even if the business books positive accounting profit, its return (%${roic.toFixed(1)}) fails to hurdle the cost of capital (%${wacc.toFixed(1)}). Rapid revenue growth will only accelerate wealth destruction.`
                    : `⚠️ Modelin Yorumu: Sermaye Tuzağı! Şirket kâr açıklıyor gibi görünse bile getirisi (%${roic.toFixed(1)}) sermaye maliyetini (%${wacc.toFixed(1)}) karşılayamamaktadır. Bu durumda şirketi büyütmek hissedarın servetini daha da hızlı yakacaktır.`}
                </p>
              </div>

              {/* Actionable Terminal Guidance */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isEnglish ? "Pedagogical Terminal Guidance:" : "Terminal Deney Yönergesi:"}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-indigo-900 dark:text-indigo-300">{isEnglish ? "Step A (Expand the Moat):" : "A Adımı (Hendeği Genişletin):"}</strong>{" "}
                    {isEnglish
                      ? "Increase NOPAT while holding capital flat. Notice how the green Economic Spread bar and annual dollar compounding expand immediately."
                      : "Yatırılan sermayeyi sabit tutup NOPAT sürgüsünü artırın. Sağdaki grafikte yeşil Ekonomik Yayılım (Spread) çubuğunun ve yıllık dolar refahının nasıl anında fırladığını görün."}
                  </p>
                  <p>
                    👉 <strong className="text-rose-900 dark:text-rose-300">{isEnglish ? "Step B (The Capital Trap):" : "B Adımı (Sermaye Tuzağı):"}</strong>{" "}
                    {isEnglish
                      ? "Push WACC above ROIC. Even if NOPAT is positive ($4,000M), the spread turns Crimson Red—proving accounting profits do not equal value creation!"
                      : "WACC sürgüsünü ROIC'nin üzerine çıkarın. Şirket 4.000M $ muhasebe kârı açıklasa bile sağdaki çubuğun Kırmızıya döndüğünü ve servet yok edildiğini izleyin!"}
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
