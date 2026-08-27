import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  RotateCcw,
  Target,
  Sparkles,
  HelpCircle,
  Shield,
  Layers,
  ArrowRight,
  BarChart3,
  Percent,
  DollarSign,
  ChevronDown,
  Calculator,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

interface PresetScenario {
  nameTr: string;
  nameEn: string;
  marketCap: number; // Milyon $
  currentFCF: number; // Milyon $
  nearTermGrowth: number; // %
  wacc: number; // %
  descTr: string;
  descEn: string;
}

const PRESET_VALUATIONS: Record<string, PresetScenario> = {
  "wide-tech": {
    nameTr: "🏰 Geniş Hendekli Mega-Teknoloji",
    nameEn: "🏰 Wide-Moat Tech Giant",
    marketCap: 120000,
    currentFCF: 4000,
    nearTermGrowth: 15,
    wacc: 8.5,
    descTr: "Piyasa 15+ yıllık kesintisiz büyüme ve tekel hakimiyeti fiyatlıyor (Yüksek CAP beklentisi). Öğretim senaryosudur; gerçek sonuçlar ve hendek süresi değişebilir.",
    descEn: "Market prices in 15+ years of sustained excess returns and monopoly dominance (High implied CAP). Illustrative scenario; actual outcomes and moat duration vary.",
  },
  retail: {
    nameTr: "🛒 Olgun Maliyet Lideri Perakendeci",
    nameEn: "🛒 Mature Low-Cost Retailer",
    marketCap: 45000,
    currentFCF: 3500,
    nearTermGrowth: 8,
    wacc: 8.0,
    descTr: "İstikrarlı nakit akışı ve makul bir 6-8 yıllık hendek süresi fiyatlaması. Öğretim senaryosudur; gerçek sonuçlar ve hendek süresi değişebilir.",
    descEn: "Steady cash flows and balanced 6-8 year implied competitive advantage period. Illustrative scenario; actual outcomes and moat duration vary.",
  },
  cyclical: {
    nameTr: "🏭 Döngüsel Emtia Üreticisi",
    nameEn: "🏭 Cyclical Commodity Producer",
    marketCap: 25000,
    currentFCF: 3000,
    nearTermGrowth: 4,
    wacc: 11.0,
    descTr: "Piyasa şirkete sıfıra yakın hendek süresi biçmiş; değerin %80'i mevcut somut nakitten gelir. Öğretim senaryosudur; gerçek sonuçlar ve hendek süresi değişebilir.",
    descEn: "Market prices minimal moat longevity; 80%+ of value rests on tangible steady-state cash. Illustrative scenario; actual outcomes and moat duration vary.",
  },
};

export const ReverseDCFSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [marketCap, setMarketCap] = useState<number>(120000); // Milyon $
  const [currentFCF, setCurrentFCF] = useState<number>(4000); // Milyon $
  const [nearTermGrowth, setNearTermGrowth] = useState<number>(15); // %
  const [wacc, setWacc] = useState<number>(8.5); // %
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Steady-State Value (Zero-Growth Terminal Value = FCF / WACC)
  const steadyStateValue = currentFCF > 0 && wacc > 0 ? (currentFCF / (wacc / 100)) : 0;
  const steadyStatePercentage = Math.min(100, Math.max(0, Math.round((steadyStateValue / marketCap) * 100)));
  const futureValuePercentage = Math.max(0, 100 - steadyStatePercentage);

  // Approximate Implied Competitive Advantage Period (CAP in years)
  const calculateImpliedCap = () => {
    let cumulativePV = 0;
    let projectedFcf = currentFCF;
    const discountRate = wacc / 100;
    const growth = nearTermGrowth / 100;

    for (let year = 1; year <= 30; year++) {
      projectedFcf *= (1 + growth);
      const pv = projectedFcf / Math.pow(1 + discountRate, year);
      cumulativePV += pv;
      if (cumulativePV >= (marketCap - steadyStateValue * 0.5)) {
        return year;
      }
    }
    return 25;
  };

  const impliedCapYears = calculateImpliedCap();

  // 10-Year Trajectory Data for Recharts AreaChart
  const projectedYearsData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const fcf = Math.round(currentFCF * Math.pow(1 + nearTermGrowth / 100, year));
    const pvFcf = Math.round(fcf / Math.pow(1 + wacc / 100, year));
    return {
      year: `${isEnglish ? "Yr" : "Yıl"} ${year}`,
      fcf,
      pvFcf,
    };
  });

  const handleApplyPreset = (key: string) => {
    const preset = PRESET_VALUATIONS[key];
    if (preset) {
      setMarketCap(preset.marketCap);
      setCurrentFCF(preset.currentFCF);
      setNearTermGrowth(preset.nearTermGrowth);
      setWacc(preset.wacc);
    }
  };

  const handleReset = () => {
    handleApplyPreset("wide-tech");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="reversedcf-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Step 8 Interactive Terminal" : "8. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Michael Mauboussin Reverse DCF" : "Michael Mauboussin Tersine DCF"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Reverse DCF: Deconstruct Market Expectations & CAP" : "Tersine DCF & Piyasa Beklenti Ayrıştırması"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isEnglish
              ? "Instead of forecasting the future, reverse-engineer what growth rate and moat longevity (CAP) the market price already demands today."
              : "Geleceği tahmin etmeye çalışmak yerine, mevcut piyasa hisse fiyatının şirketten kaç yıllık bir büyüme ve hendek süresi (CAP) beklediğini geriye doğru çözün."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Tech Giant)" : "Sıfırla (Mega-Teknoloji)"}
        </button>
      </div>

      {/* Preset Scenarios */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Valuation Scenarios:" : "Örnek Senaryo Şablonları:"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => handleApplyPreset("wide-tech")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {isEnglish ? "🏰 Wide-Moat Tech Giant" : "🏰 Geniş Hendekli Mega-Teknoloji"}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {isEnglish ? "High growth (15%), $120B Market Cap" : "%15 büyüme, 120 Milyar $ Piyasa Değeri"}
            </span>
          </button>
          <button
            onClick={() => handleApplyPreset("retail")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {isEnglish ? "🛒 Mature Low-Cost Retailer" : "🛒 Olgun Maliyet Lideri Perakendeci"}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {isEnglish ? "Moderate growth (8%), $45B Market Cap" : "%8 büyüme, 45 Milyar $ Piyasa Değeri"}
            </span>
          </button>
          <button
            onClick={() => handleApplyPreset("cyclical")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {isEnglish ? "🏭 Cyclical Commodity Producer" : "🏭 Döngüsel Emtia Üreticisi"}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {isEnglish ? "Low growth (4%), High WACC (11%)" : "%4 düşük büyüme, %11 yüksek WACC"}
            </span>
          </button>
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Valuation Levers (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {isEnglish ? "Market Valuation Levers:" : "Piyasa Değerleme Girdileri:"}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              CAP: ~{impliedCapYears} {isEnglish ? "Years" : "Yıl"}
            </span>
          </div>

          {/* 1. Market Cap Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {isEnglish ? "Market Cap / Enterprise Value" : "Piyasa Değeri (Market Cap / EV)"}
              </span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100">
                ${(marketCap / 1000).toFixed(1)}B
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={5000}
              value={marketCap}
              onChange={(e) => setMarketCap(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 2. Current FCF / NOPAT */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {isEnglish ? "Current Annual FCF / NOPAT" : "Mevcut Yıllık FCF / NOPAT"}
              </span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100">
                ${currentFCF}M
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={250}
              value={currentFCF}
              onChange={(e) => setCurrentFCF(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 3. Expected Growth Rate */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {isEnglish ? "Near-Term Growth Rate (g)" : "Yakın Dönem Büyüme Oranı (g)"}
              </span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100">
                %{nearTermGrowth}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={nearTermGrowth}
              onChange={(e) => setNearTermGrowth(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* 4. WACC Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {isEnglish ? "Cost of Capital (WACC / Discount Rate)" : "Sermaye Maliyeti (WACC / İskonto)"}
              </span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100">
                %{wacc.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={6.0}
              max={15.0}
              step={0.5}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {isEnglish ? "Action-Oriented Reverse DCF Insight:" : "Eyleme Dönük Tersine DCF Teşhisi:"}
            </strong>
            {isEnglish
              ? "Drag Market Cap up to $120B. See how the market demands 15+ years of uninterrupted CAP (Competitive Advantage Period) and 65%+ of the stock price represents future growth hopes rather than current cash generation."
              : "Piyasa Değerini 120 Milyar $'a çekin. Sağdaki grafikte piyasanın bu fiyatı doğrulamak için şirketten 15+ yıllık kesintisiz bir hendek süresi (CAP) beklediğini ve hisse fiyatının %65'inin gelecekteki büyüme umutlarına dayandığını izleyin."}
          </div>
        </div>

        {/* Right Column: Recharts Chart & Dynamic Diagnostic (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area: 10-Year Projected Cash Flow & PV Curve */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isEnglish ? "10-Year FCF Trajectory & Cumulative PV ($M)" : "10 Yıllık FCF Nakit Akışı & İskontolu Değer ($M)"}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                CAP: ~{impliedCapYears} {isEnglish ? "Years" : "Yıl"}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectedYearsData.slice(0, 10)} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="M" />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        prefix="$"
                        unit="M"
                        valueFormatter={(val, name) => {
                          const label = name === "fcf"
                            ? (isEnglish ? "Projected FCF" : "Beklenen FCF")
                            : (isEnglish ? "Discounted PV" : "İskontolu Bugünkü Değer");
                          return `$${val}M (${label})`;
                        }}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                    formatter={(value) => (value === "fcf" ? (isEnglish ? "Projected FCF" : "Beklenen FCF") : (isEnglish ? "Discounted PV" : "Bugünkü İskontolu Değer"))}
                  />
                  <Area type="monotone" dataKey="fcf" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} name={isEnglish ? "Projected FCF" : "Beklenen FCF"} />
                  <Area type="monotone" dataKey="pvFcf" stroke="#10B981" fill="#10B981" fillOpacity={0.4} strokeWidth={2} name={isEnglish ? "Discounted PV" : "Bugünkü İskontolu Değer"} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Value Decomposition & Margin of Safety Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isEnglish ? "Enterprise Value Breakdown (Steady State vs Growth):" : "Piyasa Değeri Ayrışımı (Mevcut Taban vs Gelecek Büyüme):"}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block">
                  {isEnglish ? "Steady-State Base Value" : "Sıfır Büyüme Taban Değeri"}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-emerald-900 dark:text-emerald-100">
                  ${(steadyStateValue / 1000).toFixed(1)}B
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  %{steadyStatePercentage} {isEnglish ? "(Tangible Current Profit)" : "(Somut Mevcut Kâr)"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 block">
                  {isEnglish ? "Future Growth Expectation (PVGO)" : "Gelecek Büyüme Primi (PVGO)"}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-indigo-900 dark:text-indigo-100">
                  ${Math.max(0, (marketCap - steadyStateValue) / 1000).toFixed(1)}B
                </div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 block">
                  %{futureValuePercentage} {isEnglish ? "(Future Growth Hopes)" : "(Gelecek Umutları)"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>
                {impliedCapYears >= 15
                  ? isEnglish
                    ? "Extreme Moat Expectation: Market demands 15+ years of flawless competitive dominance. Any growth deceleration will cause severe valuation multiple compression."
                    : "Aşırı Hendek Beklentisi: Piyasa şirketten 15+ yıl boyunca kusursuz bir tekel hakimiyeti bekliyor. Büyümedeki en ufak bir yavaşlama çarpan daralmasıyla sert düşüş yaratabilir."
                  : impliedCapYears <= 5
                  ? isEnglish
                    ? "High Margin of Safety: Market is pricing only 3-5 years of moat. If the company sustains its advantage longer, substantial re-rating upside exists."
                    : "Yüksek Güvenlik Marjı: Piyasa şirkete sadece 3-5 yıllık bir rekabet avantajı ömrü biçmiş. Şirket hendeğini korursa ciddi bir yukarı yönlü getiri potansiyeli vardır."
                  : isEnglish
                  ? "Balanced Valuation: Market implies an 8-12 year competitive advantage period, consistent with a quality compounder."
                  : "Dengeli Piyasa Fiyatlaması: Piyasa 8-12 yıllık makul bir hendek süresi fiyatlıyor; kaliteli bileşik getiri şirketleri için standart seviyedir."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation & deep dive" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-reverse-dcf-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEnglish
                ? "See the calculation & deep dive (Steady-State Math, PVGO Decomposition & Reverse DCF Proof)"
                : "Hesabı & Derinlemesine Analizi Gör (Taban Değer Formülü, PVGO Ayrışımı & Tersine DCF)"}
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
                    Steady-State Value = Current FCF (${currentFCF}M) / WACC (%{wacc}) = ${(steadyStateValue / 1000).toFixed(2)}B (%{steadyStatePercentage})
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    PVGO (Present Value of Growth Options) = Market Cap (${(marketCap / 1000).toFixed(1)}B) - Steady-State Value (${(steadyStateValue / 1000).toFixed(2)}B) = ${(Math.max(0, marketCap - steadyStateValue) / 1000).toFixed(2)}B (%{futureValuePercentage})
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {isEnglish
                    ? `Mauboussin & Rappaport Expectations Investing Framework: Instead of forecasting cash flows into the distant future, Reverse DCF unpacks the market price to reveal the growth duration and moat durability already embedded in the stock.`
                    : `Mauboussin & Rappaport Beklenti Yatırımcılığı (Expectations Investing): Uzak geleceğe yönelik rastgele nakit akışı tahminleri yapmak yerine Tersine DCF, mevcut hisse fiyatının içine gizlenmiş büyüme süresi ve hendek ömrü beklentilerini açığa çıkarır.`}
                </p>
              </div>

              {/* Actionable Reverse DCF Experiments */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isEnglish ? "Pedagogical Reverse DCF Experiments:" : "Terminal DCF Deneyleri:"}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-indigo-900 dark:text-indigo-300">{isEnglish ? "High Expectations Trap:" : "Yüksek Beklenti Tuzağı:"}</strong>{" "}
                    {isEnglish
                      ? "When PVGO exceeds 70% of Market Cap, even strong operational performance can lead to poor stock returns if growth falls slightly short of heroic market assumptions."
                      : "PVGO piyasa değerinin %70'ini aştığında şirket operasyonel olarak harika performans gösterse bile, piyasanın olağanüstü beklentilerinin bir parça altında kalması hissede sert düşüş yaratabilir."}
                  </p>
                  <p>
                    👉 <strong className="text-emerald-900 dark:text-emerald-300">{isEnglish ? "Deep Value / Steady State Floor:" : "Derin Değer / Taban Değer Koruması:"}</strong>{" "}
                    {isEnglish
                      ? "When Steady-State Value covers 80%+ of Market Cap, investors pay almost zero for future growth options, providing asymmetric upside if the moat endures."
                      : "Taban Değer piyasa değerinin %80'inden fazlasını karşıladığında yatırımcı gelecekteki büyüme opsiyonlarını adeta bedavaya satın alır; hendek korunduğu sürece asimetrik getiri sunar."}
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
