import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Layers,
  Sparkles,
  Sliders,
  Award,
  ArrowRight,
  Info,
  DollarSign,
  Percent,
  CheckCircle2,
  HelpCircle,
  Calculator,
  ChevronDown,
  BookOpen
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";

export const ReinvestmentRunwaySim: React.FC = () => {
  const { isEnglish, t } = useLanguage();

  // Company A: High ROIC, Low Reinvestment (e.g. See's Candies / Pure Cash Cow)
  const [compARoic, setCompARoic] = useState<number>(45);
  const [compAReinvest, setCompAReinvest] = useState<number>(10); // %
  
  // Company B: Moderate ROIC, High Reinvestment Runway (e.g. Costco / Amazon / Walmart in 1990s)
  const [compBRoic, setCompBRoic] = useState<number>(18);
  const [compBReinvest, setCompBReinvest] = useState<number>(80); // %

  const [wacc, setWacc] = useState<number>(9.0);
  const [initialCapital, setInitialCapital] = useState<number>(100); // $M
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Simulate 15 years for both companies
  const simulationYears = 15;
  
  let capA = initialCapital;
  let capB = initialCapital;
  
  const simulationData = [];

  for (let yr = 1; yr <= simulationYears; yr++) {
    // Company A
    const nopatA = capA * (compARoic / 100);
    const reinvestedA = nopatA * (compAReinvest / 100);
    const fcfA = nopatA - reinvestedA;
    const epA = capA * ((compARoic - wacc) / 100);
    capA += reinvestedA;

    // Company B
    const nopatB = capB * (compBRoic / 100);
    const reinvestedB = nopatB * (compBReinvest / 100);
    const fcfB = nopatB - reinvestedB;
    const epB = capB * ((compBRoic - wacc) / 100);
    capB += reinvestedB;

    simulationData.push({
      year: `${yr}. ${t("ReinvestmentRunwaySim.yr_1206")}`,
      yearNum: yr,
      nopatA: Number(nopatA.toFixed(1)),
      nopatB: Number(nopatB.toFixed(1)),
      epA: Number(epA.toFixed(1)),
      epB: Number(epB.toFixed(1)),
      capA: Number(capA.toFixed(1)),
      capB: Number(capB.toFixed(1)),
    });
  }

  const finalYear = simulationData[simulationData.length - 1];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/10 border border-indigo-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-wider mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              {t("ReinvestmentRunwaySim.the_triad_spread_rei_1207")}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("ReinvestmentRunwaySim.high_roic_cash_cow_v_1208")}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {t("ReinvestmentRunwaySim.michael_mauboussin_e_1209")}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company A Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              {t("ReinvestmentRunwaySim.company_a_high_roic_1210")}
            </h3>
            <span className="text-xs font-bold text-slate-500">Örn: See's Candies</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">ROIC (%)</span>
              <span className="font-black text-rose-500 font-mono">%{compARoic}</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={compARoic}
              onChange={(e) => setCompARoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {t("ReinvestmentRunwaySim.reinvestment_rate_1211")}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">%{compAReinvest}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={compAReinvest}
              onChange={(e) => setCompAReinvest(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Company B Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              {t("ReinvestmentRunwaySim.company_b_moderate_r_1212")}
            </h3>
            <span className="text-xs font-bold text-slate-500">Örn: Costco / Walmart 1990</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">ROIC (%)</span>
              <span className="font-black text-emerald-500 font-mono">%{compBRoic}</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              value={compBRoic}
              onChange={(e) => setCompBRoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {t("ReinvestmentRunwaySim.reinvestment_rate_1213")}
              </span>
              <span className="font-black text-slate-900 dark:text-white font-mono">%{compBReinvest}</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={compBReinvest}
              onChange={(e) => setCompBReinvest(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              {t("ReinvestmentRunwaySim.15_year_annual_net_o_1214")}
            </h3>
            <p className="text-xs text-slate-500">
              {t("ReinvestmentRunwaySim.observe_where_compan_1215")}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-rose-500">
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              {t("ReinvestmentRunwaySim.company_a_nopat_m_1216")}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              {t("ReinvestmentRunwaySim.company_b_nopat_m_1217")}
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={simulationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 shadow-xl space-y-1">
                        <p className="font-bold text-slate-300">{d.year}</p>
                        <p className="text-rose-400 font-mono">Şirket A NOPAT: ${d.nopatA}M (Sermaye: ${d.capA}M)</p>
                        <p className="text-emerald-400 font-mono">Şirket B NOPAT: ${d.nopatB}M (Sermaye: ${d.capB}M)</p>
                        <p className="text-amber-300 font-bold border-t border-slate-800 pt-1">
                          Şirket B Ekonomik Kârı: ${d.epB}M vs A: ${d.epA}M
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="nopatA" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nopatB" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 15-Year Takeaway Summary */}
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                {t("ReinvestmentRunwaySim.15_year_nopat_outcom_1218")}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {isEnglish
                  ? `Company B generates $${finalYear?.nopatB}M/yr vs Company A's $${finalYear?.nopatA}M/yr.`
                  : `Şirket B yılda $${finalYear?.nopatB}M kâr üretirken, Şirket A sadece $${finalYear?.nopatA}M kârda kalmıştır.`}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {t("ReinvestmentRunwaySim.key_moat_takeaway_1219")}
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("ReinvestmentRunwaySim.reinvestment_runway_1220")}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1 border-t border-indigo-500/10">
            {t("ReinvestmentRunwaySim.illustrative_teachin_1221")}
          </p>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-runway-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("ReinvestmentRunwaySim.see_the_calculation_1222")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("ReinvestmentRunwaySim.hide_1223")) : (t("ReinvestmentRunwaySim.show_1224"))}</span>
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
              id="runway-sim-calculation-breakdown"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-5"
            >
              {/* Formula Blueprint */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t("ReinvestmentRunwaySim.reinvestment_compoun_1225")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("ReinvestmentRunwaySim.fundamental_growth_g_1226")}</span>
                  <br />
                  <span>{t("ReinvestmentRunwaySim.invested_capital_t_1_1227")}</span>
                  <br />
                  <span>{t("ReinvestmentRunwaySim.economic_profit_inve_1228")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("ReinvestmentRunwaySim.step_by_step_numeric_1229")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-rose-500 block font-black">
                      {isEnglish ? `Company A (High ROIC %${compARoic}, Reinvest %${compAReinvest})` : `Şirket A (Yüksek ROIC %${compARoic}, Yatırım %${compAReinvest})`}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Intrinsic Growth: ${(compARoic * (compAReinvest / 100)).toFixed(1)}%/yr. Yr 15 Capital: $${finalYear?.capA}M | Final NOPAT: $${finalYear?.nopatA}M/yr`
                        : `İçsel Büyüme: %${(compARoic * (compAReinvest / 100)).toFixed(1)}/yıl. 15. Yıl Sermaye: $${finalYear?.capA}M | Yıllık Kâr: $${finalYear?.nopatA}M`}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-emerald-500 block font-black">
                      {isEnglish ? `Company B (Moderate ROIC %${compBRoic}, Reinvest %${compBReinvest})` : `Şirket B (Ilımlı ROIC %${compBRoic}, Yatırım %${compBReinvest})`}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEnglish
                        ? `Intrinsic Growth: ${(compBRoic * (compBReinvest / 100)).toFixed(1)}%/yr. Yr 15 Capital: $${finalYear?.capB}M | Final NOPAT: $${finalYear?.nopatB}M/yr`
                        : `İçsel Büyüme: %${(compBRoic * (compBReinvest / 100)).toFixed(1)}/yıl. 15. Yıl Sermaye: $${finalYear?.capB}M | Yıllık Kâr: $${finalYear?.nopatB}M`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
