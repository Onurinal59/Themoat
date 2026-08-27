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
  const { isEnglish, t, formatCurrency, formatPercent, formatNumber } = useLanguage();
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
      year: `${t("ReverseDCFSim.yr_1230")} ${year}`,
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
              {t("ReverseDCFSim.step_8_interactive_t_1231")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("ReverseDCFSim.michael_mauboussin_r_1232")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("ReverseDCFSim.reverse_dcf_deconstr_1233")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("ReverseDCFSim.instead_of_forecasti_1234")}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("ReverseDCFSim.reset_tech_giant_1235")}
        </button>
      </div>

      {/* Preset Scenarios */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {t("ReverseDCFSim.valuation_scenarios_1236")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => handleApplyPreset("wide-tech")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {t("ReverseDCFSim.wide_moat_tech_gian_1237")}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {t("ReverseDCFSim.high_growth_15_120b_1238")}
            </span>
          </button>
          <button
            onClick={() => handleApplyPreset("retail")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {t("ReverseDCFSim.mature_low_cost_ret_1239")}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {t("ReverseDCFSim.moderate_growth_8_45_1240")}
            </span>
          </button>
          <button
            onClick={() => handleApplyPreset("cyclical")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              {t("ReverseDCFSim.cyclical_commodity_1241")}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {t("ReverseDCFSim.low_growth_4_high_wa_1242")}
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
              {t("ReverseDCFSim.market_valuation_lev_1243")}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              CAP: ~{impliedCapYears} {t("ReverseDCFSim.years_1244")}
            </span>
          </div>

          {/* 1. Market Cap Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {t("ReverseDCFSim.market_cap_enterpris_1245")}
              </span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-slate-100">
                ${formatCurrency(marketCap * 1000000)}
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
                {t("ReverseDCFSim.current_annual_fcf_n_1246")}
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
                {t("ReverseDCFSim.near_term_growth_rat_1247")}
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
                {t("ReverseDCFSim.cost_of_capital_wacc_1248")}
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
              💡 {t("ReverseDCFSim.action_oriented_reve_1249")}
            </strong>
            {t("ReverseDCFSim.drag_market_cap_up_t_1250")}
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
                  {t("ReverseDCFSim.10_year_fcf_trajecto_1251")}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                CAP: ~{impliedCapYears} {t("ReverseDCFSim.years_1252")}
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
                        prefix={isEnglish ? "$" : ""} unit={isEnglish ? "M" : " Mn $"}
                        valueFormatter={(val, name) => {
                          const label = name === "fcf"
                            ? (t("ReverseDCFSim.projected_fcf_1253"))
                            : (t("ReverseDCFSim.discounted_pv_1254"));
                          return isEnglish ? `\$\${val}M (\${label})` : `\${val} Mn \$ (\${label})`;
                        }}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                    formatter={(value) => (value === "fcf" ? (t("ReverseDCFSim.projected_fcf_1255")) : (t("ReverseDCFSim.discounted_pv_1256")))}
                  />
                  <Area type="monotone" dataKey="fcf" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} name={t("ReverseDCFSim.projected_fcf_1257")} />
                  <Area type="monotone" dataKey="pvFcf" stroke="#10B981" fill="#10B981" fillOpacity={0.4} strokeWidth={2} name={t("ReverseDCFSim.discounted_pv_1258")} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Value Decomposition & Margin of Safety Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t("ReverseDCFSim.enterprise_value_bre_1259")}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block">
                  {t("ReverseDCFSim.steady_state_base_va_1260")}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-emerald-900 dark:text-emerald-100">
                  ${formatCurrency(steadyStateValue * 1000000)}
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  ${formatPercent(steadyStatePercentage, 0)} {t("ReverseDCFSim.tangible_current_pr_1261")}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 block">
                  {t("ReverseDCFSim.future_growth_expect_1262")}
                </span>
                <div className="font-mono font-black text-base sm:text-lg text-indigo-900 dark:text-indigo-100">
                  ${formatCurrency(Math.max(0, marketCap - steadyStateValue) * 1000000)}
                </div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 block">
                  ${formatPercent(futureValuePercentage, 0)} {t("ReverseDCFSim.future_growth_hopes_1263")}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>
                {impliedCapYears >= 15
                  ? t("ReverseDCFSim.extreme_moat_expecta_1264")
                  : impliedCapYears <= 5
                  ? t("ReverseDCFSim.high_margin_of_safet_1265")
                  : t("ReverseDCFSim.balanced_valuation_m_1266")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-reverse-dcf-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("ReverseDCFSim.see_the_calculation_1267")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("ReverseDCFSim.hide_1268")) : (t("ReverseDCFSim.show_1269"))}</span>
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
                    Steady-State Value = Current FCF (${currentFCF}M) / WACC (${formatPercent(wacc, 1)}) = ${formatCurrency(steadyStateValue * 1000000)} (${formatPercent(steadyStatePercentage, 0)})
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    PVGO (Present Value of Growth Options) = Market Cap (${formatCurrency(marketCap * 1000000)}) - Steady-State Value (${formatCurrency(steadyStateValue * 1000000)}) = ${formatCurrency(Math.max(0, marketCap - steadyStateValue) * 1000000)} (${formatPercent(futureValuePercentage, 0)})
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
                  {t("ReverseDCFSim.mauboussin_rappaport_1270")}
                </p>
              </div>

              {/* Actionable Reverse DCF Experiments */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t("ReverseDCFSim.pedagogical_reverse_1271")}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    👉 <strong className="text-indigo-900 dark:text-indigo-300">{t("ReverseDCFSim.high_expectations_tr_1272")}</strong>{" "}
                    {t("ReverseDCFSim.when_pvgo_exceeds_70_1273")}
                  </p>
                  <p>
                    👉 <strong className="text-emerald-900 dark:text-emerald-300">{t("ReverseDCFSim.deep_value_steady_st_1274")}</strong>{" "}
                    {t("ReverseDCFSim.when_steady_state_va_1275")}
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
