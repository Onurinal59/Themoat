import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Swords,
  RotateCcw,
  Trophy,
  BarChart3,
  Calculator,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CustomChartTooltip } from "../ChartTooltip";

type StrategyType = "tit-for-tat" | "aggressive" | "cooperative";

interface RoundResult {
  round: number;
  playerChoice: 220 | 200;
  botChoice: 220 | 200;
  playerPayoff: number;
  botPayoff: number;
  playerCum: number;
  botCum: number;
}

const STRATEGIES: Array<{ id: StrategyType; labelKey: string }> = [
  { id: "tit-for-tat", labelKey: "PrisonersDilemmaSim.strategy_tit_for_tat" },
  { id: "aggressive", labelKey: "PrisonersDilemmaSim.strategy_aggressive" },
  { id: "cooperative", labelKey: "PrisonersDilemmaSim.strategy_cooperative" },
];

export const PrisonersDilemmaSim: React.FC = () => {
  const { t, formatCurrency, formatUsdFromMillions } = useLanguage();
  const [botStrategy, setBotStrategy] = useState<StrategyType>("tit-for-tat");
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);
  const maxRounds = 5;

  const totalPlayerScore = history.reduce((sum, r) => sum + r.playerPayoff, 0);
  const totalBotScore = history.reduce((sum, r) => sum + r.botPayoff, 0);
  const formatPrice = (value: number) => formatCurrency(value);
  const formatPayoff = (value: number) => formatUsdFromMillions(value, 0);
  const formatPayoffPair = (player: number, rival: number) => `${formatPayoff(player)} / ${formatPayoff(rival)}`;

  const getBotChoice = (strat: StrategyType, hist: RoundResult[]): 220 | 200 => {
    if (strat === "aggressive") return 200;
    if (strat === "cooperative") return 220;
    // Tit-for-tat
    if (hist.length === 0) return 220;
    const lastRound = hist[hist.length - 1];
    return lastRound.playerChoice;
  };

  const handlePlay = (playerChoice: 220 | 200) => {
    if (currentRound > maxRounds) return;

    const botChoice = getBotChoice(botStrategy, history);

    let playerPayoff = 0;
    let botPayoff = 0;

    if (playerChoice === 220 && botChoice === 220) {
      playerPayoff = 300;
      botPayoff = 300;
    } else if (playerChoice === 200 && botChoice === 220) {
      playerPayoff = 320;
      botPayoff = 120;
    } else if (playerChoice === 220 && botChoice === 200) {
      playerPayoff = 120;
      botPayoff = 320;
    } else {
      playerPayoff = 200;
      botPayoff = 200;
    }

    const prevPlayerCum = history.length > 0 ? history[history.length - 1].playerCum : 0;
    const prevBotCum = history.length > 0 ? history[history.length - 1].botCum : 0;

    const newResult: RoundResult = {
      round: currentRound,
      playerChoice,
      botChoice,
      playerPayoff,
      botPayoff,
      playerCum: prevPlayerCum + playerPayoff,
      botCum: prevBotCum + botPayoff,
    };

    setHistory((prev) => [...prev, newResult]);
    setCurrentRound((prev) => prev + 1);
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentRound(1);
  };

  // Recharts Line Data (Round 1 to 5)
  const chartData = [
    { round: t("PrisonersDilemmaSim.start_label"), player: 0, bot: 0 },
    ...history.map((h) => ({
      round: t("PrisonersDilemmaSim.round_label", undefined, { round: h.round }),
      player: h.playerCum,
      bot: h.botCum,
    })),
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="game-theory-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {t("PrisonersDilemmaSim.step_6_interactive_t_1134")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {t("PrisonersDilemmaSim.game_theory_nash_equ_1135")}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t("PrisonersDilemmaSim.airline_duopoly_pric_1136")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {t("PrisonersDilemmaSim.compete_against_riva_1137")}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t("PrisonersDilemmaSim.reset_arena_1138")}
        </button>
      </div>

      {/* Opponent Strategy Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t("PrisonersDilemmaSim.opponent_ai_strategy_1139")}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {STRATEGIES.map((strat) => (
            <button
              key={strat.id}
              onClick={() => {
                setBotStrategy(strat.id);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                botStrategy === strat.id
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {t(strat.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Terminal Architecture (grid lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Moves & Payoff Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              {t("PrisonersDilemmaSim.season_action", undefined, {
                round: Math.min(currentRound, maxRounds),
                total: maxRounds,
              })}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {currentRound > maxRounds
                ? t("PrisonersDilemmaSim.finished_1140")
                : t("PrisonersDilemmaSim.round_label", undefined, { round: currentRound })}
            </span>
          </div>

          {/* Action Buttons */}
          {currentRound <= maxRounds ? (
            <div className="space-y-2">
              <button
                onClick={() => handlePlay(220)}
                className="w-full p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-left font-bold text-xs transition-all shadow-sm cursor-pointer space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span>🕊️ {t("PrisonersDilemmaSim.maintain_high_price_1141", undefined, { highPrice: formatPrice(220) })}</span>
                  <span className="font-mono text-emerald-100 text-[11px]">
                    {t("PrisonersDilemmaSim.cooperation_payoff", undefined, { payoff: `+${formatPayoff(300)}` })}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 font-normal">
                  {t("PrisonersDilemmaSim.cooperative_strategy_1142")}
                </p>
              </button>

              <button
                onClick={() => handlePlay(200)}
                className="w-full p-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-left font-bold text-xs transition-all shadow-sm cursor-pointer space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span>⚔️ {t("PrisonersDilemmaSim.slash_price_200_war_1143", undefined, { lowPrice: formatPrice(200) })}</span>
                  <span className="font-mono text-rose-100 text-[11px]">
                    {t("PrisonersDilemmaSim.unilateral_payoff", undefined, { payoff: `+${formatPayoff(320)}` })}
                  </span>
                </div>
                <p className="text-[11px] text-rose-100 font-normal">
                  {t("PrisonersDilemmaSim.undercut_rival_to_gr_1144")}
                </p>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-center space-y-2">
              <Trophy className="w-6 h-6 text-amber-500 mx-auto" />
              <div className="font-bold text-xs text-indigo-950 dark:text-indigo-200">
                {t("PrisonersDilemmaSim.5_season_tournament_1145")}
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 cursor-pointer"
              >
                {t("PrisonersDilemmaSim.play_again_1146")}
              </button>
            </div>
          )}

          {/* Payoff Matrix Table */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-[11px] space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              {t("PrisonersDilemmaSim.payoff_matrix_m_prof_1147")}
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-center font-mono">
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {t("PrisonersDilemmaSim.both_220_coop_1148", undefined, { highPrice: formatPrice(220) })}
                </span>
                {formatPayoffPair(300, 300)}
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {t("PrisonersDilemmaSim.you_200_rival_220_1149", undefined, {
                    lowPrice: formatPrice(200),
                    highPrice: formatPrice(220),
                  })}
                </span>
                {formatPayoffPair(320, 120)}
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {t("PrisonersDilemmaSim.you_220_rival_200_1150", undefined, {
                    highPrice: formatPrice(220),
                    lowPrice: formatPrice(200),
                  })}
                </span>
                {formatPayoffPair(120, 320)}
              </div>
              <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {t("PrisonersDilemmaSim.both_200_nash_1151", undefined, { lowPrice: formatPrice(200) })}
                </span>
                {formatPayoffPair(200, 200)}
              </div>
            </div>
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {t("PrisonersDilemmaSim.action_oriented_game_1152")}
            </strong>
            {t("PrisonersDilemmaSim.click_slash_price_20_1153", undefined, {
              lowPrice: formatPrice(200),
              nashPayoff: formatPayoff(200),
            })}
          </div>
        </div>

        {/* Right Column: Recharts Cumulative Curve & Game Log (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Recharts Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t("PrisonersDilemmaSim.cumulative_earnings_1154")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="text-emerald-600">
                  {t("PrisonersDilemmaSim.you_1155")}: {formatPayoff(totalPlayerScore)}
                </span>
                <span className="text-rose-600">
                  {t("PrisonersDilemmaSim.rival_1156")}: {formatPayoff(totalBotScore)}
                </span>
              </div>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="round" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} tickFormatter={(value) => formatPayoff(Number(value))} />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val, name) => [
                          formatPayoff(Number(val)),
                          name === "player"
                            ? t("PrisonersDilemmaSim.your_airline_1157")
                            : t("PrisonersDilemmaSim.rival_airline_b_1158"),
                        ]}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                    formatter={(value) => (value === "player" ? (t("PrisonersDilemmaSim.your_firm_1159")) : (t("PrisonersDilemmaSim.rival_b_1160")))}
                  />
                  <Line type="monotone" dataKey="player" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="bot" stroke="#F43F5E" strokeWidth={3} dot={{ r: 4 }} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic History Log */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t("PrisonersDilemmaSim.round_by_round_break_1161")}
            </h4>

            {history.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                {t("PrisonersDilemmaSim.click_a_price_button_1162")}
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {history.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-mono">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {t("PrisonersDilemmaSim.history_round", undefined, {
                        round: r.round,
                        playerPrice: formatPrice(r.playerChoice),
                        rivalPrice: formatPrice(r.botChoice),
                      })}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-emerald-600 font-bold">+{formatPayoff(r.playerPayoff)}</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-rose-600 font-bold">+{formatPayoff(r.botPayoff)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Disclosure: "See the calculation / Hesabı gör" Collapsible Panel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-toggle-prisoners-sim-details"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {t("PrisonersDilemmaSim.see_the_calculation_1163")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            <span>{showCalculationDetails ? (t("PrisonersDilemmaSim.hide_1164")) : (t("PrisonersDilemmaSim.show_1165"))}</span>
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
              id="prisoners-sim-calculation-breakdown"
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
                  <span>{t("PrisonersDilemmaSim.game_theory_pricing_1166")}</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-indigo-950 dark:text-indigo-100 font-bold bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/80">
                  <span>{t("PrisonersDilemmaSim.both_cooperate_220_2_1167", undefined, {
                    highPrice: formatPrice(220),
                    cooperationPayoff: formatPayoff(100),
                    totalProfit: formatPayoff(200),
                  })}</span>
                  <br />
                  <span>{t("PrisonersDilemmaSim.one_defects_200_vs_2_1168", undefined, {
                    lowPrice: formatPrice(200),
                    highPrice: formatPrice(220),
                    defectorPayoff: formatPayoff(120),
                    cooperatorPayoff: formatPayoff(40),
                    totalProfit: formatPayoff(160),
                  })}</span>
                  <br />
                  <span>{t("PrisonersDilemmaSim.both_defect_200_200_1169", undefined, {
                    lowPrice: formatPrice(200),
                    defectPayoff: formatPayoff(60),
                    totalProfit: formatPayoff(120),
                  })}</span>
                </div>
              </div>

              {/* Step-by-Step Diagnostic Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("PrisonersDilemmaSim.nash_equilibrium_vs_1170")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-rose-500 block font-bold mb-1">
                      {t("PrisonersDilemmaSim.the_pricing_war_trap_1171")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {t("PrisonersDilemmaSim.undercutting_prices_1172")}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-emerald-600 block font-bold mb-1">
                      {t("PrisonersDilemmaSim.tit_for_tat_rational_1173")}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {t("PrisonersDilemmaSim.cooperating_by_defau_1174")}
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
