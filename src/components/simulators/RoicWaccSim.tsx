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
  Minus
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
  CartesianGrid
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

  // Core Financial Calculations
  const roic = investedCapital > 0 ? (nopat / investedCapital) * 100 : 0;
  const spread = roic - wacc;
  const economicProfit = (investedCapital * spread) / 100; // Milyon $ Yıllık Gerçek Katma Değer
  const isValueCreating = spread >= 0;

  // Rate Comparison Chart Data for Recharts
  const rateChartData = [
    {
      name: isEnglish ? "Cost of Capital (WACC)" : "Sermaye Maliyeti (WACC)",
      shortName: "WACC",
      value: Number(wacc.toFixed(2)),
      type: "cost",
      fillColor: "#64748B", // Slate-500
    },
    {
      name: isEnglish ? "Return on Capital (ROIC)" : "Sermaye Getirisi (ROIC)",
      shortName: "ROIC",
      value: Number(roic.toFixed(2)),
      type: "return",
      fillColor: "#4F46E5", // Indigo-600
    },
    {
      name: isEnglish ? "Economic Spread (ROIC - WACC)" : "Ekonomik Yayılım (Spread)",
      shortName: "Spread",
      value: Number(spread.toFixed(2)),
      type: "spread",
      fillColor: isValueCreating ? "#10B981" : "#F43F5E", // Emerald-500 or Rose-500
    },
  ];

  // 10-Year Regression to the Mean Projection Data
  const projectionData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    // Decay factor based on moat width
    const decayRate = 0.11;
    const projectedRoic = isValueCreating
      ? Math.max(wacc, roic - (roic - wacc) * (decayRate * i))
      : Math.min(wacc, roic + (wacc - roic) * (decayRate * i));
    const projectedSpread = projectedRoic - wacc;
    const projectedWealth = (investedCapital * projectedSpread) / 100;

    return {
      year: isEnglish ? `Yr ${year}` : `Yıl ${year}`,
      roic: Number(projectedRoic.toFixed(2)),
      wacc: Number(wacc.toFixed(2)),
      spread: Number(projectedSpread.toFixed(2)),
      wealth: Number(projectedWealth.toFixed(1)),
    };
  });

  const handleApplyPreset = (p: PresetCompany) => {
    setInvestedCapital(p.capital);
    setNopat(p.nopat);
    setWacc(p.wacc);
  };

  const handleReset = () => {
    setInvestedCapital(50000);
    setNopat(10000);
    setWacc(8.5);
    setRegressionYears(5);
  };

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs"
      id="roic-wacc-sim"
    >
      {/* Top Header & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-2xs">
              {isEnglish ? "TERMINAL LAB 01" : "TERMİNAL LABORATUVARI 01"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {isEnglish ? "Economic Spread & Capital Allocation" : "Ekonomik Yayılım & Sermaye Dağıtımı"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish
              ? "ROIC vs WACC: Value Creation & Economic Moat Terminal"
              : "ROIC vs WACC: Değer Yaratma & Şato Hendeği Terminali"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {isEnglish
              ? "Adjust left-hand levers and watch the real-time financial terminal on the right. A firm creates economic wealth only when Return on Capital (ROIC) exceeds Cost of Capital (WACC)."
              : "Soldaki parametreleri değiştirin ve sağdaki terminalin canlı tepkisini izleyin. Bir şirket yalnızca Sermaye Getirisi (ROIC), Sermaye Maliyetini (WACC) aştığı zaman ekonomik değer yaratır."}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer self-start sm:self-center shrink-0 border border-slate-200 dark:border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEnglish ? "Reset" : "Sıfırla"}</span>
        </motion.button>
      </div>

      {/* Preset Scenario Pills */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isEnglish ? "Benchmark Presets (Click to load):" : "Örnek Senaryo Şablonları (Tıklayıp Yükleyin):"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_COMPANIES.map((p, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleApplyPreset(p)}
              className="p-2.5 text-left rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700/80 transition-all cursor-pointer group space-y-1"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                {isEnglish ? p.nameEn : p.nameTr}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                {isEnglish ? p.descEn : p.descTr}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 2-COLUMN TERMINAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Control Panel & Pedagogical Prompts (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {isEnglish ? "Interactive Levers & Parameters" : "İnteraktif Sürgüler & Değişkenler"}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Live Sync</span>
          </div>

          {/* Slider 1: Invested Capital */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3 shadow-2xs">
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
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-2500"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-sm px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 min-w-24 text-center">
                  ${investedCapital.toLocaleString()}M
                </span>
                <button
                  type="button"
                  onClick={() => setInvestedCapital((v) => Math.min(150000, v + 2500))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
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
            <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
              <span>$500M</span>
              <span>$75,000M</span>
              <span>$150,000M</span>
            </div>
          </div>

          {/* Slider 2: Annual NOPAT */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3 shadow-2xs">
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
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-500"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-sm px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 min-w-24 text-center">
                  ${nopat.toLocaleString()}M
                </span>
                <button
                  type="button"
                  onClick={() => setNopat((v) => Math.min(40000, v + 500))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
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
            <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
              <span>$100M</span>
              <span>$20,000M</span>
              <span>$40,000M</span>
            </div>
          </div>

          {/* Slider 3: Cost of Capital (WACC) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3 shadow-2xs">
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
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                  title="-0.5%"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-black text-sm px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 min-w-24 text-center">
                  %{wacc.toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => setWacc((v) => Math.min(22.0, Number((v + 0.5).toFixed(1))))}
                  className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
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
            <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
              <span>%4.0 (Çok Düşük)</span>
              <span>%13.0</span>
              <span>%22.0 (Yüksek Risk)</span>
            </div>
          </div>

          {/* Action-Oriented Pedagogical Guidance (Mauboussin Style) */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isEnglish ? "🎯 Actionable Terminal Guidance:" : "🎯 Terminal Deney Yönergesi:"}</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                👉 <strong className="text-indigo-950 dark:text-indigo-100">{isEnglish ? "Step A (Expand the Moat):" : "A Adımı (Hendeği Genişletin):"}</strong>{" "}
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
        </div>

        {/* RIGHT COLUMN: Interactive Recharts Visualization & Dynamic Spread Result Card (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Chart Header & View Mode Switcher */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {isEnglish ? "Real-Time Moat Visualization" : "Canlı Hendek & Yayılım Grafiği"}
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
                {isEnglish ? "ROIC vs WACC" : "Oran Karşılaştırma"}
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
                {isEnglish ? "10-Yr Moat Decay" : "10 Yıllık Dönüşüm"}
              </button>
            </div>
          </div>

          {/* Interactive Recharts Canvas */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-inner relative min-h-[290px] flex flex-col justify-between">
            {activeChartView === "rate" ? (
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>{isEnglish ? "Annual Capital Rates & Net Differential" : "Yıllık Sermaye Oranları & Net Fark (Spread)"}</span>
                  <span className="font-mono text-xs font-black">
                    Spread:{" "}
                    <span className={isValueCreating ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                      {spread >= 0 ? `+${spread.toFixed(2)}%` : `${spread.toFixed(2)}%`}
                    </span>
                  </span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rateChartData}
                      margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                      <XAxis
                        dataKey="shortName"
                        tick={{ fontSize: 12, fontWeight: 700, fill: "#64748B" }}
                        axisLine={{ stroke: "#94A3B8", opacity: 0.3 }}
                        tickLine={false}
                      />
                      <YAxis
                        unit="%"
                        tick={{ fontSize: 11, fill: "#64748B" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length > 0 && payload[0]?.payload) {
                            const data = payload[0].payload;
                            return (
                              <div className="p-3 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl text-xs space-y-1 backdrop-blur-md">
                                <div className="font-bold text-slate-200">{data.name}</div>
                                <div className="text-base font-mono font-black text-amber-300">
                                  %{data.value}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {data.type === "cost"
                                    ? isEnglish ? "Cost of funding" : "Sermayenin fırsat maliyeti"
                                    : data.type === "return"
                                    ? isEnglish ? "Net return on capital" : "Bağlanan sermayenin getirisi"
                                    : isValueCreating
                                    ? isEnglish ? "Value Creation Spread" : "Net Katma Değer Yayılımı"
                                    : isEnglish ? "Value Destruction" : "Değer Yok Oluşu"}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1.5} />
                      <Bar
                        dataKey="value"
                        radius={[8, 8, 0, 0]}
                        animationDuration={400}
                      >
                        {rateChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.fillColor}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>{isEnglish ? "10-Year Moat Sustainability (Regression to Mean)" : "10 Yıllık Hendek Dayanımı (Ortalamaya Dönüş)"}</span>
                  <span className="text-[10px] font-mono text-indigo-500">Mauboussin Decay Model</span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={projectionData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="roicGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={isValueCreating ? "#10B981" : "#F43F5E"}
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor={isValueCreating ? "#10B981" : "#F43F5E"}
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748B" }} tickLine={false} />
                      <YAxis unit="%" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length > 0 && payload[0]?.payload) {
                            const d = payload[0].payload;
                            return (
                              <div className="p-3 rounded-xl bg-slate-900/95 text-white border border-slate-700 text-xs space-y-1 backdrop-blur-md">

                              <div className="font-bold text-amber-300">{d.year} {isEnglish ? "Projection" : "Projeksiyonu"}</div>
                              <div className="font-mono">ROIC: %{d.roic} | WACC: %{d.wacc}</div>
                              <div className="font-mono font-bold text-emerald-400">
                                {isEnglish ? "Annual Value" : "Yıllık Değer"}: $${d.wealth}M
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine y={wacc} stroke="#64748B" strokeDasharray="4 4" label={{ value: "WACC", position: "right", fill: "#64748B", fontSize: 10 }} />
                    <Area
                      type="monotone"
                      dataKey="roic"
                      stroke={isValueCreating ? "#10B981" : "#F43F5E"}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#roicGradient)"
                      animationDuration={500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            )}
          </div>

          {/* DYNAMIC RESULT CARD (GLASSMORPHISM WITH CONDITIONAL GLOW) */}
          <motion.div
            layout
            className={`p-5 rounded-3xl border transition-all duration-500 backdrop-blur-xl ${
              isValueCreating
                ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-700/60 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-400/30"
                : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300/80 dark:border-rose-700/60 shadow-lg shadow-rose-500/15 ring-1 ring-rose-400/30"
            }`}
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-3.5 w-full">
                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-lg shrink-0 shadow-md ${
                    isValueCreating
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white"
                      : "bg-gradient-to-br from-rose-500 to-rose-700 text-white"
                  }`}
                >
                  <span className="text-[10px] font-sans font-bold opacity-80 leading-none">ROIC</span>
                  <span>%{roic.toFixed(1)}</span>
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-normal text-left leading-tight ${
                        isValueCreating
                          ? "bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                          : "bg-rose-200/70 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200"
                      }`}
                    >
                      {isValueCreating
                        ? isEnglish ? "VALUE CREATOR (Wide/Narrow Moat)" : "DEĞER YARATICI (Pozitif Hendek)"
                        : isEnglish ? "VALUE DESTROYER (Capital Drain)" : "DEĞER YOK EDİCİ (Sermaye Tüketimi)"}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 break-words leading-snug">
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

              {/* Economic Formula Breakdown Tag */}
              <div className="text-left font-mono text-[11px] text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60 w-full">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  Spread = %{roic.toFixed(1)} - %{wacc.toFixed(1)} = {spread >= 0 ? `+${spread.toFixed(1)}%` : `${spread.toFixed(1)}%`}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {isEnglish ? "Economic Profit" : "Ekonomik Kâr"} = ${investedCapital.toLocaleString()}M × {spread.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Interpretation Explanation Text */}
            <p className="mt-3 text-xs leading-relaxed font-medium text-slate-700 dark:text-slate-200 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              {isValueCreating
                ? isEnglish
                  ? `🏰 Model Interpretation: For every $100 deployed, this business generates $${roic.toFixed(1)} in net operating profit while its financing costs only $${wacc.toFixed(1)}, compounding $${spread.toFixed(1)} of pure shareholder wealth each cycle.`
                  : `🏰 Modelin Yorumu: Bağlanan her 100 $ sermaye için şirket 100 × %${roic.toFixed(1)} = ${roic.toFixed(1)} $ net faaliyet kârı üretirken finansman maliyeti ${wacc.toFixed(1)} $ olduğu için aradaki ${spread.toFixed(1)} $ net refah hissedara kalır.`
                : isEnglish
                ? `⚠️ Model Interpretation: Capital Drain! Even if the business books positive accounting profit, its return (%${roic.toFixed(1)}) fails to hurdle the cost of capital (%${wacc.toFixed(1)}). Rapid revenue growth will only accelerate wealth destruction.`
                : `⚠️ Modelin Yorumu: Sermaye Tuzağı! Şirket kâr açıklıyor gibi görünse bile getirisi (%${roic.toFixed(1)}) sermaye maliyetini (%${wacc.toFixed(1)}) karşılayamamaktadır. Bu durumda şirketi büyütmek hissedarın servetini daha da hızlı yakacaktır.`}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
