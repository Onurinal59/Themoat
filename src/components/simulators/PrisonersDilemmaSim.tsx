import React, { useState } from "react";
import {
  Swords,
  RotateCcw,
  Trophy,
  ShieldAlert,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
  BarChart3,
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

export const PrisonersDilemmaSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [botStrategy, setBotStrategy] = useState<StrategyType>("tit-for-tat");
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const maxRounds = 5;

  const totalPlayerScore = history.reduce((sum, r) => sum + r.playerPayoff, 0);
  const totalBotScore = history.reduce((sum, r) => sum + r.botPayoff, 0);

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
    { round: "Start", player: 0, bot: 0 },
    ...history.map((h) => ({
      round: `R${h.round}`,
      player: h.playerCum,
      bot: h.botCum,
      playerMove: `$${h.playerChoice}`,
      botMove: `$${h.botChoice}`,
    })),
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs" id="game-theory-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Step 6 Interactive Terminal" : "6. Adım İnteraktif Terminal"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Game Theory & Nash Equilibrium" : "Oyun Teorisi & Nash Dengesi"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Airline Duopoly Price War Simulation" : "Havayolu İkili Tekel Fiyat Savaşı Simülatörü"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {isEnglish
              ? "Compete against rival Airline B on the NY-London route across 5 seasonal quarters. Make your pricing move on the left, monitor real-time cumulative profit curves on the right."
              : "New York - Londra hattında rakip B Havayolu ile 5 sezon boyunca yarışın. Soldan fiyat hamlenizi yapın; sağdaki grafikte kümülatif kâr eğrilerinin nasıl ayrıştığını canlı izleyin."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset Arena" : "Arenayı Sıfırla"}
        </button>
      </div>

      {/* Opponent Strategy Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {isEnglish ? "Opponent AI Strategy:" : "Rakip (B Havayolu) Karakteri:"}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "tit-for-tat", labelTr: "Kısasa Kısas (Tit-for-Tat)", labelEn: "Tit-for-Tat (Reciprocal)" },
            { id: "aggressive", labelTr: "Daima Fiyat Kıran (Agresif)", labelEn: "Always Price Cut (Aggressive)" },
            { id: "cooperative", labelTr: "Daima Barışçıl (İşbirlikçi)", labelEn: "Always Cooperate (Peaceful)" },
          ].map((strat) => (
            <button
              key={strat.id}
              onClick={() => {
                setBotStrategy(strat.id as StrategyType);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                botStrategy === strat.id
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {isEnglish ? strat.labelEn : strat.labelTr}
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
              {isEnglish ? `Season ${Math.min(currentRound, 5)} / 5 Action:` : `${Math.min(currentRound, 5)}. Sezon Hamleniz:`}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {currentRound > maxRounds ? (isEnglish ? "Finished" : "Tamamlandı") : `${currentRound}. Tur`}
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
                  <span>🕊️ {isEnglish ? "Maintain High Price ($220)" : "Yüksek Fiyatı Koru ($220)"}</span>
                  <span className="font-mono text-emerald-100 text-[11px]">+300M$ (İşbirliği)</span>
                </div>
                <p className="text-[11px] text-emerald-100 font-normal">
                  {isEnglish ? "Cooperative strategy aiming for shared monopoly profit." : "Rakiple zımni anlaşma sağlayarak ortak kârı maksimize etmeye çalışır."}
                </p>
              </button>

              <button
                onClick={() => handlePlay(200)}
                className="w-full p-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-left font-bold text-xs transition-all shadow-sm cursor-pointer space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span>⚔️ {isEnglish ? "Slash Price ($200 War)" : "Fiyat Kır ($200 Savaş)"}</span>
                  <span className="font-mono text-rose-100 text-[11px]">+320M$ (Tek Taraflı)</span>
                </div>
                <p className="text-[11px] text-rose-100 font-normal">
                  {isEnglish ? "Undercut rival to grab volume; risks retaliatory price war." : "Rakibin pazarını kapmak için fiyat kırar; misilleme riskini başlatır."}
                </p>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-center space-y-2">
              <Trophy className="w-6 h-6 text-amber-500 mx-auto" />
              <div className="font-bold text-xs text-indigo-950 dark:text-indigo-200">
                {isEnglish ? "5-Season Tournament Completed!" : "5 Sezonluk Turnuva Tamamlandı!"}
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 cursor-pointer"
              >
                {isEnglish ? "Play Again" : "Yeniden Oyna"}
              </button>
            </div>
          )}

          {/* Payoff Matrix Table */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-[11px] space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              {isEnglish ? "Payoff Matrix ($M Profit):" : "Kâr Matrisi (Milyon $):"}
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-center font-mono">
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {isEnglish ? "Both $220 (Coop)" : "İki Taraf $220"}
                </span>
                300M$ / 300M$
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {isEnglish ? "You $200 / Rival $220" : "Sen $200 / Rakip $220"}
                </span>
                320M$ / 120M$
              </div>
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {isEnglish ? "You $220 / Rival $200" : "Sen $220 / Rakip $200"}
                </span>
                120M$ / 320M$
              </div>
              <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300">
                <span className="block text-[9px] font-sans text-slate-400">
                  {isEnglish ? "Both $200 (Nash)" : "İki Taraf $200"}
                </span>
                200M$ / 200M$
              </div>
            </div>
          </div>

          {/* Action-Oriented Pedagogical Directive */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-1">
              💡 {isEnglish ? "Action-Oriented Game Theory Experiment:" : "Eyleme Dönük Oyun Teorisi Deneyi:"}
            </strong>
            {isEnglish
              ? "Click 'Slash Price ($200)'. Notice on the right chart how your profit spikes in Round 1, but Tit-for-Tat immediately retaliates in Round 2, locking both airlines into the low-margin $200M Nash Trap."
              : "Soldaki 'Fiyat Kır ($200)' butonuna basın. Sağdaki grafikte 1. turda kârınızın sıçradığını, fakat 2. turdan itibaren rakibin misilleme yaparak her iki havayolunu da 200M$'lık düşük kâr kapanına (Nash Dengesi) kilitlediğini izleyin."}
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
                  {isEnglish ? "Cumulative Earnings Over 5 Seasons ($M)" : "5 Sezonluk Kümülatif Kâr Eğrisi (Milyon $)"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="text-emerald-600">
                  {isEnglish ? "You" : "Sen"}: ${totalPlayerScore}M
                </span>
                <span className="text-rose-600">
                  {isEnglish ? "Rival" : "Rakip"}: ${totalBotScore}M
                </span>
              </div>
            </div>

            <div className="h-56 sm:h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="round" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="M" />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        valueFormatter={(val, name) => [
                          `$${val}M`,
                          name === "player"
                            ? isEnglish
                              ? "Your Airline"
                              : "Sizin Havayolunuz"
                            : isEnglish
                            ? "Rival Airline B"
                            : "Rakip B",
                        ]}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                    formatter={(value) => (value === "player" ? (isEnglish ? "Your Firm" : "Sizin Şirketiniz") : (isEnglish ? "Rival B" : "Rakip B"))}
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
              {isEnglish ? "Round-by-Round Breakdown:" : "Sezonluk Karşılaşma Dökümü:"}
            </h4>

            {history.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                {isEnglish ? "Click a price button on the left to start Round 1." : "1. Sezonu başlatmak için soldaki fiyat butonlarından birine tıklayın."}
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {history.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-mono">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      R{r.round}: {isEnglish ? `You ($${r.playerChoice}) vs Rival ($${r.botChoice})` : `Sen ($${r.playerChoice}) vs Rakip ($${r.botChoice})`}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-emerald-600 font-bold">+{r.playerPayoff}M$</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-rose-600 font-bold">+{r.botPayoff}M$</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
