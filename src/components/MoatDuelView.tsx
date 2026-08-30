import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Swords,
  TrendingUp,
  Award,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  BarChart3,
  Copy,
  Check,
  ArrowRight,
  Zap,
  DollarSign,
  Layers,
  Sparkles
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import { calculateFinancialOutputs, computeMoatScore, translateMoatDriver, translateMoatWidth, translateMoatType } from "../data/companyAuditData";

interface MoatDuelViewProps {
  dossiers: CompanyAuditDossier[];
  onOpenAuditStudio?: (dossierId: string) => void;
  onOpenAICoachWithPrompt?: (prompt: string) => void;
}

export const MoatDuelView: React.FC<MoatDuelViewProps> = ({
  dossiers,
  onOpenAuditStudio,
  onOpenAICoachWithPrompt,
}) => {
  const { isEnglish, t , formatPercentagePoints, formatUsdFromMillions, formatUsdFromBillions, formatMultiplier, formatDurationYears } = useLanguage();
  // Select initial two dossiers
  const [comp1Id, setComp1Id] = useState<string>(dossiers[0]?.id || "");
  const [comp2Id, setComp2Id] = useState<string>(dossiers[1]?.id || dossiers[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const comp1 = dossiers.find((d) => d.id === comp1Id) || dossiers[0];
  const comp2 = dossiers.find((d) => d.id === comp2Id) || dossiers[1] || dossiers[0];

  if (!comp1 || !comp2) {
    return (
      <div className="p-8 text-center text-slate-500">
        {t("MoatDuelView.at_least_2_company_d_436")}
      </div>
    );
  }

  const fin1 = calculateFinancialOutputs(comp1.financials);
  const fin2 = calculateFinancialOutputs(comp2.financials);

  const score1 = computeMoatScore(comp1);
  const score2 = computeMoatScore(comp2);

  // DuPont decomposition
  const nopatMargin1 = fin1.nopatMarginPercent;
  const nopatMargin2 = fin2.nopatMarginPercent;

  const turnover1 = fin1.capitalTurnover;
  const turnover2 = fin2.capitalTurnover;

  const roic1 = fin1.roicPercent;
  const roic2 = fin2.roicPercent;

  const spread1 = fin1.spread;
  const spread2 = fin2.spread;

  // Winner logic
  const roicWinner = !fin1.isRoicMeaningful || !fin2.isRoicMeaningful ? 0 : roic1 > roic2 ? 1 : roic1 < roic2 ? 2 : 0;
  const marginWinner = nopatMargin1 > nopatMargin2 ? 1 : nopatMargin1 < nopatMargin2 ? 2 : 0;
  const turnoverWinner = turnover1 > turnover2 ? 1 : turnover1 < turnover2 ? 2 : 0;
  const spreadWinner = !fin1.isRoicMeaningful || !fin2.isRoicMeaningful ? 0 : spread1 > spread2 ? 1 : spread1 < spread2 ? 2 : 0;
  const roicLabel1 = fin1.isRoicMeaningful ? formatPercentagePoints(fin1.roicPercent, 1) : "N/M";
  const roicLabel2 = fin2.isRoicMeaningful ? formatPercentagePoints(fin2.roicPercent, 1) : "N/M";
  const spreadLabel1 = fin1.isRoicMeaningful ? formatPercentagePoints(fin1.spread, 1) : "N/M";
  const spreadLabel2 = fin2.isRoicMeaningful ? formatPercentagePoints(fin2.spread, 1) : "N/M";
  const overallWinner = score1.scorePercent > score2.scorePercent ? 1 : score1.scorePercent < score2.scorePercent ? 2 : 0;

  // Quick preset pairs
  const handleSelectPresetPair = (id1: string, id2: string) => {
    setComp1Id(id1);
    setComp2Id(id2);
  };

  const handleCopyComparison = () => {
    const disclaimer = t("MoatDuelView.educational_scenario_437");

    const summary = disclaimer + (isEnglish
      ? `⚔️ MAUBOUSSIN MOAT DUEL REPORT:
------------------------------------------
Company 1: ${comp1.companyName} (${comp1.ticker})
- ROIC: ${roicLabel1} | WACC: ${formatPercentagePoints(comp1.financials.wacc, 1)} | Spread: ${spreadLabel1}
- NOPAT Margin: ${formatPercentagePoints(fin1.nopatMarginPercent, 1)} | Capital Turnover: ${formatMultiplier(fin1.capitalTurnover, 2)}
- Moat Width: ${score1.diagnosedMoat} (Score: ${score1.scorePercent}/100)
- Estimated CAP: ${comp1.sustainability.estimatedCapYears} Years

Company 2: ${comp2.companyName} (${comp2.ticker})
- ROIC: ${roicLabel2} | WACC: ${formatPercentagePoints(comp2.financials.wacc, 1)} | Spread: ${spreadLabel2}
- NOPAT Margin: ${formatPercentagePoints(fin2.nopatMarginPercent, 1)} | Capital Turnover: ${formatMultiplier(fin2.capitalTurnover, 2)}
- Moat Width: ${score2.diagnosedMoat} (Score: ${score2.scorePercent}/100)
- Estimated CAP: ${comp2.sustainability.estimatedCapYears} Years

🏆 WINNER / METHODOLOGICAL DIAGNOSIS:
${
  overallWinner === 1
    ? `${comp1.companyName} is the duel winner with a moat score of ${score1.scorePercent} and an economic spread of ${spread1}%.`
    : overallWinner === 2
    ? `${comp2.companyName} is the duel winner with a moat score of ${score2.scorePercent} and an economic spread of ${spread2}%.`
    : "Both companies have very close moat scores."
}
${
  marginWinner === 1 && turnoverWinner === 2
    ? `📌 ${comp1.companyName} creates value via High Pricing/Margin power, while ${comp2.companyName} creates value through Lightning-Fast Capital Turnover (Classic DuPont Dichotomy).`
    : marginWinner === 2 && turnoverWinner === 1
    ? `📌 ${comp2.companyName} creates value via High Pricing/Margin power, while ${comp1.companyName} creates value through Lightning-Fast Capital Turnover.`
    : ""
}`
      : `⚔️ MAUBOUSSIN HENDEK DÜELLOSU RAPORU:
------------------------------------------
${t("MoatDuelView.company_1_438")}: ${comp1.companyName} (${comp1.ticker})
- ROIC: ${roicLabel1} | WACC: ${formatPercentagePoints(comp1.financials.wacc, 1)} | Spread: ${spreadLabel1}
- NOPAT Marjı: ${formatPercentagePoints(fin1.nopatMarginPercent, 1)} | Sermaye Devir Hızı: ${formatMultiplier(fin1.capitalTurnover, 2)}
- Hendek Genişliği: ${score1.diagnosedMoat} (Skor: ${score1.scorePercent}/100)
- Tahmini CAP: ${comp1.sustainability.estimatedCapYears} Yıl

${t("MoatDuelView.company_2_439")}: ${comp2.companyName} (${comp2.ticker})
- ROIC: ${roicLabel2} | WACC: ${formatPercentagePoints(comp2.financials.wacc, 1)} | Spread: ${spreadLabel2}
- NOPAT Marjı: ${formatPercentagePoints(fin2.nopatMarginPercent, 1)} | Sermaye Devir Hızı: ${formatMultiplier(fin2.capitalTurnover, 2)}
- Hendek Genişliği: ${score2.diagnosedMoat} (Skor: ${score2.scorePercent}/100)
- Tahmini CAP: ${comp2.sustainability.estimatedCapYears} Yıl

🏆 KAZANAN / METODOLOJİK TEŞHİS:
${
  overallWinner === 1
    ? `${comp1.companyName}, ${score1.scorePercent} hendek skoru ve %${spread1} ekonomik yayılımı ile düellonun galibidir.`
    : overallWinner === 2
    ? `${comp2.companyName}, ${score2.scorePercent} hendek skoru ve %${spread2} ekonomik yayılımı ile düellonun galibidir.`
    : "Her iki şirketin hendek skorları birbirine çok yakındır."
}
${
  marginWinner === 1 && turnoverWinner === 2
    ? `📌 ${comp1.companyName} Yüksek Fiyatlama/Marj avantajıyla, ${comp2.companyName} ise Yıldırım Hızında Sermaye Devri ile değer yaratmaktadır (Klasik DuPont Karşıtlığı).`
    : marginWinner === 2 && turnoverWinner === 1
    ? `📌 ${comp2.companyName} Yüksek Fiyatlama/Marj avantajıyla, ${comp1.companyName} ise Yıldırım Hızında Sermaye Devri ile değer yaratmaktadır.`
    : ""
}`);

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-8 pb-16"
      id="moat-duel-view"
    >
      {/* Header Banner */}
      <div className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-white rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-indigo-500/30 shadow-sm dark:shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-400/30 flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5 text-indigo-600 dark:text-amber-400" />
              {t("MoatDuelView.michael_mauboussin_m_440")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/30">
              {t("MoatDuelView.relative_competitive_441")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t("MoatDuelView.clash_two_companies_442")}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-indigo-100/80 max-w-3xl leading-relaxed">
            {t("MoatDuelView.according_to_maubous_443")}
          </p>

          {/* Educational Disclaimer */}
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl text-[11px] sm:text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed font-medium">
            {t("MoatDuelView.educational_scenario_444")}
          </div>

          {/* Quick preset matchup tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-semibold flex items-center gap-1.5 flex-wrap">
              {t("MoatDuelView.quick_matchup_preset_445")}
              <span className="text-amber-600 dark:text-amber-400 font-normal">({t("MoatDuelView.illustrative_teachin_446")})</span>
            </span>
            {dossiers.length >= 2 && (
              <>
                <button
                  onClick={() => handleSelectPresetPair(dossiers[0].id, dossiers[1]?.id || dossiers[0].id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-indigo-200 border border-slate-200 dark:border-slate-700 text-[11px] cursor-pointer transition-colors"
                >
                  🛒 {dossiers[0]?.ticker} vs {dossiers[1]?.ticker}
                </button>
                {dossiers[2] && (
                  <button
                    onClick={() => handleSelectPresetPair(dossiers[0].id, dossiers[2].id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-indigo-200 border border-slate-200 dark:border-slate-700 text-[11px] cursor-pointer transition-colors"
                  >
                    🍎 {dossiers[0]?.ticker} vs {dossiers[2]?.ticker}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Company 1 Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[11px] font-extrabold">1</span>
            {t("MoatDuelView.left_corner_company_447")}
          </label>
          <select
            value={comp1Id}
            onChange={(e) => setComp1Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {dossiers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.ticker}) — {d.industry}
              </option>
            ))}
          </select>
        </div>

        {/* Company 2 Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[11px] font-extrabold">2</span>
            {t("MoatDuelView.right_corner_company_448")}
          </label>
          <select
            value={comp2Id}
            onChange={(e) => setComp2Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            {dossiers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.ticker}) — {d.industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Duel Head-to-Head Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1 Card */}
        <div className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs space-y-6 relative transition-all ${
          overallWinner === 1 ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200 dark:border-slate-800"
        }`}>
          {overallWinner === 1 && (
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex flex-col items-center shadow-sm">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-300" /> {t("MoatDuelView.illustrative_model_o_449")}</span>
              <span className="text-[9px] text-indigo-200 font-medium">{t("MoatDuelView.based_on_selected_ed_450")}</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                {comp1.ticker}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {comp1.companyName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {comp1.industry}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {score1.scorePercent}
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {translateMoatWidth(score1.diagnosedMoat, isEnglish)}
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                ROIC
              </span>
              <span className={`text-lg font-black ${fin1.roicPercent >= 15 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                {roicLabel1}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.economic_spread_451")}
              </span>
              <span className={`text-lg font-black ${fin1.spread > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {fin1.isRoicMeaningful && fin1.spread > 0 ? `+${spreadLabel1}` : spreadLabel1}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.nopat_margin_452")}
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {formatPercentagePoints(fin1.nopatMarginPercent, 1)}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.capital_turnover_453")}
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {formatMultiplier(fin1.capitalTurnover, 2)}
              </span>
            </div>
          </div>

          {/* Moat Subdrivers Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t("MoatDuelView.moat_drivers_454")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {comp1.competitiveAdvantage.subDrivers.map((driver, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold border border-indigo-200 dark:border-indigo-800">
                  {translateMoatDriver(driver, isEnglish)}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated CAP */}
          <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">{t("MoatDuelView.illustrative_cap_ass_455")}</span>
            <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
              {comp1.sustainability.estimatedCapYears} {t("MoatDuelView.years_456")}
            </span>
          </div>
        </div>

        {/* Company 2 Card */}
        <div className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs space-y-6 relative transition-all ${
          overallWinner === 2 ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-200 dark:border-slate-800"
        }`}>
          {overallWinner === 2 && (
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex flex-col items-center shadow-sm">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-300" /> {t("MoatDuelView.illustrative_model_o_457")}</span>
              <span className="text-[9px] text-rose-200 font-medium">{t("MoatDuelView.based_on_selected_ed_458")}</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                {comp2.ticker}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {comp2.companyName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {comp2.industry}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {score2.scorePercent}
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {translateMoatWidth(score2.diagnosedMoat, isEnglish)}
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                ROIC
              </span>
              <span className={`text-lg font-black ${fin2.roicPercent >= 15 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                {roicLabel2}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.economic_spread_459")}
              </span>
              <span className={`text-lg font-black ${fin2.spread > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {fin2.isRoicMeaningful && fin2.spread > 0 ? `+${spreadLabel2}` : spreadLabel2}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.nopat_margin_460")}
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {formatPercentagePoints(fin2.nopatMarginPercent, 1)}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                {t("MoatDuelView.capital_turnover_461")}
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {formatMultiplier(fin2.capitalTurnover, 2)}
              </span>
            </div>
          </div>

          {/* Moat Subdrivers Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t("MoatDuelView.moat_drivers_462")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {comp2.competitiveAdvantage.subDrivers.map((driver, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-semibold border border-rose-200 dark:border-rose-800">
                  {translateMoatDriver(driver, isEnglish)}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated CAP */}
          <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">{t("MoatDuelView.illustrative_cap_ass_463")}</span>
            <span className="font-extrabold text-rose-700 dark:text-rose-300">
              {comp2.sustainability.estimatedCapYears} {t("MoatDuelView.years_464")}
            </span>
          </div>
        </div>
      </div>

      {/* Granular Metric-by-Metric Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          {t("MoatDuelView.head_to_head_strateg_465")}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4 font-bold">{t("MoatDuelView.strategic_metric_466")}</th>
                <th className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">{comp1.ticker}</th>
                <th className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">{comp2.ticker}</th>
                <th className="py-3 px-4 font-bold">{t("MoatDuelView.advantage_pedagogica_467")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {/* ROIC */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.roic_return_on_inves_468")}</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{roicLabel1}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{roicLabel2}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {roicWinner === 1 ? (
                    <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {comp1.ticker} {t("MoatDuelView.deploys_capital_with_469")}
                    </span>
                  ) : roicWinner === 2 ? (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {comp2.ticker} {t("MoatDuelView.deploys_capital_with_470")}
                    </span>
                  ) : (t("MoatDuelView.equal_471"))}
                </td>
              </tr>

              {/* Spread */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.economic_spread_roic_472")}</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{spreadLabel1}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{spreadLabel2}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {spreadWinner === 1
                    ? (isEnglish ? `Under these illustrative inputs, ${comp1.ticker} shows a higher economic spread in this educational model.` : `Bu temsili girdilerle, ${comp1.ticker} modelde daha yüksek yayılım gösterir.`)
                    : (isEnglish ? `Under these illustrative inputs, ${comp2.ticker} shows a higher economic spread in this educational model.` : `Bu temsili girdilerle, ${comp2.ticker} modelde daha yüksek yayılım gösterir.`)}
                </td>
              </tr>

              {/* NOPAT Margin */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.nopat_margin_pricing_473")}</td>
                <td className="py-3 px-4 text-indigo-700 dark:text-indigo-300 font-bold">{formatPercentagePoints(fin1.nopatMarginPercent, 1)}</td>
                <td className="py-3 px-4 text-rose-700 dark:text-rose-300 font-bold">{formatPercentagePoints(fin2.nopatMarginPercent, 1)}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {marginWinner === 1
                    ? (isEnglish ? `Under these illustrative inputs, ${comp1.ticker} shows a higher modeled margin; this is not a current company conclusion.` : `Temsili girdilerle, ${comp1.ticker} daha yüksek marj gösterir; güncel şirket analizi değildir.`)
                    : (isEnglish ? `Under these illustrative inputs, ${comp2.ticker} shows a higher modeled margin; this is not a current company conclusion.` : `Temsili girdilerle, ${comp2.ticker} daha yüksek marj gösterir; güncel şirket analizi değildir.`)}
                </td>
              </tr>

              {/* Turnover */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.capital_turnover_vel_474")}</td>
                <td className="py-3 px-4 text-indigo-700 dark:text-indigo-300 font-bold">{formatMultiplier(fin1.capitalTurnover, 2)}</td>
                <td className="py-3 px-4 text-rose-700 dark:text-rose-300 font-bold">{formatMultiplier(fin2.capitalTurnover, 2)}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {turnoverWinner === 1
                    ? (isEnglish ? `Under these illustrative inputs, ${comp1.ticker} shows higher modeled capital turnover.` : `Temsili girdilerle, ${comp1.ticker} daha yüksek sermaye devri gösterir.`)
                    : (isEnglish ? `Under these illustrative inputs, ${comp2.ticker} shows higher modeled capital turnover.` : `Temsili girdilerle, ${comp2.ticker} daha yüksek sermaye devri gösterir.`)}
                </td>
              </tr>

              {/* Moat Width */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.diagnosed_moat_class_475")}</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{translateMoatWidth(score1.diagnosedMoat, isEnglish)}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{translateMoatWidth(score2.diagnosedMoat, isEnglish)}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {t("MoatDuelView.mauboussin_5_step_qu_476")}
                </td>
              </tr>

              {/* CAP */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{t("MoatDuelView.competitive_advantag_477")}</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{comp1.sustainability.estimatedCapYears} {t("MoatDuelView.years_478")}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{comp2.sustainability.estimatedCapYears} {t("MoatDuelView.years_479")}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {t("MoatDuelView.teaching_assumption_480")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Synthesis & Action Bar */}
      <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t("MoatDuelView.mauboussin_strategic_481")}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {marginWinner !== turnoverWinner && marginWinner !== 0 && turnoverWinner !== 0 ? (
              <span>
                {isEnglish ? (
                  <>
                    This matchup is a classic textbook example of <strong>DuPont dichotomy</strong> under the selected teaching inputs! One company creates shareholder value through high pricing power and fat margins, while the other wins through high-velocity asset turnover.
                  </>
                ) : (
                  <>
                    Bu düello seçilen eğitim girdileri altında tam bir <strong>DuPont karşıtlığı</strong> örneğidir! Şirketlerden biri yüksek fiyatlama/marj stratejisiyle, diğeri ise hızlı sermaye dönüşüyle değer yaratmaktadır.
                  </>
                )}
              </span>
            ) : (
              <span>
                {t("MoatDuelView.duel_results_clearly_482")}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handleCopyComparison}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-500" />}
            <span>{copied ? (t("MoatDuelView.copied_483")) : (t("MoatDuelView.copy_duel_report_484"))}</span>
          </button>

          {onOpenAICoachWithPrompt && (
            <button
              onClick={() =>
                onOpenAICoachWithPrompt(
                  isEnglish
                    ? `Can you compare and explain the Mauboussin economic moat difference between ${comp1.companyName} (${comp1.ticker}) and ${comp2.companyName} (${comp2.ticker}) using DuPont and WTP/WTS models?`
                    : `${comp1.companyName} (${comp1.ticker}) ile ${comp2.companyName} (${comp2.ticker}) arasındaki Mauboussin hendek farkını DuPont ve WTP/WTS modelleriyle kıyaslayıp açıklar mısın?`
                )
              }
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t("MoatDuelView.ask_ai_coach_to_comp_485")}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
