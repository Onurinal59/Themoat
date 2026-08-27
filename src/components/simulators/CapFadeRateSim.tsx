import React, { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingDown,
  Shield,
  Clock,
  Sparkles,
  RotateCcw,
  Sliders,
  Award,
  Zap,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  CheckCircle2
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

interface MoatPreset {
  id: string;
  nameTr: string;
  nameEn: string;
  badgeTr: string;
  badgeEn: string;
  initialRoic: number;
  wacc: number;
  fadeSpeed: number; // 0.05 to 0.5 (half-life factor)
  capYears: number;
  descTr: string;
  descEn: string;
  color: string;
}

const PRESETS: MoatPreset[] = [
  {
    id: "wide",
    nameTr: "🏰 Geniş Hendek (Wide Moat - Örn: Hermès, TSMC)",
    nameEn: "🏰 Wide Moat (e.g., Hermès, TSMC)",
    badgeTr: "20+ Yıl Koruma",
    badgeEn: "20+ Year CAP",
    initialRoic: 35,
    wacc: 8.5,
    fadeSpeed: 0.04, // Very slow fade
    capYears: 20,
    descTr: "Ağ etkisi, yüksek müşteri geçiş maliyeti veya eşsiz patentler sayesinde rakiplerin saldırılarına 20+ yıl boyunca direnir.",
    descEn: "Resists competitive arbitrage for 20+ years via network effects, high switching costs, and proprietary know-how.",
    color: "#10b981"
  },
  {
    id: "narrow",
    nameTr: "🛡️ Dar Hendek (Narrow Moat - Örn: İyi Perakendeci)",
    nameEn: "🛡️ Narrow Moat (e.g., Quality Retailer)",
    badgeTr: "7-10 Yıl Koruma",
    badgeEn: "7-10 Year CAP",
    initialRoic: 22,
    wacc: 9.0,
    fadeSpeed: 0.12, // Medium fade
    capYears: 9,
    descTr: "Güçlü bir operasyonel avantajı vardır ancak zamanla rakipler en iyi uygulamaları kopyalayarak kâr marjlarını ortalamaya çeker.",
    descEn: "Solid operational edge, but competitors gradually replicate best practices, eroding spread toward WACC.",
    color: "#3b82f6"
  },
  {
    id: "cyclical",
    nameTr: "🌊 Döngüsel Kazanç / Hendeksiz (Örn: Deniz Taşımacılığı)",
    nameEn: "🌊 Cyclical / No Moat (e.g., Ocean Shipping 2021)",
    badgeTr: "2-3 Yıl (Hızlı Fade)",
    badgeEn: "2-3 Year (Fast Fade)",
    initialRoic: 45,
    wacc: 10.0,
    fadeSpeed: 0.45, // Extreme rapid fade
    capYears: 3,
    descTr: "Süper döngüde %45 ROIC kazansa bile yeni gemi kapasiteleri girdikçe kârlılık ışık hızında sermaye maliyetine çöker.",
    descEn: "Earns 45% ROIC during upcycles, but rapid capacity expansion quickly crashes returns back to cost of capital.",
    color: "#f59e0b"
  }
];

export const CapFadeRateSim: React.FC = () => {
  const { isEnglish } = useLanguage();

  const [initialRoic, setInitialRoic] = useState<number>(30);
  const [wacc, setWacc] = useState<number>(8.5);
  const [fadeRate, setFadeRate] = useState<number>(0.08); // Exponential decay rate
  const [investedCapital, setInvestedCapital] = useState<number>(1000); // $M
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  // Generate 20-year projection
  const data = Array.from({ length: 21 }, (_, t) => {
    // Empirical exponential decay toward WACC: ROIC(t) = WACC + (ROIC_0 - WACC) * exp(-fadeRate * t)
    const roic_t = wacc + (initialRoic - wacc) * Math.exp(-fadeRate * t);
    const spread = Math.max(0, roic_t - wacc);
    const economicProfit = (investedCapital * (spread / 100));

    return {
      year: t === 0 ? (isEnglish ? "Base" : "Baz") : `${t}. ${isEnglish ? "Yr" : "Yıl"}`,
      yearNum: t,
      roic: Number(roic_t.toFixed(1)),
      wacc: Number(wacc.toFixed(1)),
      spread: Number(spread.toFixed(1)),
      economicProfit: Number(economicProfit.toFixed(1)),
    };
  });

  // Calculate cumulative economic profit over 20 years
  const totalCumulativeEP = data.reduce((acc, row) => acc + row.economicProfit, 0);
  
  // Calculate implied CAP (years where ROIC - WACC >= 1.5%)
  const capDuration = data.filter(row => row.yearNum > 0 && row.spread >= 1.5).length;

  const applyPreset = (preset: MoatPreset) => {
    setInitialRoic(preset.initialRoic);
    setWacc(preset.wacc);
    setFadeRate(preset.fadeSpeed);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-indigo-500/5 to-slate-900/10 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5" />
              {isEnglish ? "Empirical Fade Rate & CAP Engine" : "Ortalamaya Dönüş & CAP Simülatörü"}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEnglish ? "Competitive Advantage Period & Mean Reversion" : "Rekabetçi Avantaj Dönemi (CAP) & Kâr Aşınması"}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {isEnglish
                ? "In a capitalist system, excess returns attract competitive capital. Discover how fast ROIC regresses to WACC, and why total economic value equals the cumulative area under the fade curve."
                : "Serbest piyasada yüksek kârlar rakipleri mıknatıs gibi çeker. ROIC'nin sermaye maliyetine (WACC) kaç yılda gerilediğini ve asıl servetin 'eğrinin altında kalan kümülatif alandan' doğduğunu keşfedin."}
            </p>
          </div>
        </div>
      </div>

      {/* Preset Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => applyPreset(p)}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all text-left group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {isEnglish ? p.badgeEn : p.badgeTr}
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ROIC: %{p.initialRoic}
                </span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base mb-1 group-hover:text-emerald-500 transition-colors">
                {isEnglish ? p.nameEn : p.nameTr}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEnglish ? p.descEn : p.descTr}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>{isEnglish ? "Load Preset" : "Şablonu Yükle"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-emerald-500" />
            {isEnglish ? "Model Parameters" : "Model Parametreleri"}
          </div>

          {/* Initial ROIC */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Initial ROIC" : "Başlangıç ROIC Oranı"}
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono">
                %{initialRoic}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={initialRoic}
              onChange={(e) => setInitialRoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* WACC */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Cost of Capital (WACC)" : "Sermaye Maliyeti (WACC)"}
              </span>
              <span className="font-black text-rose-500 font-mono">
                %{wacc}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="0.5"
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Fade Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Fade Rate (Decay Velocity)" : "Aşınma Hızı (Fade Rate)"}
              </span>
              <span className="font-black text-indigo-500 font-mono">
                {fadeRate < 0.06
                  ? isEnglish ? "Very Slow (Wide)" : "Çok Yavaş (Geniş)"
                  : fadeRate < 0.18
                  ? isEnglish ? "Moderate (Narrow)" : "Orta (Dar)"
                  : isEnglish ? "Rapid (No Moat)" : "Hızlı (Hendeksiz)"}
              </span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.50"
              step="0.02"
              value={fadeRate}
              onChange={(e) => setFadeRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <p className="text-[11px] text-slate-500">
              {isEnglish
                ? "Lower fade rate = stronger barriers to entry protecting high returns."
                : "Düşük aşınma hızı = rakipleri dışarıda tutan güçlü giriş engelleri."}
            </p>
          </div>

          {/* Invested Capital */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Invested Capital" : "Yatırılan Sermaye"}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">
                ${investedCapital}M
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={investedCapital}
              onChange={(e) => setInvestedCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />
          </div>
        </div>

        {/* Visual Chart Area */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                {isEnglish ? "20-Year ROIC Mean Reversion Curve" : "20 Yıllık ROIC Ortalamaya Dönüş Eğrisi"}
              </h3>
              <p className="text-xs text-slate-500">
                {isEnglish ? "Area between ROIC and WACC = Economic Profit (True Wealth Creation)" : "Yeşil Alan = Yaratılan Kümülatif Hissedar Serveti"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                ROIC (%)
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                WACC (%)
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fadeSpreadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 60]} tick={{ fontSize: 11 }} tickFormatter={(v) => `%${v}`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 shadow-xl space-y-1">
                          <p className="font-bold text-slate-300">{d.year}</p>
                          <p className="text-emerald-400 font-bold">ROIC: %{d.roic}</p>
                          <p className="text-rose-400">WACC: %{d.wacc}</p>
                          <p className="text-amber-300 font-mono">Yayılım (Spread): +%{d.spread}</p>
                          <p className="text-cyan-300 font-mono">Yıllık Ekonomik Kâr: ${d.economicProfit}M</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={wacc} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} />
                <Area type="monotone" dataKey="roic" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#fadeSpreadGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Output Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                {isEnglish ? "Calculated CAP (Years)" : "İma Edilen CAP Süresi"}
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {capDuration} {isEnglish ? "Years" : "Yıl"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                {isEnglish ? "20-Yr Cumulative Wealth" : "20 Yıllık Toplam Refah"}
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                ${totalCumulativeEP.toLocaleString(undefined, { maximumFractionDigits: 0 })}M
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                {isEnglish ? "Moat Longevity Verdict" : "Hendek Hükmü"}
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {capDuration >= 15
                  ? isEnglish ? "Wide Moat (Elite)" : "Geniş Hendek"
                  : capDuration >= 7
                  ? isEnglish ? "Narrow Moat" : "Dar Hendek"
                  : isEnglish ? "No Moat (Rapid Fade)" : "Hendeksiz"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
