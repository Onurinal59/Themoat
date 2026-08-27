import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Target,
  Award,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  Trophy,
  Swords,
  Layers,
  BarChart3,
  Calculator,
  ChevronDown,
  BookOpen,
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
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

export const ColonelBlottoSim: React.FC = () => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  const [b1, setB1] = useState<number>(35);
  const [b2, setB2] = useState<number>(35);
  const [b3, setB3] = useState<number>(30);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Opponent default allocation (Exhibit 37: 30, 30, 40)
  const oppB1 = 30;
  const oppB2 = 30;
  const oppB3 = 40;

  const totalSoldiers = b1 + b2 + b3;
  const isValid = totalSoldiers === 100;

  // Battle outcomes
  const win1 = b1 > oppB1;
  const tie1 = b1 === oppB1;
  const win2 = b2 > oppB2;
  const tie2 = b2 === oppB2;
  const win3 = b3 > oppB3;
  const tie3 = b3 === oppB3;

  const playerWins = (win1 ? 1 : 0) + (win2 ? 1 : 0) + (win3 ? 1 : 0);
  const oppWins = (!win1 && !tie1 ? 1 : 0) + (!win2 && !tie2 ? 1 : 0) + (!win3 && !tie3 ? 1 : 0);

  const overallWinner =
    playerWins > oppWins
      ? t("ColonelBlottoSim.strategic_victory_2_856")
      : oppWins > playerWins
      ? t("ColonelBlottoSim.incumbent_retains_d_857")
      : t("ColonelBlottoSim.stalemate_tie_858");

  const handlePreset = (alloc: [number, number, number]) => {
    setB1(alloc[0]);
    setB2(alloc[1]);
    setB3(alloc[2]);
  };

  // Recharts Data
  const chartData = [
    {
      name: t("ColonelBlottoSim.front_1_core_859"),
      player: b1,
      incumbent: oppB1,
    },
    {
      name: t("ColonelBlottoSim.front_2_growth_860"),
      player: b2,
      incumbent: oppB2,
    },
    {
      name: t("ColonelBlottoSim.front_3_niche_861"),
      player: b3,
      incumbent: oppB3,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="blotto-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("ColonelBlottoSim.module_6_strategy_te_862")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("ColonelBlottoSim.colonel_blotto_asymm_863")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("ColonelBlottoSim.colonel_blotto_strat_864")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("ColonelBlottoSim.allocate_your_100_un_865")}
          </p>
        </div>

        <button
          onClick={() => handlePreset([35, 35, 30])}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("ColonelBlottoSim.reset_866")}
        </button>
      </div>

      {/* Preset Strategies */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {t("ColonelBlottoSim.preset_allocation_ga_867")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { nameTr: "Odaklanmış Saldırı (35-35-30)", nameEn: "Focused Attack (35-35-30)", alloc: [35, 35, 30] as [number, number, number] },
            { nameTr: "Eşit Dağılım (33-33-34)", nameEn: "Equal Spread (33-33-34)", alloc: [33, 33, 34] as [number, number, number] },
            { nameTr: "Niş Yıldırım (10-45-45)", nameEn: "Niche Blitz (10-45-45)", alloc: [10, 45, 45] as [number, number, number] },
            { nameTr: "Ana Pazar Kalesi (55-25-20)", nameEn: "Core Fortress (55-25-20)", alloc: [55, 25, 20] as [number, number, number] },
          ].map((g, idx) => (
            <button
              key={idx}
              onClick={() => handlePreset(g.alloc)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left text-xs transition-all cursor-pointer hover:border-indigo-300"
            >
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                {isEnglish ? g.nameEn : g.nameTr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3 Battlefield Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t("ColonelBlottoSim.deploy_100_budget_un_868")}
            </h3>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isValid
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
              }`}
            >
              {totalSoldiers} / 100
            </span>
          </div>

          {/* Front 1 Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? `Front 1: Core Market (Rival: ${oppB1})` : `1. Cephe: Ana Pazar (Rakip: ${oppB1})`}
              </span>
              <span className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
                {b1} {t("ColonelBlottoSim.units_869")} ({win1 ? (t("ColonelBlottoSim.won_870")) : tie1 ? (t("ColonelBlottoSim.tied_871")) : (t("ColonelBlottoSim.lost_872"))})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={b1}
              onChange={(e) => setB1(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Front 2 Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? `Front 2: Growth Segment (Rival: ${oppB2})` : `2. Cephe: Büyüme Segmenti (Rakip: ${oppB2})`}
              </span>
              <span className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
                {b2} {t("ColonelBlottoSim.units_873")} ({win2 ? (t("ColonelBlottoSim.won_874")) : tie2 ? (t("ColonelBlottoSim.tied_875")) : (t("ColonelBlottoSim.lost_876"))})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={b2}
              onChange={(e) => setB2(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Front 3 Slider */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? `Front 3: Niche / R&D (Rival: ${oppB3})` : `3. Cephe: Niş / Ar-Ge (Rakip: ${oppB3})`}
              </span>
              <span className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
                {b3} {t("ColonelBlottoSim.units_877")} ({win3 ? (t("ColonelBlottoSim.won_878")) : tie3 ? (t("ColonelBlottoSim.tied_879")) : (t("ColonelBlottoSim.lost_880"))})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={b3}
              onChange={(e) => setB3(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {t("ColonelBlottoSim.action_oriented_blot_881")}
            </strong>
            {t("ColonelBlottoSim.notice_that_the_incu_882")}
          </div>
        </div>

        {/* Right Column: Recharts Chart & Battle Diagnostic Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("ColonelBlottoSim.battlefield_deployme_883")}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                {t("ColonelBlottoSim.score_884")}{playerWins} - {oppWins}
              </span>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val, name) => [
                          `${val} ${t("ColonelBlottoSim.units_885")}`,
                          name === "player"
                            ? t("ColonelBlottoSim.your_strategy_886")
                            : t("ColonelBlottoSim.incumbent_rival_887"),
                        ]}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                    formatter={(val) => (val === "player" ? (t("ColonelBlottoSim.your_strategy_888")) : (t("ColonelBlottoSim.incumbent_rival_889")))}
                  />
                  <Bar dataKey="player" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incumbent" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Diagnosis Battle Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {t("ColonelBlottoSim.market_war_outcome_890")}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {overallWinner}
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  playerWins >= 2
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
                    : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300"
                }`}
              >
                {playerWins} / 3 {t("ColonelBlottoSim.fronts_891")}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {playerWins >= 2
                ? t("ColonelBlottoSim.asymmetric_efficienc_892")
                : t("ColonelBlottoSim.sub_optimal_resource_893")}
            </p>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-blotto-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("ColonelBlottoSim.see_the_calculation_894")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("ColonelBlottoSim.hide_895")) : (t("ColonelBlottoSim.show_896"))}</span>
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
              id="blotto-sim-calculation-breakdown"
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
                  <span>{t("ColonelBlottoSim.game_theory_blotto_p_897")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("ColonelBlottoSim.battlefield_outcome_898")}</span>
                  <br />
                  <span>{t("ColonelBlottoSim.budget_constraint_bi_899")}</span>
                  <br />
                  <span>{t("ColonelBlottoSim.dominant_strategy_wi_900")}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("ColonelBlottoSim.battlefield_diagnost_901")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ColonelBlottoSim.1_high_margin_enterp_902")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {b1 > oppB1 ? (isEnglish ? `Won! (${b1} vs ${oppB1})` : `Kazanıldı! (${b1} vs ${oppB1})`) : b1 === oppB1 ? (isEnglish ? `Tied (${b1})` : `Berabere (${b1})`) : (isEnglish ? `Lost (${b1} vs ${oppB1})` : `Kaybedildi (${b1} vs ${oppB1})`)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ColonelBlottoSim.2_mid_market_segment_903")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {b2 > oppB2 ? (isEnglish ? `Won! (${b2} vs ${oppB2})` : `Kazanıldı! (${b2} vs ${oppB2})`) : b2 === oppB2 ? (isEnglish ? `Tied (${b2})` : `Berabere (${b2})`) : (isEnglish ? `Lost (${b2} vs ${oppB2})` : `Kaybedildi (${b2} vs ${oppB2})`)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 block font-bold mb-1">
                      {t("ColonelBlottoSim.3_self_serve_low_mar_904")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {b3 > oppB3 ? (isEnglish ? `Won! (${b3} vs ${oppB3})` : `Kazanıldı! (${b3} vs ${oppB3})`) : b3 === oppB3 ? (isEnglish ? `Tied (${b3})` : `Berabere (${b3})`) : (isEnglish ? `Lost (${b3} vs ${oppB3})` : `Kaybedildi (${b3} vs ${oppB3})`)}
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
